/**
 * - 업무 / 시설관리 / 상수도 시설
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("facilityWaterSupply.js");
	//console.log("상수도시설");
	
	codeArrayInit();
});

//전역 변수
var FACILITY={
	CODEARRAY :[],		//code 데이블 정리
	Ax5UiGrid :null	
}

//functions

//코드 세팅 : gird 데이터 code 변환 위해
function codeArrayInit(){
	//console.log("codeArrayInit()");
	
	var codeData = [
		{ code: "SA117", codeNm: "유량계" },
        { code: "SA118", codeNm: "급수탑" },
        { code: "SA119", codeNm: "소화전" },
      ];
	
	setCmmCodeDataArray("SA-001", codeData);	//지형지물부호	SA-001 임의로 만든
	setCmmCodeDataArray("YPE001");				//읍면동 코드
	setCmmCodeDataArray("MNG-001");				//관리기관	
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
	setCmmCodeDataArray("OGC-041");				//수압계형식
	
	//배수지
	setCmmCodeDataArray("OGC-001");				//관리방법
	setCmmCodeDataArray("OGC-134");				//배수지제어방법

	setCmmCodeDataArray("FCLTCD");				// 복지시설 구분

}


//상수도시설 분기
function getWaterSupplyFacility(name){
	//console.log("getWaterSupplyFacility(name)");
		
	if(name){
		if(name == "wtlFirePs"){			//소방시설
			selectWtlFirePsListView();
		}else if(name == "wtlPipeLm"){		//상수관로
			selectWtlPipeLmListView();
		}else if(name == "wtlFlowPs"){		//유량계
			selectWtlFlowPsListView();
		}else if(name == "wtlManhPs"){		//상수맨홀
			selectWtlManhPsListView();
		}else if(name == "wtlPipePs"){		//상수관로심도
			toastr.error("작업중", "상수관로심도");
			return;
		}else if(name == "wtlPrgaPs"){		//수압계
			selectWtlPrgaPsListView();
		}else if(name == "wtlServPs"){		//배수지
			selectWtlServPsListView();
		}else if(name == "wtlSplyLs"){		//급수관로
			toastr.error("작업중", "급수관로");
			return;
		}else if(name == "wtlValvPs"){		//변류시설
			toastr.error("작업중", "변류시설");
			return;
		}else{
			alert("잘못된 호출")
			return;
		}
		
	}
}

//////////////////
//목록 화면 조회

//소방시설 목록 화면 조회
function selectWtlFirePsListView(){
	//console.log("selectWtlFirePsListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/wsfc/selectWtlFirePsListView.do", function () {
        //toastr.success("/job/fcmr/wsfc/selectWtlFirePsListView.do", "페이지🙂호🙂출🙂");
    	wtlFirePsListProcess();
		ui.loadingBar("hide");
    });
}

//유량계 목록 화면 조회
function selectWtlFlowPsListView(){
	//console.log("selectWtlFlowPsListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/wsfc/selectWtlFlowPsListView.do", function () {
        //toastr.success("/job/fcmr/wsfc/selectWtlFlowPsListView.do", "페이지🙂호🙂출🙂");
    	wtlFlowPsListProcess();
		ui.loadingBar("hide");
    });
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
      alert(`코드 정보를 가져오는데 실패했습니다.`);
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
		
		geom = geom.replace("Point", "");
		geom = geom.replace("(", "");
		geom = geom.replace(")", "");
		
		geomArray = geom.split(" ");
		
		reverseGeocoding( 
			parseFloat(geomArray[0]),
			parseFloat(geomArray[1]) 
		).done((result) => {
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

//girdRowId 를 통해 geom 데이터 조회
function getGeomDataForGridId(id){
	//console.log("getGeomDataForGridRowId");
	//console.log(gridRowId);

	//grid 에서 데이터 조회
	var detailData = getGridDetailData(id);
	
	//조회된 데이터에서 geom 데이터 추출
	var returnGeomVal = "";
	if(detailData){
		//console.log(detailData);
		
		var geomType 	= detailData.geomObj.type;
    	var geomCoord	= detailData.geomObj.coordinates[0] + " " + detailData.geomObj.coordinates[1];
    	
    	returnGeomVal = geomType+"("+ geomCoord +")";
	}
	
	return returnGeomVal;
}


//현재 목록 화면의 gird 상세 정보 조회
function getGridDetailData(id){
	//console.log("getGridDetailData(id)");
	
	var  detailData = null;
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