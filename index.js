import fs from "fs";
import csv from "csv-parser";
import processData from "./rmDuplicate.js";
import calculateRate from "./calucate.js";

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
    1000000: 0.01,
  },
  "/v1/matchFace": {
    10000: 0.07,
    30000: 0.06,
    100000: 0.05,
    300000: 0.04,
    500000: 0.03,
    1000000: 0.03,
  },
};

fs.createReadStream("data.csv") // Happy Bank- January Consumption.csv
  .pipe(csv({}))
  .on("error", (err) => console.log(err))
  .on("data", (data) => {
    processData(data, client, removeDuplicate, apiUserCount);
  })
  .on("end", () => {
    // Iterate through the apiUserCount object for client Id
    Object.keys(apiUserCount).forEach((app) => {
      console.log("For Client ID", app);
      if (!finalResult.app) {
        finalResult[app] = {};
      }
      let grandTotal = 0;
      // Iterate through the Api Name object for api url
      Object.keys(apiUserCount[app]).forEach((apiName) => {
        console.log(
          `Total Number of Customers in ${apiName}:`,
          apiUserCount[app][apiName]
        );
        const count = apiUserCount[app][apiName];

        // Call the calculateRate function to calculate the number of customers and charge amount
        const rate = calculateRate(count, apiName, api);
        finalResult[app][apiName] = {
          numberOfCustomers: apiUserCount[app][apiName],
          total: rate,
        };
        grandTotal += rate;
      });
      finalResult[app]["totalPrice"] = grandTotal;
      console.log("Total Charge Amount:", grandTotal);
    });
    console.log(finalResult);
  });
