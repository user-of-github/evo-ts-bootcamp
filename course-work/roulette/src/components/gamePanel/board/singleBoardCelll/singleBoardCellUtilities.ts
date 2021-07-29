import {Spot, SpotColor, SpotValueType} from '../../../../types/Spot'
import {MainGameState} from '../../../../types/MainGameState'
import {Sound} from '../../../../types/Sound'
import {NOT_ENOUGH_MONEY_ERROR} from '../../../../utilities/configuration'

import Style from './SingleBoardCell.module.css'


export const chipPutOnSpot = (state: MainGameState, cell: Spot): void => {
    if (state.chipsSet[state.chipActiveIndex].chip > state.userBalance) {
        Sound.playNotEnoughMoney()
        state.settingsState.modalsState.modalWarningText = NOT_ENOUGH_MONEY_ERROR
        state.settingsState.modalsState.modalWarningActive = true
        window.setTimeout(() => state.settingsState.modalsState.modalWarningActive = false, 2000)
    } else {
        Sound.playAddChip()
        state.putChipOnCell(cell)
    }
}

export const computeMouseOver = (cellHovered: Spot, mainState: MainGameState): void => {
    if (cellHovered.type === SpotValueType.RED_ONLY || cellHovered.type === SpotValueType.BLACK_ONLY ||
        cellHovered.type === SpotValueType.EVEN_ONLY || cellHovered.type === SpotValueType.ODD_ONLY ||
        cellHovered.type === SpotValueType.FIRST_TWELVE || cellHovered.type === SpotValueType.SECOND_TWELVE ||
        cellHovered.type === SpotValueType.THIRD_TWELVE || cellHovered.type === SpotValueType.FIRST_2_TO_1 ||
        cellHovered.type === SpotValueType.SECOND_2_TO_1 || cellHovered.type === SpotValueType.THIRD_2_TO_1 ||
        cellHovered.type === SpotValueType.FIRST_HALF || cellHovered.type === SpotValueType.SECOND_HALF) {

        mainState.currentlyHighlightedCells = cellHovered.type
    }
}

export const getClassesString = (cell: Spot, mainState: MainGameState): string => {
    let response: string = Style.cell + ' '

    switch (cell.color) {
        case SpotColor.BLACK:
            response += Style.black
            break
        case SpotColor.GREEN:
            response += Style.green
            break
        case SpotColor.RED:
            response += Style.red
            break
        default:
            response += Style.other
            break
    }

    response += ' '

    switch (mainState.currentlyHighlightedCells) {
        case SpotValueType.EVEN_ONLY:
            response += cell.type === SpotValueType.EXACT_NUMBER && (cell.value as number) % 2 === 0 &&
            (cell.value as number) !== 0
                ? Style.highlighted
                : ''
            break
        case SpotValueType.ODD_ONLY:
            response += cell.type === SpotValueType.EXACT_NUMBER && (cell.value as number) % 2 !== 0
                ? Style.highlighted
                : ''
            break
        case SpotValueType.RED_ONLY:
            response += cell.type === SpotValueType.EXACT_NUMBER && cell.color === SpotColor.RED
                ? Style.highlighted
                : ''
            break
        case SpotValueType.BLACK_ONLY:
            response += cell.type === SpotValueType.EXACT_NUMBER && cell.color === SpotColor.BLACK
                ? Style.highlighted
                : ''
            break
        case SpotValueType.FIRST_TWELVE:
            response += cell.type === SpotValueType.EXACT_NUMBER && cell.value >= 1 && cell.value <= 12
                ? Style.highlighted
                : ''
            break
        case SpotValueType.SECOND_TWELVE:
            response += cell.type === SpotValueType.EXACT_NUMBER && cell.value >= 13 && cell.value <= 24
                ? Style.highlighted
                : ''
            break
        case SpotValueType.THIRD_TWELVE:
            response += cell.type === SpotValueType.EXACT_NUMBER && cell.value >= 25 && cell.value <= 36
                ? Style.highlighted
                : ''
            break
        case SpotValueType.FIRST_HALF:
            response += cell.type === SpotValueType.EXACT_NUMBER && cell.value >= 1 && cell.value <= 18
                ? Style.highlighted
                : ''
            break
        case SpotValueType.SECOND_HALF:
            response += cell.type === SpotValueType.EXACT_NUMBER && cell.value > 18
                ? Style.highlighted
                : ''
            break
        case SpotValueType.FIRST_2_TO_1:
            response += cell.type === SpotValueType.EXACT_NUMBER && cell.value !== 0 && (cell.value as number) % 3 === 0
                ? Style.highlighted
                : ''
            break
        case SpotValueType.SECOND_2_TO_1:
            response +=
                cell.type === SpotValueType.EXACT_NUMBER && cell.value !== 0 && ((cell.value as number) - 2) % 3 === 0
                    ? Style.highlighted
                    : ''
            break
        case SpotValueType.THIRD_2_TO_1:
            response +=
                cell.type === SpotValueType.EXACT_NUMBER && cell.value !== 0 && ((cell.value as number) - 1) % 3 === 0
                    ? Style.highlighted
                    : ''
            break
    }

    if (cell.type === SpotValueType.EXACT_NUMBER && mainState.resultsHistory.length !== 0 && cell.value ===
        mainState.resultsHistory[mainState.resultsHistory.length - 1].result.value &&
        mainState.settingsState.toHighlightLastResult) {
        response += (' ' + Style.currentlyHighlightedLastResult)
    }

    return response
}