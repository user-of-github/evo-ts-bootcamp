import {observer} from 'mobx-react-lite'

import {SpotColor} from '../../../../../../types/Spot'
import {ResultsHistoryItem} from '../../../../../../types/ResultsHistoryItem'
import {Sound} from '../../../../../../types/Sound'
import {ModalsController} from '../../../../../../types/ModalsController'

import Style from './HistoryItem.module.css'


const historyItemPressed = (story: ResultsHistoryItem, modalsState: ModalsController): void => {
    Sound.playPressButton()
    modalsState.modalPreviousResultData = story
    modalsState.modalPreviousResultActive = true
}

export const HistoryItem = observer(
    (props: { item: ResultsHistoryItem, modalsState: ModalsController }): JSX.Element => (
        <div className={`${Style.item} ${props.item.result.color === SpotColor.GREEN ? Style.green :
            props.item.result.color === SpotColor.RED ? Style.red : Style.black}`}
             title="Show result"
             onClick={() => historyItemPressed(props.item, props.modalsState)}>
            {props.item.result.value}
        </div>
    ))