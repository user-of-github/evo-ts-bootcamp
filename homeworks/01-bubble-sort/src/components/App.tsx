import React from 'react'
import {Header} from './header'
import {Field} from './field'
import {Management} from './management'
import {CurrentState} from './state'
import {Settings} from './settings'
import style from './app.module.css'
import {GenerateRandomArray} from "../utilities/randomArray";

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
    timerID_: number
    arrayLength_: number
    maximumArrayElement_: number
    latency_: number
    randomizerFunction_: (a: number, b: number) => number[]
    sorter_: (array: number[]) => SortResult
    readonly minDelay: number = 1
    readonly maxDelay: number = 1000
    readonly minElementsCount: number = 1
    readonly maxElementsCount: number = 50

    constructor(params: Params) {
        super(params)
        this.timerID_ = NaN
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


    change: React.MouseEventHandler<HTMLButtonElement> = event => {
        window.clearInterval(this.timerID_)
        this.setState({
            numbers: this.randomizerFunction_(this.arrayLength_, this.maximumArrayElement_),
            solved: false,
            inProcess: false
        })
    }

    run: React.MouseEventHandler<HTMLButtonElement> = event => {
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

    setLatency: React.ChangeEventHandler<HTMLInputElement> = event => {
        const newValue: string = event.target.value.toString().trim()
        if (newValue === '') {
            window.alert(`Unacceptable value. Put value in the range [${this.minDelay} ... ${this.maxDelay}]`)
            event.target.value = this.latency_.toString()
            return
        }

        const newValueNumber: number = Number.parseInt(newValue)
        if (newValueNumber < this.minDelay || newValueNumber > this.maxDelay){
            window.alert(`Unacceptable value. Put value in the range [${this.minDelay} ... ${this.maxDelay}]`)
            event.target.value = this.latency_.toString()
            return
        }


        this.latency_ = newValueNumber
        this.setState({solved: false, inProcess: false})
        window.clearInterval(this.timerID_)
    }

    setArraySize: React.ChangeEventHandler<HTMLInputElement> = event => {
        const newValue: string = event.target.value.toString().trim()
        if (newValue === '') {
            window.alert(`Unacceptable value. Put value in the range [${this.minElementsCount} ... ${this.maxElementsCount}]`)
            event.target.value = this.arrayLength_.toString()
            return
        }

        const newValueNumber: number = Number.parseInt(newValue)
        if (newValueNumber < this.minElementsCount || newValueNumber > this.maxElementsCount) {
            window.alert(`Unacceptable value. Put value in the range [${this.minElementsCount} ... ${this.maxElementsCount}]`)
            event.target.value = this.arrayLength_.toString()
            return
        }

        this.arrayLength_ = newValueNumber
        this.setState({
            numbers: GenerateRandomArray(this.arrayLength_, this.maximumArrayElement_),
            solved: false,
            inProcess: false
        })
        window.clearInterval(this.timerID_)
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
                                    run={this.run}
                                    change={this.change}
                                    solved={solved}/>
                        <Settings solved={solved}
                                  inProcess={inProcess}
                                  changeLatency={this.setLatency}
                                  changeArraySize={this.setArraySize}
                                  minDelay={this.minDelay}
                                  maxDelay={this.maxDelay}
                                  minElCount={this.minElementsCount}
                                  maxElCount={this.maxElementsCount}/>

                        <CurrentState state={solved}/>
                    </div>
                </main>
            </>
        )
    }
}
