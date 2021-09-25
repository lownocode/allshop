import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from '@happysanta/router';
import { post } from 'axios';

import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelHeaderContent
} from '@vkontakte/vkui';

const Reviews = ({ id, reviewsProductId }) => {
    const [reviews, setReviews] = useState([]);
    const router = useRouter();
    const { pid } = useParams();

    const getReviews = async () => {
        const { data } = await post('/getReviews', { product_id: pid });

        setReviews(data);
    };

    useEffect(() => {
        getReviews();
    }, []);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()} />}>
                <PanelHeaderContent status={reviews.product || ''}>
                    Отзывы
                </PanelHeaderContent>
            </PanelHeader>
        </Panel>
    )
};

export default Reviews;