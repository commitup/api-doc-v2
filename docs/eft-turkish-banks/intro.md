---
sidebar_position: 1
---

# EFT to Turkish Banks

The EFT service allows you to send money directly to IBAN and Cards in Turkey. 
This service is optimized for high-volume transactions and provides real-time status updates through our APIs.

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

