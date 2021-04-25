import React from 'react';
import style from './management.module.css'

type Params = {
    solved: boolean
    inProcess: boolean,
    change: React.MouseEventHandler<HTMLButtonElement>,
    run: React.MouseEventHandler<HTMLButtonElement>,
}

export const Management = ({solved, inProcess, change, run}: Params): JSX.Element => (
    <div className={style.management}>
        <button className={style.btn} onClick={run} disabled={solved}>{inProcess ? 'Stop' : 'Run'}</button>
        <button className={style.btn} onClick={change} disabled={inProcess}>New Set</button>
    </div>
)
