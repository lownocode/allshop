import React, { useEffect, useState } from 'react';
import { post } from 'axios';

import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    CardGrid,
    Card,
    Link,
    Button,
    ScreenSpinner
} from '@vkontakte/vkui';

const Bots = ({ id, go, setPopout }) => {
    const [bots, setBots] = useState(null);

    async function getProducts() {
        setPopout(<ScreenSpinner/>);
        const { data } = await post(`https://localhostov.ru:8880/shop/getProducts`, {
        },
        {
            headers: {
                'auth': window.location.search.substring(1),
            }
        });
        setBots(data);
        setPopout(null);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return(
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => go('home')}/>}>VK Боты</PanelHeader>
            <CardGrid size='l' style={{marginTop: 10}}>
                {bots &&
                    bots.map(bot => {
                        if(bot.type != 'vk_bot') return;
                        return(
                            <Card mode='outline'>
                                <div style={{margin: 12}}>
                                <div style={{marginRight:5}}>
                                    <b style={{letterSpacing: 1, textTransform: 'uppercase', marginRight: 5}}>{bot.title}</b>
                                </div>
                                <div style={{
                                    color: 'var(--text_secondary)', 
                                    fontSize: 16, 
                                    textTransform: 'lowercase',
                                    margin: '3px 0 3px 0'
                                    }}>
                                        {bot.demo_link && <div>Демо: <Link href={bot.demo_link}>{bot.demo_link}</Link></div>}
                                        Описание: {bot.description}
                                </div>
                                <div style={{textAlign: 'left', display: 'flex', width: '100%', marginTop: 10}}>
                                    <Button>Купить</Button>
                                    <div style={{
                                        color: 'var(--text_secondary)',
                                        fontSize: 14,
                                        margin: '5px 0 0 5px'
                                    }}>Цена: {bot.cost} Р.</div>
                                </div>
                                <div style={{textAlign: 'right', fontSize: 14, marginTop: -20}}>
                                    Автор: {bot.author_id != 0 ? 
                                    <Link href={`https://vk.com/id${bot.author_id}`}>id${bot.author_id}</Link> : 
                                    <i style={{color: '#00cc00'}}>All Shop</i>}
                                </div>
                                </div>
                            </Card>
                        )
                    })
                }
            </CardGrid>
            <br/>
        </Panel>
    )
};

export default Bots;