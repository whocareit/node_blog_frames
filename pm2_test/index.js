const http = require('http');
const server = http.createServer((req, res) => {
    //模拟日志
    console.log('cur time',Date.now());
    //模拟错误
    console.log('cur error', Date.now());

    //模拟出错发生重启
    if(req.url == '/err'){
        throw new Error('发生错误');
    }

    res.setHeader('Content-type','application/json');
    res.end(
        JSON.stringify({
            erron: 0,
            msg: 'pm2 test server 4s'
        })
    )
});

server.listen(8000);
console.log('server is listening on port 8000....')