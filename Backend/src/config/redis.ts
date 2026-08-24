import Redis from "ioredis";

const redis=new Redis({
    host:process.env.REDIS_HOST,
    port:parseInt(process.env.REDIS_PORT||"6379"),
    retryStrategy:()=>5000   //hr 5 sec mai refetch the redis server
});


redis.on('error',(err)=>{
    console.log(err)
})

redis.on('connect',()=>{
    console.log("redis connected successfully")
})

export default redis
