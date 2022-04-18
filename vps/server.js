const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const router = require('./routing/router.js');
const frontRouter = require('./routing/frontRouter');
const checkSessAuth = require('./middleware/checkSessAuth')

// 获取body的请求体参数
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); //跨域

app.use(express.static('../../backend')); // 托管文件夹

//设置模板后缀为html文件
app.engine('html', require('express-art-template'));

//匹配路径
app.set('views', path.join(__dirname, '/'));

app.use(frontRouter); //前端渲染

// 中间件，判断session阻止翻墙
app.use(checkSessAuth)

app.use(router);

app.listen(3301, () => console.log('启动成功：3301'));