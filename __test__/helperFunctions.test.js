const { checkVal, responseReceived } = require('../helperFunctions');

describe('checkVal function tests', () => {
  test('alphanumeric string', () => {
    expect(checkVal('test')).toBeFalsy();
    expect(checkVal('joe')).toBeFalsy();
    expect(checkVal('1t3s')).toBeFalsy();
    expect(checkVal('144555s')).toBeFalsy();
  }),
    test('numeric values', () => {
      expect(checkVal('100')).toBeTruthy();
      expect(checkVal('1000')).toBeTruthy();
      expect(checkVal(1000)).toBeTruthy();
      expect(checkVal('1400')).toBeTruthy();
    }),
    test('unwanted numeric values', () => {
      expect(checkVal('-5')).toBeFalsy();
      expect(checkVal('1850')).toBeFalsy();
      expect(checkVal(1600)).toBeFalsy();
      expect(checkVal('0')).toBeFalsy();
    });
  test('unwanted values', () => {
    expect(checkVal([])).toBeFalsy();
    expect(checkVal('["test"]')).toBeFalsy();
    expect(checkVal(undefined)).toBeFalsy();
    expect(checkVal(null)).toBeFalsy();
    expect(checkVal(NaN)).toBeFalsy();
  });
});

describe('responseReceived function tests', () => {
  test('alphanumeric string', () => {
    expect(
      responseReceived('test').fold(
        (x) => 'nope',
        (x) => x
      )
    ).not.toBe('test');
    expect(
      responseReceived('joe').fold(
        (x) => 'nope',
        (x) => x
      )
    ).not.toBe('joe');
    expect(
      responseReceived('1t3s').fold(
        (x) => 'nope',
        (x) => x
      )
    ).not.toBe('1t3s');
    expect(
      responseReceived('144555s').fold(
        (x) => 'nope',
        (x) => x
      )
    ).not.toBe('144555s');
  }),
    test('numeric values', () => {
      expect(
        responseReceived('100').fold(
          (x) => 'nope',
          (x) => x
        )
      ).toBe('100');
      expect(
        responseReceived('1000').fold(
          (x) => 'nope',
          (x) => x
        )
      ).toBe('1000');
      expect(
        responseReceived(1000).fold(
          (x) => 'nope',
          (x) => x
        )
      ).toBe(1000);
      expect(
        responseReceived('1400').fold(
          (x) => 'nope',
          (x) => x
        )
      ).toBe('1400');
    }),
    test('unwanted numeric values', () => {
      expect(
        responseReceived('-5').fold(
          (x) => 'nope',
          (x) => x
        )
      ).not.toBe('-5');
      expect(
        responseReceived('1850').fold(
          (x) => 'nope',
          (x) => x
        )
      ).not.toBe('1850');
      expect(
        responseReceived(1600).fold(
          (x) => 'nope',
          (x) => x
        )
      ).not.toBe(1600);
      expect(
        responseReceived('0').fold(
          (x) => 'nope',
          (x) => x
        )
      ).not.toBe('0');
    });
  test('unwanted values', () => {
    expect(
      responseReceived([]).fold(
        (x) => 'nope',
        (x) => x
      )
    ).not.toBe([]);
    expect(
      responseReceived(['test']).fold(
        (x) => 'nope',
        (x) => x
      )
    ).not.toBe(['test']);
    expect(
      responseReceived(undefined).fold(
        (x) => 'nope',
        (x) => x
      )
    ).not.toBe(undefined);
    expect(
      responseReceived(null).fold(
        (x) => 'nope',
        (x) => x
      )
    ).not.toBe(null);
    expect(
      responseReceived(NaN).fold(
        (x) => 'nope',
        (x) => x
      )
    ).not.toBe(NaN);
  });
});
