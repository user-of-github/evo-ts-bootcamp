import {observer} from 'mobx-react-lite'

import {CURRENCY} from '../../../../../utilities/configuration'

import Style from '../CurrentInformation.module.css'


export const TotalBet = observer((props: { currentBet: number }): JSX.Element => (
    <div className={Style.data}>
        Total bet:
        <span className={Style.numbers}>
            {props.currentBet} {CURRENCY}
        </span>
    </div>
))