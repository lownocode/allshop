import React, { useState } from 'react';

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
	CardGrid
} from '@vkontakte/vkui';
import { 
	Icon36CoinsStacks2Outline,
	Icon24LogoVkOutline,
	Icon24RobotOutline,
	Icon16Stars,
	Icon24ChevronRight,
	Icon28MarketOutline,
	Icon243SquareOutline,
	Icon24WarningTriangleOutline,
	Icon28ArrowUpCircleOutline 
} from '@vkontakte/icons';

const Home = ({ id, go, user, setActiveModal, getUser }) => {
	const [isFetching, setFetching] = useState(false);

	const onRefresh = () => {
		setFetching(true);
		getUser();
		setTimeout(() => { setFetching(false) }, 111);
	};

	function deformNumber(number) {
		return number.toLocaleString('ru-RU');
	};

	return(
	<Panel id={id}>
		<PanelHeader
		left={
			<Button
			before={<Icon36CoinsStacks2Outline width={20} height={20}/>}
			mode='secondary'
			onClick={() => setActiveModal('balance')}
			>{deformNumber(user.balance)} ₽</Button>
		}
		>Главная</PanelHeader>
		<PullToRefresh isFetching={isFetching} onRefresh={onRefresh}>
		<Banner
		header={<div style={{display: 'flex', fontWeight: 'bold'}}>
			<Icon24LogoVkOutline width={24} height={24} style={{margin: '-1.7px 3px 0 0'}}/>
			VK Mini Apps
				</div>}
		subheader='Мини-приложения на разный вкус'
		actions={<Button
		style={{background: '#fff', color: '#000'}}
		onClick={() => go('apps')}
		>Открыть</Button>}
        mode='image'
        background={
		<div
		style={{
			background: '#7B68EE',
			backgroundPosition: 'right bottom',
			backgroundSize: 760,
			backgroundRepeat: 'no-repeat',
			boxShadow: 'inset 0px 0px 10px 8px rgba(0,0,0,0.055)',
			borderRadius: 15
		}}
		/>}
		/>

		<Banner
		style={{marginTop: -5}}
		header={<div style={{display: 'flex', fontWeight: 'bold'}}>
			<Icon24RobotOutline width={24} height={24} style={{margin: '-1.7px 3px 0 0'}}/>
			VK Bots
				</div>}
		subheader='Лучшие боты ВК'
		actions={<Button
		style={{background: '#fff', color: '#000'}}
		onClick={() => go('bots')}
		>Открыть</Button>}
        mode='image'
        background={
		<div
		style={{
			background: '#4682B4',
			backgroundPosition: 'right bottom',
			backgroundSize: 760,
			backgroundRepeat: 'no-repeat',
			boxShadow: 'inset 0px 0px 10px 8px rgba(0,0,0,0.055)',
			borderRadius: 15,
		}}
		/>}
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
				onClick={() => go('my_purchases')}
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
				onClick={() => go('history')}
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
				onClick={() => go('suggestscript')}
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
				onClick={() => go('admin')}
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
	</Panel>
	)
};

export default Home;