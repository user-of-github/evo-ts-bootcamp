import {useDispatch, useSelector} from 'react-redux'
import {Dispatch} from 'redux'

import {getApi} from '../../../utilities/getApi'
import {loadingNewPhotosNowAction, loadedNewPhotosAction, changedInputValueAction} from '../../../types/action'
import {MarsViewerState, MarsViewerTab} from '../../../types/state'

import Style from './congiguration.module.css'


const fetchPhotos = (solutionNumber: number) => {
    return (dispatch: any) => {
        fetch(getApi(solutionNumber))
            .then(response => response.json())
            .then(json => {
                const response: Array<string> = []
                json.photos.forEach((item: any) => response.push(item.img_src))

                dispatch(loadedNewPhotosAction(response))
            })
    }
}

const loadNewPhotosPack = (dispatch: Dispatch<any>, currentSolution: number, loaded: boolean) => {
    const newSolutionValue: string = (document.getElementById('solutionNumber') as HTMLInputElement).value.toString()
        .trim()

    const newSolution: number = Number.parseInt(newSolutionValue)

    if (newSolution === currentSolution && !loaded) {
        dispatch(loadingNewPhotosNowAction(Number.parseInt(newSolutionValue)))
        dispatch(fetchPhotos(Number.parseInt(newSolutionValue)))
        return
    }

    if (newSolution === currentSolution)
        return


    if (newSolutionValue !== '' && currentSolution !== Number.parseInt(newSolutionValue)) {
        dispatch(loadingNewPhotosNowAction(Number.parseInt(newSolutionValue)))
        dispatch(fetchPhotos(Number.parseInt(newSolutionValue)))
    }
}

const inputValueChanged = (dispatch: Dispatch<any>) => dispatch(changedInputValueAction())


export const MarsViewerConfiguration = (): JSX.Element => {
    const currentSolution: number = useSelector((state: MarsViewerState) => state.currentSelectedSolution)
    const currentTab: MarsViewerTab = useSelector((state: MarsViewerState) => state.activeTab)
    const loaded: boolean = useSelector((state: MarsViewerState) => state.loaded)
    const loading: boolean = useSelector((state: MarsViewerState) => state.loading)

    const dispatch: Dispatch<any> = useDispatch()

    return (
        <>
            {
                currentTab === MarsViewerTab.CHOOSE_SOLUTION
                    ?
                    <div className={Style.marsViewer__settings}>
                        <input className={Style.marsViewer__settings_input}
                               id="solutionNumber"
                               type="number"
                               defaultValue={currentSolution}
                               min="1"
                               onChange={() => inputValueChanged(dispatch)}/>

                        <button className={Style.marsViewer__settings_button}
                                onClick={() => loadNewPhotosPack(dispatch, currentSolution, loaded)}
                                disabled={loading}>
                            Load solution
                        </button>
                    </div>
                    :
                    <></>
            }

        </>
    )
}