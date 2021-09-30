import React, { useState } from 'react';
import { useRouter } from '@happysanta/router';

import { 
	Panel, 
	PanelHeader,
	Button,
	Banner,
	Footer,
	Link,
	PullToRefresh,
	Card,
	SimpleCell,
	CardGrid,
	Group
} from '@vkontakte/vkui';
import { 
	Icon36CoinsStacks2Outline,
	Icon24ShoppingCartOutline,
	Icon16Stars,
	Icon24ChevronRight,
	Icon28MarketOutline,
	Icon243SquareOutline,
	Icon24WarningTriangleOutline,
	Icon28ArrowUpCircleOutline 
} from '@vkontakte/icons';

import {
	MODAL_BALANCE,

	PAGE_MY_PURCHASES,
	PAGE_HISTORY,
	PAGE_ADMIN,
	PAGE_SUGGEST_SCRIPT,
	PAGE_GOODS,
} from '../routers';

import "../styles/Home.css"

const Home = ({ id, user, getUser }) => {
	const router = useRouter();

	const [isFetching, setFetching] = useState(false);

	const onRefresh = () => {
		setFetching(true);
		getUser();
		setTimeout(() => { setFetching(false) }, 111);
	};

	function deformNumber(number) {
		return number.toLocaleString('ru-RU');
	};

	return (
	<Panel id={id}>
		<Group>
			<PanelHeader
			left={
				<Button
				before={<Icon36CoinsStacks2Outline width={20} height={20}/>}
				mode='secondary'
				onClick={() => router.pushModal(MODAL_BALANCE)}
				>{deformNumber(user.balance || 0)} ₽</Button>
			}
			>
				Главная
			</PanelHeader>

			<PullToRefresh isFetching={isFetching} onRefresh={onRefresh}>
			<Banner
			header={<div style={{display: 'flex', fontWeight: 'bold'}}>
				<Icon24ShoppingCartOutline width={24} height={24} style={{margin: '-1.7px 3px 0 0'}}/>
				Товары
					</div>}
			subheader='Боты, приложения, все, что угодно на любой вкус, всё по лучшим ценам!'
			actions={<Button
			style={{background: '#fff', color: '#000', borderRadius: 15}}
			onClick={() => router.pushPage(PAGE_GOODS)}
			>Открыть</Button>}
			mode='image'
			background={<div className='anime-gradient'/>}
			/>

			<CardGrid size='l'>
				<Card>
					<SimpleCell
					style={{color: '#FF7F50'}}
					href='https://vk.com/topic-204782028_47697378'
					target='_blank'
					before={<Icon16Stars fill='#FF7F50' width={24} height={24} />}
					after={<Icon24ChevronRight fill='#FF7F50'/>}
					>
						<b>Отзывы</b>
					</SimpleCell>
				</Card>

				<Card>
					<SimpleCell
					style={{color: '#32CD32'}}
					onClick={() => router.pushPage(PAGE_MY_PURCHASES)}
					target='_blank'
					before={<Icon28MarketOutline fill='#32CD32' width={24} height={24} />}
					after={<Icon24ChevronRight fill='#32CD32'/>}
					>
						<b>Мои покупки</b>
					</SimpleCell>
				</Card>

				<Card>
					<SimpleCell
					style={{color: '#6A5ACD'}}
					onClick={() => router.pushPage(PAGE_HISTORY)}
					target='_blank'
					before={<Icon243SquareOutline fill='#6A5ACD' width={24} height={24} />}
					after={<Icon24ChevronRight fill='#6A5ACD'/>}
					>
						<b>История профиля</b>
					</SimpleCell>
				</Card>

				<Card>
					<SimpleCell
					style={{color: '#FF8C00'}}
					onClick={() => router.pushPage(PAGE_SUGGEST_SCRIPT)}
					target='_blank'
					before={<Icon28ArrowUpCircleOutline fill='#FF8C00' width={24} height={24} />}
					after={<Icon24ChevronRight fill='#FF8C00'/>}
					>
						<b>Предложить скрипт</b>
					</SimpleCell>
				</Card>

				{user.admin && <Card>
					<SimpleCell
					style={{color: '#A52A2A'}}
					onClick={() => router.pushPage(PAGE_ADMIN)}
					target='_blank'
					before={<Icon24WarningTriangleOutline fill='#A52A2A' width={24} height={24} />}
					after={<Icon24ChevronRight fill='#A52A2A'/>}
					>
						<b>Админка</b>
					</SimpleCell>
				</Card>}
			</CardGrid>
			<Footer><Link href='https://vk.com/club204782028'>Наша группа</Link></Footer>
			</PullToRefresh>
		</Group>
	</Panel>
	)
};

export default Home;