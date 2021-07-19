import {observer} from 'mobx-react-lite'
import {Transition} from 'react-transition-group'

import {MainGameState} from '../../../../types/MainGameState'
import {TITLE_HISTORY, defaultStyles, transitionStyles} from '../infoBlocksUtilities'

import {HistoryItemList} from './HistoryItemsList/HistoryItemList'

import StyleBase from '../InfoBlocks.module.css'
import Style from './History.module.css'


export const History = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={`${StyleBase.containerBase} ${Style.container}`}>
        <div className={StyleBase.row}>
            <h1 className={StyleBase.title}>{TITLE_HISTORY}</h1>
            <button className={StyleBase.show}
                    onClick={() => props.data.toShowResultsHistory = !props.data.toShowResultsHistory}>
                {props.data.toShowResultsHistory ? '↑' : '↓'}
            </button>
        </div>
        <Transition in={props.data.toShowResultsHistory}
                    timeout={100}
                    unmountOnExit={true}>
            {state => (
                <div style={{
                    ...defaultStyles,//@ts-ignore
                    ...transitionStyles[state]
                }}>
                    <HistoryItemList story={props.data.resultsHistory}/>
                </div>)
            }
        </Transition>
    </div>
))