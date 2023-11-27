const csvConverter = require('./csvToJsonConverter')
const fs=require('fs')

function calculateMatchesWonPerTeamPerYear(matchesData) {
  const matchesWonPerTeamPerYear = {}

  for (let i = 0; i < matchesData.length; i++) {
    const { season, winner } = matchesData[i]

    if (winner) {
      
      matchesWonPerTeamPerYear[season] = matchesWonPerTeamPerYear[season] || {}

      
      matchesWonPerTeamPerYear[season][winner] = (matchesWonPerTeamPerYear[season][winner] || 0) + 1
    }
  }
    
    saveToJson('./src/public/output/matchesWonPerTeamPerYear.json', matchesWonPerTeamPerYear)
  }

 
function saveToJson(filePath, data) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err)
    } else {
      console.log(`Data saved to ${filePath}`)
    }
  })
}


csvConverter.convertCsvToJson('matches', (error, matchesData) => {
  if (error) {
    console.error('Error:', error)
  } else {
    // Use matchesData in your program
    console.log('Matches Data:', matchesData)

    // Call the function with matchesData
    calculateMatchesWonPerTeamPerYear(matchesData)
  }
})


