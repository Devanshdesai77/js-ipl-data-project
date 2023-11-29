const bestEconomyInSuperOver=require('../bestEconomyInSuperOver')

test("Passing user test case :",() => {
    const deliveries=[
        {is_super_over:"0",bowler:'Devansh',total_runs:4,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {is_super_over:"1",bowler:'Devansh',total_runs:4,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {is_super_over:"1",bowler:'Devansh',total_runs:0,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {is_super_over:"1",bowler:'Devansh',total_runs:0,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
        {is_super_over:"1",bowler:'Sagar',total_runs:0,extra_runs:4,wide_runs:4,noball_runs:0,legbye_runs:0,bye_runs:0},
        {is_super_over:"1",bowler:'Sagar',total_runs:6,extra_runs:0,wide_runs:0,noball_runs:0,legbye_runs:0,bye_runs:0},
    ]
    expect(bestEconomyInSuperOver(deliveries)).toEqual({
        'bowler':'Devansh',
        'economy':8
    })
})