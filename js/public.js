// ajax 方法
var rootUrl = 'http://120.79.6.179:8081/mobile-api/';
// var rootUrl = '';
// var rootUrl = 'http://120.79.6.179/dianli/eric/';
function Ajax({ url:url, data:data, type:type,timeout:timeout, beforeSend:beforeSend, success:success, complete:complete}){
  if(!type) type='post';
  if(!timeout) timeout=0;
  $.ajax({
    url:rootUrl+url,
    data:data,
    timeout:timeout,
    type:type,
    dataType:'json',
    beforeSend:function(){
      if(beforeSend) beforeSend();
    },
    success:function(res){
      if(success) success(res);
    },
    complete:function(){
      if(complete) complete();
    },
    error:function(e,s){
      console.log('请求错误！');
      if(s=='timeout'){
        console.log('请求超时！');
      }
    }
  })
}
