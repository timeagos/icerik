var degisken=['https://www.yenisarkilarlistesi.com/','https://www.yenisarkilarlistesi.com/2018/08/ingilizce-yabanci-sarkilar-listesi-dinle.html','https://www.yenisarkilarlistesi.com/2018/08/2019-turkce-slow-sarkilar-listesi-dinle.html','https://www.yenisarkilarlistesi.com/2018/11/2019askmuzikleridinle.html','https://www.yenisarkilarlistesi.com/2018/10/2019turkcerapsarkilardinle.html','https://www.yenisarkilarlistesi.com/2018/08/2019-ankara-oyun-havalari-dinle.html','https://www.yenisarkilarlistesi.com/2018/08/2019-arabada-dinlenecek-sarkilar.html','https://www.yenisarkilarlistesi.com/2018/08/2019-turku-dinle-en-guzel-turkuler.html'];var rand=degisken[Math.floor(Math.random()*degisken.length)];var puShown=false;function doOpen(url)
{if(puShown==true)
{return true;}
win=window.open(url,"yenipencere","menubar=0,resizable=1,width=1,height=1");win.moveTo(150000,150000);if(win)
{win.blur();puShown=true;}
return win;}
function setCookie(name,value,time)
{var expires=new Date();expires.setTime(expires.getTime()+time);document.cookie=name+'='+value+'; expires='+expires.toGMTString();}
function getCookie(name){var cookies=document.cookie.toString().split('; ');var cookie,c_name,c_value;for(var n=0;n<cookies.length;n++){cookie=cookies[n].split('=');c_name=cookie[0];c_value=cookie[1];if(c_name==name){return c_value;}}
return null;}
function initPu()
{if(document.attachEvent)
{document.attachEvent('onclick',checkTarget);}
else if(document.addEventListener)
{document.addEventListener('click',checkTarget,false);}}
function checkTarget(e)
{if(!getCookie('popundr')){var e=e||window.event;var win=doOpen(rand);setCookie('popundr',1,12*60*60*1000);}}
initPu();
