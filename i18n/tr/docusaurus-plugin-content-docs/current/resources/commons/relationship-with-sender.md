---
sidebar_position: 5
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Gönderen ile İlişki

Doğrulama (validate) isteğinin `relationshipWithSenderId` alanında kullanılan ilişkilerin listesi.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/relationship-with-sender-list" />

:::info Statik Liste
Bu, nadiren değişen statik bir listedir. Her işlem için uç noktayı çağırmanıza gerek yoktur — bu değerleri güvenle sabit kodlayabilirsiniz. Herhangi bir değişiklik olduğunda önceden haber verilecektir.
:::

| ID | İlişki |
| :--- | :--- |
| 1 | Çocuk |
| 2 | Eş |
| 3 | Ebeveyn |
| 4 | Arkadaş |
| 5 | İş Arkadaşı |
| 6 | Kardeş |
