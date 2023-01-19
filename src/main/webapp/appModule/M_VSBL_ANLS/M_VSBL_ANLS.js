/**
 * SUBJECT : 가시권 
 * AUTHOR : 이푸름 
 * LAST UPDATE : 2021.1.12
 * COMMENT :
 */
var M_VSBL_ANLS = {
	appid:null,
	init:function() {
		
		enableVisibility();
		
	},
	destroy:function() {
		disableVisibility();
	},
	display:function(){
		
	}
}

/*********************************************************** 가시권 ***********************************************************/
var visiMode = false;

//가시권 활성화
function enableVisibility(){
	alert("가시권분석을 활성화합니다 지도를클릭하세요");
	// 가시권역 분석 방식
	
	Module.getAnalysis().setVFMode(true);					// 가시권 3D 표현 여부 설정
	Module.getAnalysis().setVFCreateClickMode(true);
	
	
}

// 가시권 비활성화
function disableVisibility(){
	// 가시권역 분석 방식
	
	Module.getAnalysis().setVFMode(false);					// 가시권 3D 표현 여부 설정
	Module.getAnalysis().setVFCreateClickMode(false);

	
}
function setViewShadeSetupPan(silidervalue){
	
	var pAnal = Module.getAnalysis();
	pAnal.setVFPan(parseInt(silidervalue.value));		// Pan (방위 설정)
	Module.XDRenderData();
}
function setViewShadeSetupTilt(silidervalue)
{
	
	var pAnal = Module.getAnalysis();
	pAnal.setVFTilt(parseInt(silidervalue.value));	// Tilt (수직각, 0이 수평, - 위로 + 아래로)
	Module.XDRenderData();
}

function setViewShadeSetupFovX(silidervalue)
{
	
	var pAnal = Module.getAnalysis();
	var vfov2D = pAnal.getVFFov();
	vfov2D.x = parseFloat(silidervalue.value);
	pAnal.setVFFov(vfov2D);		// Fov 가로 설정
	Module.XDRenderData();
}

function setViewShadeSetupFovY(silidervalue)
{
	
	var pAnal = Module.getAnalysis();
	var vfov2D = pAnal.getVFFov();
	vfov2D.y = parseFloat(silidervalue.value);
	pAnal.setVFFov(vfov2D);		// Fov 세로 설정
	Module.XDRenderData();
}

function setViewShadeSetupDist(silidervalue)
{
	
	var pAnal = Module.getAnalysis();
	pAnal.setVFDistance(parseInt(silidervalue.value));	// 가시권3D 분석 최대 거리 설정
	Module.XDRenderData();
}

