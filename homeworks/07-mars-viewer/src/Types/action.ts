export enum MarsViewerActionType {
    LOADED_NEW = 'LOADED_NEW',
    LOADING_NOW = 'LOADING_NOW',
    OTHER = 'OTHER',
    INPUT_VALUE_CHANGED = 'INPUT_VALUE_CHANGED'
}

export interface MarsViewerAction {
    type: MarsViewerActionType,
    payload: any
}


export const LoadedNewPhotosAction = (payloadValue: Array<string>) => {
    const response: MarsViewerAction = {
        type: MarsViewerActionType.LOADED_NEW,
        payload: payloadValue
    }
    return response
}

export const LoadingNewPhotosNowAction = (newSolution: number) => {
    const response:MarsViewerAction = {
        type: MarsViewerActionType.LOADING_NOW,
        payload: newSolution
    }
    return response
}

export const EmptyAction = () => {
    const response: MarsViewerAction = {
        type: MarsViewerActionType.OTHER,
        payload: null
    }
    return response
}

export const ChangedInputValueAction = () => {
    const response: MarsViewerAction = {
        type: MarsViewerActionType.INPUT_VALUE_CHANGED,
        payload: null
    }
    return response
}


