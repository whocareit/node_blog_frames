//标准输入输出

//stream 表示文件流  将数据以流的方式输入与输出，加快读取文件的速度

//process中，std表示标准  in  out表示输入与输出  pipe表示连接的管道
// process.stdin.pipe(process.stdout);

// const http = require('http');

// const server = http.createServer((req,res) => {
//     if(req.method === 'POST'){
//         req.pipe(res);
//     }
// }) 
// server.listen(8000);


//使用stream来读取文件流
// const fs = require('fs');
// const path = require('path');

// const fileName1 = path.resolve(__dirname, 'data.txt');
// const fileName2 = path.resolve(__dirname, 'data-bak.txt');

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName2);

// readStream.pipe(writeStream);

// readStream.on('data' , chunk => {
//     console.log(chunk.toString());
// })

// readStream.on('end',() =>{
//     console.log('copy done');
// })


//将文件中的内容读入，并通过res返回
const http = require('http');
const fs = require('fs');
const path = require('path');
const fileName1 = path.resolve(__dirname, 'data.txt');
const readStream = fs.createReadStream(fileName1)

const server = http.createServer((req,res) => {
    if(req.method === 'GET'){
        readStream.pipe(res);
    }
})

server.listen(8000);