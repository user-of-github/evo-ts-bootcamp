import {observer} from 'mobx-react-lite'

import {getTimeString} from '../../../../utilities/getTimeString'

import Style from './Time.module.css'


export const Time = observer((props: { time: Date }): JSX.Element => (
    <div className={Style.container}>
        {getTimeString(props.time)}
    </div>
))