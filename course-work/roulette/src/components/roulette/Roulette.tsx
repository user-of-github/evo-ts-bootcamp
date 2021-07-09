import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../types/MainGameState'

import Style from './Roulette.module.css'


export const Roulette = observer((props: { data: MainGameState }): JSX.Element => (
    <section className={Style.container}>
        <canvas></canvas>
    </section>
))