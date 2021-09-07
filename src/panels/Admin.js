import React, { useState, useEffect } from 'react';
import { useRouter } from '@happysanta/router';
import { post } from 'axios';

import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    FormItem,
    Input,
    Textarea,
    Button,
    NativeSelect,
    Header,
    Div,
    CardGrid,
    Card,
    SimpleCell,
} from '@vkontakte/vkui';

const Admin = ({ id, showSnackbar }) => {
    const router = useRouter();

    const [offers, setOffers] = useState([]);
    const [info, setInfo] = useState({
        users_count: 0,
        loadavg: [0, 0, 0],
        mem: { free: 0, total: 0 },
        uptime: 0
    });
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [openInformation, setOpenInformation] = useState(true);

    const [titleNewProduct, setTitleNewProduct] = useState('');
    const [descriptionNewProduct, setDescriptionNewProduct] = useState('');
    const [typeNewProduct, setTypeNewProduct] = useState('');
    const [demoLinkNewProduct, setDemoLinkNewProduct] = useState('');
    const [sourceNewProduct, setSourceNewProduct] = useState('');
    const [sumNewProduct, setSumNewProduct] = useState(null);

    const unixStampLeft = (stamp) => {
        let s = stamp % 60;
        stamp = ( stamp - s ) / 60;
        let m = stamp % 60;
        stamp = ( stamp - m ) / 60;
        let	h = ( stamp ) % 24;
        let	d = ( stamp - h ) / 24;
    
        let text = ``;
    
        if(d > 0) text += Math.floor(d) + " дн. ";
        if(h > 0) text += Math.floor(h) + " ч. ";
        if(m > 0) text += Math.floor(m) + " мин. ";
        if(s > 0) text += Math.floor(s) + " сек.";
    
        return text;
    }

    const getInfo = async () => {
        const { data } = await post('/admin.getInfo');
        if(data.success) return setInfo(data);
    };

    const getOffers = async () => {
        const { data } = await post('/admin.getOffers');
        setOffers(data);
    };

    const publishNewProduct = async () => {
        const { data } = await post('/admin.addProduct', {
            demo_link: demoLinkNewProduct,
            source: sourceNewProduct,
            type: typeNewProduct,
            sum: Number(sumNewProduct),
            description: descriptionNewProduct,
            title: titleNewProduct
        });

        if(!data.success) return showSnackbar(true, data.msg); 
        showSnackbar(false, data.msg);
    };

    const reloadBackend = async () => {
        const { data } = await post('/admin.reloadBackend');

        if(!data.success) return showSnackbar(true, data.msg); 
        showSnackbar(false, data.msg);
    };

    useEffect(() => {
        getOffers();
        getInfo();
        setInterval(getInfo, 5000);
    }, []);
    
    return(
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() =>  router.popPage()}/>}>Админка</PanelHeader>
            <Header mode='secondary' indicator={<Button mode='outline' onClick={() => setOpenInformation(!openInformation)}>{openInformation ? 'Закрыть' : 'Развернуть'}</Button>}>Информация</Header>
            {openInformation && <div><CardGrid size='m'>
                <Card>
                    <SimpleCell
                    disabled
                    description='Пользователей всего'
                    ><b>{info.users_count}</b></SimpleCell>
                </Card>
                <Card>
                    <SimpleCell
                    disabled
                    description='Нагрузка'
                    ><b>{info.loadavg[0].toFixed(4) || 0}, {info.loadavg[1].toFixed(4) || 0}, {info.loadavg[2].toFixed(4) || 0}</b></SimpleCell>
                </Card>
                <Card>
                    <SimpleCell
                    disabled
                    description='Использование ОЗУ'
                    ><b>{(info.mem.free / 1000000 || 0).toFixed(0)}MB из {((info.mem.total / 1000000) / 1024 || 0).toFixed(2)}GB</b></SimpleCell>
                </Card>
                <Card>
                    <SimpleCell
                    disabled
                    description='Время работы сервера'
                    ><b>{unixStampLeft((info.uptime || 0).toFixed(0))}</b></SimpleCell>
                </Card>
            </CardGrid>
            <Div>
                <Button stretched mode='outline' size='l' onClick={() => reloadBackend()}>
                    Перезагрузить бекенд
                </Button>
            </Div>
            </div>}
            <Header mode='secondary' indicator={<Button mode='outline' onClick={() => setOpenAddProduct(!openAddProduct)}>{openAddProduct ? 'Закрыть' : 'Развернуть'}</Button>}>Добавить товар</Header>
            {openAddProduct ? 
            <div><FormItem top='Название'>
                <Input
                placeholder='Введите название'
                onChange={(e) => setTitleNewProduct(e.target.value)}
                />
            </FormItem>
            <FormItem top='Описание'>
                <Textarea
                placeholder='Введите описание'
                onChange={(e) => setDescriptionNewProduct(e.target.value)}
                />
            </FormItem>
            <FormItem top='Тип товара'>
                <NativeSelect
                placeholder='Не выбран'
                onChange={(e) => setTypeNewProduct(e.target.value)}
                value={typeNewProduct}
                >
                    <option value='vk_app'>VK MINI APP</option>
                    <option value='vk_bot'>VK BOT</option>
                </NativeSelect>
            </FormItem>
            <FormItem top='Демо (ссылка) (можно оставить пустым)'>
                <Input
                placeholder='Введите ссылку'
                onChange={(e) => setDemoLinkNewProduct(e.target.value)}
                />
            </FormItem>
            <FormItem top='Ссылка на исходник'>
                <Input
                placeholder='Введите ссылку'
                onChange={(e) => setSourceNewProduct(e.target.value)}
                />
            </FormItem>
            <FormItem top='Стоимость товара'>
                <Input
                placeholder='Введите стоимость'
                type='number'
                onChange={(e) => setSumNewProduct(e.target.value)}
                />
            </FormItem>
            <Div>
                <Button
                onClick={() => publishNewProduct()}
                stretched
                mode='commerce'
                size='l'
                >
                    Добавить товар
                </Button>
            </Div>
            </div> : null}
        </Panel>
    )
};

export default Admin;