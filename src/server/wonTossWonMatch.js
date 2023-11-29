const matchesData=require('../data/matches.json')
const fs=require('fs')
const saveToJson=require('./saveToJson')

// function wonTossWonMatch(matchesData){
//     const result={}

//     for(let i =0;i<matchesData.length;i++){
//         const matchdetails=matchesData[i]
//         const tossWinner=matchdetails.toss_winner
//         const matchWinner=matchdetails.winner

//         if(tossWinner===matchWinner){
//             result[matchWinner]=result[matchWinner] || 0
//             result[matchWinner]+=1
//         }

//     }
//     return result
    
// }
function wonTossWonMatch(matchesData){
    return matchesData.reduce((result,match) => {
        const tossWinner=match.toss_winner
        const matchWinner=match.winner

        if(tossWinner===matchWinner){
            result[matchWinner]=(result[matchWinner] || 0)+1
        }
    return result
    },{})
}
saveToJson('./src/public/output/wonTossWonMatch.json', wonTossWonMatch(matchesData))


module.exports=wonTossWonMatch