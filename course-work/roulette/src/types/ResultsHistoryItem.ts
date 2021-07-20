import {RouletteSpot} from './Spot'


export interface ResultsHistoryItem {
    result: RouletteSpot
    award: number
    time: Date
    totalUserBet: number
}