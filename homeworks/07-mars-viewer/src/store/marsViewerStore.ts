import {applyMiddleware, createStore, Reducer} from 'redux'
import {MarsViewerState, MarsViewerTab} from '../Types/state'
import {changeSolutionReducer} from '../reducer/changeSolutionReducer'
import {MarsViewerAction} from '../Types/action'
import thunk from 'redux-thunk'

let defaultMarsViewerState: MarsViewerState = {
    currentSelectedSolution: 0,
    loading: false,
    loaded: false,
    imagesLinks: [],
    alreadyLoadedImageLinks: new Map<number, Array<string>>(),
    activeTab: MarsViewerTab.CHOOSE_SOLUTION
}

export const marsStore = createStore(changeSolutionReducer as Reducer<MarsViewerState, MarsViewerAction>,
    defaultMarsViewerState, applyMiddleware(thunk))