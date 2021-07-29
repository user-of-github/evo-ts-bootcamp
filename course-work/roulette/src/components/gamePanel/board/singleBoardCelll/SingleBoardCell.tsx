import {observer} from 'mobx-react-lite'

import {Spot} from '../../../../types/Spot'
import {MainGameState} from '../../../../types/MainGameState'
import {chipPutOnSpot, computeMouseOver, getClassesString} from './singleBoardCellUtilities'
import {Sound} from '../../../../types/Sound'

import {Stack} from './Stack/Stack'


export const SingleBoardCell = observer((props: { cell: Spot, state: MainGameState }): JSX.Element => (
    <div className={getClassesString(props.cell, props.state)}
         style={{
             gridColumnStart: props.cell.location.gridStart.col,
             gridColumnEnd: props.cell.location.gridEnd.col,
             gridRowStart: props.cell.location.gridStart.row,
             gridRowEnd: props.cell.location.gridEnd.row
         }}
         onClick={() => chipPutOnSpot(props.state, props.cell)}
         onMouseOver={() => {
             Sound.playDzen()
             computeMouseOver(props.cell, props.state)
         }}
         onMouseLeave={() => props.state.currentlyHighlightedCells = null}>

        {props.cell.value}

        <Stack chipsPlaced={props.cell.chipsPlaced}/>
    </div>
))