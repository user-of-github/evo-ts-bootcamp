import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../../types/MainGameState'
import {BaseGameState} from '../../../../types/BaseGameState'
import spinLogo from '../../../../images/swirl.svg'
import removeBetsLogo from '../../../../images/remove.svg'
import cursor from '../../../../images/cursor.png'
import {playPressButtonSound} from '../../../../utilities/playSound'

import Style from './Management.module.css'


export const Management = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        <div className={`${Style.tablet} ${props.data.currentStage === BaseGameState.ROULETTE_SPINNING ?
            Style.inactive : ''}`}>
            <div className={Style.buttonManagerContainer}>
                <button className={Style.buttonManager}
                        style={{cursor: `url(${cursor}), auto`}}
                        disabled={props.data.currentStage === BaseGameState.ROULETTE_SPINNING}
                        onClick={() => {
                            playPressButtonSound()
                            props.data.spinRoulette()
                        }
                        }>
                    <img className={Style.buttonManagerImage} src={spinLogo} alt="spin!"/>
                </button>
            </div>
            <div className={Style.buttonManagerContainer}>
                <button className={Style.buttonManager}
                        style={{cursor: `url(${cursor}), auto`}}
                        onClick={() => {
                            playPressButtonSound()
                            props.data.cancelBets()
                        }}
                        disabled={props.data.currentStage === BaseGameState.ROULETTE_SPINNING}>
                    <img className={Style.buttonManagerImage} src={removeBetsLogo} alt="remove bets!"/>
                </button>
            </div>
        </div>
    </div>
))