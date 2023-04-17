$(document).ready(function(){
	
	//분석 닫기버튼 이벤트
	$(".lnb-analysis .lnb-util .lnb-close").click(function(){
		removeAnalysis();
	})
	//좌측사이드 - 검색 닫기버튼
	$(".lnb-search .lnb-util .lnb-close").click(function(){
		$('#leftPopup.opened').removeClass('opened');
	})
	//좌측사이드 - 업무 닫기버튼
	$(".lnb-work .lnb-close").click(function(){
		$('#leftPopup.opened').removeClass('opened');
		$('#bottomPopup.opened').removeClass('opened');
		$('.popup-sub.opened').removeClass('opened');
	})
	//scroll
	$(".scroll-y").mCustomScrollbar({
		scrollbarPosition:"outside"
	});
	//map 상단 도구툴
	$("#map-aside .tool-btn").click(function(){
		if($(this).attr("id") != "layerList" || 
				$('[name=M_UNDG_FCTY_SECT]').parent().hasClass("on") || 
				$('[name=M_SUHN_ANLS]').parent().hasClass("on")) {
			if(!app2D) {
				removeAnalysis();
				removeGrphLayer();
			}
		}
		if (!$(this).parent().hasClass('active')) {
			$(this).parent().addClass("active").siblings().removeClass("active");
		} else {
			$(this).parent().removeClass('active');
		}
		
		/*if($("#lnb li").hasClass("on") && ($(this).attr("id") != "layerList" || $("li[data-menu=lnb-layer]").hasClass("on"))) {
			$("#lnb li").removeClass("on")
			$(".lnb-cont").css("display","none")
			//$('.popup-close').trigger('click');
		}*/
		
	});

	//map 상단 도구툴 ToolTip
	$("#map-aside .tool-btn").tooltip({
		show: null,						
		tooltipClass: "style1",
		position: {
			my: "center+9 top+3",
			at: "center bottom",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" ).addClass( "arrow" ).appendTo( this );
			}
		},
		show: {
			duration: "fast"
		},
		hide: {
			effect: "hide"
		}
	});	


	//map 상단 게시판
	$("#map-aside .bbs-btn").tooltip({
		show: null,						
		tooltipClass: "style1",
		position: {
			my: "center+17 top+3",
			at: "center bottom",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" ).addClass( "arrow" ).appendTo( this );
			}
		},
		show: {
			duration: "fast"
		},
		hide: {
			effect: "hide"
		}
	});


	// MAP > right Control
	$(".map-control .ctrl-group .ctrl-btn").click(function(){
		$(this).toggleClass("active").siblings().removeClass("active");	
	});


	//map Zoon In, out
	$('.map-zoom-tool').rangeslider({
		polyfill: false,
		onSlide: function(position, value) {
			//$sliderValue.text(value);
		},onSlideEnd: function(position, value) {
			//smap.zoomTo(value);
		}
	});

	
	// Side > LNB
	$("#lnb li[data-menu]").click(function(){
		removeAnalysis();
		//removeGrphLayer();
		// 1차 메뉴 선택 시 국토정보관리 객체 삭제		
		$(".territory-list li").each(function() {
			if($(this).hasClass("active")){
				if(app2D){
					cmmUtil.resetMap();
				} else {
					//removeAnalysis();
					removeGrphLayer();
					if(typeof(OLOAD) != "undefined" && OLOAD.m_center_Polygon != null) {
						OLOAD.m_center_Polygon.removeAllObject();
						
						var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
						var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
						
						if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
						if(lineLayer != null) { lineLayer.removeAll(); } 
						
					}
				}
			}
		});
		//분석 켜져있을시 div삭제 및 실행중인모듈 초기화
		$(".side-util li.on").removeClass("on");
		
		$("#leftPopup").removeClass("opened").html("");
		$("#leftSubPopup").removeClass("opened").html("");
		
		/*if(!$('.popup-header:contains(레이어)').parent().hasClass("opened") || $(this).attr("data-menu") == "lnb-layer") {
			$("#bottomPopup").removeClass("opened").html("");
			$(".popup-panel").removeClass("opened");
			$("#rightPopup").removeClass("opened").html("");
			$("#rightSubPopup").removeClass("opened").html("");
			
			$('#map-aside .map-tool-list li').removeClass('active');
		}*/
		
		var cat1 = $(this).data("menu");
		
		$(this).toggleClass("on").siblings().removeClass("on");
		$(".lnb-list").find(".on").removeClass("on");

		if( $("#lnb li[data-menu]").hasClass("on") ){
			$("#side .lnb-cont").stop().fadeOut(100);
			$("."+$(this).data("menu")).stop().fadeIn(100);

			switch(cat1){
				case "lnb-search" : aj_search(); break;
				case "lnb-layer" : $(".lnb-layer input[name='searchKeyword']").val(""); aj_selectLayerList("left"); break;
				case "lnb-theme" : aj_selectThematicMapList(); break; //주제도
				case "lnb-work" : 
					// if(!is3dInit){
					// 	loadingShowHide('show')
					// 	call3D(false);
					//
					// 	is3dInit = true;
					// }; break; //주제도
				case "lnb-analysis" : 
					// if(!is3dInit){
					// 	loadingShowHide('show')
					// 	call3D(false);
					//
					// 	is3dInit = true;
					// }; break; //주제도
			}
		} else {			
			$("#side .lnb-cont").stop().fadeOut(100);			
		}
		
		
		$("#leftPopup").html("").removeClass("opened");
		
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition:"outside"
		});
		
		// 생성된어 있는 POI, Line, Polygon 레이어가 있을때 지워주기(업무에서 표출중인 레이어 닫기)
		// if(!app2D) {
		// 	removeLayer();
		// 	cmmUtil.resetMap();
		// 	if(GLOBAL.layerBox != null){
		// 		delWfSLayer(GLOBAL.layerBox)
		// 		GLOBAL.layerBox = null
		// 	}
		// }
		
		// 상단 메뉴 비활성화
		$('#map-aside .map-tool-list li').removeClass('active');
	});

	// Side > LNB ToolTip
	$("#lnb .lnb-btn").tooltip({
		show: null,
		tooltipClass: "style2",
		position: {
			my: "left center",
			at: "right+14 center",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" ).addClass( "arrow" ).appendTo( this );
			}
		},
		show: {
			duration: "fast"
		},
		hide: {
			effect: "hide"
		}
	});

	// Side > LNB depth
	$(".lnb-dep2 button").click(function(){
		$(".lnb-list, .lnb-dep2").find(".on").removeClass("on");
		$(this).parent().addClass("on");		
	});
	

	// Side > util
	$(".side-util li").click(function(){
		// 분석 삭제
		removeAnalysis();
		// 필지 객체 삭제
		if(app2D){			
			cmmUtil.resetMap();
		} else{
			if(OLOAD.m_center_Polygon != null) {
				OLOAD.m_center_Polygon.removeAllObject();
			
				var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
				var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
				
				if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
				if(lineLayer != null) { lineLayer.removeAll(); }
		    }
		}
		
		$("#lnb ul li.on").removeClass("on");
		
		var cat1 = $(this).data("menu");
		
		$(this).toggleClass("on").siblings().removeClass("on");

		if( $(".side-util li[data-menu]").hasClass("on") ){
			$("#side .lnb-cont").stop().fadeOut(100);
			$("."+$(this).data("menu")).stop().fadeIn(100);
			
			switch(cat1){
				// 국토정보관리
				case "lnb-territory" : aj_selectAdministrationZoneList($("#tmpForm")[0]); 	break;
				//설정
				case "lnb-setting" 	 : aj_selectMapSettingInfo(); 							break;
				// 관리자
				case "lnb-manager"	 : $(this).removeClass("on"); 							break;
			}
			
		} else {			
			$("#side .lnb-cont").stop().fadeOut(100);			
		}
		
		
		$("#leftPopup").html("").removeClass("opened");
		$("#bottomPopup").html("").removeClass("opened");
	});


	// Side > util toolTip
	$("#side .side-btn").tooltip({
		show: null,
		tooltipClass: "style3",
		position: {
			my: "left center",
			at: "right+10 center",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" ).addClass( "arrow" ).appendTo( this );
			}
		},
		show: {
			duration: "fast"
		},
		hide: {
			effect: "hide"
		}
	});


	//calendar Language ko
	$.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
		/* 접근성 */
		// closeText: '닫기',
		// currentText: '오늘',
		// buttonImageOnly: false,
		// showButtonPanel: true
    });	
	
	//calendar from to
	var dateFormat = "yy-mm-dd",
	from = $( ".from" )
		.datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		showOn: "both",
		buttonImage: '../images/icon/form-calendar.svg',
		//buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달력은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.'
		})
		.on( "change", function() {
		to.datepicker( "option", "minDate", getDate( this ) );
		}),
	to = $( ".to" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		showOn: "both",
		buttonImage: '../images/icon/form-calendar.svg',
		//buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달력은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.'
	})
	.on( "change", function() {
		from.datepicker( "option", "maxDate", getDate( this ) );
	});

	function getDate( element ) {
	var date;
	try {
		date = $.datepicker.parseDate( dateFormat, element.value );
	} catch( error ) {
		date = null;
	}

	return date;
	}


	//tabBox > 1depth
	$(document).on("click", ".tabBoxDepth1-wrap .tabBoxDepth1 > ul > li > .inner-tab", function(){ 
		$(this).each(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});		
		if($("li[data-menu=lnb-search]").hasClass("on")){
			
			removeAllLayer()
		}
	});

	//tabBox > 2depth
	$(document).on("click", ".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab", function(){ 
		$(this).each(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});	
		if($("li[data-menu=lnb-search]").hasClass("on")){
			
			removeAllLayer()
		}
	});

	//tabBox > 3depth
	$(document).on("click", ".tabBoxDepth3-wrap .tabBoxDepth3 > ul > li > .inner-tab", function(){ 
		$(this).each(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});	
	});

	//tabBox > 4depth
	$(document).on("click", ".tabBoxDepth4-wrap .tabBoxDepth4 > ul > li > .inner-tab", function(){ 
		$(this).each(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});	
	});	


	//popup
	$(document).on("click", "button[data-popup], a[data-popup]", function(){
		if($(this).attr("id") != "layerList" || 
				$('[name=M_UNDG_FCTY_SECT]').parent().hasClass("on") || 
				$('[name=M_SUHN_ANLS]').parent().hasClass("on")) {
			
			if(!app2D) {
				removeAnalysis();
				removeGrphLayer();
			}
		}
		
		if($(this).hasClass("dataPopup")){
			$("."+$(this).data("popup")).siblings().removeClass("opened");
		}

		if ($(this).parents('.map-tool-list').html() != undefined) {
			if ($(this).hasClass("topPopup")) {
				$('#rightPopup').removeClass('opened');
			} else if ($(this).hasClass("leftPopup")) {
				$('#leftPopup').removeClass('opened');
			} else if ($(this).hasClass("bottomPopup")) {
				$('#bottomPopup').removeClass('opened');
			}
			if ($(this).parent().hasClass('active')) { // 메뉴 On
				// 지도 action 이후에 호출되는 팝업은 제외
				if ($(this).data("popup") != "top-popup01") {
					$("." + $(this).data("popup")).addClass("opened");
				} else {
					var msgTxt = "화면에서 지적을 선택해주세요.";
					showMsg(msgTxt);
				}

				if ($(this).attr("id") != "") {
					if ($(this).hasClass("topPopup")) {
						$('#rightPopup').removeClass('opened');
						rightPopupOpen($(this).attr("id"));
					} else if ($(this).hasClass("leftPopup")) {
						$('#leftPopup').removeClass('opened');
						leftPopupOpen($(this).attr("id"));
					} else if ($(this).hasClass("bottomPopup")) {
						$('#bottomPopup').removeClass('opened');
						bottomPopupOpen($(this).attr("id"));
					}
				}

				// 생성된어 있는 POI, Line, Polygon 레이어가 있을때 지워주기
				removeLayer();
				cmmUtil.drawClear();
				if(!app2D) {
					if (GLOBAL.layerBox != null) { //데이터내보내기에서 그린 3d객체 있을시 삭제
						delWfSLayer(GLOBAL.layerBox)
						GLOBAL.layerBox = null
					}
				}
			} else { // 메뉴 Off
				if ($(this).data("popup") == "top-popup01") { // 통합행정정보 Off 시 폴리곤 초기화
					if(app2D){
						cmmUtil.resetMap();
					} else {
						if(OLOAD.m_center_Polygon != null){
							OLOAD.m_center_Polygon.removeAllObject();
							
							var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
							var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
							
							if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
							if(lineLayer != null) { lineLayer.removeAll(); }
						}
					}
				}
			}
		} else {
			// 지도 action 이후에 호출되는 팝업은 제외
			if($(this).data("popup") != "top-popup01"){
				$("."+$(this).data("popup")).addClass("opened");
			}
	
			if($(this).attr("id") != ""){
				if($(this).hasClass("topPopup")){
					$('#rightPopup').removeClass('opened');
					rightPopupOpen($(this).attr("id"));
				}else if($(this).hasClass("leftPopup")){
					$('#leftPopup').removeClass('opened');
					leftPopupOpen($(this).attr("id"));
				}else if($(this).hasClass("bottomPopup")){
					$('#bottomPopup').removeClass('opened');
					bottomPopupOpen($(this).attr("id"));
				}
			}
			// 생성된어 있는 POI, Line, Polygon 레이어가 있을때 지워주기
			removeLayer();
			cmmUtil.drawClear();
			if(!app2D) {
				if(GLOBAL.layerBox != null){//데이터내보내기에서 그린 3d객체 있을시 삭제
					delWfSLayer(GLOBAL.layerBox)
					GLOBAL.layerBox = null
				}
			}
		}	
		
		
	});
	
	//popup close
	$(document).on("click", ".popup-panel .popup-close", function(){				
		$(".territory-list li").each(function() {
			if($(this).hasClass("active")){	
				if($(this).siblings(".popup-body").find("sub-popup-body").hasClass("territory-info-body")){
					if(app2D){
						cmmUtil.resetMap();
					} else {
						if(typeof(OLOAD) != "undefined" && OLOAD.m_center_Polygon != null) {
							OLOAD.m_center_Polygon.removeAllObject();

							var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
							var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
							
							if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
							if(lineLayer != null) { lineLayer.removeAll(); }
						}
					}
				}
				
				if(!$(".popup-sub").hasClass("opened")){
					$(this).removeClass("active");
				} else{
					var landRegister = getLandRegisterByPnu($("input[name='code2']").val());
					
					// 속성정보창(서브팝업창) 닫을 때 필지->리 객체 전환 
					if($("input[name='code2']").val() != ""
						&& typeof(landRegister.landRegister) != "undefined"){

						setTimeout(() => {
							if(app2D){
								cmmUtil.highlightGeometry(landRegister.landRegister.geometry);
							} else{
								if("<c:out value='${searchVO.code2}' />" != ""){
									var coordinates = OLOAD.setPosition(landRegister.landRegister.geometry, "MULTIPOLYGON", 0);
									
									createVerticalPlane(coordinates.coordinates);
									OLOAD.loadCenterData(landRegister);
									moveCamera(landRegister, "li");
								}	
							}
						}, 50);
							
					}
				}
			}
		});
		
		$(this).parent().removeClass("opened");
		
		if($(".lnb-list").find("li .on").length == 1 && !$(this).parent().hasClass("popup-sub") && !$(this).parent().hasClass("popup-right")) {
			$(".lnb-list").find(".on").removeClass("on");
		}
		
		// 임시
		ui.closeSubPopup();
		// 생성된어 있는 POI, Line, Polygon 레이어가 있을때 지워주기
		/*removeLayer();*/
		cmmUtil.drawClear();
		
		if(!$(this).parent().hasClass('popup-sub')) {
			cmmUtil.resetMap();
		}
		
		if(!$('#transportationFacility').parent().hasClass("on")) {
			cmmUtil.setPoiHighlightRemove(); // 2d 하이라이트 삭제
		}
		
		if(!app2D) {
			Module.getMap().clearSelectObj(); // 3d 선택된 오브젝트 해제
		
			var LayerList = new Module.JSLayerList(false);
			
			 if(LayerList.nameAtLayer("building_object")) {
					if(LayerList.nameAtLayer("building_object").getVisible()) {
						Module.XDSetMouseState(6);
					}
			    }
				
				var LayerList = new Module.JSLayerList(true);
				
			    if(LayerList.nameAtLayer("COLOR_POLYGONS")) {
					LayerList.nameAtLayer("COLOR_POLYGONS").removeAll();
			    }
			    
				if(new Module.JSLayerList(true).nameAtLayer("Line_Option")) {
					new Module.JSLayerList(true).nameAtLayer("Line_Option").removeAll();
				}
				
				if(GLOBAL.layerBox != null){//데이터내보내기에서 그린 3d객체 있을시 삭제
					delWfSLayer(GLOBAL.layerBox)
					GLOBAL.layerBox = null
				}
				if(GLOBAL.layerWMS != null){//지적/건물 wms데이터 삭제
					delWMSLayer(GLOBAL.layerWMS)
					GLOBAL.layerWMS = null
						
				}
		}
		
		if ($(this).parents('#rightPopup').html() != undefined) {
			// 통합행정정보 폴리곤 초기화
			if($('#map-aside .map-tool-list li button[data-popup="top-popup01"]').parent().hasClass('active')){
				if(app2D){
					cmmUtil.resetMap();
				} else{
					if (OLOAD.m_center_Polygon != null) {
						OLOAD.m_center_Polygon.removeAllObject();

						var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
						var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
						
						if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
						if(lineLayer != null) { lineLayer.removeAll(); }
					}
				}
			}
			
			// 상단 메뉴 버튼 비활성화
			$('#map-aside .map-tool-list li').removeClass('active');
		}
		if(app2D==false || app2D==null){
		removeGrphLayer();
		}

		// 레이어 관리창 닫을 시 레이어관리 버튼 비활성화 처리
		if ($(this).siblings('.popup-body').find('.left-popup-body').hasClass('layerMng-body')) {
			$('#layerManagement').removeClass('active');
		}
	});

	// left popup 접기/펼치기
	$(document).on("click", ".popup-panel .popup-left-toggle", function() {
		$(this).parent().toggleClass("fold");
		
		$(".lnb-cont").each(function(){
			if($(this).is(":visible")){
				
//				$(".popup-left-toggle").css("left", 250 - $(this).width() + "px");
			}
		});
		
		if( $(this).parent().hasClass("fold") ){
			$(this).attr("title","펼치기");
		} else {			
			$(this).attr("title","접기");
		}
	});
				
	//bottom popup 접기/펼치기
//	$(".popup-panel .popup-bottom-toggle").each(function() {
//		$(this).click(function(){
//			$(this).parent().toggleClass("fold");
//			
//			if( $(this).parent().hasClass("fold") ){
//				$(this).attr("title","펼치기");
//			} else {			
//				$(this).attr("title","접기");
//			}
//		});
//	});
	
	//분석 popup 접기/펼치기
	$(".small-popup .popup-toggle").each(function() {
		$(this).click(function(){
			$(this).parent().toggleClass("fold");
			
			if( $(this).parent().hasClass("fold") ){
				$(this).attr("title","펼치기");
			} else {			
				$(this).attr("title","접기");
			}
		});
	});
	
	$(document).on("click", ".lnb-dep2 .dataPopup, .lnb-btn", function(){
		if(app2D){
			cmmUtil.resetMap();
		} else{
			if(new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGONS")) {
		    	new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGONS").removeAll();
		    }
			
			if(new Module.JSLayerList(true).nameAtLayer("Line_Option")) {
				new Module.JSLayerList(true).nameAtLayer("Line_Option").removeAll();
			}
			
			if(OLOAD.m_center_Polygon != null) {
				OLOAD.m_center_Polygon.removeAllObject();
				
				var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
				var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
				
				if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
				if(lineLayer != null) { lineLayer.removeAll(); }
		    }
		}
		
	    cmmUtil.drawClear();
	});
	
	// 공간검색 레이어 초기화
	$(document).on("click", "#side #lnb li, .territory, .map-tool-list li, .lnb-work .lnb-dep2 li, #searchForm .tabBoxDepth2 li, .popup-close", function(){
		if($('#mapType3D').prop("checked")) {
			
			if(!$(this).parent().hasClass("popup-sub")) {
				removeLayer();
			}
	 		var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("Line_Arr_Option");
			if(layer != null) {
				layer.removeAll();
			}
		}
	});	
	
	$(document).on("click", "#searchForm .btn.type01.search", function() {
		$('#searchForm .drawing-obj span input:checked').prop("checked", false);
	})
});

function datepicker(){
	//calendar
	$( ".datepicker" ).datepicker({
		showOn: 'both',
		buttonImage: '/images/icon/form-calendar.svg',
		//buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달력은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.'
	});	
}

//map Zoon In / out
function mapZoomControlPlusRe(){
	if(mapType == "3D") {
		var zoomControlValueRe = parseInt($('.map-zoom-tool').val()) + 1;
		$('.map-zoom-tool').val(zoomControlValueRe).change();
		$('.map-zoom-tool').val(zoomControlValueRe);	
	}	
}

function mapZoomControlMinusRe(){
	if(mapType == "3D") {
		var zoomControlValueRe = parseInt($('.map-zoom-tool').val()) - 1;
		$('.map-zoom-tool').val(zoomControlValueRe).change();
		$('.map-zoom-tool').val(zoomControlValueRe);
	}
}

function leftPopupOpen(leftName, param1, param2){
//	removeGrphLayer();
	var leftWidth = "";
	var leftHeigth = "";
	var leftLeft = "";
	
	$("#leftPopup").removeClass("opened").html("");
	$("#leftSubPopup").removeClass("opened").html("");
	$("#bottomPopup").removeClass("opened").html("");
	
	if(!$('.popup-header:contains(레이어)').parent().hasClass("opened")) {	
		$(".popup-panel").removeClass("opened");
		//$("#rightPopup").removeClass("opened").html("");
		//$("#rightSubPopup").removeClass("opened").html("");
		
		//$('#map-aside .map-tool-list li').removeClass('active');
	}
	
	switch(leftName){
		// 레이어 관리 > 목록 관리
		case "layerManagement" 				: leftWidth = "550"; leftHeigth = "807"; aj_selectLayerManagementList(); break;
		// 레이어 관리 > 등록 관리
		case "dataConversion" 				: leftWidth = "550"; leftHeigth = "807"; aj_insertDataConversionView();	 break;
		// 레이어 정보 
		case "layerInfo" 					: leftWidth = "515"; leftHeigth = "807"; aj_updateLayerInfoView(param1);	 break;
		
		// 조사정보 > 목록
		case "selectExaminationInfoList"	: leftLeft = "420px"; leftWidth = "570"; leftHeigth = "807"; aj_selectExaminationInfoList($("#tmpForm")[0], param1, param2); break;
		// 행정구역별 조사정보 > 등록
		case "insertAdministrationZoneView"	: leftLeft = "420px"; leftWidth = "550"; leftHeigth = "807"; aj_insertAdministrationZoneView($("#tmpForm")[0], param1, param2); break;
		
		// 업무 > 사업공유관리 > 공사계획정보
		case "constructionPlan" 			: leftLeft = "320px"; leftWidth = "515"; leftHeigth = "807"; poiListPlan = ''; poiListSchedule = ''; orderListInquiry = ''; poiListInquiry=''; aj_selectConstructionPlanList($("#tmpForm")[0]); break;
		// 업무 > 사업공유관리 > 공사예정 정보
		case "constructionSchedule" 		: leftLeft = "320px"; leftWidth = "515"; leftHeigth = "807"; poiListPlan = ''; poiListSchedule = ''; orderListInquiry = ''; poiListInquiry=''; aj_selectConstructionScheduleList($("#tmpForm")[0]); break;
		// 업무 > 사업공유관리 > 공사정보 조회
		case "constructionInquiry" 			: leftLeft = "320px"; leftWidth = "515"; leftHeigth = "807"; poiListPlan = ''; poiListSchedule = ''; orderListInquiry = ''; poiListInquiry=''; aj_selectConstructionInquiryList(); break;
		
		// 업무 > 대기오염 > 목록
		case "atmospherePollution" 	: leftLeft = "320px"; leftWidth = "515"; leftHeigth = "807"; aj_selectAtmospherePollutionList($("#tmpForm")[0]); break;
		
		// 업무 > 시설예약관리 > 목록
		case "faciReseMng" :  leftLeft= "320px"; leftWidth= "346"; leftHeigth ="807"; aj_selectFaciReseMngList($("#tmpForm")[0]); break;  
	}
	
	$("#leftPopup").css("left", leftLeft).css("width",leftWidth).css("height",leftHeigth);
	$("#leftPopup").addClass("opened");
	
	$(".scroll-y").mCustomScrollbar({
		scrollbarPosition:"outside"
	});
}

function leftSubPopupOpen(leftName, param1, param2){
	var leftSubWidth = "";
	var leftSubHeigth = "";
	var leftSubTop = "";
	var leftSubLeft = "";
	
	$("#rightSubPopup").removeClass("opened").html("");
	
	switch(leftName){	
		// 조사정보 속성정보
		case "examinationInfo" 		: leftSubTop = "127px"; leftSubLeft = "440px"; leftSubWidth = "530"; leftSubHeigth = "745"; aj_selectExaminationInfo($("#tmpForm")[0], param1, param2); break;
		// 조사정보 수정화면
		case "examinationInfoView" 	: leftSubTop = "127px"; leftSubLeft = "440px"; leftSubWidth = "530"; leftSubHeigth = "745"; aj_updateExaminationInfoView($("#tmpForm")[0], param1, param2); break;
	}
	
	$("#leftSubPopup").css("top", leftSubTop).css("left", leftSubLeft).css("width",leftSubWidth).css("height",leftSubHeigth);
	$("#leftSubPopup").addClass("opened");
	
	$(".scroll-y").mCustomScrollbar({
		scrollbarPosition:"outside"
	});
}

function rightPopupOpen(rightName, param1, param2, noReset){

	if(!noReset) {
		cmmUtil.resetMap();	
	}	

	var rightWidth = "";
	var rightHeight = "";
	
	if($("#bottomPopup").hasClass("opened")) {
		$(".lnb-list").find(".on").removeClass("on");
	}
	
	//$("#rightPopup").removeClass("opened").html("");
	//$("#rightSubPopup").removeClass("opened").html("");
	$("#bottomPopup").removeClass("opened").html("");
	$(".popup-right.opened").removeClass("opened");
	
	if(rightName != "layerList") {
		$("#leftPopup").removeClass("opened").html("");
		$("#leftSubPopup").removeClass("opened").html("");	
	} else if($('#leftPopup.opened .popup-header').html() == "레이어 정보"){
		$("#leftPopup").removeClass("opened").html("");
	}

	$("#rightPopup").addClass("opened");
	
	switch(rightName){
		// 지적/건물
		case "landBuilding" 				: rightWidth = "470"; rightHeight = "807"; aj_selectLandBuilderList(); break;
		// 조사정보
		case "examinationInfo" 				: rightWidth = "600"; rightHeight = "807"; break;
		// 업소정보
		case "businessInfo" 				: rightWidth = "600"; rightHeight = "807"; aj_selectBusinessInfo(param1); break;
		// 내보내기
		case "dwldInfo"						: rightWidth = "420"; rightHeight = "807"; aj_dataDownload(); break;
		// 메모정보
		case "memoInfo" 					: rightWidth = "480"; rightHeight = "807"; aj_selectMemoInfoList($("#tmpForm")[0]); break;
		case "insertMemoInfo" 				: rightWidth = "480"; rightHeight = "807"; aj_insertMemoInfoView(param1); break;
		case "updateMemoInfo" 				: rightWidth = "480"; rightHeight = "807"; aj_updateMemoInfoView(param1,param2); break;
		case "selectMemoInfoView" 			: rightWidth = "480"; rightHeight = "807"; aj_selectMemoInfoView(param1,param2); break;
		// 사진정보
		case "potoInfo" 					: rightWidth = "480"; rightHeight = "807"; aj_selectPotoInfoList($("#tmpForm")[0]); break;
		case "insertPotoInfo" 				: rightWidth = "480"; rightHeight = "807"; aj_insertPotoInfoView(param1); break;
		case "selectPotoInfoView" 			: rightWidth = "480"; rightHeight = "807"; aj_selectPotoInfoView(param1,param2); break;
		case "updatePotoInfo" 				: rightWidth = "480"; rightHeight = "807"; aj_updatePotoInfoView(param1,param2); break;
		// 즐겨찾기
		case "favorites" 					: rightWidth = "480"; rightHeight = "807"; aj_selectFavoritesList($("#tmpForm")[0]); break;
		case "insertFavorites" 				: rightWidth = "480"; rightHeight = "807"; aj_insertFavoritesView(param1); break;
		case "selectavoritesView" 			: rightWidth = "480"; rightHeight = "807"; break;
		case "updateavorites" 				: rightWidth = "480"; rightHeight = "807"; aj_updatePotoInfoView(); break;
		// 통합행정정보-토지대장
		case "landRegister" 				: rightWidth = "660"; rightHeight = "807"; aj_selectLandRegister(param1); break;
		// 통합행정정보-건축물대장
		case "buildingRegister" 			: rightWidth = "660"; rightHeight = "807"; aj_selectBuildingRegister(param1); break;
		// 토지이용현황-토지이용현황
		case "landUseStatus" 				: rightWidth = "660"; rightHeight = "807"; aj_selectLandUseStatus(param1); break;
		// 토지이용현황-공시지가
		case "officiallyAnnouncedLandPrice" : rightWidth = "660"; rightHeight = "807"; aj_selectOfficiallyAnnouncedLandPrice(param1); break;
		// 토지이용현황-개별주택가격
		case "individualizationHousePrice" 	: rightWidth = "660"; rightHeight = "807"; aj_selectIndividualizationHousePrice(param1); break;
		// 토지이용현황-인허가
		case "authorizationPermission" 		: rightWidth = "660"; rightHeight = "807"; aj_selectAuthorizationPermission(param1); break;
		// 그리기도구
		case "graphicInfo"					: rightWidth = "480"; rightHeight = "807"; aj_selectGraphicInfoList(); break;
		// 드론영상
		case "dronInfo"						: rightWidth = "480"; rightHeight = "807"; aj_selectDronInfo($("#tmpForm")[0]); break;
		case "insertDronInfo" 				: rightWidth = "480"; rightHeight = "807"; aj_insertDronInfoView(param1); break;
		case "selectDronInfoView" 			: rightWidth = "480"; rightHeight = "807"; aj_selectDronInfoView(param1,param2); break;
		case "updateDronInfo" 				: rightWidth = "480"; rightHeight = "807"; aj_updateDronInfoView(param1,param2); break;
		// 배경지도
		case "backgroundMapInfo" 			: rightWidth = "325"; rightHeight = "430"; aj_selectBackgroundMapInfoList(); break;
		// 레이어 
		case "layerList" 					: rightWidth = "250"; rightHeight = "807"; $("#rightPopup input[name='searchKeyword']").val(""); aj_selectLayerList("top"); break;
}
	
	$("#rightPopup").css("width", rightWidth).css("height", rightHeight);
	
	$(".scroll-y").mCustomScrollbar({
		scrollbarPosition:"outside"
	});
}

function rightSubPopupOpen(rightName, param1, param2){
	var rightSubWidth = "";
	var rightSubHeigth = "";
	var rightSubTop = "";
	var rightSubRight = "";
	
	$("#leftSubPopup").removeClass("opened").html("");
	$("#rightSubPopup").removeClass("opened").html("");
	
	switch(rightName){	
		// 조사정보 속성정보
		case "examinationInfo" 	: rightSubTop = "190px"; rightSubRight = "90px"; rightSubWidth = "620"; rightSubHeigth = "642"; aj_selectExaminationInfo($("#tmpForm")[0], param1, param2); break;
		
		// 교통시설
		case "roadSection" 		: rightSubTop = "80px"; rightSubRight = "90px"; rightSubWidth = "620"; rightSubHeigth = "442"; aj_selectTransportationFacility($("#tmpForm")[0], param1, param2); break;
		case "railroadTrack" 	: rightSubTop = "80px"; rightSubRight = "90px"; rightSubWidth = "620"; rightSubHeigth = "170"; aj_selectRailroadTrack($("#tmpForm")[0], param1, param2); break;
		case "railroadStation" 	: rightSubTop = "80px"; rightSubRight = "90px"; rightSubWidth = "620"; rightSubHeigth = "170"; aj_selectRailroadStation($("#tmpForm")[0], param1, param2); break;
		case "subwayTrack" 		: rightSubTop = "80px"; rightSubRight = "90px"; rightSubWidth = "620"; rightSubHeigth = "170"; aj_selectSubwayTrack($("#tmpForm")[0], param1, param2); break;
		case "subwayStation" 	: rightSubTop = "80px"; rightSubRight = "90px"; rightSubWidth = "620"; rightSubHeigth = "170"; aj_selectSubwayStation($("#tmpForm")[0], param1, param2); break;
		case "bridge" 			: rightSubTop = "80px"; rightSubRight = "90px"; rightSubWidth = "620"; rightSubHeigth = "170"; aj_selectBridge($("#tmpForm")[0], param1, param2); break;
		case "overpass" 		: rightSubTop = "80px"; rightSubRight = "90px"; rightSubWidth = "620"; rightSubHeigth = "170"; aj_selectOverpass($("#tmpForm")[0], param1, param2); break;
		case "tunnel" 		: rightSubTop = "80px"; rightSubRight = "90px"; rightSubWidth = "620"; rightSubHeigth = "170"; aj_selectTunnel($("#tmpForm")[0], param1, param2); break;
		
		// 지하수관리 > 농업용공공관정 
		case "insertUnderWaterAgriView" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_insertUnderWaterAgriView($("#tmpForm")[0], param1, param2); break;
		case "selectUnderWaterAgri" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_selectUnderWaterAgri($("#tmpForm")[0], param1, param2); break;
		case "updateUnderWaterAgriView" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_updateUnderWaterAgriView($("#tmpForm")[0], param1, param2); break;
		
		// 지하수관리 > 지하수개발
		case "insertUnderWaterDevelopView" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_insertUnderWaterDevelopView($("#tmpForm")[0], param1, param2); break;
		case "selectUnderWaterDevelop" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_selectUnderWaterDevelop($("#tmpForm")[0], param1, param2); break;
		case "updateUnderWaterDevelopView" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_updateUnderWaterDevelopView($("#tmpForm")[0], param1, param2); break;
		
		// 지하수관리 > 지하수이용시설
		case "insertUnderWaterUseFacilView" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_insertUnderWaterUseFacilView($("#tmpForm")[0], param1, param2); break;
		case "selectUnderWaterUseFacil" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_selectUnderWaterUseFacil($("#tmpForm")[0], param1, param2); break;
		case "updateUnderWaterUseFacilView" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_updateUnderWaterUseFacilView($("#tmpForm")[0], param1, param2); break;
		
		// 신재생에너지 > 태양광발전소
		case "insertRenewableEnergyView" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_insertRenewableEnergyView($("#tmpForm")[0], param1, param2); break;
		case "selectRenewableEnergy" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_selectRenewableEnergy($("#tmpForm")[0], param1, param2); break;
		case "updateRenewableEnergyView" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "457"; aj_updateRenewableEnergyView($("#tmpForm")[0], param1, param2); break;
		
		//관내업소정보조회 > 상세
		case "selectInBusinessEstaInfo" : rightSubTop = "80px"; rightSubRight = "70px"; rightSubWidth = "550"; rightSubHeigth = "459"; aj_selectInBusinessEstaInfo($("#tmpForm")[0], param1, param2); break;
		
		
	}
	
	$("#rightSubPopup").css("top", rightSubTop).css("right", rightSubRight).css("width",rightSubWidth).css("height",rightSubHeigth);
	$("#rightSubPopup").addClass("opened");
	
	$(".scroll-y").mCustomScrollbar({
		scrollbarPosition:"outside"
	});
}

function bottomPopupOpen(bottomName){
	var bottomWidth = "";
	var bottomHeigth = "";
	var bottomLeft = "";
	
	//cmmUtil.resetMap();
	
	$("#leftPopup").removeClass("opened").html("");
	$("#leftSubPopup").removeClass("opened").html("");
	$("#bottomPopup").removeClass("opened").html("");
	$(".popup-panel").removeClass("opened");
	$("#rightPopup").removeClass("opened").html("");
	$("#rightSubPopup").removeClass("opened").html("");
	
	$('#map-aside .map-tool-list li').removeClass('active');
	
	switch(bottomName){
		case "undergroundWaterManagement"	: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectUnderWaterMngList($("#tmpForm")[0]); break; // 농업용공공관정
		case "undergroundWaterDevelop" 		: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectUnderWaterDevelopList($("#tmpForm")[0]); break; // 지하수개발
		case "undergroundWaterUseFacility"  : bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectUnderWaterUseFacilList($("#tmpForm")[0]); break; // 지하수이용시설
		case "renewableEnergy"  			: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectRenewableEnergyList($("#tmpForm")[0]); break; // 신재생에너지
		case "safetyFacilitiesManagement" 	: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectSafetyFacilitiesMngList($("#tmpForm")[0]); break; // 안전시설물관리(가로등)
		case "safetyFacilitiesCctv" 		: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectCctvList($("#tmpForm")[0]); break; // 안전시설물관리(CCTV)
		// 교통시설
		case "transportationFacility" 		: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectTransportationFacilityList($("#tmpForm")[0]); break;
		case "physicalEducationFacility" 	: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectPhysicalEducationFacilityList($("#tmpForm")[0]); break;
		case "selectWtlList" 				: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectWtlFacilitiesList(); break;
		case "welfareFacility" 				: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; WLREspitalYN = ''; aj_selectWelfareFacilityList($("#tmpForm")[0]); break;
		case "waterSupplyFacility"			: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_facility("WaterSupplyFacility"); break;
		case "sewerSupplyFacility"			: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_facility("SewerSupplyFacility"); break;
		//관내업소정보
		case "inBusinessEstaInfo"			: bottomLeft = "320px"; bottomWidth = "1600"; bottomHeigth = "378"; aj_selectInBusinessEstaInfoList($("#tmpForm")[0]); break;
		
	}
	
	$("#bottomPopup").css("left", bottomLeft).css("width", bottomWidth).css("height", bottomHeigth);
	$("#bottomPopup").addClass("opened");
	
	$(".scroll-y").mCustomScrollbar({
		scrollbarPosition:"outside"
	});
	
//	$(".popup-panel .popup-bottom-toggle").each(function() {
//		$(this).click(function(){
//			$(this).parent().toggleClass("fold");
//			if( $(this).parent().hasClass("fold") ){
//				$(this).attr("title","펼치기");
//			} else {			
//				$(this).attr("title","접기");
//			}
//		});
//	});
}

function callDatePicker(){
	$( ".datepicker" ).datepicker({
		showOn: 'both',
		buttonImage: '/images/icon/form-calendar.svg',
	});
}

function loadingShowHide(type) {
	if (type == "show") {
		$('body').append('<div class="loadingWrapper" style="position:fixed ; top:0; left:0; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.5); background-image:url(/images/common/loading.gif); background-position:center center; background-repeat:no-repeat; z-index: 10000;"></div>');
	} else if (type == "hide") {
		$('.loadingWrapper').remove();
	}
}


function aj_userInfoPopupOpen(id){
	$.ajax({
		type : "POST",
		url : "/com/usi/userInfoViewPopup.do",
		data: {
			userId : id 
		},
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#userInfo").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}

function aj_selectNoticeList(pageIndex, searchCnd, searchWrd){
	$.ajax({
		type : "POST",
		url : "/com/noti/selectNoticeList.do",
		data: {
			pageIndex : pageIndex,
			searchCnd : searchCnd,
			searchWrd : searchWrd,
		},
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#notice").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}


function aj_selectQnaList(pageIndex, searchCnd, searchWrd){
	$.ajax({
		type : "POST",
		url : "/com/qna/selectQnaList.do",
		data : {
			pageIndex : pageIndex,
			searchCnd : searchCnd,
			searchWrd : searchWrd,
		},
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#qna").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}

function aj_selectOpQnaList(pageIndex, searchCnd, searchWrd){
	$.ajax({
		type : "POST",
		url : "/com/opqna/selectOpQnaList.do",
		data : {
			pageIndex : pageIndex,
			searchCnd : searchCnd,
			searchWrd : searchWrd,
		},
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#opqna").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}

function removeAnalysis(){
	//분석 켜져있을시 div삭제 및 실행중인모듈 초기화
	if($("li[data-menu='lnb-analysis']").hasClass("on")){
		
		var checkDiv = document.querySelectorAll(".small-popup.small-left")
		var checkDiv2 = document.querySelectorAll(".small-popup.small-bottom")
		//small-left 일때
		if(checkDiv.length > 0){
			
			var analDiv = document.querySelectorAll(".small-popup.small-left")[0].parentElement					
			analDiv.remove();
			eval(analDiv.id).destroy();			
		}
		//small-bottom 일때
		if(checkDiv2.length > 0){
			var analDiv = document.querySelectorAll(".small-popup.small-bottom")[0].parentElement					
			analDiv.remove();
			eval(analDiv.id).destroy();						
		}
		$("#moduleList li").removeClass("on")
		
		if(!app2D) {
			if(new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGONS")) {
		    	new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGONS").removeAll();
		    }
			
			if(new Module.JSLayerList(true).nameAtLayer("Line_Option")) {
				new Module.JSLayerList(true).nameAtLayer("Line_Option").removeAll();
			}
			
			if(GLOBAL.layerWMS != null){//지적/건물 wms데이터 삭제
				delWMSLayer(GLOBAL.layerWMS)
				GLOBAL.layerWMS = null
					
			}
			if(GLOBAL.layerBox != null){//데이터내보내기에서 그린 3d객체 있을시 삭제
				delWfSLayer(GLOBAL.layerBox)
				GLOBAL.layerBox = null
			}
			var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("BUFFER_POLYGON_LAYER");
			if (layer == null) {
				layer = layerList.createLayer("BUFFER_POLYGON_LAYER", Module.ELT_PLANE);
			} else {
				layer.removeAll();
			} 
			module.current = null;
			
			if(GLOBAL.Camera.getLimitAltitude() != 200) GLOBAL.Camera.setLimitAltitude(200); // 조망권 분석 후, 높이 제한 재설정
		}
	}
		
}

function toggleFold(th) {
	$(th).parent().toggleClass("fold");
	if( $(th).parent().hasClass("fold") ){
		$(th).attr("title","펼치기");
	} else {			
		$(th).attr("title","접기");
	}
}

