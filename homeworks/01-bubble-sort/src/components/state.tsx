import React from 'react'
import style from './state.module.css'

type Params = {
    state: boolean
}

export const CurrentState = ({state}: Params): JSX.Element =>
    <div className={style.state}>{state ? 'Solved' : 'Not solved'}</div>

