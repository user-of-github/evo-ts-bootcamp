import {Chip} from './Chip'


export enum SpotColor {
    RED = 'RED',
    BLACK = 'BLACK',
    GREEN = 'GREEN',
    OTHER = 'OTHER'
}

export enum SpotValueType {
    EXACT_NUMBER = 'NUMBER',
    FIRST_TWELVE = 'FIRST_TWELVE',
    SECOND_TWELVE = 'SECOND_TWELVE',
    THIRD_TWELVE = 'THIRD_TWELVE',
    RED_ONLY = 'RED_ONLY',
    BLACK_ONLY = 'BLACK_ONLY',
    ODD_ONLY = 'ODD_ONLY',
    EVEN_ONLY = 'EVEN_ONLY',
    FIRST_2_TO_1 = 'FIRST_2_TO_1',
    SECOND_2_TO_1 = 'SECOND_2_TO_1',
    THIRD_2_TO_1 = 'THIRD_2_TO_1',
    FIRST_HALF = 'FIRST_HALF',
    SECOND_HALF = 'SECOND_HALF'
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