const dismissedByOnePlayer = require("../dismissedByOnePlayer");

test("Passing user test case ", () => {
  const deliveries = [
    { bowler: "Devansh", player_dismissed: "Sagar" },
    { bowler: "Devansh", player_dismissed: "Sagar" },
    { bowler: "Devansh", player_dismissed: "ms_Dhoni" },
    { bowler: "boult", player_dismissed: "sharma" },
    { bowler: "boult", player_dismissed: "kohil" },
    { bowler: "Z_Khan", player_dismissed: "ms_Dhoni" },
  ];

  expect(dismissedByOnePlayer(deliveries)).toEqual({
    bowler: "Devansh",
    count: 2,
    player: "Sagar",
  });
});
