const extraRunsConcededPerTeam = require("../extraRunsConcededPerTeam");

test("Passing user test case:", () => {
  const matches = [
    { id: 1, season: "2016" },
    { id: 2, season: "2016" },
    { id: 3, season: "2008" },
    { id: 4, season: "2009" },
  ];

  const deliveries = [
    { match_id: 1, bowling_team: "RCB", extra_runs: 2 },
    { match_id: 1, bowling_team: "RCB", extra_runs: 0 },
    { match_id: 1, bowling_team: "RCB", extra_runs: 0 },
    { match_id: 2, bowling_team: "CSK", extra_runs: 2 },
    { match_id: 2, bowling_team: "CSK", extra_runs: 2 },
    { match_id: 3, bowling_team: "RCB", extra_runs: 2 },
    { match_id: 4, bowling_team: "RCB", extra_runs: 4 },
  ];
  expect(extraRunsConcededPerTeam(deliveries, matches)).toEqual({
    RCB: 2,
    CSK: 4,
  });
});
