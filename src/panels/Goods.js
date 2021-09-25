import React, { useEffect, useState } from 'react';
import { useRouter } from '@happysanta/router';
import { post } from 'axios';
import { createHmac } from 'crypto';

import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    CardGrid,
    Card,
    Button,
    Link,
} from '@vkontakte/vkui';
import { 
    Icon24StarsOutline,
    Icon16Smile,
    Icon16SadFaceOutline,
    Icon16New
} from '@vkontakte/icons';

import {
    PAGE_REVIEWS
} from '../routers.js';

const Goods = ({ id, showSnackbar, user }) => {
    const router = useRouter();

    const [apps, setApps] = useState(null);

    const getProducts = async () => {
        const { data } = await post('/getProducts');
        setApps(data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const buy = async (params) => {
        const app_data = `product_id=${params.product_id}&author_id=${params.author_id}&cost=${params.cost}&type=${params.type}`;
        const hash = createHmac('sha256', app_data).update(params.toString()).digest('hex');

        const { data } = await post('/buyProduct', {
            hash: hash,
            product_id: params.product_id
        });

        if(!data.success) return showSnackbar(true, data.msg); 
        showSnackbar(false, 'Товар приобретён!');
    };

    const getType = type => {
        switch(type) {
            case 'vk_app':
                return { name: 'VK MINI APP', color: '#fff', background: '#6221A0' }
            case 'vk_bot':
                return { name: 'VK BOT', color: '#fff', background: '#1BBBA0' }
            default:
                return;
        }
    };

    const convertDate = (unix) => {
        const months = [`января`,`февраля`,`марта`,`апреля`,`мая`,`июня`,`июля`,`августа`,` сентября`,`октября`,`ноября`,`декабря`];
        const date = new Date(unix);

        const month = months[date.getMonth()];
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        return day + ' ' + month + ' ' + ' в ' + hour + ':' + min;
    };

    const tags = ['Лучшее', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе', 'Хорошая цена', 'В топе'];

    return(
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()}/>}
            >
                Товары
            </PanelHeader>
            <CardGrid size='l' style={{marginTop: 10}}>
            {apps &&
                    apps.map(app => {
                        return(
                            <Card mode='outline' key={app.product_id}>
                                <div style={{ margin: 12 }}>
                                <div style={{ fontSize: 11, position: 'absolute', right: 5, color: 'var(--text_secondary)' }}>
                                    {convertDate(app.date || 0)}
                                </div>
                                <div>
                                    <b style={{ display: 'flex', letterSpacing: 1, textTransform: 'uppercase', marginRight: 5 }}>
                                        <Icon16New style={{ marginLeft: -4, marginTop: 2 }} fill={getType(app.type).background}/>
                                        <div style={{ marginRight: 5, background: getType(app.type).background, color: getType(app.type).color, padding: 4, borderRadius: 6, fontSize: 10, boxShadow: '0px 0px 0px 1px white' }}>{getType(app.type).name}</div>
                                        {app.title}
                                    </b>
                                </div>
                                <div style={{ color: 'var(--text_secondary)', fontSize: 16, margin: '3px 0 3px 0'}}>
                                    {app.demo_link && <div>Демо: <Link style={{ textTransform: 'lowercase' }} href={app.demo_link}>{app.demo_link}</Link></div>}
                                    Описание: {app.description}
                                </div>
                                <div style={{textAlign: 'left', display: 'flex', width: '100%', marginTop: 10}}>
                                    <Button onClick={() => buy(app)} style={{ color: '#fff', background: '#1C77EA' }}>Купить</Button>
                                    <div style={{
                                        color: 'var(--text_secondary)',
                                        fontSize: 14,
                                        margin: '5px 0 0 5px'
                                    }}>Цена: {app.cost} Р.</div>
                                </div>
                                <div style={{textAlign: 'right', fontSize: 14, marginTop: -20}}>
                                    Автор: {app.author_id != 0 ? 
                                    <Link href={`https://vk.com/id${app.author_id}`}>{app.author_id === user.id ? <b style={{ background: '#1367FE', color: '#fff', borderRadius: 5, padding: '2px 4px' }}>вы</b> : `@id${app.author_id}`}</Link> : 
                                    <i style={{color: '#1367FE'}}>All Shop</i>}
                                </div>
                                <br/>

                                <div style={{ display: 'flex' }}>
                                    <Button
                                    before={<Icon24StarsOutline/>}
                                    mode='tertiary'
                                    onClick={() => router.pushPage(PAGE_REVIEWS, { pid: (app.product_id).toString() })}
                                    >
                                        Отзывы
                                    </Button>

                                    <div style={{ display: 'flex', marginLeft: 'auto', marginRight: 0, border: '0.006rem solid rgba(125, 125, 125, 0.42)', padding: 8, borderRadius: 10 }}>
                                    <div style={{ textAlign: 'center', marginRight: 5, color: '#16B274', display: 'flex' }}>
                                        <Icon16Smile fill='#1FCB66' />
                                        <b style={{ marginLeft: 5 }}>0</b> 
                                    </div>

                                    <div style={{ width: '0.006rem', height: 18, margin: '0 5px', background: 'rgba(125, 125, 125, 0.42)', justifyContent: 'center', alignItems: 'center' }} />
                                    
                                    <div style={{ textAlign: 'center', marginLeft: 5, color: '#C9152F', display: 'flex' }}>
                                        <Icon16SadFaceOutline fill='#D81837' />
                                        <b style={{ marginLeft: 5 }}>0</b> 
                                    </div>
                                    </div>
                                </div>

                                <CardGrid size='l' style={{ margin: '15px -10px 0 -10px' }}>
                                    {
                                        tags.map(tag => {
                                            return (
                                                <small style={{ margin: '3px 5px 0 0', background: 'linear-gradient(40deg, #3E59FE, #3C42D0)', padding: '2px 3.5px', borderRadius: 6, color: '#fff' }}>
                                                    {tag}
                                                </small>
                                            )
                                        })
                                    }
                                </CardGrid>
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

export default Goods;