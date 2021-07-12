import React from 'react'

import cursor from '../images/cursor.png'
import {MainGameState} from '../types/MainGameState'

import {Roulette} from './roulette/Roulette'
import {Panel} from './gamePanel/GamePanel'

import Style from './App.module.css'


export const App = (): JSX.Element => {
    const mainState: React.MutableRefObject<MainGameState> = React.useRef<MainGameState>(new MainGameState())

    return (
        <section className={Style.mainContainer} style={{cursor: `url(${cursor}), auto`}}>
            <Roulette data={mainState.current}/>
            <Panel data={mainState.current}/>
        </section>
    )
}
