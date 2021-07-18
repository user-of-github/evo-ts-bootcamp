import {observer} from 'mobx-react-lite'

import {Spot, SpotValueType} from '../../../../types/Spot'
import {MainGameState} from '../../../../types/MainGameState'
import {chipPutOnSpot, computeMouseOver, getClassesString} from './singleBoardCellUtilities'
import {Stack} from './Stack/Stack'
import {Sound} from "../../../../types/Sound";

import Style from './SingleBoardCell.module.css'

export const SingleBoardCell = observer((props: { cell: Spot, state: MainGameState }): JSX.Element => (
    <div className={`${getClassesString(props.cell, props.state)} ${props.cell.type === SpotValueType.EXACT_NUMBER &&
    props.state.resultsHistory.length !== 0 &&
    props.cell.value === props.state.resultsHistory[props.state.resultsHistory.length - 1].result.value &&
    props.state.toHighlightLastResult ? Style.currentlyHighlightedLastResult : ''}`}
         style={{
             gridColumnStart: props.cell.location.gridStart.col,
             gridColumnEnd: props.cell.location.gridEnd.col,
             gridRowStart: props.cell.location.gridStart.row,
             gridRowEnd: props.cell.location.gridEnd.row
         }}
         onClick={() => chipPutOnSpot(props.state, props.cell)}
         onMouseOver={() => {
             Sound.playDzen(props.state.voiceTurnedOn)
             computeMouseOver(props.cell, props.state)
         }}
         onMouseLeave={() => props.state.currentlyHighlightedCells = null}>

        {props.cell.value}

        <Stack chipsPlaced={props.cell.chipsPlaced}/>
    </div>
))