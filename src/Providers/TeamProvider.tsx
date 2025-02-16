import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const TeamContext = createContext<TeamContextInterface | null>(null);

export const useTeam = () => {
	const context = useContext(TeamContext);
	if (!context) {
		throw new Error('useUser must be used within a provider');
	}
	return context;
}

export function TeamProvider({children}: {children: ReactNode}) {
	const [teams, setTeams] = useState<TeamData[]>([]);
	const [homeTeam, setHomeTeam] = useState<number>(0);
	const [awayTeam, setAwayTeam] = useState<number>(0);

	useEffect(() => {
		console.log('hello')
		const fetchData = async () => {
			await fetch('/teams.json')
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setTeams(data["teams"]);
				})
				.catch((error) => console.log('can not get teams, error:', error));
		}
		fetchData().then(r => console.log(r));
	}, []);

	return (
		<TeamContext.Provider value={{teams, homeTeam, setHomeTeam, awayTeam, setAwayTeam}}>
			{children}
		</TeamContext.Provider>
	)
}