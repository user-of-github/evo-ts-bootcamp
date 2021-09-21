import {observer} from 'mobx-react-lite'
import {Transition} from 'react-transition-group'

import {MainGameState} from '../../types/MainGameState'
import {SpotColor} from '../../types/Spot'
import {CURRENCY, NO_AWARD_TEXT, WIN_TEXT} from '../../utilities/configuration'
import {APPLICATION_INFORMATION, defaultStyles, transitionStyles} from './modalUtilities'
import {ModalsController} from '../../types/ModalsController'
import {Sound} from '../../types/Sound'
import {getTimeString} from '../../utilities/getTimeString'

import Style from './Modal.module.css'


export const ModalWarning = observer((props: { state: ModalsController }): JSX.Element => (
    <Transition in={props.state.modalWarningActive} timeout={100} unmountOnExit={true}>
        {
            state => (
                <div className={Style.wrapper}
                     onClick={() => {
                         Sound.playPressButton()
                         props.state.modalWarningActive = false
                     }}>
                    <div className={Style.containerWarning}
                         onClick={(event) => {
                             Sound.playPressButton()
                             event.stopPropagation()
                         }}
                         style={{
                             ...defaultStyles, // @ts-ignore
                             ...transitionStyles[state]
                         }}>
                        {props.state.modalWarningText}
                    </div>
                </div>
            )
        }
    </Transition>
))


export const ModalResult = observer((props: { state: MainGameState }): JSX.Element => (
    <Transition timeout={100} in={props.state.settingsState.modalsState.modalResultActive} unmountOnExit={true}>
        {
            state => (
                <div className={Style.wrapper}
                     onClick={() => {
                         Sound.playPressButton()
                         props.state.settingsState.modalsState.modalResultActive = false
                     }}>
                    <div
                        className={`${Style.containerResult} ${props.state.resultsHistory[props.state.resultsHistory.length -
                        1].award > 0 ? Style.winBorder : Style.loseBorder}`}
                        onClick={(event) => {
                            Sound.playPressButton()
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

export const ModalApplicationInformation = observer((props: { state: ModalsController }) => (
    <Transition timeout={100} in={props.state.modalInformationActive} unmountOnExit={true}>
        {
            state => (
                <div className={Style.wrapper}
                     onClick={() => {
                         Sound.playPressButton()
                         props.state.modalInformationActive = false
                     }}>
                    <div
                        className={Style.containerInformation}
                        onClick={(event) => {
                            Sound.playPressButton()
                            event.stopPropagation()
                        }}
                        style={{
                            ...defaultStyles, // @ts-ignore
                            ...transitionStyles[state]
                        }}>
                        <div className={Style.infoContainer}>
                            <div className={Style.infoItem}>Application title :</div>
                            <div
                                className={`${Style.infoItem} ${Style.yellow}`}>{APPLICATION_INFORMATION.projectName}</div>
                            <div className={Style.infoItem}>Author Name :</div>
                            <div
                                className={`${Style.infoItem} ${Style.yellow}`}>{APPLICATION_INFORMATION.authorName}</div>
                            <div className={Style.infoItem}>GitHub Account :</div>
                            <div className={`${Style.infoItem} ${Style.yellow}`}>
                                <a className={Style.link} target="new"
                                   href={`https://github.com/${APPLICATION_INFORMATION.githubLink}`}>@{APPLICATION_INFORMATION.githubLink}</a>
                            </div>
                            <div className={Style.infoItem}>Location :</div>
                            <div
                                className={`${Style.infoItem} ${Style.yellow}`}>{APPLICATION_INFORMATION.location}</div>
                            <div className={Style.infoItem}>Terms of development :</div>
                            <div
                                className={`${Style.infoItem} ${Style.yellow}`}>{APPLICATION_INFORMATION.termsOfDeveloping}</div>
                            <div className={Style.infoItem}>Technologies used :</div>
                            <div
                                className={`${Style.infoItem} ${Style.yellow}`}>{APPLICATION_INFORMATION.technologiesStack}</div>
                            <div className={Style.infoItem}>Other :</div>
                            <div
                                className={`${Style.infoItem} ${Style.yellow}`}>{APPLICATION_INFORMATION.copyright}</div>
                        </div>
                    </div>
                </div>
            )
        }
    </Transition>
))

export const ModalPreviousResult = observer((props: { state: ModalsController }): JSX.Element => (
    <Transition in={props.state.modalPreviousResultActive} timeout={100} unmountOnExit={true}>
        {
            state => (
                <div className={Style.wrapper}
                     onClick={() => {
                         Sound.playPressButton()
                         props.state.modalPreviousResultActive = false
                     }}>
                    <div className={Style.containerHistory}
                         onClick={(event) => {
                             Sound.playPressButton()
                             event.stopPropagation()
                         }}
                         style={{
                             ...defaultStyles, // @ts-ignore
                             ...transitionStyles[state]
                         }}>
                        <div className={Style.historicalListContainer}>
                            <div className={Style.infoItem}>Time of bet :</div>
                            <div className={`${Style.infoItem} ${Style.yellow}`}>
                                {getTimeString(props.state.modalPreviousResultData!.time)}
                            </div>

                            <div className={Style.infoItem}>Value :</div>
                            <div className={`${Style.infoItem} ${Style.yellow}`}>
                                {props.state.modalPreviousResultData!.result.value}, {props.state.modalPreviousResultData!.result.color}
                            </div>
                            <div className={Style.infoItem}>Your total bet :</div>
                            <div className={`${Style.infoItem} ${Style.yellow}`}>
                                {props.state.modalPreviousResultData!.totalUserBet} {CURRENCY}
                            </div>

                            <div className={Style.infoItem}>Your win :</div>
                            <div className={`${Style.infoItem} ${Style.yellow}`}>
                                {props.state.modalPreviousResultData!.award} {CURRENCY}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </Transition>
))