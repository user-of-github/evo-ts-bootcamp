import {makeAutoObservable} from 'mobx'

export class LifeCanvasState {
    private static readonly DEFAULT_FIELD_SIDE_SIZE: number = 20
    public static readonly MAXIMUM_SIDE_SIZE: number = 40
    public static readonly MINIMUM_SIDE_SIZE: number = 5

    private static readonly DEFAULT_LATENCY: number = 500
    public static readonly MINIMAL_LATENCY: number = 10
    public static readonly MAXIMUM_LATENCY: number = 1000

    public field: Array<Array<boolean>> = new Array<Array<boolean>>()
    private fieldSideSize: number
    private renderGrid: boolean = true
    private renderCanvasFunction: () => void
    private inProcess: boolean = false
    private wasEvolution: boolean = false
    private timingDelay: number
    private timerID: number = NaN

    public constructor() {
        this.fieldSideSize = LifeCanvasState.DEFAULT_FIELD_SIDE_SIZE
        this.timingDelay = LifeCanvasState.DEFAULT_LATENCY

        this.makeEmptyArray(this.field)

        this.renderCanvasFunction = () => {
        }
        makeAutoObservable(this, {}, {deep: true})
    }

    public changeSize(newSize: number): void {
        if (newSize >= LifeCanvasState.MINIMUM_SIDE_SIZE && newSize <= LifeCanvasState.MAXIMUM_SIDE_SIZE)
            this.fieldSideSize = newSize
        else
            return

        this.makeEmptyArray(this.field)
        this.renderCanvasFunction()
        this.inProcess && this.stopEvolution()
    }

    public changeLatency(newLatency: number): void {
        if (newLatency >= LifeCanvasState.MINIMAL_LATENCY && newLatency <= LifeCanvasState.MAXIMUM_LATENCY)
            this.timingDelay = newLatency
    }

    public runEvolution(): void {
        this.inProcess = true
        this.wasEvolution = true
        this.runEvolutionRecursive()
    }

    public stopEvolution(): void {
        this.inProcess = false
        window.clearTimeout(this.timerID)
    }

    public getFieldSize(): number {
        return this.fieldSideSize
    }

    public getLatency(): number {
        return this.timingDelay
    }

    public registerRenderingFunction(func: () => void): void {
        this.renderCanvasFunction = func
    }

    public changeGridDrawingFlag(): void {
        this.renderGrid = !this.renderGrid
        this.renderCanvasFunction()
    }

    public getGridDrawingFlag(): boolean {
        return this.renderGrid
    }

    public getWasEvolutionOrNot(): boolean {
        return this.wasEvolution
    }

    public getInProgressState(): boolean {
        return this.inProcess
    }

    private makeEmptyArray(array: Array<Array<boolean>>): void {
        array.length = 0
        for (let row: number = 0; row < this.fieldSideSize; ++row) {
            const newRow: Array<boolean> = Array<boolean>(this.fieldSideSize);
            for (let col: number = 0; col < this.fieldSideSize; ++col)
                newRow[col] = false

            array.push(newRow)
        }
    }

    private countNumberOfNeighbours(exploredRow: number, exploredCol: number, field: Array<Array<boolean>>): number {
        let response: number = 0
        for (let rowDelta: number = -1; rowDelta <= 1; ++rowDelta) {
            for (let colDelta: number = -1; colDelta <= 1; ++colDelta) {
                const y: number = exploredRow + rowDelta
                const x: number = exploredCol + colDelta

                if (y === exploredRow && x === exploredCol)
                    continue

                response += (x < this.fieldSideSize && x >= 0 && y >= 0 && y < this.fieldSideSize)
                    ? (field[y][x] ? 1 : 0) : 0
            }
        }
        return response
    }

    private nextStepOfEvolution(): void {
        const newStep: Array<Array<boolean>> = Array<Array<boolean>>()
        this.makeEmptyArray(newStep)
        for (let row: number = 0; row < this.fieldSideSize; ++row) {
            for (let col: number = 0; col < this.fieldSideSize; ++col) {
                const numberOfNeighbours: number = this.countNumberOfNeighbours(row, col, this.field)

                if (!this.field[row][col])  // currently dead
                    newStep[row][col] = (numberOfNeighbours === 3)
                else  // currently alive
                    switch (true) {
                        case (numberOfNeighbours < 2):
                            newStep[row][col] = false
                            break
                        case (numberOfNeighbours === 2 || numberOfNeighbours === 3):
                            newStep[row][col] = true
                            break
                        default:
                            newStep[row][col] = false
                            break
                    }
            }
        }

        if (this.checkIfFieldChanged(newStep)) {
            this.wasEvolution = true
            this.field = newStep
        } else {
            this.wasEvolution = false
        }
    }


    private runEvolutionRecursive(): void {
        this.timerID = window.setTimeout(() => {
            this.nextStepOfEvolution()
            this.renderCanvasFunction()
            this.runEvolutionRecursive()
        }, this.timingDelay)
    }


    private checkIfFieldChanged(newField: Array<Array<boolean>>): boolean {
        for (let row: number = 0; row < this.fieldSideSize; ++row)
            for (let col: number = 0; col < this.fieldSideSize; ++col)
                if (newField[row][col] !== this.field[row][col])
                    return true

        return false
    }
}