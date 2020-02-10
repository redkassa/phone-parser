import { phoneTable, regexp } from './constants';
import {
  IMaskOptions,
  IResolver,
  TParsedPhone,
  TPhoneParserOptions,
  TResolverResult,
} from './types';

const { REGEXP_ALL_HASHES, REGEXP_CLEAN_MASK, REGEXP_ONLY_DIGITS } = regexp;

const setMask = (
  value: string,
  mask: string,
  options?: IMaskOptions,
): string => {
  let i = 0;
  let tail = '';

  if (!value) {
    return '';
  }

  if (options && options.appendTail) {
    const hashesLength = mask.replace(REGEXP_CLEAN_MASK, '').length;
    tail = value.slice(hashesLength, value.length);
  }

  const maskedData = mask.replace(REGEXP_ALL_HASHES, () => {
    const char = value[i];
    i += 1;

    if (char) {
      return char;
    }
    return '_';
  });

  const result = maskedData.split('_')[0].trim();

  return `${result}${tail}`;
};

const applyResolvers = (
  value: string,
  resolvers: Array<IResolver>,
): TResolverResult => {
  const firstChar = value.charAt(0);

  let resolvedCell = null;
  let resolvedPhone = value;

  const resolver = resolvers.find(i =>
    i.options.find(option => option.value.charAt(0) === firstChar),
  );

  if (resolver) {
    const { target } = resolver;
    const row = phoneTable[target.firstChar];

    resolvedCell =
      row.find(i =>
        i.countries.find(country => country.code === target.code),
      ) || null;

    const options = resolver.options.find(i => i.value === firstChar);

    if (options) {
      if (!options.replace) {
        resolvedPhone = `${target.firstChar}${resolvedPhone}`;
      } else {
        resolvedPhone = `${target.firstChar}${resolvedPhone.substring(1)}`;
      }
    }
  }
  return {
    resolvedCell,
    resolvedPhone,
  };
};

const parsePhoneNumber = (
  phone: string,
  options?: TPhoneParserOptions,
): TParsedPhone => {
  const cleanPhone = phone.trim().replace(REGEXP_ONLY_DIGITS, '');
  const secondChar = cleanPhone.length > 1 ? cleanPhone.charAt(1) : '';

  let firstChar = cleanPhone.length > 0 ? cleanPhone.charAt(0) : '';
  let currentCell = null;
  let currentPhone = cleanPhone;

  if (options && options.resolvers && firstChar) {
    const { resolvedCell, resolvedPhone } = applyResolvers(
      cleanPhone,
      options.resolvers,
    );
    currentCell = resolvedCell;
    currentPhone = resolvedPhone;
    firstChar = currentPhone.charAt(0);
  }

  const unknownPhone = {
    code: null,
    dialCode: null,
    nationalNumber: null,
    formattedNumber: `+${currentPhone}`,
  };

  if (firstChar && firstChar !== '0') {
    const secondCharNumber = secondChar === '' ? -1 : Number(secondChar);
    const cell =
      currentCell ||
      phoneTable[firstChar].find(i =>
        i.secondNumbers.includes(secondCharNumber),
      );

    if (cell) {
      const dialCodeLength = cell ? cell.countries[0].dialCode.length - 1 : 0;
      const estimatedDialCode = currentPhone.slice(0, dialCodeLength);
      const targetCountries = cell.countries.filter(i =>
        i.dialCode.includes(estimatedDialCode),
      );

      if (targetCountries.length > 1) {
        return unknownPhone;
      }

      const dialCodeWithoutPlus = targetCountries[0].dialCode.substr(1);

      const { dialCode, code } = targetCountries[0];
      const nationalNumber = currentPhone.substr(dialCodeWithoutPlus.length);

      const formatOptions =
        options && options.formats
          ? options.formats.find(i => i.code === code)
          : null;

      const formattedNumber =
        formatOptions && formatOptions.mask
          ? `${dialCode} ${setMask(nationalNumber, formatOptions.mask, {
              appendTail: !!formatOptions.appendTail,
            })}`.trim()
          : `${dialCode} ${nationalNumber}`.trim();

      return {
        code,
        dialCode,
        nationalNumber,
        formattedNumber,
      };
    }
  }

  return unknownPhone;
};

// eslint-disable-next-line
export { parsePhoneNumber };
