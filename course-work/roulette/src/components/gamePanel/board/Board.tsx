import Style from './Board.module.css'
import {observer} from 'mobx-react-lite'
import {MainGameState} from '../../../types/MainGameState'
import {BoardCell, CellColor} from '../../../types/BoardCell'
import {chipsImagesLinks} from '../chips/chipsImagesLinks'
import {Chip} from '../../../types/Chip'

export const Board = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        {
            props.data.board.cells.map((cell: BoardCell, counter: number) => (
                <div key={`boardCell${counter}`}
                     className={`${Style.cell} ${cell.color === CellColor.RED
                         ?
                         Style.red
                         :
                         cell.color === CellColor.BLACK
                             ?
                             Style.black
                             :
                             cell.color === CellColor.GREEN
                                 ?
                                 Style.green
                                 :
                                 Style.other}`}
                     style={{
                         gridColumnStart: cell.location.gridStart.col,
                         gridColumnEnd: cell.location.gridEnd.col,
                         gridRowStart: cell.location.gridStart.row,
                         gridRowEnd: cell.location.gridEnd.row
                     }}
                     onClick={() => props.data.putChipOnCell(cell)}>
                    {cell.value}
                    {
                        cell.chipsPlaced.map((item: Chip, index2: number) => (
                            <div key={`boardCell${counter}chipPlaced${index2}`}
                                className={Style.chipInCell}
                                style={{transform: `translateX(${Math.random() * -10}px) translateY(${Math.random() * 10}px)`}}>
                                <img className={Style.chipInCellImage} src={chipsImagesLinks[item.index]} alt={chipsImagesLinks[item.index]}/>
                            </div>
                        ))
                    }
                </div>
            ))
        }
    </div>
))