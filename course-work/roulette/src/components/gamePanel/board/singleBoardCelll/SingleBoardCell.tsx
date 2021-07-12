import {observer} from 'mobx-react-lite'

import {Spot} from '../../../../types/Spot'
import {Chip} from '../../../../types/Chip'
import {MainGameState} from '../../../../types/MainGameState'
import {computeMouseOver, getClassesString} from './singleBoardCellUtilities'

import {ChipInStack} from './сhipInStack/ChipInStack'


export const SingleBoardCell = observer((props: { cell: Spot, state: MainGameState }): JSX.Element => (
    <div className={getClassesString(props.cell, props.state)}
         style={{
             gridColumnStart: props.cell.location.gridStart.col,
             gridColumnEnd: props.cell.location.gridEnd.col,
             gridRowStart: props.cell.location.gridStart.row,
             gridRowEnd: props.cell.location.gridEnd.row
         }}
         onClick={() => props.state.putChipOnCell(props.cell)}
         onMouseOver={() => computeMouseOver(props.cell, props.state)}
         onMouseLeave={() => props.state.currentlyHighlightedCells = null}>
        {props.cell.value}
        {
            props.cell.chipsPlaced.map((item: Chip, index: number) =>
                <ChipInStack chip={item} index={index}/>)
        }
    </div>
))