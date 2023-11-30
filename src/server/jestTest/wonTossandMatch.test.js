const wonTossWonMatch = require("../wonTossWonMatch");

test("Passing user test case", () => {
  const matches = [
    { toss_winner: "MI", winner: "MI" },
    { toss_winner: "CSK", winner: "CSK" },
    { toss_winner: "SRH", winner: "SRH" },
    { toss_winner: "MI", winner: "MI" },
    { toss_winner: "CSK", winner: "RR" },
    { toss_winner: "CSK", winner: "CSK" },
    { toss_winner: "SRH", winner: "MI" },
  ];
  expect(wonTossWonMatch(matches)).toEqual({
    MI: 2,
    CSK: 2,
    SRH: 1,
  });
});
