import React from 'react'
import {MarsViewerState} from '../../store/marsViewerState'
import Style from './tabChooser.module.css'
import {Tab} from "../../types/types";
import {observer} from "mobx-react-lite";

const LOAD_PHOTOS_BTN_TITLE: string = 'Load photos'
const SHOW_FAVOURITES_BTN_TITLE: string = 'Show favourites'

export const MarsViewerTabChooser = observer((props: { state: MarsViewerState }): JSX.Element => (
    <section className={Style.marsViewerTabChooser}>
        <button className={`${Style.marsViewerTabChooserButton} ${props.state.activeTab === Tab.GALLERY ? Style.active :
            ''}`} onClick={() => props.state.changeTab(Tab.GALLERY)}>{LOAD_PHOTOS_BTN_TITLE}</button>
        <button
            className={`${Style.marsViewerTabChooserButton} ${props.state.activeTab === Tab.FAVOURITES ? Style.active :
                ''}`} onClick={() => props.state.changeTab(Tab.FAVOURITES)}>{SHOW_FAVOURITES_BTN_TITLE}</button>
    </section>
))