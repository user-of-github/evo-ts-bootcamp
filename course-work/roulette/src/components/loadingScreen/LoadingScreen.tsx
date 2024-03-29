import {observer} from 'mobx-react-lite'
import {Transition} from 'react-transition-group'

import {SettingsState} from '../../types/SettingsState'
import {ANIMATION_BEZIER} from '../../utilities/configuration'

import Style from './LoadingScreen.module.css'


const defaultStylesWrapper = {
    transitionDuration: `${1000}ms`,
    transitionProperty: 'opacity',
    transformOrigin: 'top',
    transitionTimingFunction: ANIMATION_BEZIER,
    opacity: 1
}

const transitionStylesWrapper = {
    entering: {opacity: 0},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0},
}

const defaultStylesRoulette = {
    transitionDuration: `${1000}ms`,
    transitionProperty: 'transform',
    transformOrigin: 'center',
    transitionTimingFunction: ANIMATION_BEZIER,
    transform: 'scale(1)'
}

const transitionStylesRoulette = {
    entering: {transform: 'scale(0)'},
    entered: {transform: 'scale(1)'},
    exiting: {transform: 'scale(10)'},
    exited: {transform: 'scale(10)'},
}


export const LoadingScreen = observer((props: { state: SettingsState }) => (
    <Transition in={props.state.loading} unmountOnExit={true} timeout={1000}>
        {
            state => (
                <div className={Style.wrapper} style={{
                    ...defaultStylesWrapper, // @ts-ignore
                    ...transitionStylesWrapper[state]
                }}>
                    <div className={Style.container} style={{
                        ...defaultStylesRoulette, // @ts-ignore
                        ...transitionStylesRoulette[state]
                    }}>
                        <svg className={Style.svg} viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="ANIMATIONLOADING" filter="url(#filter0_d)">
                                <circle id="Ellipse 1" cx="59" cy="59" r="55" fill="#7B4626"/>
                                <circle id="Ellipse 13" cx="59" cy="59" r="45" fill="#FFECBA"/>
                                <g id="SPOTS" className={Style.spinning}>
                                    <path id="Ellipse 2" d="M99 59C99 50.5528 96.3258 42.3225 91.3607 35.4886L59 59H99Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 5"
                                          d="M71.3607 20.9577C63.3269 18.3474 54.6731 18.3474 46.6393 20.9577L59 59L71.3607 20.9577Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 6"
                                          d="M26.6393 35.4886C21.6742 42.3225 19 50.5528 19 59L59 59L26.6393 35.4886Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 7"
                                          d="M26.6393 82.5114C31.6044 89.3453 38.6056 94.4319 46.6393 97.0423L59 59L26.6393 82.5114Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 8"
                                          d="M71.3607 97.0423C79.3944 94.4319 86.3956 89.3453 91.3607 82.5114L59 59L71.3607 97.0423Z"
                                          fill="#9E2723"/>
                                    <path id="Ellipse 4"
                                          d="M91.3607 35.4886C86.3956 28.6547 79.3944 23.5681 71.3607 20.9577L59 59L91.3607 35.4886Z"
                                          fill="#0E130D"/>
                                    <path id="Ellipse 9"
                                          d="M46.6393 20.9577C38.6056 23.5681 31.6044 28.6547 26.6393 35.4886L59 59L46.6393 20.9577Z"
                                          fill="#0E130D"/>
                                    <path id="Ellipse 10"
                                          d="M19 59C19 67.4472 21.6742 75.6775 26.6393 82.5114L59 59H19Z"
                                          fill="#0E130D"/>
                                    <path id="Ellipse 11"
                                          d="M46.6393 97.0423C54.6731 99.6526 63.3269 99.6526 71.3607 97.0423L59 59L46.6393 97.0423Z"
                                          fill="#139948"/>
                                    <path id="Ellipse 12"
                                          d="M91.3607 82.5114C96.3258 75.6775 99 67.4472 99 59L59 59L91.3607 82.5114Z"
                                          fill="#0E130D"/>
                                </g>
                                <circle id="Ellipse 3" cx="59" cy="59" r="30" fill="#E7D39F"/>
                                <g id="CENTRAL" className={Style.spinning}>
                                    <path id="Polygon 1"
                                          d="M52.0495 49.6216L58.5 47.5257L64.9505 49.6216L68.9371 55.1088V61.8912L64.9505 67.3784L58.5 69.4743L52.0495 67.3784L48.0628 61.8912V55.1088L52.0495 49.6216Z"
                                          fill="#D1D1D1" stroke="black"/>
                                    <line id="Line 1" x1="58.5" y1="51.381" x2="58.5" y2="66.7143" stroke="#FFF500"/>
                                    <line id="Line 2" x1="52" y1="58.5476" x2="66" y2="58.5476" stroke="#FFF500"/>
                                </g>
                            </g>
                            <defs>
                                <filter id="filter0_d" x="0" y="0" width="118" height="118" filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="2"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <h1 className={Style.title}>Online Casino Roulette</h1>
                </div>
            )
        }
    </Transition>
))