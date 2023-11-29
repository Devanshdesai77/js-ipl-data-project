const matchesData = require('../data/matches.json')
const deliveriesData=require('../data/deliveries.json')
const fs = require('fs')
const saveToJson=require('./saveToJson')

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
    return extraRunsConcededPerTeam
}
saveToJson('./src/public/output/extraRunsConcededPerTeamin2016.json',extraRunsConcededPerTeam(deliveriesData,matchesData))


