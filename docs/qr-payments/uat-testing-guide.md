---
sidebar_position: 14
---

# UAT Testing Guide

This guide helps client teams validate their QR payment integration end-to-end in the UAT environment before requesting production access. Work through each section in order and tick off the checklist at the bottom before going live.

:::important UAT environment only
All mock endpoints on this page are available **only in sandbox / UAT environments** and are completely absent from production.
:::

---

## Test Flows

### 1 — Successful Payment (Happy Path)

```
1. POST /wallet/qrcode/mock/generate-mock-qr-code
   qrCodeTransactionType=PAYMENT  amount=30
   → returns qrCode string

2. POST /wallet/qrcode/payment/read
   body: { qrCode }
   → status: READ_QR, transactionId: <id>
     transactionType: PAYMENT, tenantReferenceId: null

3. POST /wallet/qrcode/payment/confirm
   body: { transactionId, tenantReferenceId, amount: "30.00", tenantUserId }
   → status: IN_PROGRESS

4. POST /wallet/qrcode/mock/start-mock-authorization
   transactionId=<id>
   → { transactionId, parentTransactionId }

5. POST /wallet/qrcode/mock/webhook-event-log
   transactionId=<id>          (wait ~5 s after step 4)
   → eventType: qr_payment.completed, status: DELIVERED

6. POST /wallet/qrcode/query
   transactionId=<id>
   → status: COMPLETED
```

:::note Webhook race condition
There is a brief window (~2–3 s) between `start-mock-authorization` completing and the webhook event being recorded. If `webhook-event-log` returns 406 immediately after step 4, wait a moment and retry — the event will appear shortly.
:::

---

### 2 — Failed Payment (Insufficient Balance)

Use an `amount` **greater than** the current wallet balance. All other steps are identical to the Happy Path.

```
1. POST /wallet/qrcode/mock/generate-mock-qr-code
   qrCodeTransactionType=PAYMENT  amount=<balance + 1000>

2–4. Same as Happy Path

5. POST /wallet/qrcode/mock/webhook-event-log
   → eventType: qr_payment.failed, status: DELIVERED

6. POST /wallet/qrcode/query
   → status: FAILED
```

After a payment reaches `FAILED`, reading the same QR code again returns the `FAILED` state — the transaction is closed and cannot be re-processed.

---

### 3 — QR Scan Refund

A merchant generates a refund QR code linked to the original payment. The partner reads and confirms it as usual — the refund is processed asynchronously via the refund queue.

```
# First complete a payment (steps 1–6 of Happy Path)
# Save the transactionId as <payment_id>

1. POST /wallet/qrcode/mock/generate-mock-qr-code
   qrCodeTransactionType=REFUND  amount=30  parentTransactionId=<payment_id>
   → returns refund qrCode string

2. POST /wallet/qrcode/payment/read
   body: { qrCode }
   → status: READ_QR
     transactionType: REFUND, parentTransactionId: <payment_id>

3. POST /wallet/qrcode/payment/confirm
   body: { transactionId, amount: "30.00", tenantUserId }
   → status: IN_PROGRESS

4. POST /wallet/qrcode/mock/start-mock-authorization
   transactionId=<refund_transactionId>

# Wait 30 s — the refund goes through the clearing queue before finalising
# (UAT: 30 s · Production: 3 min)

5. POST /wallet/qrcode/mock/webhook-event-log
   transactionId=<refund_transactionId>
   → eventType: qr_payment.completed, status: DELIVERED

6. POST /wallet/qrcode/query
   transactionId=<refund_transactionId>
   → status: COMPLETED
```

:::important Refund processing delay
The refund clearing message is queued and processed with a delay:

| Environment | Delay |
|---|---|
| UAT / MIG | **30 seconds** |
| Production | **3 minutes** |

Do **not** query the transaction or webhook event log before the applicable delay has elapsed.
:::

---

### 4 — Read Error Codes

Use the `errorCode` parameter when generating a mock QR to force a specific failure at the Read stage. Confirm is never reached.

| Generate with `errorCode` | Expected Read response |
|---|---|
| `QR_CODE_USED` | HTTP 406 — QR code already read by another application |
| `QR_CODE_NOT_FOUND` | HTTP 406 — QR code does not exist or is invalid |
| `QR_CODE_EXPIRED` | HTTP 406 — QR code is expired |
| `QR_CODE_TRANSACTION_ERROR` | HTTP 406 — BKM processing error during QR read |

```
POST /wallet/qrcode/mock/generate-mock-qr-code
  qrCodeTransactionType=PAYMENT  amount=10
  errorCode=QR_CODE_USED          (or QR_CODE_NOT_FOUND, QR_CODE_EXPIRED, QR_CODE_TRANSACTION_ERROR)

POST /wallet/qrcode/payment/read
  body: { qrCode }
→ HTTP 406, errorCode: QR_CODE_USED
```

---

### 5 — Confirm Error Codes

Use the `confirmErrorCode` parameter when generating a mock QR to force a failure at the Confirm stage. The Read call always succeeds.

| Generate with `confirmErrorCode` | Expected Confirm response |
|---|---|
| `QR_CODE_EXPIRED` | HTTP 406 — QR expired between Read and Confirm |
| `QR_CODE_USED` | HTTP 406 — QR consumed by another application between Read and Confirm |
| `QR_CODE_TRANSACTION_ERROR` | HTTP 406 — BKM processing error during Confirm |

```
POST /wallet/qrcode/mock/generate-mock-qr-code
  qrCodeTransactionType=PAYMENT  amount=10
  confirmErrorCode=QR_CODE_EXPIRED    (or QR_CODE_USED, QR_CODE_TRANSACTION_ERROR)

POST /wallet/qrcode/payment/read
→ status: READ_QR   (succeeds)

POST /wallet/qrcode/payment/confirm
→ HTTP 406, errorCode: QR_CODE_EXPIRED
```

No `start-mock-authorization` call is needed — the error fires at Confirm, before any authorization.

---

### 6 — Idempotency: Single-Consumer Guarantee

For a **dynamic QR** (amount encoded in the QR), only one wallet can confirm the transaction. If a second wallet reads the same QR and attempts to confirm with a different `tenantUserId`, it is rejected with `QR_CODE_IDEMPOTENCY_MISMATCH`.

This mirrors the real-world scenario where two applications or wallets race to process the same QR code — only the first one wins.

```
# Wallet A
POST /wallet/qrcode/payment/read    body: { qrCode }
→ transactionId: <id>

POST /wallet/qrcode/payment/confirm
  body: { transactionId: <id>, tenantUserId: "wallet-a-user", ... }
→ status: IN_PROGRESS   ← succeeds

# Wallet B (different tenantUserId, same QR)
POST /wallet/qrcode/payment/read    body: { qrCode }
→ transactionId: <id>   (same id — dynamic QR is bound to one transaction)

POST /wallet/qrcode/payment/confirm
  body: { transactionId: <id>, tenantUserId: "wallet-b-user", ... }
→ HTTP 409, errorCode: QR_CODE_IDEMPOTENCY_MISMATCH
```

---

### 7 — Late Reversal (LATE_REVERSAL)

Simulates BKM Switch sending a reversal message after a payment has already completed. This arrives headlessly — the partner receives a webhook for a new child transaction.

```
# After a COMPLETED payment (transactionId = <payment_id>):

POST /wallet/qrcode/mock/start-mock-authorization
  transactionId=<payment_id>
  externalSource=LATE_REVERSAL
→ { transactionId: <child_id>, parentTransactionId: <payment_id> }

# Wait ~10 seconds

POST /wallet/qrcode/query
  transactionId=<child_id>
→ status: COMPLETED, transactionSource: LATE_REVERSAL

POST /wallet/qrcode/mock/webhook-event-log
  transactionId=<child_id>
→ eventType: qr_payment.completed, status: DELIVERED
```

---

### 8 — User-Not-Present Refund (USER_NOT_PRESENT_REFUND)

Simulates a merchant-initiated refund that arrives directly from BKM Switch, without requiring the user to present their QR code. Supports partial and full amounts.

```
# After a COMPLETED payment (transactionId = <payment_id>):

POST /wallet/qrcode/mock/start-mock-authorization
  transactionId=<payment_id>
  externalSource=USER_NOT_PRESENT_REFUND
  amount=15.00                  (≤ original payment amount; use full amount for full refund)
→ { transactionId: <child_id>, parentTransactionId: <payment_id> }

# Wait for refund clearing delay:
#   UAT / MIG: 30 seconds
#   Production: 3 minutes

POST /wallet/qrcode/query
  transactionId=<child_id>
→ status: COMPLETED, transactionSource: USER_NOT_PRESENT_REFUND

POST /wallet/qrcode/mock/webhook-event-log
  transactionId=<child_id>
→ eventType: qr_payment.completed, status: DELIVERED
```

---

## Timing Reference

| Flow | Wait before querying |
|---|---|
| Payment authorization (normal) | ~5 s for webhook to appear |
| QR Scan Refund (after mock auth) | **30 s** (UAT) · 3 min (prod) |
| LATE_REVERSAL | ~10 s |
| USER_NOT_PRESENT_REFUND | **30 s** (UAT) · 3 min (prod) |

---

## UAT Acceptance Checklist

Complete all items before requesting production access:

**Payment Flows**
- [ ] **Successful payment:** Generate → Read → Confirm → Mock Auth → `qr_payment.completed` webhook → Query returns `COMPLETED`
- [ ] **Failed payment:** Transaction with amount exceeding balance ends in `FAILED` with a `qr_payment.failed` webhook

**Refund Flow**
- [ ] **QR scan refund:** Generate refund QR linked to a completed payment → Read (type `REFUND`, `parentTransactionId` present) → Confirm → Mock Auth → wait 30 s → `qr_payment.completed` webhook → Query returns `COMPLETED`

**Error Handling — Read Stage**
- [ ] `QR_CODE_USED` — QR already read by another application returns HTTP 406
- [ ] `QR_CODE_NOT_FOUND` — invalid or unknown QR returns HTTP 406
- [ ] `QR_CODE_EXPIRED` — expired QR returns HTTP 406
- [ ] `QR_CODE_TRANSACTION_ERROR` — BKM processing error at Read returns HTTP 406

**Error Handling — Confirm Stage**
- [ ] `QR_CODE_EXPIRED` — QR expired between Read and Confirm returns HTTP 406
- [ ] `QR_CODE_USED` — QR consumed between Read and Confirm returns HTTP 406
- [ ] `QR_CODE_TRANSACTION_ERROR` — BKM processing error at Confirm returns HTTP 406

**Idempotency**
- [ ] **Single-consumer guarantee:** Two wallets reading the same dynamic QR — first Confirm succeeds; second Confirm (different `tenantUserId`) returns `QR_CODE_IDEMPOTENCY_MISMATCH` (HTTP 409)

**External Refund Paths**
- [ ] **Late Reversal:** LATE_REVERSAL child transaction appears with `transactionSource: LATE_REVERSAL` and a `qr_payment.completed` webhook after ~10 s
- [ ] **User-Not-Present Refund (partial):** Partial refund child transaction appears with `transactionSource: USER_NOT_PRESENT_REFUND` after 30 s (UAT)
- [ ] **User-Not-Present Refund (full):** Full refund child transaction appears with `transactionSource: USER_NOT_PRESENT_REFUND` after 30 s (UAT)
