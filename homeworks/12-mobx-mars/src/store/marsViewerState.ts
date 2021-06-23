import {makeAutoObservable} from 'mobx'
import {IMarsViewerState, PhotoType, Tab} from '../types/types'
import {fetchPhotos} from '../utilities/fetchPhotos'


export class MarsViewerState implements IMarsViewerState {
    public activeTab: Tab = Tab.GALLERY
    public currentSolution: number = 0
    public photosToShow: Array<PhotoType> = new Array<PhotoType>()
    public favourites: Map<string, PhotoType> = new Map<string, PhotoType>()
    public alreadyLoaded: Map<number, Array<PhotoType>> = new Map<number, Array<PhotoType>>()
    public loaded: boolean = false
    public loading: boolean = false

    public constructor(defaultSolution: number) {
        this.currentSolution = defaultSolution
        makeAutoObservable(this, {}, {deep: true})
    }

    public loadNewSolution(): void {
        !this.loading && fetchPhotos(this)
    }

    public changeTab(newTab: Tab) {
        if (newTab === this.activeTab)
            return

        this.activeTab = newTab
    }
}