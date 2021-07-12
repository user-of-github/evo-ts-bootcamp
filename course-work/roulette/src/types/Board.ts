import {Spot} from './Spot'


export interface Board {
    activeForBets: boolean
    spots: Array<Spot>
}