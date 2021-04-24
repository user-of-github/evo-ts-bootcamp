import {BinaryTree, TraverseType} from './binaryTree'

describe('binaryTree', () => {
    describe('Base functions test & demonstration with InOrder', () => {
        const test1 = new BinaryTree<string>()
        test1.insert('D')
        test1.insert('B')
        test1.insert('E')
        test1.insert('A')
        test1.insert('C')

        test('Sorted inOrder check', () =>
            expect(test1.traverse(TraverseType.InOrder)).toEqual(['A', 'B', 'C', 'D', 'E']))

        test('Sorted inOrder after removing root element', () => {
            test1.remove('D')
            expect(test1.traverse(TraverseType.InOrder)).toEqual(['A', 'B', 'C', 'E'])
        })

        test('Full clear of the tree', () => {
            test1.clear()
            expect(test1.traverse(TraverseType.InOrder)).toEqual([])
        })

    })

    describe('Base and other functions test with other types of demonstration', () => {
        const test2 = new BinaryTree<number>()
        test2.insert(4)
        test2.insert(-100)
        test2.insert(5)
        test2.insert(-1000)
        test2.insert(-20)
        test2.insert(4.5)
        test2.insert(6)

        test('PreOrder-traverse', () => {
            expect(test2.traverse(TraverseType.PreOrder)).toEqual([4, -100, -1000, -20, 5, 4.5, 6])
        })

        test('One more preOrder-traverse', () => {
            test2.insert(1000)
            test2.insert(2000)
            expect(test2.traverse(TraverseType.PreOrder)).toEqual([4, -100, -1000, -20, 5, 4.5, 6, 1000, 2000])
        })

        test('GetColumn-method', () => {
            expect(test2.getColumn(0)).toEqual([-20, 4, 4.5])
        })

        test('BFS-traverse', () => {
            expect(test2.traverse(TraverseType.BreadthFirst)).toEqual([4, -100, 5, -1000, -20, 4.5, 6, 1000, 2000])
        })

        test('CurrentSize-method', () => {
            expect(test2.currentSize()).toEqual(9)
        })

        test('Empty-method', () => {
            expect(test2.empty()).toEqual(false)
        })

        test('Has-method', () => {
            expect(test2.has(123)).toEqual(false)
        })

        test('PostOrder-traverse', () => {
            test2.insert(1000)
            test2.remove(123)
            expect(test2.traverse(TraverseType.PostOrder)).toEqual([-1000, -20, -100, 4.5, 2000, 1000, 6, 5, 4])
        })

        test('After-full-clear behavior', () => {
            test2.clear()
            test2.insert(1)
            expect(test2.getColumn(3)).toEqual([])
        })

        test('While-clear behavior', () => {
            test2.remove(11)
            test2.remove(1)
            expect(test2.empty()).toEqual(true)
        })

        test('Preparing for removing pre-terminate leaves & demonstration with BFS', () => {
            test2.insert(4)
            test2.insert(-100)
            test2.insert(-2021)
            test2.insert(6)
            test2.insert(2021)
            expect(test2.traverse(TraverseType.BreadthFirst)).toEqual([4, -100, 6, -2021, 2021])
        })

        test('Removing pre-terminate leaves & demonstration with inOrder-traverse', () => {
            test2.remove(-100)
            test2.remove(6)
            expect(test2.traverse(TraverseType.InOrder)).toEqual([-2021, 4, 2021])
        })
    })

})