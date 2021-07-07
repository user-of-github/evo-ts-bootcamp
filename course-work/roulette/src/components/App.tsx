import React from 'react'
import Style from './App.module.css'
import {Roulette} from './roulette/Roulette'
import {Panel} from './gamePanel/GamePanel'
import {main} from '../data/mainStateInstance'
import cursor from '../images/cursor.png'

export const App = (): JSX.Element => (
    <section className={Style.mainContainer} style={{cursor: `url(${cursor}), auto`}}>
        <Roulette />
        <Panel data={main}/>
    </section>
)
