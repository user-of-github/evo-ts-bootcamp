type Comparator<T> = (first: T, second: T) => boolean

function MergeArrays<T>(first: T[], second: T[], compare: Comparator<T>): T[] {
    const response: T[] = []

    while (first.length && second.length)
        response.push(compare(first[0], second[0]) ? first.shift() as T: second.shift() as T)

    while (first.length)
        response.push(first.shift() as T)

    while (second.length)
        response.push(second.shift() as T)

    return response
}

export function MergeSort<T>(query: T[], compare: Comparator<T>): T[] {
    if (query.length < 2)
        return query

    const middleIndex: number = Math.floor(query.length / 2)
    const leftSubarray: T[] = query.slice(0, middleIndex)
    const rightSubarray: T[] = query.slice(middleIndex, query.length)

    return MergeArrays(MergeSort(leftSubarray, compare), MergeSort(rightSubarray, compare), compare)
}

