import React from 'react'
import {observer} from 'mobx-react-lite'

import {Tab} from '../../types/types'
import {MarsViewerState} from '../../store/marsViewerState'

import {MarsViewerTabChooser} from './tabChooser/tabChooser'
import {MarsViewerConfiguration} from './configuration/configuration'
import {MarsViewerPhotoShower} from './photoShower/photoShower'

export const MarsViewerMain = observer((props: { data: MarsViewerState }) => (
    <>
        <MarsViewerTabChooser state={props.data}/>
        {
            props.data.activeTab === Tab.GALLERY
                ?
                <MarsViewerConfiguration state={props.data}/>
                :
                <></>
        }
        <MarsViewerPhotoShower state={props.data}/>
    </>
))
