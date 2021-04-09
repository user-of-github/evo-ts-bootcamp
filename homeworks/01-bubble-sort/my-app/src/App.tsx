import React from 'react'
import {Header} from './header'
import {Visualisation} from './svg'
import {Management} from './management'

const App = () => {
    return (<>
        <Header/>
        <main className={"main"}>
            <div className="container">
                <div className="visualization-wrapper">
                    <Visualisation/>
                </div>
                <div className="management">
                    <Management/>
                </div>
            </div>
        </main>
    </>)
}

export default App
