import {getApi} from './getAPI'
import {IMarsViewerState} from '../types/types'

export const fetchPhotos = (marsViewerInstance: IMarsViewerState): void => {
    marsViewerInstance.loaded = false
    marsViewerInstance.loading = true

    fetch(getApi(marsViewerInstance.currentSolution))
        .then(response => response.json())
        .then(json => {
            marsViewerInstance.photosToShow = []

            json.photos.forEach((item: any) => marsViewerInstance.photosToShow.push({
                link: item.img_src,
                id: item.id
            }))

            marsViewerInstance.loaded = true
            marsViewerInstance.loading = false
        })
}