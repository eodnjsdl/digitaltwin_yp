<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
$(document).ready(function(){
	// 사용자 지도 설정값 세팅
	var vertclPynThick = ${result.vertclPynThick};
	var vertclPynHeight = ${result.vertclPynHeight};
	var tpgrphTrnsprc = ${result.tpgrphTrnsprc};
	var thvidoQlityLevelick = ${result.vidoQlityLevel};
	var vertclPynColor = "rgba(" + ${result.vertclPynColorR} + "," + ${result.vertclPynColorG} +
						 "," + ${result.vertclPynColorB} + ")";
	
	 $(".slider-box .thck-value").val(vertclPynThick);
	 $(".slider-box .alt-value").val(vertclPynHeight);
	 $(".slider-box .trrc-value").val(tpgrphTrnsprc);
	 $(".slider-box .level-value").val(thvidoQlityLevelick); 
	
	// 수직폴리곤 > 두께 
	$(".slider-box .thck-slider").slider({
		range: "min",
		min: 1,
		max: 10,
		value: vertclPynThick,
		step: 1,
		slide: function(event, ui){
			$(".slider-box .thck-value").val(ui.value);		
		},
		change: function() {
			userSetup.vertclPynThick = Number($(".slider-box .thck-value").val());
			updateUserSetup();
			reloadVerticalPlane();
		}
	});
	
	// 수직폴리곤 > 높이 
	$(".slider-box .alt-slider").slider({
		range: "min",
		min: 1,
		max: 100,
		value: vertclPynHeight,
		step: 1,
		slide: function(event, ui){
			$(".slider-box .alt-value").val(ui.value);
		},
		change: function() {
			userSetup.vertclPynHeight = Number($(".slider-box .alt-value").val());
			updateUserSetup();
			reloadVerticalPlane();
		}
	
	});
	
	// 지형투명도 > 투명도
	$(".slider-box .trrc-slider").slider({
		range: "min",
		min: 0,
		max: 100,
		value: tpgrphTrnsprc,
		step: 1,
		slide: function(event, ui){
			$(".slider-box .trrc-value").val(ui.value);
			userSetup.tpgrphTrnsprc = Number(ui.value);
			setPlanetTransparency(userSetup.tpgrphTrnsprc);
		},
		change: function() {
			updateUserSetup();
		}
	});
	
	// 영상품질 > 레벨
	$(".slider-box .level-slider").slider({
		range: "min",
		min: 0.1,
		max: 2,
		value: thvidoQlityLevelick,
		step: 0.1,
		slide: function(event, ui){
			$(".slider-box .level-value").val(ui.value);
		},
		change: function() {
			userSetup.vidoQlityLevel = Number($(".slider-box .level-value").val());
			updateUserSetup();
			reloadDroneLayer();
		}
	});
	
	$(".slider-box .value-num").val( $(".slider-box .slider-handle").slider("value"));
	
	// colorpicker
	$('.colorPicker').minicolors({
		control:'hue',
		defaultValue: vertclPynColor,
		format:'rgb',
		theme: 'default',
		opacity: false,
		swatches: [],
		hide: function() {
			var vertclPynColor = $('.colorPicker').val().substring(4, $('.colorPicker').val().length - 1).split(",");
			
			userSetup.vertclPynColorR = Number(vertclPynColor[0]);
			userSetup.vertclPynColorG = Number(vertclPynColor[1]);
			userSetup.vertclPynColorB = Number(vertclPynColor[2]);
			
			updateUserSetup();
			reloadVerticalPlane();
		}
	});
	
	// 접기/펴기
	$(".setting-list .setting-toggle").click(function(){
		$(this).find(".open").removeClass("open").addClass("close");

		if( $(this).hasClass("close") ){
			$(this).removeClass("close").addClass("open").attr("title","펼치기");
			$(this).next(".box3").slideUp(200);

		}else if( $(this).hasClass("open")){
			$(this).removeClass("open").addClass("close").attr("title","접기");
			$(this).next(".box3").slideDown(200);
		}
	});
	
	// 닫기
	$(".lnb-setting .lnb-close").on("click", function () {
    	$(".lnb-setting").stop().fadeOut(100);
      	$(".side-util li[data-menu]").removeClass("on");
      	$('#leftPopup.opened').removeClass('opened');
      	$('.popup-sub.opened').removeClass('opened');
    });
});

// 사용자 설정 업데이트
function updateUserSetup() {
	
	var vertclPynColor = $('.colorPicker').val().substring(4, $('.colorPicker').val().length - 1).split(",");

	$.ajax({
		type : "POST",
		url : "/geo/map/updateMapSettingInfo.do",
		dataType : "json",
		data : {
			vertclPynThick : $('.thck-value').val(),
			vertclPynHeight : $('.alt-value').val(),
			vertclPynColorR : vertclPynColor[0],
			vertclPynColorG : vertclPynColor[1],
			vertclPynColorB : vertclPynColor[2],
			tpgrphTrnsprc : $('.trrc-value').val(),
			vidoQlityLevel : $('.level-value').val(),
		},
		async: false,
		success : function(returnData, status){
			if(status == "success") {
			
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}

// 드론영상 레이어 리로드
function reloadDroneLayer(){
	var layerList = new Module.JSLayerList(false);
	
	for(var i = 0; i < ypLiLod.length; i++){
		for(var j = 0; j < ypLiLod[i].length; j++){
			var layer = layerList.nameAtLayer("lod_" + ypLiLod[i][j]);
			
			if(layer != null){
				if(layer.getVisible()){		
					layer.lod_object_detail_ratio = userSetup.vidoQlityLevel;
				}
			}
		}
	}
	
	var layer = layerList.nameAtLayer("lod25");
	
	if(layer != null){
		if(layer.getVisible()){
			layer.lod_object_detail_ratio = userSetup.vidoQlityLevel;
		}
	}
}

// 수직폴리곤 리로드
function reloadVerticalPlane(){
	var layer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
	
	if(layer != null && mapType == "3D") {
		if(layer.getObjectCount() != 0) {
			var landRegister = getLandRegisterByPnu(OLOAD.m_centerKey)
			
			OLOAD.m_center_Polygon.removeAllObject();
			
			var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
			var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
			
			if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
			if(lineLayer != null) { lineLayer.removeAll(); }
			
			if(landRegister != null){ 
				var coordinates = OLOAD.setPosition(landRegister.landRegister.geometry, "MULTIPOLYGON", 0);
				
				createVerticalPlane(coordinates.coordinates);
				OLOAD.loadCenterData(landRegister);
			}
		}
	}
}

</script>

					
						<div class="lnb-header"><h2 class="tit">설정</h2></div>
						<div class="lnb-body">
							<div class="scroll-y">
								<ul class="setting-list">
									<li><span class="cont-tit">수직폴리곤</span> <button type="button" class="setting-toggle close" title="접기"></button>
										<div class="box3">
											<div class="tbl-list vertical-tbl">
												<div class="items">
													<div class="term">두께</div>
													<div class="desc">
														<div class="slider-box">
															<div class="slider"><div class="slider-handle thck-slider"></div></div>
															<input type="text" class="thck-value" value="50" readonly>
														</div>
													</div>
												</div>
												<div class="items">
													<div class="term">높이</div>
													<div class="desc">
														<div class="slider-box">
															<div class="slider"><div class="slider-handle alt-slider"></div></div>
															<input type="text" class="alt-value" value="20" readonly>
														</div>
													</div>
												</div>
												<div class="items">
													<div class="term">색상</div>
													<div class="desc"><input type="text" class="colorPicker"></div>
												</div>
											</div>
										</div>
									</li>
									<li><span class="cont-tit">지형투명도</span> <button type="button" class="setting-toggle close" title="접기"></button>
										<div class="box3">
											<div class="tbl-list vertical-tbl">
												<div class="items">
													<div class="term">투명도</div>
													<div class="desc">
														<div class="slider-box">
															<div class="slider"><div class="slider-handle trrc-slider"></div></div>
															<input type="text" class="trrc-value" value="100" readonly>
														</div>
													</div>
												</div>
											</div>
											<p class="ex-text">*지하시설물 가시화시 지형투명도를 설정</p>
										</div>
									</li>
									<li><span class="cont-tit">영상품질</span> <button type="button" class="setting-toggle close" title="접기"></button>
										<div class="box3">
											<div class="tbl-list vertical-tbl">
												<div class="items">
													<div class="term">레벨</div>
													<div class="desc">
														<div class="slider-box">
															<div class="slider"><div class="slider-handle level-slider"></div></div>
															<input type="text" class="level-value" value="50" readonly>
														</div>
													</div>
												</div>
											</div>
											<p class="ex-text">*드론영상 가시화 시 영상품질 설정(1.0 권장)</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="lnb-util">
							<button type="button" class="lnb-close" title="닫기"></button>
						</div>
