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
import Goods from './panels/Goods';
import My_purchases from './panels/My_purchases';
import History from './panels/History';
import Admin from './panels/Admin';
import SuggestScript from './panels/SuggestScript';
import Reviews from './panels/Reviews';

import {
	VIEW_MAIN,

	MODAL_ACTIVATE_PROMOCODE,
	MODAL_BALANCE,
	MODAL_WITHDRAW,

	PANEL_HOME,
	PANEL_ADMIN,
	PANEL_GOODS,
	PANEL_HISTORY,
	PANEL_MY_PURCHASES,
	PANEL_SUGGEST_SCRIPT,
	PANEL_REVIEWS
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

		if(!data.id) return;
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

					<Goods
					id={PANEL_GOODS}
					user={user}
					showSnackbar={showSnackbar}
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

					<Reviews
					id={PANEL_REVIEWS}
					/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;