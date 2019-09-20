const { exec,escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const UserMes = (username,password) => {
    //使用mysql中的escape来防止sql的注入
    
    const passWord = escape(password);
    //进行加密
    password = genPassword(passWord);

    const userName = escape(username);

    const sql = `
        select username,realname from user where username = ${userName} and password = ${password};
    `;

    return exec(sql).then( data => {
        console.log(data[0])
        return data[0] || {};
    })
}

module.exports = {
    UserMes
}