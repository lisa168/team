/**
 * Created by zls on 2015/2/5.
 */
;
var self_url = $('#woall_nav_js').attr('src').replace(/\/js\/woaoNav.js\?.*$/,'');

var cMenu = {};

cMenu.loadCSS=function(url,fn){
	var cssLink = document.createElement("link");
	cssLink.rel = "stylesheet";
	cssLink.rev = "stylesheet";
	cssLink.type = "text/css";
	cssLink.media = "screen";
	cssLink.href = url;
	$('head').append(cssLink);
	cssLink.onload = fn;
}
var timer  = null;	
var ajaxv = false;
var checkPhone = false;

cMenu.vCode = function(){
                if(ajaxv){
                    return false;
                }
                ajaxv = true;
                $.ajax({
                        type: "POST",
                        url: "/tree/circlelogin/getcodex",
                        data: "mobile="+$('#woaoMenu .tel').val(),
                        success: function(msg){
                                var data = eval('('+msg+')');
                                alert(data.message);
                                ajaxv=false;
                                if(data.status==0){                                       
                                        checkPhone=false;
                                        $('#woaoMenu .tel').focus();
                                        return false;
                                };
                                checkPhone = true;
                                var num = 30; 
                                $('#woaoMenu .getyzm').attr('disabled','true');
                                    clearTimeout(timer);
                                    timer = setInterval(function () {
                                    num--;
                                    $('#woaoMenu .getyzm').html(num+'秒后重新获取');
                                    $('#woaoMenu .getyzm').addClass('active');
                                    if(num==0){
                                        clearTimeout(timer);
                                        $('#woaoMenu .getyzm').html('重新获取验证码');
                                    $('#woaoMenu .getyzm').removeClass('active');
                                    }
                                },1000); 
                            }
                    });
		};
                
                
cMenu.PostCode = function(fn){
    return function(){
                if(ajaxv||!checkPhone){
                    alert('请先获取验证码');
                    return false;
                }
                ajaxv = true;
                $.ajax({
                        type: "POST",
                        url: "/tree/circlelogin/regmobile",
                        data: "mobile="+$('#woaoMenu .tel').val()+'&vCode='+$('#woaoMenu .loginyzm').val(),
                        success: function(msg){
                                var data = eval('('+msg+')');					 
                                if(data.status==0){						  
                                        alert(data.message);                                        
                                }else if(data.status==1){
                                        alert(data.message);
                                        fn(null,data.data);
                                }
                                ajaxv=false;
                            }
                    });
    };
};

cMenu.Login = function(fn){
       return function(){     
            if(ajaxv){
                return false;
            }
            ajaxv = true;
            $.ajax({
                    type: "POST",
                    url: "/tree/circlelogin/index",
                    data: "userName="+$('#woaoMenu .tel_num').val()+'&passWord='+$('#woaoMenu .psd').val(),
                    success: function(msg){
                            var data = eval('('+msg+')');					 
                            if(data.status==0){		  
                                    alert(data.message);                                        
                            }else if(data.status==1){
                                    alert(data.message);
                                    fn(null,data.data);
                            }
                            ajaxv=false;
                        }
                });
        };
   };

cMenu.Showlogin = function(){
    $('#woaoMenu .fastLogin').show();
    return false;
};

cMenu.Hidelogin = function(){
    $('#woaoMenu .fastLogin').hide();
    return false;
};

cMenu.Togglelogin=function(){
    $('#woaoMenu .fastLogin').toggleClass('active');
    return false;
}

cMenu.nav_data = ['<div class="weixinfcbox" >',
    ' <div class="weixinfctext"><img src="'+ self_url +'/images/weixinfc.png"/></div>',
    '</div>',
    '<div class="woaoNav" id="woaoMenu"> <a href="javascript:;" class="homeNav"></a>',
    ' <div class="navBtn_open">',
    '  <ul class="nav_cont">',
    '   <li class="woaoshowBtn"  yyiphone="http://mp.weixin.qq.com/mp/redirect?url=https://itunes.apple.com/cn/app/wo-ao/id946327726?l=en&amp;mt=8" yyandroid="http://www.woall.com/download/woall.apk"> <a href=""><i class="c_con_01"></i>',
    '    <p>我傲内查看</p>',
    '   </li></a>',
    '   <li class="copyBtn" >',
    '  <i class="c_con_02"></i>',
    '    <p>复制</p>',
    '   </li>',
    '   <li class="attentionBtn">',
    '    <div class="attzz"> <i class="c_con_03"></i>',
    '     <p>关注</p>',
    '    </div>',
    '    <div class="fastLogin login">',
    '     <div class="closeBtn"></div>',
    '     <div class="leftIcon"></div>',
    '     <div class="tips">登陆后即可关注此小站</div>',
    '     <div class="telnum clearfix">',
    '      <input type="tel" placeholder="手机号" class="tel">',
    '      <font class="getyzm">获取验证码</font> </div>',
    '     <input type="text" placeholder="验证码" class="loginyzm">',
    '     <input type="button" value="登录" class="loginBtn postcode">',
    '     <div class="change">切换到我傲账户登录</div>',
    '    </div>',
    '    <div class="woaoLogin login">',
    '     <div class="closeBtn"></div>',
    '     <div class="tips">我傲账户登录</div>',
    '     <div class="leftIcon"></div>',
    '     <input type="text" placeholder="手机号/昵称" class="tel_num">',
    '     <input type="password" placeholder="密码" class="psd">',
    '     <input type="button" value="登录" class="loginBtn postlogin">',
    '     <div class="change">切换到快捷登录</div>',
    '    </div>',
    '   </li>',
    '   <li class="editBtn"> <i class="c_con_04"></i>',
    '    <p>编辑</p>',
    '   </li>',
    '   <li class="homeBtn"><i class="c_con_05"></i>',
    '    <p>首页</p>',
    '   </li>',
    '  </ul>',
    ' </div>',
    '</div>'
].join('');

cMenu.init = function($, fn){
    this.loadCSS(self_url+"/css/woaoNav.css",function(){
      $('body').append(cMenu.nav_data);
      cMenu.Nav=function() {     
            $(document).on('click','#woaoMenu .homeNav',function () {
                    $(this).toggleClass('homeNav_open');
                    $('#woaoMenu .navBtn_open').toggleClass('active');
            });

            $(document).on('click','#woaoMenu .closeBtn',function () {
                    $(this).parents('.fastLogin').removeClass('active');
                    return false;
            });
        }; 
        //复制回调
        cMenu.setcopy = function (fn) {
                $(document).on('click','#woaoMenu .copyBtn',fn);
        }
        //关注回调
        cMenu.focus = function (fn) {
                $(document).on('click','#woaoMenu .attzz',fn);
                $(document).on('click','#woaoMenu .postlogin',
                    cMenu.Login(fn)
                );
                $(document).on('click','#woaoMenu .postcode',
                    cMenu.PostCode(fn)
                );
        }
        
        //编辑回调
        cMenu.editor = function (fn) {
            alert('nimabiiii')
                $(document).on('click','#woaoMenu .editBtn i',function(){ alert('cao'); fn(); });
        }
          $(document).on('touchend','#woaoMenu .editBtn i',function(){ alert('cao') });
        $('#woaoMenu .editBtn').css({'background':'red'});
         $('#woaoMenu .nav_cont').css({'zIndex':'1000000000'});
         $('#woaoMenu .navBtn_open').css({
             'zIndex':'1000000000'
         });
        $('#woaoMenu').css({
             'zIndex':'1000000000'
        })
        //首页回调
        cMenu.home = function (fn) {
                $(document).on('click','#woaoMenu .homeBtn',fn);
        }
        //导航按钮显示隐藏
        cMenu.look=function (elment,play) {
                if(play=='show'){
                        $('#woaoMenu .'+elment).show();
                }else if(play=='hide'){
                        $('#woaoMenu .'+elment).hide();
                }else {
                        return false;
                }
        }        
        
        //设置我傲查看url 
        cMenu.setUrl = function (elment,url){
                $('#woaoMenu .'+elment+' a').attr('href',url);
        }
        
        $(document).on('click','#woaoMenu .getyzm',function () {
        	cMenu.vCode();
        });
        
        
        $(document).on('click','#woaoMenu .fastLogin .change',function () {
        	$('#woaoMenu .fastLogin').removeClass('active');
        	$('#woaoMenu .woaoLogin').addClass('active')
        })
        
       $(document).on('click','#woaoMenu .woaoLogin .change',function () {
    		$('#woaoMenu .fastLogin').addClass('active');
        	$('#woaoMenu .woaoLogin').removeClass('active')
        })
                 
        cMenu.Nav();
        fn();
});
}




				

//cMenu.setUrl('woaoshowBtn','fdsfadsfe');






