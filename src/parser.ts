import { phoneTable, regexp } from './constants';
import { applyResolvers, setMask } from './utils';
import { TParsedPhone, TPhoneParserOptions } from './types';

const { REGEXP_ONLY_DIGITS } = regexp;

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

      if (targetCountries.length > 1 || !targetCountries.length) {
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

export default parsePhoneNumber;
