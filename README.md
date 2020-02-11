# RedKassa Phone Parser

Parser phone numbers. Good for formatting numbers entered by the user.

[Example](https://codesandbox.io/s/angry-firefly-vyjj0?fontsize=14&hidenavigation=1&theme=dark)



## Installation

```bash
npm i @redkassa/phone-parser --save
```

or

```bash
yarn add @redkassa/phone-parser
```

## Usage

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

## Params

### Resolvers

You can tell the parser how to determine the value passed to it.

**resolvers** - it is an array consisting of objects with the following properties:

| Property | Type | Description|
|---|---|---|
| **options** | Array (required) | Values ​​passed to the parser which will be given are replaced or supplemented by the dial code |
| **target** | Object (required) | Data for calculating the dial code of the country to which the input value is given |

#### option

| Property | Type | Description|
|---|---|---|
| **value** | string (required) | Values ​​passed to the parser |
| **replace** | boolean | If *true* - replaces the value with the dial phone code. If *false* puts the country dial code before this value. The dial code is determined based on data from target. |

#### target

| Property | Type | Description|
|---|---|---|
| **firstChar** | string (required) | The first digit of the country code |
| **code** | string (required) | Country code (US, RU, ...) |

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

**formats** - it is an array consisting of objects with the following properties:

| Property | Type | Description|
|---|---|---|
| **code** | string (required) | Country code (US, RU, ...) |
| **mask** | string | Mask for the entered number without a dial code. The dial code will be substituted automatically. |
| **appendTail** | boolean | Add numbers that are not counted in the mask to the phone number. |

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

## Translation
[Russian](https://github.com/redkassa/phone-parser/blob/master/README_ru.md)
