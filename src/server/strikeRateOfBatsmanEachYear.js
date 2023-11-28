const csvConverter=require('./csvToJsonConverter')
const fs=require('fs')

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

    saveToJson('./src/public/output/strikeRatePerBatsmanEachYear.json', strikeRatePerBatsman)
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
    }
    else {
        console.log('Deliveries Data: ', deliveriesData)
        csvConverter.convertCsvToJson('matches', (error, matchesData) => {
            if (error) {
                console.log('Error:', error)
            } else {
                console.log('MatchesData: ', matchesData)
                strikeRateOfBatsmanEachYear(deliveriesData,matchesData)
            }
        })


    }
})

