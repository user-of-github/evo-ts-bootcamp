export interface PhotoType {
    link: string
    id: string
    cameraName: string
    roverName: string
}

export enum Tab {
    GALLERY = 'GALLERY',
    FAVOURITES = 'FAVOURITES'
}

export interface IMarsViewerState {
    activeTab: Tab
    currentSolution: number
    photosToShow: Array<PhotoType>
    favourites: Map<string, PhotoType>
    alreadyLoaded: Map<number, Array<PhotoType>>
    loaded: boolean
    loading: boolean
}

export interface FetchedData {
    img_src: string
    id: string
    camera: {
        full_name: string
    },
    rover: {
        name: string
    }
}