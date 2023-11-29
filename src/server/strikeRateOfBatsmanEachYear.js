const matchesData=require('../data/matches.json')
const deliveriesData=require('../data/deliveries.json')
const fs=require('fs')
const saveToJson=require('./saveToJson')

function strikeRateOfBatsmanEachYear(deliveriesData,matchesData){
    const matchIdToSeason = {}
    matchesData.forEach((match) => {
        matchIdToSeason[match.id] = match.season
    })

    const runsPerBatsman={}
    const ballsPerBatsman={}

    for(let i=0;i<deliveriesData.length;i++){
        const delivery=deliveriesData[i]
        const batsman=delivery.batsman
        const matchId=delivery.match_id
        const season=matchIdToSeason[matchId]

        const runs=parseInt(delivery.batsman_runs,10)
        const extras=parseInt(delivery.extra_runs,10)
        const isWide=delivery.wide_runs>0

        if(!isWide){
            runsPerBatsman[batsman]=runsPerBatsman[batsman] || {}
            runsPerBatsman[batsman][season]=runsPerBatsman[batsman][season] || 0

            ballsPerBatsman[batsman]=ballsPerBatsman[batsman] || {}
            ballsPerBatsman[batsman][season]=ballsPerBatsman[batsman][season] || 0

            runsPerBatsman[batsman][season]+=runs
            ballsPerBatsman[batsman][season]+=1

        }
    }

    const strikeRatePerBatsman={}
    Object.keys(runsPerBatsman).forEach((batsman)=>{
        strikeRatePerBatsman[batsman]={}
        Object.keys(runsPerBatsman[batsman]).forEach((season) => {
            const runs=runsPerBatsman[batsman][season]
            const ballsFaced=ballsPerBatsman[batsman][season]
            const strikeRate=((runs/ballsFaced)*100).toFixed(2)
            strikeRatePerBatsman[batsman][season]=strikeRate
        })
    })
    return strikeRatePerBatsman

    
}

saveToJson('./src/public/output/strikeRatePerBatsmanEachYear.json', strikeRateOfBatsmanEachYear(deliveriesData,matchesData))


