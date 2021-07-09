import {CellValueType} from './BoardCell'

export type HighlightedCellsOnHover =
    CellValueType.EVEN_ONLY
    | CellValueType.ODD_ONLY
    | CellValueType.BLACK_ONLY
    | CellValueType.RED_ONLY
    | CellValueType.FIRST_TWELVE
    | CellValueType.SECOND_TWELVE
    | CellValueType.THIRD_TWELVE
    | CellValueType.FIRST_HALF
    | CellValueType.SECOND_HALF
    | CellValueType.FIRST_2_TO_1
    | CellValueType.SECOND_2_TO_1
    | CellValueType.THIRD_2_TO_1