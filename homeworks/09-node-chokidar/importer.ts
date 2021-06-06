import {EventEmitter} from 'events'
import {ChangeType, FileEntity} from './types'
import {readFileSync} from 'fs'

export class Importer {
    private eventEmitter: EventEmitter

    public constructor(newEventEmitter: EventEmitter) {
        this.eventEmitter = newEventEmitter
    }

    public listen(): void {
        this.eventEmitter.on(ChangeType.FILE_CHANGED,
            (delta: Array<FileEntity>) => this.printEventDescription(delta, ChangeType.FILE_CHANGED))
        this.eventEmitter.on(ChangeType.FILE_REMOVED,
            (delta: Array<FileEntity>) => this.printEventDescription(delta, ChangeType.FILE_REMOVED))
        this.eventEmitter.on(ChangeType.FILE_CREATED,
            (delta: Array<FileEntity>) => this.printEventDescription(delta, ChangeType.FILE_CREATED))
    }


    // realization from
    // https://www.geeksforgeeks.org/how-to-convert-csv-to-json-file-having-comma-separated-values-in-node-js/
    public importSync(path: string): string {
        const array = readFileSync(path).toString().split('\r')

        const result = []

        let headers = array[0].split(', ')

        for (let i: number = 1; i < array.length - 1; i++) {
            let obj = {}

            let str = array[i]
            let s = ''

            let flag: boolean = false
            for (let ch of str) {
                if (ch === '"' && !flag)
                    flag = true
                else if (ch === '"' && flag)
                    flag = false

                if (ch === ', ' && !flag)
                    ch = '|'
                if (ch !== '"')
                    s += ch
            }

            const properties: Array<string> = s.split('|')

            for (const j in headers) {
                if (properties[j].includes(", "))
                    obj[headers[j]] = properties[j].split(', ').map(item => item.trim())
                else
                    obj[headers[j]] = properties[j]
            }

            result.push(obj)
        }

        return JSON.stringify(result)
    }

    private static typeToString(changeType: ChangeType): string {
        switch (changeType) {
            case ChangeType.FILE_CHANGED:
                return 'changed'
            case ChangeType.FILE_CREATED:
                return 'created'
            case ChangeType.FILE_REMOVED:
                return 'removed'
        }
    }

    private printEventDescription(files: Array<FileEntity>, changeType: ChangeType): void {
        console.log(
            `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]\nSome files were ${Importer.typeToString(
                changeType)} : `)
        files.forEach((item: FileEntity) => console.log('\t' + item.fileName))
    }
}