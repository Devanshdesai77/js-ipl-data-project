const matchesData=require('../data/matches.json')
const fs = require('fs')
const saveToJson=require('./saveToJson')



function calculateMatchesPerYear(Data) {
  const matchesPerYear = {}

  for (let i = 0; i < Data.length; i++) {
    const { season } = Data[i]
    matchesPerYear[season] = (matchesPerYear[season] || 0) + 1
  }
 return matchesPerYear
}



saveToJson('./src/public/output/matchesPerYear.json',calculateMatchesPerYear(matchesData))

module.exports=calculateMatchesPerYear