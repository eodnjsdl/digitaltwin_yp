/**
 * - 업무 / 시설관리 / 상수도 시설
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("facilityWaterSupply.js");
	console.log("상수도시설");
	
});

//functions

//상수도 관리 목록 조회
function getWtlFacilityList(){
	console.log("getWtlFacilityList()");
     
     var $container = $("#container");
     var $target = $container.find('#bottomPopup .facility-select')
     
     let list = [	//DB 처리 필요?
      {value: "WtlFirePs", title: "소방시설"},
      {value: "WtlPipeLm", title: "상수관로"},
      {value: "WtlFlowPs", title: "유량계"},
      {value: "WtlManhPs", title: "상수맨홀"},
      {value: "WtlPipePs", title: "상수관로심도"},
      {value: "WtlPrgaPs", title: "수압계"},
      {value: "WtlServPs", title: "배수지"},
      {value: "wtlSplyLs", title: "급수관로"},
      {value: "wtlValvPs", title: "변류시설"}
     ];
     
     $target.empty();
     
     var options="";
     for (let i = 0; i < list.length; i++) {
    	 //console.log(list[i]);
    	 options += "<option value='"+list[i].value+"'>"+list[i].title+"</option>";
     }
     
     $target.append(options);
     
     //이벤트 추가
     $target.on('change', function() {
    	 getWaterSupplyFacility(this.value);
	 });
     
     //첫번째 항목 강제 실행
     $("#bottomPopup .facility-select option:eq(0)").trigger('change');	
     
}


//상수도시설 분기
function getWaterSupplyFacility(name){
	console.log("getWaterSupplyFacility(name)");
		
	if(name){
		if(name == "WtlFirePs"){			//소방시설
			selectWtlFirePsSearchOption();
			selectWtlFirePsList(1);	
		}else if(name == "WtlPipeLm"){		//상수관로
			
		}else if(name == "WtlFlowPs"){		//유량계
			selectWtlFlowPsSearchOption();
			selectWtlFlowPsList(1);
		}else if(name == "WtlManhPs"){		//상수맨홀
			
		}else if(name == "WtlPipePs"){		//상수관로심도
			
		}else if(name == "WtlPrgaPs"){		//수압계
			
		}else if(name == "WtlServPs"){		//배수지
			
		}else if(name == "wtlSplyLs"){		//급수관로
			
		}else if(name == "wtlValvPs"){		//변류시설
			
		}else{
			alert("잘못된 호출")
			return;
		}
		
	}
}
