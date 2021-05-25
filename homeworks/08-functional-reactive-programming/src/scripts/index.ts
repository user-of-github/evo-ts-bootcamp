import {fromEvent, timer} from 'rxjs'
import {BlockType, Point, state} from './types'
import {firstRenderApp, moveCat, renderState, resizeApp} from './render'
import {changeCatPosition, generateNewField} from './game-utilities'
import {CAT_TELEPORTATION_DELAY} from './configuration'

const runApplication = (): void => {
    const app: HTMLDivElement = document.getElementById('app') as HTMLDivElement

    const sound: HTMLAudioElement = document.getElementById('successFeed') as HTMLAudioElement

    const temp = generateNewField()
    state.field = temp.field
    state.windowsCoordinates = temp.coordinates

    resizeApp(app)
    fromEvent(window, 'resize').subscribe(() => resizeApp(app))

    firstRenderApp(app, state.field)
    renderState(state)

    state.catPosition = state.windowsCoordinates[0]
    let positionToRemember: Point = {row: state.catPosition.row, column: state.catPosition.column}

    const appBlocks: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName(
        'app__block') as HTMLCollectionOf<HTMLDivElement>

    for (const appBlock of appBlocks) {
        fromEvent(appBlock, 'click')
            .subscribe(() => {
                let flag: boolean = false
                if (state.catPosition.row.toString() === appBlock.getAttribute('data-row').trim() &&
                    state.catPosition.column.toString() === appBlock.getAttribute('data-col').trim()) {
                    ++state.fed
                    flag = true
                    sound.play()
                }

                if (state.field[Number.parseInt(appBlock.getAttribute('data-row'))][Number.parseInt(
                    appBlock.getAttribute('data-col'))] === BlockType.WINDOW) {
                    ++state.clicked
                    flag = true
                }

                flag && renderState(state)
            })
    }


    timer(CAT_TELEPORTATION_DELAY, CAT_TELEPORTATION_DELAY).subscribe(() => {
        changeCatPosition(state)
        moveCat(state, positionToRemember)
        positionToRemember = {row: state.catPosition.row, column: state.catPosition.column}
    })


}


document.addEventListener('DOMContentLoaded', runApplication)