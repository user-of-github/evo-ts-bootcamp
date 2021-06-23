import {observer} from 'mobx-react-lite'

import {PhotoType} from '../../../types/types'

import {MarsViewerState} from '../../../store/marsViewerState'

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


    if (instance.alreadyLoaded.has(instance.currentSolution)) {
        instance.photosToShow = ((instance.alreadyLoaded.get(instance.currentSolution) as Array<PhotoType>).slice())
        instance.loaded = true
        instance.loading = false
    }
}

const buttonLoadSolutionClicked = (instance: MarsViewerState): void => {
    if (instance.loaded === true)
        return

    instance.loadNewSolution()
}


export const MarsViewerConfiguration = observer((props: { state: MarsViewerState }): JSX.Element => (
    <section className={Style.marsViewerConfiguration}>
        <input className={Style.marsViewerConfigurationInput}
               type="number"
               min="0"
               step="1"
               defaultValue={props.state.currentSolution}
               id={'solutionInput'}
               onChange={() => inputValueChanged(props.state)}/>

        <button className={Style.marsViewerConfigurationButton}
                disabled={props.state.loading}
                onClick={() => buttonLoadSolutionClicked(props.state)}>
            {LOAD_SOLUTION_BTN_TITLE}
        </button>
    </section>)
)