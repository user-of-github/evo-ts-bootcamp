import React from 'react'

import {MainGameState} from '../types/MainGameState'

import {Panel} from './gamePanel/GamePanel'
import {ModalApplicationInformation, ModalPreviousResult, ModalResult, ModalWarning} from './modal/Modal'
import {Visualization} from './visualization/Visualization'

import Style from './App.module.css'
import {LoadingScreen} from "./loadingScreen/LoadingScreen";
import {Sound} from '../types/Sound'


export const App = (): JSX.Element => {
    const mainState: React.MutableRefObject<MainGameState> = React.useRef<MainGameState>(new MainGameState())

    const backgroundAudioReference: React.RefObject<HTMLAudioElement> = React.useRef<HTMLAudioElement>(null)
    React.useLayoutEffect(() => {
        Sound.backgroundAudioRef = backgroundAudioReference.current
        backgroundAudioReference.current!.volume = 0.66
    }, [])

    return (
        <section className={Style.mainContainer}>
            <audio src={'/files/sounds/background.mp3'}
                   loop={true}
                   ref={backgroundAudioReference}
                   autoPlay={true}/>
            <Visualization data={mainState.current}/>
            <Panel data={mainState.current}/>
            <ModalWarning state={mainState.current.settingsState.modalsState}/>
            <ModalResult state={mainState.current}/>
            <ModalApplicationInformation state={mainState.current.settingsState.modalsState}/>
            <ModalPreviousResult state={mainState.current.settingsState.modalsState}/>
            <LoadingScreen state={mainState.current.settingsState}/>
        </section>
    )
}
