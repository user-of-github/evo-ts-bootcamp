import {observer} from 'mobx-react-lite'

import {PhotoType, Tab} from '../../../types/types'

import {MarsViewerState} from '../../../store/marsViewerState'

import {LoadingAnimation} from '../loadingAnimation/loadingAnimation'
import {PhotoComponent} from './photoComponent'

import Style from './photoShower.module.css'

const LOADING_SPAN_TITLE: string = 'Photos are loading ...'
const NOT_LOADED_SPAN_TITLE: string = 'Photos are not loaded yet'
const NO_PHOTOS_SPAN_TITLE: string = 'No photos in current solution'
const NO_FAVOURITE_PHOTOS: string = 'No favourite photos yet. Add the best ones to here !'
const LOADING_ANIMATION_SIZE: number = 150


export const MarsViewerPhotoShower = observer((props: { state: MarsViewerState }) => (
    <section className={Style.MarsViewerPhotoShower}>
        <div className={Style.container}>
            {
                props.state.activeTab === Tab.GALLERY
                    ?
                    props.state.loading
                        ?
                        <>
                            <span className={Style.message}>{LOADING_SPAN_TITLE}</span>
                            <LoadingAnimation size={LOADING_ANIMATION_SIZE}/>
                        </>
                        :
                        !props.state.loaded
                            ?
                            <span className={Style.message}>{NOT_LOADED_SPAN_TITLE}</span>
                            :
                            props.state.photosToShow.length === 0
                                ?
                                <span className={Style.message}>{NO_PHOTOS_SPAN_TITLE}</span>
                                :
                                <div className={Style.MarsViewerPhotoShowerGallery}>
                                    {
                                        props.state.photosToShow.map((item: PhotoType) =>
                                            <PhotoComponent photo={item} mvInstance={props.state}/>)
                                    }
                                </div>
                    :
                    props.state.favourites.size === 0
                        ?
                        <span className={Style.message}>{NO_FAVOURITE_PHOTOS}</span>
                        :
                        <div className={Style.MarsViewerPhotoShowerGallery}>
                            {
                                Array.from(props.state.favourites)
                                    .map((item: any) => <PhotoComponent photo={item[1]}
                                                                        mvInstance={props.state}/>)
                            }
                        </div>
            }
        </div>
    </section>
))