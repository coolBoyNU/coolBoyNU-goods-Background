const express = require('express');
const router = express.Router();
const controller = require('../boolean/controller.js');
const siteHtml = require('../boolean/htmladdress'); //网页跳转地址
const classify = require('../boolean/ClassificationList'); //分类列表
const TheLists = require('../boolean/TheArticleLists'); //文章列表
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

/*-----------页面跳转路由-----------------*/
router.get('/login', siteHtml.login); //登录页面

router.get('/index', siteHtml.index); //首页跳转

router.get('/Setup', siteHtml.Setup); //设置页面

router.get('/cateList', siteHtml.cateList); //添加页面

router.get('/PersonalDataLi', siteHtml.PersonalDataLi) //个人资料页面跳转

router.get('/Article', siteHtml.Article); //文章列表跳转

router.get('/artAdd', siteHtml.artAdd); //文章页面添加跳转

router.get('/editArticle', siteHtml.editArticle);//文章页面修改跳转

/*------------分类列表---------------*/
router.get('/gainData', classify.gainData); //分类列表获取数据

router.post('/deluser', classify.deluser); //分类列表删除

router.post('/alter', classify.alter); //分类列表修改

router.post('/addData', classify.addData); //分类列表添加

/*------------文章列表--------------*/
router.get('/articleData', TheLists.articleData); //文章列表获取

router.get('/ArticleDel/:id', TheLists.delArticle) //文章表删除

router.get('/cateData', TheLists.cateDta); //文章添加获取分类

router.post('/NewAddData', upload.single('fileImg'), TheLists.NewAddData); //文章添加上传数据

router.get('/fetchOneArt', TheLists.fetchOneArt); //回显数据

router.post('/reviseData', upload.single('fileImg'), TheLists.reviseData); //修改文章数据

/*------------登录验证-------------*/
router.post('/logg', controller.logg); //发送账户验证

/*------------其它------------*/
router.get('/logoName', controller.logoName); //logo名称

router.post('/sysSet',upload.single('fileImg'), controller.sysSet); //logo名称

router.post('/personalData', upload.single('pic'), controller.personalData) //个人资料修改

router.get('/echo', controller.echo); //个人资料页面回显数据

router.get('/visualization', controller.visualization); //首页可是化图像数据

router.post('/Theold', controller.Theold); //修改密码验证旧密码

router.post('/NewPwd', controller.NewPwd) //修改密码

module.exports = router;