const csvConverter = require('./csvToJsonConverter')
const fs = require('fs')

function calculateMatchesPerYear(matchesData) {
  const matchesPerYear = {}

  for (let i = 0; i < matchesData.length; i++) {
    const { season } = matchesData[i]
    matchesPerYear[season] = (matchesPerYear[season] || 0) + 1
  }


  saveToJson('./src/public/output/matchesPerYear.json', matchesPerYear)
}


function saveToJson(filePath, data) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err)
    } else {
      console.log(`Data saved to ${filePath}`)
    }
  });
}


csvConverter.convertCsvToJson('matches', (error, matchesData) => {
  if (error) {
    console.error('Error:', error)
  } else {
    calculateMatchesPerYear(matchesData)
  }
})