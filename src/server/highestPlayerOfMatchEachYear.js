const matchesData = require('../data/matches.json')
const deliveriesData=require('../data/deliveries.json')
const fs = require('fs')
const saveToJson=require('./saveToJson')

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
    return highestPlayerOfMatch
    
}
saveToJson('./src/public/output/highestPlayerOfMatchEachYear.json', highestPlayerOfMatchEachYear(matchesData))

