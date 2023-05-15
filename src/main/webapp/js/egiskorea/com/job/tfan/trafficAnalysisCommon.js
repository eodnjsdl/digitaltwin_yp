/**
 * - 교통분석 / 교통분석
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	
	trficAnalsCodeArrayInit();
});

//전역 변수
var TRFICANALS={
	CODEARRAY :	[],				//code 데이블 정리
	Ax5UiGrid :	null,			//Ax5UiGrid 변수
	spaceSearchOption:{},		//공간검색 조건 옵션 변수
	Ax5UiGridAll : null			//엑셀 다운로드에  사용
}

//functions

//코드 세팅 : gird 데이터 code 변환 위해
function trficAnalsCodeArrayInit(){
																		
	setTrficAnalsCmmCodeDataArray("YPE001");				//읍면동 코드

}

///////////////////////////
//공통 코드

//공통 코드 조회 및 selectbox tag 처리
//codeId 		: 조회할 코드 id 
//selectBoxTag 	: select box 에 option 값 세팅, 없으면 해당 코드의 데이터 json 형태로 리턴
//selectedValue	: 해당 값이 선택되게 처리
function getTrficAnalsCmmCodeData(codeId, selectBoxTag, selectedValue) {	
	//console.log("getTrficAnalsCmmCodeData(codeId, selectTag)");
	
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
function setTrficAnalsCmmCodeDataArray(codeId, targetList){
	//console.log("setTrficAnalsCmmCodeDataArray()");
	
	//기존 에 있는지 확인
	if(TRFICANALS.CODEARRAY.length > 0){
		for(var i=0; i<TRFICANALS.CODEARRAY.length; i++){
			if(TRFICANALS.CODEARRAY[i].codeId == codeId){
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
    	 TRFICANALS.CODEARRAY.push(listCodeData);
    	 
    	 return;
	}
	
	//코드 조회해서 테이블 등록 
	$.get("/com/cmm/selectCmmCodeDetail.do", { codeId: codeId })
    .done((response) => {
    	
    	//getCmmCodeData() 함수와 연동해서 사용시 동일 코드 일 때 중복 저장 되는 것 처리 : 둘다 비동기 방식으로 처리 하기 때문
    	for(var i=0; i<TRFICANALS.CODEARRAY.length; i++){
			if(TRFICANALS.CODEARRAY[i].codeId == codeId){
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
    	TRFICANALS.CODEARRAY.push(codeData);
    		
    })
    .fail(() => {
        alert(`코드 정보를 가져오는데 실패했습니다.`);
    });
	
}

//코드 배열 에서 해당 코드 값 조회
function getTrficAnalsCmmCodeDataArray(codeId, code){
	//console.log("getCmmCodeDataArray()");
	//console.log(TRFICANALS.CODEARRAY);
	
	var codeArray = TRFICANALS.CODEARRAY;
	
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
function getTrficAnalsAddressForPoint(geomText, tag){
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
function getTrficAnalsGeomDataForGridId(id){
	//console.log("getTrficAnalsGeomDataForGridId");
	//console.log(id);

	//grid 에서 데이터 조회
	var detailData = getTrficAnalsGridDetailData(id);
	
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


//현재 목록 화면의 grid 상세 정보 조회
function getTrficAnalsGridDetailData(id){
	//console.log("getGridDetailData(id)");
	
	var detailData = null;
	if(TRFICANALS.Ax5UiGrid){
		var list =  TRFICANALS.Ax5UiGrid.list;
		
		for(var i=0; i<list.length; i++){
			if(list[i].id == id){
				detailData = list[i];
				break;
			}
		}
		
		return detailData;
	}else{
		alert("현재 grid 목록이 없습니다.");
	}
}

/////////////////////////
//지도 아이콘(객체) 클릭시 이벤트
function onTrficAnalsSelectEventListener(e){
	//console.log("onTrficAnalsSelectEventListener(e)");
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
			
			if(featureType == "tgd_bus_sttn_info"){						//교통분석 - 버스노선정보
				selectTgdBusSttnInfo(id);
			}else{
				alert("지도 객체 선택 오류");
				return false;
			}
		}
	}
}

//////////////////////


//모드 변환시 등록 버튼 처리
function arrangeTrficAnalsAddBtnMode() {
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