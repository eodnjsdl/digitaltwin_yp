<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<style type="text/css">
	.popup-panel.popup-sub .phy-popup-close {
	    top: 0;
	    right: 0;
	    width: 39px;
	    height: 39px;
	    border-left: 1px solid #44516A;
	    background: url(/images/icon/popup-close2.svg) no-repeat 50% 50%;
	    border-top-right-radius: 10px;
	    position: absolute;
	}
</style>

<script>
$(".scroll-y").mCustomScrollbar({
	scrollbarPosition: "outside"
});

// 체육시설 운영정보 목록 페이징
function test(pageNo){
	var gid = $('#gid').val();
	
	phyMngViewPaging(pageNo, gid);
}

// 년도
var today = new Date();   
var year = today.getFullYear();

for(var i = 0; i < 10; i++) {
	var yearOption = year - i;
	$('#phyMng #oper_year').append('<option value="'+ yearOption + '">' + yearOption + '</option>')
}
</script>

<!-- 업무 > 시설관리 > 체육시설 > 상세보기 > 운영정보 관리 -->
<div class="popup-header">체육시설 > 운영정보 관리</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="">
				<div class="data-default">
					<form id="phyMngFrm" method="post">
						<table id="phyMng" class="data-write">
							<colgroup>
								<col style="width: 23%;">
								<col style="width: auto;">
								<col style="width: 23%;">
								<col style="width: auto;">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">운영연도</th>
									<td>
										<select name="oper_year" id="oper_year" class="form-select">
										</select>
										<input type="hidden" name="gid" id="gid" value="${gid}">
									</td>
									<th scope="row">취득가액</th>
									<td><input type="number" maxlength="16" min="0" name="acqs_amount" id="acqs_amount" class="form-control align-right" oninput="maxLengthCheck(this)"></td>
								</tr>
								<tr>
									<th scope="row">감가상각액</th>
									<td><input type="number" maxlength="16" min="0" name="dprc_am" id="dprc_am" class="form-control align-right" oninput="maxLengthCheck(this)"></td>
									<th scope="row">감가상각누계액</th>
									<td><input type="number" maxlength="16" min="0" name="dprc_acmtl_am" id="dprc_acmtl_am" class="form-control align-right" oninput="maxLengthCheck(this)"></td>
								</tr>
								<tr>
									<th scope="row">장부가액</th>
									<td><input type="number" maxlength="16" min="0" name="bk_amount" id="bk_amount" class="form-control align-right" oninput="maxLengthCheck(this)"></td>
									<th scope="row">내용연수</th>
									<td><input type="text" name="contents_yycnt" id="contents_yycnt" class="form-control align-right"></td>
								</tr>
								<tr>
									<th scope="row">운영비용</th>
									<td><input type="text" name="oper_ct" id="oper_ct" class="form-control align-right"></td>
									<th scope="row">운영수익</th>
									<td><input type="text" name="oper_ern" id="oper_ern" class="form-control align-right"></td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div class="data-list-wrap marT10" style="height: 169px;">
					<div class="data-default" style="height: 80%">
						<table class="data-list tbl-all-center">
							<colgroup>
								<col style="width: 36px;">
								<col style="width: 10%;">
								<col style="width: 15%;">
								<col style="width: auto;">
								<col style="width: 15%;">
								<col style="width: 15%;">
								<col style="width: 15%;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="sporChkAll" id="sporChkAll" value="sporChkAll"><label for="sporChkAll"></label></span></span></th>
									<th scope="col">연도</th>
									<th scope="col">감가상각액</th>
									<th scope="col">감가상각 누계액</th>
									<th scope="col">장부가액</th>
									<th scope="col">비용</th>
									<th scope="col">수익</th>
								</tr>
							</thead>												
						</table>
						<div class="scroll-y">
							<table class="data-list tbl-all-center">
								<colgroup>
									<col style="width: 36px;">
									<col style="width: 10%;">
									<col style="width: 15%;">
									<col style="width: auto;">
									<col style="width: 15%;">
									<col style="width: 15%;">
									<col style="width: 15%;">
								</colgroup>
								<tbody>
									<c:forEach items="${sportsList}" var="sporList" varStatus="status">
										<tr>
											<td><span class="form-checkbox"><span><input type="checkbox" name="sporMngcheck" id="${sporList.operYear}" value ="${sporList.operYear}"><label for="${sporList.operYear}"></label></span></span></td>
											<td><c:out value="${sporList.operYear}"></c:out></td>
											<td><c:out value="${sporList.dprcAm}"></c:out></td>
											<td><c:out value="${sporList.dprcAcmtlAm}"></c:out></td>
											<td><c:out value="${sporList.bkAmount}"></c:out></td>
											<td><c:out value="${sporList.operCt}"></c:out></td>
											<td><c:out value="${sporList.operErn}"></c:out></td>
										</tr>
									</c:forEach>
									<c:if test="${fn:length(sportsList) == 0}">
										<tr>
											<td class="noData" colspan="7">데이터가 없습니다.</td>
										</tr>
									</c:if>
								</tbody>
							</table>
						</div>
					</div>
					<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${SportsVO.pageIndex}' />">
					<input type="hidden" name="gid" id="gid" value="<c:out value='${gid}' />">
					<div class="pagination">
						<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="test"/>
					</div>
				</div>					
			</div>
			<div class="position-bottom btn-wrap">
				<div class="position-absolute left">
					<button type="button" class="btn basic bi-delete2" onclick="deletePhyMng();">선택삭제</button>
				</div>
				<div>
					<button type="button" class="btn basic bi-write2" onclick="insertPhyMng(${gid});">등록</button>
					<button type="button" class="btn basic bi-cancel" onclick="selectPhyEduFaciDetail(${gid});">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기"></button> -->
<button type="button" class="phy-popup-close" title="닫기" onclick="selectPhyEduFaciDetail(${gid});"></button>
<!-- 업무 > 시설관리 > 체육시설 > 상세보기 > 운영정보 관리 end -->