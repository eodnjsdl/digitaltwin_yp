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

//functions


//기본 페이지 로드 
function getFacilityListView(categoryName){
	console.log("getFacilityListView()");
	
	if(!categoryName){
		alert("잘못된 접근");
		return;
	}else{
		if(categoryName == "FaciReseMng"){	//ui 디자인 다름 - 시설예약관리
			alert("잘못된 접근");
			return;
		}
	}
	
	var container = "#bottomPopup";
    $(container).load("/job/fcmr/base/getFacilityListView.do", function () {
        toastr.success("/job/fcmr/base/getFacilityListView.do", "페이지🙂호🙂출🙂");
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
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
			
			toastr.error("작업중", "작업중입니다.");
		}else if(categoryName == "TransportationFacility" ){		//교통시설
			//제목 처리
			$("#bottomPopup .popup-header").text("교통시설");
			
			toastr.error("작업중", "작업중입니다.");	
		}else if(categoryName == "PhysicalEducationFacility" ){		//체육 시설
			//제목 처리
			$("#bottomPopup .popup-header").text("체육시설");
			
			toastr.error("작업중", "작업중입니다.");
		}else if(categoryName == "WelfareFacility" ){				//복지시설
			//제목 처리
			$("#bottomPopup .popup-header").text("복지시설");
			
			toastr.error("작업중", "작업중입니다.");
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


//읍면동 데이터 조회
function getEmdKorNmCode(tagClass){

	//store 전역 변수 cmt.js 에 있음
	//읍면동 데이터 조회
	store.emd.getData().done((features) => {
    const sorted = util.array.sort(features, "emd_kor_nm");
    const tags = sorted.map((feature) => {
      return `<option value="${feature.get("emd_cd")}">${feature.get("emd_kor_nm")}</option>`;
    });
    
    $(tagClass).append(tags);
    
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




