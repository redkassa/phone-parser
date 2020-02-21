const REGEXP_MASK_SYMBOLS = new RegExp(/\(|\)|\s|-|\+/, 'g');
const REGEXP_CLEANED_MASK = new RegExp(/[^\\(\\)\s-#]/, 'g');
const REGEXP_ALL_HASHES = new RegExp(/#/, 'g');
const REGEXP_ONLY_DIGITS = new RegExp(/\D/, 'g');

export default {
  REGEXP_ALL_HASHES,
  REGEXP_ONLY_DIGITS,
  REGEXP_MASK_SYMBOLS,
  REGEXP_CLEANED_MASK,
};
