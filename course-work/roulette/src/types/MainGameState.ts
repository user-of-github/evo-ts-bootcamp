import {makeAutoObservable} from 'mobx'

import {Board} from './Board'
import {Chip} from './Chip'
import {BaseGameState} from './BaseGameState'
import {RouletteSpot, Spot, SpotColor, SpotValueType} from './Spot'
import {HighlightedCellsOnHover} from './HighlightedCellsOnHover'
import {ModalsController} from './ModalsController'
import {ResultsHistoryItem} from './ResultsHistoryItem'
import {RouletteWorld3D} from './RouletteWorld3D'

import {createBoardForBets} from '../utilities/boardCreator'
import {getGameChips} from '../utilities/gameChipsGetter'
import {backgroundMusicSoundRef,} from '../utilities/sounds'
import {Sound} from './Sound'


export class MainGameState {
    private static readonly DEFAULT_START_BALANCE: number = 5000
    public static readonly COEFFICIENTS: Map<SpotValueType, number> = MainGameState.getGameCoefficients()
    private readonly spotsOnRoulette: Array<RouletteSpot>

    public board: Board
    public currentStage: BaseGameState
    public userBalance: number
    public totalCurrentBet: number
    public chipActiveIndex: number
    public chipsSet: Array<Chip>
    public currentlyHighlightedCells: HighlightedCellsOnHover | null
    public modalsState: ModalsController
    public resultsHistory: Array<ResultsHistoryItem>
    public wayTo3DWorld: RouletteWorld3D | null
    public voiceTurnedOn: boolean
    public toHighlightLastResult: boolean = false
    public toShowCoefficientsTable: boolean = false
    public toShowResultsHistory: boolean = false


    public constructor(startBalance: number = MainGameState.DEFAULT_START_BALANCE) {
        this.userBalance = startBalance
        this.currentStage = BaseGameState.BETS_PLACING
        this.totalCurrentBet = 0
        this.board = createBoardForBets()
        this.chipsSet = getGameChips()
        this.chipActiveIndex = 1
        this.chipsSet[this.chipActiveIndex].active = true
        this.currentlyHighlightedCells = null
        this.wayTo3DWorld = null
        this.voiceTurnedOn = true

        this.modalsState = {
            modalWarningActive: false,
            modalResultActive: false,
            modalWarningText: ''
        }

        makeAutoObservable(this, {}, {deep: true})

        this.spotsOnRoulette = this.formRouletteSpotsArray()
        this.resultsHistory = Array<ResultsHistoryItem>()
    }

    public reselectChip(newIndex: number): void {
        if (this.chipActiveIndex === newIndex)
            return

        this.chipsSet[this.chipActiveIndex].active = false
        this.chipActiveIndex = newIndex
        this.chipsSet[this.chipActiveIndex].active = true
    }

    public putChipOnCell(cell: Spot): void {
        if (this.userBalance < this.chipsSet[this.chipActiveIndex].chip)
            return

        cell.chipsPlaced.push(this.chipsSet[this.chipActiveIndex])
        this.userBalance -= this.chipsSet[this.chipActiveIndex].chip
        this.totalCurrentBet += this.chipsSet[this.chipActiveIndex].chip
        cell.totalBet += this.chipsSet[this.chipActiveIndex].chip
    }

    public cancelBets(): void {
        this.userBalance += this.totalCurrentBet
        this.totalCurrentBet = 0
        this.clearBoardFromBets()
    }

    private formRouletteSpotsArray(): Array<RouletteSpot> {
        const response: Array<RouletteSpot> = Array<RouletteSpot>(37)
        this.board.spots.forEach((spot: Spot) => {
            if (spot.type === SpotValueType.EXACT_NUMBER)
                response[spot.value as number] = {color: spot.color, value: spot.value as number}
        })

        return response
    }

    private checkIfBetWon(spot: Spot, rouletteResult: number): boolean {
        switch (spot.type) {
            case SpotValueType.EVEN_ONLY:
                return this.spotsOnRoulette[rouletteResult].value % 2 === 0
            case SpotValueType.ODD_ONLY:
                return this.spotsOnRoulette[rouletteResult].value % 2 === 1
            case SpotValueType.EXACT_NUMBER:
                return spot.value === this.spotsOnRoulette[rouletteResult].value
            case SpotValueType.BLACK_ONLY:
                return this.spotsOnRoulette[rouletteResult].color === SpotColor.BLACK
            case SpotValueType.RED_ONLY:
                return this.spotsOnRoulette[rouletteResult].color === SpotColor.RED
            case SpotValueType.FIRST_2_TO_1:
                return this.spotsOnRoulette[rouletteResult].value % 3 === 0
            case SpotValueType.SECOND_2_TO_1:
                return (this.spotsOnRoulette[rouletteResult].value - 2) % 3 === 0
            case SpotValueType.THIRD_2_TO_1:
                return (this.spotsOnRoulette[rouletteResult].value - 1) % 3 === 0
            case SpotValueType.FIRST_TWELVE:
                return this.spotsOnRoulette[rouletteResult].value >= 1
                    && this.spotsOnRoulette[rouletteResult].value <= 12
            case SpotValueType.SECOND_TWELVE:
                return this.spotsOnRoulette[rouletteResult].value >= 13
                    && this.spotsOnRoulette[rouletteResult].value <= 24
            case SpotValueType.THIRD_TWELVE:
                return this.spotsOnRoulette[rouletteResult].value >= 25
                    && this.spotsOnRoulette[rouletteResult].value <= 36
            case SpotValueType.FIRST_HALF:
                return this.spotsOnRoulette[rouletteResult].value >= 1 &&
                    this.spotsOnRoulette[rouletteResult].value <= 18
            case SpotValueType.SECOND_HALF:
                return this.spotsOnRoulette[rouletteResult].value >= 19 &&
                    this.spotsOnRoulette[rouletteResult].value <= 36
        }

        return false
    }

    public countResults(rouletteResult: number): void {
        Sound.playResultAnnouncement(this.voiceTurnedOn, rouletteResult)

        window.setTimeout(() => {
            let totalWin: number = 0
            const onlySpotsWithBets: Array<Spot> = this.board.spots.filter(
                (spot: Spot) => spot.chipsPlaced.length !== 0 && spot.totalBet !== 0)

            onlySpotsWithBets.forEach((spot: Spot) => {
                if (this.checkIfBetWon(spot, rouletteResult))
                    totalWin += spot.totalBet * MainGameState.COEFFICIENTS.get(spot.type)!
            })


            totalWin > 0 && Sound.playWin(this.voiceTurnedOn)
            totalWin === 0 && Sound.playLose(this.voiceTurnedOn)


            this.resultsHistory.push({award: totalWin, result: this.spotsOnRoulette[rouletteResult]})

            this.userBalance += totalWin

            this.totalCurrentBet = 0
            this.modalsState.modalResultActive = true

            this.currentStage = BaseGameState.BETS_PLACING
            this.toHighlightLastResult = true
            window.setTimeout(() => this.toHighlightLastResult = false, 4000)
            window.setTimeout(() => {
                this.clearBoardFromBets()
                this.modalsState.modalResultActive = false
                this.wayTo3DWorld!.moveTheCameraAway()
                this.wayTo3DWorld!.startDefaultAnimations()
            }, 3000)
        }, 2000)
    }

    private clearBoardFromBets(): void {
        this.board.spots.forEach((spot: Spot) => {
            spot.chipsPlaced.length = 0
            spot.totalBet = 0
        })
    }

    public spinRoulette(): void {
        if (this.currentStage === BaseGameState.ROULETTE_SPINNING
            || this.totalCurrentBet === 0)
            return

        this.currentStage = BaseGameState.ROULETTE_SPINNING
        Sound.playSpinningRoulette(this.voiceTurnedOn)
        this.wayTo3DWorld!.startDisperse()
    }

    private static getGameCoefficients(): Map<SpotValueType, number> {
        return new Map<SpotValueType, number>([
            [SpotValueType.EXACT_NUMBER, 36],
            [SpotValueType.RED_ONLY, 2],
            [SpotValueType.BLACK_ONLY, 2],
            [SpotValueType.EVEN_ONLY, 2],
            [SpotValueType.ODD_ONLY, 2],
            [SpotValueType.FIRST_HALF, 2],
            [SpotValueType.SECOND_HALF, 2],
            [SpotValueType.FIRST_TWELVE, 3],
            [SpotValueType.SECOND_TWELVE, 3],
            [SpotValueType.THIRD_TWELVE, 3],
            [SpotValueType.FIRST_2_TO_1, 3],
            [SpotValueType.SECOND_2_TO_1, 3],
            [SpotValueType.THIRD_2_TO_1, 3],
        ])
    }

    public changeSoundState(): void {
        this.voiceTurnedOn = !this.voiceTurnedOn
        if (this.voiceTurnedOn)
            backgroundMusicSoundRef.play()
        else
            backgroundMusicSoundRef.pause()
    }
}