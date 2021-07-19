import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../types/MainGameState'

import {Coefficients} from './information/Coefficients'
import {History} from './history/History'


export const InfoBlocks = observer((props: { data: MainGameState }): JSX.Element => (
    <>
        <Coefficients data={props.data}/>
        <History data={props.data}/>
    </>
))