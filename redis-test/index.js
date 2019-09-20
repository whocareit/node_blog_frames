const redis = require('redis');

//创建客户端，第一个参数表示启动redis的端口号，第二个表示当前的本地服务器
const redisClient = redis.createClient(6379,'127.0.0.1');

redisClient.on('error',err => {
    console.log(err);
})

//测试
redisClient.set('myName','wangermazi',redis.print);
redisClient.get('myName',(err,val) => {
    if(err){
        console.log(err);
        return
    }
    console.log('val is', val);

    //退出
    redisClient.quit();
})