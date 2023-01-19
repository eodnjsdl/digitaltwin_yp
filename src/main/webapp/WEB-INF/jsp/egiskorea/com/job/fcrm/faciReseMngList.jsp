<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/fcrm/fcrm.js"></script>
<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>
<script>
//3d poi
var poiList = ${poiList};

$('.datepickerY-M').datepicker({
	showOn: 'both',
	buttonImage: '/images/icon/form-calendar.svg',
	//buttonText: '클릭하시면 좌측의 텍스트박스에 달력이 열립니다. 달력은 CTRL/COMMAND+방향키로 컨트롤이 가능합니다.'
	changeMonth: true,
	changeYear: true,
	showButtonPanel: true,
	yearSuffix: '',
	}).focus(function () {
		$(".ui-datepicker-calendar").hide();
		$('.ui-datepicker-close').click(function() {
			var month = $(".ui-datepicker-month").val();
			var year = $(".ui-datepicker-year").val();
			$('.datepickerY-M').val($.datepicker.formatDate('yy-mm', new Date(year, month, 1)));
			$("input[name='srchYM']").val($.datepicker.formatDate('yy-mm', new Date(year, month, 1)));
		});
});

var lastSrchYM = "<c:out value='${searchVO.srchYM}' />";
var lastPageIndex = "<c:out value='${searchVO.pageIndex}' />";
$(document).ready(function(){
	if (poiList != "") { //상세보기에서는 안되게 추가 수정해주기.
		setPointLayer();
	}
});
</script>
<form name="searchForm" id="searchForm" method="post" onsubmit="fn_select_list(); return false;">
<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
<input type="hidden" name="srchYM" value="<c:out value='${searchVO.srchYM}' />">
<div class="popup-header">시설예약관리</div>
<div class="popup-body">
	<div class="left-popup-body facility-rsve-mng-body">	
		<div class="srch-box">
			<div class="srch-default">
				<table class="srch-tbl">
					<colgroup>
						<col style="width: 25%;">
						<col style="width: auto;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">년월 선택</th>
							<td>
								<div class="form-row">
									<div class="col">
										<div class="datapicker-group">
											<input type="text" class="datepickerY-M" id="srchYM" value="<c:out value='${searchVO.srchYM}' />" autocomplete='off'>
										</div>
									</div>	
									<div class="col-auto">
										<button type="button" class="btn type01 search" onClick="fn_select_list();">조회</button>
									</div>
								</div>
							</td>
						</tr>												
					</tbody>
				</table>
			</div>
		</div>
		<div class="btn-wrap justify-content-between">
			<div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}" /></strong>건</div>
			<div class="align-right"><button type="button" class="btn bi-write" id="faciRegistViewBtn">등록</button></div>
		</div>

		<div class="rsveMngResult-wrap">
			<div class="scroll-y">
				<ul class="rsveMng-list">
					<c:forEach items="${resultList}" var="resultList" varStatus="status">
					<li>
						<a name="fcrmDtl" class="fcrmDtl" id="<c:out value="${resultList.rsrvSn}" />" data-rsrvsn='<c:out value="${resultList.rsrvSn}" />' data-gid='<c:out value="${resultList.gid}" />' data-lon='<c:out value="${resultList.lon}" />' data-lat='<c:out value="${resultList.lat}" />'>
							<div class="tit"><c:out value="${resultList.fcltyDc}" />(<c:out value="${resultList.asstnFcltyNm}" />)</div>
							<div class="info">
								<p><span>예약일</span><strong><c:out value="${resultList.rsrvDe}" /></strong></p>
								<p><span>예약시간</span><strong><c:out value="${resultList.rsrvStrtTm}" /> ~ <c:out value="${resultList.rsrvEndTm}" /></strong></p>
							</div>
						</a>
					</li>
					</c:forEach>
					<c:if test="${fn:length(resultList) == 0}">
						<div class="align-center">예약정보가 없습니다.</div>
					</c:if>
				</ul>
			</div>
			<div class="pagination">
				<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fn_select_linkPage"/>
			</div>
		</div>
	</div>
</div>
</form>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('시설예약관리')"></button>
<button type="button" class="popup-close" title="닫기" onClick="removeLayer(); cmmUtil.drawClear();"></button>
<button type="button" class="popup-reset" class="초기화" id="fcrmResetBtn" onClick="leftPopupOpen('faciReseMng');"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>				
<!-- //업무 > 시설관리 > 시설예약관리 -->
