$(function(){
  // 提示文字方法
  function tip(text){
    $('.tip').addClass('tipShow').find('span').text(text);
    setTimeout(()=>{
      $('.tip').removeClass('tipShow');
    },1500);
  }
  // 登录按钮变为可点击方法
  function login(){
    var tel = $('#tel').val(),
        valid = $('#valid').val();
    if(/^1[3-9]\d{9}$/.test(tel)&&valid!=''){
      $('._login a').removeClass('dont');
    }else{
      $('._login a').addClass('dont');
    };
  }
  // 点击登录
  $('._login').on('click','a',function(){
    const tel = $('#tel').val(),
          valid = $('#valid').val();
    $('._login a').addClass('load');
    Ajax({
      url:'doLogin',
      data:{mobile:tel,msmCode:valid,channel:1},
      success:function(res){
        console.log(res)
        setTimeout(() => {
          if(res.success){
            console.log(res.data);
          }else{
            $('._login a').removeClass('load');
            tip(res.errorInfo);
          };
        }, 2000);
      }
    })
  });
  // 获取验证码
  var validT;// 验证码定时器
  $('._getvalid').click(function(){
    var _t = $(this),num=60;
    Ajax({
      url:'getSmsVerify',
      data:{mobile:$('._tel').val()},
      success:function(res){
        console.log(res);
        if(res.success){
          // 发送成功，进入倒计时
          _t.addClass('dont').text(num+'s').width(22);
          validT = setInterval(() => {
            num--;
            _t.text(num+'s');
            if(num<=0){
              clearInterval(validT);
              _t.removeClass('dont').text('获取验证码').width(67);
            }
          }, 1000);
        }else{
          tip(res.errorInfo);
        };
      }
    })
  });
  var vT;// 验证登录定时器
  $('#valid').focus(function(){
    vT = setInterval(()=>{
      login();
    },1);
  }).blur(function(){
    clearInterval(vT);
  });
  // 手机号符合格式时，才可点击发送验证码
  var telT;// 手机号验证定时器
  $('._tel').focus(function(){
    var reg=/^1[3-9]\d{9}$/;
    var _t=$(this);
    telT=setInterval(()=>{
      var v=_t.val();
      login();
      if(v!=''){
        if(reg.test(v)&&$('._getvalid').text()=='获取验证码'){
          $('._getvalid').removeClass('dont');
        }else{
          $('._getvalid').addClass('dont');
        };
        _t.val(v.replace(/\D/g,''));
      };
    },1);
  }).blur(function(){
    clearInterval(telT);
  }).keydown(function(e){
    console.log(e.key)
    if(!/(\d|F1-F12|Tab|Home|End|Backspace|Delete|ArrowLeft|ArrowRight)/.test(e.key)){
      return false;
    }
  });
  $('._tel').focus();
})