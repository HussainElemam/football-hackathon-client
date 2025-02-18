import './Team.scss';
import { useTeam } from '../../Providers/TeamProvider.tsx';

export const Team = ({ side }: { side: 'Home' | 'Away' }) => {
	const { teams, homeTeam, setHomeTeam, awayTeam, setAwayTeam } = useTeam();

	console.log('teams:', teams);

	function onClick(direction: -1 | 1) {
		if (side === 'Home') {
			setHomeTeam((prev) => {
				if (prev === 0 && direction === -1) {
					return teams.length - 1;
				} else if (prev === teams.length - 1 && direction === 1) {
					return 0;
				} else {
					return prev + direction;
				}
			});
		} else {
			setAwayTeam((prev) => {
				if (prev === 0 && direction === -1) {
					return teams.length - 1;
				} else if (prev === teams.length - 1 && direction === 1) {
					return 0;
				} else {
					return prev + direction;
				}
			});
		}
	}

	// const [prediction, setPrediction] = useState<{
	// 	home_winnig_probability: number,
	// 	away_winning_probability: number,
	// 	draw_probability: number,
	// 	expected_outcome: 'home win' | 'away win' | 'draw'
	// }>();
	//
	// const base = 'https://football-hackathon-server-production.up.railway.app';
	// // const base = 'https://football-hackathon-api.talente.dev'; // apparently it takes some time to be accessable
	// // const base = 'http://127.0.0.1:5000'; // local server for dev
	//
	// useEffect(() => {
	// 	if (homeTeam && awayTeam) {
	// 		fetch(
	// 			`${base}/match-result?home=${homeTeam}&away=${awayTeam}`
	// 		)
	// 			.then((res) => res.json())
	// 			.then((res) => setPrediction(res))
	// 			.catch((error) => console.log('error getting the result: ', error));
	// 	}
	// }, [homeTeam, awayTeam]);

	return (
		<div className={'team'}>
			<div className={'arrow'} onClick={() => onClick(1)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-up</title>
					<path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"/>
				</svg>
			</div>
			<div className={'inner'}>
				<div className={'side text'}>{side}</div>
				<div className={'team-logo-container'}>
					{teams && teams.length > 0 && (
						<img
							src={teams[side === 'Home' ? homeTeam : awayTeam].logo}
							alt={teams[side === 'Home' ? homeTeam : awayTeam].name}
							className={"team-logo"}
						/>
					)}
				</div>
				{teams && teams.length > 0 && (
					<div className={'team-name text'}>{teams[side == 'Home' ? homeTeam : awayTeam].name}</div>
				)}
			</div>
			<div className={'arrow'} onClick={() => onClick(-1)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title>
					<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
				</svg>
			</div>
		</div>
	);
};