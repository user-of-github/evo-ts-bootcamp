import React from 'react'
import {Provider} from 'react-redux'
import {Header} from './header'
import {marsStore} from '../store/marsViewerStore'
import {MarsViewer} from './marsViewer/App'

export const App = (): JSX.Element => (
    <>
        <Header/>
        <div className="container">
            <Provider store={marsStore}>
                <MarsViewer />
            </Provider>
        </div>
    </>
)