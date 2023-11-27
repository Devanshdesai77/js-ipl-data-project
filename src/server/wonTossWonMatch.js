const csvConverter=require('./csvToJsonConverter')
const fs=require('fs')

function wonTossWonMatch(matchesData){
    const result={}

    for(let i =0;i<matchesData.length;i++){
        const matchdetails=matchesData[i]
        const tossWinner=matchdetails.toss_winner
        const matchWinner=matchdetails.winner

        if(tossWinner===matchWinner){
            result[matchWinner]=result[matchWinner] || 0
            result[matchWinner]+=1
        }

    }
    saveToJson('./src/public/output/wonTossWonMatch.json', result)
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

csvConverter.convertCsvToJson('matches', (error, matchesData) => {
    if (error) {
      console.error('Error:', error)
    } else {
      // Use matchesData in your program
      console.log('Matches Data:', matchesData)
  
      // Call the function with matchesData
      wonTossWonMatch(matchesData)
    }
  })