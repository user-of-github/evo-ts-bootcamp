type RandomizeFunction<T> = (numberOfElements: number) => T[]

export const RandomStringArray: RandomizeFunction<string> = (numberOfElements: number) => {
    let response: string[] = []
    const POSSIBLE: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    for (let counter: number = 0; counter < numberOfElements; ++counter)
        response.push(POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length)))

    return response;
}

export const RandomNumberArray: RandomizeFunction<number> = (numberOfElements: number) => {
    const response: number[] = []
    for (let counter: number = 0; counter < numberOfElements; ++counter)
        response.push(Math.floor(Math.random() * 100))

    return response
}
