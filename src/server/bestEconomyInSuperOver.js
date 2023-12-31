const fs = require("fs");
const deliveriesData = require("../data/deliveries.json");
const saveToJson = require("./saveToJson");

// function bestEconomyInSuperOver(deliveriesData){
//     const superOverData=deliveriesData.filter((delivery) => delivery.is_super_over === '1')

//     const runsByBowler = {}
//     const ballsByBowler = {}

//     superOverData.forEach((delivery) => {
//         const bowler = delivery.bowler
//         const totalRuns = parseInt(delivery.total_runs, 10)
//         const isWide = delivery.wide_runs > 0
//         const isNoBall = delivery.noball_runs > 0
//         const legBye=parseInt(delivery.legbye_runs,10)
//         const bye=parseInt(delivery.bye_runs,10)

//         if(legBye===0 && bye===0){
//         runsByBowler[bowler] = (runsByBowler[bowler] || 0) +totalRuns
//         }
//         if (!isWide && !isNoBall) {
//             ballsByBowler[bowler] = (ballsByBowler[bowler] || 0) + 1
//         }
//     })

//     const bowlersWithEconomy = Object.keys(runsByBowler).map((bowler) => {
//         const runs = runsByBowler[bowler]
//         const balls = ballsByBowler[bowler]
//         const economy = balls > 0 ? (runs / balls) * 6 : 0

//         return { bowler, economy }
//     })

//     bowlersWithEconomy.sort((a, b) => a.economy - b.economy)
//     const bestEconomyBowler = bowlersWithEconomy[0]

//   return bestEconomyBowler
// }

function bestEconomyInSuperOver(deliveriesData) {
  const superOverData = deliveriesData.filter((delivery) => {
    return delivery.is_super_over === "1";
  });

  const runsByBowler = superOverData.reduce((result, delivery) => {
    const bowler = delivery.bowler;
    const total_runs = parseInt(delivery.total_runs, 10);
    const legBye = parseInt(delivery.legbye_runs, 10);
    const bye = parseInt(delivery.bye_runs, 10);
    if (legBye === 0 && bye === 0) {
      result[bowler] = (result[bowler] || 0) + total_runs;
    }

    return result;
  }, {});

  const ballsByBowler = superOverData.reduce((result, delivery) => {
    const bowler = delivery.bowler;
    const isWide = delivery.wide_runs > 0;
    const isNoBall = delivery.noball_runs > 0;

    if (!isWide && !isNoBall) {
      result[bowler] = (result[bowler] || 0) + 1;
    }
    return result;
  }, {});

  const bowlersWithEconomy = Object.keys(runsByBowler).map((bowler) => {
    const runs = runsByBowler[bowler];
    const balls = ballsByBowler[bowler];
    const economy = balls > 0 ? (runs / balls) * 6 : 0;

    return { bowler, economy };
  });
  
  bestEconomyBowler = bowlersWithEconomy.sort((a, b) => {
    return a.economy - b.economy;
  })[0];

  return bestEconomyBowler;
}

saveToJson(
  "./src/public/output/bestEconomyInSuperOver.json",
  bestEconomyInSuperOver(deliveriesData)
);

module.exports = bestEconomyInSuperOver;
