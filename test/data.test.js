import processData from "../helpers/data.js";

describe('processData function', () => {
    test('it should update client and apiUserCount objects correctly', () => {
      const client = [];
      const removeDuplicate = new Set();
      const apiUserCount = {};
      const data = {
        appid: 'appId',
        transaction_id: '123',
        originalurl: '/v1/checkLiveness',
        statuscode: 200,
      };

      const api = {
        "/v1/checkLiveness":{
          10000: 0.06
        },
        "statusCode": [ 200 ]
      }
  
      processData(data, client, removeDuplicate, apiUserCount,api);
  
      // Write your assertions to verify the updates in client and apiUserCount
      expect(client['appId']).toHaveLength(1);
      expect(apiUserCount['appId']['/v1/checkLiveness']).toBe(1);
      expect(removeDuplicate.size).toBe(1);
    });

    test('it should not update client and apiUserCount objects', () => {
      const client = [];
      const removeDuplicate = new Set();
      const apiUserCount = {};
      const data = {
        appid: 'appId',
        transaction_id: '123',
        originalurl: '/v1/checkLiveness',
        statuscode: 400,
      };

      const api = {
        "/v1/checkLiveness":{
          10000: 0.06
        },
        "statusCode": [ 200 ]
      }
  
      processData(data, client, removeDuplicate, apiUserCount,api);
      // Write your assertions to verify the updates in client and apiUserCount
      expect(client).toHaveLength(0);
      expect(apiUserCount).toEqual({});
      expect(removeDuplicate.size).toBe(0);
    })
  });
  