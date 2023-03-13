$(function(){
    // $("input#OrdService.sendCalc").on('click', function (){
    //     var text="";
    //     $.each($('form[id^=calc] tr'), function (){
    //         $(this).
    //     });
    //
    //     $("form#OrdService textarea[name=message]").val(text);
    // });

    $('#sm_slider').smSlider({
        pagination : false,
        subMenu : true,
        autoPlay : true,
        duration : 600,
        delay : 15000,
        hoverPause : true
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


    $("input.weight, input.length").on('keyup input change',function(){
        var summ,price1,price2;
        price1=$("price1").text().replace(/\s/g,'');
        price2=$("price2").text().replace(/\s/g,'');

        if(!price2){
            summ=price1*1.00*$("input.weight").val();

        }
        else if($("input.weight").val()*1.00 < $("input.threshold").val()){
            summ=price2*1.00*$("input.length").val();

        }
        else{
            summ=price1*1.00*$("input.weight").val();

        }
        $("summ").text(moneyFormat(summ.toFixed(2)));

    });





$('select.bending, input[name=length].bending').on('change focus input',function(){
        var tr=$(this).closest('tr');
        var len=tr.find('input[name=length].bending');
        if(parseInt(len.val())>parseInt(len.attr('max'))){len.val(len.attr('max'));}
        else if(len.val()>1000000){len.val(1000000);}
        var res=Math.round(tr.find('select').val()*len.val()*100)/100;
        tr.find('td.result').text(res+" руб.");

    });

    $('select.welding, input[name=length].welding').on('change focus input',function(){
        var tr=$(this).closest('tr');
        var len=tr.find('input[name=length].welding');
        if(len.val()>1000){len.val(1000)}
        var res=Math.round(tr.find('select').val()*len.val()*100)/100;
        tr.find('td.result').text(res+" руб.");

    });
    var priceSm=0;
    $('input[name=list]').on('change focus input',function(){
        var tr=$(this).closest('tr');
        var w=tr.find('input.list.weight');
        if(w.val()>20){w.val(20);}
        if(w.val()<0){w.val(1);}

        var weight=w.val();
        var len=tr.find('input.list.length').val();
        $.each($("#Price tr"),function(){
            var from=$(this).find('span.from').text()*1;
            var to=$(this).find('span.to').text()*1;
            var price=$(this).find('span.price').text()*1;

            if(weight>=from&&weight<=to){
                priceSm=price;
                return false;
            }

        });
        tr.find('td.result').text((Math.round(priceSm*len*100)/100)+" руб.");

    });


    $(".priceTable th.metall").each(function (i) {
        if(i==0){
            $("#calcLazer select.metall").append("<option max-height=\"0\" value=\"\">-- Выберите сплав</option>");
        }
        $("#calcLazer select.metall").append("<option max-height=\""+$(this).attr('max-number')+"\" min=\""+$(this).attr('min')+"\" value=\""+$(this).attr('id')+"\">"+$(this).text()+"</option>")

    });

    /*  $("#calcLazer .metall").on('change',function () {
         var $splav=$(this).find('option:selected');
         $('.priceTable th.metall').index($('#'+$splav.val()));
         $height=$(this).closest('tr').find("select.height");
         $height.html("");
         for (i=0;i<$splav.attr('max-height');i++){
             var $allTd=$(".priceTable tbody tr").eq(i).find('td');
             $height.append("<option value='"+$allTd.eq($('.priceTable th.metall').index($('#'+$splav.val()))+1).text()+"'>"+$allTd.eq(0).text()+"</option>");
         }
      });*/

    /*  $('select, input[name=length]').on('change focus input',function(){
          var tr=$(this).closest('tr');
          var len=tr.find('input[name=length].rezka');console.log($(this).val());
          if(len.val()>1000){len.val(10000)}
              var res=Math.round(tr.find('select.height').val()*len.val()*100)/100;
          tr.find('td.result').text(res+" руб.");
      });*/


    $("#calcLazer").on('change input focus click', $("#calcLazer tbody tr").find('select.metall'), function (e) {
        var $this=$(e.target)
        if($this.hasClass('metall')) {
            var $splav = $this.find('option:selected');
            $('.priceTable th.metall').index($('#' + $splav.val()));
            $height = $this.closest('tr').find("select.height");
            $height.html("");

            for (i = 0; i < $splav.attr('max-height'); i++) {
                var $allTd = $(".priceTable tbody tr").eq(i).find('td');
                if($splav.attr('min') <= $allTd.eq(0).text()||$splav.attr('min')=='undefined' )
                    $height.append("<option value='" + $allTd.eq($('.priceTable th.metall').index($('#' + $splav.val())) + 1).text() + "'>" + $allTd.eq(0).text() + "</option>");
               // console.log($splav.attr('min') + " + " +Number($splav.attr('min')));
            }
        }

        if($this.hasClass('fa-trash-o'))
        {
            var count=$this.closest('table tbody').find('tr').length-1;
            if(count>1){
                $this.closest('tr').remove();
            }
        }

        if($this.hasClass('height')||$this.hasClass('rezka')||$this.hasClass('fa-trash-o')){
            var tr=$this.closest('tr');
            var len=tr.find('input[name=length].rezka');
            if(len.val()>10000){len.val(10000)}
            var res=Math.round(tr.find('select.height').val()*len.val()*100)/100;
            tr.find('td.result').text(res+" руб.");
            var summ=0;
            $("#calcLazer tbody .result").each(function () {
                summ=summ+parseFloat($(this).text());
            });
            $("#Summ").text((Math.round(summ*100)/100)+" руб.");
        }
    });

    $("#addCalc").on('click',function () {
        $(this).closest('tr').before($(this).closest('tr').prev().clone());
        return false;
    });


    $(window).on('load ',function (){
        $("#servProd > div").css({'width': ($("#servProd .photoCat").length * 235)+"px"  });
    });






});