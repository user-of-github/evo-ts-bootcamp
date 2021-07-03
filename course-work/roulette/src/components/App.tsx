import React from 'react'
import Style from './App.module.css'
import {Roulette} from './roulette/Roulette'
import {Panel} from './gamePanel/GamePanel'
import {main} from '../data/mainStateInstance'


export const App = (): JSX.Element => (
    <section className={Style.mainContainer}>
        <Roulette />
        <Panel data={main}/>
    </section>
)
