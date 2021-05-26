import {MarsViewerState} from '../types/state'
import {MarsViewerAction, MarsViewerActionType} from '../types/action'


export const changeSolutionReducer = (state: MarsViewerState, action: MarsViewerAction) => {
    switch (action.type) {
        case MarsViewerActionType.LOADED_NEW:
            return {...state, imagesLinks: action.payload, loaded: true, loading: false}
        case MarsViewerActionType.LOADING_NOW:
            return {...state, imagesLinks: [], loaded: false, loading: true, currentSelectedSolution: action.payload}
        case MarsViewerActionType.INPUT_VALUE_CHANGED:
            return {...state, imagesLinks: [], loaded: false, loading: false}
        case MarsViewerActionType.TAB_CHANGED:
            return {...state, imagesLinks: [], loaded: false, loading: false, activeTab: action.payload}
        case MarsViewerActionType.FAVOURITE_STATUS_CHANGED:
            return {...state, favourites: action.payload}
        default:
            return state
    }
}