---
sidebar_position: 4
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Transfer Nedenleri Listesi

Doğrulama (validate) isteğinin `purposeCodeDefinitionId` alanında kullanılan transfer nedenlerinin listesi.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/purpose-info-list" />

:::info Statik Liste
Bu, nadiren değişen statik bir listedir. Her işlem için uç noktayı çağırmanıza gerek yoktur — bu değerleri güvenle sabit kodlayabilirsiniz. Herhangi bir değişiklik olduğunda önceden haber verilecektir.
:::

| ID | Adı |
| :--- | :--- |
| 2 | Aile |
| 3 | Ticari Ödemeler |
| 6 | Kiralar |
| 10 | Diğer |
| 11 | Borç / Kredi |
| 12 | Satış / Alış |
| 14 | Tasarruf / Yatırım |
| 16 | Eğitim |
