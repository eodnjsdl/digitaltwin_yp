/**
 * - 업무 / 시설관리 / 교통시설
 * 
 * @returns
 */
$(document).ready(function(){
	console.log("roadSect.js");
	console.log("도로구간");
});

// 도로구간 옵션 설정
function getRoadSectListView() {
	//console.log("getRoadSectListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/tpfc/selectRoadSectListView.do', function() {
		toastr.success("/job/fcmr/tpfc/selectRoadSectListView.do", "페이지🙂호🙂출🙂");
		
		getEmdKorNmCode("#emdKorNm");	//읍면동 코드
		
		// grid 기본 세팅
		var $container = $("#container");
		var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
		$target.css('height', 'inherit');
		
		ax5.ui.grid.formatter["roadLt"] = function() {
			var roadLt = this.value;
			
			return Math.floor(roadLt);
		}
		
		baseGrid = null;	//axgrid 전역 변수 
		baseGrid = new ax5.ui.grid();
		baseGrid.setConfig({
			target: $target,
			sortable: true,
			multipleSelect: false,
			header: {
				align: "center"
			},
			columns: [
				{key: "sig_cd",		label: "시군구",			width: 70},
				{key: "rds_man_no",	label: "도로구간일련번호",	width: 120},
				{key: "rn",			label: "도로명(한글)",		width: 150},
				{key: "eng_rn",		label: "도로명(영문)",		width: 200},
				{key: "ntfc_de",	label: "고시일자",			width: 90},
				{key: "wdr_rd_cd",	label: "광역도로구분",		width: 100},
				{key: "rbp_cn",		label: "기점",			width: 200},
				{key: "rep_cn",		label: "종점",			width: 200},
				{key: "road_bt",	label: "도로폭",			width: 60},
				{key: "road_lt",	label: "도로길이",			width: 80,	formatter: "roadLt"}
			],
			page: {
				navigationItemCount: 10,	// 보여지는 클릭 가능 페이지 번호
		 		height: 30,
				display: true,
				firstIcon: '&lt;&lt;',
				prevIcon: '&lt;',
				nextIcon: '&gt;',
				lastIcon: '&gt;&gt;',
	            onChange: function() {
	            	selectRoadSectList(this.page.selectPage + 1);
	            }
			},
			body: {
				align: 'center',
				onClick: function() {
					//this.self.select(this.dindex);
					//console.log(this.item);
					selectRoadSectDetail(this.item.gid);
				}
			}
		});
	});
	
	ui.loadingBar("hide");
	selectRoadSectList(1);
}

function selectRoadSectList(page) {
	//console.log("selectRoadSectList(page)");
	//console.log("page >>> " + page);
	
	//검색 조건
	const filters = [];

	const emdKorNm = $("#emdKorNm option:selected").val();				// 읍면동
	const roadBtVal = $("#lSrchOptions input[name=roadBtVal]").val();	// 도로폭
	const rn = $("#lSrchOptions input[name=rn]").val();					// 도로명
	
	// 읍면동 검색 필터 작업 필요
	if (emdKorNm) {
		//filters.push("sig_cd" + " = " + emdKorNm); 
	}
	if (roadBtVal) {
		filters.push("road_bt" + " = " + roadBtVal); 
	}
	if (rn) {
		filters.push("rn" + " like " + rn);
	}
	
	var options;
	options = {
		typeNames: 'tgd_sprd_manage' + "",
		perPage: 10,
		page: page,
		filter: filters
	};
	
	const promise = dtmap.wfsGetFeature(options);

	promise.then(function(data) {
		//그리드 데이터 전처리
		const list = [];
		for (let i = 0; i < data.features.length; i++) {
			const {id, properties} = data.features[i];
			
			list.push({...properties, ...{id: id}});
		}
		
		var total = data.totalFeatures;
		var totPge = Math.ceil(total / 10);
		
		if (total > 0) {
        	$("#bottomPopup .bbs-list-num").html("조회결과: " + total + "건");
        }

		baseGrid.setData({
			list: list,
			page: {
				currentPage: page - 1,	// 현재 페이지
				pageSize: 10,			// 한 페이지의 데이터 갯수
				totalElements: total,	// 전체 데이터 갯수
				totalPages: totPge		// 전체 페이지 갯수
			}
		})
	});
}

function selectRoadSectDetail(gid) {
	console.log("selectRoadSectDetail(item)");
	console.log("gid >>> " + gid);
	
	toastr.error("아직 작업 중", "리팩토링 작업대상입니다.");
};