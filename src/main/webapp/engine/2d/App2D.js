/**
 * 2D 지도 APP
 */
class App2D {
  /**
   * 생성자
   * @param {string} baro2mapKey 바로e맵 KEY
   * @param {Object} initLocation 초기 위치
   * @param {string} mapBgType 배경지도 타입 -플랫폼개발부문 DT솔루션 이준호(22.04.13) 추가
   */
  constructor(baro2mapKey, initLocation, mapBgType) {
    this.initLocation = initLocation || {};

    // 지도 생성
    this.target = this.createMapDiv();
    this.yMap = this.createMap(baro2mapKey, mapBgType);

    // UI 객체 생성
    this.children = [];
    this.children.push(new MapControl(this.yMap, this.initLocation));
    this.children.push(new MapCoordinates(this.yMap));

    // 레이어 표시
    store.getLayerIds().forEach((layerId) => {
      const findLayer = store.facility
        .getData()
        .find((layer) => layer["tblNm"] == layerId);
      if (findLayer) {
        const layerName = findLayer["tblNm"];
        const sld = findLayer["styleInfo"];
        let zIndex = 2;
        if (findLayer["lyrDtlKnd"] == "P") {
          zIndex = 4;
        } else if (findLayer["lyrDtlKnd"] == "L") {
          zIndex = 3;
        } else if (findLayer["lyrDtlKnd"] == "A") {
          zIndex = 2;
        }
        this.yMap.addWMSLayer(layerName, sld, zIndex);
      } else {
        this.yMap.addWMSLayer(layerId, null, 2);
      }
    });
    
    this.overlay = null;
    
    // 클릭 시 컨텍스트 메뉴 삭제
    this.yMap.getMap().on("singleclick", () => {
    	if(this.overlay) {
    		this.yMap.getMap().removeOverlay(this.overlay);
    		this.overlay = null;
    	}
    });

    // 우측 버튼 컨텍스트 메뉴
    this.yMap
      .getMap()
      .getViewport()
      .addEventListener("contextmenu", (event) => {
    	if(this.overlay) {
    		this.yMap.getMap().removeOverlay(this.overlay);
    	}
    	  
    	let tag = ``;
    	tag += `<div class="context">`;
    	tag += `  <a href="#" class="c01">통합행정정보</a>`;
    	tag += `  <a href="#" class="c02">지적/건물</a>`;
    	tag += `  <a href="#" class="c03">사진등록</a>`;
    	tag += `  <a href="#" class="c04">메모등록</a>`;
    	tag += `  <a href="#" class="c05">위치정보</a>`;
    	tag += `  <a href="#" class="c06">화면저장</a>`;
    	tag += `  <a href="#" class="c07">3D전환</a>`;
    	tag += `</div>`;
    	const element = $(tag);
    	
    	const coordinate = this.yMap.getMap().getCoordinateFromPixel([event.x, event.y]);
    	this.overlay = new ol.Overlay({
    		element: element[0],
    		position: coordinate
    	});
    	this.yMap.getMap().addOverlay(this.overlay);
    	
    	$(".context a").on("click", function(){
    		$("button[data-popup]").parent("li").removeClass("active");
    	});	
    	
    	// 통합 행정 정보
    	$(".context .c01").on("click",coordinate, (event) => {
    		$("button[data-popup='top-popup01']").parent("li").addClass("active");
            cmmUtil.reverseGeocoding(event.data[0], event.data[1]).done((result)=> {
//                rightPopupOpen("landRegister", result["pnu"], null, true);
//                cmmUtil.highlightGeometry(result["lnbrWkt"]);
            	coordinate2d = coordinate;
            	if(!is3dInit){
        			loadingShowHide('show')
        			is3dBtn = false;
				
					var engineVersion = "v0.0.0.1";
					var initScript = document.createElement("script");
	
					initScript.src = "../engine/map_init.js?p=" + engineVersion;
					document.body.appendChild(initScript);		
        			
        			is3dInit = true;
        		} else {
        			var vPosition = new Module.JSVector2D(coordinate2d[0], coordinate2d[1]);

        	        // 좌표변환 실행
        	        var vResult = Module.getProjection().convertProjection(26, vPosition, 13); // 5179 -> 4326
        	        var pnu = aj_getPnuByLonLat(vResult.x, vResult.y);
        	        
        	        if(pnu != ""){        	
        	        	var landRegister = getLandRegisterByPnu(pnu);
        	        	rightPopupOpen("landRegister", pnu, null, true);
        	        	cmmUtil.highlightGeometry(landRegister.landRegister.geometry);
        	        } else{
        	        	 alert("조회된 결과가 없습니다.");
        	        }
        		}
            });
            this.yMap.getMap().removeOverlay(this.overlay);
    		return false;
    	});
    	
    	// 지적/건물
    	$(".context .c02").on("click",coordinate, (event) => {
    		$("button[data-popup='top-popup02']").parent("li").addClass("active");
            rightPopupOpen("landBuilding");
            this.yMap.getMap().removeOverlay(this.overlay);
    		return false;
    	});

    	// 사진등록
    	$(".context .c03").on("click", () => {
    		$("button[data-popup='top-popup05']").parent("li").addClass("active");
            rightPopupOpen("insertPotoInfo");
            this.yMap.getMap().removeOverlay(this.overlay);
    		return false;
    	});

    	// 메모등록
    	$(".context .c04").on("click", () => {
    		$("button[data-popup='top-popup04']").parent("li").addClass("active");
            rightPopupOpen("insertMemoInfo");
            this.yMap.getMap().removeOverlay(this.overlay);
    		return false;
    	});

    	// 위치정보
    	$(".context .c05").on("click", () => {
            $(".location").trigger("click");
            this.yMap.getMap().removeOverlay(this.overlay);
    		return false;
    	});

    	// 화면저장
    	$(".context .c06").on("click", () => {
            $('#map-aside .map-tool-list li button[data-popup="top-popup07"]').trigger("click");
            this.yMap.getMap().removeOverlay(this.overlay);
    		return false;
    	});
    	
    	// 통합 행정 정보
    	$(".context .c07").on("click", () => {
    		$("#mapType3D").trigger("click");
    		return false;
    	});
		
        // 지도 우클릭 시 필요한 동작 정의 필요
        event.preventDefault();
      });
  }

  /**
   * 소멸자
   */
  destroy() {
    if (this.children) {
      this.children.forEach((child) => child.destroy());
      this.children = null;
    }

    if (this.target) {
      $("#" + this.target).remove();
    }

    this.yMap = null;
    this.initLocation = null;
  }

  /**
   * 지도 설정
   * @param {DMap} yMap  지도
   */
  setYMap(yMap) {
    this.yMap = yMap;
  }
  /**
   *  지도 반환
   * @returns {yMap} 지도
   */
  getYMap() {
    return this.yMap;
  }

  /**
   * 저장소 반환
   */
  getStore() {
    return this.store;
  }

  /**
   * 지도 DIV 생성
   * @returns {string} 지도 DIV ID
   */
  createMapDiv() {
    const id = "div_2d_map";
    let tag = "<div id='" + id + "' style='width:100%;height:100%;'></div>";
    $("#container").prepend(tag);
    return id;
  }

  /**
   * 지도 생성
   * @param {string} baro2mapKey 바로e맵 KEY
   * @param {string} mapBgType 배경지도 타입
   * @returns {ol.Map} 지도
   */
  createMap(baro2mapKey, mapBgType) {
    const view = new ol.View({
      projection: "EPSG:5179",
      center: this.initLocation["center"] || [
        999028.8152684278, 1943589.1358372485,
      ],
      zoom: this.initLocation["zoom"] || 17,
      minZoom: 6,
      maxZoom: 19,
      constrainResolution: true,
    });
    return new YMap(this.target, view, baro2mapKey, mapBgType, [
      "select",
      "selectFacility",
      "highlight",
      "measure",
      "drawingTool",
      "editTool",
    ]);
  }

  /**
   * 지도 최초  지정된 영역이동.
   * @param ymap
   */
  selectBaseLocation(ymap) {
    $.ajax({
      type: "POST",
      url: "/cmt/fvrt/selectBaseLocation.do",
      processData: false,
      contentType: false,
      async: false,
      ymap: ymap,
      success: function (returnData, status) {
        if (status == "success") {
          var result = JSON.parse(returnData);

          this.ymap.map
            .getView()
            .setCenter([result.result.xcord, result.result.ycord]);
          this.ymap.map.getView().setZoom(result.result.cchLevel);
        } else {
          alert("ERROR!");
          return;
        }
      },
    });
  }
}
