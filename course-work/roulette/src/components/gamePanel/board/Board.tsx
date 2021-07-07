import Style from './Board.module.css'
import {observer} from 'mobx-react-lite'
import {MainGameState} from '../../../types/MainGameState'
import {BoardCell} from '../../../types/BoardCell'
import {chipsImagesPNGLinks} from '../chips/chipsImagesLinks'
import {SingleBoardCell} from './singleBoardCelll/SingleBoardCell'


export const Board = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        <div className={Style.board} style={{cursor: `url(${chipsImagesPNGLinks[props.data.chipActiveIndex]}), auto`}}>
            {
                props.data.board.cells.map((cell: BoardCell, counter: number) =>
                    <SingleBoardCell cell={cell}
                                     state={props.data}
                                     key={counter}/>
                )
            }
        </div>
    </div>
))