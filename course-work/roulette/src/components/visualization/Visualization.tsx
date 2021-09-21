import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../types/MainGameState'

import {Roulette} from './roulette/Roulette'
import {InfoBlocks} from './infoBlocks/InfoBlocks'

import Style from './Visualization.module.css'
import React from 'react'
import {Sound} from '../../types/Sound'


export const Visualization = observer((props: { data: MainGameState }): JSX.Element => {


    return (
        (
            <div className={Style.container}>
                <Roulette data={props.data}/>
                <InfoBlocks data={props.data}/>
            </div>
        )
    )
})