import React from 'react'
import {observer} from 'mobx-react-lite'

import {RouletteWorld3D} from '../../../types/RouletteWorld3D'
import {MainGameState} from '../../../types/MainGameState'

import Style from './Roulette.module.css'


export const Roulette = observer((props: { data: MainGameState }): JSX.Element => {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = React.useRef<HTMLCanvasElement | null>(null)
    const world3D: React.MutableRefObject<RouletteWorld3D | null> = React.useRef<RouletteWorld3D | null>(null)

    React.useLayoutEffect(() => {
        if (canvasRef) {
            world3D.current = new RouletteWorld3D(canvasRef.current as HTMLCanvasElement)
            props.data.wayTo3DWorld = world3D.current
            world3D.current!.wayToGameState = props.data
        }
    }, [])
    return (
        <section className={Style.container}>
            <canvas className={Style.babylonCanvas}
                    width={document.documentElement.offsetWidth * (window.devicePixelRatio | 2)}
                    height={document.documentElement.offsetHeight * (window.devicePixelRatio | 2)}
                    ref={canvasRef}/>
        </section>
    )
})