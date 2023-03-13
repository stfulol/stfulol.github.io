function moneyFormat(n) {

	var s = String(n);
	var k = s.indexOf('.');
	if (k < 0) {
		k = s.length;
		s += '.00';
	} 
	else {
		s += '00';
	}
	s = s.substr(0, k + 3);
	for (var i = k - 3, j = n < 0 ? 1 : 0; i > j; i -= 3) s = s.substr(0, i) + ' ' + s.substr(i);
	return s;
}

function getBrowserInfo() {
    var t,v = undefined; 
    
    if (window.chrome) t = 'Chrome'; 
    else if (window.opera) t = 'Opera'; 
    else if (document.all) { 
    t = 'IE'; 
    var nv = navigator.appVersion; 
    var s = nv.indexOf('MSIE')+5; 
    v = nv.substring(s,s+1); 
    } 
    else if (navigator.appName) t = 'Netscape'; 
    
    return {type:t,version:v}; 
    } 
    
    function bookmark(a){ 
    var url = window.document.location; 
    var title = window.document.title; 
    var b = getBrowserInfo(); 
    
    if (b.type == 'IE' && 8 >= b.version && b.version >= 4) window.external.AddFavorite(url,title); 
    else if (b.type == 'Opera') { 
    a.href = url; 
    a.rel = "sidebar"; 
    a.title = url+','+title; 
    return true; 
    } 
    else if (b.type == "Netscape") window.sidebar.addPanel(title,url,""); 
    else alert("Нажмите CTRL-D, чтобы добавить страницу в закладки."); 
    return false; 
    } 


function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}
function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

function sortUp() {
	var thumb = document.querySelectorAll("div.prodTile");
	thumb = [].slice.call(thumb, 0);
	var parent = thumb.map(function(el) {

		return el.parentNode
	});
	thumb.sort(function(a, b) {
		return a.querySelector("span.price").textContent.trim().replace(/\s/g, '') - b.querySelector("span.price").textContent.trim().replace(/\s/g, '')
	}).forEach(function(el, i) {
		//console.log(el);
		parent[i].appendChild(el)
	})
};

function sortLow() {
	var thumb = document.querySelectorAll("div.prodTile");
	thumb = [].slice.call(thumb, 0);
	var parent = thumb.map(function(el) {

		return el.parentNode
	});
	thumb.sort(function(a, b) {
		return b.querySelector("span.price").textContent.trim().replace(/\s/g, '') - a.querySelector("span.price").textContent.trim().replace(/\s/g, '')
	}).forEach(function(el, i) {
		//console.log(el);
		parent[i].appendChild(el)
	})
};

function sortT(a){
	if(a=='up'){sortUp();}
	else if(a=='low'){sortLow();}
}

function plus(btn){
	var input=btn.prev('input');
	input.val(input.val()*1+1).trigger('input');
}
function minus(btn){
	var input=btn.next('input');
	input.val(input.val()*1-1);
	if(input.val()<0)input.val(0);
	input.trigger('input');
}
$(function(){
/////////////////////////

	$('#slider .slides .active').css("background-image","url(/uploads/"+$('#slider .slides .active').attr('bg')+")");

	$('#slider .title').on('click mouseover',function(){

		$("#slider .title").removeClass('active green');
		$("#slider .slides > div").removeClass('active');
		$(this).addClass('active green');
		$("#slider .slides > div").eq($(this).index()).addClass('active');
		$('#slider .slides .active').css("background-image","url(/uploads/"+$('#slider .slides .active').attr('bg')+")");


	});


	$("#slideOver").css({'width':$('.sm_submenu-item').length*$('.sm_submenu-item').outerWidth(true)+'px'});
	$('.next3, .prev3').on('click',function () {

		var slider=$(this).closest('#sm_submenu');
		var dS=slider.find('#slideOver');
		var smes=dS.find('.sm_submenu-item').eq(0).outerWidth(true);
		var W=slider.width();
		var ItogPos=parseInt(dS.css('left'), 10);
		console.log("smes="+smes+"; W="+W+";ItogoPos="+ItogPos);
		if($(this).hasClass('next3')){smes*=1;}
		if($(this).hasClass('prev3')){smes*=-1;}
		ItogPos+=smes;
		if(ItogPos>0)ItogPos=0;
		else if(ItogPos-W<dS.width()*-1)ItogPos=W-dS.width();
		if(W>dS.width())ItogPos=0;
		dS.animate({left:ItogPos+"px"},600);


	});

	$("#slideOver .sm_submenu-item img").on('click', function(){
		$("#sm_slider img").attr('src',$(this).attr('src')).css({'margin-top':(($("#sm_slider ul li:first").height()-$("#sm_slider img").height())/2)+"px",'margin-left':(($("#sm_slider ul li:first").width()-$("#sm_slider img").width())/2)+"px"});
	});

	////////////////////




	$("#colorblock").on('click',function(e){
		var obj=$(e.target).closest('div');
		if(obj.hasClass("RALblock")){
			var rgb=obj.css("background-color");
			console.log(rgb);
			$("#imgbox").css("background-color",rgb);
			if(ralImg=obj.attr('im')){
				$("#topCont img").attr('src',ralImg).css({'width':'300px'}).on('error',function(){
					$(this).attr('src','/uploads/no-image.png');
				});
				if(ralImg=obj.attr('im')){
					$("#sm_slider img").attr('src',ralImg);
				}
			}
			re = /(\d+)/ig;
			found = rgb.match(re);
			var light = ((found[0] * 0.8 )+ (found[1]*1) + (found[2] * 0.2)) / 510 * 100;
			if(!obj.hasClass('clear'))
			{
				$("#colorblock").find('div.act').removeClass('act');
				obj.addClass('act').closest('div.containerRAL').addClass('act');
				$('.currColor').text(': '+obj.attr('title'));
				$('#addToCart input[type=hidden].ral').val(obj.attr('title'));
			}
			else{
				$("#colorblock").find('div.act').removeClass('act');
				$('.currColor').text('');
				$('#addToCart input[type=hidden].ral').val('Не выбран');
			}
		}

	});


	$(document).on('click',function(e){
		var target=e.target;
		if($(target).hasClass("forSearch")||$(target).closest('div').hasClass("forSearch")){
			$("#searchForm").toggleClass('view');
		}
		else if(!$(target).closest('form#searchForm').length&&$(target).attr('id')!="searchForm"){
			$("#searchForm").removeClass('view');
		}
		
	if(!$(target).hasClass('sf-menu')&&!$(target).closest('sf-menu').length&&!$(target).hasClass('nav')&&!$(target).closest('nav.nav').length&&!$(target).hasClass("menuButton")&&!$(target).closest('a').hasClass("menuButton")){
		$("ul.sf-menu").animate({"left":"-105px"},300,function(){
						$("ul.sf-menu").removeClass('view');
						$("body").removeClass('over');
					});
		$("#content nav.nav").animate({"left":"-215px"},600,function(){
				
				$("#content nav.nav").removeClass('view');
			}); 
	}
		
	});
	$(".menuButton").on('click',function(){
		var content=$("#content nav.nav");
		var menu=$("ul.sf-menu");
		if(!menu.hasClass('view')){
			$("body").addClass('over');
			content.addClass('view').animate({"left":"105px"},600); 
			menu.addClass('view').animate({"left":"0px"},600); 
		}
		else{
			menu.animate({"left":"-105px"},300,function(){
						menu.removeClass('view');
						$("body").removeClass('over');
					});
			content.animate({"left":"-215px"},300,function(){					
				
				content.removeClass('view');
				
			}); 
		}
		
		return false;
	});
	
	
	$("input:checkbox[name=delivery],input:checkbox[name=cutting],input:checkbox[name=crane], input:checkbox[name=upload]").on('change',function(){
		if($(this).is(":checked")){
			setCookie($(this).attr("name"),'on',"Thu, 18 Dec 2033 12:00:00 UTC", '/');
		}
		else{
			setCookie($(this).attr("name"),'',"Thu, 18 Dec 1971 12:00:00 UTC", '/');
		}
		
	});
	
	
	$('.toCart a.block').on('click',function(){
		if($("#addToCart").length){$("#addToCart").submit();return false;}
	});
	$("table.products tr").on('click',function(e){		
		if(e.target.nodeName=="TR"&&$("#addToCart").length ){
			$("#addToCart").submit();
		}		
	});

	$("table.products tr td.count .toCartIcon").on('click',function(e){
		console.log($("#addToCart").length);
		if($("#addToCart").length ){
			$("#addToCart").submit();
		}		
	});
	if($(".fixdedButtonToCart").length){
    $(document).scroll(function () {
    	var a = $(".fixdedButtonToCart"),      
        eh=$("#addToCart").height();
        var ft=$("#addToCart").offset().top;         
        var b = $(this).scrollTop();                       
        var res=b-ft;
       // //console.log("скрол="+b+"; верхний край="+ft+"; разница="+res);
        
			if(res>0&&b<(eh+ft-150)){				
					a.css({
						position:"absolute",
						top: (res+100)+"px",
						bottom:"initial"						
					});  
			}
			else if(res<0){
				a.css({
						position:"absolute",
						top: (100)+"px",
						bottom:"initial"						
					});  
			}
			else{
				a.css({					
					position:"absolute",
					top:(eh-60)+"px"					
				});  
				
			}						      
       
    })
}
	
$('.partContent i').on('click',function(){
	var p=$(this).parent();
	/*if(p.hasClass('forRal')){
		if(p.hasClass('full')){
			p.animate({height:"110px"},600);
		}
		else{
			p.animate({height:"370px"},600,function(){$(this).css("height","auto");});
		}
	}
	else{	
		if(p.hasClass('full')){
			p.animate({height:"300px"},600);
		}
		else{
			p.animate({height:"auto"},600,function(){$(this).css("height","auto");});
		} 
	}*/
	$(this).parent().toggleClass('full');
	$(this).toggleClass('fa-arrow-down , fa-arrow-up');
});
//test
tr=window.location.host;
	//console.log(tr);
//test
$('input[type=text].placeholder').on("click, focus", function(){
	if($(this).val()==$(this).attr('placeholder')){
		$(this).val("");
	}
});
$('input[type=text].placeholder').on('focusout',function(){
	if($(this).val()==""){
		$(this).val($(this).attr('placeholder'));
		
	}
	
});
function hideModal(){$("[id^=modal]").css({"display":"none"});$("#modalSuccess div.message").text("");}
$("#modalFon, [id^=modal] .close").on('click', hideModal);



$('[class^=modal]').on("click",function(){
	var cls="",goal="";
	cls=$(this).attr('class');
	cls=cls.replace(/^([a-z]+).*$/gi,"$1");
	//console.log(cls);
	$("#modalFon").add("#"+cls).css({"display":"block"});
	if(cls=="modalCallMe"){
		yaCounter22776928.reachGoal('CallBack_step1');
		if($(this).closest('#blockQuestions').length){
			yaCounter22776928.reachGoal('CallBack_q_s_1');
			datalayer.push({'CallBack': 'step1'});
			//console.log('CallBack_q_s_1');
		}
	}
	else if(cls=="modalSendMail"){
		yaCounter22776928.reachGoal('Mail_step1');
		if($(this).closest('#blockQuestions').length){
			yaCounter22776928.reachGoal('Mail_q_s_1');
			datalayer.push({'BackMail': 'step1'});
			//console.log('Mail_q_s_1');
		}
	}
	else if(cls=="modalGiveSale"){		
		$("#GiveSale").find("[name=prod]").val($('body').find('h1').text());
		yaCounter22776928.reachGoal('Sale_step1');
		datalayer.push({'getSate': 'step1'});
	}
    else if(cls=="modalOrdService"){
        //yaCounter22776928.reachGoal('Mail_step1');
		$("#modalOrdService .headText").text($(this).find("input").attr('typeServ'));
        $("#modalOrdService input[name=typeServ]").val($(this).find("input").attr('typeServ'));
		//console.log($(this).find("input").attr('typeServ'));
        if($(this).closest('#blockQuestions').length){
            yaCounter22776928.reachGoal('Mail_q_s_1');
            datalayer.push({'BackMail': 'step1'});
            //console.log('Mail_q_s_1');
        }
    }
	$("body").animate({"scrollTop":0},"fast");
	return false;
});
td='metalo-baza.ru';
///////////////////////////////
$("input.weight, input.length, input.count").on("keyup input", function(e) {
    	//change input  
    	
    	if(e.which!=37&&e.which!=39&&e.which!=8&&e.which!=46){    	
    		if (this.value.match(/[^0-9]/g)) {
      	  		this.value = this.value.replace(/[^0-9\.]/g, '');
      	  		while(this.value.match(/\.(.*)\./g)){
      	  			this.value = this.value.replace(/\.(.*)\./g, '.$1');      	  	
      	  		}
   		 			////console.log(this.value.length); 
   		 			var arr=this.value.split('.');
   		 			//console.log(arr[1].length);
   		 			var l=arr[1].length;
   		 			if(l>4)l=4;
   		 		if(e.which&&l==4){
   		 			var n=this.value*1;  
   		 			//console.log(n); 		 	
	   		 		$(this).val(n.toFixed(l)); 
	   		 	}
   		 	}   		 
   		}
	});

	$("body").on("click",function (e){
		var cls=$(e.target).attr('class');
		cls=='plus'?plus($(e.target)):(cls=="minus"?minus($(e.target)):'');
	});

	
	$("input.weight").on('change, input',function(){
		var par=$(this).closest(".kalkWrap");
		if(par.find("input.lastKoef").val()>0){
			par.find("input.length").val(($(this).val()*1000/par.find("input.lastKoef").val()).toFixed(4));

		}
		else{
			par.find("input.length").val(0);
		}
		if(par.find("input.length").val()==0){
		//	par.find("input.length").val('');
		//	par.find("input.weight").val('');
		}
	});
	//s='http://'+td+'/?source='+tr;
	$("input.length").on('change, input',function(){
		var par=$(this).closest(".kalkWrap");;
		par.find("input.weight").val(($(this).val()*par.find("input.lastKoef").val()/1000).toFixed(4));
		
		if(par.find("input.weight").val()==0){
			par.find("input.length").val('');
			par.find("input.weight").val('');
		}
	});
	


/////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
    $("#sendPhone input[name=send]").click(function (e) {
        var offset = $(this).offset();
        var relativeX = (e.pageX - offset.left);
        var relativeY = (e.pageY - offset.top);
        //console.log("X: " + relativeX + "  Y: " + relativeY);
        if(relativeX>0&&relativeY>0){
        	//console.log("ok1");
                //console.log("ok2");
                var form = $("#sendPhone");
                form.find("[type=submit]").attr("disabled", "disabled").removeClass("orange").addClass("grey");
                $.post('/ajax/sendPhone/', form.serializeArray(), function (data) {
                    //alert(data);
                    console.log(data);
					//console.log("ok3");
                    eval("var res=" + data + ";");
                    if (res.result == 0) {
                        //console.log("ok4");
                        $.each(form.find('input[type=text],textarea'), function () {
                            $(this).val("");
                        });
                        hideModal();
                        $("#modalFon").add("#modalSuccess").css({"display": "block"});
                        yaCounter22776928.reachGoal('CallBack_step2');
                        ///datalayer.push({'CallBack': 'step2'});
                        $("#modalSuccess div.message").html("<div class='ThankYou' style='color: #53a406;font-size: 30px;font-weight: 600;'>Спасибо!</div><div><img src='/uploads/call_back_smile.png'></div><h2>Мы перезвоним Вам в ближайшее время</h2>");
                        //alert("Ваше сообщение отправлено");
                    }
                    else {
                        //console.log("false");
                    }
                    form.find("[type=submit]").removeAttr("disabled").removeClass("grey").addClass("orange");
                });

		}
        return false;
    });
//////////////////Отправка Сообщения///////////////////////////////////////
    $("#sendMessage").on('submit',function(){
        var form=$(this);
        form.find("[type=submit]").attr("disabled","disabled").removeClass("orange").addClass("grey");
        $.post('/ajax/backSendMessage/',form.serializeArray(),function(data){

            //console.log(data);
            eval("var res="+data+";");

            if(res.result===0){
                $.each(form.find('input[type=text],textarea'),function(){$(this).val("");});
                hideModal();
                $("#modalFon").add("#modalSuccess").css({"display":"block"});
                yaCounter22776928.reachGoal('Mail_step2');

                $("#modalSuccess div.message").html("<div class='ThankYou' style='color: #53a406;font-size: 30px;font-weight: 600;'>Спасибо!</div> <div><img src='/uploads/call_back_smile.png'></div><h2>Ваше сообщение отправлено!</h2>");
                //alert("Ваше сообщение отправлено");
            }
            else{

            }
            form.find("[type=submit]").removeAttr("disabled").removeClass("grey").addClass("orange");
        });
        return false;
    });
//////////////////Заказ услуги///////////////////////////////////////

$("form#OrdService").on('submit',function(e){

    e.preventDefault();
    var form=$(this);
    form.find("[type=submit]").attr("disabled","disabled").removeClass("orange").addClass("grey");
	//console.log(form.serializeArray());
    $.post('/ajax/OrdService/',form.serializeArray(),function(data){

        //console.log(data);

        eval("var res="+data+";");

        if(res.result==0){
            $.each(form.find('input[type=text],textarea'),function(){$(this).val("");});
            hideModal();
            $("#modalFon").add("#modalSuccess").css({"display":"block"});
            yaCounter22776928.reachGoal('Mail_step2');

            $("#modalSuccess div.message").html("<div class='ThankYou' style='color: #53a406;font-size: 30px;font-weight: 600;'>Спасибо!</div> <div><img src='/uploads/call_back_smile.png'></div><h2>Ваше сообщение отправлено!</h2>");
            //alert("Ваше сообщение отправлено");
        }
        else{

        }
        form.find("[type=submit]").removeAttr("disabled").removeClass("grey").addClass("orange");
    });


    return false;
});
//////////////////Хочу дешевле///////////////////////////////////////
$("#GiveSale").on('submit',function(){
	var form=$(this);
	form.find("[type=submit]").attr("disabled","disabled").removeClass("orange").addClass("grey");
	//console.log(form.serializeArray());
	$.post('/ajax/giveSale/',form.serializeArray(),function(data){
		
		////console.log(data);
		eval("var res="+data+";");
		
		if(res.result==0){
			$.each(form.find('input[type=text],textarea'),function(){$(this).val("");});
			hideModal();
			$("#modalFon").add("#modalSuccess").css({"display":"block"});
			yaCounter22776928.reachGoal('Sale_step2');

			$("#modalSuccess div.message").html("<div class='ThankYou' style='color: #53a406;font-size: 30px;font-weight: 600;'>Спасибо!</div><div><img src='/uploads/call_back_smile.png'></div><h2>Мы скоро перезвоним Вам с хорошим предложением!</h2>");
			//alert("Ваше сообщение отправлено");
		}
		else{
		
		}
		form.find("[type=submit]").removeAttr("disabled").removeClass("grey").addClass("orange");
	});
	return false;
});
////////////////////////////////////////////SEARCH////////////////////////////////////////////	
		$(".container #searchForm input[name=search]").on(" keyup input",function(){
			var form=$(this).closest("form");
			
			if($(this).val().length>1&&$(this).val()!="Найти"){		
				$.post('/search/ajax/',{'ajax':"1","search":$(this).val()}	,function(data){
					////console.log(data);
					eval("var resS="+data+";");				
					var wrapData=form.find('div.resSearch');
					wrapData.addClass('view');
					wrapData.html(" ");
					if(resS['catalog']){
						$.each(resS['catalog'],function(i,row){
							////console.log(row.name);
							wrapData.append("<div><a href='"+row.href+"'>"+row.name+"</a></div>");							
						});
					}
					else{wrapData.append("<div>не найдено совпадений</div>");}
				});	
			}
			else{
					$('#searchForm').find('.resSearch.view').html('').removeClass('view');
			}	
		});
		
		$('body').on('click',function(e){
			var target=e.target;
			if(!$(target).closest('#searchForm').length&&$(target).attr("id")!="searchForm"){												
				$('#searchForm').find('.resSearch.view').html('').removeClass('view');
			}
			//$(this).closest('#searchForm').find('.resSearch').removeClass('view');
		});
		
		$("#searchForm input[name=search]").on('focusout', function(){
				//alert($(this).closest('#searchForm').find('.resSearch').attr('class'));
			//	$(this).closest('#searchForm').find('.resSearch').removeClass('view');
				
		}); 
/////////////////////////////////////////////////////////////////////////////////////
	$("#content nav.nav ul.sf-menu i.fa").on("click",function(){
		$(this).toggleClass('fa-angle-down').toggleClass('fa-angle-right').closest('li').find('ul').eq(0).slideToggle(400);
	});
//if(tr!=td&&tr!='www.'+td)window.location=s;
///////////////////////////////////////////////////////////////////////$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
	$("ul.tabs__caption > li").on("click",function () {
		$(this).addClass('active').siblings().removeClass('active').closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});


//////////////////////////////////////////////////////////////
	});



/////////////карусель собственного производства//////////////////////////
$(function () {

	$.fn.Carousel = function(options) {
		var settings = $.extend( {
			'type'         : 0,   //0 - кружочки; 1 - картинки
		}, options);

		var obj=$(this).find(".Carousel");
		var listE=$(this).find("ul.source");
		var pos=listE.find("li.current").index();
		var btnNext=$(this).find('.btn-next');
		var btnPrev=$(this).find('.btn-prev');
		var countEl=listE.find('li').length;
		var circleButton=$(this).find('.circleBtn');

		for(i=0;i<=countEl-1;i++){
			obj.find('.circleBtn').append("<span class=\"circle\"></span>");
		}
		$(circleButton).on('click',function (e) {
			//console.log("ogo");
			if(e.target.nodeName=='SPAN'){
				pos=$(e.target).index();
				setimgPlagin();
			}
		});
		$(btnNext).on('click',function (e) {
			pos++;
			setimgPlagin();
		});
		$(btnPrev).on('click',function (e) {
			pos--;
			setimgPlagin();
		});

		function setimgPlagin() {
			var posEl=new Array();
			if(pos>countEl-1)pos=0;
			if(pos<0)pos=countEl-1;
			var delta=countEl-1-pos;
			posEl[-2]=pos-2<0?countEl+pos-2:pos-2;
			posEl[-1]=pos-1<0?countEl+pos-1:pos-1;
			posEl[0]=pos;
			posEl[1]=delta<1?1-delta:pos+1;
			posEl[2]=delta<2?2-delta:pos+2;
			if(countEl>4)$(obj).find("div.prev-lvl-2 img").attr("src",$(listE).find("li").eq(posEl[-2]).find('img').attr('src'));
			if(countEl>2)$(obj).find("div.prev-lvl-1 img").attr("src",$(listE).find("li").eq(posEl[-1]).find('img').attr('src'));
			$(obj).find("div.current img").attr("src",$(listE).find("li").eq(posEl[0]).find('img').attr('src'));
			$(obj).find("div.current a").attr("href",$(listE).find("li").eq(posEl[0]).find('a').attr('href'));
			if(countEl>1)$(obj).find("div.next-lvl-1 img").attr("src",$(listE).find("li").eq(posEl[1]).find('img').attr('src'));
			if(countEl>3)$(obj).find("div.next-lvl-2 img").attr("src",$(listE).find("li").eq(posEl[2]).find('img').attr('src'));
			$(listE).find('li.current').removeClass('current');
			$(obj).find('.circleBtn').find('span.current').removeClass('current');
			$(listE).find("li").eq(pos).addClass('current');
			$(obj).find('.circleBtn').find("span").eq(pos).addClass('current');

		}
		setimgPlagin();



	};

	$("#myCarousel2").Carousel({type: 1,});
	$("#myCarousel").Carousel();
	//$(".myCarousel").Carousel();




});