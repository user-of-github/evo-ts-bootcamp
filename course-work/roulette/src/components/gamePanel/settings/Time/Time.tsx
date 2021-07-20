import {observer} from 'mobx-react-lite'

import Style from './Time.module.css'


export const Time = observer((props: { time: Date }): JSX.Element => (
    <div className={Style.container}>
        {props.time.getHours() > 9 ? props.time.getHours() : ('0' + props.time.getHours())}:{props.time.getMinutes() >
    9 ? props.time.getMinutes() : ('0' + props.time.getMinutes())}:{props.time.getSeconds() > 9 ?
        props.time.getSeconds() : ('0' + props.time.getSeconds())}
    </div>
))