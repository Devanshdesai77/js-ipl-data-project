const fs = require('fs');
const path = require('path');
const csvToJson = require('csvtojson');

function convertCsvToJson(csvFileName, callback) {
  const csvFilePath = path.join(__dirname, '..', 'data', `${csvFileName}.csv`);

  if (!fs.existsSync(csvFilePath)) {
    const error = `Error: File does not exist. Check to make sure the file path to your csv is correct: ${csvFilePath}`;
    console.error(error);
    callback(error, null);
    return;
  }

  csvToJson()
    .fromFile(csvFilePath)
    .then((jsonArray) => {
      callback(null, jsonArray);
    })
    .catch((error) => {
      console.error(`Error converting ${csvFilePath} to JSON:`, error);
      callback(error, null);
    });
}

// Export datasets
module.exports = {
  convertCsvToJson,
};




