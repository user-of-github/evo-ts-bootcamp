import {observer} from 'mobx-react-lite'

import {MainGameState} from '../../../types/MainGameState'
import volumeOn from '../../../images/volume-on.svg'
import volumeOff from '../../../images/volume-off.svg'
import cursor from '../../../images/cursor.png'

import Style from './Settings.module.css'

export const Settings = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        <button className={Style.sound}
                title={props.data.voiceTurnedOn ? 'Turn off sound' : 'Turn on sound'}
                onClick={() => props.data.changeSoundState()}
                style={{cursor: `url(${cursor}), auto`}}>
            <img height="20px" src={props.data.voiceTurnedOn ? volumeOn : volumeOff} alt="volume checker"/>
        </button>
    </div>
))