const csvConverter = require('./csvToJsonConverter')
const fs = require('fs')

function extraRunsConcededPerTeam(deliveriesData, matchesData) {
    const matchIdToSeason = {}
    matchesData.forEach((match) => {
        matchIdToSeason[match.id] = match.season
    })

    const extraRunsConcededPerTeam = {}

    for (let i = 0; i < deliveriesData.length; i++) {
        const delivery = deliveriesData[i]
        const matchId = delivery.match_id
        const season = matchIdToSeason[matchId]

        if (season === '2016') {
            const bowlingTeam = delivery.bowling_team
            const extraRuns = parseInt(delivery.extra_runs, 10)

            extraRunsConcededPerTeam[bowlingTeam] = extraRunsConcededPerTeam[bowlingTeam] || 0

            extraRunsConcededPerTeam[bowlingTeam] += extraRuns
        }
    }
    saveToJson('./src/public/output/extraRunsConcededPerTeamin2016.json', extraRunsConcededPerTeam)
}

function saveToJson(filePath, data) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing JSON file:', err)
        } else {
            console.log(`Data saved to ${filePath}`)
        }
    });
}

csvConverter.convertCsvToJson('deliveries', (error, deliveriesData) => {
    if (error) {
        console.log('Error:', error)
    }
    else {
        console.log('Deliveries Data: ', deliveriesData)
        csvConverter.convertCsvToJson('matches', (error, matchesData) => {
            if (error) {
                console.log('Error:', error)
            } else {
                console.log('MatchesData: ', matchesData)
                extraRunsConcededPerTeam(deliveriesData,matchesData)
            }
        })


    }
})
