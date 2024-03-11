import fs from 'fs';
import csv from 'csv-parser';

const result = [];
const uniqueValues = new Set();
const apiUserCount = {};
let grandTotal = 0

function processData(data) {
    const transaction_id = data.transaction_id;
    const api = data.originalurl;
    const uniqueKey = `${transaction_id}-${api}`;
  
    // Remove the Duplicate values using transition_id and api Url
    if (!uniqueValues.has(uniqueKey)) {
      uniqueValues.add(uniqueKey);
      result.push(data);
      // Set the Number of Customer for every api
      if (apiUserCount[api]) {
        apiUserCount[api]++;
    } else {
        apiUserCount[api] = 1;
    }
    }
}

// Set the charge amount using the Number of Customers uses the api
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

fs.createReadStream('Happy Bank- January Consumption.csv') // Happy Bank- January Consumption.csv
    .pipe(csv({}))
    .on('error', (err) => console.log(err))
    .on('data', (data) => {
        processData(data);
    })
    .on('end', () => {
      // Loop the Customers Count of every api
        Object.keys(apiUserCount).forEach(api => {
        console.log(`Total Number of Customers in ${api}:`,apiUserCount[api])
        const count = apiUserCount[api];
        // Get the Charge amount of the api
        const rate = calculateRate(count, api);
        console.log(`Charge Amount of ${api}:`, rate)
        // Calculate the Number of Customers and Charge amount of the api
        grandTotal += count * rate;
        });
    console.log('Total Charge Amount:',grandTotal)
});
