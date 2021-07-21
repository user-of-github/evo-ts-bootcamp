import {ModalsController} from './ModalsController'

export interface SettingsState {
    voiceTurnedOn: boolean
    toHighlightLastResult: boolean
    toShowCoefficientsTable: boolean
    toShowResultsHistory: boolean
    modalsState: ModalsController
    currentTime: Date
    loading: boolean
}