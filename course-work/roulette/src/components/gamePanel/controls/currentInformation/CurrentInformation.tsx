import {observer} from 'mobx-react-lite'
import Style from './CurrentInformation.module.css'
import {MainGameState} from '../../../../types/MainGameState'
import {TotalBet} from "./totalBet/TotalBet";
import {UserBalance} from "./userBalance/UserBalance";

export const CurrentInformation = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        <div className={Style.tablet}>
            <TotalBet currentBet={props.data.totalCurrentBet}/>
            <UserBalance userBalance={props.data.userBalance}/>
        </div>
    </div>
))