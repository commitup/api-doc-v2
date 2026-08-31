---
sidebar_position: 1
---

# EFT to Turkish Banks

The EFT service allows you to send money directly to IBAN and Cards in Turkey. 
This service is optimized for high-volume transactions and provides real-time status updates through our APIs.

## Changelog

<details className="changelog-details">
<summary>Show all entries</summary>

| Date | Changes |
| :--- | :--- |
| 2026-08-28 | Additional `paymentPurpose` codes. |
| 2026-08-03 | New error code `EFT_FROM_COUNTRY_CANNOT_BE_TUR`. |
| 2026-07-31 | Max lengths documented. `receiverAccount` 26, `receiverCardNumber` 16. |
| 2026-07-08 | [Validate IBAN](./validate-iban) parameters and error codes revised. |
| 2026-05-07 | [Settlement](./settlement) added. |
| 2026-04-20 | `nationalCountryCode` added to sender info. |
| 2026-04-07 | [V1 to V2 migration guide](./migration-v1-v2) published. |
| 2026-03-17 | cURL examples added to all endpoints. |
| 2026-03-12 | [Error codes](./error-codes) published. |
| 2026-03-09 | Initial EFT V2 documentation. |

</details>

## Overview

EFT (Electronic Funds Transfer) is the standard method for money transfers to Turkish IBANs and Cards. Payporter's EFT API provides a programmatic way to initiate these transfers seamlessly.

### Key Features

*   **[Exchange](./exchange)**: Get real-time conversion rates and generate an `exchangeId` for multi-currency transfers.
*   **Real-time Status Check**: Monitor the life cycle of your transfer from "Processing" to "Completed" or "Cancelled" using [status endpoints](./check-eft-status).
*   **Transfer Management**: Search through your [transaction history](./get-eft-list) or [cancel pending transfers](./cancel-eft) that haven't been processed by the bank yet.
*   **[Refund Tracking](./get-refund-list)**: Automatically track transactions that were returned by the receiver bank and see the reason for the refund.
*   **[Webhooks (NEW)](./webhooks)**: Instead of polling for status, use our secure Webhook system to receive instant POST notifications when a transfer status changes.

### Premium Paid Features

*   **IBAN Validation**: Before initiating a transfer, you can verify if the recipient's IBAN is valid and matches the provided name and currency. This is an extra paid feature. Please contact your account manager for more information.

## Before You Begin

Ensure you have:
1. A valid **Access Token** (from the `/login` endpoint).
2. Sufficient balance in your operating account.
3. The recipient's **IBAN** and Full Name.

## Migrating from V1

If you are an existing customer using our **EFT API Version 1**, please refer to our **[Migration Guide](./migration-v1-v2)** for a detailed mapping of endpoint changes and request body updates.
