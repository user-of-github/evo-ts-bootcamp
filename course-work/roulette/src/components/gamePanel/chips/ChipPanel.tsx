import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../types/MainGameState'
import {Chip} from '../../../types/Chip'
import {GameChip} from './GameChip/GameChip'

import Style from './ChipPanel.module.css'


export const Chips = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.wrapper} key={'chipsWrapper2021'}>
        <div className={Style.container} key={'chipsContainer2021'}>
            <div className={Style.tablet}>
                {
                    props.data.chipsSet.map((item: Chip, index: number) =>
                        <GameChip item={item}
                                  index={index}
                                  state={props.data}
                                  key={index}/>
                    )
                }
            </div>
        </div>
    </div>
))