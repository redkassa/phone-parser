const REGEXP_CLEAN_MASK = new RegExp(/\(|\)|\s|-|\+/, 'g');
const REGEXP_ALL_HASHES = new RegExp(/#/, 'g');
const REGEXP_ONLY_DIGITS = new RegExp(/\D/, 'g');

export default {
  REGEXP_CLEAN_MASK,
  REGEXP_ALL_HASHES,
  REGEXP_ONLY_DIGITS,
};
