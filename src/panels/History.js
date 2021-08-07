import React from 'react';

import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Div,
    SimpleCell,
    Avatar
} from '@vkontakte/vkui';
import { 
    Icon12Cake,
    Icon24MoneyRequestOutline,
    Icon28MoneySendOutline,
    Icon28AddAwardOutline
} from '@vkontakte/icons';

const History = ({ id, go, user }) => {

    return(
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => go('home')}/>}>История профиля</PanelHeader>
            <Div>
                {
                    user.history.map(history => {
                        const icon = 
                        history.type == 'registration' && <Icon12Cake width={25} height={25} fill='#9370DB'/> ||
                        history.type == 'replenish' && <Icon24MoneyRequestOutline width={25} height={25} fill='#00cc00'/> ||
                        history.type == 'withdraw' && <Icon28MoneySendOutline width={25} height={25} fill='red'/> ||
                        history.type == 'promocode' && <Icon28AddAwardOutline width={25} height={25} fill='#00cc00'/>;
                        const system = 
                        history.type == 'withdraw' && history.system
                        .replace(/qiwi/gi, 'QIWI-кошелёк')
                        .replace(/bank-card/gi, 'банковская карта')
						.replace(/webmoney/gi, 'WebMoney')
						.replace(/yoomoney/gi, 'ЮMoney')
						.replace(/mobile/gi, 'номер телефона')

                        return(
                            <SimpleCell
                            before={<Avatar style={{background: 'none'}}>{icon}</Avatar>}
                            description={<div>
                                {timeConverter(history.date)}
                                {
                                    history.type == 'withdraw' &&
                                    <div>
                                        Кошелёк: {history.wallet}<br/>
                                        Система: {system}
                                    </div>
                                }
                                </div>}
                            disabled
                            after={history.type == 'replenish' || history.type == 'promocode' && <b style={{color: '#00cc00'}}>+ {history.amount} ₽</b> ||
                            history.type == 'withdraw' && <b style={{color: 'red'}}>- {history.amount} ₽</b>}
                            >
                                {history.title}
                            </SimpleCell>
                        )
                    })
                }
            </Div>
        </Panel>
    )
};

export default History;


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var year = a.getFullYear();
    var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    var month = a.getMonth()+1;
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
    var time = date + '.' + month + '.' + year + ' в ' + hour + ':' + min;
    return time;
}