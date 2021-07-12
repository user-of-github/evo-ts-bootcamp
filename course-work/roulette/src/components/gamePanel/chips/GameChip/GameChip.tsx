import {observer} from 'mobx-react-lite'

import {chipsImagesSVGLinks} from '../../../../utilities/chipsImagesLinks'
import {Chip} from '../../../../types/Chip'
import {MainGameState} from '../../../../types/MainGameState'

import Style from './GameChip.module.css'


export const GameChip = observer((props: { item: Chip, state: MainGameState, index: number }): JSX.Element => (
    <div className={`${Style.svgChipContainer} ${props.item.active ? Style.selected : ''}`}
         onClick={() => props.state.reselectChip(props.index)}>
        <img src={chipsImagesSVGLinks[props.index]} alt="chip"/>
    </div>
))