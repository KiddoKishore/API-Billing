import calculateRate from '../helpers/calucate.js';

describe('calculateRate function', () => {
  test('it should calculate the total charge amount correctly', () => {
    const api = {
      '/v1/checkLiveness': {
        10000: 0.06,
        30000: 0.05,
      },
    };

    const count = 25000; // assuming 25,000 customers
    const apiName = '/v1/checkLiveness';

    const total = calculateRate(count, apiName, api);

    // Write your assertions to verify the calculated total
    expect(total).toBe(1350); // Total charge for 25,000 customers should be 1000
  });
});