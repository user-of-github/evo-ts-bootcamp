const SwapNumbers = (numbersArray: number[], indexFirst: number, indexSecond: number): void => {
    numbersArray[indexFirst] += numbersArray[indexSecond]
    numbersArray[indexSecond] = numbersArray[indexFirst] - numbersArray[indexSecond]
    numbersArray[indexFirst] -= numbersArray[indexSecond]
}

type SortResult = {
    numbers: number[],
    success: boolean,
    wasSwapped: boolean
}

export const BubbleSortNumbers = (nums: number[]): SortResult => {

    let response: SortResult = {
        numbers: nums,
        success: false,
        wasSwapped: false
    }

    let counter: number, counter2: number

    for (counter = 0; counter < response.numbers.length - 1; ++counter)
        for (counter2 = 0; counter2 < response.numbers.length - counter - 1; ++counter2) {
            console.dir(response.success)
            if (response.numbers[counter2] > response.numbers[counter2 + 1]) {
                SwapNumbers(response.numbers, counter2, counter2 + 1)
                response.wasSwapped = true
                return response
            }
        }

    response.success = true

    return response
}
