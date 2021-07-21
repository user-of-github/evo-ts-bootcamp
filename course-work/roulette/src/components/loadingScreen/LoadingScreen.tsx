import {observer} from 'mobx-react-lite'
import {Transition} from 'react-transition-group'

import {SettingsState} from '../../types/SettingsState'
import {ANIMATION_BEZIER} from '../../utilities/configuration'

import Style from './LoadingScreen.module.css'


const defaultStyles = {
    transitionDuration: `${500}ms`,
    transitionProperty: 'opacity',
    transformOrigin: 'top',
    transitionTimingFunction: ANIMATION_BEZIER,
    opacity: 0
}

const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0},
}


export const LoadingScreen = observer((props: { state: SettingsState }) => (
    <Transition in={props.state.loading} unmountOnExit={true} timeout={500}>
        {
            state => (
                <div className={Style.wrapper} style={{
                    ...defaultStyles, // @ts-ignore
                    ...transitionStyles[state]
                }}>
                    <div className={Style.container}>
                        <svg className={Style.svg} viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="ANIMATIONLOADING">
                                <circle id="Ellipse 1" cx="56" cy="56" r="55" fill="#7B4626"/>
                                <circle id="Ellipse 13" cx="56" cy="56" r="45" fill="#FFECBA"/>
                                <g id="SPOTS">
                                    <path id="Ellipse 2" d="M96 56C96 47.5528 93.3258 39.3225 88.3607 32.4886L56 56H96Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 5"
                                          d="M68.3607 17.9577C60.3269 15.3474 51.6731 15.3474 43.6393 17.9577L56 56L68.3607 17.9577Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 6"
                                          d="M23.6393 32.4886C18.6742 39.3225 16 47.5528 16 56L56 56L23.6393 32.4886Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 7"
                                          d="M23.6393 79.5114C28.6044 86.3453 35.6056 91.4319 43.6393 94.0423L56 56L23.6393 79.5114Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 8"
                                          d="M68.3607 94.0423C76.3944 91.4319 83.3956 86.3453 88.3607 79.5114L56 56L68.3607 94.0423Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 4"
                                          d="M88.3607 32.4886C83.3956 25.6547 76.3944 20.5681 68.3607 17.9577L56 56L88.3607 32.4886Z"
                                          fill="#0E130D"/>
                                    <path id="Ellipse 9"
                                          d="M43.6393 17.9577C35.6056 20.5681 28.6044 25.6547 23.6393 32.4886L56 56L43.6393 17.9577Z"
                                          fill="#0E130D"/>
                                    <path id="Ellipse 10"
                                          d="M16 56C16 64.4472 18.6742 72.6775 23.6393 79.5114L56 56H16Z"
                                          fill="#0E130D"/>
                                    <path id="Ellipse 11"
                                          d="M43.6393 94.0423C51.6731 96.6526 60.3269 96.6526 68.3607 94.0423L56 56L43.6393 94.0423Z"
                                          fill="#139948"/>
                                    <path id="Ellipse 12"
                                          d="M88.3607 79.5114C93.3258 72.6775 96 64.4472 96 56L56 56L88.3607 79.5114Z"
                                          fill="#0E130D"/>
                                </g>
                                <circle id="Ellipse 3" cx="56" cy="56" r="30" fill="#E7D39F"/>
                                <g id="CENTRAL">
                                    <path id="Polygon 1"
                                          d="M49.0495 46.6216L55.5 44.5257L61.9505 46.6216L65.9371 52.1088V58.8912L61.9505 64.3784L55.5 66.4743L49.0495 64.3784L45.0628 58.8912V52.1088L49.0495 46.6216Z"
                                          fill="#D1D1D1" stroke="black"/>
                                    <line id="Line 1" x1="55.5" y1="48.381" x2="55.5" y2="63.7143" stroke="#FFF500"/>
                                    <line id="Line 2" x1="49" y1="55.5476" x2="63" y2="55.5476" stroke="#FFF500"/>
                                </g>
                            </g>
                        </svg>
                    </div>

                    <h2 className={Style.title}>Loading...</h2>
                </div>
            )
        }
    </Transition>
))