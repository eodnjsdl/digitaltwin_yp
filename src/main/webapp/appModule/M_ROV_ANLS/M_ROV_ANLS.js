/**
 * SUBJECT : 조망 
 * AUTHOR : 이푸름 
 * LAST UPDATE : 2021.1.12
 * COMMENT :
 */
var M_ROV_ANLS = {
	jNum : 0,
	jomangMode : false,
	appid:null,
	init:function() {
//		M_ROV_ANLS.destroy();
		//조망권
		GLOBAL.Map = Module.getMap();
		
		GLOBAL.Control = Module.getControl();
		
		var layerList = new Module.JSLayerList(true);
		
		GLOBAL.Jomang = layerList.createLayer("analyJomang", 0);
		GLOBAL.Jomang.setMaxDistance(GLOBAL.MaxDistance);
	},
	
	
	/*destroy*/
	destroy:function() {
		GLOBAL.Jomang.removeAll()
		M_ROV_ANLS.jNum = 0;
		changeJomangMouseKeyboardState(false)
	},
	display:function(){
		
	}
}

$(function(){
	
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
	
	$("#jomangRgstr").on("click",function(){
		if($("#jomangRgstr").html() == "등록"){
			enableJomang();
		} else{
			disableJomang();
		}
	});
	
});
//조망권 활성화
function enableJomang(){
	Module.XDSetMouseState(1);
	showJomangPoint();
	$(".analysis-view-list").css("display","block");
	$("#jomangRgstr").css("display","none");

}
//조망권 비활성화
function disableJomang(){
	// 거리, 면적, 높이 측정 외 마우스 상태 '이동'으로 변경
	changeJomangMouseKeyboardState(M_ROV_ANLS.jomangMode);

}
function resiCompJomang(){
		
	var pointCnt = GLOBAL.Jomang.getObjectCount();
	
	if(pointCnt > 5){ 
		toastr.warning('조망점은 최대 5개만 선택할 수 있습니다.');
//		changeJomangMouseKeyboardState(false)
		return false;
	}else if(pointCnt == 0){
		toastr.warning('조망점이 없습니다.');
		
	}else if(pointCnt == 5){
		
	}
	else{
		$("#jomangRgstr").css("display","block");
	}
//	changeJomangMouseKeyboardState(false)
}
//조망점 생성
function registerJomangPoint(e){
	var jNum = M_ROV_ANLS.jNum
	if (GLOBAL.Map == null || GLOBAL.Layer == null) return;

	var vPosition = GLOBAL.Map.ScreenToMapPointEX(new Module.JSVector2D(e.x - _minusW, e.y - _minusH));
	var lon = vPosition.Longitude;
	var lat = vPosition.Latitude;
	var alt = vPosition.Altitude;
	var image = getCircle(4);
	var layerName = "analyJomang";
	var pointCnt = GLOBAL.Jomang.getObjectCount();

	if(pointCnt > 4){
		toastr.warning('조망점은 최대 5개만 선택할 수 있습니다.');
		disableJomang();
	} else{
		Module.getAddObject().Add3DPoint(layerName, "pos_"+jNum, lon, lat, alt, image.data, image.width, image.height, "조망점"+jNum);

		var html = "<li id=\"jomangPoint" + jNum + "\"><div class=\"cell th\">조망점" + jNum + "</div>";
		html += "<div class=\"cell td\">";
		html += "<button type=\"button\" onclick=\"moveJomangPoint(" + jNum + ",this)\" class=\"btn btn-sm type03\">이동</button> ";
		html += "<button type=\"button\" onclick=\"removeJomangPoint(" + jNum + ")\" class=\"btn btn-sm basic\">삭제</button>";
		html += "</div>";
		html += "</li>";

		$('#jomangList').append(html);

		M_ROV_ANLS.jNum++;
	}


	checkJomangListCnt();
}

//조망점 원형 생성
function getCircle(radius){
	var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = radius * 4;
  canvas.height = radius * 4;
  var x = canvas.width / 2;
  var y = canvas.height / 2;

  context.beginPath();
  context.arc(x, y, radius, 0, 2*Math.PI, false);
  context.fillStyle = 'red';
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = 'white';
  context.stroke();

  return context.getImageData(0,0,canvas.width,canvas.height);
}

//조망점 삭제
function removeJomangPoint(pointCnt){
	changeJomangMouseKeyboardState(false);
	$("#jomangPoint" + pointCnt).remove();
	GLOBAL.Jomang.removeAtKey("pos_" + pointCnt);
	Module.XDRenderData();
	checkJomangListCnt();
	
	var pointCnt = GLOBAL.Jomang.getObjectCount();
	if(pointCnt < 5) {
		$("#jomangRgstr").css("display","block");
	}

}

//조망점 모두삭제
function removeJomangAllPoint() {
	var pointCnt = GLOBAL.Jomang.getObjectCount();
	if(pointCnt == 0){
		toastr.warning("삭제할 조망점이없습니다")
	}
	$('#jomangList>li button:last-child').each(function(){
		$(this).click();
		changeJomangMouseKeyboardState(false)
		
	});
	//위치초기화
	setInitialLoc();
	//조망권 비활성화 상태
	changeJomangMouseKeyboardState(false);
}

//조망점 이동
//var reCameraLocation
//var reCurrentLon,
//	reCurrentLat,
//	reCurrentAlt,
//	reCurrentTilt;
reSaveOk = false;
function moveJomangPoint(pointCnt,tag){
	
	$("#jomangList .type03").css("background-color","");
	
	GLOBAL.Camera.setLimitAltitude(0);
	
	jomangMode = true;
	changeJomangMouseKeyboardState(true);

	var point = GLOBAL.Jomang.keyAtObject("pos_" + pointCnt);

	if(point == null) return;

	var camera = GLOBAL.Camera;
	var vPosition = point.getPosition();
	var dir = parseInt(GLOBAL.Camera.getDirect().toFixed(5));

	vPosition.Altitude = vPosition.Altitude + 5;//미정

	if (reSaveOk == false) {
		reSaveOk = true;
		reCameraLocation = GLOBAL.Camera.getLocation();
		reCurrentLon = reCameraLocation.Longitude;
		reCurrentLat = reCameraLocation.Latitude;
		reCurrentAlt = reCameraLocation.Altitude;
		reCurrentDir = parseInt(GLOBAL.Camera.getDirect().toFixed(5));
		reCurrentTilt = parseInt(GLOBAL.Camera.getTilt().toFixed(5));
	}

	GLOBAL.Camera.setLocation(vPosition);
	GLOBAL.Camera.setTilt(10);
	GLOBAL.Camera.setLimitTilt(10);
	GLOBAL.Camera.setDirect(dir);
	
	$(tag).attr("style","background-color:#1C77FF;")
}

//조망점 개수 확인
function checkJomangListCnt(){

	var pointCnt = GLOBAL.Jomang.getObjectCount();

	if(pointCnt > 0){ // 조망점이 1개 이상

		$("#jomangRgstr").css("display","none")
		$(".analysis-view-list").css("display","block");
		
	} else{ // 조망점 0개

		$("#jomangRgstr").css("display","block")
		$(".analysis-view-list").css("display","none");
		M_ROV_ANLS.jNum = 0;
		changeJomangMouseKeyboardState(false)
	}

}

//조망권 마우스 상태 변경
function changeJomangMouseKeyboardState(jMode){
	$("#jomangList .type03").css("background-color","");
	if(jMode){ // 조망권 활성화 상태
		GLOBAL.Control.setMouseRotMode(true); // 회전 가능
		GLOBAL.Control.setKeyRotMode(true);
		GLOBAL.Control.setMousePanMode(false); // 위치 이동 금지
		GLOBAL.Control.setKeyPanMode(false);
		GLOBAL.Control.setMouseZoomMode(false); // 확대 축소 금지
		GLOBAL.Control.setKeyZoomMode(false);
		GLOBAL.Camera.setMoveMode(true); // 1인칭 회전
	} else{ // 조망권 비활성화 상태
		GLOBAL.Control.setMouseRotMode(true); // 회전 가능
		GLOBAL.Control.setKeyRotMode(true);
		GLOBAL.Control.setMousePanMode(true); // 위치 이동 가능
		GLOBAL.Control.setKeyPanMode(true);
		GLOBAL.Control.setMouseZoomMode(true); // 확대 축소 가능
		GLOBAL.Control.setKeyZoomMode(true);
		GLOBAL.Camera.setMoveMode(false); // 3인칭 회전
	}
}

//조망권 보이기
function showJomangPoint(){
	GLOBAL.Jomang.setVisible(true);
}
//조망점 숨기기(삭제X)
function hideJomangPoint(){
	GLOBAL.Jomang.setVisible(false);

	vTargetPos = new Module.JSVector3D(reCurrentLon, reCurrentLat, reCurrentAlt);

	GLOBAL.Camera.move(vTargetPos, reCurrentTilt, reCurrentDir, 1);
}
