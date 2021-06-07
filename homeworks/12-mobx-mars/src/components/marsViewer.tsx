import {MarsViewerMain} from './marsViewerParts/marsViewerMain'
import {MarsViewerState} from '../store/marsViewerState'
import Style from './marsViewer.module.css'

const DEFAULT_SOLUTION: number = 1

const main: MarsViewerState = new MarsViewerState(DEFAULT_SOLUTION)

export const MarsViewer = () => (
    <main className={Style.marsViewerWrapperMain}>
        <MarsViewerMain data={main}/>
    </main>
)