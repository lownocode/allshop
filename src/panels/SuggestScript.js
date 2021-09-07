import React, { useState } from 'react';
import { post } from 'axios';

import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    FormItem,
    Input,
    Textarea,
    Button,
    Snackbar,
    NativeSelect,
    Div,
    Avatar,
    FormStatus
} from '@vkontakte/vkui';
import { 
    Icon16Cancel,
    Icon16Done
} from '@vkontakte/icons';

const SuggestScript = ({ id, go, showSnackbar }) => {
    const [titleNewProduct, setTitleNewProduct] = useState('');
    const [descriptionNewProduct, setDescriptionNewProduct] = useState('');
    const [typeNewProduct, setTypeNewProduct] = useState('');
    const [demoLinkNewProduct, setDemoLinkNewProduct] = useState('');
    const [sourceNewProduct, setSourceNewProduct] = useState('');
    const [sumNewProduct, setSumNewProduct] = useState(null);

    const sendSuggest = async () => {
        const { data } = await post('/sendSuggest', {
            demo_link: demoLinkNewProduct,
            source: sourceNewProduct,
            type: typeNewProduct,
            sum: Number(sumNewProduct),
            description: descriptionNewProduct,
            title: titleNewProduct
        });

        if(!data.success) return showSnackbar(true, data.msg); 
        showSnackbar(data.msg);
    };
    
    return(
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => go('home')}/>}>Предложить скрипт</PanelHeader>
            <FormItem>
            <FormStatus header="Обратите внимание">
                После того, как вы предложите скрипт, он отправится на проверку модерации, и, если если всё в порядке, то скрипт добавляется в наш маркет и будет приносить вам 70% от суммы, которую вы укажете для продажи.
            </FormStatus>
            </FormItem>
            <FormItem top='Название'>
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
            <FormItem top='Демо (ссылка, можно оставить пустым)'>
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
                onClick={() => sendSuggest()}
                stretched
                mode='commerce'
                size='l'
                >
                    Добавить товар
                </Button>
            </Div>
        </Panel>
    )
};

export default SuggestScript;