export const enum TraverseType {
    PreOrder = 'Preorder',
    InOrder = 'InOrder',
    PostOrder = 'PostOrder',
    BreadthFirst = 'BreadthFirst'
}

type TraverseFilterer<ValueType> = (node?: BinaryTreeNode<ValueType>) => boolean

class BinaryTreeNode<ValueType> {
    public value: ValueType
    public parent: BinaryTreeNode<ValueType>
    public leftChild: BinaryTreeNode<ValueType>
    public rightChild: BinaryTreeNode<ValueType>
    public columnNumber: number

    constructor(newValue: ValueType, newParent: BinaryTreeNode<ValueType> = null, newColumnNumber: number = 0) {
        this.value = newValue
        this.parent = newParent
        this.leftChild = this.rightChild = null
        this.columnNumber = newColumnNumber
    }
}


export class BinaryTree<ValueType> {
    private root: BinaryTreeNode<ValueType>
    private size: number


    private findElement(key: ValueType): BinaryTreeNode<ValueType> {
        let searchElement: BinaryTreeNode<ValueType> = this.root

        while (searchElement !== null && searchElement.value !== key)
            searchElement = (key <= searchElement.value ? searchElement.leftChild : searchElement.rightChild)

        return searchElement
    }

    private getMaximumValue(start: BinaryTreeNode<ValueType>): BinaryTreeNode<ValueType> {
        let response: BinaryTreeNode<ValueType> = start

        while (response.rightChild !== null)
            response = response.rightChild

        return response;
    }

    private deleteByPointer(target: BinaryTreeNode<ValueType>): void {

        if (target.leftChild !== null && target.rightChild != null) {
            let localMax = this.getMaximumValue(target.leftChild)
            target.value = localMax.value
            this.deleteByPointer(localMax) // maximum 1 call
        } else if (target.leftChild !== null) {
            (target === target.parent.leftChild) ? (target.parent.leftChild = target.leftChild) : (target.parent.rightChild = target.leftChild)
        } else if (target.rightChild !== null) {
            (target === target.parent.rightChild) ? (target.parent.rightChild = target.rightChild) : (target.parent.leftChild = target.rightChild)
        } else {  // is it root (in that case it is the only left)
            if (target === this.root)
                target = this.root = null
            else
                (target === target.parent.leftChild) ? (target.parent.leftChild = null) : (target.parent.rightChild = null)
        }
    }

    private recursivePreOrderTraverse(currentNode: BinaryTreeNode<ValueType>, response: ValueType[]): void {
        response.push(currentNode.value)
        currentNode.leftChild !== null && this.recursivePreOrderTraverse(currentNode.leftChild, response)
        currentNode.rightChild !== null && this.recursivePreOrderTraverse(currentNode.rightChild, response)
    }

    private recursiveInOrderTraverse(currentNode: BinaryTreeNode<ValueType>, response: ValueType[], filterer: TraverseFilterer<ValueType>): void {
        currentNode.leftChild !== null && this.recursiveInOrderTraverse(currentNode.leftChild, response, filterer)
        filterer(currentNode) && response.push(currentNode.value)
        currentNode.rightChild !== null && this.recursiveInOrderTraverse(currentNode.rightChild, response, filterer)
    }

    private recursivePostOrderTraverse(currentNode: BinaryTreeNode<ValueType>, response: ValueType[]): void {
        currentNode.leftChild !== null && this.recursivePostOrderTraverse(currentNode.leftChild, response)
        currentNode.rightChild !== null && this.recursivePostOrderTraverse(currentNode.rightChild, response)
        response.push(currentNode.value)
    }

    private breadthFirstTraverse(currentNode: BinaryTreeNode<ValueType>, response: ValueType[]): void {
        const queueBFS: BinaryTreeNode<ValueType>[] = []
        queueBFS.push(currentNode)

        while (queueBFS.length) {
            const topElement: BinaryTreeNode<ValueType> = queueBFS.shift()
            response.push(topElement.value)
            topElement.leftChild !== null && queueBFS.push(topElement.leftChild)
            topElement.rightChild !== null && queueBFS.push(topElement.rightChild)
        }
    }

    private recursiveUpdateColumnNumbers(currentNode: BinaryTreeNode<ValueType>, itsColumnNumber: number): void {
        currentNode.columnNumber = itsColumnNumber
        currentNode.leftChild !== null && this.recursiveUpdateColumnNumbers(currentNode.leftChild, itsColumnNumber - 1)
        currentNode.rightChild !== null && this.recursiveUpdateColumnNumbers(currentNode.rightChild, itsColumnNumber + 1)
    }

    private updateColumnNumbers(): void {
        this.root !== null && this.recursiveUpdateColumnNumbers(this.root, 0)
    }

    private recursiveClear(currentNode: BinaryTreeNode<ValueType>): void {
        currentNode.leftChild !== null && this.recursiveClear(currentNode.leftChild)
        currentNode.rightChild !== null && this.recursiveClear(currentNode.rightChild)
        currentNode = null
    }

    public constructor() {
        this.size = 0
        this.root = null
    }

    public currentSize(): number {
        return this.size
    }

    public empty(): boolean {
        return this.size === 0
    }

    public has(checkValue: ValueType): boolean {
        return this.findElement(checkValue) !== null
    }

    public insert(newValue: ValueType): void {
        if (this.has(newValue))
            return

        if (this.size !== 0) {
            let element: BinaryTreeNode<ValueType> = this.root,
                parent: BinaryTreeNode<ValueType> = this.root

            while (element != null) {
                parent = element;
                element = newValue <= element.value ? element.leftChild : element.rightChild
            }

            const newNode: BinaryTreeNode<ValueType> = new BinaryTreeNode(newValue, parent)
            if (newValue <= parent.value) {
                parent.leftChild = newNode
                newNode.columnNumber = parent.columnNumber - 1
            } else {
                parent.rightChild = newNode
                newNode.columnNumber = parent.columnNumber + 1
            }
        } else {
            this.root = new BinaryTreeNode(newValue, null)
        }

        ++this.size
    }

    public remove(deletedValue: ValueType): void {
        const searchElement: BinaryTreeNode<ValueType> = this.findElement(deletedValue)

        if (searchElement !== null && this.size > 0) {
            this.deleteByPointer(searchElement)
            --this.size
            this.updateColumnNumbers()
        }

        if (this.size === 0)
            this.root = null
    }

    public traverse(orderType: TraverseType): ValueType[] {
        const response: ValueType[] = []

        switch (orderType) {
            case TraverseType.BreadthFirst:
                this.root !== null && this.breadthFirstTraverse(this.root, response)
                break
            case TraverseType.PreOrder:
                this.root !== null && this.recursivePreOrderTraverse(this.root, response)
                break
            case TraverseType.PostOrder:
                this.root !== null && this.recursivePostOrderTraverse(this.root, response)
                break
            case TraverseType.InOrder:
                this.root !== null && this.recursiveInOrderTraverse(this.root, response, () => true)
                break
        }

        return response
    }

    public getColumn(column: number): ValueType[] {
        const response: ValueType[] = []
        this.recursiveInOrderTraverse(this.root, response, (node: BinaryTreeNode<ValueType>) => node.columnNumber === column)
        return response
    }

    public clear(): void {
        this.root !== null && this.recursiveClear(this.root)
        this.size = 0
        this.root = null
    }
}

