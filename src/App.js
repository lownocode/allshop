import React, { useState, useEffect } from 'react';
import { post } from 'axios';
import { 
	View, 
	ScreenSpinner, 
	AdaptivityProvider, 
	AppRoot, 
	ModalRoot,
	ModalCard,
	Footer,
	Banner,
	Button,
	FormItem,
	NativeSelect,
	Input,
	Div,
	Snackbar,
	Avatar,
	FormLayout,
	Card,
	SimpleCell
} from '@vkontakte/vkui';
import { 
	Icon36CoinsStacks3Outline,
	Icon24MoneySendOutline,
	Icon16Cancel,
	Icon16Done,
	Icon28AddAwardOutline
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

const api = require('./apiMethods');

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

	const [withdrawSystem, setWithdrawSystem] = useState('qiwi');
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const [withdrawWallet, setWithdrawWallet] = useState('');

	const [inputPromo, setInputPromo] = useState('');

	function deformNumber(number) {
		return number.toLocaleString('ru-RU');
	};

	async function getUser() {
		const { data } = await post(api.user.getUser, {
		}, 
		{
			headers: {
				'auth': window.location.search.substring(1)
			}
		});
		setUser(data);
		setPopout(null);
	};

	useEffect(() => {
		getUser()
	}, []);

	const go = panel => {
		setActivePanel(panel);
	};

	async function withdraw() {
		const { data } = await post(`https://localhostov.ru:8880/shop/withdraw`, {
			system: withdrawSystem,
			amount: withdrawAmount,
			wallet: withdrawWallet
		},
		{
			headers: {
				'auth': window.location.search.substring(1)
			}
		});
		if(!data.success) {
			setSnackbar(
				<Snackbar
				onClose={() => setSnackbar(null)}
				before={<Avatar size={30} style={{background: 'red'}}><Icon16Cancel fill='#fff'/></Avatar>}
				>
					{data.msg}
				</Snackbar>
			)
		} else {
			setSnackbar(
				<Snackbar
				onClose={() => setSnackbar(null)}
				before={<Avatar size={30} style={{background: '#00cc00'}}><Icon16Done fill='#fff'/></Avatar>}
				>
					{data.msg}
				</Snackbar>
			);
			setActiveModal(null);
			getUser()
		}
	};

	async function activatePromo() {
		const { data } = await post(`https://localhostov.ru:8880/shop/activatePromocode`, {
			promo: inputPromo
		},
		{
			headers: {
				'auth': window.location.search.substring(1)
			}
		});
		if(!data.success) {
			setSnackbar(
				<Snackbar
				onClose={() => setSnackbar(null)}
				before={<Avatar size={30} style={{background: 'red'}}><Icon16Cancel fill='#fff'/></Avatar>}
				>
					{data.msg}
				</Snackbar>
			)
		} else {
			setSnackbar(
				<Snackbar
				onClose={() => setSnackbar(null)}
				before={<Avatar size={30} style={{background: '#00cc00'}}><Icon16Done fill='#fff'/></Avatar>}
				>
					{data.msg}
				</Snackbar>
			);
			setActiveModal(null);
			getUser()
		}
	};

	const modal = (
		<ModalRoot onClose={() => setActiveModal(null)} activeModal={activeModal}>
			<ModalCard
			id='balance'
			onClose={() => setActiveModal(null)}
			>
				<Footer style={{margin: 0}}>Ваш баланс: {deformNumber(user.balance)} ₽</Footer>
				<Card style={{margin: '5px'}}>
					<SimpleCell
				    style={{color: '#32CD32'}}
				    onClick={() => setActiveModal('activate-promo')}
				    before={<Icon28AddAwardOutline width={24} height={24} fill='#32CD32'/>}
				    >
					    <b>Активировать промокод</b>
				    </SimpleCell>
			    </Card>
				<Banner
                header={<div style={{display: 'flex', fontWeight: 'bold'}}>
					<Icon36CoinsStacks3Outline width={24} height={24}/>
					Пополнение баланса
					</div>}
				subheader='Пополнение любым удобным для Вас способом'
				actions={<Button
				style={{background: '#fff', color: '#000'}}
				href='https://vk.com/public204782028?w=app6887721_-204782028'
				target='_blank'
				>Пополнить</Button>}
                mode='image'
                background={
                    <div
					style={{
                        background: '#4169E1',
					    backgroundPosition: 'right bottom',
					    backgroundSize: 760,
					    transition: '420ms',
					    backgroundRepeat: 'no-repeat',
					    boxShadow: 'inset 0px 0px 10px 8px rgba(0,0,0,0.085)'
                    }}
				/>}
				/>
				
				<Banner
                header={<div style={{display: 'flex', fontWeight: 'bold'}}>
					<Icon24MoneySendOutline width={24} height={24}/>
					Вывод баланса
					</div>}
				subheader='Вывод на любой удобный для Вас кошелёк'
				actions={<Button
				style={{background: '#fff', color: '#000'}}
				onClick={() => setActiveModal('withdraw')}
				target='_blank'
				>Вывести</Button>}
                mode='image'
                background={
                    <div
					style={{
                        background: '#00cc00',
					    backgroundPosition: 'right bottom',
					    backgroundSize: 760,
					    transition: '420ms',
					    backgroundRepeat: 'no-repeat',
					    boxShadow: 'inset 0px 0px 10px 8px rgba(0,0,0,0.085)'
                    }}
				/>}
				/>
			</ModalCard>

			<ModalCard
			id='withdraw'
			onClose={() => setActiveModal('balance')}
			>
				<FormItem top="Выберите платежную систему">
					<NativeSelect onChange={(e) => setWithdrawSystem(e.currentTarget.value)}>
						<option value="qiwi">QIWI-кошелек</option>
						<option value="bank-card">Банковская карта</option>
						<option value="webmoney">WebMoney (только Z-кошельки)</option>
						<option value="yoomoney">ЮMoney</option>
						<option value="mobile">Счет мобильного телефона</option>
					</NativeSelect>
				</FormItem>
				<FormItem top="Номер кошелька">
					<Input
					placeholder={withdrawSystem
						.replace(/qiwi/gi, 'QIWI-кошелек')
						.replace(/bank-card/gi, 'Банковская карта')
						.replace(/webmoney/gi, 'WebMoney')
						.replace(/yoomoney/gi, 'ЮMoney')
						.replace(/mobile/gi, 'Номер телефона')
					}
					onChange={(e) => setWithdrawWallet(e.currentTarget.value)}
					type='number'
					/>
				</FormItem>
				<FormItem top="Сумма вывода">
					<Input
					placeholder='Укажите сумму'
					onChange={(e) => setWithdrawAmount(e.currentTarget.value)}
					type='number'
					/>
				</FormItem>
				<Div>
					<Button 
					stretched
					mode='primary'
					size='l'
					onClick={() => withdraw()}
					>
						Вывести
					</Button>
				</Div>
			</ModalCard>

			<ModalCard
			id='activate-promo'
			onClose={() => setActiveModal(null)}
			header='Активация промокода'
			>
				<FormLayout top='Промокод'>
					<Input
					onChange={(e) => setInputPromo(e.target.value)}
					placeholder='1234-ABCD-EF56-JK78'
					/>
					<Div>
						<Button
						stretched
						size='l'
						onClick={() => activatePromo()}
						>
							Активировать
						</Button>
					</Div>
				</FormLayout>
			</ModalCard>
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
					setSnackbar={setSnackbar}
					setPopout={setPopout}
					/>

					<SuggestScript
					id='suggestscript'
					go={go}
					setSnackbar={setSnackbar}
					/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
