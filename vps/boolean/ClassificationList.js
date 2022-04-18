const query = require('../mysql/sql_db');
const processTheData = require('../plug_in/imgPath'); //反回图片新路径 ，给用户提示
const classify = {};

//分类列表获取数据
classify.gainData = (req, res) => {
   let sql = 'select * from personnel order by Co_id asc';
   let ruler = query(sql);
   ruler.then(v => {
      let data = {
         code: 0,
         count: 10,
         data: v
      }
      res.json(data)
   })
}

//分类列表删除
classify.deluser = (req, res) => {
   let { Co_id } = req.body;
   let sql = `delete from Personnel where Co_id=${Co_id}`;
   let ruler = query(sql);
   ruler.then(value => {
      let returnData = processTheData.Prompt(value);
      returnData.then(value => {res.json(value)});
   })
}

//分类列表修改
classify.alter = (req, res) => {
   let { Co_id, username, email, integral, sex, loginNum } = req.body;
   let sql = `update Personnel set username = '${username}', email = '${email}', integral = '${integral}', sex = '${sex}', loginNum = '${loginNum}' where Co_id = ${Co_id} `;
   let ruler = query(sql);
   ruler.then(value => {
      if (value.affectedRows > 0) {
         res.send('修改成功')
      }
   })
}

//分类列表添加
classify.addData = (req, res) => {
   let { username, email, sex } = req.body;
   let integral = Math.floor(Math.random() * 20000);
   let loginNum = Math.floor(Math.random() * 200);
   let sql = `insert into Personnel(username,email,sex,integral,loginNum) values('${username}','${email}','${sex}','${integral}','${loginNum}')`;
   let ruler = query(sql);
   ruler.then(value => {
       let returnData = processTheData.Prompt(value);
      returnData.then(value => {res.json(value)});
   })
}

module.exports = classify;