// 주소 목록 출력
function searchAddress(pageNum) {
	// 지도 clear
	dtmap.vector.clear();
	
	var srchKey = $("#searchKeyword").val();
	
	$.ajax({
		url:"/webApp/webAppSearch.do",
		type: "POST",
		data: {
			SearchAdr	: srchKey,
			pageIndex	: pageNum
		},
		dataType: 'html',
		success: function(result) {
			$(".search-list").html(result);
			
			$(".prePage").val(Number(pageNum) - 10);
		 	$(".nextPage").val(Number(pageNum) + 10);
			
			$("#pageNum li").removeClass("active");
			$("#pageNum #page" + pageNum).addClass("active");
		},
		error : function(request, status, error) {
			toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
			console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
		}
	});
}

function webApp_clickTerritory(pnu) {
	webApp_selectExaminationInfoList($("#tmpForm")[0], pnu);		// 조사정보
}

function territorySelectEventListener(e) {
	var id = e.id; //피쳐 아이디
	var idArray = id.split(".");
	
	//검색 조건
	const filters = [];
	
	const typeName = idArray[0];
	if(typeName != "lsmd_cont_ldreg_41830"){
		alert("상세보기 오류");
		return false;
	}
	
	if(e.property.pnu){
		filters.push("pnu" + " = " + e.property.pnu); 
	}else{
		alert("상세보기 오류");
		return false;
	}
	
    var options;
    options = {
        typeNames	: 'digitaltwin:lsmd_cont_ldreg_41830',
        filter 		: filters,
    }
	
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
    	if (data.features.length != 1) {
    		alert("상세보기 오류")
    		return false;
    	}
    	
		var pnu = data.features[0].properties.pnu;
		var landRegister = getLandRegisterByPnu(pnu);
		
		if (landRegister.landRegister) {
			ui.openPopup("rightSubPopup", "emiInfo");
	    	webApp_selectExaminationInfo($("#tmpForm")[0], pnu);
		} else {
			toastr.error("geometry 값이 존재하지 않습니다.");
		}
    });
}

function drawPnu(pnu, addr) {
	var options ={
		typeNames	: 'digitaltwin:lsmd_cont_ldreg_41830', //WFS 레이어명
		filter		: "pnu = " + pnu,
	}
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		// 지도 아이콘 작업
		dtmap.vector.clear();
	    
	    // 지도에 GeoJSON 추가
	    dtmap.vector.readGeoJson(data, function(feature) {
			return {
				stroke: {
					color: '#FF3333',
					width: 5
				},
				label: {
                    text: addr
                }
			}
	    });
	    dtmap.vector.fit();
	});
}