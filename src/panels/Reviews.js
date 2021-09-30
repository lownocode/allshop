import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from '@happysanta/router';
import { post } from 'axios';

import {
    FormItem,
    FormStatus,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelHeaderContent,
    Separator,
    SimpleCell,
    Counter,
    Textarea,
    Button,
    CardGrid,
    Card,
    Div,
    Avatar,
    Header,
    Placeholder,
    SliderSwitch,
    PanelHeaderButton,
    Tooltip,
    Group
} from '@vkontakte/vkui';
import {
    Icon16Smile,
    Icon16SadFaceOutline,
    Icon16PenOutline,
    Icon20DeleteOutlineAndroid
} from '@vkontakte/icons';

const Reviews = ({ id, user, showSnackbar }) => {
    const [reviews, setReviews] = useState([]);
    const [productData, setProductData] = useState({})
    const [text, setText] = useState('');
    const [emotion, setEmotion] = useState('positive');
    const [negativeEmotions, setNegativeEmotions] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [editText, setEditText] = useState('');
    const [editEmotion, setEditEmotion] = useState('positive');
    const [tooltipDelete, setTooltipDelete] = useState([false]);

    const router = useRouter();
    const { pid } = useParams();

    const getReviews = async () => {
        setNegativeEmotions(0);
        const { data } = await post('/getReviews', { product_id: pid });

        setReviews(data.reviews);
        setProductData(data);
        data.reviews.map(review => {
            if(review.emotion === 'negative') return setNegativeEmotions(negativeEmotions + 1);
        });
    };

    useEffect(() => {
        getReviews();
    }, []);

    const addReview = async () => {
        const { data } = await post('/addReview', {
            product_id: pid,
            text: text,
            emotion: emotion
        });
        setReviews([data.review, ...reviews]);
        setText('');
    };

    const convertDate = (unix) => {
        const date = new Date(unix);

        const month = date.getMonth() + 1 < 10 ? '0' + Number(date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        return day + '.' + month + '.' + date.getFullYear().toString().substring(2, Infinity) + ' в ' + hour + ':' + min;
    };

    const edit = async (rid) => {
        const { data } = await post('/editReview', { text: editText, emotion: editEmotion, rid: rid });
        if(!data.success) return showSnackbar(true, data.msg);

        setIsEdit(false)
        getReviews();
        showSnackbar(false, data.msg);
    };

    const deleteReview = async (rid) => {
        const { data } = await post('/deleteReview', { rid: rid });

        if(!data.success) return showSnackbar(true, data.msg);
        getReviews();
        setTooltipDelete(false);
        showSnackbar(false, data.msg);
    };

    return (
        <Panel id={id}>
            <Group>
                <PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()} />}>
                    <PanelHeaderContent status={productData.product || ''}>
                        Отзывы
                    </PanelHeaderContent>
                </PanelHeader>

                <FormItem>
                    <FormStatus>
                        <SimpleCell
                        disabled
                        before={<Icon16Smile />}
                        after={<Counter mode='primary'>{(reviews.length - negativeEmotions).toLocaleString('ru-RU')}</Counter>}
                        >
                            Позитивные отзывы
                        </SimpleCell>
                        <Separator wide/>
                        <SimpleCell
                        disabled
                        before={<Icon16SadFaceOutline />}
                        after={<Counter mode='primary'>{negativeEmotions}</Counter>}
                        >
                            Негативные отзывы
                        </SimpleCell>
                    </FormStatus>
                </FormItem>

                <FormItem>
                    <Textarea
                    value={text}
                    placeholder='Напишите здесь свой отзыв...'
                    onChange={e => setText(e.target.value)}
                    />
                </FormItem>
                <FormItem top='Выберите тип отзыва'>
                    <SliderSwitch
                    onSwitch={value => setEmotion(value)} 
                    activeValue={emotion}
                    options={[
                        {
                            name: 'Позитивный',
                            value: 'positive',
                        },
                        {
                            name: 'Негативный',
                            value: 'negative',
                        },
                    ]}
                    />
                </FormItem>
                <Div>
                    <Button
                    stretched
                    size='m'
                    mode={text.trim().length < 1 ? 'secondary' : 'primary'}
                    disabled={text.trim().length < 1}
                    onClick={addReview}
                    >
                        Опубликовать
                    </Button>
                </Div>
                <Header mode='secondary'>Отзывы</Header>
                {reviews.length > 0 ?
                <CardGrid size='l'>
                    {
                        reviews.map(review => {
                            return (
                                <Card mode='outline' key={review.uid}>
                                    <SimpleCell
                                    style={{ borderRadius: '8px 8px 0px 0px' }}
                                    before={<Avatar size={40} shadow={false} src={review.user_data.photo_200}/>}
                                    href={`https://vk.com/id` + review.sender_id}
                                    after={
                                        <Counter
                                        style={{ 
                                            background: review.emotion === 'positive' ? '#1FCB66' : '#D81837',
                                        }}
                                        >
                                            {review.emotion === 'positive' 
                                            ? <Icon16Smile fill='#fff'/> 
                                            : <Icon16SadFaceOutline fill='#fff'/>}
                                        </Counter>
                                    }
                                    >
                                        {review.user_data.first_name} {review.user_data.last_name}
                                    </SimpleCell>
                                    <Div>
                                        {
                                            isEdit 
                                            ? <div>
                                                <Textarea
                                                placeholder='Редактирование текста'
                                                onChange={e => setEditText(e.target.value)}
                                                defaultValue={review.text}
                                                />
                                                <Header mode='secondary'>Тип отзыва</Header>
                                                <SliderSwitch
                                                onSwitch={value => setEditEmotion(value)} 
                                                activeValue={editEmotion}
                                                options={[
                                                    {
                                                        name: 'Позитивный',
                                                        value: 'positive',
                                                    },
                                                    {
                                                        name: 'Негативный',
                                                        value: 'negative',
                                                    },
                                                ]}
                                                />
                                                <Button 
                                                disabled={editText.trim().length === 0} 
                                                style={{ marginTop: 5 }}
                                                onClick={() => edit(review.uid)}
                                                >
                                                    Редактировать
                                                </Button>
                                            </div>
                                            : review.text
                                        }
                                    </Div>
                                    <i style={{ margin: '0 0 4px 4px', color: 'var(--text_secondary)', fontSize: 11 }}>{convertDate(+new Date(review.createdAt))}</i>
                                    {review.updatedAt !== review.createdAt && <div><i style={{ margin: '0 0 4px 4px', color: 'var(--text_secondary)', fontSize: 11 }}>edit {convertDate(+new Date(review.updatedAt))}</i></div>}
                                    {review.sender_id === user.id &&
                                    <div style={{ display: 'flex', margin: '-5px 9px 5px auto', float: 'right' }}>
                                        <PanelHeaderButton onClick={() => setIsEdit(!isEdit)} style={{ padding: 7 }}><Icon16PenOutline fill='var(--accent)'/></PanelHeaderButton>
                                        <Tooltip 
                                        text={
                                        <div>Подтверждение удаления<br/>
                                            <div>
                                                <Button mode='tertiary' hasHover={false} style={{ color: '#E43A52' }} onClick={() => deleteReview(review.uid)}>Удалить</Button>
                                                <Button mode='tertiary' hasHover={false} onClick={() => setTooltipDelete([false])} style={{ color: '#fff' }}>Отмена</Button>
                                            </div>
                                        </div>} isShown={tooltipDelete[0] && review.uid === tooltipDelete[1]}>
                                            <PanelHeaderButton onClick={() => setTooltipDelete([true, review.uid])} style={{ padding: 7 }}><Icon20DeleteOutlineAndroid width={16} height={16} fill='red'/></PanelHeaderButton>
                                        </Tooltip>
                                    </div>}
                                </Card>
                            )
                        })
                    }
                </CardGrid> :
                <Placeholder header='Отзывов нет'>
                    Купили данный товар? Оставьте свой отзыв!
                </Placeholder>}
                <br/>
            </Group>
        </Panel>
    )
};

export default Reviews;