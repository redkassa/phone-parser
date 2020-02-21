import { regexp } from '../constants';
import { IMaskOptions } from '../types';

const { REGEXP_ALL_HASHES, REGEXP_MASK_SYMBOLS, REGEXP_CLEANED_MASK } = regexp;

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

  const cleanedMask = mask.replace(REGEXP_CLEANED_MASK, '');

  if (options && options.appendTail) {
    const hashesLength = cleanedMask.replace(REGEXP_MASK_SYMBOLS, '').length;
    tail = value.slice(hashesLength, value.length);
  }

  const maskedData = cleanedMask.replace(REGEXP_ALL_HASHES, () => {
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

export default setMask;
