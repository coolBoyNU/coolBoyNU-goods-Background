layui.use('form', function () {
   let form = layui.form,
       $ = layui.$;
   // 获取本地存储的账户名用来配合修改密码验证
   let ToObtainNickname = document.cookie.split('=')[1];
   let Nick_name = JSON.parse(ToObtainNickname);

   //点击后跳出修改页面
   $('#ChangePassword').click(() => {
      $('#background-pop').css('display', 'block');
   })
   // 隐藏修改页面
   let backgroundPop = document.querySelector('#background-pop');
   window.onclick = function close(e) {
      if (e.target === backgroundPop) {
         backgroundPop.style.display = "none";
      }
   };

   //用来验证密码是否正确，或相同
   function _ifPwd(P_ID, val, val2 = val) {
      if (!val) {
         P_ID.html('<i class="iconfont icon-cuowu11 colr_del" ></i >');
         return false;
      }
      if (val !== val2) {
         P_ID.html('<i class="iconfont icon-cuowu11 colr_del" ></i >');
         return false;
      }
      P_ID.html('<i class="iconfont icon-zhengquequeding colr" ></i >');
      return true;
   }

   let _ifTrueFalse1, _ifTrueFalse2, _ifTrueFalse3;
   // 修改密码监听旧密码
   $('input[name=TheOld_pwd]').blur(function () {
      $.post('/Theold', { pwd: this.value, user: Nick_name.user }).then(value => {
         _ifTrueFalse1 = _ifPwd($('#Theo1'), value)
      }, 'json')
   })
   //新密码
   $('input[name=New_pwd]').blur(function () {
      _ifTrueFalse2 = _ifPwd($('#Theo2'), this.value)
   })

   //确认新密码
   $('input[name=Ack_pwd]').blur(function () {
      _ifTrueFalse3 = _ifPwd($('#Theo3'), this.value, $('input[name=New_pwd]').val());
   })

   // 修改密码监听提交
   form.on('submit(demo1_pwd)', function (data) {
      if (!_ifTrueFalse1 || !_ifTrueFalse2 || !_ifTrueFalse3) {
         layer.msg('仔细查看是否输入有错', { icon: 5 });
         return false;
      }
      //确认后做最后的新旧密码验证
      if (data.field.Ack_pwd !== data.field.New_pwd) {
         layer.msg('新旧密码不相同', { icon: 5 });
         $('#Theo2').html('<i class="iconfont icon-cuowu11 colr_del" ></i >');
         return false;
      }

      $.post('/NewPwd', { pwd: data.field.Ack_pwd, user: Nick_name.user }).then(value => {
         if (value.errCode === '20000') {
            layer.msg('修改成功');
            setTimeout(() => {
               location.href = '/login';
            }, 1000);
         } else {
            layer.msg('修改失败', { icon: 2 });
         }
      }, 'json');
      return false;
   });
})