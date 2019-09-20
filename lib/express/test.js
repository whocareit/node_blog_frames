const express = require('./like-press');

//本次http请求实例
const app = express();

app.use((req ,res ,next ) => {
    console.log('请求开始。。。。。', req.method , req.url );
    next();
})

app.use((req ,res , next) => {
    //假设在处理cookie
    req.cookie = {
        uerId : '5465sh'
    }
    next();
})

app.use((req ,res ,next) => {
    //假设处理 post data
    //异步处理
    setTimeout(() => {
        req.body = {
            a: 12346,
            b: "dhsh"
        }
        next();
    })
})

app.use('/api',(req ,res ,next) => {
    console.log('处理  api 路由。。。。');
    next();
})

app.get('/api',(req ,res ,next) => {
    console.log('处理 get api 路由....');
    next();
})

app.post('/api',(req ,res ,next) => {
    console.log('处理 post api 路由....');
    next();
})

//模拟登录验证：
const loginCheck = (req ,res ,next) => {
    setTimeout(() => {
        console.log('模拟登录验证失败');
        res.json({
            erron: -1,
            msg: '登录失败'
        })

        //console.log('登录验证成功')
        //只有登录成功之后才会去执行next()
        //next()
    })
}

app.get('/api/get-cookie',loginCheck,(req ,res ,next) => {
    console.log('deal /api/get-cookie');
    res.json({
        erron: 0,
        data: req.cookie
    }); 
})

app.post('/api/get-post-data',(req ,res ,next) => {
    console.log('deal /api/get-post-data');
    res.json({
        erron: 0,
        data: req.body
    })
})

app.use((req ,res ,next) => {
    console.log('deal 404 not found');
    res.json({
        erron: -1,
        msg: '404 not found'
    })
})

//listen 3000 port
app.listen(8000,() => {
    console.log('server is running on 8000 port');
})