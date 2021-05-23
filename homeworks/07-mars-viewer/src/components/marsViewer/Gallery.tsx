import {useDispatch, useSelector} from 'react-redux'
import {MarsViewerState} from '../../Types/state'
import Style from './Gallery.module.css'
import {Dispatch} from 'redux'

export const MarsViewerGallery = (): JSX.Element => {

    const dispatch: Dispatch<any> = useDispatch()
    const photos: Array<string> = useSelector((state: MarsViewerState) => state.imagesLinks)
    const loaded: boolean = useSelector((state: MarsViewerState) => state.loaded)
    const loading: boolean = useSelector((state: MarsViewerState) => state.loading)

    return (
        <div className={Style.marsViewer__app}>
            {
                !loaded
                    ?
                    !loading
                        ?
                        <span className={Style.marsViewer__app_notLoadedWarning}>Not loaded</span>
                        :
                        <></>
                    :
                    photos.length
                        ?
                        <>
                            <div className={Style.marsViewer__app_container}>
                                {
                                    photos.map((item: string) => (
                                        <div className={Style.marsViewer__app_imageBlock}>
                                            <img src={item} alt="picture"/>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                        :
                        <span className={Style.marsViewer__app_notLoadedWarning}>No photos</span>
            }
            {
                loading
                    ?
                    <span className={Style.marsViewer__app_notLoadedWarning}>Loading</span>
                    :
                    <></>
            }
        </div>)
}