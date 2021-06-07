import React from 'react'
import Style from './header.module.css'

export const Header = (): JSX.Element => (
    <header className={Style.header}>
        <div className="container">
            <div className={Style.header__mainTitles}>
                <h1 className={Style.header__title}>Mars Viewer: MobX EDITION</h1>
                <h2 className={Style.header__subtitle}>[ Homework in Bootcamp ]</h2>
            </div>
            <h2 className={Style.header__subsubtitle}>© Slutski Nikita</h2>
        </div>
    </header>
)