import {observer} from 'mobx-react-lite'

import {ResultsHistoryItem} from '../../../../../types/ResultsHistoryItem'
import {HistoryItem} from './histotyItem/HistoryItem'
import {EMPTY_HISTORY_TEXT} from '../../infoBlocksUtilities'

import StyleBase from '../../InfoBlocks.module.css'
import Style from '../History.module.css'


export const HistoryItemList = observer((props: { story: Array<ResultsHistoryItem> }): JSX.Element => (
    <div className={`${StyleBase.tableBase} ${Style.table} ${props.story.length === 0 ?
        Style.tableEmpty : ''}`}>
        {
            props.story.length === 0
                ?
                EMPTY_HISTORY_TEXT
                :
                props.story.slice(-10)
                    .map((item: ResultsHistoryItem, index: number) =>
                        <HistoryItem item={item} key={index}/>)
        }
    </div>
))