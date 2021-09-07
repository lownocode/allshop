import React, { useState } from 'react';
import { post } from 'axios';

import {
    ModalCard,
    FormLayout,
    Div,
    Button,
    Input
} from '@vkontakte/vkui';

export const ActivatePromocode = ({ id, setActiveModal, showSnackbar, getUser }) => {
    const [inputPromo, setInputPromo] = useState('');

    const activatePromo = async () => {
		const { data } = await post('/activatePromocode', {
			promo: inputPromo
		});

		if(!data.success) return showSnackbar(true, data.msg);

		showSnackbar(data.msg);
		setActiveModal(null);
		getUser();
	};

    return (
        <ModalCard
        id={id}
        onClose={() => setActiveModal(null)}
        header='Активация промокода'
        >
            <FormLayout top='Промокод'>
                <Input
                onChange={(e) => setInputPromo(e.target.value)}
                placeholder='1234-ABCD-EF56-JK78'
                />
                <Div>
                    <Button
                    stretched
                    size='l'
                    onClick={() => activatePromo()}
                    >
                        Активировать
                    </Button>
                </Div>
            </FormLayout>
        </ModalCard>
    )
};