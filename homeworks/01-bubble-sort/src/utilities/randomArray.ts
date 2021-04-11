export const GenerateRandomArray = (numberOfElements: number, maxElement: number): number[] => {
    const response: number[] = []
    for (let counter: number = 1; counter <= numberOfElements; ++counter)
        response.push(Math.floor(Math.random() * maxElement) + 1)

    return response
}

