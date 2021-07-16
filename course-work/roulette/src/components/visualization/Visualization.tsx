import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../types/MainGameState'

import {Roulette} from './roulette/Roulette'
import {History} from './infoBlocks/history/History'

import Style from './Visualization.module.css'
import {Information} from "./infoBlocks/information/Information";
import {InfoBlocks} from "./infoBlocks/InfoBlocks";


export const Visualization = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        <Roulette data={props.data}/>
        <InfoBlocks data={props.data}/>
    </div>
))