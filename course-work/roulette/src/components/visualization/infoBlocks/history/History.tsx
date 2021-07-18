import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../../types/MainGameState'
import {ResultsHistoryItem} from '../../../../types/ResultsHistoryItem'

import {HistoryItem} from './histotyItem/HistoryItem'

import StyleBase from '../InfoBlocks.module.css'
import Style from './History.module.css'


export const History = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={`${StyleBase.containerBase} ${Style.container}`}>
        <h1 className={StyleBase.title}>Results history</h1>
        {
            props.data.resultsHistory.length !== 0
                ?
                <div className={`${StyleBase.tableBase} ${Style.table}`}>
                    {
                        props.data.resultsHistory.map((item: ResultsHistoryItem, index: number) =>
                            <HistoryItem item={item} key={index}/>)
                    }
                </div>
                :
                <div className={StyleBase.tableBase}>
                    <span className={Style.noSpins}>
                        No spins yet
                    </span>
                </div>
        }
    </div>
))