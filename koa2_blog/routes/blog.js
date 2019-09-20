const router = require('koa-router')()
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

// 表示根路由，必须先访问这个路由
router.prefix('/api/blog')

//ctx中包含有已经处理好的req res
router.get('/list', async (ctx, next) => {
    const author = ctx.query.author || '';
    const keywords = ctx.query.keywords || '';
    if (ctx.session.username == null) {
        //未登录
        ctx.body = new ErrorModel('未登录')
        return;
    }
    //强调是自己的博客
    author = ctx.session.username;

    // const listData = getList(author,keywords);
    // return new SuccessModel(listData);
    //因为这里result返回的是一个promise对象因此在这里使用then方法来进行处理
    const listData = await getList(author, keywords);
    return ctx.body = new SuccessModel(listData);
})

router.get('detail', async (ctx, next) => {
    const detailData = getDetail(ctx.query.id);
    return ctx.body = new SuccessModel(detailData);
})

router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body;
    body = ctx.session.username;
    const data = await newBlog(body);
    return ctx.body = new SuccessModel(data);
})

router.post('/update', loginCheck, async (ctx, next) => {
    const body = ctx.request.body;
    const val = await updateBlog(ctx.query.id, body);
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})

router.post('/delete', loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const val = await delBlog(ctx.query.id, author);
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('删除博客失败')
    }
})
module.exports = router
