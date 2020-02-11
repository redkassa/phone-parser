# RedKassa Phone Parser

Парсер телефонных номеров. Хорошо подходит для форматирования номера вводимого пользователем.

[Пример](https://codesandbox.io/s/angry-firefly-vyjj0?fontsize=14&hidenavigation=1&theme=dark)

## Установка

```bash
npm i @redkassa/phone-parser --save
```

или

```bash
yarn add @redkassa/phone-parser
```

## Использование

```javascript

const result = parsePhoneNumber('12089999999');

/*

result = {
  code: 'US',
  dialCode: '+1',
  nationalNumber: '2089999999',
  formattedNumber: '+1 2089999999',
}

*/

```

## Параметры

### Resolvers

Можно указать парсеру как именно определять значение передаваемое ему.

**resolvers** - это массив состоящий из объектов со следующими свойствами:

| Свойство | Тип | Описание |
|---|---|---|
| **options** | Array (required) | Значения передаваемые в парсер которые будут приводиться заменяться или дополняться кодом страны |
| **target** | Object (required) | Данные для вычисления телефонного кода страны к которому приводится вводимое значение |

#### option

| Свойство | Тип | Описание |
|---|---|---|
| **value** | string (required) | Значение передаваемое в парсер |
| **replace** | boolean | Если *true* - заменяет значение на телефонный код страны. Если *false* ставит телефонный код страны перед этим значением. Телефонный код страны определяется на основе данных из target. |

#### target

| Свойство | Тип | Описание |
|---|---|---|
| **firstChar** | string (required) | Первая цифра кода страны |
| **code** | string (required) | Код страны |

```javascript

const resolvers = [
  {
    options: [
      {
        value: '8',
        replace: true,
      },
      {
        value: '9',
        replace: false,
      },
    ],
    target: {
      firstChar: '7',
      code: 'RU',
    },
  },
];

const result1 = parsePhoneNumber('89191238899', { resolvers });
const result2 = parsePhoneNumber('9191238899', { resolvers });

/*

result1 = {
  code: 'RU',
  dialCode: '+7',
  nationalNumber: '9191238899',
  formattedNumber: '+7 9191238899',
}

result2 = {
  code: 'RU',
  dialCode: '+7',
  nationalNumber: '9191238899',
  formattedNumber: '+7 9191238899',
}

*/

```

### Formats

**formats** - это массив состоящий из объектов со следующими свойствами:

| Свойство | Тип | Описание |
|---|---|---|
| **code** | string (required) | Код страны (US, RU и т.п.) |
| **mask** | string | Маска для вводимого номера без телефонного кода страны. Телефонный код страны будет подставляться автоматически. |
| **appendTail** | boolean | Добавлять цифры, которые не учитываются в маске, к номеру телефона. |

```javascript

const formats = [
  {
    code: 'US',
    mask: '###-###-####',
  },
];

const result = parsePhoneNumber('12089999999', { formats });

/*

result = {
  code: 'US',
  dialCode: '+1',
  nationalNumber: '2089999999',
  formattedNumber: '+1 208-999-9999',
}

*/

```
