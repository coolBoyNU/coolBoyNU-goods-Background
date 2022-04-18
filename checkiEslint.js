const chokidar = require('chokidar');
const execSh = require('exec-sh');

// 监听目录src的变化
chokidar.watch('./vps/').on('all', (event, path) => {
   // 文件修改了，自动执行eslint检测语法
   if (event === 'change') {
      execSh("npx eslint ./vps/", function (err) {
         if (err) { console.log("Exit code: ", err) }
      });
   }
});