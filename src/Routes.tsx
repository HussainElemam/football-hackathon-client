import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = lazy(() => import("./App.tsx"));
const PredictPosition = lazy(() => import("./components/PredictPosition/PredictPosition.tsx"));

const routes =[
	{
		path: "/",
		element: <App />
	},
	{
		path: '/predict-position',
		element: <PredictPosition />
	}
]

const router = createBrowserRouter(routes);

export const Routes: React.FC = () => {
	return <RouterProvider router={router} />;
};
