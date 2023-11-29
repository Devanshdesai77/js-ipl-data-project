const matchesData=require('../data/matches.json')
const fs=require('fs')
const saveToJson=require('./saveToJson')

function calculateMatchesWonPerTeamPerYear(matchesData) {
  const matchesWonPerTeamPerYear = {}

  for (let i = 0; i < matchesData.length; i++) {
    const { season, winner } = matchesData[i]

    if (winner) {
      
      matchesWonPerTeamPerYear[season] = matchesWonPerTeamPerYear[season] || {}

      
      matchesWonPerTeamPerYear[season][winner] = (matchesWonPerTeamPerYear[season][winner] || 0) + 1
    }
  }
    return matchesWonPerTeamPerYear
    }


saveToJson('./src/public/output/matchesWonPerTeamPerYear.json', calculateMatchesWonPerTeamPerYear(matchesData))
  
module.exports=calculateMatchesWonPerTeamPerYear


