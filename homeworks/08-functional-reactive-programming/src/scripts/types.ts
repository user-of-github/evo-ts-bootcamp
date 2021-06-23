export const enum BlockType {
    WALL = 'WALL',
    WINDOW = 'WINDOW'
}

export interface Point {
    row: number
    column: number
}

export interface GameState {
    clicked: number
    fed: number
    catPosition: Point
    windowsCoordinates: Array<Point>,
    field: BlockType[][]
}


export const state: GameState = {
    clicked: 0,
    fed: 0,
    catPosition: {
        row: 0,
        column: 0
    },
    windowsCoordinates: Array<Point>(),
    field: []
}