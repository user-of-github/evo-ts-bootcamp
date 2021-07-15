import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../../types/MainGameState'
import {BaseGameState} from '../../../../types/BaseGameState'
import spinLogo from '../../../../images/swirl.svg'
import removeBetsLogo from '../../../../images/remove.svg'
import cursor from '../../../../images/cursor.png'
import {noBetsOnSpots, pressButtonSound, putSomeBetsSound} from '../../../../utilities/playSound'

import Style from './Management.module.css'

const buttonPlayClicked = (data: MainGameState): void => {
    pressButtonSound.play()
    if (data.totalCurrentBet === 0) {
        putSomeBetsSound.play()
        data.modalsState.modalWarningText = 'Please, make some bets'
        data.modalsState.modalWarningActive = true


        window.setTimeout(() => data.modalsState.modalWarningActive = false, 1500)
    } else {
        data.spinRoulette()
    }
}

const buttonClearBetsPressed = (data: MainGameState): void => {
    pressButtonSound.play()
    if (data.totalCurrentBet === 0) {
        data.modalsState.modalWarningActive = true
        data.modalsState.modalWarningText = 'No bets on the spots'
        noBetsOnSpots.play()
        window.setTimeout(() => data.modalsState.modalWarningActive = false, 2000)
    } else {
        data.cancelBets()
    }
}

export const Management = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        <div className={`${Style.tablet} ${props.data.currentStage === BaseGameState.ROULETTE_SPINNING ?
            Style.inactive : ''}`}>
            <div className={Style.buttonManagerContainer}>
                <button className={Style.buttonManager}
                        style={{cursor: `url(${cursor}), auto`}}
                        onClick={() => buttonPlayClicked(props.data)}>
                    <img className={Style.buttonManagerImage} src={spinLogo} alt="spin!"/>
                </button>
            </div>
            <div className={Style.buttonManagerContainer}>
                <button className={Style.buttonManager}
                        style={{cursor: `url(${cursor}), auto`}}
                        onClick={() => buttonClearBetsPressed(props.data)}>
                    <img className={Style.buttonManagerImage} src={removeBetsLogo} alt="remove bets!"/>
                </button>
            </div>
        </div>
    </div>
))