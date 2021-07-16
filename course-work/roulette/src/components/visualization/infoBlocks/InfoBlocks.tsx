import {observer} from 'mobx-react-lite'
import {MainGameState} from '../../../types/MainGameState'
import {Information} from "./information/Information";
import {History} from "./history/History";


export const InfoBlocks = observer((props: {data: MainGameState}): JSX.Element => (
    <>
        <Information/>
        <History data={props.data}/>
    </>
))