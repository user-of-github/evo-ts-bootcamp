export interface FileEntity {
    fileName: string
    fullPath: string
    lastModified: number
}

export const enum ChangeType {
    FILE_CREATED = 'FILE_CREATED',
    FILE_REMOVED = 'FILE_REMOVED',
    FILE_CHANGED = 'FILE_CHANGED'
}