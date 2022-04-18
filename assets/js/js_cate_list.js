layui.use([ 'form', 'layer' ], function () {
   let table = layui.table,
       $ = layui.$,
       form = layui.form;

   //内容主体区
   // section 渲染数据
   table.render({
      elem: '#test'
      , url: '/gainData'
      , height: 800
      , toolbar: '#toolbarDemo'
      , cols: [ [
         { type: 'radio' }
         , { field: 'Co_id', width: 80, title: 'ID', sort: true }
         , { field: 'username', width: 120, title: '用户名', edit: 'text' }
         , { field: 'email', width: 250, title: '邮箱', sort: true, edit: 'text' }
         , { field: 'integral', width: 180, title: '积分' }
         , { field: 'sex', title: '性别', width: 80, edit: 'text' }
         , { field: 'loginNum', width: 200, title: '登录次数', sort: true }
         , { field: 'right', width: 150, title: '操作', sort: true, toolbar: '#barDemo' }
      ] ]
      , page: false
   });

   table.on('tool(test)', function (obj) {
      //section 删除
      if (obj.event === 'del') {
         layer.confirm('是否确认删除', {
            btn: [ '确认', '取消' ]
         }, function (index) {
            obj.del();
            layer.close(index);
            let { Co_id } = obj.data;
            $.ajax({
               url: '/deluser',
               type: 'post',
               data: { Co_id },
               dataType: 'json',
               success: function (data) {
                  if (data.errCode === 20000) {
                     layer.msg('删除成功');
                  }
               }
            })
         })
      }

      //section 编辑
      if (obj.event === 'edit') {
         let newData = obj.data;
         $.ajax({
            url: '/alter',
            type: 'post',
            data: newData,
            dataType: 'text',
            success: function (data) {
               layer.msg(data);
            }
         })
      }
   })

   // section 添加按钮
   table.on('toolbar(test)', function (obj) {
      if (obj.event === 'add_ID') {
         $('#box_add').css('display', 'block');
      }
      // 隐藏添加框
      let box_add = document.querySelector('#box_add');
      window.onclick = function close(e) {
         if (e.target === box_add) {
            box_add.style.display = "none";
         }
      };
   });

   //添加用户
   form.on('submit(sortAdd)', function (data) {
      $.ajax({
         url: '/addData',
         type: 'post',
         data: data.field,
         dataType: 'json',
         success: function (data) {
            if (data.errCode === 20000) {
               layer.msg('添加成功');
               setTimeout(() => {
                  //数据重构
                  var tableIns = table.render({
                     elem: '#test'
                     , url: '/gainData'
                     , height: 800
                     , toolbar: '#toolbarDemo'
                     , cols: [ [
                        { type: 'radio' }
                        , { field: 'Co_id', width: 80, title: 'ID', sort: true }
                        , { field: 'username', width: 120, title: '用户名', edit: 'text' }
                        , { field: 'email', width: 250, title: '邮箱', sort: true, edit: 'text' }
                        , { field: 'integral', width: 180, title: '积分' }
                        , { field: 'sex', title: '性别', width: 80, edit: 'text' }
                        , { field: 'loginNum', width: 200, title: '登录次数', sort: true }
                        , { field: 'right', width: 150, title: '操作', sort: true, toolbar: '#barDemo' }
                     ] ]
                     , page: false
                  });
                  $('#box_add').css('display', 'none');
               }, 1000)
            }
         }
      })
      return false;
   })
})