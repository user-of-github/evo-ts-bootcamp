import {BoardCell} from './BoardCell'


export interface Board {
    activeForBets: boolean
    cells: Array<BoardCell>
}