import {MergeSort} from './merge-sort'

type ComparatorNumbers = (a: number, b: number) => boolean
type ComparatorStrings = (a: string, b: string) => boolean

describe("MergeSort test. © Slutski Mikita", () => {
    const compNum: ComparatorNumbers = (a: number, b: number) => a < b
    const compStr: ComparatorStrings = (a: string, b: string) => a < b

    it("First Test Sort", () => {
        expect(MergeSort([1, -1, 2, 3, -10], compNum)).toEqual([-10, -1, 1, 2, 3])
    })

    it("Second Test Sort", () => {
        expect(MergeSort(['ppp', 'abc', 'aaaaaaa', 'qqq'], compStr)).toEqual(['aaaaaaa', 'abc', 'ppp', 'qqq'])
    })

    it("Third Test Sort", () => {
        expect(MergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 11], compNum)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    })

})


