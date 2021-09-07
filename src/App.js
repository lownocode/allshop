import React, { useState, useEffect } from 'react';
import { useLocation, useRouter } from '@happysanta/router';

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

import {
	VIEW_MAIN,

	MODAL_ACTIVATE_PROMOCODE,
	MODAL_BALANCE,
	MODAL_WITHDRAW,

	PANEL_HOME,
	PANEL_ADMIN,
	PANEL_BOTS,
	PANEL_APPS,
	PANEL_HISTORY,
	PANEL_MY_PURCHASES,
	PANEL_SUGGEST_SCRIPT,
} from './routers';

import { Balance } from './modals/Balance';
import { Withdraw } from './modals/Withdraw';
import { ActivatePromocode } from './modals/ActivatePromocode';

const App = () => {
	const router = useRouter();
	const location = useLocation();

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [snackbar, setSnackbar] = useState(null);
	const [user, setUser] = useState({
		balance: 0,
		purchases: [],
		admin: false
	});

	const getUser = async () => {
		const { data } = await post('/getUser');

		setUser(data);
		setPopout(null);
	};

	useEffect(() => {
		getUser()
	}, []);

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

	const modals = (
		<ModalRoot onClose={() => router.popPage()} activeModal={location.getModalId()}>
			<Balance 
			id={MODAL_BALANCE} 
			user={user} 
			/>
			<Withdraw 
			id={MODAL_WITHDRAW} 
			showSnackbar={showSnackbar} 
			getUser={getUser} 
			/>
			<ActivatePromocode 
			id={MODAL_ACTIVATE_PROMOCODE} 
			showSnackbar={showSnackbar} 
			getUser={getUser} 
			/>
		</ModalRoot>
	);

	return (
		<AdaptivityProvider>
			<AppRoot>
				{snackbar}
				<View 
				id={VIEW_MAIN} 
				activePanel={location.getViewActivePanel(VIEW_MAIN)} 
				modal={modals} 
				popout={popout}
				onSwipeBack={() => router.popPage()}
				>
					<Home 
					id={PANEL_HOME} 
					user={user}
					getUser={getUser}
					/>

					<Apps
					id={PANEL_APPS}
					/>

					<Bots
					id={PANEL_BOTS}
					setPopout={setPopout}
					/>

					<My_purchases
					id={PANEL_MY_PURCHASES}
					user={user}
					/>

					<History
					id={PANEL_HISTORY}
					user={user}
					/>

					<Admin
					id={PANEL_ADMIN}
					showSnackbar={showSnackbar}
					setPopout={setPopout}
					/>

					<SuggestScript
					id={PANEL_SUGGEST_SCRIPT}
					showSnackbar={showSnackbar}
					/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;