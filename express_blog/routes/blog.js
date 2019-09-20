var express = require('express');
var router = express.Router();

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');


/* GET list page. */
router.get('/list', (req, res, next) => {
  const author = req.query.author || '';
  const keywords = req.query.keywords || '';
  if (req.session.username == null) {
    //未登录
    res.json(
      new ErrorModel('未登录')
    )
    return;
  }
  //强调是自己的博客
  author = req.session.username;

  // const listData = getList(author,keywords);
  // return new SuccessModel(listData);
  //因为这里result返回的是一个promise对象因此在这里使用then方法来进行处理
  const result = getList(author, keywords);
  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
});

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id);
  return result.then(detailData => {
    res.json(
      new SuccessModel(detailData)
    )
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const result = newBlog(req.body);
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body);
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})

router.post('delete', loginCheck, (req, res, next) => {
  const author = req.session.username;
  const result = delBlog(req.query.id, author);
  return result.then(val => {
    if (val) {
      returnres.json(new SuccessModel());
    } else {
      res.json(new ErrorModel('删除博客失败'));
    }

  })
})

module.exports = router;
