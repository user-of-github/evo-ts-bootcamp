import {getApi} from '../../utilities/getApi'
import {EmptyAction, LoadingNewPhotosNowAction, LoadedNewPhotosAction, ChangedInputValueAction} from '../../Types/action'
import {useDispatch, useSelector} from 'react-redux'
import {MarsViewerState} from '../../Types/state'
import Style from './Congiguration.module.css'
import {Dispatch} from 'redux'

const fetchPhotos = (solutionNumber: number) => {
    return (dispatch: any) => {
        fetch(getApi(solutionNumber))
            .then(response => response.json())
            .then(json => {
                const response: Array<string> = []
                json.photos.forEach((item: any) => response.push(item.img_src))
                dispatch(LoadedNewPhotosAction(response))
            })
    }
}

const loadNewPhotosPack = (dispatch: Dispatch<any>, currentSolution: number) => {
    const newSolutionValue: string = (document.getElementById('solutionNumber') as HTMLInputElement).value.toString()
        .trim()

    if (newSolutionValue !== '' && currentSolution !== Number.parseInt(newSolutionValue)) {
        dispatch(LoadingNewPhotosNowAction(Number.parseInt(newSolutionValue)))
        dispatch(fetchPhotos(Number.parseInt(newSolutionValue)))
    }
}

const inputValueChanged = (dispatch: Dispatch<any>) => dispatch(ChangedInputValueAction())


export const MarsViewerConfiguration = (): JSX.Element => {
    const currentSolution: number = useSelector((state: MarsViewerState) => state.currentSelectedSolution)
    const dispatch: Dispatch<any> = useDispatch()

    return (
        <div className={Style.marsViewer__settings}>
            <input className={Style.marsViewer__settings_input} id="solutionNumber" type="number" defaultValue="1"
                   min="1" onChange={() => inputValueChanged(dispatch)}/>
            <button className={Style.marsViewer__settings_button}
                    onClick={() => loadNewPhotosPack(dispatch, currentSolution)}>
                Load solution
            </button>
        </div>
    )
}