import React, { useState } from 'react';
import './PredictPosition.scss';
import Modal from '../Modal/Modal.tsx';

const base = 'https://football-hackathon-api.talente.dev';

function PredictPosition() {
	const [loading, setLoading] = useState(false);
	const [fields, setFields] = useState([
		{
			name: 'Touches in Defensive Penalty Area',
			value: '43',
			error: false
		},
		{
			name: 'Shots per 90 minutes',
			value: '0.15',
			error: false
		},
		{
			name: 'Shot Creating actions per 90 minutes',
			value: '1.68',
			error: false
		},
		{
			name: 'Throw ins',
			value: '116',
			error: false
		},
		{
			name: 'Clearances',
			value: '27',
			error: false
		},
		{
			name: 'Touches in Defensive Third',
			value: '252',
			error: false
		},
		{
			name: 'Shots on Target per 90 minutes',
			value: '0',
			error: false
		},
		{
			name: 'Touches in Attacking Third',
			value: '165',
			error: false
		},
		{
			name: 'Times Dispossessed',
			value: '8',
			error: false
		},
		{
			name: 'Shots Blocked',
			value: '5',
			error: false
		}
	]);
	const placeholder = [
		{
			name: 'Touches in Defensive Penalty Area',
			value: '43'
		},
		{
			name: 'Shots per 90 minutes',
			value: '0.15'
		},
		{
			name: 'Shot Creating actions per 90 minutes',
			value: '1.68'
		},
		{
			name: 'Throw ins',
			value: '116'
		},
		{
			name: 'Clearances',
			value: '27'
		},
		{
			name: 'Touches in Defensive Third',
			value: '252'
		},
		{
			name: 'Shots on Target per 90 minutes',
			value: '0'
		},
		{
			name: 'Touches in Attacking Third',
			value: '165'
		},
		{
			name: 'Times Dispossessed',
			value: '8'
		},
		{
			name: 'Shots Blocked',
			value: '5'
		}
	];
	const [result, setResult] = useState([]);
	const [showModal, setShowModal] = useState(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFields((prev) => {
			return prev.map((field) => {
				if (field.name === name) {
					field.value = value;
					if (value === '' || isNaN(Number(value))) {
						field.error = true;
					} else {
						if (field.error) {
							field.error = false;
						}
					}
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
					setShowModal(true);
				});
			}
		);
	}

	return (
		<div className={'predict'}>
			<div className={'predict-header'}>
				<div className={'predict-team-button'}
				     onClick={() => window.location.href = '/'}>
				    <span>
						Predict Team Winning
				    </span>
					<img src={'/redirect_square.svg'} alt={'redirect'} className={'svg'} />
				</div>
				<div className={'predict-title'}>
					<h1>Predict Position of player</h1>
				</div>
			</div>
			<div className={'predict-container'}>
				<form onSubmit={onSubmit} className={'predict-form'}>
					<div className={'form-fields'}>
						{Object.entries(fields).map(([key, value], index) => {
							return (<>
									<div className={`${Number(key) % 2 ? 'light-b' : 'dark-b'}`} key={index}>
										<div className={`form-group ${Number(key) % 2 ? 'dark' : 'light'}`} key={index}>
											<label>{value.name}</label>
											<input type={'number'} id={key} name={value.name}
											       value={value.value} placeholder={placeholder[index].value}
											       aria-label={value.name} onChange={handleChange}
											       className={`${value.error ? 'error' : ''}`} />
										</div>
										<div className={'separator'} />
									</div>
								</>
							);
						})}
					</div>
					<div className={'predict-button light'}>
						<button className={'predict-btn'} type={'submit'}
						        disabled={fields.map((field) => field.error).includes(true)}>
							{loading ?
								<div className={'dot-rolling'} /> : 'Predict'}
						</button>
					</div>
				</form>
			</div>
			{showModal && <Modal onClose={() => setShowModal(false)}>
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
			</Modal>}
		</div>
	);
}

export default PredictPosition;
