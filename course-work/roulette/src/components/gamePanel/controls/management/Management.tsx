import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../../types/MainGameState'
import {BaseGameState} from '../../../../types/BaseGameState'
import spinLogo from '../../../../images/spin.png'
import removeBetsLogo from '../../../../images/remove.svg'
import cursor from '../../../../images/cursor.png'
import {Sound} from '../../../../types/Sound'

import Style from './Management.module.css'


const buttonPlayClicked = (data: MainGameState): void => {
    Sound.playPressButton(data.voiceTurnedOn)
    if (data.totalCurrentBet === 0) {
        Sound.playPutBets(data.voiceTurnedOn)
        data.modalsState.modalWarningText = 'Please, make some bets'
        data.modalsState.modalWarningActive = true
        window.setTimeout(() => data.modalsState.modalWarningActive = false, 1500)
    } else {
        data.spinRoulette()
    }
}

const buttonClearBetsPressed = (data: MainGameState): void => {
    Sound.playPressButton(data.voiceTurnedOn)
    if (data.totalCurrentBet === 0) {
        Sound.playNoBets(data.voiceTurnedOn)
        data.modalsState.modalWarningActive = true
        data.modalsState.modalWarningText = 'No bets on the spots'
        window.setTimeout(() => data.modalsState.modalWarningActive = false, 1500)
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
                        style={{cursor: `url(${cursor}), auto`, color: 'yellow'}}
                        onClick={() => buttonPlayClicked(props.data)}>
                    <img className={Style.buttonManagerImage} src={spinLogo} alt="spin!"/>
                    Start
                </button>
            </div>
            <div className={Style.buttonManagerContainer}>
                <button className={Style.buttonManager}
                        style={{cursor: `url(${cursor}), auto`, color: '#FF9494'}}
                        onClick={() => buttonClearBetsPressed(props.data)}>
                    <img className={Style.buttonManagerImage} style={{width: '30%', height: '30%'}} src={removeBetsLogo} alt="remove bets!"/>
                    Clear
                </button>
            </div>
        </div>
    </div>
))