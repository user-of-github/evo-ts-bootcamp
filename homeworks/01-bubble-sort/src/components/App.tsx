import React from 'react'
import {Header} from './header'
import {Field} from './field'
import {Management} from './management'
import {CurrentState} from './state'
import style from './app.module.css'

type Params = {
    arrayLength: number,
    maximumArrayElement: number,
    latency: number,
    randomizer: (numberOfElements: number, maximumElement: number) => number[],
    sorter: (array: number[]) => SortResult
}

type State = {
    numbers: number[],
    inProcess: boolean,
    solved: boolean
}

type SortResult = {
    numbers: number[],
    success: boolean,
    wasSwapped: boolean
}

export class App extends React.Component<Params, State> {
    timerID_: any
    arrayLength_: number
    maximumArrayElement_: number
    latency_: number
    randomizerFunction_: (a: number, b: number) => number[]
    sorter_: (array: number[]) => SortResult

    constructor(params: Params) {
        super(params)
        this.arrayLength_ = params.arrayLength
        this.maximumArrayElement_ = params.maximumArrayElement
        this.randomizerFunction_ = params.randomizer
        this.latency_ = params.latency
        this.sorter_ = params.sorter

        this.state = {
            numbers: this.randomizerFunction_(this.arrayLength_, this.maximumArrayElement_),
            solved: false,
            inProcess: false
        }
    }


    Change: React.MouseEventHandler<HTMLButtonElement> = event => {
        window.clearInterval(this.timerID_)
        this.setState({
            numbers: this.randomizerFunction_(this.arrayLength_, this.maximumArrayElement_),
            solved: false,
            inProcess: false
        })
    }

    Run: React.MouseEventHandler<HTMLButtonElement> = event => {
        const {numbers, inProcess} = this.state
        this.setState({inProcess: !inProcess})

        if (inProcess) {
            window.clearInterval(this.timerID_)
            return
        }

        this.timerID_ = window.setInterval(() => {
            const response: SortResult = this.sorter_(numbers)

            if (response.wasSwapped)
                this.setState({numbers: response.numbers, inProcess: true, solved: response.success})

            this.setState({solved: response.success})

            if (this.state.solved) {
                this.setState({inProcess: false})
                window.clearInterval(this.timerID_)
            }
        }, this.latency_)
    }

    componentWillUnmount() {
        clearInterval(this.timerID_)
    }

    render() {
        const {numbers, solved, inProcess} = this.state

        return (<>
                <Header/>
                <main className={style.main}>
                    <div className={style.container}>
                        <Field numbers={numbers}
                               arraySize={this.arrayLength_}
                               maximumElement={this.maximumArrayElement_}/>

                        <Management inProcess={inProcess}
                                    Run={this.Run}
                                    Change={this.Change}
                                    solved={solved}/>

                        <CurrentState state={solved}/>
                    </div>
                </main>
            </>
        )
    }
}
