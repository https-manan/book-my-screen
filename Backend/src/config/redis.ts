import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);


redis.on('error',(err)=>{
    console.log(err)
})

redis.on('connect',()=>{
    console.log("redis connected successfully")
})

export default redis
