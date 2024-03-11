import fs from 'fs';
import csv from 'csv-parser';

function processData(result, uniqueValues, apiUserCount, data) {
    const transaction_id = data.transaction_id;
    const api = data.originalurl;
    const uniqueKey = `${transaction_id}-${api}`;
  
    if (!uniqueValues.has(uniqueKey)) {
      uniqueValues.add(uniqueKey);
      result.push(data);
      if (apiUserCount[api]) {
        apiUserCount[api]++;
    } else {
        apiUserCount[api] = 1;
    }
    }
}

function calculateRate(count, api) {
    if (count < 10000) {
      return api === '/v1/checkLiveness' ? 0.06 : 0.07;
    } else if (count < 30000) {
      return api === '/v1/checkLiveness' ? 0.05 : 0.06;
    } else if (count < 100000) {
      return api === '/v1/checkLiveness' ? 0.04 : 0.05;
    } else if (count < 300000) {
      return api === '/v1/checkLiveness' ? 0.03 : 0.04;
    } else if (count < 500000) {
      return api === '/v1/checkLiveness' ? 0.02 : 0.03;
    } else {
      return api === '/v1/checkLiveness' ? 0.01 : 0.03;
    }
  }

const result = [];
const uniqueValues = new Set();
const apiUserCount = {};
let grandTotal = 0

fs.createReadStream('data.csv') // Happy Bank- January Consumption.csv
    .pipe(csv({}))
    .on('error', (err) => console.log(err))
    .on('data', (data) => {
        processData(result, uniqueValues, apiUserCount, data);
    })
    .on('end', () => {
        Object.keys(apiUserCount).forEach(api => {
        const count = apiUserCount[api];
        const rate = calculateRate(count, api);
        grandTotal += count * rate;
        });
    console.log(grandTotal)
});
