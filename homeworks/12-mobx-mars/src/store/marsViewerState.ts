import {makeAutoObservable} from 'mobx'
import {IMarsViewerState, PhotoType, Tab} from '../types/types'
import {fetchPhotos} from '../utilities/fetchPhotos'


export class MarsViewerState implements IMarsViewerState {
    activeTab: Tab = Tab.GALLERY
    currentSolution: number = 0
    photosToShow: Array<PhotoType> = new Array<PhotoType>()
    favourites: Set<PhotoType> = new Set<PhotoType>()
    loaded: boolean = false
    loading: boolean = false

    public constructor(defaultSolution: number) {
        makeAutoObservable(this, {}, {deep: true})
    }

    public loadNewSolution(): void {
        if (!this.loaded && !this.loading)
            fetchPhotos(this)
    }

    public changeTab(newTab: Tab) {
        console.log('called' + this.activeTab + newTab)
        if (newTab === this.activeTab)
            return

        switch (newTab) {
            case Tab.GALLERY:
                this.loading = false
                this.loaded = false
                this.photosToShow = []
                break
            case Tab.FAVOURITES:
                this.loading = false
                this.loaded = false
                break
        }

        this.activeTab = newTab
    }
}