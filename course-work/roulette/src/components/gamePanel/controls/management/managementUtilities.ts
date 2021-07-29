import {MainGameState} from '../../../../types/MainGameState'
import {Sound} from '../../../../types/Sound'


export const buttonPlayClicked = (data: MainGameState): void => {
    Sound.playPressButton()
    if (data.totalCurrentBet === 0) {
        Sound.playPutBets()
        data.settingsState.modalsState.modalWarningText = 'Please, make some bets'
        data.settingsState.modalsState.modalWarningActive = true
        window.setTimeout(() => data.settingsState.modalsState.modalWarningActive = false, 1500)
    } else {
        data.spinRoulette()
    }
}

export const buttonClearBetsPressed = (data: MainGameState): void => {
    Sound.playPressButton()
    if (data.totalCurrentBet === 0) {
        Sound.playNoBets()
        data.settingsState.modalsState.modalWarningActive = true
        data.settingsState.modalsState.modalWarningText = 'No bets on the spots'
        window.setTimeout(() => data.settingsState.modalsState.modalWarningActive = false, 1500)
    } else {
        data.cancelBets()
    }
}