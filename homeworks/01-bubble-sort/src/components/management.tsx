import React from 'react';
import style from './management.module.css'

type Props = {
    solved: boolean
    inProcess: boolean,
    Change: React.MouseEventHandler<HTMLButtonElement>,
    Run: React.MouseEventHandler<HTMLButtonElement>,
}

export const Management = ({solved, inProcess, Change, Run}: Props): JSX.Element => (
    <div className={style.management}>
        <button className={style.btn} onClick={Run} disabled={solved}>{inProcess ? 'Stop' : 'Run'}</button>
        <button className={style.btn} onClick={Change} disabled={inProcess}>New Set</button>
    </div>
)
