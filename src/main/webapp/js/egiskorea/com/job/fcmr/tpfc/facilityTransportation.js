/**
 * - 업무 / 시설관리 / 교통시설
 * 
 * @returns
 */
$(document).ready(function() {
	console.log("facilityTransportation.js");
	console.log("교통시설");
});

// 교통시설 분기
function getTransportationFacility(name) {
	console.log("getTransportationFacility(name)");
	
	if (name) {
		if (name == "roadSection") {			// 도로구간
			getRoadSectListView();
		} else if (name == "wtlPipeLm") {		//상수관로
			toastr.error("작업중", "상수관로");	
			return;
		} else if (name == "wtlFlowPs") {		//유량계
			toastr.error("작업중", "유량계");	
			return;
		} else if (name == "wtlManhPs") {		//상수맨홀
			toastr.error("작업중", "상수맨홀");
			return;
		} else if (name == "wtlPipePs") {		//상수관로심도
			toastr.error("작업중", "상수관로심도");
			return;
		} else if (name == "wtlPrgaPs") {		//수압계
			toastr.error("작업중", "수압계");
			return;
		} else if (name == "wtlServPs") {		//배수지
			toastr.error("작업중", "배수지");
			return;
		} else if (name == "wtlSplyLs") {		//급수관로
			toastr.error("작업중", "급수관로");
			return;
		} else if (name == "wtlValvPs") {		//변류시설
			toastr.error("작업중", "변류시설");
			return;
		} else {
			alert("잘못된 호출")
			return;
		}
	}
}