<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<script src="/js/egiskorea/com/job/spor/spor.js"></script>
<script src="/js/egiskorea/com/job/spor/sporMng.js"></script>

<script>

$(".scroll-y").mCustomScrollbar({
	scrollbarPosition:"outside"
});

//체육시설 운영정보목록 페이징
function test(pageNo){
	var gid = $('#gid').val();
	
// 	console.log(gid)
	sportsMngViewPaging(pageNo, gid);
}
</script>

<!-- 업무 > 시설관리 > 체육시설 > 운영정보 관리 -->
<!-- 				<div class="popup-panel popup-sub work-02-04-regist" style="bottom: 398px;right: 70px;width: 550px;height: 459px;"> -->
<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="test">
	<div class="popup-header">체육시설 > 운영정보 관리</div>
	<div class="popup-body">
		<div class="sub-popup-body">
			<div class="data-write-wrap" style="height: 100%;">
				<div class="">
					<div class="data-default">
						<table class="data-write">
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
											<option value="2022">2022</option>
											<option value="2021">2021</option>
											<option value="2020">2020</option>
											<option value="2019">2019</option>
											<option value="2018">2018</option>
											<option value="2017">2017</option>
											<option value="2016">2016</option>
											<option value="2015">2015</option>
											<option value="2014">2014</option>
											<option value="2013">2013</option>
											<option value="2012">2012</option>
											<option value="2011">2011</option>
											<option value="2010">2010</option>
										</select>
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
						<button type="button" class="btn basic bi-delete2" onclick="deleteSportsMng();">선택삭제</button>
					</div>
					<div>
						<button type="button" class="btn basic bi-write2" onclick="insertSportsMngInfo('${gid}');">등록</button>
						<button type="button" class="btn basic bi-cancel" onclick="backDetail('${gid}', '${sportsVO.lon }', '${sportsVO.lat }');">취소</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기"></button>				
</div>
<!-- //업무 > 시설관리 > 체육시설 > 운영정보 관리 -->