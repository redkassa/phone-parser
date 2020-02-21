import { phoneTable, regexp } from '../constants';
import { IResolver, TResolverResult } from '../types';

const { REGEXP_ONLY_DIGITS } = regexp;

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

    const country = resolvedCell
      ? resolvedCell.countries.find(i => i.code === target.code)
      : null;

    const dialCode = country
      ? country.dialCode.replace(REGEXP_ONLY_DIGITS, '')
      : null;

    const options = resolver.options.find(i => i.value === firstChar);

    if (options) {
      if (!options.replace) {
        resolvedPhone = `${dialCode || target.firstChar}${resolvedPhone}`;
      } else {
        resolvedPhone = `${dialCode ||
          target.firstChar}${resolvedPhone.substring(1)}`;
      }
    }
  }
  return {
    resolvedCell,
    resolvedPhone,
  };
};

export default applyResolvers;
