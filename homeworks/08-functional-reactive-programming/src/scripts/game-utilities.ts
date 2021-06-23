import {BlockType, GameState, Point} from './types'
import {MAXIMUM_WINDOWS_IN_LINE, NUMBER_OF_BLOCKS} from './configuration'


export const generateNewField = (): { field: BlockType[][], coordinates: Point[] } => {
    const field: BlockType[][] = []
    const coords: Point[] = []
    for (let row: number = 0; row < NUMBER_OF_BLOCKS; ++row) {
        const newCol: BlockType[] = Array<BlockType>(10)
        const howManyGenerate: number = Math.round(MAXIMUM_WINDOWS_IN_LINE * Math.random())

        const alreadyOccupied: Set<number> = new Set<number>()

        let counter = 0
        while (counter < howManyGenerate) {
            const newVariant: number = Math.floor(NUMBER_OF_BLOCKS * Math.random())

            if (alreadyOccupied.has(newVariant))
                continue

            alreadyOccupied.add(newVariant)
            ++counter
        }

        for (let col: number = 0; col < NUMBER_OF_BLOCKS; ++col)
            newCol[col] = BlockType.WALL

        alreadyOccupied.forEach((col: number) => {
            newCol[col] = BlockType.WINDOW
            coords.push({row: row, column: col})
        })

        field.push(newCol)
    }

    return {
        coordinates: coords,
        field: field
    }
}

export const changeCatPosition = (state: GameState): void => {
    let index: number = Math.floor(Math.random() * state.windowsCoordinates.length)

    while (index >= state.windowsCoordinates.length && state.catPosition.row === state.windowsCoordinates[index].row &&
    state.catPosition.column === state.windowsCoordinates[index].column) {
        index = Math.round(Math.random() * state.windowsCoordinates.length)
    }

    state.catPosition.row = state.windowsCoordinates[index].row
    state.catPosition.column = state.windowsCoordinates[index].column
}