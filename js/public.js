var ios_show = false,
nonenum = false,
downloadxsset = null;
var ua = navigator.userAgent.toLowerCase();
var woallpublic={
    is_android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    is_iphone: u.indexOf('iPhone') > -1,
    is_weixin: ua.match(/MicroMessenger/i)=="micromessenger"
};
$('.pagemake').css('display','none');
$('.pagemakename').css('display','none');
//控制锚点
function maodian(){
    if(window.location.hash == ''){
        window.location.hash = '0';
    };
    if(window.location.hash.indexOf("a=1") <= 0){
        window.location.hash =parseInt(window.location.hash.substring(1,window.location.hash.length));
    };
    hashal = window.location.hash.substring(1,window.location.hash.length);
};

$('.xzfdtopbigbox span').bind('touchend' ,function(){
    $('.xzfdtopbigbox').css('display','none');
});
//头部隐藏
function topbtn(){
    clearTimeout(downloadxsset);
    downloadxsset = setTimeout(function(){
    if(nonenum == false){
            downloadxs()
        }
    },20000);
};
//头部下载图片
function downloadxs(){
    if(ios_show || window.androiduser){
        return ;
    };
    $('.xzfdtopbigbox').fadeIn();
};
//让顶部下载隐藏
function xzfdtopnone(){
    $('.xzfdtopbigbox').css('display','none');
    nonenum = true;
};
//关闭微信层
$('.weixinfcbox').click(function(){
    $('.weixinfcbox').css('display','none');
});
//判断是苹果还是安卓和加载完顶部下载图片显示
function pdAndiPhone(){
        if (woallpublic.is_iphone){
            $('.xzfdtopbigboxa').attr('href',$('.xzfdtopbigboxa').attr('yyiphone'))
            $('.xzfdtopbigbox img').attr('src',$('.xzfdtopbigbox img').attr('iphoneimg'));
        }else{
            $('.xzfdtopbigboxa').attr('href',$('.xzfdtopbigboxa').attr('yyandroid'));
            $('.xzfdtopbigbox img').attr('src',$('.xzfdtopbigbox img').attr('androidimg'));
        }
    $('.xzfdtopbigbox img').load(function(){
        topbtn();   
    });
};
//获取信息
var subid = false;
var subtitle = '';
function pagemakr(pagemakrnum){
    subid = $('.pagemake').eq(pagemakrnum).html();
    subtitle = $('.pagemakename').eq(pagemakrnum).html();
};
//判断是否微信
function is_weixin(){
    //var ua = navigator.userAgent.toLowerCase();
    if(woallpublic.is_weixin) {
        if(window.location.hash.indexOf("a=1") > 0 ){
            window.location.href = window.location.href.substring(0,window.location.href.length-4);
            location.reload();
        }else{
            $('.xzfdtopbigbox').click(function(){
                if(window.location.hash.indexOf("a=1") <= 0 ){
                    window.location.href = window.location.href+'?a=1';
                };
            });
        };
        $('.xzfdtopbigboxa').click(function(){
            $('.weixinfcbox').css('display','block');
        });
    } else {
        if(window.location.hash.indexOf("a=1") > 0 ){
            if($('.xzfdtopbigboxa').attr('href')!=$('.xzfdtopbigboxa').attr('yyiphone')){
                window.location.href=$('.xzfdtopbigboxa').attr('href');
            };
            $('.loading').css('display','none');
            setTimeout(function(){
                window.location.href = window.location.href.substring(0,window.location.href.length-4);
                location.reload();
            },3000);
        };
    };
};
// if(isWoall==1) {
//     $('.xzfdtopbigboxa').css('background','rgba(247,83,49,.9)');
// }else{
//     $('.xzfdtopbigboxa').css('background','#287de4');
// }