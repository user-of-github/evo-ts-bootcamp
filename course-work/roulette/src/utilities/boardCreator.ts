import {Spot, SpotColor, SpotLocation, SpotValueType} from '../types/Spot'
import {Board} from '../types/Board'
import {START_VALUES, STEP_SIZE, STEPS, RED_COLOR_CELLS} from './boardCreatorConfiguration'
import {Chip} from '../types/Chip'


const fillBoardWithNumberCells = (data: Array<Spot>): void => {
    // [1..36]
    START_VALUES.forEach((startValue: number, index: number) => {
        for (let counter = 0; counter < STEPS; ++counter) {
            const newValue: number = startValue + STEP_SIZE * counter
            const newLocation: SpotLocation = {
                gridStart: {row: index + 1, col: counter + 1},
                gridEnd: {row: index + 1, col: counter + 1}
            }
            const newBoardCell: Spot = {
                color: RED_COLOR_CELLS.has(newValue) ? SpotColor.RED : SpotColor.BLACK,
                type: SpotValueType.EXACT_NUMBER,
                value: newValue,
                location: newLocation,
                chipsPlaced: Array<Chip>(),
                totalBet: 0
            }
            data.push(newBoardCell)
        }
    })

    // 0
    data.push({
        color: SpotColor.GREEN,
        type: SpotValueType.EXACT_NUMBER,
        value: 0,
        location: {
            gridStart: {row: 4, col: 13},
            gridEnd: {row: 6, col: 15}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })
}

const fillBoardWithOtherCells = (data: Array<Spot>): void => {
    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.FIRST_TWELVE,
        value: '1 - 12',
        location: {
            gridStart: {row: 4, col: 1},
            gridEnd: {row: 4, col: 5}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.SECOND_TWELVE,
        value: '13 - 24',
        location: {
            gridStart: {row: 4, col: 5},
            gridEnd: {row: 4, col: 9}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.THIRD_TWELVE,
        value: '25 - 36',
        location: {
            gridStart: {row: 4, col: 9},
            gridEnd: {row: 4, col: 13}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.EVEN_ONLY,
        value: 'EVEN',
        location: {
            gridStart: {row: 5, col: 3},
            gridEnd: {row: 5, col: 5}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.ODD_ONLY,
        value: 'ODD',
        location: {
            gridStart: {row: 5, col: 9},
            gridEnd: {row: 5, col: 11}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.RED,
        type: SpotValueType.RED_ONLY,
        value: '',
        location: {
            gridStart: {row: 5, col: 5},
            gridEnd: {row: 5, col: 7}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.BLACK,
        type: SpotValueType.BLACK_ONLY,
        value: '',
        location: {
            gridStart: {row: 5, col: 7},
            gridEnd: {row: 5, col: 9}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.FIRST_2_TO_1,
        value: '2 : 1',
        location: {
            gridStart: {row: 1, col: 13},
            gridEnd: {row: 2, col: 15}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.SECOND_2_TO_1,
        value: '2 : 1',
        location: {
            gridStart: {row: 2, col: 13},
            gridEnd: {row: 3, col: 15}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.THIRD_2_TO_1,
        value: '2 : 1',
        location: {
            gridStart: {row: 3, col: 13},
            gridEnd: {row: 4, col: 15}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.FIRST_HALF,
        value: '1 - 18',
        location: {
            gridStart: {row: 5, col: 1},
            gridEnd: {row: 5, col: 3}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })

    data.push({
        color: SpotColor.OTHER,
        type: SpotValueType.SECOND_HALF,
        value: '19 - 36',
        location: {
            gridStart: {row: 5, col: 11},
            gridEnd: {row: 5, col: 13}
        },
        chipsPlaced: Array<Chip>(),
        totalBet: 0
    })
}


export const createBoardForBets = (): Board => {
    const newCells: Array<Spot> = Array<Spot>()

    fillBoardWithNumberCells(newCells)
    fillBoardWithOtherCells(newCells)

    return {
        activeForBets: true,
        spots: newCells
    }
}