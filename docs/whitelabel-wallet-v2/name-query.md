---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import ApiResponseSelector from '@site/src/components/ApiResponseSelector';

# Name Transfer — Query

Check the status of a previously confirmed name transfer transaction. Use this endpoint to poll for updates if the transaction status is still in progress, or to recover state after a network timeout during the confirm request.

<ApiEndpoint method="GET" url="/wallet/p2p/query/{transactionId}" />

## Request

<Tabs>
  <TabItem value="fields" label="Path Parameters" default>

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `transactionId` | String (UUID) | The transaction ID returned from the validate or confirm response. |

  </TabItem>
</Tabs>

## Response

The response is a [Transaction Object](./transaction-object). Check the `status` field to determine if the transaction was successful (`DONE`), failed (`ERROR`), or is still processing.
