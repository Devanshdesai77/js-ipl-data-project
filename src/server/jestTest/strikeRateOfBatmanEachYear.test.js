const strikeRateOfBatsmanEachYear = require("../strikeRateOfBatsmanEachYear");

test("Passing user test case:", () => {
  const matches = [
    { id: 1, season: "2015" },
    { id: 2, season: "2015" },
    { id: 3, season: "2008" },
    { id: 4, season: "2009" },
  ];

  const deliveries = [
    {
      match_id: 1,
      batsman: "Devansh",
      batsman_runs: 4,
      extra_runs: 0,
      wide_runs: 0,
    },
    {
      match_id: 1,
      batsman: "Devansh",
      batsman_runs: 0,
      extra_runs: 0,
      wide_runs: 0,
    },
    {
      match_id: 1,
      batsman: "Sagar",
      batsman_runs: 3,
      extra_runs: 0,
      wide_runs: 0,
    },
    {
      match_id: 3,
      batsman: "Sagar",
      batsman_runs: 4,
      extra_runs: 0,
      wide_runs: 0,
    },
    {
      match_id: 4,
      batsman: "Harsh",
      batsman_runs: 4,
      extra_runs: 0,
      wide_runs: 0,
    },
  ];

  expect(strikeRateOfBatsmanEachYear(deliveries, matches)).toEqual({
    Devansh: { 2015: "200.00" },
    Harsh: { 2009: "400.00" },
    Sagar: { 2008: "400.00", 2015: "300.00" },
  });
});
