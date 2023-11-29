const top10EconomicalBowler=require('../top10EconomicalBowler')

test('Passing usr test case:',() => {
    const matches=[
        {'id':1,season:'2015'},
        {'id':2,season:'2015'},
        {'id':3,season:'2008'},
        {'id':4,season:'2009'},
    ]
    const deliveries=[
        {match_id:1,bowler:'Devansh',total_runs:4,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {match_id:1,bowler:'Devansh',total_runs:4,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {match_id:1,bowler:'Devansh',total_runs:0,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {match_id:1,bowler:'Devansh',total_runs:0,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {match_id:1,bowler:'Devansh',total_runs:0,extra_runs:4,wide_runs:4,noball_runs:0,legbye_runs:0,bye_runs:0},
        {match_id:1,bowler:'Devansh',total_runs:0,extra_runs:3,wide_runs:0,noball_runs:0,legbye_runs:3,bye_runs:0},
        {match_id:2,bowler:'Sagar',total_runs:4,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {match_id:2,bowler:'Sagar',total_runs:4,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {match_id:2,bowler:'Sagar',total_runs:4,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {match_id:3,bowler:'Sagar',total_runs:4,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
    ]
    expect(top10EconomicalBowler(deliveries,matches)).toEqual(
    [    
            {balls:5,bowler:'Devansh',economy:"9.60",runs:8},
            {balls:3,bowler:'Sagar',economy:"24.00",runs:12}
    ]
        )

})