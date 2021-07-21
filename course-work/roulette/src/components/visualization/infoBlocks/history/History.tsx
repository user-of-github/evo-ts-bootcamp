import {observer} from 'mobx-react-lite'
import {Transition} from 'react-transition-group'

import {defaultStyles, transitionStyles} from '../infoBlocksUtilities'
import {Sound} from '../../../../types/Sound'
import {SettingsState} from '../../../../types/SettingsState'
import {ResultsHistoryItem} from '../../../../types/ResultsHistoryItem'
import {TITLE_HISTORY} from '../../../../utilities/configuration'

import {HistoryItemList} from './HistoryItemsList/HistoryItemList'

import StyleBase from '../InfoBlocks.module.css'
import Style from './History.module.css'


export const History = observer(
    (props: { settings: SettingsState, history: Array<ResultsHistoryItem> }): JSX.Element => (
        <div className={`${StyleBase.containerBase} ${Style.container}`}>
            <div className={StyleBase.row}>
                <h1 className={StyleBase.title}>{TITLE_HISTORY}</h1>
                <button className={StyleBase.show}
                        onClick={() => {
                            Sound.playPressButton(true)
                            props.settings.toShowResultsHistory = !props.settings.toShowResultsHistory
                        }}>
                    {props.settings.toShowResultsHistory ? '↑' : '↓'}
                </button>
            </div>
            <Transition in={props.settings.toShowResultsHistory}
                        timeout={100}
                        unmountOnExit={true}>
                {state => (
                    <div style={{
                        ...defaultStyles,//@ts-ignore
                        ...transitionStyles[state]
                    }}>
                        <HistoryItemList story={props.history} modalsState={props.settings.modalsState}/>
                    </div>)
                }
            </Transition>
        </div>
    ))