import {ANIMATION_BEZIER} from '../../utilities/configuration'

const duration: number = 200

export const defaultStyles = {
    transitionDuration: `${duration}ms`,
    transitionProperty: 'transform, opacity',
    transformOrigin: 'top',
    transitionTimingFunction: ANIMATION_BEZIER,
    transform: 'scaleY(0.7)',
    opacity: 0
}

export const transitionStyles = {
    entering: {transform: 'scaleY(0.7) translateY(-100%)', opacity: 0},
    entered: {transform: 'scaleY(1) translateY(0)', opacity: 1},
    exiting: {transform: 'scaleY(0.7) translateY(-100%)', opacity: 0},
    exited: {transform: 'scaleY(0.7) translateY(-100%)', opacity: 0},
}


export const APPLICATION_INFORMATION = {
    projectName: 'Roulette "Field of miracles"',
    authorName: 'Nikita Slutski',
    githubLink: 'user-of-github',
    location: 'Minsk, Belarus',
    termsOfDeveloping: '22 June, 2021 ——> 20 July, 2021',
    technologiesStack: 'React, TypeScript, BabylonJS, MobX',
    copyright: 'copyright © 2021 | All rights reserved',
    inspiredBy: 'Evolution Gaming & Evo TypeScript Bootcamp'
}