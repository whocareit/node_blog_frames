const fs = require('fs');
const path = require('path');

// //获取文件的绝对路径，___dirname获取到当前文件的根目录，使用path.resolve()方法
// const fullFileName = path.resolve(__dirname,'files','a.json');

// fs.readFile(fullFileName,(err,data) => {
//     if(err){
//         console.log('err:' + err);
//         return;
//     }
//     //此时通过fs.readFile读取文件获取的是一个二进制文件因此需要使用toString()方法转化
//     console.log(data.toString());
// })


//封装一个获取json文件的方法
// function getFileContent(fileName,callback){
//     const fullFileName = path.resolve(__dirname,'files',fileName);

//     fs.readFile(fullFileName,(err,data) => {
//         if(err){
//             console.log('err:' + err);
//             return;
//         }
//         //将通过toString获取到的json格式的文件转换为对象
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// //测试callback_test文件
// getFileContent('a.json',(aData) => {
//     console.log('a data',aData);
//     getFileContent(aData.next,(bData) => {
//         console.log('b data',bData);
//         getFileContent(bData.next,(cData) => {
//             console.log('c data',cData)
//         })
//     })
// })

//使用Promise来封装
function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName);
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                console.log('err:' + err);
                return;
            }
            //将通过toString获取到的json格式的文件转换为对象
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise;
}

// getFileContent('a.json').then(aData => {
//     console.log('a data',aData);
//     return getFileContent(aData.next);
// }).then(bData => {
//     console.log('b data',bData);
//     return getFileContent(bData.next);
// }).then(cData => {
//     console.log('c data',cData);
//     return getFileContent(cData.next);
// })

// async await语法  与promise套用
async function readFileData() {
    // 返回的是一个Promise对象
    //同步写法
    try {
        const aData = await getFileContent('a.json');
        console.log('a data ', aData);
        const bData = await getFileContent('b.json');
        console.log('b data ', bData);
        const cData = await getFileContent('c.json');
        console.log('c data ', cData);
    }catch(err){
        console.error(err);
    }
}
readFileData();


//异步写法
// async function readAData(){
//     const aData = await getFileContent('a.json');
//     return aData;
// }

// async function test(){
//     const Data = await readAData();
//     console.log('a data ', Data );
// }

// test();

//aysnc await 要点
// 1. await 后面可以追加 promise 对象, 获取resolve的值
// 2. await 必须包裹在aysnc函数当中
// 3. async 函数执行后返回的结果也是一个 promise 对象
// 4. try catch 可以捕捉到reject中的信息