import {MergeSort} from './merge-sort'

type ComparatorNumbers = (a: number, b: number) => boolean
type ComparatorStrings = (a: string, b: string) => boolean

describe("MergeSort", () => {
    describe("fibonacci", () => {
        const compNum: ComparatorNumbers = (a: number, b: number) => a < b
        const compStr: ComparatorStrings = (a: string, b: string) => a < b

        it("asserts 3th number = 2", () => {
            expect(MergeSort([1, -1, 2, 3, -10], compNum)).toEqual([-10, -1, 1, 2, 3])
        })

    })

})
