const express = require('express');
const frontDesk = express.Router();
const frontHomepage = require('../boolean/frontHomepage');

frontDesk.get('/rendering', frontHomepage.rendering); //首页渲染

frontDesk.get('/rendering/ClassTion',frontHomepage.ClassTion); //获取分类

module.exports = frontDesk;