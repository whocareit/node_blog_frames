// 需要引入两个文件，一个fs，用于对文件做一系列操作
// 引入path，获取文件的路径
const fs = require('fs');
const path = require('path');

//获取文件的位置，通过path来寻找
const fileName = path.resolve(__dirname,'data.txt');

//读取文件
// fs.readFile(fileName,(err, data) => {
//     if(err){
//         console.error(err);
//         return;
//     }
//     //此时获取到的文件格式是二进制的需要使用toString将其转换成字符串
//     console.log('data is \n',data.toString())
// })

//写入文件
const content = '\n这是新写入的内容';
const opt = {
    flag: 'a' //'a'表示新追加的内容  'w'表示覆盖的内容
}
//需要在writeFile中传入四个参数，第一个参数表示需要写入的文件的路径，第二个参数表示要写入的内容  第三个参数表示要写入的方式
//第四个参数传入一个错误类型之后的反应
fs.writeFile(fileName , content , opt , err => {
    if(err){
        console.error(err);
    }
})