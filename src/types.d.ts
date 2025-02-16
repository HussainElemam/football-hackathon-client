interface TeamData {
	name: string;
	logo: string;
	color: string;
}

interface Teams {
	[key: string]: TeamData;
}

interface TeamContextInterface {
	teams: TeamData[];
	homeTeam: number;
	setHomeTeam: React.Dispatch<React.SetStateAction<number>>;
	awayTeam: number;
	setAwayTeam: React.Dispatch<React.SetStateAction<number>>;
}