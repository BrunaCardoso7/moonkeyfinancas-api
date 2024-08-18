import { Injectable } from "@nestjs/common";
import Redis from 'ioredis'

@Injectable()
export class RedisService extends Redis {
    constructor () {        
        super("redis://default:UMamimhhnfIXESPfdnKEqomRjLewzKOR@autorack.proxy.rlwy.net:13271") 

        super.on('error', (err) => {
            console.log("Error in redis")
            console.log(err)
            process.exit(1)
        })
        super.on('connect', () => {
            console.log("Redis connected")
        })
    }
}