export interface IPhoneTable {
  [key: string]: Array<IPhoneTableCell>;
}

export interface IPhoneTableCell {
  secondNumbers: Array<number>;
  countries: Array<ICountry>;
}

export interface ICountry {
  code: string;
  dialCode: string;
}

export interface IMaskOptions {
  appendTail?: boolean;
}

export interface IResolver {
  options: Array<IResolverOption>;
  target: IResolverTarget;
}

export interface IResolverOption {
  value: string;
  replace?: boolean;
}

export interface IResolverTarget {
  firstChar: string;
  code: string;
}

export interface IFormat extends IMaskOptions {
  code: string;
  mask?: string;
}

export type TResolverResult = {
  resolvedCell: IPhoneTableCell | null;
  resolvedPhone: string;
};

export type TPhoneParserOptions = {
  resolvers?: Array<IResolver>;
  formats?: Array<IFormat>;
};

export type TParsedPhone = {
  code: string | null;
  dialCode: string | null;
  nationalNumber: string | null;
  formattedNumber: string;
};
