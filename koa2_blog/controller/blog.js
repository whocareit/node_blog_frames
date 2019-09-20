const xss = require('xss');
const { exec } = require('../db/mysql')

//处理信息层
const getList = async (author,keywords) => {
    //此部分用于连接数据库而做，在这里使用1=1是为了防止如果author或者是keywords都不存在
    //的时候语法报错
    let sql = `select * from blogs where 1=1 `;
    if(author){
        sql += `and authors='${author}' `;
    }
    if(keywords){
        sql += `and title like '%${keywords}%' `;
    }
    sql += `order by createtime desc;`

    //在这里需要注意的就是使用的exec是一个Promise对象
    return await exec(sql);
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`;
    //此时需要返回一个对象
    const rows = await exec(sql);
    return rows[0];
}

const newBlog = async (blogData = {} ) => {
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const author = blogData.author;
    const createTime = Date.now();
    
    const sql = `
    insert into blogs ( title, content, createtime, authors)
    values ( '${title}', '${content}', '${createTime}', '${author}' );
    `;
    const insertData = await exec(sql);
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id,blogData = {}) => {
    //id 为博客更新的 id
    //blogData 为博客更新的内容
    const title = blogData.title;
    const content = blogData.content;
    const sql = `
        update blogs set title = '${title}',content = '${content}' where id = ${id};
    `;
    const updataData = await exec(sql);
    
    if(updataData.affectedRows > 0){
        return true;
    } else {
        return false;
    }
}

const delBlog = async (id,author) => {
    const sql = `
        delete from blogs where id = ${id} and authors = '${author}';
    `;
    const deleteData = await exec(sql);
    if(deleteData.affectedRows > 0){
        return true;
    }
    return false;
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}