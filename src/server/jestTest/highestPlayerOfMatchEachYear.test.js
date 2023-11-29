const highestPlayerOfMatchEachYear=require('../highestPlayerOfMatchEachYear')

test('Passing user test case',() => {
    const matches=[
        {season:'2008',player_of_match:'Devansh'},
        {season:'2008',player_of_match:'Devansh'},
        {season:'2008',player_of_match:'Sagar'},
        {season:'2009',player_of_match:'Devansh'},
        {season:'2009',player_of_match:'Sagar'},
        {season:'2009',player_of_match:'Sagar'},
    ]
    expect(highestPlayerOfMatchEachYear(matches)).toEqual({
        2008:{player:'Devansh',count:2},
        2009:{player:'Sagar',count:2}
    })
})