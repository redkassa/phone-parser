import setMask from './setMask';

describe('setMask tests (without dialCode)', () => {
  const mask = '###-###-####';

  test('Should get formatted phone number', () => {
    const result = setMask('2501234567', mask);
    expect(result).toEqual('250-123-4567');
  });

  test('Should get formatted phone number without tail', () => {
    const result = setMask('25012345678910', mask);
    expect(result).toEqual('250-123-4567');
  });

  test('Should get formatted phone number with tail', () => {
    const result = setMask('25012345678910', mask, {
      appendTail: true,
    });
    expect(result).toEqual('250-123-45678910');
  });

  test('Should get empty value if pass empty string', () => {
    const result = setMask('', mask);
    expect(result).toEqual('');
  });

  test('Should get incorrect formatted phone if pass string contained non digit', () => {
    const result = setMask('250-123_45 67', mask);
    expect(result).not.toEqual('250-123-4567');
  });

  test('Should get formatted part phone if pass not completed string', () => {
    const result = setMask('25012345', mask);
    expect(result).toEqual('250-123-45');
  });

  test('Should get formatted phone if pass incorrect mask', () => {
    const result = setMask('2501234567', '+ ##$# - ### - ##a##');
    expect(result).toEqual('250 - 123 - 4567');
  });
});
