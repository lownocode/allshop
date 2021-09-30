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
    Group,
    PullToRefresh
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

import "../styles/Goods.css";

const Goods = ({ id, showSnackbar, user, products, getProducts }) => {
    const router = useRouter();
    const [isFetching, setFetching] = useState(false);

	const onRefresh = () => {
		setFetching(true);
		getProducts();
		setTimeout(() => { setFetching(false) }, 111);
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

    return(
        <Panel id={id}>
            <Group>
                <PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()}/>}
                >
                    Товары
                </PanelHeader>

                <PullToRefresh isFetching={isFetching} onRefresh={onRefresh}>
                <CardGrid size='l'>
                {products &&
                        products.map((product, index) => {
                            return(
                                <Card mode='outline' key={index}>
                                    <div style={{ margin: 12 }}>
                                    <div style={{ fontSize: 11, position: 'absolute', right: 5, color: 'var(--text_secondary)' }}>
                                        {convertDate(product.createdAt || 0)}
                                    </div>
                                    <div>
                                        <b style={{ display: 'flex', letterSpacing: 1, textTransform: 'uppercase', marginRight: 5 }}>
                                            <Icon16New style={{ marginLeft: -4, marginTop: 2 }} fill={getType(product.type).background}/>
                                            <div style={{ marginRight: 5, background: getType(product.type).background, color: getType(product.type).color, padding: 4, borderRadius: 6, fontSize: 10, boxShadow: '0px 0px 0px 1px white' }}>{getType(product.type).name}</div>
                                            {product.title}
                                        </b>
                                    </div>
                                    <div style={{ color: 'var(--text_secondary)', fontSize: 16, margin: '3px 0 3px 0'}}>
                                        {product.demo_link && <div>Демо: <Link style={{ textTransform: 'lowercase' }} href={product.demo_link}>{product.demo_link}</Link></div>}
                                        Описание: {product.description}
                                    </div>
                                    <div style={{textAlign: 'left', display: 'flex', width: '100%', marginTop: 10}}>
                                        <Button onClick={() => buy(product)} style={{ color: '#fff', background: '#1C77EA' }}>Купить</Button>
                                        <div style={{
                                            color: 'var(--text_secondary)',
                                            fontSize: 14,
                                            margin: '5px 0 0 5px'
                                        }}>Цена: {product.cost} Р.</div>
                                    </div>
                                    <div style={{textAlign: 'right', fontSize: 14, marginTop: -20}}>
                                        Автор: {product.author_id != 0 ? 
                                        <Link href={`https://vk.com/id${product.author_id}`}>{product.author_id === user.id ? <b style={{ background: '#1367FE', color: '#fff', borderRadius: 5, padding: '2px 4px' }}>вы</b> : `@id${product.author_id}`}</Link> : 
                                        <i style={{color: '#1367FE'}}>All Shop</i>}
                                    </div>
                                    <br/>

                                    <div style={{ display: 'flex' }}>
                                        <Button
                                        before={<Icon24StarsOutline/>}
                                        mode='tertiary'
                                        onClick={() => router.pushPage(PAGE_REVIEWS, { pid: (product.uid).toString() })}
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
                                            product.tags && product.tags.map((tag, index) => {
                                                tag = tag.replace(/good_cost/g, 'Хорошая цена')
                                                .replace(/big_project/g, 'Большой проект')
                                                .replace(/best/g, 'Лучшее')
                                                .replace(/discount/g, 'Скидка')
                                                .replace(/good_code/g, 'Хороший код')
                                                .replace(/node_js/g, 'Node JS')
                                                .replace(/responsive_author/g, 'Отзывчивый автор')
                                                .replace(/exclusive/g, 'Эксклюзивно')
                                                .replace(/javascript/g, 'JavaScript')
                                                .replace(/java/g, 'Java')
                                                .replace(/python/g, 'Python')

                                                return (
                                                    <small className='tag' key={index}>
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
                </PullToRefresh>
                <br/>
            </Group>
        </Panel>
    )
};

export default Goods;