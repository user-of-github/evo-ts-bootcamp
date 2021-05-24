import {fromEvent, timer} from 'rxjs'
import {scan} from 'rxjs/operators'
import {BlockType, GameState, Point, state} from './types'
import {firstRenderApp, renderCat, moveCat, renderState, resizeApp} from './render'
import {changeCatPosition, generateNewField} from './game-utilities'
import {CAT_TELEPORTATION_DELAY} from './configuration'

const runApplication = (): void => {
    const app: HTMLDivElement = document.getElementById('app') as HTMLDivElement
    const totallyClicked: HTMLSpanElement = document.getElementById('total')
    const successfullyClicked: HTMLSpanElement = document.getElementById('successful')

    const temp = generateNewField()
    state.field = temp.field
    state.windowsCoordinates = temp.coordinates

    resizeApp(app)
    window.addEventListener('resize', () => resizeApp(app))

    firstRenderApp(app, state.field)
    renderState(state, totallyClicked, successfullyClicked)

    const appBlocks: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName(
        'app__block') as HTMLCollectionOf<HTMLDivElement>

    for (let appBlock of appBlocks) {
        fromEvent(appBlock, 'click')
            .pipe(scan((st: GameState) => {
                const row: number = Number.parseInt(appBlock.getAttribute('data-row'))
                const col: number = Number.parseInt(appBlock.getAttribute('data-col'))

                return {
                    clicked: st.clicked + 1,
                    fed: st.fed + (row === st.catPosition.row && col === st.catPosition.column ? 1 : 0),
                    field: st.field,
                    catPosition: st.catPosition,
                    windowsCoordinates: st.windowsCoordinates
                }
            }, state))
            .subscribe((state) => renderState(state, totallyClicked, successfullyClicked))
    }


    changeCatPosition(state)
    renderCat(state.catPosition)
    console.dir(state)
    let positionToRemember: Point = {row: state.catPosition.row, column: state.catPosition.column}

    const sourceTimerCat = timer(CAT_TELEPORTATION_DELAY, CAT_TELEPORTATION_DELAY)
    const subscribeCatTeleportation = sourceTimerCat.subscribe(() => {
        changeCatPosition(state)
        moveCat(state, positionToRemember)
        positionToRemember = {row: state.catPosition.row, column: state.catPosition.column}
    })
}


document.addEventListener('DOMContentLoaded', runApplication)