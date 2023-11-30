const matchesData = require("../data/matches.json");
const deliveriesData = require("../data/deliveries.json");
const fs = require("fs");
const saveToJson = require("./saveToJson");
const { run } = require("jest");

// function strikeRateOfBatsmanEachYear(deliveriesData,matchesData){
//     const matchIdToSeason = {}
//     matchesData.forEach((match) => {
//         matchIdToSeason[match.id] = match.season
//     })

//     const runsPerBatsman={}
//     const ballsPerBatsman={}

//     for(let i=0;i<deliveriesData.length;i++){
//         const delivery=deliveriesData[i]
//         const batsman=delivery.batsman
//         const matchId=delivery.match_id
//         const season=matchIdToSeason[matchId]

//         const runs=parseInt(delivery.batsman_runs,10)
//         const extras=parseInt(delivery.extra_runs,10)
//         const isWide=delivery.wide_runs>0

//         if(!isWide){
//             runsPerBatsman[batsman]=runsPerBatsman[batsman] || {}
//             runsPerBatsman[batsman][season]=runsPerBatsman[batsman][season] || 0

//             ballsPerBatsman[batsman]=ballsPerBatsman[batsman] || {}
//             ballsPerBatsman[batsman][season]=ballsPerBatsman[batsman][season] || 0

//             runsPerBatsman[batsman][season]+=runs
//             ballsPerBatsman[batsman][season]+=1

//         }
//     }

//     const strikeRatePerBatsman={}
//     Object.keys(runsPerBatsman).forEach((batsman)=>{
//         strikeRatePerBatsman[batsman]={}
//         Object.keys(runsPerBatsman[batsman]).forEach((season) => {
//             const runs=runsPerBatsman[batsman][season]
//             const ballsFaced=ballsPerBatsman[batsman][season]
//             const strikeRate=((runs/ballsFaced)*100).toFixed(2)
//             strikeRatePerBatsman[batsman][season]=strikeRate
//         })
//     })
//     return strikeRatePerBatsman

// }

function strikeRateOfBatsmanEachYear(deliveriesData, matchesData) {
  const matchIdToSeason = {};
  matchesData.forEach((match) => {
    matchIdToSeason[match.id] = match.season;
  });

  const runsPerBatsman = deliveriesData
    .filter((delivery) => {
      const matchId = delivery.match_id;
      const season = matchIdToSeason[matchId];
      const isWide = delivery.wide_runs > 0;
      return !isWide;
    })
    .reduce((acc, delivery) => {
      const batsman = delivery.batsman;
      const matchId = delivery.match_id;
      const season = matchIdToSeason[matchId];
      const runs = parseInt(delivery.batsman_runs, 10);
      acc[batsman] = acc[batsman] || {};
      acc[batsman][season] = (acc[batsman][season] || 0) + runs;
      return acc;
    }, {});

  const ballsPerBatsman = deliveriesData
    .filter((delivery) => {
      const matchId = delivery.match_id;
      const season = matchIdToSeason[matchId];
      const isWide = delivery.wide_runs > 0;
      return !isWide;
    })
    .reduce((acc, delivery) => {
      const batsman = delivery.batsman;
      const matchId = delivery.match_id;
      const season = matchIdToSeason[matchId];
      acc[batsman] = acc[batsman] || {};
      acc[batsman][season] = (acc[batsman][season] || 0) + 1;
      return acc;
    }, {});

  const strikeRatePerBatsman = Object.keys(runsPerBatsman).reduce(
    (result, batsman) => {
      result[batsman] = {};
      Object.keys(runsPerBatsman[batsman]).forEach((season) => {
        const runs = runsPerBatsman[batsman][season];
        const balls = ballsPerBatsman[batsman];
        if (balls && balls[season]) {
          const strikeRate = ((runs / balls[season]) * 100).toFixed(2);
          result[batsman][season] = strikeRate;
        } else {
          result[batsman][season] = "NA";
        }
      });
      return result;
    },
    {}
  );
  return strikeRatePerBatsman;
}

saveToJson(
  "./src/public/output/strikeRatePerBatsmanEachYear.json",
  strikeRateOfBatsmanEachYear(deliveriesData, matchesData)
);

module.exports = strikeRateOfBatsmanEachYear;
