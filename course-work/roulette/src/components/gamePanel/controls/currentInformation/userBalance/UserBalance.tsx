import {observer} from 'mobx-react-lite'

import {CURRENCY} from '../../../../../utilities/configuration'

import Style from '../CurrentInformation.module.css'


export const UserBalance = observer((props: { userBalance: number }): JSX.Element => (
    <div className={Style.data}>
        Cash:
        <span className={Style.numbers}>
            {props.userBalance}&nbsp;{CURRENCY}
        </span>
    </div>
))