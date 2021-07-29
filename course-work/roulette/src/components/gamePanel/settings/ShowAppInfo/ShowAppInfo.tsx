import {observer} from 'mobx-react-lite'

import {ModalsController} from '../../../../types/ModalsController'
import {Sound} from '../../../../types/Sound'
import infoImgSrc from '../../../../images/info.svg'

import Style from '../Settings.module.css'

const buttonShowAppInfoPressed = (data: ModalsController): void => {
    Sound.playPressButton()
    data.modalInformationActive = true
}

export const ShowAppInfo = observer((props: { data: ModalsController }): JSX.Element => (
    <button className={Style.button}
            title={'Show application info'}
            onClick={() => buttonShowAppInfoPressed(props.data)}>
        <img height="17px" width="17px" src={infoImgSrc} alt="volume checker"/>
    </button>
))