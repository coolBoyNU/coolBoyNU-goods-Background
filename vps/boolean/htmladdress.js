const path = require('path');
const siteHtml = {};
//登录页面
siteHtml.login = async (req, res) => {
   res.sendFile(path.resolve('../views/login.html'));
}

/*首页逻辑内容*/
siteHtml.index = (req, res) => {
   res.render(path.resolve('../views/index.html'));
}

//添加页面
siteHtml.cateList = (req, res) => {
   res.render(path.resolve('../views/OtherPages/cate_list.html'));
}

//设置页面
siteHtml.Setup = (req, res) => {
   res.render(path.resolve('../views/OtherPages/Setup.html'));
}

//个人资料页面跳转
siteHtml.PersonalDataLi = (req, res) => {
   res.render(path.resolve('../views/OtherPages/PersonalData.html'));
}

//文章列表获取
siteHtml.Article = (req, res) => {
   res.render(path.resolve('../views/OtherPages/Article.html'));
}

//文章页面添加跳转
siteHtml.artAdd = (req, res) => {
   res.render(path.resolve('../views/OtherPages/add_Article.html'));
}

//文章页面修改跳转
siteHtml.editArticle = (req, res) => {
   res.render(path.resolve('../views/OtherPages/edit_Article.html'));
}

module.exports = siteHtml; //抛出