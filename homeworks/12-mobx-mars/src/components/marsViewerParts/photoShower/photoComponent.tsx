import {observer} from 'mobx-react-lite'

import {PhotoType} from '../../../types/types'

import {MarsViewerState} from '../../../store/marsViewerState'

import Style from './photoComponent.module.css'


const toggleFavouritesBtnClicked = (photo: PhotoType, mvInstance: MarsViewerState): void => {
    mvInstance.favourites.has(photo.id)
        ? mvInstance.favourites.delete(photo.id)
        : mvInstance.favourites.set(photo.id, photo)
}

export const PhotoComponent = observer((props: { photo: PhotoType, mvInstance: MarsViewerState }) => (
    <div className={Style.MarsViewerPhotoShowerImageBlock}
         key={props.photo.id}>
        <img src={props.photo.link}
             className={Style.MarsViewerPhotoShowerImageBlockImg}
             alt={props.photo.id}
             title={props.photo.id}/>

        <svg className={`${Style.like} ${props.mvInstance.favourites.has(props.photo.id) ? Style.liked : ''}`}
             xmlns="http://www.w3.org/2000/svg" x="0px"
             y="0px" width="30px"
             height="30px"
             viewBox="0 0 391.837 391.837"
             onClick={() => toggleFavouritesBtnClicked(props.photo, props.mvInstance)}>
            <path d="M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58
		c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0
		c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"/>
        </svg>

        <span
            className={Style.information}>{`Rover: ${props.photo.roverName} | Camera: ${props.photo.cameraName}`}</span>
    </div>
))
