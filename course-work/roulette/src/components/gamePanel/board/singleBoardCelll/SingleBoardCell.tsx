import {observer} from 'mobx-react-lite'
import {BoardCell, CellColor} from '../../../../types/BoardCell'
import Style from './SingleBoardCell.module.css'
import {Chip} from '../../../../types/Chip'
import {MainGameState} from '../../../../types/MainGameState'
import {ChipInStack} from './сhipInStack/ChipInStack'


export const SingleBoardCell = observer((props: { cell: BoardCell, state: MainGameState }): JSX.Element => (
    <div className={`${Style.cell} ${props.cell.color === CellColor.RED
        ?
        Style.red
        :
        props.cell.color === CellColor.BLACK
            ?
            Style.black
            :
            props.cell.color === CellColor.GREEN
                ?
                Style.green
                :
                Style.other}`}
         style={{
             gridColumnStart: props.cell.location.gridStart.col,
             gridColumnEnd: props.cell.location.gridEnd.col,
             gridRowStart: props.cell.location.gridStart.row,
             gridRowEnd: props.cell.location.gridEnd.row
         }}
         onClick={() => props.state.putChipOnCell(props.cell)}>
        {props.cell.value}
        {
            props.cell.chipsPlaced.map((item: Chip, index: number) =>
                <ChipInStack chip={item}
                             index={index}
                             key={index}/>
            )
        }
    </div>
))