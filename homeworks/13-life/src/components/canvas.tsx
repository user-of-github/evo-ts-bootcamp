import React, {useEffect, useRef} from 'react'
import {observer} from 'mobx-react-lite'

import {LifeCanvasState} from '../lifeStore/lifeState'

import Style from './canvas.module.css'


const CANVAS_SIDE_SIZE: number = 400
const CANVAS_DEAD_CELL_COLOR: string = '#f7f1e3'
const CANVAS_ALIVE_CELL_COLOR: string = '#33d9b2'

const canvasClicked = (event: any, canvas: HTMLCanvasElement, smallRectSize: number, data: LifeCanvasState) => {
    const rect: DOMRect = canvas.getBoundingClientRect()
    const x: number = event.clientX - rect.left
    const y: number = event.clientY - rect.top

    const row: number = Math.floor(x / smallRectSize)
    const col: number = Math.floor(y / smallRectSize)

    data.field[row][col] = !data.field[row][col]
}

export const Canvas = observer((props: { data: LifeCanvasState }): JSX.Element => {
    const canvasRef: React.RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
    const contextRef: React.RefObject<CanvasRenderingContext2D> = useRef<CanvasRenderingContext2D>(null)
    const smallRectRef: React.RefObject<number> = useRef<number>(null)

    const drawGrid = (): void => {
        // noinspection JSConstantReassignment
        // @ts-ignore
        smallRectRef["current"] = CANVAS_SIDE_SIZE / props.data.getFieldSize()

        contextRef.current!.strokeStyle = 'rgba(0, 0, 0, 0.1)'
        contextRef.current!.lineWidth = 0.5
        contextRef.current!.beginPath()
        for (let col: number = 0; col < props.data.getFieldSize(); ++col) {
            contextRef.current!.moveTo(col * smallRectRef.current, 0)
            contextRef.current!.lineTo(col * smallRectRef.current, CANVAS_SIDE_SIZE)
        }

        for (let row: number = 0; row < props.data.getFieldSize(); ++row) {
            contextRef.current!.moveTo(0, row * smallRectRef.current)
            contextRef.current!.lineTo(CANVAS_SIDE_SIZE, row * smallRectRef.current)
        }
        contextRef.current!.closePath()
        contextRef.current!.stroke()
    }

    const renderCanvas = (): void => {
        // noinspection JSConstantReassignment
        // @ts-ignore
        smallRectRef["current"] = CANVAS_SIDE_SIZE / props.data.getFieldSize()

        contextRef.current!.fillStyle = CANVAS_DEAD_CELL_COLOR
        contextRef.current!.fillRect(0, 0, CANVAS_SIDE_SIZE, CANVAS_SIDE_SIZE)

        for (let row: number = 0; row < props.data.getFieldSize(); ++row) {
            for (let col: number = 0; col < props.data.getFieldSize(); ++col) {
                props.data.field[row][col] ?
                    (contextRef.current!.fillStyle = CANVAS_ALIVE_CELL_COLOR) :
                    (contextRef.current!.fillStyle = CANVAS_DEAD_CELL_COLOR)

                contextRef.current?.fillRect(row * smallRectRef.current, col * smallRectRef.current,
                    smallRectRef.current, smallRectRef.current)
            }
        }
        props.data.getGridDrawingFlag() && drawGrid()
    }

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!
        canvas.width = canvas.height = CANVAS_SIDE_SIZE
        canvas.style.width = canvas.style.height = `${CANVAS_SIDE_SIZE}px`

        // @ts-ignore
        // noinspection JSConstantReassignment
        contextRef.current = canvas.getContext('2d')!
        props.data.registerRenderingFunction(renderCanvas)
        renderCanvas()
    }, [])

    return (
        <div className={Style.canvasContainer}>
            <canvas ref={canvasRef}
                    className={Style.canvas}
                    onClick={(event): void => {
                        canvasClicked(event, canvasRef.current!, smallRectRef.current!, props.data)
                        renderCanvas()
                    }}/>
        </div>
    )
})