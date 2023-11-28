const csvConverter = require('./csvToJsonConverter')
const fs = require('fs')

function dismissedByOnePlayer(deliveriesData) {
    const dismissedCount = {}

    for (let i = 0; i < deliveriesData.length; i++) {
        const delivery = deliveriesData[i]
        const dismissedPlayer = delivery.player_dismissed
        const bowler = delivery.bowler
        const dismissalKind = delivery.dismissal_kind

        if (dismissedPlayer && dismissalKind !== 'run out') {
            dismissedCount[dismissedPlayer] = dismissedCount[dismissedPlayer] || {}
            dismissedCount[dismissedPlayer][bowler] = (dismissedCount[dismissedPlayer][bowler] || 0) + 1
        }
    }

    let highestDismissalPlayer = { player: '', bowler: '', count: 0 }

    Object.keys(dismissedCount).forEach((dismissedPlayer) => {
        Object.keys(dismissedCount[dismissedPlayer]).forEach((bowler) => {
            const count = dismissedCount[dismissedPlayer][bowler]

            if (count > highestDismissalPlayer.count) {
                highestDismissalPlayer = { player: dismissedPlayer, bowler, count }
            }
        })
    })

    saveToJson('./src/public/output/dismissedByOnePlayer.json', highestDismissalPlayer)
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

csvConverter.convertCsvToJson('deliveries', (error, deliveriesData) => {
    if (error) {
        console.log('Error:', error)
    } else {
        console.log('Deliveries Data: ', deliveriesData)
        dismissedByOnePlayer(deliveriesData)
    }
})