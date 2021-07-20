import {observer} from 'mobx-react-lite'

import volumeOn from '../../../../images/volume-on.svg'
import volumeOff from '../../../../images/volume-off.svg'
import {MainGameState} from '../../../../types/MainGameState'
import {Sound} from '../../../../types/Sound'

import Style from '../Settings.module.css'

export const SetSound = observer((props: { data: MainGameState }): JSX.Element => (
    <button className={Style.button}
            title={props.data.settingsState.voiceTurnedOn ? 'Turn off music' : 'Turn on music'}
            onClick={() => {
                Sound.playPressButton(true)
                props.data.changeSoundState()
            }}>
        <img height="17px" width="17px" src={props.data.settingsState.voiceTurnedOn ? volumeOn : volumeOff} alt="volume checker"/>
    </button>
))