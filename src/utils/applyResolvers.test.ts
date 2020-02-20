import applyResolvers from './applyResolvers';

describe('applyResolvers tests', () => {
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

  const resolvedCell = {
    secondNumbers: [0, 1, 2, 3, 4, 5, 8, 9],
    countries: [
      {
        code: 'RU',
        dialCode: '+7',
      },
    ],
  };

  test('Should get resolved data without replace input value', () => {
    const result = applyResolvers('917', resolvers);

    expect(result).toEqual({
      resolvedCell,
      resolvedPhone: '7917',
    });
  });

  test('Should get resolved data with replace input value', () => {
    const result = applyResolvers('8917', resolvers);

    expect(result).toEqual({
      resolvedCell,
      resolvedPhone: '7917',
    });
  });

  test('Should not apply resolver', () => {
    const result = applyResolvers('7917', resolvers);

    expect(result).toEqual({
      resolvedCell: null,
      resolvedPhone: '7917',
    });
  });
});
