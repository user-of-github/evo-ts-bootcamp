import {observer} from 'mobx-react-lite'
import {Transition} from 'react-transition-group'

import {MainGameState} from '../../types/MainGameState'
import {SpotColor} from '../../types/Spot'
import {CURRENCY} from '../../utilities/configuration'
import {defaultStyles, transitionStyles} from './modalUtilities'

import Style from './Modal.module.css'


const NO_AWARD_TEXT: string = 'You lose'
const WIN_TEXT: string = 'You win: '


export const ModalWarning = observer((props: { state: MainGameState }): JSX.Element => (
    <Transition in={props.state.modalsState.modalWarningActive} timeout={100} unmountOnExit={true}>
        {
            state => (
                <div className={Style.wrapper}
                     onClick={() => {
                         props.state.modalsState.modalWarningActive = false
                     }}>
                    <div className={Style.containerWarning}
                         onClick={(event) => {
                             event.stopPropagation()
                         }}
                         style={{
                             ...defaultStyles, // @ts-ignore
                             ...transitionStyles[state]
                         }}>
                        {props.state.modalsState.modalWarningText}
                    </div>
                </div>
            )
        }
    </Transition>
))


export const ModalResult = observer((props: { state: MainGameState }): JSX.Element => (
    <Transition timeout={100} in={props.state.modalsState.modalResultActive} unmountOnExit={true}>
        {
            state => (
                <div className={Style.wrapper}
                     onClick={() => {
                         props.state.modalsState.modalResultActive = false
                     }}>
                    <div
                        className={`${Style.containerResult} ${props.state.resultsHistory[props.state.resultsHistory.length -
                        1].award > 0 ? Style.winBorder : Style.loseBorder}`}
                        onClick={(event) => {
                            event.stopPropagation()
                        }}
                        style={{
                            ...defaultStyles, // @ts-ignore
                            ...transitionStyles[state]
                        }}>
                        <div className={Style.resultInfo}>
                            {
                                props.state.resultsHistory[props.state.resultsHistory.length - 1].award > 0
                                    ?
                                    `${WIN_TEXT}${props.state.resultsHistory[props.state.resultsHistory.length -
                                    1].award} ${CURRENCY}`
                                    :
                                    NO_AWARD_TEXT
                            }
                        </div>
                        <div
                            className={`${Style.resultCard} ${props.state.resultsHistory[props.state.resultsHistory.length -
                            1].result.color === SpotColor.GREEN ? Style.green :
                                props.state.resultsHistory[props.state.resultsHistory.length - 1].result.color ===
                                SpotColor.RED ? Style.red : Style.black}`}>
                            {
                                props.state.resultsHistory[props.state.resultsHistory.length - 1].result.value
                            }
                        </div>
                    </div>
                </div>
            )
        }
    </Transition>
))
