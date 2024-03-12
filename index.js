import fs from "fs";
import csv from "csv-parser";
import processData from "./helpers/data.js";
import IterateData from "./helpers/iterate.js";

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

fs.createReadStream("Happy Bank- January Consumption.csv") // Happy Bank- January Consumption.csv
  .pipe(csv({}))
  .on("error", (err) => console.log(err))
  .on("data", (data) => {
    processData(data, client, removeDuplicate, apiUserCount);
  })
  .on("end", () => {
    IterateData(apiUserCount,finalResult,api)
    console.log(finalResult);
  });
