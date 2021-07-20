import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../types/MainGameState'

import {SetSound} from './SetSound/SetSound'
import {Time} from './Time/Time'
import {ShowAppInfo} from './ShowAppInfo/ShowAppInfo'

import Style from './Settings.module.css'


export const Settings = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        <Time time={props.data.settingsState.currentTime}/>
        <SetSound data={props.data}/>
        <ShowAppInfo data={props.data.settingsState.modalsState}/>
    </div>
))