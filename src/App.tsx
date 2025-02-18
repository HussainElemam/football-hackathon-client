import './App.scss';
import {Team} from './components/Team/Team.tsx';
import {useTeam} from './Providers/TeamProvider.tsx';
import {useRef, useState} from 'react';
import Modal from "./components/Modal/Modal.tsx";

const base = 'https://football-hackathon-server-production.up.railway.app';
// const base = 'https://football-hackathon-api.talente.dev'; // apparently it takes some time to be accessable
// const base = 'http://127.0.0.1:5000'; // local server for dev

function App() {
    const {teams, homeTeam, awayTeam} = useTeam();
    const predictBtn = useRef(null);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState<{
        home_winning_probability: number,
        away_winning_probability: number,
        draw_probability: number,
        expected_outcome: 'home win' | 'away win' | 'draw'
    }>({
        home_winning_probability: 0,
        away_winning_probability: 0,
        draw_probability: 0,
        expected_outcome: 'draw'
    });
    const [showPredictionModal, setShowPredictionModal] = useState(false);


    const predict = () => {
        if (loading) return;
        setLoading(true);

        fetch(
            `${base}/match-result?home=${teams[homeTeam].name}&away=${teams[awayTeam].name}`
        )
            .then((res) => res.json())
            .then((res) => {
                setPrediction(res);
                setShowPredictionModal(true);
                setLoading(false);
                console.log("prediction: ", res);
            })
            .catch((error) => console.log('error getting the result: ', error));
    };

    return (
        <div className={'container'}>
            {showPredictionModal && (
                <Modal onClose={() => setShowPredictionModal(false)}>
                    <div className={'prediction-container'}>
                        <div className={'bar'}>
                            <BarPart
                                percentage={prediction.home_winning_probability}
                                color={teams[homeTeam].color}
                                teamName={teams[homeTeam].name}
                                pos={"left"}
                            />
                            <BarPart
                                percentage={prediction.draw_probability}
                                color={'gray'} teamName={'draw'}
                                pos={"center"}
                            />
                            <BarPart
                                percentage={prediction.away_winning_probability}
                                color={teams[awayTeam].color}
                                teamName={teams[awayTeam].name}
                                pos={'right'}
                            />
                        </div>
                        <div className={'pred-text'}>Predicted outcome is</div>
                        <div
                            className={'pred-text'}>{prediction?.expected_outcome === 'home win' ? teams[homeTeam].name + ' wins' : prediction?.expected_outcome === 'away win' ? teams[awayTeam].name + ' wins' : 'draw'}
                        </div>
                    </div>
                </Modal>
            )}
            <div className={'teams'}>
                <Team side={'Home'}/>
                <div className={'center'}>
                    <div className={'predict-position-button'}
                         onClick={() => window.location.href = '/predict-position'}>
                        Predict Player Position
                    </div>
                    <button
                        className={'predict-btn'}
                        onClick={predict}
                        ref={predictBtn}
                        disabled={loading}
                    >{loading ? <div className={'dot-rolling'}/> : 'Predict'}</button>
                </div>
                <Team side={'Away'}/>
                {/*{prediction && (prediction.away_winning_probability,*/}
                {/*        prediction.draw_probability,*/}
                {/*        prediction.expected_outcome,*/}
                {/*        prediction.home_winning_probability*/}
                {/*)}*/}
            </div>
            <div className={'predict-position-button-bottom'}
                 onClick={() => window.location.href = '/predict-position'}>
			    <span>
				    Predict Player Position
			    </span>
                <img src={'/redirect_square.svg'} alt={'redirect'} className={'svg'}/>
            </div>
        </div>
    );
}

function BarPart({percentage, color, teamName, pos}: {
    percentage: number,
    color: string,
    teamName: string,
    pos: "left" | "center" | "right"
}) {
    percentage *= 100;
    return (
        <div
            title={teamName}
            style={{
                width: `${percentage}%`,
                backgroundColor: color,
            }}
        >
            {percentage > 5 ? (
                <span>{Math.round(percentage)}%</span>
            ) : (
                <span className={`percentage popup-${pos}`}>{Math.round(percentage)}%</span>
            )}

        </div>
    )
}

export default App;
