const matchesData=require('../data/matches.json')
const fs = require('fs')
const saveToJson=require('./saveToJson')



// function calculateMatchesPerYear(data) {
//   const matchesPerYear = {}

//   for (let i = 0; i < data.length; i++) {
//     const { season } = data[i]
//     matchesPerYear[season] = (matchesPerYear[season] || 0) + 1
//   }
//  return matchesPerYear
// }

function calculateMatchesPerYear(data){
  return data.reduce((matchesPerYear,match) => {
    const season=match.season
    matchesPerYear[season]=(matchesPerYear[season]||0)+1
    return matchesPerYear
  },{})
}



saveToJson('./src/public/output/matchesPerYear.json',calculateMatchesPerYear(matchesData))

module.exports=calculateMatchesPerYear