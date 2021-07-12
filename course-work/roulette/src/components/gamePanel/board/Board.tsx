import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../types/MainGameState'
import {Spot} from '../../../types/Spot'
import {chipsImagesPNGLinks} from '../../../utilities/chipsImagesLinks'
import {BaseGameState} from '../../../types/BaseGameState'

import {SingleBoardCell} from './singleBoardCelll/SingleBoardCell'

import Style from './Board.module.css'


export const Board = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={`${Style.container} ${props.data.currentStage === BaseGameState.ROULETTE_SPINNING ? Style.inactive : ''}`}>
        <div className={Style.board}
             style={{cursor: `url(${chipsImagesPNGLinks[props.data.chipActiveIndex]}), auto`}}>
            {
                props.data.board.spots.map((cell: Spot, counter: number) =>
                    <SingleBoardCell cell={cell}
                                     state={props.data}
                                     key={counter}/>
                )
            }
        </div>
    </div>
))