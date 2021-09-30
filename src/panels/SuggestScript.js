import React, { useState } from 'react';
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
    Select,
    Div,
    FormStatus,
    File,
    CustomSelectOption,
    Group
} from '@vkontakte/vkui';
import { ChipsSelect } from '@vkontakte/vkui/dist/unstable';
import { 
    Icon24DocumentOutline,
    Icon24LogoVkOutline,
    Icon24RobotOutline
} from '@vkontakte/icons';

const SuggestScript = ({ id, showSnackbar }) => {
    const router = useRouter();

    const [titleNewProduct, setTitleNewProduct] = useState('');
    const [descriptionNewProduct, setDescriptionNewProduct] = useState('');
    const [typeNewProduct, setTypeNewProduct] = useState('');
    const [demoLinkNewProduct, setDemoLinkNewProduct] = useState('');
    const [sumNewProduct, setSumNewProduct] = useState(null);
    const [file, setFile] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    
    const tags = [
        {label: 'Хорошая цена', value: 'good_cost'}, {label: 'Большой проект', value: 'big_project'}, {label: 'Лучшее', value: 'best'},
        {label: 'Хороший код', value: 'good_code'}, {label: 'Скидка', value: 'discount'}, {label: 'Отзывчивый автор', value: 'responsive_author'},
        {label: 'Эксклюзивное', value: 'exclusive'},
        {label: 'Java', value: 'java'}, {label: 'JavaScript', value: 'javascript'}, {label: 'Python', value: 'python'},
        {label: 'Node JS', value: 'node_js'}
    ];

    const validFileTypes = [
        'x-java-archive', 'x-tar', 'x-bzip',
        'gzip', 'x-lzma', 'vnd.rar', 'zip'
    ];

    const sendSuggest = async () => {
        if(!file) {
            return showSnackbar(true, 'Файл не прикреплен');
        }

        else if(file.size > 157286400) {
            return showSnackbar(true, 'Размер файла не должен превышать 150 MB.');
        }

        else if(validFileTypes.findIndex(t => t === file.type.split('/')[1] || '') === -1) {
            return showSnackbar(true, 'Неподдиржеваемый тип файла.');
        }

        const formData = new FormData();
        console.log(file)
        formData.append(file.type, file);
        
        const { data } = await post('/sendSuggest', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                params: `demo_link=${demoLinkNewProduct}&type=${typeNewProduct}&cost=${sumNewProduct}&description=${descriptionNewProduct}&title=${titleNewProduct}&tags=${selectedTags.map(tag => tag.value).join(',')}`
            }
        });

        if(!data.success) return showSnackbar(true, data.msg); 
        showSnackbar(false, data.msg);
        router.popPage();
    };

    const readableBytes = (bytes) => {
        let i = Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
    };

    const selectTags = e => {
        setSelectedTags(e);
    };
    
    return (
        <Panel id={id}>
            <Group>
            <PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()}/>}>Предложить скрипт</PanelHeader>
            <FormItem>
            <FormStatus header="Обратите внимание">
                После того, как вы предложите скрипт, он отправится на проверку модерации 
                и если если всё в порядке, то скрипт добавляется в наш маркет и будет приносить 
                вам 70% от суммы, которую вы укажете для продажи.
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
                <Select
                placeholder='Не выбран'
                onChange={(e) => setTypeNewProduct(e.target.value)}
                value={typeNewProduct}
                options={[
                    {
                        label: 'VK MINI APP',
                        value: 'vk_app',
                        before: <Icon24LogoVkOutline/>
                    },
                    {
                        label: 'VK BOT',
                        value: 'vk_bot',
                        before: <Icon24RobotOutline/>
                    }
                ]}
                renderOption={({ option, ...restProps }) => (
                    <CustomSelectOption {...restProps} before={option.before} />
                )}
                />
            </FormItem>
            <FormItem top='Демо (ссылка, можно оставить пустым)'>
                <Input
                placeholder='Введите ссылку'
                onChange={(e) => setDemoLinkNewProduct(e.target.value)}
                />
            </FormItem>
            <FormItem top='Выберите теги'>
                <ChipsSelect
                value={selectedTags}
                onChange={selectTags}
                options={tags}
                placeholder='Не выбрано ни одного тега'
                emptyText='Вы выбрали все теги'
                />
            </FormItem>
            <FormItem
            top='Архив с исходными файлами' 
            bottom={file && file.name 
            ? <b style={{ color: '#FFF', background: '#F19312', padding: 3, borderRadius: 4, fontSize: 10 }}>{file.name} ({readableBytes(file.size)})</b> 
            : <div>Валидные форматы: {validFileTypes.join(', ')}</div>}>
                <File
                before={<Icon24DocumentOutline/>}
                onChange={e => setFile(e.target.files[0])}
                controlSize="l"
                stretched
                mode='secondary'
                >
                    Выбрать файл
                </File>
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
            </Group>
        </Panel>
    )
};

export default SuggestScript;