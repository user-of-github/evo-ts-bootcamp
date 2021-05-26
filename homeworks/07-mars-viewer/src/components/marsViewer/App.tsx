import {Provider} from 'react-redux'

import {MarsViewerTabChooser} from './tab/tab'
import {MarsViewerConfiguration} from './configuration/configuration'
import {MarsViewerGallery} from './gallery/gallery'

import {marsStore} from '../../store/marsViewerStore'

import Style from './app.module.css'
import './../../index.module.css'


export const MarsViewer = (): JSX.Element => (
    <div className="container">
        <div className={Style.marsViewer}>
            <Provider store={marsStore}>
                <MarsViewerTabChooser/>
                <MarsViewerConfiguration/>
                <MarsViewerGallery/>
            </Provider>
        </div>
    </div>
)