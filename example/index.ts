import { parsePhoneNumber } from '../src';
import { regexp } from '../src/constants';

document.addEventListener('DOMContentLoaded', () => {
  const input = <HTMLInputElement>document.querySelector('[name=phone]');

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

  const formats = [
    {
      code: 'RU',
      mask: '(###) ### ####',
    },
    {
      code: 'BY',
      mask: '## ### ## ##',
    },
    {
      code: 'US',
      mask: '###-###-####',
      appendTail: true,
    },
  ];

  let currentDialCode: string | null = null;

  input.onkeydown = e => {
    const target = <HTMLInputElement>e.target;
    const { value } = target;

    const prevChar = value.slice(
      target.selectionStart! - 1,
      target.selectionEnd!,
    );

    if (
      target.selectionStart === target.selectionEnd &&
      regexp.REGEXP_ONLY_DIGITS.test(prevChar) &&
      e.key === 'Backspace'
    ) {
      if (value === currentDialCode || value === '+') {
        input.value = '';
      } else {
        input.value = value.slice(0, value.length - 1);
      }
    }
  };

  input.onkeyup = e => {
    const target = <HTMLInputElement>e.target;
    const { value } = target;
    let result = null;

    if (value) {
      if ((value.length === 1 && value === '+') || value.startsWith('+')) {
        result = parsePhoneNumber(value, { formats });
      } else {
        result = parsePhoneNumber(value, { resolvers, formats });
      }

      currentDialCode = result.dialCode;

      input.value = result.formattedNumber;
    }
  };
});
