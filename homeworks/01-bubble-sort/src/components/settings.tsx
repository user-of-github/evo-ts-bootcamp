import React from 'react'
import style from './settings.module.css'


type Params = {
    solved: boolean
    inProcess: boolean,
    changeLatency: React.ChangeEventHandler<HTMLInputElement>,
    changeArraySize: React.ChangeEventHandler<HTMLInputElement>,
    maxDelay: number,
    minDelay: number,
    maxElCount: number,
    minElCount: number
}

export const Settings = ({inProcess, changeLatency, changeArraySize, maxDelay, minDelay, maxElCount, minElCount}: Params): JSX.Element => (
    <div className={style.settingsBar}>
        <input className={style.input} type="number" step="100" min={minDelay} max={maxDelay} placeholder="Latency" disabled={inProcess}
               onChange={changeLatency}/>
        <input className={style.input} type="number" step="1" min={minElCount} max={maxElCount} placeholder={"Array length"}
               disabled={inProcess} onChange={changeArraySize}/>
    </div>
)
