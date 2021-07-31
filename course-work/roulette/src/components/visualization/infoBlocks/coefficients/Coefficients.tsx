import {observer} from 'mobx-react-lite'
import {Transition} from 'react-transition-group'

import {MainGameState} from '../../../../types/MainGameState'
import {defaultStyles, transitionStyles} from '../infoBlocksUtilities'
import {Sound} from '../../../../types/Sound'
import {TITLE_COEFFICIENTS} from '../../../../utilities/configuration'
import {SettingsState} from '../../../../types/SettingsState'

import StyleBase from '../InfoBlocks.module.css'
import Style from './Coefficients.module.css'


export const Coefficients = observer((props: { data: SettingsState }): JSX.Element => (
    <div className={`${StyleBase.containerBase} ${Style.container}`}>
        <div className={StyleBase.row}>
            <h1 className={StyleBase.title}>{TITLE_COEFFICIENTS}</h1>
            <button className={StyleBase.show}
                    onClick={() => {
                        Sound.playPressButton()
                        props.data.toShowCoefficientsTable = !props.data.toShowCoefficientsTable
                    }}>
                {props.data.toShowCoefficientsTable ? '↑' : '↓'}
            </button>
        </div>

        <Transition in={props.data.toShowCoefficientsTable} timeout={100} unmountOnExit={true}>
            {state => (
                <div className={`${StyleBase.tableBase} ${Style.table}`}
                     style={{
                         ...defaultStyles,//@ts-ignore
                         ...transitionStyles[state]
                     }}>
                    {
                        Array.from(MainGameState.COEFFICIENTS).map(value => (
                            <div className={Style.item}>
                                <span className={Style.itemSpan}>{value[0]}</span>
                                <span className={`${Style.itemSpanValue} ${Style.coefficient}`}>{value[1]}</span>
                            </div>
                        ))
                    }
                </div>)
            }
        </Transition>
    </div>
))