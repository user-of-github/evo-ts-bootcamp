import {BoardCell, CellColor, CellValueType} from '../../../../types/BoardCell'
import {MainGameState} from '../../../../types/MainGameState'
import Style from './SingleBoardCell.module.css'

export const computeMouseOver = (cellHovered: BoardCell, mainState: MainGameState): void => {
    if (cellHovered.type === CellValueType.RED_ONLY || cellHovered.type === CellValueType.BLACK_ONLY ||
        cellHovered.type === CellValueType.EVEN_ONLY || cellHovered.type === CellValueType.ODD_ONLY ||
        cellHovered.type === CellValueType.FIRST_TWELVE || cellHovered.type === CellValueType.SECOND_TWELVE ||
        cellHovered.type === CellValueType.THIRD_TWELVE || cellHovered.type === CellValueType.FIRST_2_TO_1 ||
        cellHovered.type === CellValueType.SECOND_2_TO_1 || cellHovered.type === CellValueType.THIRD_2_TO_1 ||
        cellHovered.type === CellValueType.FIRST_HALF || cellHovered.type === CellValueType.SECOND_HALF)
        mainState.currentlyHighlightedCells = cellHovered.type
}

export const getClassesString = (cell: BoardCell, mainState: MainGameState): string => {
    let response: string = Style.cell + ' '

    switch (cell.color) {
        case CellColor.BLACK:
            response += Style.black
            break
        case CellColor.GREEN:
            response += Style.green
            break
        case CellColor.RED:
            response += Style.red
            break
        default:
            response += Style.other
            break
    }

    response += ' '

    switch (mainState.currentlyHighlightedCells) {
        case CellValueType.EVEN_ONLY:
            response += cell.type === CellValueType.EXACT_NUMBER && (cell.value as number) % 2 === 0 &&
            (cell.value as number) !== 0
                ? Style.highlighted
                : ''
            break
        case CellValueType.ODD_ONLY:
            response += cell.type === CellValueType.EXACT_NUMBER && (cell.value as number) % 2 !== 0
                ? Style.highlighted
                : ''
            break
        case CellValueType.RED_ONLY:
            response += cell.type === CellValueType.EXACT_NUMBER && cell.color == CellColor.RED
                ? Style.highlighted
                : ''
            break
        case CellValueType.BLACK_ONLY:
            response += cell.type === CellValueType.EXACT_NUMBER && cell.color == CellColor.BLACK
                ? Style.highlighted
                : ''
            break
        case CellValueType.FIRST_TWELVE:
            response += cell.type === CellValueType.EXACT_NUMBER && cell.value >= 1 && cell.value <= 12
                ? Style.highlighted
                : ''
            break
        case CellValueType.SECOND_TWELVE:
            response += cell.type === CellValueType.EXACT_NUMBER && cell.value >= 13 && cell.value <= 24
                ? Style.highlighted
                : ''
            break
        case CellValueType.THIRD_TWELVE:
            response += cell.type === CellValueType.EXACT_NUMBER && cell.value >= 25 && cell.value <= 36
                ? Style.highlighted
                : ''
            break
        case CellValueType.FIRST_HALF:
            response += cell.type === CellValueType.EXACT_NUMBER && cell.value >= 1 && cell.value <= 18
                ? Style.highlighted
                : ''
            break
        case CellValueType.SECOND_HALF:
            response += cell.type === CellValueType.EXACT_NUMBER && cell.value > 18
                ? Style.highlighted
                : ''
            break
        case CellValueType.FIRST_2_TO_1:
            response += cell.type === CellValueType.EXACT_NUMBER && cell.value !== 0 && (cell.value as number) % 3 === 0
                ? Style.highlighted
                : ''
            break
        case CellValueType.SECOND_2_TO_1:
            response +=
                cell.type === CellValueType.EXACT_NUMBER && cell.value !== 0 && ((cell.value as number) - 2) % 3 === 0
                    ? Style.highlighted
                    : ''
            break
        case CellValueType.THIRD_2_TO_1:
            response +=
                cell.type === CellValueType.EXACT_NUMBER && cell.value !== 0 && ((cell.value as number) - 1) % 3 === 0
                    ? Style.highlighted
                    : ''
            break
    }
    return response
}