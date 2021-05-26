import {Dispatch} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {MarsViewerState} from '../../../types/state'
import {changeFavouriteStatus} from './galleryUtils'

import Style from './gallery.module.css'


export const MarsViewerFavourites = (): JSX.Element => {
    const dispatch: Dispatch<any> = useDispatch()
    const favourites: Set<string> = useSelector((state: MarsViewerState) => state.favourites)

    return (
        <div className={Style.marsViewer__gallery}>
            {
                !favourites.size
                    ?
                    <span className={Style.marsViewer__gallery_warning}>No favourite photos</span>
                    :
                    <div className={Style.marsViewer__gallery_container}>
                        {
                            Array.from(favourites).map((item: string) => (
                                <div className={Style.marsViewer__gallery_imageBlock} key={item}>
                                    <img src={item} alt="picture"/>
                                    <svg className={`${Style.like} ${favourites.has(item) ? Style.liked : ''}`}
                                         xmlns="http://www.w3.org/2000/svg" x="0px"
                                         y="0px" width="24px"
                                         height="24px" viewBox="0 0 391.837 391.837"
                                         onClick={() => changeFavouriteStatus(dispatch, item, favourites)}>
                                        <path d="M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58
		c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0
		c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"/>
                                    </svg>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}