const csvConverter = require('./csvToJsonConverter')
const fs = require('fs')

function top10EconomicalBowler(deliveriesData, matchesData) {
    const matchIdToSeason = {}
    matchesData.forEach((match) => {
        matchIdToSeason[match.id] = match.season
    })

    const runsByBowler = {}
    const ballsByBowler={}

    for (let i = 0; i < deliveriesData.length; i++) {
        const delivery = deliveriesData[i]
        const matchId = delivery.match_id
        const year = matchIdToSeason[matchId]

        if (year === '2015') {
            const bowler = delivery.bowler
            const total_runs = parseInt(delivery.total_runs, 10)
            const extra = parseInt(delivery.extra_runs,10)
            const isWide = delivery.wide_runs > 0
            const isNoBall = delivery.noball_runs > 0
            if(delivery.legbye_runs==0 && delivery.bye_runs==0){
                runsByBowler[bowler]=(runsByBowler[bowler] || 0) +total_runs
                
            }

            if(!isWide && !isNoBall){
                ballsByBowler[bowler]=(ballsByBowler[bowler] || 0)+1
            }
            

        }
    }
    
    const bowlersWithEconomy = Object.keys(runsByBowler).map((bowler) => {
        const runs = runsByBowler[bowler]
        const balls = ballsByBowler[bowler]
        const economy = balls > 0 ? (runs / balls) * 6 : 0
         
        return { bowler, economy, runs, balls }
      })
    
      
      bowlersWithEconomy.sort((a, b) => a.economy - b.economy)
     
    
      const top10EconomicalBowlers = bowlersWithEconomy.slice(0, 10)
    
    
    saveToJson('./src/public/output/top10EconomicalBowler.json', top10EconomicalBowlers)
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
        
        csvConverter.convertCsvToJson('matches', (error, matchesData) => {
            if (error) {
                console.log('Error:', error)
            } else {
                
                top10EconomicalBowler(deliveriesData, matchesData)
            }
        })


    }
})

