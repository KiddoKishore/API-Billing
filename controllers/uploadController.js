import csv from "csv-parser";
import fs from "fs";
import { readFile } from "../helpers/uploadHelper.js";

const uploadController = async (req, res) => {
    const api = []
    const statusCode = []
    await new Promise((resolve, reject) => {
        fs.createReadStream(req.file.originalname)
            .pipe(csv())
            .on("error", (err) => reject(err))
            .on('data', (data) => {
                readFile(data, api, statusCode)
            })
            .on("end", () => {
                res.status(200).json({
                    message: 'File Uploaded Successfully',
                    api,statusCode,file: `${req.file.path}`
                })
                resolve()
            })
    })
}


export { uploadController }