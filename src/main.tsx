import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { TeamProvider } from './Providers/TeamProvider.tsx';
import { Routes } from './Routes.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TeamProvider>
			<Routes />
		</TeamProvider>
	</StrictMode>
);
