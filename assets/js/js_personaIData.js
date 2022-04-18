layui.use('form', function () {
   let form = layui.form,
       $ = layui.jquery;

   //内容回显
   $.get('/echo', function (data) {
      $('#imgPic').attr('src', data.avatar);
      $('textarea[name=intro]').val(data.intro);
   })

   //提交表单
   form.on('submit(PersonIDDemo)', function () {
      let formData = new FormData($('#Sheet')[0]);
      ajaxPost(formData).then(value => {
         if (value.errCode === 20000) {
            layer.msg('添加成功', function () {
               location.href = '/index';
            });
            return false;
         }
         layer.msg('添加失败', { icon: 2 });
      })
      return false;
   });

   function ajaxPost(RX) {
      return new Promise(resolve => {
         $.ajax({
            url: '/personalData',
            type: 'post',
            processData: false,
            contentType: false,
            data: RX,
            dataType: 'json',
            success: function (data) {
               resolve(data);
            }
         })
      })
   }

   //图片预览
   $('#chainPic').change(function () {
      let file = this.files[0]; //图片二进制
      let Size = file.size / 1024 / 1024;
      if (Size <= 4) {
         let fileReader = new FileReader(); //预览图片
         fileReader.readAsDataURL(file);
         fileReader.onload = function () {
            $('#imgPic').attr('src', this.result);
            localStorage.pic = this.result;
         }
      } else {
         layer.msg('图片太大无法上传', { icon: 2 });
      }
   })

   //昵称
   let ToObtainNickname = document.cookie.split('=')[1]
   let Nick_name = JSON.parse(ToObtainNickname)
   document.getElementsByName('nickname')[0].value = Nick_name.Nick;
})