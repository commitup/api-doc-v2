---
sidebar_position: 11
---

# Коды ошибок EFT

На этой странице перечислены конкретные коды ошибок, которые могут возникнуть при переводах EFT в турецкие банки. Каждая ошибка включает в себя `messageCode`, возвращаемый API, и описание или рекомендуемое действие. test

import ErrorCodesTable from '@site/src/components/ErrorCodesTable';

export const codes = [
  { isCritical: true, code: "COMMAND_EXCEPTION", description: "Исключение системной команды", action: "Проверьте статус заказа. Если он уже получен PayPorter, не отправляйте повторно. Если не найден, вы можете отправить повторно с тем же идентификатором." },
  { isCritical: true, code: "UNEXPECTED_SYSTEM_ERROR", description: "Непредвиденная системная ошибка", action: "Проверьте статус заказа путем запроса. Если получен PayPorter, не отправляйте повторно. Если отсутствует, отправьте повторно с тем же идентификатором." },
  { isCritical: true, code: "EFT_DEMAND_FROM_EXT_REF_CODE_PREVIOUS_DEMANDS_SENDEND", description: "Дубликат ссылки на транзакцию", action: "Заказ уже получен. Запросите последний статус и убедитесь, что ваш номер ссылки на запрос уникален." },
  { code: "OPERATION_DONE_SUCCESSFUL", description: "Успешно", action: "Операция завершена успешно." },
  { code: "CONCURRENCY_LOGOUT", description: "Конфликт сессий", action: "Активирован другой вход в систему, закрывающий предыдущую сессию. Попробуйте войти снова." },
  { code: "DATE_RANGE_EXCEEDED", description: "Переполнение диапазона дат", action: "Запрошенный диапазон дат слишком велик для запроса." },
  { code: "INVALID_IP_LOGOUT", description: "Нарушение безопасности IP", action: "Вход с нескольких IP-адресов не разрешен текущей конфигурацией." },
  { code: "LOGOUT", description: "Сессия неактивна", action: "Сессия истекла или неактивна. Получите новый токен через логин." },
  { code: "EFT_EXCHANGE_ID_NOT_ALLOWED", description: "Ограничение перевода в TRY", action: "ExchangeId не разрешен для переводов в TRY (турецких лирах)." },
  { code: "EFT_EXCHANGE_ID_REQUIRED", description: "Отсутствует ExchangeId", action: "ExchangeId требуется для переводов в иностранной валюте." },
  { code: "EFT_EXCHANGE_NOT_FOUND", description: "Неверный ExchangeId", action: "Предоставленный ExchangeId либо неверен, либо истек." },
  { code: "EFT_EXCHANGE_TYPE_NOT_MATCH", description: "Несоответствие значений", action: "ExchangeId и коммерческая стоимость перевода должны совпадать." },
  { code: "EFT_EXCHANGE_AMOUNT_NOT_MATCH", description: "Несоответствие суммы", action: "Сумма обмена и сумма перевода должны быть идентичны." },
  { code: "EFT_EXCHANGE_FEC_CODE_NOT_MATCH", description: "Несоответствие валюты", action: "Валюта обмена и валюта перевода должны совпадать." },
  { code: "QUERY_DATE_RANGE_EXCEEDED", description: "Ошибка диапазона запроса", action: "Диапазон дат слишком велик для этого конкретного запроса." },
  { code: "RECEIVER_OR_SENDER_BIRTH_PLACE_TOO_LONG", description: "Ошибка длины поля", action: "Строка 'Место рождения' превышает допустимую длину." },
  { code: "RECEIVER_OR_SENDER_NAME_TOO_LONG", description: "Ошибка длины поля", action: "Имя получателя или отправителя слишком длинное." },
  { code: "TRN_ID_NOT_FOUND", description: "Транзакция отсутствует", action: "Запрошенный идентификатор транзакции не существует." },
  { code: "UNAUTHORIZED_QUERY_FOR_ACCOUNT_NUMBER", description: "Доступ запрещен", action: "Счет не может быть запрошен текущим владельцем токена." },
  { code: "EFT_API_FEC_INFO_MUST_HAVE_VALUE", description: "Отсутствует валюта", action: "Код валюты не может быть пустым." },
  { code: "EFT_API_RECEIVER_FIRST_NAME_MUST_HAVE_VALUE", description: "Отсутствует имя получателя", action: "Имя получателя не может быть пустым или слишком коротким." },
  { code: "EFT_API_RECEIVER_INFO_MUST_HAVE_VALUE", description: "Отсутствует информация о получателе", action: "Имя и фамилия получателя должны соответствовать минимальным требованиям к длине." },
  { code: "EFT_API_RECEIVER_LASTNAME_MUST_HAVE_VALUE", description: "Отсутствует фамилия получателя", action: "Фамилия получателя не может быть пустой или слишком короткой." },
  { code: "EFT_API_RECEIVER_NAME_MUST_HAVE_VALUE", description: "Отсутствует имя получателя", action: "Имя получателя не может быть пустым или слишком коротким." },
  { code: "EFT_API_SENDER_BIRTH_PLACE_MUST_HAVE_VALUE", description: "Отсутствует место рождения отправителя", action: "Место рождения отправителя не может быть пустым." },
  { code: "EFT_API_SENDER_FIRST_NAME_MUST_HAVE_VALUE", description: "Отсутствует имя отправителя", action: "Имя отправителя не может быть пустым или слишком коротким." },
  { code: "EFT_API_SENDER_LAST_NAME_MUST_HAVE_VALUE", description: "Отсутствует фамилия отправителя", action: "Фамилия отправителя не может быть пустой или слишком короткой." },
  { code: "EFT_API_SENDER_NAME_MUST_HAVE_VALUE", description: "Отсутствует информация об отправителе", action: "Имя и фамилия отправителя не могут быть пустыми или слишком короткими." },
  { code: "EFT_API_TRANSFER_TYPE_MUST_HAVE_VALUE", description: "Отсутствует тип перевода", action: "Тип перевода не может быть пустым." },
  { code: "IBAN_BANK_EFT_AMOUNT_EXCEEDED", description: "Превышен лимит", action: "Лимит суммы перевода превышен." },
  { code: "IBAN_BANK_IS_NOT_SUPPORTED", description: "Неподдерживаемый банк", action: "Банк получателя не поддерживается в системе EFT." },
  { code: "EFT_SEND_BASE_CREDIT_CARD_NO_NOT_VALID", description: "Неверный номер карты", action: "Номер кредитной карты получателя недействителен." },
  { code: "EFT_DEMAND_NOT_FOUND_WITH_FROM_EXT_FIRM_REFERANCE", description: "Ссылка не найдена", action: "Транзакция с предоставленной ссылкой внешней фирмы не существует." },
  { code: "EFT_SEND_BASE_SOURCE_OF_FUND_NULL", description: "Отсутствует источник средств", action: "Поле 'Источник средств' не может быть пустым." },
  { code: "EFT_SEND_BASE_EFT_EFT_AMOUNT_EMPTY_OR_ZERO", description: "Неверная сумма", action: "Сумма перевода должна быть больше нуля." },
  { code: "EFT_SEND_BASE_EFT_REASON_NULL", description: "Отсутствует причина", action: "Поле 'Причина перевода' не может быть пустым." },
  { code: "EFT_SEND_BASE_RECEIVER_ACCOUNT_INFO_NULL", description: "Отсутствует получатель", action: "Номер счета получателя или информация о кредитной карте не могут быть пустыми." },
  { code: "EFT_SEND_BASE_RECEIVER_ACCOUNT_NO_NULL", description: "Отсутствует номер счета", action: "Номер счета получателя не может быть пустым." },
  { code: "EFT_SEND_BASE_SENDER_PERSON_NULL", description: "Неверный отправитель", action: "Информация об отправителе недействительна." },
  { code: "EFT_SEND_BASE_SENDER_PERSON_BIRTH_DAY_NULL", description: "Отсутствует дата рождения", action: "Дата рождения отправителя не может быть пустой." },
  { code: "EFT_EXTERNAL_FIRM_REASON_NOT_FOUND", description: "Неверная причина", action: "Предоставленная причина перевода недействительна." },
  { code: "EFT_NOT_FOUND_CREDIT_CARD_BANK_INFO", description: "Неверный банк-эмитент карты", action: "Банк-эмитент кредитной карты недействителен или не распознан." },
  { code: "EFT_SEND_WRONG_FEE_FEC_CODE", description: "Ошибка валюты/счета", action: "Код валюты не подходит для этого счета бенефициара." },
  { code: "EFT_SEND_FEE_DEBT_AMOUNT_NOT_ENOUGH", description: "Недостаточный баланс", action: "Баланса недостаточно для покрытия перевода и комиссии." },
  { code: "EFT_WRONG_IBAN_FORMAT", description: "Ошибка IBAN", action: "Неправильный формат IBAN." },
  { code: "EFT_TRANSACTION_DATE_CANNOT_BE_PAST", description: "Ошибка даты", action: "Дата транзакции не может быть в прошлом." },
  { code: "EFT_WRONG_FEC_FOR_ACCOUNT", description: "Ошибка валюты", action: "Валюта не подходит для счета получателя." },
  { code: "EFT_NOT_FIND_BANK_CODE_FROM_IBAN", description: "Неизвестный банк", action: "Банк, связанный с IBAN, не определен." },
  { code: "EFT_IBAN_CHECK_IBAN_LENGHT", description: "Ошибка длины IBAN", action: "IBAN должен состоять из 26 символов (для TR)." },
  { code: "EFT_IBAN_CHECK_IBAN_NOT_VALID", description: "Ошибка цифр IBAN", action: "Ошибка формата IBAN (цифровая проверка не удалась)." },
  { code: "EFT_RECEIVER_FULL_NAME_MUST_HAVE_VALUE", description: "Отсутствует имя", action: "Имя и фамилия получателя не могут быть пустыми." },
  { code: "EFT_SENDER_BIRTH_DATE_MUST_HAVE_VALUE", description: "Отсутствует дата рождения", action: "Дата рождения отправителя не может быть пустой." },
  { code: "EFT_SENDER_BIRTH_PALACE_MUST_HAVE_VALUE", description: "Отсутствует место рождения", action: "Место рождения отправителя не может быть пустым." },
  { code: "EFT_SENDER_FULL_NAME_MUST_HAVE_VALUE", description: "Отсутствует имя", action: "Имя и фамилия отправителя не могут быть пустыми." },
  { code: "EFT_SENDER_IDENTY_NO_MUST_HAVE_VALUE", description: "Отсутствует ID", action: "Идентификационный номер отправителя не может быть пустым." },
  { code: "EFT_SENDER_PHONE_NO_MUST_HAVE_VALUE", description: "Отсутствует телефон", action: "Номер телефона отправителя не может быть пустым." },
];

export const labels = {
  searchPlaceholder: "Поиск по коду, описанию или действию...",
  code: "Код",
  description: "Описание",
  action: "Действие / Примечание",
  noResults: "Совпадающий код ошибки не найден."
};

# Коды ошибок EFT

На этой странице перечислены конкретные коды ошибок, которые могут возникнуть при переводах EFT в турецкие банки. Используйте строку поиска ниже, чтобы быстро найти код ошибки.

:::danger Критическая обработка ошибок
Для следующих кодов ошибок **обязательно** проверьте статус транзакции перед предпринятием любых последующих действий:

- **COMMAND_EXCEPTION** и **UNEXPECTED_SYSTEM_ERROR**: Статус заказа должен быть проверен потребителем. Запросите заказ; если он был получен PayPorter, вы увидите его в списке ответов. В этом случае **не отправляйте повторно**. Если он отсутствует в системе PayPorter, вы можете безопасно отправить его повторно с тем же номером ссылки.
- **EFT_DEMAND_FROM_EXT_REF_CODE_PREVIOUS_DEMANDS_SENDEND**: Этот заказ уже получен PayPorter. Запросите заказ, чтобы получить последний статус. Убедитесь, что ваш номер ссылки на запрос уникален для новых запросов.
:::

<ErrorCodesTable codes={codes} labels={labels} />
