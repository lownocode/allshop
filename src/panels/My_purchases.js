import React from 'react';

import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder
} from '@vkontakte/vkui';
import { 
    Icon16SadFaceOutline 
} from '@vkontakte/icons';

const My_purchases = ({ id, go, user }) => {
    return(
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => go('home')}/>}>Мои покупки</PanelHeader>
            {user.purchases.length < 1 ? 
            <Placeholder
            stretched
            icon={<Icon16SadFaceOutline width={55} height={55} fill='#FFA07A'/>}
            header='Как так?'
            >
                Вы ещё не приобрели ни одного товара
            </Placeholder> : 
            'tsst'}
        </Panel>
    )
};

export default My_purchases;