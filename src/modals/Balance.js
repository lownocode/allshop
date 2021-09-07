import React from 'react';
import { useRouter} from '@happysanta/router';

import {
    ModalCard,
    Footer,
    Card,
    SimpleCell,
    Banner,
    Button
} from '@vkontakte/vkui';

import {
    Icon28AddAwardOutline,
    Icon36CoinsStacks3Outline,
    Icon24MoneySendOutline
} from '@vkontakte/icons';

import {
    MODAL_ACTIVATE_PROMOCODE, 
    MODAL_WITHDRAW
} from '../routers';

export const Balance = ({ id, user }) => {
    const router = useRouter();

    const deformNumber = (number) => {
		return number.toLocaleString('ru-RU');
	};

    return (
        <ModalCard
        id={id}
        onClose={() => router.popPage()}
        >
            <Footer style={{margin: 0}}>Ваш баланс: {deformNumber(user.balance)} ₽</Footer>
            <Card style={{margin: '5px'}}>
                <SimpleCell
                style={{color: '#32CD32'}}
                onClick={() => router.pushModal(MODAL_ACTIVATE_PROMOCODE)}
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
            onClick={() => router.pushModal(MODAL_WITHDRAW)}
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
    )
};