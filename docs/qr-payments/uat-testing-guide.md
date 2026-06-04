---
sidebar_position: 14
---

# UAT Testing Guide

This guide helps client teams validate their QR payment integration end-to-end in the UAT environment before requesting production access. Complete all test cases in the table below and provide the recorded transaction IDs for acceptance verification.

:::important UAT environment only
All mock endpoints on this page are available **only in sandbox / UAT environments** and are completely absent from production.
:::

---

## Business Scenario Test Cases

Run cases one by one. For cases that produce a transaction, record the `transactionId` (and `parentTransactionId` where applicable) in the **Transaction ID(s)** column — these are required for acceptance verification.

| ID | Scenario | Precondition | Acceptance Criteria | Result | Transaction ID(s) | Notes |
|---|---|---|---|---|---|---|
| TC-UAT-001 | Successful payment | Wallet balance ≥ 30.00 | Read → `READ_QR`; Confirm → `IN_PROGRESS`; webhook `qr_payment.completed` delivered; Query → `COMPLETED` | ⬜ | | |
| TC-UAT-002 | Failed payment — insufficient balance | Payment amount > wallet balance | Webhook `qr_payment.failed` delivered; Query → `FAILED`; re-reading the same QR does not reopen it | ⬜ | | |
| TC-UAT-003 | QR scan refund | Completed payment exists | Read → `REFUND` with `parentTransactionId`; after 30 s webhook `qr_payment.completed`; Query → `COMPLETED` | ⬜ | payment_id + refund_tx_id | |
| TC-UAT-004 | Read rejected — QR already used | `errorCode=QR_CODE_USED` on generate | Read → HTTP 406 `QR_CODE_USED`; Confirm never called | ⬜ | — | |
| TC-UAT-005 | Read rejected — QR not found | `errorCode=QR_CODE_NOT_FOUND` on generate | Read → HTTP 406 `QR_CODE_NOT_FOUND` | ⬜ | — | |
| TC-UAT-006 | Read rejected — QR expired | `errorCode=QR_CODE_EXPIRED` on generate | Read → HTTP 406 `QR_CODE_EXPIRED` | ⬜ | — | |
| TC-UAT-007 | Read rejected — BKM error | `errorCode=QR_CODE_TRANSACTION_ERROR` on generate | Read → HTTP 406 `QR_CODE_TRANSACTION_ERROR` | ⬜ | — | |
| TC-UAT-008 | Confirm rejected — QR expired | `confirmErrorCode=QR_CODE_EXPIRED` on generate | Read → `READ_QR`; Confirm → HTTP 406 `QR_CODE_EXPIRED` | ⬜ | | |
| TC-UAT-009 | Confirm rejected — QR consumed | `confirmErrorCode=QR_CODE_USED` on generate | Read → `READ_QR`; Confirm → HTTP 406 `QR_CODE_USED` | ⬜ | | |
| TC-UAT-010 | Confirm rejected — BKM error | `confirmErrorCode=QR_CODE_TRANSACTION_ERROR` on generate | Read → `READ_QR`; Confirm → HTTP 406 `QR_CODE_TRANSACTION_ERROR` | ⬜ | | |
| TC-UAT-011 | Single-consumer guarantee | Two distinct `tenantUserId` values available | Wallet A Confirm → `IN_PROGRESS`; Wallet B Confirm → HTTP 409 `QR_CODE_IDEMPOTENCY_MISMATCH` | ⬜ | | |
| TC-UAT-012 | Late reversal | Completed payment exists | Child tx `transactionSource=LATE_REVERSAL`; Query → `COMPLETED` in ~10 s; webhook delivered | ⬜ | payment_id + child_tx_id | |
| TC-UAT-013 | User-not-present refund (partial) | Completed payment exists, refund amount = 15.00 | Child tx `transactionSource=USER_NOT_PRESENT_REFUND`, amount = 15.00, `COMPLETED` after 30 s; webhook delivered | ⬜ | payment_id + child_tx_id | |
| TC-UAT-014 | User-not-present refund (full) | Completed payment exists, refund amount = full original | Child tx `transactionSource=USER_NOT_PRESENT_REFUND`, amount = original, `COMPLETED` after 30 s; webhook delivered | ⬜ | payment_id + child_tx_id | |

> **Result values:** ✅ Pass · ❌ Fail · 🔶 Blocked · ⬜ Not Run  
> **Transaction ID(s):** Pre-filled labels are placeholders — replace with actual IDs. TC-004 through TC-007 produce no transaction (read rejected before any record is created), hence —.

---

## Test Flows

Use the flows below as execution reference for each test case.

### 1 — Successful Payment (TC-UAT-001)

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

### 2 — Failed Payment (TC-UAT-002)

Use an `amount` **greater than** the current wallet balance. All other steps are identical to the Happy Path.

```
1. POST /wallet/qrcode/mock/generate-mock-qr-code
   qrCodeTransactionType=PAYMENT  amount=<balance + 1000>

2–4. Same as TC-UAT-001

5. POST /wallet/qrcode/mock/webhook-event-log
   → eventType: qr_payment.failed, status: DELIVERED

6. POST /wallet/qrcode/query
   → status: FAILED
```

After a payment reaches `FAILED`, reading the same QR code again returns the `FAILED` state — the transaction is closed and cannot be re-processed.

---

### 3 — QR Scan Refund (TC-UAT-003)

A merchant generates a refund QR code linked to the original payment. The partner reads and confirms it as usual — the refund is processed asynchronously via the refund queue.

```
# First complete a payment (steps 1–6 of TC-UAT-001)
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

### 4 — Read Error Codes (TC-UAT-004 through TC-UAT-007)

Use the `errorCode` parameter when generating a mock QR to force a specific failure at the Read stage. Confirm is never reached.

| Generate with `errorCode` | Test Case | Expected Read response |
|---|---|---|
| `QR_CODE_USED` | TC-UAT-004 | HTTP 406 — QR code already read by another application |
| `QR_CODE_NOT_FOUND` | TC-UAT-005 | HTTP 406 — QR code does not exist or is invalid |
| `QR_CODE_EXPIRED` | TC-UAT-006 | HTTP 406 — QR code is expired |
| `QR_CODE_TRANSACTION_ERROR` | TC-UAT-007 | HTTP 406 — BKM processing error during QR read |

```
POST /wallet/qrcode/mock/generate-mock-qr-code
  qrCodeTransactionType=PAYMENT  amount=10
  errorCode=QR_CODE_USED          (or QR_CODE_NOT_FOUND, QR_CODE_EXPIRED, QR_CODE_TRANSACTION_ERROR)

POST /wallet/qrcode/payment/read
  body: { qrCode }
→ HTTP 406, errorCode: QR_CODE_USED
```

---

### 5 — Confirm Error Codes (TC-UAT-008 through TC-UAT-010)

Use the `confirmErrorCode` parameter when generating a mock QR to force a failure at the Confirm stage. The Read call always succeeds.

| Generate with `confirmErrorCode` | Test Case | Expected Confirm response |
|---|---|---|
| `QR_CODE_EXPIRED` | TC-UAT-008 | HTTP 406 — QR expired between Read and Confirm |
| `QR_CODE_USED` | TC-UAT-009 | HTTP 406 — QR consumed by another application between Read and Confirm |
| `QR_CODE_TRANSACTION_ERROR` | TC-UAT-010 | HTTP 406 — BKM processing error during Confirm |

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

### 6 — Idempotency: Single-Consumer Guarantee (TC-UAT-011)

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

### 7 — Late Reversal (TC-UAT-012)

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

### 8 — User-Not-Present Refund (TC-UAT-013 and TC-UAT-014)

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

| Flow | Test Cases | Wait before querying |
|---|---|---|
| Payment authorization (normal) | TC-UAT-001, TC-UAT-002 | ~5 s for webhook to appear |
| QR Scan Refund (after mock auth) | TC-UAT-003 | **30 s** (UAT) · 3 min (prod) |
| LATE_REVERSAL | TC-UAT-012 | ~10 s |
| USER_NOT_PRESENT_REFUND | TC-UAT-013, TC-UAT-014 | **30 s** (UAT) · 3 min (prod) |
