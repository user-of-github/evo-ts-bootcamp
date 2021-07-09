import React from 'react'

import {Roulette} from './roulette/Roulette'
import {Panel} from './gamePanel/GamePanel'
import {main} from '../data/mainStateInstance'

import cursor from '../images/cursor.png'
import Style from './App.module.css'

export const App = (): JSX.Element => (
    <section className={Style.mainContainer} style={{cursor: `url(${cursor}), auto`}}>
        <Roulette data={main}/>
        <Panel data={main}/>
    </section>
)
