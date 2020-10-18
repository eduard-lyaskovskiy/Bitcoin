;
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
};
$(document).ready(function(){

    //монтируем адресс_________________________________________
    var tmp = location.hostname.replace('www.', '');
    var tmpProtocol = window.location.protocol;
    var tmpIf = $('form').attr('method');

    if (tmpProtocol == "https:"){
         tmp = location.hostname.replace('www.', '').replace(/^[^.]{2,3}\./,'')
         tmp = '/sign-up';
         console.log('for https= ' + tmp)
     }else {
         tmp = '/sign-up';
         console.log('for http= ' + tmp)
     }

    var forms = $('form');
    for(var i=0; i<forms.length; i++){
        if(forms[i].method == "post"){
                
        }
    }
    
    //END монтируем адресс_________________________________________

    // Добавляем поле всегда current_url_____________________________________
    // if (tmpIf == "post" || tmpIf == "POST"){
        var nameUrl = window.location.host;
        $(document).find('form').append('<input type="hidden" name="current_url" value="' + nameUrl + '"></input>')
    // }
    //END Добавляем поле current_url_____________________________________


    // сбор незавершенных лидов_____________________________________
    // function send_on_timer_full_optIns(){

    //     var action_form_data; // данные с формы
    //     var timer_for_send; // переменная для таймера при потере фокуса на инпуте
    //     var timer_for_send_if_stopped_tapping; // переменная для таймера при вводе информации в инпут
    //     var timer_for_keyPress = 3500; // время между последним введенным символом и отправкой инфы (долюно быть больше чем время на потерю фокуса)
    //     var timer_for_blurForm = 3000; // время между потерей фокуса на инпуте
    //     // var link_for_send_data = 'http://localhost:3000/';
    //     var protocol_tmp = location.protocol;
    //     var link_for_send_data = location.hostname.replace(/[a-z]{2}\./,'');
    //     link_for_send_data = protocol_tmp + '//cabinet.' + link_for_send_data + '/unSuccessReg';

    //     $('input').on('keyup',function(){ // событие остановки ввода текста в инпут и отправка по таймеру
    //         action_form_data = $(this.form).serialize();
    //         // console.log('tapping...');
    //         clearTimeout(timer_for_send_if_stopped_tapping); // чистим предыдущий таймер, после каждого символа

    //         timer_for_send_if_stopped_tapping = setTimeout(function(){ // новый таймер для отправки после последнего введенного символа
    //             // console.log('timer_for_send_if_stopped_tapping');
    //             clearTimeout(timer_for_send); // убераем таймер на потерю фокуса, потому что уже отправили инфу
    //             $.post(link_for_send_data, action_form_data);
    //         },timer_for_keyPress);

    //     });

    //     $('input').on('blur', function(){ // событие потери фокуса на форме и отправка по таймеру

    //         action_form_data = $(this.form).serialize();
    //         // console.log('data in form = ',action_form_data);

    //         timer_for_send = setTimeout(function(){ // новый таймер для отправки после потери фокуса
    //             // console.log('send data');
    //             clearTimeout(timer_for_send_if_stopped_tapping); // чистим предыдущий таймер, после каждого ввода символов
    //             $.post(link_for_send_data, action_form_data);
    //         },timer_for_blurForm);

    //         $(this.form).find('input').not($(this)).on('focus', function(){ // событие фокуса на форме и отключение таймера на потерю фокуса
    //             clearTimeout(timer_for_send);
    //         });
    //     });
    // }
    // send_on_timer_full_optIns();

    //END сбор незавершенных лидов_____________________________________

    
});


$(function(){
    var aff_preland = $.urlParam('aff_id');     //запомним аффа для приленда
    var aff_land = $.urlParam('affiliate_id');  // запомним аффа для ленда
    var tmp = location.hostname.replace('www.', '');
    var tmpIf = $('form').attr('method');
	// console.log(tmp)


	//отработка пикселя_________________________________________
	// if($.urlParam('fpp')){
    		var facebook_px_id = ($.urlParam('fbid') || $.urlParam('px'));
	// }
	// if(!facebook_px_id){
 //    		facebook_px_id = 363316310740483;
	// }

	var is_fb_pixel_on_page = $('body').html().search(/facebook.com\/tr\?id=/) != -1;

	if(facebook_px_id && !is_fb_pixel_on_page && aff_preland !=1 && aff_land != 1 ){
		$('body').prepend('<img style="display:none;"  src="https://www.facebook.com/tr?id=' + facebook_px_id + '&ev=PageView&noscript=1" width="1px" height="1px">');
		// console.log('subject pixel')
	}
    //END отработка пикселя_________________________________________


    // Прячем попАп по запросу____________________________________
    if($.urlParam('bp') == 1){
        $('.hover-modal').hide();
    }
    // END Прячем попАп по запросу____________________________________



    // специальная фича для андрея_________________________________________
    // if (tmpIf == "post" || tmpIf == "POST"){	//разделение на ленд
    // 	if(aff_land == 1){
	// 		$('body').prepend('<img style="display:none;"  src="https://www.facebook.com/tr?id=' + facebook_px_id + '&ev=AddToCart&noscript=1" width="1px" height="1px">');
    // 		// console.log('land for Andrew')
    // 	}
    // }else {										//разделение на приленд
    // 	if(aff_preland == 1){			
	// 		$('body').prepend('<img style="display:none;"  src="https://www.facebook.com/tr?id=' + facebook_px_id + '&ev=ViewContent&noscript=1" width="1px" height="1px">');
    // 		// console.log('preland for Andrew')
    // 	}
    // }
    //END специальная фича для андрея_________________________________________

});

// добавление инпутов + инклуд и юрл параметров 
(function () {

    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    }

    function transformToAssocArray( prmstr ) {
        var params = {};
        var prmarr = prmstr.split("&");
        for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = decodeURIComponent(tmparr[1]);
        }
        return params;
    }

    var params = getSearchParameters();

    Object.keys(params).map(function(key, index) {
      // console.log(params[key]);
      if (key!='aff_id' & key!='affiliate_id' & key!='session_id' & key!='session' & key!='email' & key!='first_name'  & key!='last_name') {

        for (i = 0; i < document.forms.length; i++) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            document.forms[i].appendChild(hiddenField) ;
        }
      }

    });


})();

// добавление данных из рефферера

(function () {

    function getSearchParameters() {
        var prmstr = document.referrer.split('?')[1];
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    }

    function transformToAssocArray( prmstr ) {
        var params = {};
        var prmarr = prmstr.split("&");
        for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    }

    var params = getSearchParameters();

    var tmp_session = document.getElementsByClassName('session_id');
    var tmp_affiliate = document.getElementsByClassName('affiliate_id');

    Object.keys(params).map(function(key, index) {
        if(key=='session'){
            // console.log('start session key')
            for (var i = 0; i < tmp_session.length; i++) {
            if (tmp_session[i].value == ''){
                tmp_session[i].value = params[key]
                }
            }
        }

        if (key=='aff_id'){
            // console.log('start aff key')
            for (var i = 0; i < tmp_session.length; i++) {
            if (tmp_affiliate[i].value == ''){
                tmp_affiliate[i].value = params[key]
                }
            }
        }
    });


})();


// function makeSendAdress(){
//     var protocol = location.protocol;
//     var tmp = location.hostname.replace(/[a-z]{2}\./,'');
//         tmp = protocol + '//cabinet.' + tmp + '/api/register';
//     return '/signup';
// }

function setLocation(curLoc){
    try {
      history.pushState(null, null, curLoc);
      return;
    } catch(e) {}
    location.hash = '#' + curLoc;
}

(function(){
    var parametrsTmp = location.search;

    if ($.urlParam("domain")){
        parametrsTmp = parametrsTmp.replace('pixelsettings=' + $.urlParam("pixelsettings"),'' )
        //change URL
        setLocation(parametrsTmp)
    }else{
        if(parametrsTmp.match(/[0-9]{10,}/)){ //проверка на наличие цифр пикселя
            parametrsTmp = parametrsTmp.replace('pixelsettings=' + $.urlParam("pixelsettings"),'domain=' + $.urlParam("pixelsettings") )
        }else {
            parametrsTmp = parametrsTmp.replace('pixelsettings=' + $.urlParam("pixelsettings"),'' )
        }
        //change URL
        setLocation(parametrsTmp)
    }
})();

