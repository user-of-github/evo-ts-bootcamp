import React from 'react'

import {LifeCanvasState} from '../lifeStore/lifeState'

import {Header} from './header'
import {Configuration} from './configuration'
import {Canvas} from './canvas'

import Style from './app.module.css'


const main: LifeCanvasState = new LifeCanvasState()

export const App = () => (
    <>
        <Header/>
        <div className={Style.container}>
            <main className={Style.applicationContainer}>
                <Configuration data={main}/>
                <Canvas data={main}/>
            </main>
        </div>
    </>
)
