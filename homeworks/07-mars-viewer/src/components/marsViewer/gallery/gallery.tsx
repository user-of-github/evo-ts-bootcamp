import {useSelector} from 'react-redux'

import {MarsViewerState, MarsViewerTab} from '../../../types/state'

import React from 'react'
import {MarsViewerAllPhotos} from './galleryAllPhotos'
import {MarsViewerFavourites} from './galleryFavourites'


export const MarsViewerGallery = (): JSX.Element => {
    const currentTab: MarsViewerTab = useSelector((state: MarsViewerState) => state.activeTab)

    return currentTab === MarsViewerTab.CHOOSE_SOLUTION ? <MarsViewerAllPhotos/> : <MarsViewerFavourites/>
}