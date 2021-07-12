import {observer} from 'mobx-react-lite'

import {TotalBet} from './totalBet/TotalBet'
import {UserBalance} from './userBalance/UserBalance'

import Style from './CurrentInformation.module.css'


export const CurrentInformation = observer((props: { totalBet: number, currentBalance: number }): JSX.Element => (
    <div className={Style.container}>
        <div className={Style.tablet}>
            <TotalBet currentBet={props.totalBet} key={'usersTotalBet'}/>
            <UserBalance userBalance={props.currentBalance} key={'usersCurrentBalance'}/>
        </div>
    </div>
))