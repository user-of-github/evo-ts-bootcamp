import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../../types/MainGameState'
import {BaseGameState} from '../../../../types/BaseGameState'
import spinLogo from '../../../../images/spin.png'
import removeBetsLogo from '../../../../images/remove.svg'
import {buttonPlayClicked, buttonClearBetsPressed} from './managementUtilities'

import Style from './Management.module.css'


export const Management = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        <div className={`${Style.tablet} ${props.data.currentStage === BaseGameState.ROULETTE_SPINNING ?
            Style.inactive : ''}`}>
            <div className={Style.buttonManagerContainer}>
                <button className={`${Style.buttonManager} ${Style.buttonManagerSpin}`}
                        onClick={() => buttonPlayClicked(props.data)}>
                    <img className={Style.buttonManagerImage} src={spinLogo} alt="spin!"/>
                    Start
                </button>
            </div>
            <div className={Style.buttonManagerContainer}>
                <button className={`${Style.buttonManager} ${Style.buttonManagerClear}`}
                        onClick={() => buttonClearBetsPressed(props.data)}>
                    <img className={Style.buttonManagerImage} src={removeBetsLogo}
                         alt="remove bets!"/>
                    Clear
                </button>
            </div>
        </div>
    </div>
))