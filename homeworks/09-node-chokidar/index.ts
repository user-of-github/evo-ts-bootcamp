import {DirWatcher} from './dirWatcher'
import EventEmitter = require('events')
import {Importer} from "./importer";


const CONTROLLED_DIRECTORY: string = 'data'

const eventEmitter: EventEmitter = new EventEmitter()
const watcher: DirWatcher = new DirWatcher(eventEmitter)
const listener: Importer = new Importer(eventEmitter)

console.log(listener.importSync(`${__dirname}/${CONTROLLED_DIRECTORY}/Copy.csv`))
watcher.watch(`${__dirname}/${CONTROLLED_DIRECTORY}`, 1000)
listener.listen()
