---
sidebar_position: 1
---

# POS API Overview

The POS API (Virtual POS) allows you to accept card payments via direct integration or a hosted checkout page. It supports direct payments, pre-authorization, 3D Secure authentication, and installment options.

## Getting Started

To integrate with the POS API, follow these steps:

1. **[Prerequisites & Setup](./onboarding):** Provide your Whitelist IP(s), Callback URL, and optional Webhook URL for initial system configuration.
2. **[Authentication](./authentication):** Authenticate your requests using `X-API-KEY` and `X-API-SECRET`.
3. **Choose an Integration Method:**
   - **[Hosted Checkout](./checkout):** Quickest integration with minimal PCI scope.
   - **[3D Secure Payment](./3ds):** Standard 3DS card payment flow with custom UI.
   - **[Direct Payment](./payment):** Server-to-server card processing for PCI-DSS compliant merchants.
4. **[Webhooks](./webhooks):** Listen for real-time payment status updates.
