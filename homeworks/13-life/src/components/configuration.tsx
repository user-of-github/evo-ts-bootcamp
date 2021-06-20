import {observer} from 'mobx-react-lite'

import Style from './configuration.module.css'
import {LifeCanvasState} from '../lifeStore/lifeState'


const INPUT_SIZE_ID: string = 'size'
const INPUT_LATENCY_ID: string = 'latency'
const INPUT_GRID_ID: string = 'grid'

const inputSizeChanged = (data: LifeCanvasState): void => {
    const inputValue: string = (document.getElementById(INPUT_SIZE_ID) as HTMLInputElement).value.toString().trim()
    if (inputValue === '')
        return

    data.changeSize(Number.parseInt(inputValue))
}

const checkboxGridChanged = (data: LifeCanvasState): void => {
    data.changeGridDrawingFlag()
}

const inputLatencyChanged = (data: LifeCanvasState): void => {
    const inputValue: string = (document.getElementById(INPUT_LATENCY_ID) as HTMLInputElement).value.toString().trim()
    if (inputValue === '')
        return

    data.changeLatency(Number.parseInt(inputValue))
}

const buttonRunClicked = (data: LifeCanvasState): void => data.runEvolution()
const buttonStopClicked = (data: LifeCanvasState): void => data.stopEvolution()


export const Configuration = observer((props: { data: LifeCanvasState }): JSX.Element => (
    <div className={Style.configurationContainer}>
        <div className={Style.configurationBlock}>
            <div className={Style.configurationSizes}>
                <div className={Style.inputGroup}>
                    <label htmlFor={INPUT_SIZE_ID} className={Style.inputGroupLabel}>Size:</label>
                    <input min={LifeCanvasState.MINIMUM_SIDE_SIZE}
                           max={LifeCanvasState.MAXIMUM_SIDE_SIZE}
                           type="number"
                           id={INPUT_SIZE_ID}
                           defaultValue={props.data.getFieldSize()}
                           className={Style.inputGroupInput}
                           onChange={() => inputSizeChanged(props.data)}
                           step={1}
                           disabled={props.data.getInProgressState()}/>
                </div>

                <div className={Style.inputGroup}>
                    <label htmlFor={INPUT_GRID_ID} className={Style.inputGroupLabel}>Draw Grid:</label>
                    <input min={LifeCanvasState.MINIMUM_SIDE_SIZE}
                           max={LifeCanvasState.MAXIMUM_SIDE_SIZE}
                           type="checkbox"
                           id={INPUT_GRID_ID}
                           checked={props.data.getGridDrawingFlag()}
                           className={Style.inputGroupCheckbox}
                           onChange={() => checkboxGridChanged(props.data)}
                           step={1}/>
                </div>
            </div>
        </div>
        <div className={Style.configurationBlock}>
            <div className={Style.configurationLatency}>
                <div className={Style.inputGroup}>
                    <label htmlFor={INPUT_LATENCY_ID} className={Style.inputGroupLabel}>Latency:</label>
                    <input min={LifeCanvasState.MINIMAL_LATENCY}
                           max={LifeCanvasState.MAXIMUM_LATENCY}
                           defaultValue={props.data.getLatency()}
                           type="number"
                           step={1}
                           id={INPUT_LATENCY_ID}
                           className={Style.inputGroupInput}
                           onChange={() => inputLatencyChanged(props.data)}/>
                </div>
            </div>
        </div>
        <div className={Style.configurationBlock}>
            <div className={Style.configurationLatency}>
                <button className={Style.button}
                        disabled={props.data.getInProgressState()}
                        onClick={() => buttonRunClicked(props.data)}>Run
                </button>
                <button className={Style.button}
                        disabled={!props.data.getInProgressState()}
                        onClick={() => buttonStopClicked(props.data)}>Stop
                </button>
            </div>
        </div>
        <div className={Style.configurationBlock}>
            <div className={Style.configurationLatency}>
                <span className={Style.state}>
                    {
                        !props.data.getInProgressState()
                            ?
                            'Not launched'
                            :
                            props.data.getWasEvolutionOrNot()
                                ? 'Launched. Evolution is continuing'
                                :
                                'Launched. Evolution has stopped'
                    }
                </span>
            </div>
        </div>
    </div>
))