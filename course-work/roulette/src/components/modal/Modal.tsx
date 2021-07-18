import {observer} from 'mobx-react-lite'

import Style from './Modal.module.css'
import {MainGameState} from '../../types/MainGameState'
import {SpotColor} from '../../types/Spot'
import {pressButtonSound} from '../../utilities/playSound';


export const ModalWarning = observer((props: { state: MainGameState }): JSX.Element => (
    <>
        {
            props.state.modalsState.modalWarningActive
                ?
                <div className={Style.wrapper}
                     onClick={() => {
                         pressButtonSound.play()
                         props.state.modalsState.modalWarningActive = false
                     }}>
                    <div className={Style.containerWarning}
                         onClick={(event) => {
                             event.stopPropagation()
                             pressButtonSound.play()
                         }
                         }>
                        {props.state.modalsState.modalWarningText}
                    </div>
                </div>
                :
                <>
                </>
        }
    </>
))

export const ModalResult = observer((props: { state: MainGameState }): JSX.Element => (
    <>
        {
            props.state.modalsState.modalResultActive
                ?
                <div className={Style.wrapper}
                     onClick={() => {
                         pressButtonSound.play()
                         props.state.modalsState.modalResultActive = false
                     }}>
                    <div className={Style.containerResult}
                         onClick={(event) => {
                             event.stopPropagation()
                             pressButtonSound.play()
                         }}>
                        <div className={Style.resultInfo}>
                            {
                                props.state.resultsHistory[props.state.resultsHistory.length - 1].award > 0
                                    ?
                                    `You won\n${props.state.resultsHistory[props.state.resultsHistory.length - 1].award} DEMO`
                                    :
                                    'No award'
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
                :
                <>
                </>
        }
    </>
))
