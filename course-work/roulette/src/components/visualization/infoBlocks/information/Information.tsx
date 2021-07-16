import {MainGameState} from '../../../../types/MainGameState'

import StyleBase from '../InfoBlocks.module.css'
import Style from './Information.module.css'


export const Information = (): JSX.Element => (
    <div className={`${StyleBase.containerBase} ${Style.container}`}>
        <h1 className={StyleBase.title}>Information</h1>
        <div className={`${StyleBase.tableBase} ${Style.table}`}>
            {
                Array.from(MainGameState.COEFFICIENTS).map(value => (
                    <div className={Style.item}>
                        <span className={Style.itemSpan}>{value[0]}</span>
                        <span className={`${Style.itemSpan} ${Style.coefficient}`}>{value[1]}</span>
                    </div>
                ))
            }
        </div>
    </div>
)