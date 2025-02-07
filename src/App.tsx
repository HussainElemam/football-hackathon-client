import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [teams, setTeams] = useState<string[]>([]);
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");
  const [prediction, setPrediction] = useState<{
    home_winnig_probability: number,
    away_winning_probability: number,
    draw_probability: number,
    expected_outcome: "home win" | "away win" | "draw"
  }>();
  const base = "https://football-hackathon-server-production.up.railway.app";
//   const base = "https://football-hackathon-api.talente.dev"; // apparently it takes some time to be accessable
//   const base = "http://127.0.0.1:5000"; // local server for dev

  useEffect(() => {
    fetch("../public/teams.json")
      .then((res) => res.json())
      .then((data) => setTeams(data["teams"]))
      .catch((error) => console.log("can not get teams, error:", error));
  }, []);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    fetch(
      `${base}/match-result?home=${homeTeam}&away=${awayTeam}`
    )
      .then((res) => res.json())
      .then((res) => setPrediction(res))
      .catch((error) => console.log("error getting the result: ", error));
  };

  return teams ? (
    <div style={{ margin: "50px", textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <select
          name="home"
          id="home"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        >
          {teams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
        <select
          name="away"
          id="away"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        >
          {teams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
        <br />
        <br />
        <input type="submit" value="Get Result" />
      </form>
      <br />
      <br />
      {prediction && <p>{JSON.stringify(prediction)}</p>}
      {/* {prediction && <p>{prediction.away_winning_probability}</p>} */}
    </div>
  ) : (
    <p>Loading users...</p>
  );
}

export default App;
