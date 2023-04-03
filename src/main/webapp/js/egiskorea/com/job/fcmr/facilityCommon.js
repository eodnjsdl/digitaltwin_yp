/**
 * - 업무 / 시설관리 
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("facilityCommon.js");
	console.log("시설관리 공통");
});


//전역변수
var baseGrid = null;		//axGrid 변수


//functions

//기본 페이지 로드 
function getFacilityListView(categoryName){
	console.log("getFacilityListView()");
	
	if(!categoryName){
		alert("잘못된 접근");
		return;
	}else{
		if(categoryName == "FaciReseMng"){	//시설예약관리 - ui 디자인 다름 
			alert("잘못된 접근");
			return;
		}
	}
	
	var container = "#bottomPopup";
    $(container).load("/job/fcmr/base/getFacilityListView.do", function () {
        toastr.success("/job/fcmr/base/getFacilityListView.do", "페이지🙂호🙂출🙂");
        /*$(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });*/
        
        if(categoryName){
        	selectFacility(categoryName);
        }
    	
    });
}


//시설 관리 메뉴 분기
function selectFacility(categoryName){
	console.log("selectFacility(categoryName)");
	
	if(categoryName){
		if(categoryName == 'WaterSupplyFacility' ){					//상수도 시설
			//제목 처리
	    	$("#bottomPopup .popup-header").text("상수도관리");		
	    	getWtlFacilityList();
	    	
		}else if(categoryName == "SewerSupplyFacility" ){			//하수도 시설
			//제목 처리
			$("#bottomPopup .popup-header").text("하수도관리");		
			
			toastr.error("작업중", "하수도 시설");
		}else if(categoryName == "TransportationFacility" ){		//교통시설
			//제목 처리
			$("#bottomPopup .popup-header").text("교통시설");
			
			toastr.error("작업중", "교통시설");	
		}else if(categoryName == "PhysicalEducationFacility" ){		//체육 시설
			//제목 처리
			$("#bottomPopup .popup-header").text("체육시설");
			
			toastr.error("작업중", "체육 시설");
		}else if(categoryName == "WelfareFacility" ){				//복지시설
			//제목 처리
			$("#bottomPopup .popup-header").text("복지시설");
			
			toastr.error("작업중", "복지시설");
		}else if(categoryName == "FaciReseMng" ){					//시설예약관리
			
			alert("잘못된 접근");
			return;
		}else{
			alert("맞는 데이터 없음");
			return;
		}
		
	}else{
		alert("잘못된 접근");
		return;
	}
}

//상세 페이지 로드
/*function getFacilityDetailView(categoryName){
	console.log("getFacilityDetailView()");
	
	if(!categoryName){
		alert("잘못된 접근");
		return;
	}
	
	ui.openPopup("rightSubPopup");
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/base/getFacilityDetailView.do", function () {
        toastr.success("/job/fcmr/base/getFacilityDetailView.do", "페이지🙂호🙂출🙂");
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        if(categoryName){
        	selectFacilityDetail(categoryName);
        }
    	
    });
	
}*/


//상세 페이지 분기
/*function selectFacilityDetail(categoryName){
	console.log("selectFacilityDetail(categoryName)");
	
	if(categoryName){
		if(categoryName == 'WaterSupplyFacility' ){					//상수도 시설
			toastr.error("작업중", "상수도 시설 상세 화면");
		}else if(categoryName == "SewerSupplyFacility" ){			//하수도 시설
			
		}else if(categoryName == "TransportationFacility" ){		//교통시설
			
		}else if(categoryName == "PhysicalEducationFacility" ){		//체육 시설
			
		}else if(categoryName == "WelfareFacility" ){				//복지시설
			
		}else if(categoryName == "FaciReseMng" ){					//시설예약관리
			
		}else{
			alert("맞는 데이터 없음");
			return;
		}
		
	}else{
		alert("잘못된 접근");
		return;
	}
}*/


//등록 페이지 로드
function getFacilityInsertView(categoryName){
	console.log("getFacilityInsertView()");
	
	if(!categoryName){
		alert("잘못된 접근");
		return;
	}
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/base/getFacilityInsertView.do", function () {
        toastr.success("/job/fcmr/base/getFacilityInsertView.do", "페이지🙂호🙂출🙂");
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        if(categoryName){
        	selectFacilityInsert(categoryName);
        }
    	
    });
	
}

//등록 페이지 분기
function selectFacilityInsert(categoryName){
	console.log("selectFacilityInsert(categoryName)");
	
	if(categoryName){
		if(categoryName == 'WaterSupplyFacility' ){					//상수도 시설
			toastr.error("작업중", "상수도 시설 등록 화면");
		}else if(categoryName == "SewerSupplyFacility" ){			//하수도 시설
			
		}else if(categoryName == "TransportationFacility" ){		//교통시설
			
		}else if(categoryName == "PhysicalEducationFacility" ){		//체육 시설
			
		}else if(categoryName == "WelfareFacility" ){				//복지시설
			
		}else if(categoryName == "FaciReseMng" ){					//시설예약관리
			
		}else{
			alert("맞는 데이터 없음");
			return;
		}
		
	}else{
		alert("잘못된 접근");
		return;
	}
}

/////////////////////

//읍면동 데이터 조회
function getEmdKorNmCode(tagClass){

	//store 전역 변수 cmt.js 에 있음
	//읍면동 데이터 조회
	/*store.emd.getData().done((features) => {
	    const sorted = util.array.sort(features, "emd_kor_nm");
	    const tags = sorted.map((feature) => {
	      return `<option value="${feature.get("emd_cd")}">${feature.get("emd_kor_nm")}</option>`;
	    });
	    
	    $(tagClass).append(tags);
    
	});*/
	////////////////
	var options;
    options = {
        typeNames: 'tgd_scco_emd' + "",
    }
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
        //그리드 데이터 전처리
        const list = [];
        //조회데이터 list 에 json 형태로 저장
        for (let i = 0; i < data.features.length; i++) {
            const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
        
        //select box option 값으로 변경
        const optionsData = list.map((item) => {
      	  return `<option value="${item.emd_cd}">${item.emd_kor_nm}</option>`; 
        });
  	 
        $(tagClass).append(optionsData);
    });
	
}

//공통 코드 조회
//selectTag : select box 에 option 값 세팅, 없으면 해당 코드의 데이터 json 형태로 리턴
function getCmmCodeData(codeId, selectTag) {	
	//console.log("getCmmCodeData(codeId, selectTag)");
	
	//ajax - 전달받은 주소로 GET 방식의 HTTP 요청을 전송함
	$.get("/com/cmm/selectCmmCodeDetail.do", { codeId: codeId })
    .done((response) => {
      const list = JSON.parse(response)["list"];

      if(selectTag){
    	  const data = list.map((item) => {
        	  return `<option value="${item.code}">${item.codeNm}</option>`; 
          });
    	 
    	  $(selectTag).append(data);
    	  
      }else{
    	  return list;
      }
     
    })
    .fail(() => {
      alert(`코드 정보를 가져오는데 실패했습니다.`);
    });
	
}




