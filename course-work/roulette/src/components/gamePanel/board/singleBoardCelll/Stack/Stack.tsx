import {observer} from 'mobx-react-lite'

import {Chip} from '../../../../../types/Chip'

import {ChipInStack} from './сhipInStack/ChipInStack'


export const Stack = observer((props: { chipsPlaced: Array<Chip> }): JSX.Element => (
    <>
        {
            props.chipsPlaced.map((item: Chip, index: number) =>
                <ChipInStack chip={item} index={index} key={index}/>)
        }
    </>
))
