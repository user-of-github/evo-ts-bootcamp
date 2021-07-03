import {makeAutoObservable} from 'mobx'
import {Board} from './Board'
import {Chip} from './Chip'
import {BaseGameState} from './BaseGameState'
import {createBoardForBets} from '../utilities/boardCreator'
import {getGameChips} from '../utilities/gameChipsGetter'
import {BoardCell} from "./BoardCell";

const DEFAULT_START_BALANCE: number = 1000

export class MainGameState {
    public board: Board
    public currentStage: BaseGameState
    public userBalance: number
    public totalCurrentBet: number
    public chipActiveIndex: number
    public chipsSet: Array<Chip>

    public constructor() {
        this.userBalance = DEFAULT_START_BALANCE
        this.currentStage = BaseGameState.BETS_PLACING
        this.totalCurrentBet = 0
        this.board = createBoardForBets()
        this.chipsSet = getGameChips()
        this.chipActiveIndex = 0
        makeAutoObservable(this, {}, {deep: true})
    }

    public reselectChip(newIndex: number): void {
        if (this.chipActiveIndex === newIndex)
            return

        this.chipsSet[this.chipActiveIndex].active = false
        this.chipActiveIndex = newIndex
        this.chipsSet[this.chipActiveIndex].active = true
    }

    public putChipOnCell(cell: BoardCell): void {
        cell.chipsPlaced.push(this.chipsSet[this.chipActiveIndex])
    }
}