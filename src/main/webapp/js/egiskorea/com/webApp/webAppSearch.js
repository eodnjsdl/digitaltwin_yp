// 주소 목록 출력
function searchAddress(pageNum) {
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
			
			$(".previousPage").val(Number(pageNum) - 10);
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
