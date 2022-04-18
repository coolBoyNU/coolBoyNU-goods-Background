module.exports = {
   // 只会在当前目录获取eslint配置文件，不会跑到父级目录中
   "root": true,
   // 指定代码运行的环境，指定后方可使用一些全局变量如：window，console，global等等
   "env": {
      "browser": true,
      "es2021": true,
      "node": true
   },
   "extends": "eslint:recommended",
   "parserOptions": {
      "ecmaVersion": "latest"
   },
   //（关闭规则：'off' 或 0   ） （警告规则：'warn' 或 1   ） （错误退出：'error' 或 2   ）
   "rules": {
      "no-unused-vars": 1, //no-unused-vars
      "no-await-in-loop": "warn", // 禁止在循环中出现 await
      "no-func-assign": "warn", // 禁止对 function 声明重新赋值
      "no-empty-pattern": "warn", //禁止使用空解构模式
   }
}
