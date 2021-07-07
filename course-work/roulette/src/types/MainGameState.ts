import {makeAutoObservable} from 'mobx'
import {Board} from './Board'
import {Chip} from './Chip'
import {BaseGameState} from './BaseGameState'
import {createBoardForBets} from '../utilities/boardCreator'
import {getGameChips} from '../utilities/gameChipsGetter'
import {BoardCell} from './BoardCell'

const DEFAULT_START_BALANCE: number = 10000

export class MainGameState {
    public board: Board
    public currentStage: BaseGameState
    public userBalance: number
    public totalCurrentBet: number
    public chipActiveIndex: number
    public chipsSet: Array<Chip>

    public constructor(startBalance: number = DEFAULT_START_BALANCE) {
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
        if (this.userBalance >= this.chipsSet[this.chipActiveIndex].chip) {
            cell.chipsPlaced.push(this.chipsSet[this.chipActiveIndex])
            this.userBalance -= this.chipsSet[this.chipActiveIndex].chip
            this.totalCurrentBet += this.chipsSet[this.chipActiveIndex].chip
        }
    }

    public cancelBets(): void {
        this.userBalance += this.totalCurrentBet
        this.totalCurrentBet = 0
        this.clearBetsFromBoard()
    }

    private clearBetsFromBoard(): void {
        this.board.cells.forEach((cell: BoardCell) => cell.chipsPlaced.length = 0)
    }
}