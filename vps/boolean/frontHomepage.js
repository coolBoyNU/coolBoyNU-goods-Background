const query = require('../mysql/sql_db');
const moment = require('moment');
const frontPack = {};

//渲染首页
frontPack.rendering = (req, res) => {
   const { page, pagesize, id, tailID } = req.query;
   let offset = (page - 1) * pagesize;
   let sql = `select t1.*,t2.cate_name,t3.Nick from article t1 left 
                join category t2 on t1.cate_id = t2.cate_id left join 
                users t3 on t1.author = t3.id `
   if (page) {
      sql += `order by t1.id desc limit ${offset},${pagesize}`;
   }
   if (id) {
      sql += `where t1.cate_id like ${id}`;
   }

   if (tailID) {
      sql += `where t1.id like ${tailID}`
   }

   try {
      let result = query(sql);
      result.then(v => {
         v = v.map(item => {
            item.Nick = item.Nick || '匿名发布者';
            item.cate_name = item.cate_name || '未进行分类';
            item.add_date = moment(item.add_date).format('YYYY-MM-DD')
            return item;
         })
         res.json(v);
      })

   } catch (e) {
      console.log('获取数据时出现错误', e);
   }
}

//获取分类
frontPack.ClassTion = async (req, res) => {
   const sql = 'select cate_id,cate_name from category';
   const result = await query(sql);
   res.send(result)
}

module.exports = frontPack;
