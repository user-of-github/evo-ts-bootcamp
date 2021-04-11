import React from 'react'
import style from './field.module.css'

const ONE_POINT_OF_HEIGHT: number = 10,
    ROUNDING_UP: number = 7,
    MARGIN_RIGHT: number = 2,
    PADDING_VERTICAL: number = 5

let RECTANGLE_WIDTH: number = 20
const MAX_RECTANGLE_WIDTH: number = 50

const Reactangles = (numbers: number[], fullHeight: number): JSX.Element[] => {
    let xPosition: number = 1

    return numbers.map((num) => {
        xPosition += (RECTANGLE_WIDTH + MARGIN_RIGHT)
        return (
            <rect x={xPosition - RECTANGLE_WIDTH}
                  y={fullHeight - ONE_POINT_OF_HEIGHT * num - PADDING_VERTICAL}
                  width={RECTANGLE_WIDTH}
                  height={ONE_POINT_OF_HEIGHT * num}
                  rx={ROUNDING_UP}
                  ry={ROUNDING_UP}/>
        )
    })
}

type Params = {
    numbers: number[],
    arraySize: number,
    maximumElement: number
}

export const Field = ({numbers, arraySize, maximumElement}: Params): JSX.Element => {
    let FULL_SVG_HEIGHT: number = (maximumElement * ONE_POINT_OF_HEIGHT) + (2 * PADDING_VERTICAL),
        FULL_SVG_WIDTH: number = document.documentElement.clientWidth * 0.5

    RECTANGLE_WIDTH = FULL_SVG_WIDTH / arraySize - MARGIN_RIGHT
    if (RECTANGLE_WIDTH > MAX_RECTANGLE_WIDTH) {
        RECTANGLE_WIDTH = MAX_RECTANGLE_WIDTH
        FULL_SVG_WIDTH = (RECTANGLE_WIDTH + MARGIN_RIGHT) * arraySize
    }

    return (
        <div className={style.visualizationWrapper}>
            <svg className={style.visualization}
                 style={
                     {
                         width: FULL_SVG_WIDTH + 'px',
                         height: FULL_SVG_HEIGHT + 'px'
                     }
                 }>
                {Reactangles(numbers, FULL_SVG_HEIGHT)}
            </svg>
        </div>
    )
}

