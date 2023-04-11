<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<script>
$(".scroll-y").mCustomScrollbar({
	scrollbarPosition: "outside"
});

//체육시설 시설정보 목록 페이징
function test(pageNo){
	var gid = $('#gid').val();
	
	phyFaciMngViewPaging(pageNo, gid);
}
</script>

<!-- 업무 > 시설관리 > 체육시설 > 상세보기 > 시설정보 관리 -->
<div class="popup-header">체육시설 > 시설정보 관리</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="">
				<div class="data-default">
					<table id="phyFaciMng" class="data-write">
						<colgroup>
							<col style="width: 23%;">
							<col style="width: auto;">
							<col style="width: 23%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">시설명</th>
								<td colspan="3">
									<input type="text" class="form-control" id="asstn_fclty_nm" name="asstn_fclty_nm" style="width: 74%;margin-right: 2px;">
									<input type="hidden"  name="geom" id="geom" style="width: 74%;margin-right: 2px;">
									<button type="button" class="btn type01 bi-location" id="" onclick="PhyFaciLocationSelect();">지도에서 선택</button>
								</td>
							</tr>
							<tr>
								<th scope="row">운영시간</th>
								<td colspan="3">
									<div class="form-row">
										<div class="col-auto">
											<select name="oper_strt_time" id="oper_strt_time" class="form-select">
												<option value="00">00 시</option>
												<option value="01">01 시</option>
												<option value="02">02 시</option>
												<option value="03">03 시</option>
												<option value="04">04 시</option>
												<option value="05">05 시</option>
												<option value="06">06 시</option>
												<option value="07">07 시</option>
												<option value="08">08 시</option>
												<option value="09">09 시</option>
												<option value="10">10 시</option>
												<option value="11">11 시</option>
												<option value="12">12 시</option>
												<option value="13">13 시</option>
												<option value="14">14 시</option>
												<option value="15">15 시</option>
												<option value="16">16 시</option>
												<option value="17">17 시</option>
												<option value="18">18 시</option>
												<option value="19">19 시</option>
												<option value="20">20 시</option>
												<option value="21">21 시</option>
												<option value="22">22 시</option>
												<option value="23">23 시</option>
											</select>
										</div>
										<div class="col-auto">~</div>
										<div class="col-auto">
											<select name="oper_end_time" id="oper_end_time" class="form-select">
												<option value="00">00 시</option>
												<option value="01">01 시</option>
												<option value="02">02 시</option>
												<option value="03">03 시</option>
												<option value="04">04 시</option>
												<option value="05">05 시</option>
												<option value="06">06 시</option>
												<option value="07">07 시</option>
												<option value="08">08 시</option>
												<option value="09">09 시</option>
												<option value="10">10 시</option>
												<option value="11">11 시</option>
												<option value="12">12 시</option>
												<option value="13">13 시</option>
												<option value="14">14 시</option>
												<option value="15">15 시</option>
												<option value="16">16 시</option>
												<option value="17">17 시</option>
												<option value="18">18 시</option>
												<option value="19">19 시</option>
												<option value="20">20 시</option>
												<option value="21">21 시</option>
												<option value="22">22 시</option>
												<option value="23">23 시</option>
											</select>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">예약여부</th>
								<td>
									<span class="form-radio text group">
										<span><input type="radio" name="rsrv_at" id="rsrv_at_y" value="Y" checked="checked"><label for="rsrv_at_y">Y</label></span>
										<span><input type="radio" name="rsrv_at" id="rsrv_at_n" value="N"><label for="rsrv_at_n">N</label></span>
									</span>
								</td>
								<th scope="row">층(호)수</th>
								<td><input type="text" class="form-control" id="ho_cnt" name="ho_cnt" value="1"></td>
							</tr>
							<tr>
								<th scope="row">시설설명</th>
								<td colspan="3"><input type="text" class="form-control" id="fclty_dc" name="fclty_dc"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="data-list-wrap marT10" style="height: 169px;">
					<div class="data-default" style="height: 80%">
						<table class="data-list tbl-all-center">
							<colgroup>
								<col style="width: 36px;">
								<col style="width: 7%;">
								<col style="width: 15%;">											
								<col style="width: 15%;">
								<col style="width: 13%;">
								<col style="width: 13%;">
								<col style="width: auto;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="sporFacChkAll" id="sporFacChkAll" value="sporFacChkAll"><label for="sporFacChkAll"></label></span></span></th>
									<th scope="col">No</th>
									<th scope="col">시설명</th>
									<th scope="col">운영시간</th>
									<th scope="col">예약여부</th>
									<th scope="col">층(호)수</th>
									<th scope="col">시설설명</th>
								</tr>
							</thead>												
						</table>
						<div class="scroll-y" style="overflow: auto;">
							<table class="data-list tbl-all-center">
								<colgroup>
									<col style="width: 36px;">
									<col style="width: 7%;">
									<col style="width: 15%;">											
									<col style="width: 15%;">
									<col style="width: 13%;">
									<col style="width: 13%;">
									<col style="width: auto;">
								</colgroup>
								<tbody>
									<c:forEach items="${sportsList}" var="sporList" varStatus="status">
										<tr>
											<td><span class="form-checkbox"><span><input type="checkbox" name="sporFacMngcheck" id="${sporList.asstnFcltySn}" value ="${sporList.asstnFcltySn}"><label for="${sporList.asstnFcltySn}"></label></span></span></td>
											<td><c:out value="${sporList.asstnFcltySn}"></c:out></td>
											<td><c:out value="${sporList.asstnFcltyNm}"></c:out></td>
											<td><c:out value="${sporList.operStrtTime}~${sporList.operEndTime}"></c:out></td>
											<td><c:out value="${sporList.rsrvAt}"></c:out></td>
											<td><c:out value="${sporList.hoCnt}층"></c:out></td>
											<td><c:out value="${sporList.fcltyDc}"></c:out></td>
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
				<div class="position-absolute left"><button type="button" class="btn basic bi-delete2" onclick="deletePhyFaciMng();">선택삭제</button></div>
				<div>
					<button type="button" class="btn basic bi-write2" onclick="insertPhyFaciMng('${gid}');">등록</button>
					<button type="button" class="btn basic bi-cancel" onclick="backPhyEduFaciDetail('${gid}', '${sportsVO.lon }', '${sportsVO.lat }');">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="popup-close" title="닫기"></button>				
<!-- 업무 > 시설관리 > 체육시설 > 상세보기 > 시설정보 관리 end -->