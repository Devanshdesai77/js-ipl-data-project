const csvConverter = require('./csvToJsonConverter')
const fs = require('fs')

function highestPlayerOfMatchEachYear(matchesData) {
    const playerofMatchEachYear = {}
    for (let i = 0; i < matchesData.length; i++) {
        const match = matchesData[i]
        const season = match.season
        const playerOfMatch = match.player_of_match

        playerofMatchEachYear[season] = playerofMatchEachYear[season] || {}

        playerofMatchEachYear[season][playerOfMatch] = (playerofMatchEachYear[season][playerOfMatch] || 0) + 1
    }
    
    const highestPlayerOfMatch={}
    Object.keys(playerofMatchEachYear).forEach((season) => {
        const playerCount=playerofMatchEachYear[season]
        let highestPlayer=null
        let highestCount=0

        Object.keys(playerCount).forEach((player) => {
         const count=playerCount[player]
         if(count>highestCount){
            highestCount=count
            highestPlayer=player
         }   
        })
        highestPlayerOfMatch[season]={player:highestPlayer,count: highestCount}
    })
  
    saveToJson('./src/public/output/highestPlayerOfMatchEachYear.json', highestPlayerOfMatch)
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
    
      highestPlayerOfMatchEachYear(matchesData)
    }
  })