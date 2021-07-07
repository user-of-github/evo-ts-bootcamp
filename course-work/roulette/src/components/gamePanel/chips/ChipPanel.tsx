import Style from './ChipPanel.module.css'
import {observer} from 'mobx-react-lite'
import {MainGameState} from '../../../types/MainGameState'
import {Chip} from '../../../types/Chip'
import {chipsImagesSVGLinks} from './chipsImagesLinks'

export const Chips = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.wrapper} key={'chipsWrapper2021'}>
        <div className={Style.container} key={'chipsContainer2021'}>
            {
                props.data.chipsSet.map((item: Chip, index: number) => (
                    <div key={`chip${index}`}
                        className={`${Style.svgChipContainer} ${item.active ? Style.selected : ''}`}
                         onClick={() => props.data.reselectChip(index)}>
                        <img src={chipsImagesSVGLinks[index]} alt="chip"/>
                    </div>
                ))
            }
        </div>
    </div>
))