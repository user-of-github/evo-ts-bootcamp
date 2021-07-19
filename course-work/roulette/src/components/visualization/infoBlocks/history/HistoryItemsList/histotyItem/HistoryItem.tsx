import {observer} from 'mobx-react-lite'


import {SpotColor} from '../../../../../../types/Spot'
import {ResultsHistoryItem} from '../../../../../../types/ResultsHistoryItem'

import Style from './HistoryItem.module.css'


export const HistoryItem = observer((props: { item: ResultsHistoryItem }): JSX.Element => (
    <div className={`${Style.item} ${props.item.result.color === SpotColor.GREEN ? Style.green :
        props.item.result.color === SpotColor.RED ? Style.red : Style.black}`}
         title="Show result">
        {props.item.result.value}
    </div>
))