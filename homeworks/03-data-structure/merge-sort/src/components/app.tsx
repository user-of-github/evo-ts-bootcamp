import React from 'react'
import {Header} from './header'
import {SortBlock} from './sort-block'
import {RandomStringArray, RandomNumberArray} from '../utils/randomizers'
import {MergeSort} from '../utils/merge-sort'
import style from './app.module.css'

type ComparatorString = (a: string, b: string) => boolean
const compareStr: ComparatorString = (a: string, b: string) => a < b

type ComparatorNumber = (a: number, b: number) => boolean
const compareNum: ComparatorNumber = (a: number, b: number) => a < b

const App = () => {
  return (<>
    <Header />
    <main className={style.main}>
      <div className={style.container}>
        <SortBlock sorter={MergeSort} numberOfElements={10} randomizer={RandomStringArray} comparator={compareStr}/>
        <SortBlock sorter={MergeSort} numberOfElements={10} randomizer={RandomNumberArray} comparator={compareNum}/>
      </div>
    </main>
  </>)
}

export default App
