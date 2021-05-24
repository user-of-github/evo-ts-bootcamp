import {NUMBER_OF_BLOCKS, SCREEN_PADDING} from './configuration'
import {BlockType, Point} from './types'
import {GameState} from './types'

export const resizeApp = (app: HTMLDivElement): void => {
    const windowWidth: number = document.body.clientWidth
    const windowHeight: number = document.body.clientHeight

    const appSideLength = Math.min(windowWidth, windowHeight) - SCREEN_PADDING * 2

    app.style.width = app.style.height = appSideLength.toString() + 'px'
}


export const firstRenderApp = (app: HTMLDivElement, field: BlockType[][]): void => {
    for (let row: number = 0; row < NUMBER_OF_BLOCKS; ++row) {
        for (let col: number = 0; col < NUMBER_OF_BLOCKS; ++col) {
            const newBlock = `<div class="app__block ${field[row][col] === BlockType.WINDOW ? 'app__block-window' :
                'app__block-wall'}" data-row="${row}" data-col="${col}"></div>`
            app.innerHTML += newBlock
        }
    }
}


export const renderState = (state: GameState, totallyClicked: HTMLSpanElement,
                            successfullyClicked: HTMLSpanElement): void => {
    totallyClicked.textContent = state.clicked.toString()
    successfullyClicked.textContent = state.fed.toString()
}

const generateQuery = (position: Point) => `[data-row="${position.row}"][data-col="${position.column}"]`

const findDiv = (position: Point): HTMLDivElement => {
    const all: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName(
        'app__block') as HTMLCollectionOf<HTMLDivElement>
    for (let index: number = 0; index < all.length; ++index)
        if (all[index].getAttribute('data-row') === position.row.toString() && all[index].getAttribute('data-col') ===
            position.column.toString())
            return all[index]
}

export const renderCat = (position: Point): void => {
    const searchedDiv: HTMLDivElement = findDiv(position)
    searchedDiv.classList.remove('app__block-window')
    searchedDiv.classList.add('app__block-cat')
}

export const moveCat = (state: GameState, positionToRemember: Point) => {
    const searchedDiv: HTMLDivElement = findDiv(positionToRemember)
    searchedDiv.classList.remove('app__block-cat')
    searchedDiv.classList.add('app__block-window')

    renderCat(state.catPosition)
}