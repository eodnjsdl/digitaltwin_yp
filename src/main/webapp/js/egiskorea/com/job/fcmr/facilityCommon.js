/**
 * - 업무 / 시설관리
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("facilityCommon.js");
	//console.log("시설 공통");
	
	codeArrayInit();
});

//전역 변수
var FACILITY={
	CODEARRAY :	[],				//code 데이블 정리
	Ax5UiGrid :	null,			//Ax5UiGrid 변수
	spaceSearchOption:{},		//공간검색 조건 옵션 변수
	Ax5UiGridAll : null			//엑셀 다운로드에  사용
}

//functions

//코드 세팅 : gird 데이터 code 변환 위해
function codeArrayInit(){
	//console.log("codeArrayInit()");
	
	/*var codeData = [
		{ code: "SA100", codeNm: "상수맨홀" },
		{ code: "SA114", codeNm: "배수지" },
		{ code: "SA117", codeNm: "유량계" },
        { code: "SA118", codeNm: "급수탑" },
        { code: "SA119", codeNm: "소화전" },
        { code: "SB003", codeNm: "하수연결관" },
        { code: "SA121", codeNm: "수압계" },
        { code: "SA200", codeNm: "상수제수변" },
        { code: "SA201", codeNm: "상수역지변" },
        { code: "SA202", codeNm: "상수이토변" },
        { code: "SA203", codeNm: "상수배기변" },
        { code: "SA204", codeNm: "상수감압변" },
        { code: "SA205", codeNm: "상수안전변" },
        { code: "SA991", codeNm: "신축관실" },
        { code: "SB410", codeNm: "환기구" },
	];*/

	
	//setCmmCodeDataArray("SA-001", codeData);	//지형지물부호	SA-001 임의로 만든	-> 아래 code로 대체
	setCmmCodeDataArray("FTR-001");				//지형지물부호  
																		
	setCmmCodeDataArray("YPE001");				//읍면동 코드
	setCmmCodeDataArray("MNG-001");				//관리기관	
	
	//상수도 - 소방시설
	setCmmCodeDataArray("OGC-048");				//소화전 형식
	
	//상수관로 코드
	setCmmCodeDataArray("OGC-004");				//관용도
	setCmmCodeDataArray("OGC-003");				//관재질
	setCmmCodeDataArray("OGC-005");				//접합종류
	
	//유량계 코드
	setCmmCodeDataArray("OGC-141");				//유량계 종류
	setCmmCodeDataArray("OGC-041");				//유량계 형식
	
	//상수맨홀 코드
	setCmmCodeDataArray("OGC-002");				//맨홀종류
	setCmmCodeDataArray("OGC-006");				//맨홀형태
	
	//수압계
	setCmmCodeDataArray("OGC-137");				//수압계종류
	//setCmmCodeDataArray("OGC-041");			//수압계형식
	
	//배수지
	setCmmCodeDataArray("OGC-001");				//관리방법
	setCmmCodeDataArray("OGC-134");				//배수지제어방법

	//변류시설
	setCmmCodeDataArray("OGC-031");				//변류형식
	setCmmCodeDataArray("OGC-007");				//제수변회전방향
	setCmmCodeDataArray("OGC-008");				//제수변구동방법
	//setCmmCodeDataArray("OGC-001");			//시설물형태
	setCmmCodeDataArray("OGC-010");				//이상상태
	setCmmCodeDataArray("OGC-011");				//개폐여부
	
	//하수도 - 하수연결관
	setCmmCodeDataArray("OGC-017");				//하수관용도
	
	// 하수도 - 하수처리장
	setCmmCodeDataArray("OGC-023");				// 개통상태
	setCmmCodeDataArray("OGC-056");				// 하수처리방식
	
	// 하수도 - 하수맨홀
	setCmmCodeDataArray("OGC-013");				// 하수맨홀용도
	//setCmmCodeDataArray("OGC-001");			// 시설물형태
	//setCmmCodeDataArray("OGC-002");			// 맨홀종류
	setCmmCodeDataArray("OGC-014");				// 뚜껑재질
	setCmmCodeDataArray("OGC-015");				// 인버트유무
	setCmmCodeDataArray("OGC-016");				// 사다리설치유무
	//setCmmCodeDataArray("OGC-010");			// 이상상태
	
	// 하수도 - 하수관거
	//setCmmCodeDataArray("OGC-017");			// 하수관용도
	//setCmmCodeDataArray("OGC-003");			// 관재질
	setCmmCodeDataArray("OGC-018");				// 규모
	//setCmmCodeDataArray("OGC-001");			// 시설물형태
	//setCmmCodeDataArray("FTR-001");			// 시점맨홀지형지물부호
	//setCmmCodeDataArray("FTR-001");			// 종점맨홀지형지물부호

	// 하수도 - 하수펌프장
	//setCmmCodeDataArray("OGC-023");			// 개통상태
	setCmmCodeDataArray("OGC-055");				// 펌프장용도
	
	// 하수도 - 측구
	setCmmCodeDataArray("OGC-054");				// 촉구구분
	//setCmmCodeDataArray("OGC-003");			// 관재질
	
	// 하수도 - 토구
	setCmmCodeDataArray("OGC-145");				// 토구용도
	
	// 하수도 - 물받이
	setCmmCodeDataArray("OGC-043");				// 물받이용도
	//setCmmCodeDataArray("OGC-001");			// 시설물형태
	setCmmCodeDataArray("OGC-133");				// 물받이뚜껑형태
	setCmmCodeDataArray("OGC-044");				// 관재질
	
	// 하수도 - 환기구
	//setCmmCodeDataArray("OGC-003");			// 관재질
	setCmmCodeDataArray("OGC-012");				// 흡출기형식
	setCmmCodeDataArray("OGC-172");				// 흡출기재질
	
	// 복지시설 - 시설구분
	setCmmCodeDataArray("FCLTCD");				// 시설구분

}

///////////////////////////
//공통 코드

//공통 코드 조회 및 selectbox tag 처리
//codeId 		: 조회할 코드 id 
//selectBoxTag 	: select box 에 option 값 세팅, 없으면 해당 코드의 데이터 json 형태로 리턴
//selectedValue	: 해당 값이 선택되게 처리
function getCmmCodeData(codeId, selectBoxTag, selectedValue) {	
	//console.log("getCmmCodeData(codeId, selectTag)");
	
	//ajax - 전달받은 주소로 GET 방식의 HTTP 요청을 전송함
	$.get("/com/cmm/selectCmmCodeDetail.do", { codeId: codeId })
    .done((response) => {
    	
    	const list = JSON.parse(response)["list"];
    	
    	//setCmmCodeDataArray(codeId, list);		//전역 코드 배열 처리
    	
    	if(selectBoxTag){
    		
    		//select box 처리
    		const data = list.map((item) => {
    		  
    			if(item.code == selectedValue){
    				return `<option value="${item.code}" selected="selected">${item.codeNm}</option>`;
    			}else{
    				return `<option value="${item.code}">${item.codeNm}</option>`; 
    			}
    		});
    	 
    		$(selectBoxTag).append(data);
    	  
    	}else{
    		return list;
    	}
     
    })
    .fail(() => {
    	//alert(`코드 정보를 가져오는데 실패했습니다.`);
    	console.log(`코드 정보를 가져오는데 실패했습니다.`);
    });
	
}

//시설 code 테이블 배열에 저장
function setCmmCodeDataArray(codeId, targetList){
	//console.log("setCmmCodeDataArray()");
	
	//기존 에 있는지 확인
	if(FACILITY.CODEARRAY.length > 0){
		for(var i=0; i<FACILITY.CODEARRAY.length; i++){
			if(FACILITY.CODEARRAY[i].codeId == codeId){
				console.log("이미 있는 코드 입니다.("+codeId+")");
				return;
			}
		}
	}
		
	//목록 있을시 에는 배열에 코드 저장
	if(targetList && targetList.length>0 ){
		 const listCodes = targetList.map((code) => {
    		 return {
    			 value	: code["code"],
    			 text 	: code["codeNm"]
    		 };
         });
    	 var listCodeData = {codeId : codeId , value: listCodes};
    	 FACILITY.CODEARRAY.push(listCodeData);
    	 
    	 return;
	}
	
	//코드 조회해서 테이블 등록 
	$.get("/com/cmm/selectCmmCodeDetail.do", { codeId: codeId })
    .done((response) => {
    	
    	//getCmmCodeData() 함수와 연동해서 사용시 동일 코드 일 때 중복 저장 되는 것 처리 : 둘다 비동기 방식으로 처리 하기 때문
    	for(var i=0; i<FACILITY.CODEARRAY.length; i++){
			if(FACILITY.CODEARRAY[i].codeId == codeId){
				console.log("이미 있는 코드 입니다.("+codeId+")");
				return;
			}
		}
    	
    	const list = JSON.parse(response)["list"];
    	const codes = list.map((code) => {
    		 return {
    			 value	: code["code"],
    			 text 	: code["codeNm"]
    		 };
        });
    	var codeData = {codeId : codeId , value: codes};
    	FACILITY.CODEARRAY.push(codeData);
    		
    })
    .fail(() => {
        alert(`코드 정보를 가져오는데 실패했습니다.`);
    });
	
}

//코드 배열 에서 해당 코드 값 조회
function getCmmCodeDataArray(codeId, code){
	//console.log("getCmmCodeDataArray()");
	//console.log(FACILITY.CODEARRAY);
	
	var codeArray = FACILITY.CODEARRAY;
	
	if(codeArray && codeArray.length>0){
		var returnValue = "";
		
		outerLoop : for(var i=0; i<codeArray.length; i++){
			if(codeArray[i].codeId == codeId){
				var codeData = codeArray[i].value;
				for (var key in codeData ) {
					if(codeData[key].value == code){
						returnValue = codeData[key].text;
						break outerLoop;
					}
				}
			}
		}
		
		return returnValue;
		
	}else{
		console.log("code 오류");
	}
	
}

/////////////////////
//공간정보


//좌표로 주소 조회(reverseGeocoding)
function getAddressForPoint(geomText, tag){
	//console.log("getAddressForPoint()");
	//console.log(geomText);
	//console.log(tag);
	
	if(geomText){
		
		var geom = geomText;
		
		const formatWKT = new ol.format.WKT();
		let geometry = formatWKT.readGeometry(geom);
		
		let coordinate = null;
		//console.log(geometry);
		
        if (geometry instanceof ol.geom.Point) {
            coordinate = geometry.getCoordinates();
        } else if (geometry instanceof ol.geom.MultiPoint) {
            coordinate = geometry.getPoint(0).getCoordinates();
        } else if (geometry instanceof ol.geom.LineString) {
            coordinate = geometry.getCoordinateAt(0.5);
        } else if (geometry instanceof ol.geom.MultiLineString) {
            coordinate = geometry.getLineString(0).getCoordinateAt(0.5);
        } else if (geometry instanceof ol.geom.Polygon) {
            coordinate = ol.extent.getCenter(geometry.getExtent());
        } else if (geometry instanceof ol.geom.MultiPolygon) {
            coordinate = ol.extent.getCenter(geometry.getPolygon(0).getExtent());
        } else {
            console.log(`정의되지 않은 공간 타입입니다.`);
        }
        
        //주소 변환 점 좌표 3d 일때  좌표계 5179 로 변경
        if(dtmap.mod){
         	if(dtmap.mod == "2D"){
     							
     		}else if(dtmap.mod == "3D"){
     			const x = coordinate[0];
                const y = coordinate[1];
                const point = new ol.geom.Point([x, y]);
                const wkt = formatWKT.writeGeometry(
                    point.transform("EPSG:4326", "EPSG:5179")
                );
                 
                //console.log(wkt);
                let transGeometry = formatWKT.readGeometry(wkt);
                coordinate = transGeometry.getCoordinates();
     			//console.log(coordinate);
     		}else{
     			console.log("2d/3d 모드 오류");
     		}
        }
        
        reverseGeocoding(coordinate[0], coordinate[1]).done((result) => {
			 //console.log(result);
	         if (result["address"]) {
	             address = result["address"];
	         } else {
	             address = "";
	         }
	         
	         $(tag).val(address);
	     });
		
	}else{
		alert("geom 값 오류");
	}
	
}

//gird Id 를 통해 geom 데이터 조회
function getGeomDataForGridId(id){
	//console.log("getGeomDataForGridId");
	//console.log(id);

	//grid 에서 데이터 조회
	var detailData = getGridDetailData(id);
	
	//조회된 데이터에서 geom 데이터 추출
	var returnGeomVal = "";
	if(detailData){
		//console.log(detailData);
		var geomType 	= detailData.geomObj.type;
		
		var geomCoord	= "";
		
		var type = geomType.toLowerCase();
		if(type == 'point'){
			//console.log(detailData.geomObj.coordinates);
			
			//geomCoord	= detailData.geomObj.coordinates[0] + " " + detailData.geomObj.coordinates[1];
	    	//returnGeomVal = geomType+"("+ geomCoord +")";
			//console.log("1>>>"+returnGeomVal);
			/////////////
			var geom = detailData.geomObj.coordinates;
		    
		    var pointGeom = new ol.geom.Point([ geom[0], geom[1] ]);
		  
		    const format = new ol.format.WKT();
		    let pointWKT = format.writeGeometry(pointGeom);
		    //console.log("pointWKT>>>"+pointWKT);
		    returnGeomVal = pointWKT;
			
		}else if(type == 'multilinestring'){
			//console.log(detailData.geomObj.coordinates);
			
			/*var c = detailData.geomObj.coordinates;
			
			var t = ""
			for(var i=0; i<c.length; i++){
				for(var j=0; j<c[i].length;  j++){
					
					t += c[i][j][0] + " " + c[i][j][1];
					//console.log(c[i].length);
					if(j < (c[i].length-1) ){
						t+= ",";
					}
					
				}
			}
			
			//console.log(t);
			geomCoord	= t;
	    	
	    	returnGeomVal = geomType+"(("+ geomCoord +"))";
			
	    	console.log("1>>>"+returnGeomVal);*/
			////////////////
	    	
	    	var geom = detailData.geomObj.coordinates;
		    
		    var multilineStringGeom = new ol.geom.MultiLineString([ geom[0] ]);
		  
		    const format = new ol.format.WKT();
		    let multilineStringWKT = format.writeGeometry(multilineStringGeom);
		    //console.log("multilineStringWKT>>>"+multilineStringWKT);
		    returnGeomVal = multilineStringWKT;
			
			
		}else if(type == 'multipolygon'){
			//console.log(detailData.geomObj.coordinates);
			
			var geom = detailData.geomObj.coordinates[0];
		    
		    var multipolygonGeom = new ol.geom.MultiPolygon([geom]);
		  
		    const format = new ol.format.WKT();
		    let multipolygonWKT = format.writeGeometry(multipolygonGeom);
			//console.log(multipolygonWKT)
			returnGeomVal = multipolygonWKT;
			
		}
		
	}
	
	return returnGeomVal;
}


//현재 목록 화면의 gird 상세 정보 조회
function getGridDetailData(id){
	//console.log("getGridDetailData(id)");
	
	var detailData = null;
	if(FACILITY.Ax5UiGrid){
		var list =  FACILITY.Ax5UiGrid.list;
		
		for(var i=0; i<list.length; i++){
			if(list[i].id == id){
				detailData = list[i];
				break;
			}
		}
		
		return detailData;
	}else{
		alert("현재 gird 목록이 없습니다.");
	}
}

/////////////////////////
//지도 아이콘(객체) 클릭시 이벤트
function onFacilitySelectEventListener(e){
	//console.log("onFacilitySelectEventListener(e)");
	//console.log(e);
	if(e){
		
		//[참고 자료]
		//2D 이벤트 데이터
	    // {
	    //     id : 'wtl_fire_ps.8',        // 피쳐 아이디
	    //     feature : ol.Feature,        // ol Feature 객체
	    //     geometry : ol.geom.Geometry, //ol geometry 객체
	    //     property : {}                // 속성정보
	    // }
	    //3D 이벤트 데이터
	    // {
	    //     id : 'wtl_fire_ps.8',        // 피쳐 아이디
	    //     object : JSObejct3D,         // JSObejct3D 객체
	    //     property : {}                // 속성정보
	    // }
		//2d/3d 같이 사용 id 값만 
		var id = e.id; //피쳐 아이디
		
		if(id){
			var idArray = id.split(".");
			//console.log(idArray);
			const featureType	= idArray[0];
			
			if(featureType == "wtl_fire_ps"){						//상수도시설 - 소방시설
				selectWtlFirePs(id);
			}else if(featureType == "wtl_pipe_lm"){					//상수도시설 - 상수관로
				toastr.error("지도 객체 클릭 작업중", "상수도시설 - 상수관로");
			}else if(featureType == "wtl_flow_ps"){					//상수도시설 - 유량계
				selectWtlFlowPs(id);
			}else if(featureType == "wtl_manh_ps"){					//상수도시설 - 상수맨홀
				selectWtlManhPs(id);
			}else if(featureType == "wtl_prga_ps"){					//상수도시설 - 수압계
				selectWtlPrgaPs(id);
			}else if(featureType == "wtl_serv_ps"){					//상수도시설 - 배수지
				selectWtlServPs(id);
			}else if(featureType == "wtl_valv_ps"){					//상수도시설 - 변류시설
				selectWtlValvPs(id);
			}else if(featureType == "swl_conn_ls"){					//하수도시설 - 하수연결관 
				selectSwlConnLs(id);
			}else if(featureType == "swl_dept_ps"){					// 하수도시설 - 하수관거심도
				selectSwlDeptPs(id);
			}else if(featureType == "swl_dran_ps"){					// 하수도시설 - 하수처리장
				selectSwlDranPs(id);
			}else if(featureType == "swl_manh_ps"){					// 하수도시설 - 하수맨홀
				selectSwlManhPs(id);
			}else if(featureType == "swl_pipe_as"){					//하수도시설 - 면형하수관거 
				selectSwlPipeAs(id);
			}else if(featureType == "swl_pipe_lm"){					// 하수도시설 - 하수관거 
				selectSwlPipeLm(id);
			}else if(featureType == "swl_pump_ps"){					// 하수도시설 - 하수펌프장 
				selectSwlPumpPs(id);
			}else if(featureType == "swl_side_ls"){					// 하수도시설 - 측구 
				selectSwlSideLs(id);
			}else if(featureType == "swl_spew_ps"){					// 하수도시설 - 토구 
				selectSwlSpewPs(id);
			}else if(featureType == "swl_spot_ps"){					// 하수도시설 - 물받이 
				selectSwlSpotPs(id);
			}else if(featureType == "swl_vent_ps"){					// 하수도시설 - 환기구 
				selectSwlVentPs(id);
			}else if(featureType == "tgd_phstrn_fclty"){			// 체육시설
				selectPhyEduFaciDetail(id);
			}else if(featureType == "tgd_sclwlfr_fclty_status"){	// 복지시설
				selectWelFareFaciDetail(id);
			}else{
				alert("지도 객체 선택 오류");
				return false;
			}
		}
	}
}

//////////////////////


//모드 변환시 등록 버튼 처리
function arrangeAddBtnMode() {
	//console.log("arrangeAddBtnMode()");
	
	if(dtmap.mod){
		if(dtmap.mod == "2D"){
			if($(".data-area .bbs-top .btn_add").css("display") == 'none'){
				$(".data-area .bbs-top .btn_add").show();
			}				
		}else if(dtmap.mod == "3D"){
			if($(".data-area .bbs-top .btn_add").css("display") != 'none'){
			   $(".data-area .bbs-top .btn_add").hide();
			}
		}else{
			console.log("2d/3d 모드 오류");
		}
	}else{
		console.log("2d/3d 모드 오류");
	}
	
}

