import React from 'react'

import {Header} from './header'
import {MarsViewer} from './marsViewer/app'

export const App = () =>
    <>
        <Header/>
        <div className="container">
            <MarsViewer/>
        </div>
    </>

