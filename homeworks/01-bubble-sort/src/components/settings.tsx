import React from 'react'
import style from './settings.module.css'


type Params = {
    solved: boolean
    inProcess: boolean,
    ChangeLatency: React.ChangeEventHandler<HTMLInputElement>,
    ChangeArraySize: React.ChangeEventHandler<HTMLInputElement>,
}

export const Settings = ({solved, inProcess, ChangeLatency, ChangeArraySize}: Params): JSX.Element => (
    <div className={style.settingsBar}>
        <input className={style.input} type="number" min="200" max="1000" placeholder="Latency" disabled={inProcess}
               onChange={ChangeLatency}/>
        <input className={style.input} type="number" min="2" max="30" placeholder={"Array length"}
               disabled={inProcess} onChange={ChangeArraySize}/>
    </div>
)
