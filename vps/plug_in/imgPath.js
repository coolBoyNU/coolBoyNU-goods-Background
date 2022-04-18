const fs = require('fs');

//修改图片路径
function image(PAth) {
   let { originalname, destination, filename } = PAth;
   //lastIndexOf()查找某个字符串的索引
   let dotIndex = originalname.lastIndexOf('.');
   //截取从 . 到末尾的字符
   let suffix = originalname.substr(dotIndex);
   // 路径加上 旧文件名
   let oldName = `${destination}${filename}`;
   // 路径加上 新文件名
   let newName = `${destination}${filename}${suffix}`;
   fs.rename(oldName, newName, err => {
      if (err) {
         throw err; //抛出错误
      }
   })
   return newName;
}

//给用户提示
function Hint(result) {
   return new Promise((resolve, reject) => {
      const resData = {
         errCode: 20000,
         msg: '成功'
      }
      // 3. 根据删除的结果给用户提示
      if (result.affectedRows > 0) {
         resolve(resData); // 成功
      } else {
         resData.errCode = 20002;
         resData.msg = '失败';
         reject(resData); // 失败
      }
   })
}

//给用户提示 2.0
function Prompt(result) {
   return new Promise((resolve, reject) => {
      let resData = { errCode: 20000, Msg: 'Successful response' };
      if (result.affectedRows > 0) {
         resolve(resData);//成功
      } else {
         resData.errCode = 20002;
         resData.Msg = 'Response failed';
         reject(resData)// 失败
      }
   })
}

module.exports = {
   image: image, //修改图片路径
   Hint: Hint, //给用户提示
   Prompt: Prompt, //给用户提示2.0
}