/**
 * 행정자산관리
 * @returns
 */
$(document.body).ready(function () {
    $('.popup-body #regBtn').on('click', function() {
	insertAdministAssetsView();
    });
    let administAssetsGrid = null;
});

/**
 * 등록 화면 조회
 * @returns
 */
function insertAdministAssetsView() {
    ui.loadingBar('show');
    // popup open
    ui.openPopup("rightSubPopup");
    $("#rightSubPopup").load("/job/adas/asmng/insertAdministAssets.do", function() {
	$(".scroll-y").mCustomScrollbar({
	    scrollbarPosition: "outside"
	});
	ui.loadingBar('hide');
    });
}

function initAdministAssets() {
    administAssetsGrid();
    setAsmngData();
}

/**
 * 테이블 생성
 * @returns
 */
function administAssetsGrid() {
    administAssetsGrid = new ax5.ui.grid();
    administAssetsGrid.setConfig({
		target: $('[data-ax5grid="administAssetsGrid"]'),
		showLineNumber: true,
		sortable: true,
		multiSort: true,
		header: {
			align: "center"
		},
		body: {
			align: "center",
			onClick: function() {
			    toastr.error('상세보기 호출');
			}
		},
		page: {
			navigationItemCount: 9,
			display: true,
			firstIcon: '««',
		        prevIcon: '«',
		        nextIcon: '»',
		        lastIcon: '»»',
			onChange: function () {
//			    setAsmngData(this.page.selectPage);
			    toastr.error("임시데이터 입니다.");
			    setAsmngData();
			}
		},
		columns: [
			{key: "test1", 		label: "coulmn1",			width: "*"},
			{key: "test2", 		label: "coulmn2",			width: "*"},
			{key: "test3", 		label: "coulmn3",			width: "*"},
			{key: "test4", 		label: "coulmn4",			width: "*"},
			{key: "test5", 		label: "coulmn5",			width: "*"}
		],
	});
}

function setAsmngData() {
    var list = [];
    // 임시 데이터
    for (let i = 0; i < 15; i++) {
	list.push({test1 : "record", test2 : "record", test3 : "record", test4 : "record", test5 : "record"});
    }
    administAssetsGrid.setData(list);
}