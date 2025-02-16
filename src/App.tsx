import './App.scss';
import { Team } from './components/Team/Team.tsx';

function App() {
	return (
		<div>
			{/*<div className={'stadium-background'}></div>*/}
			<div className={'page-container'}>
				<div className={'background'}/>
				<div className={'teams-container'}>
					<Team side={'Home'} />
					<Team side={'Away'} />
				</div>
			</div>
		</div>
	);
}

export default App;
