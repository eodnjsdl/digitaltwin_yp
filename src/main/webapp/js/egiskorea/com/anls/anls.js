/**
 * 
 */


$(document).ready(function(){
	var bldngObjOnOff = false;

	var chkBul = false;
	var chk3D = 0;

	module.init();
	
	// 조망권, 일조권, 가시권 선택 시 일반건물 레이어 가시화
	$(document).on("click", ".lnb-analysis li button", function(){
		// if(app2D == null){
		// 	var layerList = new Module.JSLayerList(false);
		// 	var layer = layerList.nameAtLayer("building_object");
		// }
		if($(this).html().indexOf("조망권") >= 0
			|| $(this).html().indexOf("일조권") >= 0
			|| $(this).html().indexOf("가시권") >= 0){
			
			Module.XDSetMouseState(1);
			
// 			if(app2D == null){
// 				if(layer != null){
// //					if(layer.getVisible()){
// //						if(bldngObjOnOff){
// //							bldngObjOnOff = true;
// //						} else {
// //							bldngObjOnOff = false;
// //						}
// //					} else {
// //						bldngObjOnOff = false;
// //						layer.setVisible(true);
// //					}
// 				} else {
// //					bldngObjOnOff = false;
//
// 					Module.XDEMapCreateLayer("building_object", xdServer, 0, true, true, false, 9, 0, 14);
// 					Module.setVisibleRange("building_object", userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
// 					layer = new Module.JSLayerList(false).nameAtLayer("building_object");
// 					layer.simple_real3d = true; //심플모드
//
// //					if(chkBul == false && chk3D > 0) {
// //						layer.setAlpha(0);
// //					} else {
// //						layer.setAlpha(255)
// //					}
// 				}
// 			}
		} else {
//			if(layer != null){
//				layer.setVisible(bldngObjOnOff);
//			}

			if(chkBul == true || chk3D > 0) {
				layer.setVisible(true);
			}
		}
		
		// if(!$(this).parent().hasClass("on")) {
		// 	var layerList = new Module.JSLayerList(false);
		// 	var layer = layerList.nameAtLayer("building_object");
		// 	if(layer != null) {
		// 		layerList.delLayerAtName("building_object");
		// 		//layer.setVisible(false);
		// 	}
		// }
	});
	
	// 분석 기능 종료 시 일반건물 레이어 비가시화
	$(document).on("click", ".lnb-analysis .lnb-close, #lnb li, .map-tool button, .side-btn.territory", function(){ 
		// if(app2D==null) {
		// 	var layerList = new Module.JSLayerList(false);
		// 	var layer = layerList.nameAtLayer("building_object");
		//
		// 	if(chkBul){
		// 		layer.setVisible(true);
		// 	} else {
		// 		layerList.delLayerAtName("building_object");
		// 	}
		// }
	});
});

var module = {
		current : null,
		init:function(){
			$.ajax({
				url: "/module.do",
				type: "POST",
				success: function(result) {
//					
					var data = JSON.parse(result);
					data = data.result;
					$('#moduleList').html('');
					
					var html = '';
					for(var i=0;i<data.length;i++){
//						var modulName ; 
						if(data[i] == 'M_ROV_ANLS') {//조망권분석
							html +='<li><button type="button" class="dataPopup" data-maptype="3D" name='+data[i]+' onclick="module.select(\''+data[i]+'\')">조망권분석(3D)</li>';
						}else if(data[i] == 'M_SUHN_ANLS') {//일조권분석
							html +='<li><button type="button" class="dataPopup" data-maptype="3D" name='+data[i]+' onclick="module.select(\''+data[i]+'\')">일조권분석(3D)</li>';
						}else if(data[i] == 'M_VSBL_ANLS') {//가시권분석
							html +='<li><button type="button" class="dataPopup" data-maptype="3D" name='+data[i]+' onclick="module.select(\''+data[i]+'\')">가시권분석(3D)</li>';
						}else if(data[i] == 'M_SLOPE') {//경사분석
							html +='<li><button type="button" class="dataPopup" data-maptype="3D" name='+data[i]+' onclick="module.select(\''+data[i]+'\')">경사분석(3D)</li>';
						}else if(data[i] == 'M_AI_IMAGE') {//ai영상분석
							html +='<li><button type="button" class="dataPopup" data-maptype="3D" name='+data[i]+' onclick="module.select(\''+data[i]+'\')">AI영상분석(3D)</li>';
						}else if(data[i] == 'M_TPPH_SECT'){//지형단면도
							html +='<li><button type="button" class="dataPopup" data-maptype="3D" name='+data[i]+' onclick="module.select(\''+data[i]+'\')">지형단면도(3D)</li>';
						}else if(data[i] == 'M_UNDG_FCTY_SECT') {//지하시설단면도
							html +='<li><button type="button" class="dataPopup" data-maptype="2D" name='+data[i]+' onclick="module.select(\''+data[i]+'\')">지하시설단면도</li>';
						}else if(data[i] == 'M_SPCE_ANLS') {//공간분석
							html +='<li><button type="button" class="dataPopup" data-maptype="2D" name='+data[i]+' onclick="module.select(\''+data[i]+'\')">공간분석</li>';
						}else {
							
						}
							
					}
					
					$('#moduleList').append(html);
				}
			});
		},
		select:function(id){
			//li 하이라이트 이벤트

			if($("#moduleList li").hasClass("on") && $("#"+id).length >0 ){
				$(".lnb-dep2").find(".on").removeClass("on");
			}else if($("#moduleList li").hasClass("on")){
				$(".lnb-dep2").find(".on").removeClass("on");
				$("button[name="+id+"]").parent().addClass("on");
			}else{
				$("button[name="+id+"]").parent().addClass("on");
			}
			
			var fileHtml = '/appModule/'+id+'/'+id+'.html';
			var fileCss =  '/appModule/'+id+'/'+id+'.css';
			var fileJs =  '/appModule/'+id+'/'+id+'.js';
			
			if(module.current != id && module.current != null){//분석 팝업이 켜진후 다른 분석 li눌렀을경우
				eval(module.current).destroy();
				$('#'+module.current).remove();
				
				module.current = id;
				//2d 3d 체크
				var checked = true;
				checked = module.checkId(module.current ,checked);
				if(checked == false){return false;}
				$('#container').append('<div id="'+id+'"></div>');
				
				$('#'+id).load(fileHtml, function(){
					$.loadCSS(fileCss, function() {	
						$.getScript(fileJs, function() {	
							
							eval(id).init();
						});
					});
				})
			} else if(module.current == null){ //처음실행
				module.current = id;
				//2d 3d 체크
				var checked = true;
				checked = module.checkId(module.current ,checked);
				if(checked == false){return false;}
				
				$('#container').append('<div id="'+id+'"></div>');
				$('#'+id).load(fileHtml, function(){
					$.loadCSS(fileCss, function() {	
						$.getScript(fileJs, function() {	
							
							eval(id).init();
						});
					});
				})
			} else if(module.current == id){ // 삭제이벤트
				eval(module.current).destroy();
				$('#'+module.current).remove();
				
				module.current = null;
			}
			
			if(id == "M_UNDG_FCTY_SECT" || id == "M_SUHN_ANLS") {
				$('#rightPopup').removeClass('opened');
				$('#map-aside .map-tool-list li').removeClass('active');
			}
		},
		checkId: function(ci, checked){
			
			var checkModules = $(".map-type input[type='radio']:checked").val()
			if(checkModules == "2D"){
				if(ci =='M_ROV_ANLS') {	
					toastr.warning("3D에서 가능합니다.");
					module.current =null
					checked = false
					$('.lnb-analysis .on').removeClass("on");
					return checked;
				}else if(ci =='M_SUHN_ANLS'){
					toastr.warning("3D에서 가능합니다.");
					module.current =null
					checked = false
					$('.lnb-analysis .on').removeClass("on");
					return checked;
				}else if(ci =='M_VSBL_ANLS'){
					toastr.warning("3D에서 가능합니다.");
					module.current =null
					checked = false
					$('.lnb-analysis .on').removeClass("on");
					return checked;
				}else if(ci =='M_SLOPE'){
					toastr.warning("3D에서 가능합니다.");
					module.current =null
					checked = false
					$('.lnb-analysis .on').removeClass("on");
					return checked;
				}else if(ci =='M_AI_IMAGE'){
					toastr.warning("3D에서 가능합니다.");
					module.current =null
					checked = false
					$('.lnb-analysis .on').removeClass("on");
					return checked;
				}else if(ci =='M_TPPH_SECT') {	
					toastr.warning("3D에서 가능합니다.");
					module.current =null
					checked = false
					$('.lnb-analysis .on').removeClass("on");
					return checked;
				}
			}else if(checkModules == "3D"){
				 if(ci =='M_UNDG_FCTY_SECT'){
//					toastr.warning("2D에서 가능합니다.");
//					module.current =null
//					checked = false
//					return checked;
				}else if(ci =='M_SPCE_ANLS'){
//					toastr.warning("2D에서 가능합니다.");
//					module.current =null
//					checked = false
//					return checked;
				}
			}
			
		},
		liOn_off:function(){
			
		}
}

jQuery.loadCSS = function(url, callback) {
    if (!$('link[href="' + url + '"]').length) {
    	$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '">');
    }
    callback();
}


function getAiSpceAnalsView() {
    ui.loadingBar("show");
    var baseContainer = "#leftPopup";
    ui.openPopup("leftPopup");
    $(baseContainer).load('/appModule/M_AI_IMAGE/M_AI_IMAGE.html', function() {
	M_AI_IMAGE.init();
	ui.loadingBar("hide");
    });
};


