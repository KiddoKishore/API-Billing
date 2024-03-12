import fs from 'fs';
import csv from 'csv-parser';

const result = [];
const uniqueValues = new Set();
const apiUserCount = {};
const client = [];
const removeDuplicate = new Set();
const finalResult = [];

const api = {
  "/v1/checkLiveness": {
    10000: 0.06,
    30000: 0.05,
    100000: 0.04,
    300000: 0.03,
    500000: 0.02,
    500001: 0.01
  },
  "/v1/matchFace": {
    10000: 0.07,
    30000: 0.06,
    100000: 0.05,
    300000: 0.04,
    500000: 0.03,
    500001: 0.03,
  },
};

function clientData(data) {
  const appId = data.appid
  const transaction_id = data.transaction_id;
    const api = data.originalurl;

  // Check if the appId exists in the client object
  if (!client[appId]) {
    client[appId] = []; // Initialize array if not exists
  }

  // Create a unique key using appId, transaction_id, and api
  const uniqueKey = `${appId}-${transaction_id}-${api}`;

  // Remove the Duplicate values using transition_id, api Url and App id
  if(!removeDuplicate.has(uniqueKey)){
    removeDuplicate.add(uniqueKey);
    client[appId].push(data); // Push data to array
  }
}

function processData(data) {
    const transaction_id = data.transaction_id;
    const api = data.originalurl;
    const appId = data.appid

    // Create a unique key using appId, transaction_id, and api
    const uniqueKey = `${appId}-${transaction_id}-${api}`;
  
    // Remove the Duplicate values using transition_id and api Url
    if (!uniqueValues.has(uniqueKey)) {
      uniqueValues.add(uniqueKey);
      result.push(data); // Push data to array
      // Set the Number of Customer for every api
      if (!apiUserCount[appId]) {
        apiUserCount[appId] = {};
    }
    if (!apiUserCount[appId][api]) {
        apiUserCount[appId][api] = 1;
    } else {
        apiUserCount[appId][api]++;
    }
    }
}

// Set the charge amount using the Number of Customers uses the api
function calculateRate(count, apiName) {
  const apiData = api[apiName]
  let numberOfCustomer = count
  let totalPrice = 0
    Object.keys(apiData).forEach((api) => {
      const NumberOfCount = parseInt(api) // Make this Object Key String into Number
      if (numberOfCustomer >= NumberOfCount){
        totalPrice += NumberOfCount * apiData[api] // Multiple
        numberOfCustomer -= NumberOfCount
      } else {
        totalPrice += numberOfCustomer * apiData[api];
        numberOfCustomer -= numberOfCustomer
      }
      // console.log(totalPrice)
    })
    return totalPrice
  }

fs.createReadStream('Happy Bank- January Consumption.csv') // Happy Bank- January Consumption.csv
    .pipe(csv({}))
    .on('error', (err) => console.log(err))
    .on('data', (data) => {
        clientData(data)
        processData(data);
    })
    .on('end', () => {
      // Iterate through the apiUserCount object
      Object.keys(apiUserCount).forEach((app) => {
        console.log('For Client ID',app);
        if(!finalResult.app){
          finalResult[app] = {}
        }
        let grandTotal = 0;
        // Iterate through the Api Name object
        Object.keys(apiUserCount[app]).forEach((apiName) => {
          console.log(`Total Number of Customers in ${apiName}:`,apiUserCount[app][apiName])
          const count = apiUserCount[app][apiName];
          const rate = calculateRate(count, apiName); // Call the calculateRate function to calculate the number of customers and charge amount
          finalResult[app][apiName] = {'numberOfCustomers' : apiUserCount[app][apiName], 'total' : rate}
          grandTotal += rate; 
        })
        finalResult[app]['totalPrice'] = grandTotal
        console.log('Total Charge Amount:', grandTotal);
      });
      console.log(finalResult)
});