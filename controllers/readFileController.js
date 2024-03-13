import csv from "csv-parser";
import fs from "fs";
import processData from "../helpers/data.js";
import IterateData from "../helpers/iterate.js";

const readFileController = async (req, res) => {
  try {
    const apiUserCount = {};
    const client = [];
    const removeDuplicate = new Set();
    const finalResult = {};
    const api = req.body;

    // Ensure that the file name is provided in the request body
    if (!req.body.fileName) {
      return res.status(400).send("File name is missing");
    }

    const filePath = req.body.fileName;

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }
    // Wrap the file processing in a promise
    await new Promise((resolve, reject) => {
      fs.createReadStream(req.body.fileName)
        .pipe(csv())
        .on("error", (err) => reject(err))
        .on("data", (data) => {
          processData(data, client, removeDuplicate, apiUserCount, api);
        })
        .on("end", () => {
        try {
            IterateData(apiUserCount, finalResult, api);
        } catch (error) {
           return res.send('API Not Found')
        }
          resolve();
          console.log(finalResult);
        });
    });
    // Send the response after processing is complete
    res.status(200).send(finalResult);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export { readFileController };
