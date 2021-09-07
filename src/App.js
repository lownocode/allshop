import React, { useState, useEffect } from 'react';
import { post } from 'axios';
import { 
	View, 
	ScreenSpinner, 
	AdaptivityProvider, 
	AppRoot, 
	ModalRoot,
	Snackbar,
	Avatar
} from '@vkontakte/vkui';
import { 
	Icon16Cancel,
	Icon16Done,
} from '@vkontakte/icons';

import '@vkontakte/vkui/dist/vkui.css';
import './App.css';

import Home from './panels/Home';
import Apps from './panels/Apps';
import Bots from './panels/Bots';
import My_purchases from './panels/My_purchases';
import History from './panels/History';
import Admin from './panels/Admin';
import SuggestScript from './panels/SuggestScript';

import { Balance } from './modals/Balance';
import { Withdraw } from './modals/Withdraw';
import { ActivatePromocode } from './modals/ActivatePromocode';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [activeModal, setActiveModal] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [snackbar, setSnackbar] = useState(null);
	const [user, setUser] = useState({
		balance: 0,
		purchases: [],
		admin: false
	});

	async function getUser() {
		const { data } = await post('/getUser');

		setUser(data);
		setPopout(null);
	};

	useEffect(() => {
		getUser()
	}, []);

	const go = panel => {
		setActivePanel(panel);
	};

	const showSnackbar = (error, text) => {
		setSnackbar(
			<Snackbar
			onClose={() => setSnackbar(null)}
			before={<Avatar size={30} style={{background: error ? '#E42F3E' : '#50E42F'}}>
				{
					error
					? <Icon16Cancel fill='#fff'/>
					: <Icon16Done fill='#fff'/>
				}
				</Avatar>}
			>
				{text}
			</Snackbar>
		)
	};

	const modal = (
		<ModalRoot onClose={() => setActiveModal(null)} activeModal={activeModal}>
			<Balance id='balance' setActiveModal={setActiveModal} user={user} />
			<Withdraw id='withdraw' setActiveModal={setActiveModal} showSnackbar={showSnackbar} getUser={getUser} />
			<ActivatePromocode id='activate-promo' setActiveModal={setActiveModal} showSnackbar={showSnackbar} getUser={getUser} />
		</ModalRoot>
	);

	return (
		<AdaptivityProvider>
			<AppRoot>
				{snackbar}
				<View id={activePanel} activePanel={activePanel} modal={modal} popout={popout}>
					<Home 
					id='home' 
					go={go} 
					user={user}
					setActiveModal={setActiveModal}
					getUser={getUser}
					/>

					<Apps
					id='apps'
					go={go}
					/>

					<Bots
					id='bots'
					go={go}
					setPopout={setPopout}
					/>

					<My_purchases
					id='my_purchases'
					go={go}
					user={user}
					/>

					<History
					id='history'
					go={go}
					user={user}
					/>

					<Admin
					id='admin'
					go={go}
					showSnackbar={showSnackbar}
					setPopout={setPopout}
					/>

					<SuggestScript
					id='suggestscript'
					go={go}
					showSnackbar={showSnackbar}
					/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;