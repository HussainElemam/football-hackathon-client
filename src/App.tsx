import './App.scss';
import {Team} from './components/Team/Team.tsx';
import {useTeam} from "./Providers/TeamProvider.tsx";
import {useRef, useState} from "react";
import ThreeDotsLine from "./components/ThreeDotsLine/ThreeDotsLine.tsx";

const base = 'https://football-hackathon-server-production.up.railway.app';
// const base = 'https://football-hackathon-api.talente.dev'; // apparently it takes some time to be accessable
// const base = 'http://127.0.0.1:5000'; // local server for dev

function App() {
    const { teams, homeTeam, setHomeTeam, awayTeam, setAwayTeam } = useTeam();
    const predictBtn = useRef(null);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState<{
        home_wining_probability: number,
        away_winning_probability: number,
        draw_probability: number,
        expected_outcome: "home win" | "away win" | "draw"
    }>();

    const predict = () => {
        // predictBtn.current.innerHTML = 'Predicting...';
        if (loading) return;
        setLoading(true);

        if (homeTeam && awayTeam) {
            fetch(
                `${base}/match-result?home=${homeTeam}&away=${awayTeam}`
            )
                .then((res) => res.json())
                .then((res) => setPrediction(res))
                .catch((error) => console.log('error getting the result: ', error));
        }
    }

    return (
        <div className={'container'}>
            <div className={'teams'}>
                <Team side={'Home'}/>
                <button
                    className={"predict-btn"}
                    onClick={predict}
                    ref={predictBtn}
                    disabled={loading}
                >{loading ? <div className={'dot-rolling'}/> : "Predict"}</button>
                <Team side={'Away'}/>
            </div>
        </div>
    );
}

export default App;
