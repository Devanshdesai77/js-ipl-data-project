const calculateMatchesPerYear=require('../matchesPerYear')

test('Passing usercase Test',() => {
    const matches=[
        {season:'2011',id:'1'},
        {season:'2011',id:'2'},
        {season:'2011',id:'3'},
        {season:'2012',id:'4'}
    ]
    const result = calculateMatchesPerYear(matches);
    expect(result).toEqual({'2011':3,'2012':1})
}) 