function aj_selectWtlFacilitiesList(){
	loadingShowHide("show");
	$.ajax({
		type : "POST",
		url : "/job/sffc/selectWtlFacilitiesList.do",
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
			}else{ 
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
            selectWtlList(1);
		}
	});
}

function selectWtlList(pageNo){
    Data = {
        'ftr_cde' : $('#wtlFtrIdn').val(),
        'currentPageNo' : pageNo,
        }
	$.ajax({
		type : 'GET',
        url : '/job/sffc/selectWtlList.do',
        dataType : 'json',
        data : Data,
		success : function(res){
            console.log(res);
            //res.safeList
            $('#wtlTbody').empty();
            document.querySelector('#wtlCntRessult').children[0].innerText = res.cnt;
            for(var i in res.safeList) {
                $('#wtlTbody').append(`<tr>
                <td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
                <td><a href="javascript:void(0);" data-popup="work-02-01-detail">` + res.safeList[i].ftrCde + `</a></td>
                <td>` + res.safeList[i].ftrIdn + `</td>
                <td>` + res.safeList[i].hjdCde + `</td>
                <td>` + res.safeList[i].mngCde + `</td>
                <td>` + res.safeList[i].shtNum + `</td>
                <td>` + res.safeList[i].istYmd + `</td>
                <td>` + res.safeList[i].ftrIdn + `</td>
                <td>` + res.safeList[i].hom_num + `</td>
                <td>` + res.safeList[i].mofCde + `</td>
                <td>` + res.safeList[i].firDip + `</td>
                <td>` + res.safeList[i].stdDip + `</td>
                <td>` + res.safeList[i].angDir + `</td>
                <td>` + res.safeList[i].supHit + `</td>
                <td>` + res.safeList[i].cntNum + `</td>
                <td>` + res.safeList[i].orgIdn + `</td>
            </tr>`);
            }
            $('#wtlPaging').empty();
				var paginationInfo = res.paginationInfo;
				if(paginationInfo.firstPageNoOnPageList!=1) {
					var prevPage = paginationInfo.firstPageNoOnPageList -5;
				}else {var prevPage = 1}
                $('#wtlPaging').append(`
                    <a href="javascript:selectWtlList(`+paginationInfo.firstPageNo+`);" class="first" title="처음"></a>
                    <a href="javascript:selectWtlList(`+prevPage+`);" class="prev" title="이전"></a>
                    `)
				if(paginationInfo.currentPageNo) {
					for(var i=paginationInfo.firstPageNoOnPageList; i<=paginationInfo.lastPageNoOnPageList; ++i) {
						
						if(i==paginationInfo.currentPageNo) {
							$('#wtlPaging').append(
                                `<strong class="current">`+i+`</strong>`
							)
						} else {
							$('#wtlPaging').append(
                                    `<a href="javascript:selectWtlList(`+i+`);">`+i+`</a>`	
								)
						}
					}
				}
				if(paginationInfo.lastPageNoOnPageList == paginationInfo.lastPageNo ) {
					var nextPage = paginationInfo.lastPageNoOnPageList;
				} else {
					var nextPage = paginationInfo.lastPageNoOnPageList +1;
				}
				$('#wtlPaging').append(
                        `<a href="javascript:selectWtlList(`+nextPage+`);" class="next" title="다음"></a>
                        <a href="javascript:selectWtlList(`+paginationInfo.lastPageNo+`);" class="last" title="마지막"></a>`
						)
		}, complete : function(){

		}
	});
} 