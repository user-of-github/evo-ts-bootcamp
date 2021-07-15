import React from 'react'

import cursor from '../images/cursor.png'
import {MainGameState} from '../types/MainGameState'

import {Roulette} from './roulette/Roulette'
import {Panel} from './gamePanel/GamePanel'
import {ModalResult, ModalWarning} from './modal/Modal'

import Style from './App.module.css'


export const App = (): JSX.Element => {
    const mainState: React.MutableRefObject<MainGameState> = React.useRef<MainGameState>(new MainGameState())

    return (
        <>
            <section className={Style.mainContainer} style={{cursor: `url(${cursor}), auto`}}>
                <Roulette data={mainState.current}/>
                <Panel data={mainState.current}/>
                <ModalWarning state={mainState.current}/>
                <ModalResult state={mainState.current}/>
            </section>
        </>
    )
}
