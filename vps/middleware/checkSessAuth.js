const jwt = require('jsonwebtoken');
const jwtKey = 'fasdfajlfjalfdjlajfflj';
module.exports = (req, res, next) => {
   // 放行的路由
   const notSessAuth = [ '/login', '/logg' ];
   const reqPath = req.path.toLowerCase()
   if (notSessAuth.includes(reqPath)) {
      // 在，放行
      next();
   } else {
      //登录后验证 Token
      // 获取请求头
      const header = req.headers;
      if (header.cookie) {
         let Token = header.cookie.split('=')[1]
         let tokenData = JSON.parse(Token);
         let { token } = tokenData
         jwt.verify(token, jwtKey, (err) => {
            if (err) res.sendStatus(403) //发生错误就不允许请求的进一步访问
            // payload 是生成 jwt 的负载
            next();
         })
      } else {
         res.redirect('/login');
      }
   }
}