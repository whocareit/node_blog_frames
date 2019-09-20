const router = require('koa-router')()

const { UserMes } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 表示根路由，必须先访问这个路由
router.prefix('/api/user')

//ctx中包含有已经处理好的req res
router.post('/login', async  (ctx, next) => {
  const { username, password } = ctx.request.body;
  const data = await UserMes(username, password);
    if (data.username) {
      //设置session
      ctx.session.username = data.username;
      ctx.session.realname = data.realname;
      ctx.body = new SuccessModel()
      return;
    }
    ctx.body = new ErrorModel('登录失败')
})

// session test
// router.get('/session-test', async function (ctx, next)  {
//     if(ctx.session.viewCount == null){
//         ctx.session.viewCount = 0;
//     }
//     ctx.session.viewCount++;
//     ctx.body = {
//         erron: 0,
//         viewCount:  ctx.session.viewCount
//     }
// })

module.exports = router