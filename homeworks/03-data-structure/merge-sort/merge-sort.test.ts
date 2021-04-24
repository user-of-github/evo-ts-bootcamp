import {MergeSort} from './merge-sort'

type ComparatorNumbers = (a: number, b: number) => boolean
type ComparatorStrings = (a: string, b: string) => boolean

describe('MergeSort test', () => {

    describe('Sets with numbers', () => {
        const compareNum: ComparatorNumbers = (a: number, b: number) => a < b
        const compareNumReversal: ComparatorNumbers = (a: number, b: number) => a > b

        test('Ascending order 1', () =>
            expect(MergeSort([1, -1, 2, 3, -10], compareNum)).toEqual([-10, -1, 1, 2, 3]))

        test('Ascending order 2', () =>
            expect(MergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 11], compareNum)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))

        test('Descending order', () =>
            expect(MergeSort([1, 2, 3, 3, 3, 4, -100], compareNumReversal)).toEqual([4, 3, 3, 3, 2, 1, -100]))
    })


    describe('Sets with strings', () => {
        const compareStr: ComparatorStrings = (a: string, b: string) => a < b
        const compareStrReversal: ComparatorStrings = (a: string, b: string) => a > b

        test('Ascending order', () =>
            expect(MergeSort(['ppp', 'abc', 'aaaaaaa', 'qqq'], compareStr)).toEqual(['aaaaaaa', 'abc', 'ppp', 'qqq']))

        test('Descending order', () =>
            expect(MergeSort(['Evolution', 'bootcamp', 'TypeScript', 'Javascript', 'jest', 'test'], compareStrReversal))
                .toEqual(['test', 'jest', 'bootcamp', 'TypeScript', 'Javascript', 'Evolution']))
    })

})


