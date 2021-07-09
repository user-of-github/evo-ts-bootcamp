import {BoardCell, CellColor, CellLocation, CellValueType} from '../types/BoardCell'
import {Board} from '../types/Board'
import {START_VALUES, STEP_SIZE, STEPS, RED_COLOR_CELLS} from './boardCreatorConfiguration'
import {Chip} from '../types/Chip'


const fillBoardWithNumberCells = (data: Array<BoardCell>): void => {
    // [1..36]
    START_VALUES.forEach((startValue: number, index: number) => {
        for (let counter = 0; counter < STEPS; ++counter) {
            const newValue: number = startValue + STEP_SIZE * counter
            const newLocation: CellLocation = {
                gridStart: {row: index + 1, col: counter + 1},
                gridEnd: {row: index + 1, col: counter + 1}
            }
            const newBoardCell: BoardCell = {
                color: RED_COLOR_CELLS.has(newValue) ? CellColor.RED : CellColor.BLACK,
                type: CellValueType.EXACT_NUMBER,
                value: newValue,
                location: newLocation,
                chipsPlaced: Array<Chip>()
            }
            data.push(newBoardCell)
        }
    })

    // 0
    data.push({
        color: CellColor.GREEN,
        type: CellValueType.EXACT_NUMBER,
        value: 0,
        location: {
            gridStart: {row: 4, col: 13},
            gridEnd: {row: 6, col: 15}
        },
        chipsPlaced: Array<Chip>()
    })
}

const fillBoardWithOtherCells = (data: Array<BoardCell>): void => {
    data.push({
        color: CellColor.OTHER,
        type: CellValueType.FIRST_TWELVE,
        value: '1 - 12',
        location: {
            gridStart: {row: 4, col: 1},
            gridEnd: {row: 4, col: 5}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.OTHER,
        type: CellValueType.SECOND_TWELVE,
        value: '13 - 24',
        location: {
            gridStart: {row: 4, col: 5},
            gridEnd: {row: 4, col: 9}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.OTHER,
        type: CellValueType.THIRD_TWELVE,
        value: '25 - 36',
        location: {
            gridStart: {row: 4, col: 9},
            gridEnd: {row: 4, col: 13}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.OTHER,
        type: CellValueType.EVEN_ONLY,
        value: 'EVEN',
        location: {
            gridStart: {row: 5, col: 3},
            gridEnd: {row: 5, col: 5}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.OTHER,
        type: CellValueType.ODD_ONLY,
        value: 'ODD',
        location: {
            gridStart: {row: 5, col: 9},
            gridEnd: {row: 5, col: 11}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.RED,
        type: CellValueType.RED_ONLY,
        value: '',
        location: {
            gridStart: {row: 5, col: 5},
            gridEnd: {row: 5, col: 7}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.BLACK,
        type: CellValueType.BLACK_ONLY,
        value: '',
        location: {
            gridStart: {row: 5, col: 7},
            gridEnd: {row: 5, col: 9}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.OTHER,
        type: CellValueType.FIRST_2_TO_1,
        value: '2 : 1',
        location: {
            gridStart: {row: 1, col: 13},
            gridEnd: {row: 2, col: 15}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.OTHER,
        type: CellValueType.SECOND_2_TO_1,
        value: '2 : 1',
        location: {
            gridStart: {row: 2, col: 13},
            gridEnd: {row: 3, col: 15}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.OTHER,
        type: CellValueType.THIRD_2_TO_1,
        value: '2 : 1',
        location: {
            gridStart: {row: 3, col: 13},
            gridEnd: {row: 4, col: 15}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.OTHER,
        type: CellValueType.FIRST_HALF,
        value: '1 - 18',
        location: {
            gridStart: {row: 5, col: 1},
            gridEnd: {row: 5, col: 3}
        },
        chipsPlaced: Array<Chip>()
    })

    data.push({
        color: CellColor.OTHER,
        type: CellValueType.SECOND_HALF,
        value: '19 - 36',
        location: {
            gridStart: {row: 5, col: 11},
            gridEnd: {row: 5, col: 13}
        },
        chipsPlaced: Array<Chip>()
    })
}


export const createBoardForBets = (): Board => {
    const newCells: Array<BoardCell> = Array<BoardCell>()

    fillBoardWithNumberCells(newCells)
    fillBoardWithOtherCells(newCells)

    return {
        activeForBets: true,
        cells: newCells
    }
}