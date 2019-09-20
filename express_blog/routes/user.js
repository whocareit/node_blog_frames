var express = require('express');
var router = express.Router();

const { UserMes } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

/* post user login  page. */
router.post('/login', function (req, res, next) {
  // 可以通过req.body获取到username password
  const { username, password } = req.body;
  // const { username, password } = req.query;
  const result = UserMes(username, password);
  return result.then(data => {
    if (data.username) {
      //设置session
      req.session.username = data.username;
      req.session.realname = data.realname;

      res.json(
        new SuccessModel()
      )
      return;
    }
    res.json(
      new ErrorModel('登录失败')
    )
  })
});

// //测试登录
// router.get('/login-test',(req ,res ,next) => {
//   if(req.session.username){
//     res.json({
//       erron: 0,
//       msg: '已登录'
//     })
//     return;
//   }
//   res.json({
//     erron: -1,
//     msg: '未登录'
//   })
// })

// // 测试session
// router.get('/session-test',(req, res, next) => {
//   const session = req.session;
//   if(session.viewNum == null){
//     session.viewNum = 0;
//   }
//   session.viewNum++;

//   res.json({
//     viewNum: session.viewNum
//   })

// })

module.exports = router;
