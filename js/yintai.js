$(function(){
	var imga=$("a",$(".box")[0]);
	var li=$("div",$(".hhh")[0]);
	var win=$(".banner")[0];
	var r=$(".rightjt")[0];
	var l=$(".leftjt")[0];
	imga[0].style.opacity=1;
	li[0].style.background="red";
	var num=0;
	var flag=true;
	function move(){
		num++;
		if(num==imga.length){
			num=0;
		}
		for(var i=0;i<imga.length;i++){
			// imga[i].style.opacity=0;
			animate(imga[i],{opacity:0});
			li[i].style.background="#211616";
		}
		// imga[num].style.opacity=1;
		animate(imga[num],{opacity:1},function(){
			flag=true;
		});
		li[num].style.background="red";
	}
	var t=setInterval(move,2000);
    win.onmouseover=function(){
    	clearInterval(t);
    	r.style.opacity=1;
    	l.style.opacity=1;
    }
    win.onmouseout=function(){
    	t=setInterval(move,2000);
    	r.style.opacity=0;
    	l.style.opacity=0;
    }
    for(var i=0;i<li.length;i++){
    	li[i].index=i;
    	li[i].onmouseover=function(){
    		for(var j=0;j<li.length;j++){
    			li[j].style.background="#211616";
    			animate(imga[j],{opacity:0});
    		}
    		li[this.index].style.background="red";
    		animate(imga[this.index],{opacity:1});
    		num=this.index;
    	}
    }
	r.onclick=function(){
		if(flag){
			flag=false;
			move();
		}
	}
	l.onclick=function(){
		if(flag){
			flag=false;
			movel();
		}
	}
	function movel(){
		num--;
		if(num<0){
			num=li.length-1;
		}
		for(var i=0;i<li.length;i++){
			li[i].style.background="#211616";
			// imga[i].style.opacity=0;
			animate(imga[i],{opacity:0});
		}
		li[num].style.background="red";
		// imga[num].style.opacity=1;
		animate(imga[num],{opacity:1},function(){
			flag=true;
		});
	}

	// 线条
	var box=$(".div0");
        for(var i=0;i<box.length;i++){
        	line1(box[i]);
        }
    function line1(obj){
		var bw=obj.offsetWidth;
		var bh=obj.offsetHeight;
		var top=$(".top1",obj)[i];
		var right=$(".right1",obj)[i];
		var bottom=$(".bottom1",obj)[i];
		var left=$(".left1",obj)[i];
		obj.onmouseover=function(){
			animate(top,{width:220});
			animate(right,{height:260});
			animate(left,{height:260});
			animate(bottom,{width:220});
		}
		obj.onmouseout=function(){
			animate(top,{width:0});
			animate(right,{height:0});
			animate(left,{height:0});
			animate(bottom,{width:0});
		}
	}
    var zjytxt=$(".zjytxt");
    	for(var i=0;i<zjytxt.length;i++){
        	line(zjytxt[i]);
        }
	function line(obj){
		var bw=obj.offsetWidth;
		var bh=obj.offsetHeight;
		var top=$(".top",obj)[i];
		var right=$(".right",obj)[i];
		var bottom=$(".bottom",obj)[i];
		var left=$(".left",obj)[i];
		obj.onmouseover=function(){
			animate(top,{width:bw});
			animate(right,{height:bh});
			animate(left,{height:bh});
			animate(bottom,{width:bw});
		}
		obj.onmouseout=function(){
			animate(top,{width:0});
			animate(right,{height:0});
			animate(left,{height:0});
			animate(bottom,{width:0});
		}
	}




	//按需加载
	var cw=document.documentElement.clientWidth;
	var ch=document.documentElement.clientHeight;
	var floor=$(".floor");
	var nav=$(".right_nav")[0];
	var floorArr=[];
	var back=$(".nav10",nav)[0];
	var nnav=$(".nnav",nav);
	for(var i=0;i<floor.length;i++){
		floorArr.push(floor[i].offsetTop);
	}
	//楼层跳转
	var qflag=true;
	var sflag=true;
	var lis=$(".nav11",nav);
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onmouseover=function(){
			nnav[this.index].style.display="block";
		}
		lis[i].onmouseout=function(){
			nnav[this.index].style.display="none";
		}
		lis[i].onclick=function(){
			qflag=false;
			for(var j=0;j<lis.length;j++){
				nnav[j].style.display="none";
			}
			// lis[this.index].style.background="#E5004F";
			animate(document.body,{scrollTop:floorArr[this.index]-300},function(){
				qflag=true;
			});
			animate(document.documentElement,{scrollTop:floorArr[this.index]-300},function(){
				qflag=true;
			});
			nnav[this.index].style.display="block";
		}
	}
	//窗口滚动
	window.onscroll=function(){
		var obj=document.body.scrollTop?document.body:document.documentElement;
		var floors=obj.scrollTop;
		for(var i=0;i<floor.length;i++){
            if(ch+floors>=floorArr[i]+100){
                var imgs=$("img",floor[i]);
                for(var j=0;j<imgs.length;j++){
                	imgs[j].src=imgs[j].getAttribute("imgpath");
                }
            }
		}
		if(!qflag) return;
		for(var i=0;i<floor.length;i++){
			if(ch+floors>=floorArr[i]){
				for(var j=0;j<lis.length;j++){
					nnav[j].style.display="none";
				}
					nnav[i].style.display="block";
			}
		}
		// 导航栏显现
		if(ch+floors>=floorArr[1]){
			if(sflag){
				sflag=false;
			    animate(nav,{opacity:1})
			    animate(back,{opacity:1})
		    }
		}else{
			if(!sflag){
				sflag=true;
			    animate(nav,{opacity:0})
				animate(back,{opacity:0})
		    }
		}
	}
	back.onclick=function(){ 
		var obj=document.body.scrollTop?document.body:document.documentElement;
		animate(obj,{scrollTop:0})
	}





	//小图
	var scenter3=$(".scenter3",$(".ytbh")[0]);
	var xyq1=$(".xyq1",$(".ytbh")[0]);
	var xyq2=$(".xyq2",$(".ytbh")[0]);
	for(var i=0;i<xyq1.length;i++){
		xyq1[i].index=i;
		xyq1[i].onmouseover=function(){
			xyq1[this.index].style.background="#D00249";
			xyq2[this.index].style.background="#6E6E6E";
			animate(scenter3[this.index],{left:0})
		}
	}
	for(var i=0;i<xyq1.length;i++){
		xyq2[i].index=i;
		xyq2[i].onmouseover=function(){
			xyq2[this.index].style.background="#D00249";
			xyq1[this.index].style.background="#6E6E6E";
			animate(scenter3[this.index],{left:-390})
		}
	}
	var xxjt1=$(".xxjt1",$(".ytbh")[0]);
	var xxjt2=$(".xxjt2",$(".ytbh")[0]);
	for(var i=0;i<xxjt1.length;i++){
		xxjt1[i].index=i;
		xxjt1[i].onclick=function(){
			xyq1[this.index].style.background="#D00249";
			xyq2[this.index].style.background="#6E6E6E";
			animate(scenter3[this.index],{left:0})
		}
		xxjt1[i].onmouseover=function(){
			xxjt1[this.index].style.display="block";
			xxjt2[this.index].style.display="block";
		}
		xxjt1[i].onmouseout=function(){
			xxjt1[this.index].style.display="none";
			xxjt2[this.index].style.display="none";
		}
	}
	for(var i=0;i<xxjt2.length;i++){
		xxjt2[i].index=i;
		xxjt2[i].onclick=function(){
			xyq2[this.index].style.background="#D00249";
			xyq1[this.index].style.background="#6E6E6E";
			animate(scenter3[this.index],{left:-390})
		}
		xxjt2[i].onmouseover=function(){
			xxjt1[this.index].style.display="block";
			xxjt2[this.index].style.display="block";
		}
		xxjt2[i].onmouseout=function(){
			xxjt1[this.index].style.display="none";
			xxjt2[this.index].style.display="none";
		}
	}
	for(var i=0;i<scenter3.length;i++){
		scenter3[i].index=i;
		xxjt1[i].style.display="none";
		xxjt2[i].style.display="none";
		scenter3[i].onmouseover=function(){
			xxjt1[this.index].style.display="block";
			xxjt2[this.index].style.display="block";
		}
		scenter3[i].onmouseout=function(){
			xxjt1[this.index].style.display="none";
			xxjt2[this.index].style.display="none";
		}
	}
	//导航选项卡
	var lia=$("li",$(".bnav")[0]);
	var xxk=$(".xxk",$(".banner")[0]);
	for(var i=0;i<lia.length;i++){
        lia[i].index=i;
        lia[i].onmouseover=function(){
        	xxk[this.index].style.display="block";
        }
        lia[i].onmouseout=function(){
        	xxk[this.index].style.display="none";
        }
	}
	//图标的滚动
	var sxia=$(".sxia",$(".ytbh")[0]);
	var sxia0=$(".sxia0",$(".ytbh")[0]);
	var sxia4=$(".sxia4",$(".ytbh")[0]);
	var sxia5=$(".sxia5",$(".ytbh")[0]);
	var ssflag=true;
	for(var i=0;i<sxia0.length;i++){
		sxia4[i].index=i;
		sxia4[i].onclick=function(){
			if(!ssflag){return;};
			ssflag=false;
			var first=firstChild(sxia0[this.index]);
			var last=lastChild(sxia0[this.index]);
			sxia0[this.index].insertBefore(last,first);
			sxia0[this.index].style.left=-159+"px";
			animate(sxia0[this.index],{left:0},function(){
				ssflag=true;
			})
		}
	}
	for(var i=0;i<sxia0.length;i++){
		sxia5[i].index=i;
		sxia5[i].onclick=function(){
			if(!ssflag){return;};
			ssflag=false;
			animate(sxia0[this.index],{left:-159},function(){
				var first=firstChild(this);
				this.appendChild(first);
				this.style.left=0;
				ssflag=true;
			})
		}
	}
	//超值特卖
	var catm1=$(".camt1")[0];
	var ul=$(".catm0",catm1)[0];
	var lib=$("li",ul);
	var xhx=$(".xhx",catm1);
	var ft=$(".ft",catm1);
	ft[0].style.display="block";
	xhx[0].style.display="block";
	lib[0].style.fontWeight="bold";
	for(var i=0;i<lib.length;i++){
		lib[i].index=i;
		lib[i].onmouseover=function(){
			for(var j=0;j<xhx.length;j++){
				xhx[j].style.display="none";
				ft[j].style.display="none";
				lib[j].style.fontWeight="normal";
			}
			xhx[this.index].style.display="block";
			ft[this.index].style.display="block";
			lib[this.index].style.fontWeight="bold";
		}
	}
	//热门品牌
	var ytbh2=$(".ytbh2")[0];
	var rmpp1=$(".rmpp1",ytbh2)[0];
	var pp=$("p",rmpp1);
	var xsj0=$(".xsj0",rmpp1);
	var rmpp2=$(".rmpp2",rmpp1);
	var xbk=$(".xbk",rmpp1);
	xbk[0].style.display="block";
	xsj0[0].style.display="block";
	rmpp2[0].style.display="block";
	for(var i=0;i<pp.length;i++){
		pp[i].index=i;
		pp[i].onmouseover=function(){
			for(var j=0;j<pp.length;j++){
				xsj0[j].style.display="none";
				rmpp2[j].style.display="none";
				xbk[j].style.display="none";
			}
			xsj0[this.index].style.display="block";
			rmpp2[this.index].style.display="block";
			xbk[this.index].style.display="block";
		}
	}
})
