import { Injectable } from "@nestjs/common";
import Redis from 'ioredis'

@Injectable()
export class RedisService extends Redis {
    constructor () {        
        super(process.env.REDIS_URL, {
            retryStrategy: (times) => {
                return Math.min(times * 50, 2000); 
            },
        });
          
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