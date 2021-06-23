import {MarsViewerTab} from './state'

export enum MarsViewerActionType {
    LOADED_NEW = 'LOADED_NEW',
    LOADING_NOW = 'LOADING_NOW',
    OTHER = 'OTHER',
    INPUT_VALUE_CHANGED = 'INPUT_VALUE_CHANGED',
    TAB_CHANGED = 'TAB_CHANGED',
    FAVOURITE_STATUS_CHANGED = 'FAVOURITE_STATUS_CHANGED'
}

export interface MarsViewerAction {
    type: MarsViewerActionType,
    payload: any
}


export const loadedNewPhotosAction = (payloadValue: Array<string>): MarsViewerAction => {
    const response: MarsViewerAction = {
        type: MarsViewerActionType.LOADED_NEW,
        payload: payloadValue
    }
    return response
}

export const loadingNewPhotosNowAction = (newSolution: number): MarsViewerAction => {
    const response: MarsViewerAction = {
        type: MarsViewerActionType.LOADING_NOW,
        payload: newSolution
    }
    return response
}

export const emptyAction = (): MarsViewerAction => {
    const response: MarsViewerAction = {
        type: MarsViewerActionType.OTHER,
        payload: null
    }
    return response
}

export const changedInputValueAction = (): MarsViewerAction => {
    const response: MarsViewerAction = {
        type: MarsViewerActionType.INPUT_VALUE_CHANGED,
        payload: null
    }
    return response
}

export const tabChanged = (tab: MarsViewerTab): MarsViewerAction => {
    const response: MarsViewerAction = {
        type: MarsViewerActionType.TAB_CHANGED,
        payload: tab
    }
    return response
}

export const favouriteStatusChanged = (newFavourites: Set<string>): MarsViewerAction => {
    const response: MarsViewerAction = {
        type: MarsViewerActionType.FAVOURITE_STATUS_CHANGED,
        payload: newFavourites
    }
    return response
}

