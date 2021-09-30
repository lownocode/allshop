import React from 'react';
import { useRouter } from '@happysanta/router';

import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Div,
    SimpleCell,
    Avatar,
    Group
} from '@vkontakte/vkui';
import { 
    Icon12Cake,
    Icon24MoneyRequestOutline,
    Icon28MoneySendOutline,
    Icon28AddAwardOutline
} from '@vkontakte/icons';

const History = ({ id, user }) => {
    const router = useRouter();

    return(
        <Panel id={id}>
            <Group>
            <PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()}/>}>История профиля</PanelHeader>
                {
                    user.history.map(history => {
                        switch(history.type) {
                            case 'registration':
                                return (
                                    <SimpleCell
                                    disabled
                                    before={<Avatar style={{background: 'none'}}><Icon12Cake width={25} height={25} fill='#9370DB'/></Avatar>}
                                    description={timeConverter(history.date)}
                                    >{history.title}
                                    </SimpleCell>
                                );
                            case 'replenish':
                                return (
                                    <SimpleCell
                                    disabled
                                    after={<b style={{color: '#2FE481'}}>+ {history.amount} ₽</b>}
                                    before={<Avatar style={{background: 'none'}}><Icon24MoneyRequestOutline width={25} height={25} fill='#2FE481'/></Avatar>}
                                    description={timeConverter(history.date)}
                                    >{history.title}
                                    </SimpleCell>
                                );
                            case 'withdraw':
                                return (
                                    <SimpleCell
                                    disabled
                                    after={<b style={{color: '#E4592F'}}>- {history.amount} ₽</b>}
                                    before={<Avatar style={{background: 'none'}}><Icon28MoneySendOutline width={25} height={25} fill='#E4592F'/></Avatar>}
                                    description={
                                        <div>
                                            Кошелёк: {history.wallet}<br/>
                                            Система: {convertWallet(history.system)}<br/><br/>
                                            {timeConverter(history.date)}
                                        </div>
                                    }
                                    >{history.title}
                                    </SimpleCell>
                                );
                            case 'promocode':
                                return (
                                    <SimpleCell
                                    disabled
                                    after={<b style={{color: '#2FC1E4'}}>+ {history.amount} ₽</b>}
                                    before={<Avatar style={{background: 'none'}}><Icon28AddAwardOutline width={25} height={25} fill='#2FC1E4'/></Avatar>}
                                    description={
                                        <div>
                                            Код: {history.code}<br/><br/>
                                            {timeConverter(history.date)}
                                        </div>
                                    }
                                    >{history.title}
                                    </SimpleCell>
                                );
                            default:
                                return;
                        }
                    })
                }
            </Group>
        </Panel>
    )
};

export default History;


const timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp);
    var year = a.getFullYear();
    var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    var month = Number(a.getMonth()+1) < 10 ? '0' + Number(a.getMonth()+1) : Number(a.getMonth()+1);
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
    var time = date + '.' + month + '.' + year + ' в ' + hour + ':' + min;
    return time;
};

const convertWallet = (system) => {
    return system
    .replace(/qiwi/gi, 'QIWI-кошелёк')
    .replace(/bank-card/gi, 'банковская карта')
	.replace(/webmoney/gi, 'WebMoney')
	.replace(/yoomoney/gi, 'ЮMoney')
	.replace(/mobile/gi, 'номер телефона')
};