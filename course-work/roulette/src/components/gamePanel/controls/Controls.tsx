import Style from './Controls.module.css'
import {CurrentInformation} from './currentInformation/CurrentInformation'
import {observer} from 'mobx-react-lite'
import {MainGameState} from '../../../types/MainGameState'
import {Management} from './management/Management'

export const Controls = observer((props: { data: MainGameState }): JSX.Element => (
    <div className={Style.container}>
        <CurrentInformation currentBalance={props.data.userBalance}
                            totalBet={props.data.totalCurrentBet}
                            key={'currentInfo'}/>
        <Management data={props.data}/>
    </div>
))