import IterateData from '../helpers/iterate.js';

describe('IterateData function', () => {
  test('it should calculate the total charge for each client correctly', () => {
    const apiUserCount = {
      'appId1': {
        '/v1/checkLiveness': 10000,
        '/v1/matchFace': 15000,
      },
      'appId2': {
        '/v1/checkLiveness': 20000,
      },
    };

    const api = {
      '/v1/checkLiveness': {
        10000: 0.06,
        30000: 0.05,
      },
      '/v1/matchFace': {
        10000: 0.07,
        30000: 0.06,
      },
    };

    const finalResult = {};
    IterateData(apiUserCount, finalResult, api);

    expect(finalResult['appId1']['totalPrice']).toBe(1600);
    expect(finalResult['appId2']['totalPrice']).toBe(1100);
  });
});