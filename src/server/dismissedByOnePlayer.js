const deliveriesData = require("../data/deliveries.json");
const fs = require("fs");
const saveToJson = require("./saveToJson");

// function dismissedByOnePlayer(deliveriesData) {
//     const dismissedCount = {}

//     for (let i = 0; i < deliveriesData.length; i++) {
//         const delivery = deliveriesData[i]
//         const dismissedPlayer = delivery.player_dismissed
//         const bowler = delivery.bowler
//         const dismissalKind = delivery.dismissal_kind

//         if (dismissedPlayer && dismissalKind !== 'run out') {
//             dismissedCount[dismissedPlayer] = dismissedCount[dismissedPlayer] || {}
//             dismissedCount[dismissedPlayer][bowler] = (dismissedCount[dismissedPlayer][bowler] || 0) + 1
//         }
//     }

//     let highestDismissalPlayer = { player: '', bowler: '', count: 0 }

//     Object.keys(dismissedCount).forEach((dismissedPlayer) => {
//         Object.keys(dismissedCount[dismissedPlayer]).forEach((bowler) => {
//             const count = dismissedCount[dismissedPlayer][bowler]

//             if (count > highestDismissalPlayer.count) {
//                 highestDismissalPlayer = { player: dismissedPlayer, bowler, count }
//             }
//         })
//     })
//     return highestDismissalPlayer
// }

function dismissedByOnePlayer(deliveriesData) {
  const dismissedCount = deliveriesData.reduce((result, delivery) => {
    const dismissedPlayer = delivery.player_dismissed;
    const bowler = delivery.bowler;
    const dismissalKind = delivery.dismissal_kind;
    if (dismissedPlayer && dismissalKind !== "run out") {
      result[dismissedPlayer] = result[dismissedPlayer] || {};
      result[dismissedPlayer][bowler] =
        (result[dismissedPlayer][bowler] || 0) + 1;
    }
    return result;
  }, {});

  const highestDismissalPlayer = Object.keys(dismissedCount).reduce(
    (highestPlayer, dismissedPlayer) => {
      Object.keys(dismissedCount[dismissedPlayer]).forEach((bowler) => {
        const count = dismissedCount[dismissedPlayer][bowler];
        if (count > highestPlayer.count) {
          highestPlayer = { player: dismissedPlayer, bowler, count };
        }
      });
      return highestPlayer;
    },
    { player: "", bowler: "", count: 0 }
  );
  return highestDismissalPlayer;
}

saveToJson(
  "./src/public/output/dismissedByOnePlayer.json",
  dismissedByOnePlayer(deliveriesData)
);

module.exports = dismissedByOnePlayer;
