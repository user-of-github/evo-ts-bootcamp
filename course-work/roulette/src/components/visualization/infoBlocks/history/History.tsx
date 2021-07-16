import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../../types/MainGameState'

import StyleBase from '../InfoBlocks.module.css'
import Style from './History.module.css'
import {SpotColor} from "../../../../types/Spot";

export const History = observer((props: { data: MainGameState }): JSX.Element => (
    <>
        {
            props.data.resultsHistory.length === 0
                ?
                <></>
                :
                <div className={`${StyleBase.containerBase} ${Style.container}`}>
                    <h1 className={StyleBase.title}>Results history</h1>
                    <div className={`${StyleBase.tableBase} ${Style.table}`}>
                        {
                            props.data.resultsHistory.map(item =>
                                <div className={`${Style.item} ${item.result.color === SpotColor.GREEN ? Style.green :
                                    item.result.color === SpotColor.RED ? Style.red : Style.black}`}>
                                    {item.result.value}
                                </div>
                            )
                        }
                    </div>
                </div>
        }
    </>
))