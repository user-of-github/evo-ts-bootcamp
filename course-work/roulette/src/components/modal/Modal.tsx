import {observer} from 'mobx-react-lite'
import {Transition} from 'react-transition-group'

import {MainGameState} from '../../types/MainGameState'
import {SpotColor} from '../../types/Spot'
import {CURRENCY} from '../../utilities/configuration'
import {APPLICATION_INFORMATION, defaultStyles, transitionStyles} from './modalUtilities'
import {ModalsController} from '../../types/ModalsController'

import Style from './Modal.module.css'
import {Sound} from "../../types/Sound";


const NO_AWARD_TEXT: string = 'You lose'
const WIN_TEXT: string = 'You win: '


export const ModalWarning = observer((props: { state: ModalsController }): JSX.Element => (
    <Transition in={props.state.modalWarningActive} timeout={100} unmountOnExit={true}>
        {
            state => (
                <div className={Style.wrapper}
                     onClick={() => {
                         Sound.playPressButton(true)
                         props.state.modalWarningActive = false
                     }}>
                    <div className={Style.containerWarning}
                         onClick={(event) => {
                             Sound.playPressButton(true)
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
                         Sound.playPressButton(true)
                         props.state.settingsState.modalsState.modalResultActive = false
                     }}>
                    <div
                        className={`${Style.containerResult} ${props.state.resultsHistory[props.state.resultsHistory.length -
                        1].award > 0 ? Style.winBorder : Style.loseBorder}`}
                        onClick={(event) => {
                            Sound.playPressButton(true)
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
                         Sound.playPressButton(true)
                         props.state.modalInformationActive = false
                     }}>
                    <div
                        className={Style.containerInformation}
                        onClick={(event) => {
                            Sound.playPressButton(true)
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
                            <div className={Style.infoItem}>Inspired by :</div>
                            <div
                                className={`${Style.infoItem} ${Style.yellow}`}>{APPLICATION_INFORMATION.inspiredBy}</div>
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
                         Sound.playPressButton(true)
                         props.state.modalPreviousResultActive = false
                     }}>
                    <div className={Style.containerHistory}
                         onClick={(event) => {
                             Sound.playPressButton(true)
                             event.stopPropagation()
                         }}
                         style={{
                             ...defaultStyles, // @ts-ignore
                             ...transitionStyles[state]
                         }}>
                        <div className={Style.historicalListContainer}>
                            <div className={Style.infoItem}>Time of bet :</div>
                            <div className={`${Style.infoItem} ${Style.yellow}`}>
                                {props.state.modalPreviousResultData!.time.getHours() > 9 ?
                                    props.state.modalPreviousResultData!.time.getHours() :
                                    ('0' + props.state.modalPreviousResultData!.time.getHours())}
                                :
                                {props.state.modalPreviousResultData!.time.getMinutes() > 9 ?
                                    props.state.modalPreviousResultData!.time.getMinutes() :
                                    ('0' + props.state.modalPreviousResultData!.time.getMinutes())}
                                :
                                {props.state.modalPreviousResultData!.time.getSeconds() > 9 ?
                                    props.state.modalPreviousResultData!.time.getSeconds() :
                                    ('0' + props.state.modalPreviousResultData!.time.getSeconds())}
                            </div>

                            <div className={Style.infoItem}>Value :</div>
                            <div className={`${Style.infoItem} ${Style.yellow}`}>
                                {props.state.modalPreviousResultData!.result.value}, {props.state.modalPreviousResultData!.result.color}
                            </div>
                            <div className={Style.infoItem}>Your total bet :</div>
                            <div className={`${Style.infoItem} ${Style.yellow}`}>
                                {props.state.modalPreviousResultData!.totalUserBet} $
                            </div>

                            <div className={Style.infoItem}>Your win :</div>
                            <div className={`${Style.infoItem} ${Style.yellow}`}>
                                {props.state.modalPreviousResultData!.award} $
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </Transition>
))