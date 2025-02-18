import React, { useState } from 'react';
import './PredictPosition.scss';

const base = 'https://football-hackathon-api.talente.dev';

function PredictPosition() {
	const [loading, setLoading] = useState(false);
	const [fields, setFields] = useState([
		{
			name: 'Touches in Defensive Penalty Area',
			value: 43
		},
		{
			name: 'Shots per 90 minutes',
			value: 0.15
		},
		{
			name: 'Shot Creating actions per 90 minutes',
			value: 1.68
		},
		{
			name: 'Throw ins',
			value: 116
		},
		{
			name: 'Clearances',
			value: 27
		},
		{
			name: 'Touches in Defensive Third',
			value: 252
		},
		{
			name: 'Shots on Target per 90 minutes',
			value: 0
		},
		{
			name: 'Touches in Attacking Third',
			value: 165
		},
		{
			name: 'Times Dispossessed',
			value: 8
		},
		{
			name: 'Shots Blocked',
			value: 5
		}
	]);
	const [result, setResult] = useState([]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFields((prev) => {
			return prev.map((field) => {
				if (field.name === name) {
					field.value = Number(value);
				}
				return field;
			});
		});
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		fetch(`${base}/predict-position?features=${fields.map((field) => field.value).join(',')}`).then(
			(response) => {
				response.json().then((data) => {
					console.log(data);
					setResult(data.predicted_positions);
					setLoading(false);
				});
			}
		);
	}

	return (
		<div className={'predict'}>
			<div className={'predict-title'}>
				<h1>Predict Position of player</h1>
				{/*<div className={'separator'} />*/}
				{/*<h3>Please fill the following data for the player. The program will analyze the data and predict*/}
				{/*	the best position for this player.</h3>*/}
			</div>
			<div className={'predict-container'}>
				<form onSubmit={onSubmit} className={'predict-form'}>
					<div className={'form-fields'}>
						{Object.entries(fields).map(([key, value], index) => {
							return (
								<div className={`form-group ${Number(key) % 2 ? 'dark' : 'light'}`} key={index}>
									<label>{value.name}</label>
									<input type={'text'} id={key} name={value.name} placeholder={value.value.toString()}
									       aria-label={value.name} onChange={handleChange} />
								</div>
							);
						})}
					</div>
					<div className={'predict-button light'}>
						<button className={'predict-btn'} type={'submit'}>
							{loading ?
								<div className={'dot-rolling'} /> : 'Predict'}
						</button>
					</div>
				</form>
			</div>
			<div className={'predict-result'}>
				{result.length === 1 ? 'The predicted position is:' : 'The predicted positions are:'}
				{result.map((position, index) => {
					return (
						<div key={index} className={'result'}>
							{position}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PredictPosition;
