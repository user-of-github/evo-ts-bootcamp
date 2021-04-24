type Comparator<ValueType> = (first: ValueType, second: ValueType) => boolean

const MergeArrays = <ValueType>(first: ValueType[], second: ValueType[], compare: Comparator<ValueType>): ValueType[] => {
    const response: ValueType[] = []

    while (first.length && second.length)
        response.push(compare(first[0], second[0]) ? first.shift() : second.shift())

    while (first.length)
        response.push(first.shift())

    while (second.length)
        response.push(second.shift())

    return response
}

export const MergeSort = <ValueType>(query: ValueType[], compare: Comparator<ValueType>): ValueType[] => {
    if (query.length < 2)
        return query

    const middleIndex: number = Math.floor(query.length / 2)
    const leftSubarray: ValueType[] = query.slice(0, middleIndex)
    const rightSubarray: ValueType[] = query.slice(middleIndex, query.length)

    return MergeArrays(MergeSort(leftSubarray, compare), MergeSort(rightSubarray, compare), compare)
}

