import {observer} from 'mobx-react-lite'
import Style from '../CurrentInformation.module.css'


export const UserBalance = observer((props: { userBalance: number }): JSX.Element => (
    <div className={Style.data}>
        Balance:
        <span className={Style.numbers}>
            {props.userBalance}
        </span>
    </div>
))