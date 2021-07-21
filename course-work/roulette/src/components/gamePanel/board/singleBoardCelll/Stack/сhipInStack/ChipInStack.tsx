import {observer} from 'mobx-react-lite'

import {Chip} from '../../../../../../types/Chip'
import {chipsImagesSVGLinks} from '../../../../../../utilities/chipsImagesLinks'
import {
    SCATTER_OF_ROTATION_OF_CHIPS_ON_BOARD,
    SCATTER_OF_POSITION_OF_CHIPS_ON_BOARD,
    DISTANCE_BETWEEN_CHIPS_IN_STACK
} from '../../../../../../utilities/configuration'

import Style from './ChipInStack.module.css'


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