---
sidebar_position: 1
---

import ApiEndpoint from '@site/src/components/ApiEndpoint';

# Kimlik Türü Listesi

[Kişi Nesnesi](../person-object) içindeki `identityTypeId` alanında kullanılan kimlik belgesi türlerinin listesi.

<ApiEndpoint method="GET" url="/mt-api/V2/moneytransfercommon/identity-type-list" />

:::info Statik Liste
Bu, nadiren değişen statik bir listedir. Her işlem için uç noktayı çağırmanıza gerek yoktur — bu değerleri güvenle sabit kodlayabilirsiniz. Herhangi bir değişiklik olduğunda önceden haber verilecektir.
:::

| ID | Adı |
| :--- | :--- |
| 1 | Pasaport |
| 2 | Sürücü Belgesi |
| 3 | Nüfus Cüzdanı |
| 4 | Yabancı Kimlik Belgesi |
| 5 | Yeni Kimlik Kartı |
| 11 | Ulusal Kimlik Belgesi |
| 14 | İkamet Belgesi |
| 33 | Eski Vatandaş/Mavi Kimlik |
| 61 | Kuzey Kıbrıs Kimliği |
| 62 | Geçici Koruma Belgesi |
| 63 | Gemiadamı Cüzdanı |
