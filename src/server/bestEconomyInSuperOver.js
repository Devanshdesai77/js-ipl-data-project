const fs=require('fs')
const csvConverter=require('./csvToJsonConverter')

function bestEconomyInSuperOver(deliveriesData){
    const superOverData=deliveriesData.filter((delivery) => delivery.is_super_over === '1')
    
    const runsByBowler = {}
    const ballsByBowler = {}

    superOverData.forEach((delivery) => {
        const bowler = delivery.bowler
        const totalRuns = parseInt(delivery.total_runs, 10)
        const isWide = delivery.wide_runs > 0
        const isNoBall = delivery.noball_runs > 0
        const legBye=parseInt(delivery.legbye_runs,10)
        const bye=parseInt(delivery.bye_runs,10)

        
        runsByBowler[bowler] = (runsByBowler[bowler] || 0) + totalRuns-legBye-bye

        if (!isWide && !isNoBall) {
            ballsByBowler[bowler] = (ballsByBowler[bowler] || 0) + 1
        }
    })
  
    const bowlersWithEconomy = Object.keys(runsByBowler).map((bowler) => {
        const runs = runsByBowler[bowler]
        const balls = ballsByBowler[bowler]
        const economy = balls > 0 ? (runs / balls) * 6 : 0

        return { bowler, economy }
    })

    
    bowlersWithEconomy.sort((a, b) => a.economy - b.economy)
    const bestEconomyBowler = bowlersWithEconomy[0]

  saveToJson('./src/public/output/bestEconomyInSuperOver.json', bestEconomyBowler)
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
        
        bestEconomyInSuperOver(deliveriesData)
    }
})


