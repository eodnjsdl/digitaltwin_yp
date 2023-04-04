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

//상수도시설 분기
function getWaterSupplyFacility(name){
	console.log("getWaterSupplyFacility(name)");
		
	if(name){
		if(name == "wtlFirePs"){			//소방시설
			selectWtlFirePsListView();
		}else if(name == "wtlPipeLm"){		//상수관로
			toastr.error("작업중", "상수관로");	
			return;
		}else if(name == "wtlFlowPs"){		//유량계
			toastr.error("작업중", "유량계");	
			return;
		}else if(name == "wtlManhPs"){		//상수맨홀
			toastr.error("작업중", "상수맨홀");
			return;
		}else if(name == "wtlPipePs"){		//상수관로심도
			toastr.error("작업중", "상수관로심도");
			return;
		}else if(name == "wtlPrgaPs"){		//수압계
			toastr.error("작업중", "수압계");
			return;
		}else if(name == "wtlServPs"){		//배수지
			toastr.error("작업중", "배수지");
			return;
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

////////////////////////

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

      if(selectBoxTag){
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
