/**
 * 지하시설단면도
 */
var M_DGUF_ANLS = {
    /**
     * 초기화
     */
    init() {
	this.GLOBAL.Transparency = Module.getTransparency();
	this.GLOBAL.Map = Module.getMap();
	this.GLOBAL.Transparency.setRadius(100.0);
    },
    
    /**
     * 객체
     */
    GLOBAL : {
		Transparency : null,
		Map : null
	},
    
    /**
     * 마우스 모드 설정
     */
    setMouseState(mode) {
	if (mode == 'off') {
	    Module.XDSetMouseState(Module.MML_MOVE_GRAB);
	} else if (mode == 'drag'){
	    Module.XDSetMouseState(Module.MML_VIEW_UNDERGROUND);
	} else if (mode == 'area') {
	    Module.XDSetMouseState(Module.MML_INPUT_LINE);
	}
	document.getElementById("areaSetBtn").disabled = (mode != 'area');
    },
    
    /**
     * 터파기 생성
     */
    createTransparency() {
	if (this.GLOBAL.Transparency == null || this.GLOBAL.Map == null) {
		return;
	}
	
	// 터파기 영역 점 리스트 반환
	var vInputPointList = this.GLOBAL.Map.getInputPoints();
	
	// 터파기 생성
	this.GLOBAL.Transparency.create(vInputPointList);
	
	// 입력점 클리어
	this.GLOBAL.Map.clearInputPoint();
    }
}

$(document).ready(function() {
   $('.type-group input[name="mouseType"]').on('change', function() {
     let mode = $(this).val(); 
     M_DGUF_ANLS.setMouseState(mode);
     if (mode != 'off') {
	 Module.XDEClearTransparecnyObject();
     }
   });
   
   $('#areaSetBtn').on('click', function() {
       M_DGUF_ANLS.createTransparency();
   })
});