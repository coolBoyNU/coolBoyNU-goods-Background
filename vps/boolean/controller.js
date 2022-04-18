const query = require('../mysql/sql_db');
const processTheData = require('../plug_in/imgPath'); //反回图片新路径 ，给用户提示
const MD5 = require('md5-node');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const jwtKey = 'fasdfajlfjalfdjlajfflj';
const controller = {};

controller.logg = async (req, res) => {
   let { user, pwd } = req.body;
   let des = MD5(pwd);
   let sql = `select * from users where username = '${user}' and password = '${des}'`;
   let result = await query(sql);
   if (result[0] !== undefined) {
      let { avatar, Nick } = result[0]
      jwt.sign(
          { user },  //实际开发都用点其它非用户私密信息填入负载
          //私钥
          jwtKey,
          //有效期
          { expiresIn: '2h' },
          //抛出错误信息  生成token
          (err, token) => {
             res.json({ errCode: 20000, user, Nick, avatar, token });
          }
      )
      return;
   }
   res.json({ errCode: 20002, message: '账号或密码错误' })
}

// logo 名称
controller.logoName = async (req, res) => {
   let sql = 'select val,pic from settings'
   let result = await query(sql);
   res.send(result)
}

// 系统设置logo修改
controller.sysSet = async (req, res) => {
   let { logo_name } = req.body;
   let newImage;
   if (req.file) {
      newImage = processTheData.image(req.file);
      newImage = '../../vps/' + newImage;
      const sqlIMG = 'select pic from settings';
      let IMG = await query(sqlIMG);
      let segmentation = IMG[0].pic.split('vps')[1];
      fs.unlink('.' + segmentation, (err => {if (err) throw err}));
   }
   let sql = `update settings set val = '${logo_name}',pic = '${newImage}'`;
   let result = await query(sql);
   let Return = processTheData.Hint(result);
   Return.then(value => {res.json(value)});
}

//个人资料修改
controller.personalData = async (req, res) => {
   let header = req.headers;
   let Token = header.cookie.split('=')[1]
   let tokenData = JSON.parse(Token);
   let { user } = tokenData;
   let newImg
   if (req.file) {
      newImg = processTheData.image(req.file);
   }
   let { intro } = req.body;
   let rul = `select avatar from users where username = ${user}`;
   let pic = await query(rul);
   let PIC = newImg ? newImg : pic[0].avatar;
   //判断图片是否修改，修改的话就删除原来的
   if (newImg !== undefined) {
      let Del = pic[0].avatar.split('vps')[1] //对图片地址进分割
      fs.unlink('.' + Del, (err => {if (err) throw err;}));
   }
   const sql = `update users set avatar = '../../vps/${PIC}', intro = '${intro}' where username = ${user}`;
   let result = await query(sql);
   let returnData = processTheData.Prompt(result);
   returnData.then(value => {res.json(value)});
}

//个人资料页面回显数据
controller.echo = async (req, res) => {
   let sql = 'select avatar,intro from users';
   let result = await query(sql);
   res.json(result[0]);
}

//首页可是化图像数据
controller.visualization = async (req, res) => {
   const sql = 'select count(t1.id) total,t2.cate_name  from article t1 left join category t2 on t1.cate_id = t2.cate_id group by t1.cate_id';
   let result = await query(sql);
   result = result.map(item => {
      if (!item.cate_name) {
         item.cate_name = '未分类';
      }
      return item;
   })
   res.json(result);
}

//修改密码验证旧密码
controller.Theold = (req, res) => {
   const { pwd, user } = req.body;
   const sql = `select password from users where username = ${user}`;
   const result = query(sql);
   result.then(value => {
      const { password } = value[0];
      let des = MD5(pwd);
      if (password === des) {
         res.json({ errCode: 10000, msg: '成功验证' });
      } else {
         res.send(''); //不正确的话传递一个空，配合前端验证
      }
   })
}

//修改密码
controller.NewPwd = (req, res) => {
   const { pwd, user } = req.body;
   let des = MD5(pwd);
   let sql = `update users set password = '${des}' where username = '${user}'`;
   let result = query(sql);
   result.then(value => {
      if (value.affectedRows > 0) {
         res.json({ errCode: '20000', mge: '成功' });
      }
   })
}

module.exports = controller;