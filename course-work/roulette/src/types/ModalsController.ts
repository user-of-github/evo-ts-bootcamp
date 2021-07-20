import {ResultsHistoryItem} from './ResultsHistoryItem'

export interface ModalsController {
    modalWarningActive: boolean
    modalWarningText: string
    modalResultActive: boolean
    modalInformationActive: boolean
    modalPreviousResultActive: boolean
    modalPreviousResultData: ResultsHistoryItem | null
}