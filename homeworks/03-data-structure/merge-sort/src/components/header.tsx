import React from 'react'
import style from './header.module.css'

export const Header = ():JSX.Element => (
    <header className={style.header}>
        <div className="container">
            <div className={style.header__mainTitles}>
                <h1 className={style.header__title}>Merge Sort</h1>
                <h2 className={style.header__subtitle}>[ Third homework in Bootcamp ]</h2>
            </div>
            <h2 className={style.header__subsubtitle}>© Slutski Nikita</h2>
        </div>
    </header>
)
