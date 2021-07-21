import {ANIMATION_BEZIER} from '../../../utilities/configuration'


const duration: number = 200

export const defaultStyles = {
    width: '100%',
    height: 'auto',
    transitionDuration: `${duration}ms`,
    transitionProperty: 'transform, opacity',
    transformOrigin: 'top',
    transitionTimingFunction: ANIMATION_BEZIER,
    transform: 'scaleY(0)',
    opacity: 0
}

export const transitionStyles = {
    entering: {transform: 'scaleY(0)', opacity: 0},
    entered: {transform: 'scaleY(1)', opacity: 1},
    exiting: {transform: 'scaleY(0)', opacity: 0},
    exited: {transform: 'scaleY(0)', opacity: 0},
}