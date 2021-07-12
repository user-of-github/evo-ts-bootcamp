import {SpotValueType} from './Spot'

export type HighlightedCellsOnHover =
    SpotValueType.EVEN_ONLY
    | SpotValueType.ODD_ONLY
    | SpotValueType.BLACK_ONLY
    | SpotValueType.RED_ONLY
    | SpotValueType.FIRST_TWELVE
    | SpotValueType.SECOND_TWELVE
    | SpotValueType.THIRD_TWELVE
    | SpotValueType.FIRST_HALF
    | SpotValueType.SECOND_HALF
    | SpotValueType.FIRST_2_TO_1
    | SpotValueType.SECOND_2_TO_1
    | SpotValueType.THIRD_2_TO_1