import {applyMiddleware, createStore, Reducer} from 'redux'
import thunk from 'redux-thunk'

import {MarsViewerState, MarsViewerTab} from '../types/state'
import {MarsViewerAction} from '../types/action'
import {changeSolutionReducer} from '../reducer/changeSolutionReducer'


let defaultMarsViewerState: MarsViewerState = {
    currentSelectedSolution: 1,
    loading: false,
    loaded: false,
    imagesLinks: [],
    activeTab: MarsViewerTab.CHOOSE_SOLUTION,
    favourites: new Set<string>()
}

export const marsStore = createStore(changeSolutionReducer as Reducer<MarsViewerState, MarsViewerAction>,
    defaultMarsViewerState, applyMiddleware(thunk))