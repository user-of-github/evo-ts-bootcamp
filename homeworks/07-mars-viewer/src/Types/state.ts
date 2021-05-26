export enum MarsViewerTab {
    CHOOSE_SOLUTION = 'CHOOSE_SOLUTION',
    FAVOURITE_PHOTOS = 'FAVOURITES'
}

export interface MarsViewerState {
    currentSelectedSolution: number
    loading: boolean
    loaded: boolean
    imagesLinks: Array<string>
    activeTab: MarsViewerTab
    favourites: Set<string>
}