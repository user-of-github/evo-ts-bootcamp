import React from 'react'
import {MarsViewerState} from '../../store/marsViewerState'
import {observer} from 'mobx-react-lite'
import {MarsViewerTabChooser} from './tabChooser'
import {MarsViewerConfiguration} from './configuration'

export const MarsViewerMain = observer((props: { data: MarsViewerState }) => (
    <>
        <MarsViewerTabChooser state={props.data}/>
        <MarsViewerConfiguration state={props.data}/>
    </>
))
