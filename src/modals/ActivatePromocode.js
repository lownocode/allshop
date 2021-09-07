import React, { useState } from 'react';
import { useRouter} from '@happysanta/router';
import { post } from 'axios';

import {
    ModalCard,
    FormLayout,
    Div,
    Button,
    Input
} from '@vkontakte/vkui';

export const ActivatePromocode = ({ id, showSnackbar, getUser }) => {
    const router = useRouter();

    const [inputPromo, setInputPromo] = useState('');

    const activatePromo = async () => {
		const { data } = await post('/activatePromocode', {
			promo: inputPromo
		});

		if(!data.success) return showSnackbar(true, data.msg);

		showSnackbar(data.msg);
		router.popPage();
		getUser();
	};

    return (
        <ModalCard
        id={id}
        onClose={() => router.popPage()}
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