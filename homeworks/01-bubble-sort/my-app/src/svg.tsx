import React from 'react'

const RECTANGLE_WIDTH: number = 30
const NUMBER_OF_ELEMENTS: number = 20
const ONE_POINT_OF_HEIGHT: number = 12
const MAXIMUM_ELEMENT: number = 30

const FULL_SVG_WIDTH: number = RECTANGLE_WIDTH * NUMBER_OF_ELEMENTS
const FULL_SVG_HEIGHT: number = MAXIMUM_ELEMENT * ONE_POINT_OF_HEIGHT

const ROUNDING_UP: number = 5

const GenerateRandomArray = (numberOfElements: number, maxElement: number): number[] => {
    const response: number[] = []
    for (let counter: number = 1; counter <= numberOfElements; ++counter)
        response.push(Math.floor(Math.random() * maxElement) + 1)

    return response
}

let numbers: number[] = GenerateRandomArray(NUMBER_OF_ELEMENTS, MAXIMUM_ELEMENT)

const Reactangles = (): JSX.Element[] => {
    let xPosition: number = 1
    return numbers.map((num) => {
        xPosition += RECTANGLE_WIDTH
        return (
            <rect x={xPosition - RECTANGLE_WIDTH}
                  y={FULL_SVG_HEIGHT - ONE_POINT_OF_HEIGHT * num}
                  width={RECTANGLE_WIDTH}
                  height={ONE_POINT_OF_HEIGHT * num}
                  rx={ROUNDING_UP}
                  ry={ROUNDING_UP}/>
        )
    })
}
export const Visualisation: React.FC = () => (
    <svg className="visualization"
         style={{
             width: FULL_SVG_WIDTH + 'px',
             height: MAXIMUM_ELEMENT * ONE_POINT_OF_HEIGHT + 'px'
         }}>
        {Reactangles()}
    </svg>
)

