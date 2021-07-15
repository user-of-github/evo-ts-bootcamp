import {observer} from 'mobx-react-lite'

import {Spot} from '../../../../types/Spot'
import {Chip} from '../../../../types/Chip'
import {MainGameState} from '../../../../types/MainGameState'
import {computeMouseOver, getClassesString} from './singleBoardCellUtilities'
import {addChipSound, notEnoughMoneySound} from '../../../../utilities/playSound'

import {ChipInStack} from './сhipInStack/ChipInStack'


const chipPutOnSpot = (state: MainGameState, cell: Spot): void => {
    addChipSound.play()
    if (state.chipsSet[state.chipActiveIndex].chip > state.userBalance) {
        notEnoughMoneySound.play()
        state.modalsState.modalWarningText = 'Not enough money on your balance !'
        state.modalsState.modalWarningActive = true
        window.setTimeout(() => state.modalsState.modalWarningActive = false, 2000)
    } else {
        state.putChipOnCell(cell)
    }
}

export const SingleBoardCell = observer((props: { cell: Spot, state: MainGameState }): JSX.Element => (
    <div className={getClassesString(props.cell, props.state)}
         style={{
             gridColumnStart: props.cell.location.gridStart.col,
             gridColumnEnd: props.cell.location.gridEnd.col,
             gridRowStart: props.cell.location.gridStart.row,
             gridRowEnd: props.cell.location.gridEnd.row
         }}
         onClick={() => chipPutOnSpot(props.state, props.cell)}
         onMouseOver={() => computeMouseOver(props.cell, props.state)}
         onMouseLeave={() => props.state.currentlyHighlightedCells = null}>
        {props.cell.value}
        {
            props.cell.chipsPlaced.map((item: Chip, index: number) =>
                <ChipInStack chip={item} index={index}/>)
        }
    </div>
))