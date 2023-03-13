<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<script src="/js/egiskorea/com/geo/emi/examinationInfo.js"></script>
<script>
$(document).ready(function(){
	var landRegister = getLandRegisterByPnu("<c:out value='${searchVO.code2}' />");
	
	$('#leftPopup .popup-close').click(function(){
		$("input[name='code2']").val("");
		
		if(app2D){			
			cmmUtil.resetMap();
		} else{
			if(OLOAD.m_center_Polygon != null) {
				OLOAD.m_center_Polygon.removeAllObject();
			
				var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
				var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
				
				if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
				if(lineLayer != null) { lineLayer.removeAll(); }
		    }
		}
	});
	
	// 리 구역 RTT 생성
	if(app2D){
		cmmUtil.highlightGeometry(landRegister.landRegister.geometry);
	} else{
		if("<c:out value='${searchVO.code2}' />" != ""){
			var coordinates = OLOAD.setPosition(landRegister.landRegister.geometry, "MULTIPOLYGON", 0);
			
			createVerticalPlane(coordinates.coordinates);
			OLOAD.loadCenterData(landRegister);
			moveCamera(landRegister, "li");
		}	
	}	
});

function fn_check_all() {
    var checkField = document.listForm.delYn;
    if(document.listForm.checkAll.checked) {
        if(checkField) {
            if(checkField.length > 1) {
                for(var i=0; i < checkField.length; i++) {
                    checkField[i].checked = true;
                }
            } else {
                checkField.checked = true;
            }
        }
    } else {
        if(checkField) {
            if(checkField.length > 1) {
                for(var j=0; j < checkField.length; j++) {
                    checkField[j].checked = false;
                }
            } else {
                checkField.checked = false;
            }
        }
    }
}

function fn_selected_check() {

    var checkField = document.listForm.delYn;
    var checkId = document.listForm.checkId;
    var returnValue = "";

    var returnBoolean = false;
    var checkCount = 0;

    if(checkField) {
        if(checkField.length > 1) {
            for(var i=0; i < checkField.length; i++) {
                if(checkField[i].checked) {
                    if(returnValue == ""){
                        returnValue = checkField[i].value;
                    }else{
                	    returnValue = returnValue + ";" + checkField[i].value;
                    }
                    checkCount++;
                }
            }
            if(checkCount > 0)
                returnBoolean = true;
            else {
                alert("선택된 조사정보가 없습니다.");
                returnBoolean = false;
            }
        } else {
            if(document.listForm.delYn.checked == false) {
                alert("선택된 조사정보가 없습니다."); 
                returnBoolean = false;
            }
            else {
                returnValue = checkId.value;
                returnBoolean = true;
            }
        }
    } else {
        alert("조회된 결과가 없습니다."); //조회된 결과가 없습니다.
    }
    document.listForm.selCodes.value = returnValue;

    return returnBoolean;
}

function fn_left_select_list_sub(){
	document.searchFormLeft.pageIndex.value = 1;
	aj_selectExaminationInfoList($("#searchFormLeft")[0], "");
}

function fn_left_select_linkPage(pageNo){
	document.searchFormLeft.pageIndex.value = pageNo;
	aj_selectExaminationInfoList($("#searchFormLeft")[0], "");
}

function fn_left_select_detail(pnu){
	leftSubPopupOpen("examinationInfo", pnu, "left");
}

function fn_select_delete_list() {
	if(fn_selected_check()) {
    	if(confirm("<spring:message code="common.delete.msg" />")){
			$.ajax({
				type : "POST",
				url: "/geo/emi/deleteExaminationInfoList.do",
				data : {
					"selCodes" : $("#selCodes").val()
				},
				dataType : "html",
				success : function(returnData, status){
					if(status == "success") {
						if(removeLine(returnData) == "ok"){
							toastr.success("정상적으로 삭제되었습니다.");
							aj_selectExaminationInfoList($("#searchFormLeft")[0], "");
						}else{
							alert("삭제에 실패했습니다.");
						}
					}else{
						alert("ERROR!");
						return;
					}
				}
			});
		}
	}
}
</script>
				<!-- 국토정보관리 > 속성정보 > 목록 -->
					<div class="popup-header">조사정보</div>
					<div class="popup-body">
						<div class="left-popup-body">			
							<form:form name="searchFormLeft" id="searchFormLeft" method="post" onsubmit="fn_left_select_list_sub(); return false;">							
							<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
							<input type="hidden" name="code2" value="<c:out value='${searchVO.code2}' />">
							<div class="bbs-search form-row">
								<div class="col-auto">
									<select name="searchMch" class="form-select">
										<option value="">지목일치여부</option>
										<option value="0" <c:if test="${searchVO.searchMch == '0'}">selected="selected"</c:if>>일치</option>
										<option value="1" <c:if test="${searchVO.searchMch == '1'}">selected="selected"</c:if>>불일치</option>
									</select>
								</div>
								<div class="col">
									<select name="searchCnd" class="form-select">
										<option value="">검색 및 팝업 칼럼선택</option>
										<option value="0" <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if>>조사자(정)</option>
										<option value="1" <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if>>조사자(부)</option>
										<option value="2" <c:if test="${searchVO.searchCnd == '2'}">selected="selected"</c:if>>원지목</option>
									</select>
								</div>
								<div class="col-auto"><input type="text" name="searchWrd" class="form-control" value="<c:out value="${searchVO.searchWrd}"/>"></div>								
								<div class="col-auto"><button type="submit" class="btn btn-xsm type06">검색</button></div>
							</div> 
							</form:form>
							
							<form:form id="listForm" name="listForm" method="post">
							<input type="hidden" name="pnu">
							<input type="hidden" name="selCodes" id="selCodes">
							<input type="hidden" name="code2" value="<c:out value='${searchVO.code2}' />">
							<div class="bbs-list-wrap" style="height: 702px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 36px;">
												<col style="width: 15%;">
												<col style="width: 18%;">
												<col style="width: 15%;">
												<col style="width: 15%;">
												<col style="width: auto;">
												<col style="width: 80px;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="checkAll" id="chk-all" onclick="javascript:fn_check_all()"><label for="chk-all"></label></span></span></th>
													<th scope="col">지번</th>
													<th scope="col">최종변경일자</th>
													<th scope="col">조사자(정)</th>
													<th scope="col">조사자(부)</th>
													<th scope="col">원지목</th>
													<th scope="col"></th>
												</tr>
											</thead>
										</table>
									</div>									
									<div class="scroll-y">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 36px;">
												<col style="width: 15%;">
												<col style="width: 18%;">
												<col style="width: 15%;">
												<col style="width: 15%;">
												<col style="width: auto;">
												<col style="width: 80px;">							
											</colgroup>
											<tbody>
												<c:forEach items="${resultList}" var="result" varStatus="status">
												<tr>
													<td>
														<span class="form-checkbox">
														<span><input type="checkbox" name="delYn" id="chk1_<c:out value="${result.orgFid}" />" value="<c:out value="${result.orgFid}" />"><label for="chk1_<c:out value="${result.orgFid}" />"></label></span>
														</span>
														<input type="hidden" name="checkId" value="<c:out value="${result.orgFid}"/>" />
													</td>
													<td><c:out value="${result.addr}" /></td>
													<td><c:out value="${result.updateDate}" /></td>
													<td><c:out value="${result.main}" /></td>
													<td><c:out value="${result.sub}" /></td>
													<td><c:out value="${result.ori}" /></td>
													<td>
														<button type="button" class="icon-btn excel" title="엑셀다운로드" onClick="fn_download_excelData(this.form, '<c:out value="${result.pnu}" />')"></button> 
														<button type="button" class="icon-btn detail2" data-popup="territory-info" title="속성정보 더보기" onClick="fn_left_select_detail('<c:out value="${result.pnu}" />')"></button>
													</td>
												</tr>
												</c:forEach>	
												<c:if test="${fn:length(resultList) == 0}">
												<tr>
													<td colspan="7">
													<spring:message code="common.nodata.msg" />
													</td>
												</tr>
												</c:if>									
											</tbody>
										</table>
									</div>
								</div>

								<div class="pagination type01">
									<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fn_left_select_linkPage"/>
								</div>

								<div class="position-absolute left"><button type="button" class="btn basic bi-delete2" onClick="fn_select_delete_list()">선택삭제</button></div>
								<div class="position-absolute right"><button type="button" class="btn basic bi-excel" onClick="fn_download_excelData(this.form, 'all')">엑셀 저장</button></div>
							</div>
							</form:form>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-left-toggle" title="접기"></button>
				<!-- //국토정보관리 > 속성정보 > 목록 -->					