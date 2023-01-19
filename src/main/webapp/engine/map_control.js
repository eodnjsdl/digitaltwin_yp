/**
 * @Class Name : map_control.js
 * @Description : 지도 마우스 및 키보드 제어 js
 * @
 * @  수정일     	      수정자              		수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021.11.09    최초생성
 *
 * @author 스마트융합사업본부 김선옥
 * @since 2021.11.09
 * @version 1.0
 * @see
 */


var _minusW = 0; // poi 찍을때 옆 네비게이션 width인 _minusW만큼 밀려서 포인트 재조정을 위해
var _minusH = 0; // poi 찍을때 옆 네비게이션 height인 _minusW만큼 밀려서 포인트 재조정을 위해
var m_point;
var m_mercount = 0; // 거리 객체 그룹 번호
var m_objcount = 0; // 그룹 내 번호
var m_argrcount = 0; // 면적 객체 그룹 번호
var locaPopNum = 0;
var removeBtnPosArr = new Array();
var VALV_PSZ = null;
var WTL_MANH_PSZ = null;
var SWL_MANH_PSZ = null;
var UFL_BMAN_PSZ = null;
var UFL_KMAN_PSZ = null;
var FAR_PMAN_LMZ = null;
var GRW_DMAN_LMZ = null;
var GRU_FMAN_LMZ = null;
var SL251 = null;
var unionGeom ;
var num = 0;
/***************************************** 마우스 이벤트 *************************************************************/
/* canvas = Module.canvas */
function initControl(canvas){
    // 비선택 영역 마우스 클릭 및 드래그 제한
    validDragSdis();

    // 회전 각도 제한
    Module.getViewCamera().setLimitTilt(1);

    /* 지도 Canvas 이벤트 등록 */
    canvas.addEventListener("contextmenu", function(e){
        e.preventDefault();
    });

    canvas.onmousewheel = function (e) {
        getCameraLocation();
        
        // 레이어 > 1인가구
        if(typeof(SINGPLE_PERSON_HOUSEHOLDS.polygonLayer) != "undefined"){
        	if(SINGPLE_PERSON_HOUSEHOLDS.polygonLayer.length > 0){        		
        		if(SINGPLE_PERSON_HOUSEHOLDS.polygonLayer[0].getVisible() == true){        	
        			var alt = Module.getViewCamera().getAltitude();
        			var mode;
        			
        			if(alt < 30000){
        				mode = true;
        			} else{
        				mode = false;
        			}
        			
        			if(SINGPLE_PERSON_HOUSEHOLDS.mode != mode){
        				SINGPLE_PERSON_HOUSEHOLDS.mode = mode;
        				
        				if(SINGPLE_PERSON_HOUSEHOLDS.chartLayer != null){
        					var arr = SINGPLE_PERSON_HOUSEHOLDS.chartLayer;
        					for(var i = 0; i < arr.length; i++){
        						arr[i].setVisible(mode);
        					}
        				}
        				
        			}
        		}
        	}
        }
        
    };

    canvas.addEventListener('dblclick', function (e) {
        if(Module.XDGetMouseState() == 87){ // 거리
            var layerList = new Module.JSLayerList(true);
            var layer = layerList.nameAtLayer("MEASURE_POI");
            var vPosition = layer.keyAtObject((m_mercount-1) + "_POI_" + (m_objcount-1)).getPosition();
            var removeInterface = document.createElement("button");
            var lon = vPosition.Longitude;
            var lat = vPosition.Latitude;
            var alt = vPosition.Altitude;
            var position = Module.getMap().MapToScreenPointEX(new Module.JSVector3D(lon, lat, alt));

            removeInterface.id = "removeBtn" + (m_mercount-1);
            removeInterface.className = "anal-remove-btn";
            removeInterface.style.left = position.x + 70 - _minusW + "px";
            removeInterface.style.top = position.y + 14 - _minusH + "px";

            //document.getElementById("indoorMapArea").appendChild(removeInterface);

            // 지도상 좌표
            removeBtnPosArr[m_mercount-1] = new Array();
            removeBtnPosArr[m_mercount-1].lon = vPosition.Longitude;
            removeBtnPosArr[m_mercount-1].lat = vPosition.Latitude;
            removeBtnPosArr[m_mercount-1].alt = vPosition.Altitude;
        } else if(Module.XDGetMouseState() == 88){ // 면적
            var layerList = new Module.JSLayerList(true);
            var layer = layerList.nameAtLayer("MEASURE_POI");
            var vPosition = layer.keyAtObject("POI" + (m_argrcount-1)).getPosition();
            var removeInterface = document.createElement("button");
            var lon = vPosition.Longitude;
            var lat = vPosition.Latitude;
            var alt = vPosition.Altitude;
            var position = Module.getMap().MapToScreenPointEX(new Module.JSVector3D(lon, lat, alt));


            removeInterface.id = "removeBtn" + (m_argrcount-1);
            removeInterface.className = "anal-remove-btn";
            removeInterface.style.left = position.x + 119 - _minusW + "px";
            removeInterface.style.top = position.y + 12 - _minusH + "px";

            //document.getElementById("indoorMapArea").appendChild(removeInterface);

            // 지도상 좌표
            removeBtnPosArr[m_argrcount-1] = new Array();
            removeBtnPosArr[m_argrcount-1].lon = lon;
            removeBtnPosArr[m_argrcount-1].lat = lat;
            removeBtnPosArr[m_argrcount-1].alt = alt;
        }
    });
    //위치 정보 팝업
    canvas.onmousedown = function (e) {
        if($(".location").hasClass("active")){

            var startingPos = [e.pageX, e.pageY];

            // 화면좌표 변환
            var vPosition = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(e.x, e.y));

            var x = vPosition.Longitude;
            var y = vPosition.Latitude;
            var result = proj4("EPSG:4326", "EPSG:5179", [x,y]);
            var roadFlag = true;
            cmmUtil.reverseGeocoding(result[0], result[1]).done((location) => {

                let tag = ``;
                tag += '<a href="#" class="ol-popup-closer" id='+locaPopNum+' onclick="removePop(this.id)"></a>';
                tag += '<div class="popup-content"></div>';
                if (location["address"]) {
                    tag += `  <div>주소 : ${location["address"]}</div>`;
                }
                if (location["roadAddress"]) {
                    tag += `  <div>도로명주소 : ${location["roadAddress"]}<div>`;
                    roadFlag = false;
                }
                tag += `경위도 : ${x.toFixed(4)},${y.toFixed(4)}`;
                tag += `</div>`;

                locaPopCloser(vPosition, tag , locaPopNum , roadFlag);

                locaPopNum++;

                //$("#locaPop").remove();
                $(".location").removeClass('active');
                setMouseState(6);


            });
        }
        

        // 레이어 > 1인가구
        if(typeof(SINGPLE_PERSON_HOUSEHOLDS.polygonLayer) != "undefined"){
        	if(SINGPLE_PERSON_HOUSEHOLDS.polygonLayer.length > 0){        		
        		if(SINGPLE_PERSON_HOUSEHOLDS.polygonLayer[0].getVisible() == true){        	
        			var alt = Module.getViewCamera().getAltitude();
        			var mode;
        			
        			if(alt < 30000){
        				mode = true;
        			} else{
        				mode = false;
        			}
        			
        			if(SINGPLE_PERSON_HOUSEHOLDS.mode != mode){
        				SINGPLE_PERSON_HOUSEHOLDS.mode = mode;
        				
        				if(SINGPLE_PERSON_HOUSEHOLDS.chartLayer != null){
        					var arr = SINGPLE_PERSON_HOUSEHOLDS.chartLayer;
        					for(var i = 0; i < arr.length; i++){
        						arr[i].setVisible(mode);
        					}
        				}
        				
        			}
        		}
        	}
        }
        
        GLOBAL.mousePress = true;
        GLOBAL.MouseDownPointX = e.x;
        GLOBAL.MouseDownPointY = e.y;

        m_point = e;

    };

    canvas.onmouseup = function (e) {
        GLOBAL.mousePress = false;

        // 클릭한 지점의 경위도 좌표 반환
        if (GLOBAL.Map == null || GLOBAL.Layer == null) return;

        // 같은 위치가 아니라면 위치 선택(X), 이동(O)
        if( m_point.x != e.x || m_point.y != e.y ) return;

        var vPosition = GLOBAL.Map.ScreenToMapPointEX(new Module.JSVector2D(e.x - _minusW, e.y - _minusH));
        console.log(vPosition.Longitude + ", " + vPosition.Latitude + ", " + vPosition.Altitude);

        var layerList = new Module.JSLayerList(false);
        //등록버튼사라지면
        if($("#jomangRgstr").css("display") == "none"){
            registerJomangPoint(e);
        }

        // 통합행정정보 조회
        if($(".map-tool-list button[data-popup='top-popup01']").closest("li").hasClass("active")){
            var pnu = aj_getPnuByLonLat(vPosition.Longitude, vPosition.Latitude);

            if(pnu == null || pnu == "") {
                alert("조회된 결과가 없습니다.");
                return;
            }

            if(pnu != null ){
                var landRegister = getLandRegisterByPnu(pnu);

                // 통합행정정보 표출
                rightPopupOpen("landRegister", pnu);
            }

            if(landRegister.landRegister != null){

                // 지적 옆면 생성
                coordinates = OLOAD.setPosition(landRegister.landRegister.geometry, "MULTIPOLYGON", 0);
                createVerticalPlane(coordinates.coordinates);

                // 지적 바닥 생성
                OLOAD.loadCenterData(landRegister);

                var layerList = new Module.JSLayerList(true);
                var layer = layerList.nameAtLayer("Center_Polygon");

                layer.setSelectable(false);
            }
        }

        //분석->지형단면
        if($("#M_TPPH_SECT").length>0){
            // 마우스 입력 점 반환
            var map = Module.getMap();
            var inputPoints = map.getInputPoints();

            if (inputPoints.count() >= 2) {

                // 입력한 직선을 10m 간격으로 분절하는 좌표 리스트 반환
                var pathPoints = map.GetPathIntervalPositions(inputPoints, 10, false);

                // 각 좌표의 고도(단면) 반환
                var crossSections = getCrossSections(pathPoints);

                // 단면 경로 및 지점 출력
                displayCrossSectionsOnChart(crossSections);

                // 단면 라인 출력
                displaycrossSectionsOnMap(crossSections);

                // 마우스 입력 점 초기화
                map.clearInputPoint();
            }
        }
        //wms 클릭이벤트
        if($("#landBuilding").parents().hasClass("active") && mapType == "3D"){//지적/건물  active + wms 없을때
            $(".building-list").empty();
            var screenPosition = new Module.JSVector2D(e.x, e.y);

            // 화면->지도 좌표 변환
            var mapPosition = Module.getMap().ScreenToMapPointEX(screenPosition);

            var x = parseFloat(mapPosition.Longitude).toFixed(6);
            var y = parseFloat(mapPosition.Latitude).toFixed(6);

            // 변환할 좌표 객체
            var posX = parseFloat(x),
                posY = parseFloat(y),
                vPosition = new Module.JSVector2D(posX, posY);

            // 좌표변환 실행
            var vResult = Module.getProjection().convertProjection(13, vPosition, 15); //4326 -> 5174로 변환

            var xx = vResult.x;
            var yy = vResult.y;

            var xys = xx+"%20"+yy;
            var uurl = geo_url+'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=digitaltwin%3Alsmd_cont_ldreg_41830&srsname=EPSG:5174&maxFeatures=50&outputFormat=application%2Fjson&cql_filter=DWITHIN(geom,Point('+xys+'),0.0001,meters)';

            //console.log('uurl : ', uurl);

            $.ajax({
                url: uurl,
                type: "GET",
                dataType: "json",
                async: true,
                success: getResultWfsSuccess
            });

            function getResultWfsSuccess(data){
                if(GLOBAL.layerBox != null){
                    delWfSLayer(GLOBAL.layerBox)
                    GLOBAL.layerBox = null
                }

                var cadastList = data.features[0].properties;
                //console.log('3d cadastList : ', cadastList);
                var vResult2 = Module.getProjection().convertProjection(13, vPosition, 26); //4326 -> 5179로 변환

                var xObj = { '_5174': xx, '_5179': vResult2.x };
                var yObj = { '_5174': yy, '_5179': vResult2.y };

                cmmUtil.reverseGeocoding5174(xObj, yObj).done((result) => {
                    var addr = result.emdKorNm +" "+result.liKorNm;
                    var pnu = cadastList.pnu

                    cadastList.addr = addr;
                    cadastList.roadAddr = result.roadAddress;

                    var uurl= geo_url+'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=digitaltwin%3Alsmd_cont_ldreg_41830&srsname=EPSG:4326&maxFeatures=50&outputFormat=application%2Fjson&cql_filter=pnu='+pnu+''

                    $.get(uurl,function(data){
                        cmmUtil.createMultiPolygon(data.features[0])
                        GLOBAL.layerBox = "POLYGON_LAYER"
                    });

                    cilckCadastralMap(cadastList);

                    /*if (cadastList.bld_nm != null) {
                        cilckCadastralMap(cadastList)
                    } else {
                        cilckCadastralMap2(cadastList)
                    }*/
                });
            }
        }

        //지하시설단면도
        if($("button[name=M_UNDG_FCTY_SECT]").parent().hasClass("on") && Module.XDGetMouseState() == 21) {
            if(Module.getMap().getInputPoints().count() == 2) {

                Module.XDSetMouseState(6); // 마우스 지도 이동

                createLine(Module.getMap().getInputPoints().get(0), Module.getMap().getInputPoints().get(1)); // 라인 생성

                M_UNDG_FCTY_SECT.analysis(); // 차트 생성
            }
        }

        //3차원영상 업소정보 조회
        if (chk3D > 0) {
        	if($(".lnb-analysis li.on").length < 1){        		
        		var pnu = aj_getPnuByLonLat(vPosition.Longitude, vPosition.Latitude);
        		
        		// 업소정보 표출
        		rightPopupOpen("businessInfo", pnu);
        	}
        }
    };

    canvas.onmousemove = function(e) {
        if(GLOBAL.mousePress){
            // 측정 삭제 버튼
            if($(".anal-remove-btn").length > 0){
                moveViewInfo(e);
            }

            getCameraLocation();
        }
    };

    // 오브젝트 선택 이벤트
    canvas.addEventListener("Fire_EventSelectedObject", function(e) {
        if (e.layerName == "building_object") {
            var layerList = new Module.JSLayerList(false);
            var layer = layerList.nameAtLayer("building_object");
            var object = layer.keyAtObject(e.objKey);
            var pnu = aj_getPnuByLonLat(object.getPosition().Longitude, object.getPosition().Latitude);

            // 업소정보 표출
            rightPopupOpen("businessInfo", pnu);

        } else if (e.layerName == "tgd_scco_emd") {
            console.log("tgd_scco_emd")
        } else if (e.layerName == "POLYGON_LAYER" || e.layerName == "POI" || e.layerName == "MultiLineString"){//데이터내보내기 오브젝트 (wfs로 그린 3d object)

            GLOBAL.SelectObject = e.objKey
            // 업무 >> 사업공유관리
        } else if (e.layerName == "TBD_CNTRK_PLN_INFO") {		// 공사계획정보 상세
            //setHighlight(e);
            setPoiHighlight(e.layerName, e.objKey);
            aj_selectConstructionPlan(e.objKey);
        } else if (e.layerName == "TBD_CNTRK_PRRNG_INFO") {	// 공사예정정보 상세
            setPoiHighlight(e.layerName, e.objKey);
            aj_selectConstructionSchedule(e.objKey);
            /*var object = GLOBAL.Layer.keyAtObject(e.objKey);
            Module.getMap().setSelectObject(object);*/
        } else if (e.layerName == "TBD_CNTRK_PRRNG_INFO_INQUIRY") {	// 공사정보 조회 상세
            setPoiHighlight(e.layerName, e.objKey);
            aj_selectConstructionInquiry(e.objKey);
        } else if (e.layerName == "TGD_ELCTY_BSNS_PRMISN") {
            setHighlight(e);
            rightSubPopupOpen("selectRenewableEnergy", e.objKey, "right"); // 신재생에너지 상세조회
        } else if (e.layerName == "TGD_AGR_PUBLIC_TBWLL") {
            setHighlight(e);
            rightSubPopupOpen("selectUnderWaterAgri", e.objKey, "right"); // 농업용공공관정 상세조회
        } else if (e.layerName == "TGD_UGRWTR_DEVLOP") {
            setHighlight(e);
            rightSubPopupOpen("selectUnderWaterDevelop", e.objKey, "right"); // 지하수개발 상세조회
        } else if (e.layerName == "TGD_UGRWTR_UTLZTN_FCLTY") {
            setHighlight(e);
            rightSubPopupOpen("selectUnderWaterUseFacil", e.objKey, "right"); // 지하수이용시설 상세조회
        } else if(e.layerName == "YP_BSSH_INFO") {
            setHighlight(e);
            rightSubPopupOpen("selectInBusinessEstaInfo", e.objKey, "right"); // 관내업소정보조회 상세조회
        } else if (e.layerName == "TBD_FCLTY_RSRV_MANAGE") {
            setHighlight(e);
            var strArr = e.objKey.split('_');
            aj_selectFaciReseMng(strArr[0], strArr[1], parseFloat(strArr[2]), parseFloat(strArr[3])); // 시설예약관리 상세조회
        } else if (e.layerName == "Trfc_Poi") { // 교통시설
            setHighlight(e);
            var selectBoxTrfcVal = $("#selectBoxTrfc").val();
            rightSubPopupOpen(selectBoxTrfcVal, e.objKey)
        } else if (e.layerName == "SPORTS_POI") { // 체육시설
            setHighlight(e);
            selectSportsDetail(e.objKey);
        } else if (e.layerName == "WLRE_POI") { // 복지시설
            setHighlight(e);
            WLRE.selectWelfare(e.objKey);
        } else if (e.layerName == "SFFM_POI") { //업무>안전시설물관리>가로등
            //일부러 조건 걸어서 클릭시 예외처리 해줌.(삭제하면 안됨)
        } else {
            Module.getMap().clearSelectObj();
        }

        // POI 하이라이트 표시
        if (e.layerName.indexOf("layer_") >= 0) {
            var layerList = new Module.JSLayerList(true);
            var layer = layerList.nameAtLayer(e.layerName);

            for (var i = 0; i < layer.getObjectCount(); i++) {
                var point = layer.indexAtObject(i);

                if(point.getId() == e.objKey){
                    point.setHighlight(true);
                } else {
                    point.setHighlight(false);
                }
            }
        }
    });

    // 거리측정 이벤트 설정
    canvas.addEventListener("Fire_EventAddDistancePoint", function(e){

        if(GLOBAL.onEventAddDistancePoint != null) {
            GLOBAL.onEventAddDistancePoint(e);
        }
    });

    // 면적측정 이벤트 설정
    canvas.addEventListener("Fire_EventAddAreaPoint", function(e){
        if(GLOBAL.onEventAddAreaPoint != null) {
            GLOBAL.onEventAddAreaPoint(e);
        }
    });

    // 높이측정 이벤트 설정
    canvas.addEventListener("Fire_EventAddAltitudePoint", function(e){
        if(GLOBAL.onEventAddAltitudePoint != null) {
            GLOBAL.onEventAddAltitudePoint(e);
        }
    });
    canvas.addEventListener("Fire_EventAddCirclePoint", function(e){
        if(GLOBAL.onEventAddAltitudePoint != null) {
            GLOBAL.onEventAddAltitudePoint(e);
        }
    });
    // 나침반 방향 이벤트 설정
    canvas.addEventListener("Fire_EventRotateCompass", function(e){
        if(!app2D){
            $("span[name='compass']").css("transform", "rotate("+e.dCameraHeadAngle+"deg)");
        }
    });

    // 카메라 자동 이동 종료 알림 이벤트
    canvas.addEventListener("Fire_EventFinishAutoMove", function (e) {
    });



    // 고스트 심볼 생성
    canvas.addEventListener("Fire_GhostSymbolRegistComplete", function(e){
        if (e.strGhostSymbolKey == "VALV_PSZ") {  // 천연가스관로

            Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "VALV_PSZ.jpg");
            VALV_PSZ = e.strGhostSymbolKey;
            loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_GVAL_PSZ.geojson","UFL_GVAL_PSZ");

        } else if (e.strGhostSymbolKey == "WTL_MANH_PSZ") { // 상수관로

            Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "WTL_MANH_PSZ.png");
            WTL_MANH_PSZ = e.strGhostSymbolKey;
            loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/WTL_MANH_PSZ.geojson","WTL_MANH_PSZ");
            loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/WTL_VALV_PSZ.geojson","WTL_VALV_PSZ");

        } else if (e.strGhostSymbolKey == "SWL_MANH_PSZ") { // 하수관로

            Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "SWL_MANH_PSZ.png");
            SWL_MANH_PSZ = e.strGhostSymbolKey;
            loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/SWL_MANH_PSZ.geojson","SWL_MANH_PSZ");

        } else if (e.strGhostSymbolKey == "UFL_BMAN_PSZ") { // 전력지중관로

            Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "UFL_BMAN_PSZ.jpg");
            UFL_BMAN_PSZ = e.strGhostSymbolKey;
            loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_BMAN_PSZ.geojson","UFL_BMAN_PSZ");

        } else if (e.strGhostSymbolKey == "UFL_KMAN_PSZ") { // 통신관로

            Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "UFL_KMAN_PSZ.jpg");
            UFL_KMAN_PSZ = e.strGhostSymbolKey;
            loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_KMAN_PSZ.geojson","UFL_KMAN_PSZ");

        } else if (e.strGhostSymbolKey == "FAR_PMAN_LMZ") { // 농업용공공관정

            Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "FAR_PMAN_LMZ.png");
            FAR_PMAN_LMZ = e.strGhostSymbolKey;
            loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/FAR_PMAN_LMZ.geojson","FAR_PMAN_LMZ");
            var layerList = new Module.JSLayerList(true);
            var layerpoi = layerList.createLayer("FAR_PMAN_LMZ_poi", Module.ELT_3DPOINT);
            setTimeout(function(){
                layerpoi.setVisible(true);
            },100);

        } else if (e.strGhostSymbolKey == "GRW_DMAN_LMZ") { // 지하수개발

            Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "GRW_DMAN_LMZ.png");
            GRW_DMAN_LMZ = e.strGhostSymbolKey;
            loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/GRW_DMAN_LMZ.geojson","GRW_DMAN_LMZ");
            var layerList = new Module.JSLayerList(true);
            var layerpoi = layerList.createLayer("GRW_DMAN_LMZ_poi", Module.ELT_3DPOINT);
            setTimeout(function(){
                layerpoi.setVisible(true);
            },100);

        } else if (e.strGhostSymbolKey == "GRU_FMAN_LMZ") { // 지하수이용시설

            Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "GRU_FMAN_LMZ.png");
            GRU_FMAN_LMZ = e.strGhostSymbolKey;
            loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/GRU_FMAN_LMZ.geojson","GRU_FMAN_LMZ");
            var layerList = new Module.JSLayerList(true);
            var layerpoi = layerList.createLayer("GRU_FMAN_LMZ_poi", Module.ELT_3DPOINT);
            setTimeout(function(){
                layerpoi.setVisible(true);
            },100);

        }  else if (e.strGhostSymbolKey == "SL251") { // 가로등

            Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/lamp/3ds/", "SL251.JPG");
            SL251 = e.strGhostSymbolKey;
            setTimeout(function(){
                Module.XDEMapCreateLayer("SL251", serverUrl + "/siteData/yangpyeong/lamp/lampLayer", 0, true, false, true, 22, 0, 15);

                var layerList=new Module.JSLayerList(false);
                var layer = layerList.nameAtLayer("SL251");
                layer.setUserTileLoadCallback(function(_layerName, _tile, _data){
                    var data =  decodeURI(_data);
                    insertTileGhostSymbol(_tile, data,"SL251","#FFD950",true);
                })

                layer.setVisible(true);
            },100);

        }

        Module.XDRenderData();
    });

    // 마우스 휠 이벤트
    canvas.addEventListener("mousewheel", function(e){
        if(GLOBAL.mousePress){
            if($(".anal-remove-btn").length > 0){
                moveViewInfo(e);
            }
        }
    });

    // 키보드 이벤트 설정
    document.addEventListener('keyup', function(e){
    });

    document.addEventListener('keydown', function(e){
        getCameraLocation();
        getCameraDirect(e);

        var focusEle = document.activeElement;

        if(!focusEle.classList.contains('form-control')){
            GLOBAL.Control.setKeyControlEnable(true);
        } else{
            GLOBAL.Control.setKeyControlEnable(false);
        }
    });
}

function setHighlight(e){
    Module.getMap().clearSelectObj();
    Module.XDRenderData();
    var layerList = new Module.JSLayerList(true);
    var layer = layerList.nameAtLayer(e.layerName);

    //layer.setSelectable(false);

    for(var i = 0; i < layer.getObjectCount(); i++) {
        var point = layer.indexAtObject(i);

        if(point.getId() == e.objKey){
            point.setHighlight(true);
        } else {
            point.setHighlight(false);
        }
    }
}

function setPoiHighlight(layerId, poiKey){
    Module.getMap().clearSelectObj();
    Module.XDRenderData();

    var layerList = new Module.JSLayerList(true);
    var layer = layerList.nameAtLayer(layerId);

    //layer.setSelectable(false);

    for(var i = 0; i < layer.getObjectCount(); i++) {
        var point = layer.indexAtObject(i);

        if(point.getId() == poiKey){
            point.setHighlight(true);
            setCameraMoveLonLat_3D(point.getPosition().Longitude, point.getPosition().Latitude);
        } else {
            point.setHighlight(false);
        }
    }
}

/**************************************************** 거리재기, 면적재기 등 마우스 상태 변경 ***************************************************************/
function setMouseState(_option) {
    /**
     * 0 : 지도 선택불가(펜)
     * 1 : 지도 선택
     * 6 : 지도 및 객체 선택(이동가능)
     * 16 : 지도 및 객체 선택(이동불가)
     * 23 : 원 그리기
     * 86 : 높이 측정
     * 87 : 거리 측정
     * 88 : 면적 측정
     * 89 : 반경 측정
     */

    //분석 초기화
    clearAnalysis();

    // 거리 측정
    if(_option == 87) {
        Module.getOption().SetDistanceMeasureLineDepthBuffer(false);
        GLOBAL.circleLayer.removeAll();
        // 면적 측정
    } else if(_option == 88) {
        Module.getOption().SetAreaMeasurePolygonDepthBuffer(false);
        GLOBAL.circleLayer.removeAll();

        // 고도 측정
    } else if(_option == Module.MML_ANALYS_ALTITUDE) {
        GLOBAL.onEventAddAltitudePoint = function(e) {
            // 오브젝트 높이가 측정되었을 경우 함께 출력
            createPOI("alt", new Module.JSVector3D(e.dLon, e.dLat, e.dAlt),
                "rgba(10, 10, 0, 0.5)",
                e.dGroundAltitude, e.dObjectAltitude );
        };
    } else if(_option == Module.MML_MOVE_GRAB) {
        Module.getMap().clearInputPoint();

        if(GLOBAL.TransparencyVertexList != null){
            return;
        }
    } else if(_option == Module.MML_SELECT_POINT) {
        Module.XDSetMouseState(Module.MML_SELECT_POINT);

    }

    Module.XDSetMouseState(_option);	// 마우스 모드 설정


}
//3D 위치 표시 팝업
function locaPopCloser(vPosition, tag ,locaPopNum , roadFlag){

    var layerList = new Module.JSLayerList(true);
    let layer = layerList.createLayer("HTML_OBJEC_LAYER", Module.ELT_POLYHEDRON);//일반
    layer.setMaxDistance(GLOBAL.MaxDistance);

    let lon = vPosition.Longitude;
    let lat = vPosition.Latitude;
    let alt = vPosition.Altitude;

    let element = document.createElement('div');
    let param = {
        position : new Module.JSVector3D(lon,lat,alt), // 마우스 포인터위로 팝업 위치 조절
        container: "container",
        canvas: Module.canvas,	// 화면 사이즈 설정을 위한 canvas 설정
        element: element,	// 엔진 오브젝트와 연동할 HTML Element
        verticalAlign: "bottom",	// 수직 정렬 (top, middle, bottom, px 지원 )	|| 태그 미 설정 시 [Default top]
        horizontalAlign: "center",	// 수평 정렬 (left, center, right, px 지원 )	|| 태그 미 설정 시 [Default left]
    };
    let object = Module.createHTMLObject("location_pop"+locaPopNum);
    let complet = object.createbyJson(param);
    let x = vPosition.Longitude;
    let y = vPosition.Latitude;

    if (complet.result == 1) {
        layer.addObject(object, 0);
        // element 태그에 해당되는 HTML Element에 UI Element 추가
        element.classList.add('ol-popup3d');
        element.setHTML(tag);
    }
    if(roadFlag) {
        $("#location_pop"+locaPopNum).css('height', 70);
    }else{
        $("#location_pop"+locaPopNum).css('height', 90);
    }
    $("#location_pop"+locaPopNum).append(tag);
}
//팝업 개별 삭제
function removePop(id){
    $("#location_pop"+id).remove();
}
//팝업창 전체삭제(초기화)
function removeAllPop(){
    $('.ol-popup3d').remove();
    locaPopNum = 0;
}
