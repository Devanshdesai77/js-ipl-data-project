const calculateMatchesWonPerTeamPerYear = require("../matchesWonPerTeamPerYear");

test("Passing UserTestCase", () => {
  const matches = [
    { season: "2009", winner: "DC" },
    { season: "2016", winner: "CSK" },
    { season: "2019", winner: "SRH" },
    { season: "2018", winner: "MI" },
    { season: "2016", winner: "SRH" },
    { season: "2016", winner: "CSK" },
    { season: "2008", winner: "RR" },
  ];
  expect(calculateMatchesWonPerTeamPerYear(matches)).toEqual({
    2008: { RR: 1 },
    2009: { DC: 1 },
    2016: { CSK: 2, SRH: 1 },
    2018: { MI: 1 },
    2019: { SRH: 1 },
  });
});
