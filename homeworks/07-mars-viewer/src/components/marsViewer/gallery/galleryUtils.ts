import { Dispatch } from 'react'
import { favouriteStatusChanged } from '../../../types/action'

export const changeFavouriteStatus = (dispatch: Dispatch<any>, chosenImage: string, favourites: Set<string>) => {
    let arr: string[] = Array.from(favourites)

    if (favourites.has(chosenImage))
        arr = arr.filter((image: string) => image !== chosenImage)
    else
        arr.push(chosenImage)

    dispatch(favouriteStatusChanged(new Set<string>(arr)))
}