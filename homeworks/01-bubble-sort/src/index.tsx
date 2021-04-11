import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {App} from './components/App'
import {GenerateRandomArray} from './utilities/randomArray'
import {BubbleSortNumbers} from './utilities/sort'

const LATENCY: number = 200,
    MAXIMUM_ARRAY_ELEMENT: number = 30,
    ARRAY_LENGTH: number = 20

ReactDOM.render(
    <React.StrictMode>

        <App arrayLength={ARRAY_LENGTH}
             maximumArrayElement={MAXIMUM_ARRAY_ELEMENT}
             latency={LATENCY}
             randomizer={GenerateRandomArray}
             sorter={BubbleSortNumbers}/>

    </React.StrictMode>,
    document.getElementById('root')
)

