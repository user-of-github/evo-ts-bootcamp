import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../types/MainGameState'

import {Chips} from './chips/ChipPanel'
import {Board} from './board/Board'
import {Controls} from './controls/Controls'

import Style from './GamePanel.module.css'


export const Panel = observer((props: { data: MainGameState }): JSX.Element => (
    <section className={Style.wrapper}>
        <div className={Style.container}>
            <Chips data={props.data}/>
            <Board data={props.data}/>
            <Controls data={props.data}/>
        </div>
    </section>
))