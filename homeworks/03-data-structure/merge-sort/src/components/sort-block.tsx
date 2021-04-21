import React from 'react'
import style from './sort-block.module.css'

type RandomizeFunction<T> = (numberOfElements: number) => T[]
type Comparator<T> = (first: T, second: T) => boolean
type SortFunction<T> = (query: T[], compare: Comparator<T>) => T[]

type State<T> = {
    array: T[],
    isSorted: boolean
}

interface Params<T> {
    numberOfElements: number,
    randomizer: RandomizeFunction<T>,
    sorter: SortFunction<T>,
    comparator: Comparator<T>
}


export class SortBlock<T> extends React.Component<Params<T>, State<T>> {
    numberOfElements: number
    randomizer: RandomizeFunction<T>
    sorter: SortFunction<T>
    comparator: Comparator<T>

    constructor(params: Params<T>) {
        super(params)
        this.numberOfElements = params.numberOfElements
        this.randomizer = params.randomizer
        this.sorter = params.sorter
        this.comparator = params.comparator

        this.state = {
            array: this.randomizer(this.numberOfElements),
            isSorted: false
        }
    }

    UpdateArray: React.MouseEventHandler<HTMLButtonElement> = () => {
        this.setState({
            array: this.randomizer(this.numberOfElements),
            isSorted: false
        })
    }

    GetSorted: React.MouseEventHandler<HTMLButtonElement> = () => {
        const response: T[] = this.sorter(this.state.array, this.comparator)

        this.setState({
            array: response,
            isSorted: true
        })
    }

    render() {
        const {array, isSorted} = this.state

        return (
            <div className={style.app__block}>
                <code className={style.app__blockArray}>[ {array.toString().split(',').join(' , ')} ]</code>
                <div className={style.app__blockButtons}>
                    <button className={style.btn} onClick={this.GetSorted} disabled={isSorted}>Merge Sort</button>
                    <button className={style.btn} onClick={this.UpdateArray}>Renew array</button>
                </div>
            </div>
        )
    }
}
