const fs = require("fs");
const path = require("path");
const csvToJson = require("csvtojson");

function convertCsvToJson(csvFileName, outputFilePath, callback) {
  const csvFilePath = path.join(__dirname, "..", "data", `${csvFileName}.csv`);

  if (!fs.existsSync(csvFilePath)) {
    const error = `Error: File does not exist.${csvFilePath}`;
    console.error(error);
    callback(error, null);
    return;
  }

  csvToJson()
    .fromFile(csvFilePath)
    .then((jsonArray) => {
      fs.writeFile(
        outputFilePath,
        JSON.stringify(jsonArray, null, 2),
        (err) => {
          if (err) {
            console.error(`Error writing JSON file ${outputFilePath}:`, err);
            callback(err, null);
          } else {
            console.log(`Data saved to ${outputFilePath}`);
            callback(null, jsonArray);
          }
        }
      );
    })
    .catch((error) => {
      console.error(`Error converting ${csvFilePath} to JSON:`, error);
      callback(error, null);
    });
}

const matchesOutputFilePath = "./src/data/matches.json";
const deliveriesOutputFilePath = "./src/data/deliveries.json";

convertCsvToJson(
  "matches",
  matchesOutputFilePath,
  (errorMatches, dataMatches) => {
    if (errorMatches) {
      console.error(errorMatches);
    }
  }
);

convertCsvToJson(
  "deliveries",
  deliveriesOutputFilePath,
  (errorDeliveries, dataDeliveries) => {
    if (errorDeliveries) {
      console.error(errorDeliveries);
    }
  }
);
