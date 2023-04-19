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
	
	var codeData = [
        { code: "SA118", codeNm: "급수탑" },
        { code: "SA119", codeNm: "소화전" },
      ];
	
	setCmmCodeDataArray("SA-001", codeData);	//지형지물부호	SA-001 임의로 만든
																		
	setCmmCodeDataArray("YPE001");				//읍면동 코드
	setCmmCodeDataArray("MNG-001");				//관리기관	
	
	//상수도 - 소방시설
	setCmmCodeDataArray("OGC-048");				//소화전 형식
	
	//하수도 - 하수연결관
	setCmmCodeDataArray("OGC-017");				//하수관용도
	setCmmCodeDataArray("OGC-003");				//관재질
	setCmmCodeDataArray("OGC-001");				//시설물형태
	
	

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
				console.log("이미 있는 코드 입니다.");
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
				console.log("이미 있는 코드 입니다.");
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
			
			geomCoord	= detailData.geomObj.coordinates[0] + " " + detailData.geomObj.coordinates[1];
	    	returnGeomVal = geomType+"("+ geomCoord +")";
			
		}else if(type == 'multilinestring'){
			//console.log(detailData.geomObj.coordinates);
			
			var c = detailData.geomObj.coordinates;
			
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
		}else if(type == 'multipolygon'){
			//console.log(detailData.geomObj.coordinates);
			alert("multipolygon 작업중");
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
				toastr.error("지도 객체 클릭 작업중", "상수도시설 - 유량계");
			}else if(featureType == "swl_conn_ls"){					//하수도시설 - 하수연결관 
				selectSwlConnLs(id);
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
