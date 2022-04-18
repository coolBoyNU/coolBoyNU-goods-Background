const query = require('../mysql/sql_db');
const processTheData = require('../plug_in/imgPath'); //反回图片新路径 ，给用户提示
const moment = require('moment');
const fs = require('fs');
const TheLists = {};

//文章列表获取内容
TheLists.articleData = async (req, res) => {
   //接收页码和显示条数
   const { page, limit, keyword } = req.query;
   // sql 获取所有id的总数
   let sql = 'select count(id) as count from article where 1';
   if (keyword) {
      sql += ` and title like '%${keyword}%'`
   }
   let result = await query(sql);
   let { count } = result[0];
   // 3. 根据page和limit获取指定页码的数据
   // a b c d e f g H i j k 每页显示2条
   // 第1页 a b 、 第2页、 c d  ... 3页 e f 、4页 H i   5页 j k
   // 查询起始位置 : （当前页-1）* 每页显示的条数
   // page=1 offset = 0,2
   // page=2 offset = 2,2
   // page=3 offset = 4,2
   // page=4 offset = 6,2
   // page=5 offset = 8,2
   const offset = (page - 1) * limit;
   let sqlTake = 'select t1.*,t2.cate_name,t3.Nick from article t1 left join category t2 on t1.cate_id = t2.cate_id left join users t3 on t1.author = t3.id where 1';
   if (keyword) {
      sqlTake += ` and t1.title like '%${keyword}%'`;
   }
   sqlTake += ` order by t1.id desc limit ${offset},${limit}`;

   let data = await query(sqlTake);
   data = data.map(item => {
      let { status, cate_name, Nick } = item;
      item.statusText = status === 1 ? '审核通过' : '审核中';
      item.cate_name = cate_name || '未分类';
      item.username = Nick || '匿名者';
      //时间格式转换
      item.add_date = moment().format('YYYY-MM-D  HH:mm:ss');
      return item;
   })
   res.json({ count, data, code: 0, msg: '数据响应' });
}
//文章表删除
TheLists.delArticle = async (req, res) => {
   const { id } = req.params;
   let sql = `delete from article where id = ${id}`;
   let result = await query(sql);
   let returnData = processTheData.Prompt(result);
   returnData.then(value => {res.json(value)});
}

//文章添加获取分类
TheLists.cateDta = async (req, res) => {
   const sql = 'select * from category';
   const result = await query(sql);
   res.json(result);
}

//文章添加上传数据
TheLists.NewAddData = async (req, res) => {
   let { title, cate_id, review, TextEdi, user } = req.body;
   const add_date = moment().format('YYYY-MM-DD HH:mm:ss');
   if (req.file) {
      let newImg = processTheData.image(req.file);
      const sql = `insert into article(title,content,author,status,add_date,pic,cate_id) values ('${title}','${TextEdi}','${user}','${review}','${add_date}','../../vps/${newImg}','${cate_id}')`;
      const result = await query(sql);
      let returnData = processTheData.Prompt(result);
      returnData.then(value => {res.json(value)});
   } else {
      res.json({ errCode: 20002, Msg: '必须上传封面图片' });
   }
}

//编辑页面数据回显
TheLists.fetchOneArt = async (req, res) => {
   const { id } = req.query;
   const sql = `select * from article where id = ${id}`;
   const result = await query(sql);
   res.json(result[0]);
}

//修改文章页面数据
TheLists.reviseData = async (req, res) => {
   const { title, cate_id, review, TextEdi, id } = req.body;
   let freshToimage;
   if (req.file) {
      freshToimage = processTheData.image(req.file);
      freshToimage = '../../vps/' + freshToimage;
   }
   const sqlImg = `select pic from article where id = ${id}`;
   const resImg = await query(sqlImg);
   const { pic } = resImg[0];
   let Img = freshToimage ? freshToimage : pic;
   if (freshToimage !== undefined) {
      let Del = pic.split('vps')[1]
      fs.unlink('.' + Del, (err => {if (err) throw err;}));
   }
   const sql = `update article set title = '${title}', cate_id = '${cate_id}', status = '${review}', content = '${TextEdi}', pic = '${Img}' where id = ${id}`;
   try {
      const result = await query(sql);
      let returnData = processTheData.Prompt(result);
      returnData.then(value => {res.json(value)});
   } catch (e) {
      console.log('出错信息为：' + e);
   }
}

module.exports = TheLists;