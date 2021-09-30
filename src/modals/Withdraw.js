import React, { useState } from 'react';
import { useRouter} from '@happysanta/router';
import { post } from 'axios';

import {
    ModalCard,
    Button,
    NativeSelect,
    FormItem,
    Input,
    Div
} from '@vkontakte/vkui';

export const Withdraw = ({ id, showSnackbar, getUser }) => {
    const router = useRouter();

    const [withdrawSystem, setWithdrawSystem] = useState('qiwi');
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const [withdrawWallet, setWithdrawWallet] = useState('');

    const withdraw = async () => {
		const { data } = await post('/withdraw', {
			system: withdrawSystem,
			amount: withdrawAmount,
			wallet: withdrawWallet
		});

		if(!data.success) return showSnackbar(true, data.msg);
		
		showSnackbar(false, data.msg);
		router.popPage();
		getUser();
	};

    return (
        <ModalCard
        id={id}
        onClose={() => router.popPage()}
        >
            <FormItem top="Выберите платежную систему">
                <NativeSelect onChange={(e) => setWithdrawSystem(e.target.value)}>
                    <option value="qiwi">QIWI-кошелек</option>
                    <option value="bank-card">Банковская карта</option>
                    <option value="webmoney">WebMoney (только Z-кошельки)</option>
                    <option value="yoomoney">ЮMoney</option>
                    <option value="mobile">Счет мобильного телефона</option>
                </NativeSelect>
            </FormItem>
            <FormItem top="Номер кошелька">
                <Input
                placeholder={withdrawSystem
                    .replace(/qiwi/gi, 'QIWI-кошелек')
                    .replace(/bank-card/gi, 'Банковская карта')
                    .replace(/webmoney/gi, 'WebMoney')
                    .replace(/yoomoney/gi, 'ЮMoney')
                    .replace(/mobile/gi, 'Номер телефона')
                }
                onChange={(e) => setWithdrawWallet(e.currentTarget.value)}
                type='number'
                />
            </FormItem>
            <FormItem top="Сумма вывода">
                <Input
                placeholder='Укажите сумму'
                onChange={(e) => setWithdrawAmount(e.currentTarget.value)}
                type='number'
                />
            </FormItem>
            <Div>
                <Button 
                stretched
                mode='primary'
                size='l'
                onClick={() => withdraw()}
                >
                    Вывести
                </Button>
            </Div>
        </ModalCard>
    )
};