import {Chip} from './Chip'


export enum SpotColor {
    RED = 'RED',
    BLACK = 'BLACK',
    GREEN = 'GREEN',
    OTHER = 'OTHER'
}

export enum SpotValueType {
    EXACT_NUMBER = 'NUMBER',
    FIRST_TWELVE = 'FIRST TWELVE',
    SECOND_TWELVE = 'SECOND TWELVE',
    THIRD_TWELVE = 'THIRD TWELVE',
    RED_ONLY = 'RED ONLY',
    BLACK_ONLY = 'BLACK ONLY',
    ODD_ONLY = 'ODD ONLY',
    EVEN_ONLY = 'EVEN ONLY',
    FIRST_2_TO_1 = 'FIRST 2 TO 1',
    SECOND_2_TO_1 = 'SECOND 2 TO 1',
    THIRD_2_TO_1 = 'THIRD 2 TO 1',
    FIRST_HALF = 'FIRST HALF',
    SECOND_HALF = 'SECOND HALF'
}

interface PointCoordinate {
    row: number
    col: number
}

export interface SpotLocation {
    gridStart: PointCoordinate
    gridEnd: PointCoordinate
}

export interface Spot {
    color: SpotColor
    type: SpotValueType
    value: number | string
    location: SpotLocation
    chipsPlaced: Array<Chip>
    totalBet: number
}

export interface RouletteSpot {
    color: SpotColor
    value: number
}