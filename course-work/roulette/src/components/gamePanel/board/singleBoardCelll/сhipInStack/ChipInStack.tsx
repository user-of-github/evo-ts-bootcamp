import {observer} from 'mobx-react-lite'

import {Chip} from '../../../../../types/Chip'
import {chipsImagesSVGLinks} from '../../../../../utilities/chipsImagesLinks'

import Style from './ChipInStack.module.css'


const SCATTER_OF_POSITION_OF_CHIPS_ON_BOARD: number = 7
const SCATTER_OF_ROTATION_OF_CHIPS_ON_BOARD: number = 90
const DISTANCE_BETWEEN_CHIPS_IN_STACK: number = 5

export const ChipInStack = observer((props: { chip: Chip, index: number }): JSX.Element => (
    <div className={Style.chipInCell}
         style={{
             transform: `
             rotate(${-SCATTER_OF_ROTATION_OF_CHIPS_ON_BOARD / 2 +
             SCATTER_OF_ROTATION_OF_CHIPS_ON_BOARD * Math.random()}deg) 
             translateX(${Math.random() * -SCATTER_OF_POSITION_OF_CHIPS_ON_BOARD}px) 
             translateY(${Math.random() * SCATTER_OF_POSITION_OF_CHIPS_ON_BOARD}px) 
             translateZ(${props.index * DISTANCE_BETWEEN_CHIPS_IN_STACK}px)
             `
         }}>
        <img className={Style.chipInCellImage}
             src={chipsImagesSVGLinks[props.chip.index]}
             alt={chipsImagesSVGLinks[props.chip.index]}/>
    </div>
))