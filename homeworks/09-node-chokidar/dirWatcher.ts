import {EventEmitter} from 'events'
import {opendir} from 'fs/promises'
import {stat} from 'fs/promises'
import {FileEntity, ChangeType} from './types'


export class DirWatcher {
    private readonly CONTROLLED_EXTENSION: string = 'csv'

    private delay: number
    private files: Array<FileEntity>
    private wasFirstCheck: boolean
    private path: string
    private timerID: NodeJS.Timer
    private eventEmitter: EventEmitter

    public constructor(newEventsEmitter: EventEmitter) {
        this.eventEmitter = newEventsEmitter
    }

    private async getFilesInFolder() {
        const response: FileEntity[] = Array<FileEntity>()
        const directory = await opendir(this.path)

        for await (const entity of directory) {
            if (!entity.isFile())
                continue

            if (entity.name.trim().toLowerCase().endsWith(`.${this.CONTROLLED_EXTENSION}`)) {
                const fullFilePath: string = this.path + '\\' + entity.name
                const status = await stat(fullFilePath)
                response.push({
                    fileName: entity.name,
                    fullPath: fullFilePath,
                    lastModified: status.mtimeMs
                })
            }
        }

        return response
    }

    public watch(newPath: string, newDelay: number): void {
        this.path = newPath
        this.delay = newDelay

        this.recursiveWatch()
    }

    private async recursiveWatch(): Promise<void> {
        this.timerID = setTimeout(async () => {
            const receivedFiles: Array<FileEntity> = await this.getFilesInFolder()

            if (!this.wasFirstCheck) {
                this.files = receivedFiles
                this.wasFirstCheck = true
                await this.recursiveWatch()
            }

            this.checkIfDirectoryUpdated(receivedFiles)
            this.files = receivedFiles

            await this.recursiveWatch()
        }, this.delay)
    }

    private checkIfDirectoryUpdated(newFiles: Array<FileEntity>): void {

        const changedFiles: Array<FileEntity> = newFiles.filter((file: FileEntity) => {
            for (const item of this.files)
                if (item.fullPath === file.fullPath && item.lastModified !== file.lastModified)
                    return true
            return false
        })

        const createdFiles: Array<FileEntity> = newFiles.filter((file: FileEntity) => {
            for (const item of this.files)
                if (item.fullPath === file.fullPath)
                    return false
            return true
        })

        const removedFiles: Array<FileEntity> = this.files.filter((file: FileEntity) => {
            for (const item of newFiles)
                if (item.fullPath === file.fullPath)
                    return false
            return true
        })


        changedFiles.length && this.eventEmitter.emit(ChangeType.FILE_CHANGED, changedFiles)
        removedFiles.length && this.eventEmitter.emit(ChangeType.FILE_REMOVED, removedFiles)
        createdFiles.length && this.eventEmitter.emit(ChangeType.FILE_CREATED, createdFiles)
    }
}