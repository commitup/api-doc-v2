---
sidebar_position: 2
title: Prerequisites & Onboarding
sidebar_label: Prerequisites & Setup
---

# POS API Prerequisites & Setup

Before using the POS API, you must provide your network and routing details to the PayPorter team for initial system configuration.

The process consists of 3 straightforward steps:

---

## 1. Required Information

Before integration begins, the API consumer must provide the following:

| Parameter | Required? | Description |
| :--- | :---: | :--- |
| **Whitelist IP** | **Yes** | The outbound static IP address(es) of the servers making API requests. Requests from unlisted IPs will be rejected. |
| **Callback URL** | **Yes** | The return URL where cardholders are redirected after 3D Secure or Hosted Checkout (`https://`). |
| **Webhook URL** | *Optional* | If used, the endpoint where asynchronous payment status updates are dispatched (`https://`). |

---

## 2. Configuration & Notification

1. The PayPorter team configures your **Whitelist IP**, **Callback URL**, and **Webhook URL** (if provided) in the system.
2. Once the configuration is complete, PayPorter notifies the merchant.

---

## 3. Dashboard Login & Getting Started

1. Upon receiving the notification, log in to your merchant dashboard.
2. Retrieve your **X-API-KEY** and **X-API-SECRET** from the **Settings** page in the dashboard.
3. You can now start sending authenticated API requests from your whitelisted IP address.

:::tip Next Step
See [Authentication](./authentication) to learn how to include your credentials in request headers.
:::
