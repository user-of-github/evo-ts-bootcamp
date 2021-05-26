import React, {Dispatch} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {tabChanged} from '../../../types/action'
import {MarsViewerState, MarsViewerTab} from '../../../types/state'

import Style from './tab.module.css'


const changeTab = (dispatch: Dispatch<any>, isCurrentlyActive: boolean, tab: MarsViewerTab) =>
    !isCurrentlyActive && dispatch(tabChanged(tab))


export const MarsViewerTabChooser = (): JSX.Element => {
    const currentTab: MarsViewerTab = useSelector((state: MarsViewerState) => state.activeTab)
    const dispatch: Dispatch<any> = useDispatch()

    return (
        <>
            <div className={Style.marsViewer__tab}>
                <button
                    className={`${Style.tab} ${currentTab === MarsViewerTab.CHOOSE_SOLUTION ? Style.active : ''}`}
                    onClick={() => changeTab(dispatch, currentTab === MarsViewerTab.CHOOSE_SOLUTION,
                        MarsViewerTab.CHOOSE_SOLUTION)}>
                    Photos
                </button>
                <button
                    className={`${Style.tab} ${currentTab === MarsViewerTab.FAVOURITE_PHOTOS ? Style.active : ''}`}
                    onClick={() => changeTab(dispatch, currentTab === MarsViewerTab.FAVOURITE_PHOTOS,
                        MarsViewerTab.FAVOURITE_PHOTOS)}>
                    Favourites
                </button>
            </div>
        </>
    )
}