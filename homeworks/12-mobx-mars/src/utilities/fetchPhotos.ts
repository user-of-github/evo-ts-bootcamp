import {FetchedData} from '../types/types'
import {getApi} from './getAPI'
import {MarsViewerState} from '../store/marsViewerState'


export const fetchPhotos = (marsViewerInstance: MarsViewerState): void => {
    marsViewerInstance.loaded = false
    marsViewerInstance.loading = true

    fetch(getApi(marsViewerInstance.currentSolution))
        .then((response: Response) => response.json())
        .then(json => {
            marsViewerInstance.photosToShow = []

            json.photos.forEach((item: FetchedData) => marsViewerInstance.photosToShow.push({
                link: item.img_src,
                id: item.id,
                cameraName: item.camera.full_name,
                roverName: item.rover.name
            }))

            marsViewerInstance.alreadyLoaded.set(marsViewerInstance.currentSolution,
                marsViewerInstance.photosToShow.slice())

            marsViewerInstance.loaded = true
            marsViewerInstance.loading = false
        })
}