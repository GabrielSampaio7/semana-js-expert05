import { jest } from '@jest/globals'
import { Readable, Writable, Transform } from 'stream'

export default class TestUtil {
    static generateReadbleStream(data){
        return new Readable({
            objectMode: true,
            read(){
                for(const item of data){
                    this.push(item)
                }
                this.push(null)
            }
        })
    }

    static generateWritebleStream(onData){
        return new Writable({
            objectMode: true,
            write(chunk, encondig, cb){
                onData(chunk)
                cb(null, chunk)
            }
        })
    }

    static generateTransformStream(onData){
        return new Transform({
            objectMode: true,
            transform(chunk, encondig, cb){
                onData(chunk),
                cb(null, chunk)
            }
        })
    }
}