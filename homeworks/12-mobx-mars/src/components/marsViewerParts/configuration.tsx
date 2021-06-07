import {observer} from 'mobx-react-lite'
import {MarsViewerState} from '../../store/marsViewerState'
import {Tab} from '../../types/types'
import Style from './configuration.module.css'


const LOAD_SOLUTION_BTN_TITLE: string = 'Load solution'

const inputValueChanged = (instance: MarsViewerState): void => {
    const newInputValueStr: string = (document.getElementById('solutionInput') as HTMLInputElement).value.toString()
        .trim()

    if (!newInputValueStr.length)
        return

    const newInputValueNumber: number = Number.parseInt(newInputValueStr)

    if (instance.currentSolution === newInputValueNumber)
        return

    instance.currentSolution = newInputValueNumber
    instance.loaded = false
    instance.loading = false
}

export const MarsViewerConfiguration = observer((props: { state: MarsViewerState }): JSX.Element => {
    if (props.state.activeTab === Tab.FAVOURITES)
        return <></>

    return (
        <section className={Style.marsViewerConfiguration}>
            <input className={Style.marsViewerConfigurationInput} type="number" min="0" step="1"
                   defaultValue={props.state.currentSolution} id={'solutionInput'}
                   onChange={() => inputValueChanged(props.state)}/>

            <button className={Style.marsViewerConfigurationButton}>{LOAD_SOLUTION_BTN_TITLE}</button>
        </section>
    )
})