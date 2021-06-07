export interface PhotoType {
    link: string
    id: string
}

export enum Tab {
    GALLERY = 'GALLERY',
    FAVOURITES = 'FAVOURITES'
}

export interface IMarsViewerState {
    activeTab: Tab
    currentSolution: number
    photosToShow: Array<PhotoType>
    favourites: Set<PhotoType>
    loaded: boolean
    loading: boolean
}