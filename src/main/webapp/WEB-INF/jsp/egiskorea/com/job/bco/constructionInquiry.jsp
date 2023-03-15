<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!-- 공사예정정보 -->
<script src="/js/egiskorea/com/job/bco/cwi.js"></script>

<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>

<script type="text/javascript">
ui.callDatePicker();

var rePnrsAt = "<c:out value='${nomalList.pnrsAt}'></c:out>";

//차수 조회내용(초기 1차 내용)
var orderInfoInquiry = ${orderInfo};

//차수 리스트 내용
var orderListInquiry = ${orderListInfo};

//공통 공사내역 코드 내용
var codeList = ${codeList};

// 공통 공사내역 상세코드 내용
var codeDtlList = ${codeDtlList};

//공통 공사내역 상세코드 내용
var dtlListCode = ${dtlListCode};



</script>
<!-- 공사예정정보 -->
	<p class="cont-tit">공사예정정보 상세</p>
	<div class="scroll-y" id="innerConstructionPL">
		<p class="cont-stit">기본정보</p>
		<div class="data-default">
			<table class="data-write">
				<colgroup>
					<col style="width: 20%;">
					<col style="width: auto;">   
				</colgroup>
				<tbody>
					<tr>
						<th scope="row">공사명</th>
						<td>
							<div class="form-row">
								<div class="col"><c:out value="${nomalList.cntrkNm}" /></div> 
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공사예정<br>활용여부</th>
						<td>
							<span class="form-radio text group">
								<span><c:out value='${nomalList.pnrsAt}'></c:out></span>
								<!-- <span><input type="radio" name="rChk1" id="rChk1_1" onclick="return(false);"><label for="rChk1_1">Y</label></span>
								<span><input type="radio" name="rChk1" id="rChk1_2" onclick="return(false);"><label for="rChk1_2">N</label></span> -->
							</span>
						</td>
					</tr>
					<tr>
						<th scope="row">공사기간/차수</th>
						<td>
							<div class="form-row">
								<div class="col">
									<c:out value='${nomalList.plnYear}' /> / <c:out value='${nomalList.plnQu}' /> / <c:out value='${nomalList.cntrkOdr}차' />
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">담당자</th>
						<td>
							<div class="form-row">
								<div class="col">
									<c:out value='${nomalList.chpsnPsitn}' /> , <c:out value='${nomalList.chpsnNm}' /> , <c:out value='${nomalList.chpsnCttpc}' /> 
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공사개요</th>
						<td><textarea name="" id="" class="form-control" style="height: 140px;" readonly><c:out value='${nomalList.cntrkOtl}'></c:out></textarea></td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="cont-stit">차수별 공사정보</p>
		<div class="data-default">
			<table class="data-write">
				<colgroup>
					<col style="width: 20%;">
					<col style="width: auto;">
					<col style="width: 20%;">
					<col style="width: auto;">
				</colgroup>
				<tbody id="tbCwiOrdInfo">
					<tr>
						<th scope="row">공사차수</th>
						<td colspan="3">
							<select name="cntrkOdr" id="cntrkOdrDtlCwi" class="form-select w-auto" data-cntrkPrrngId="<c:out value='${nomalList.cntrkPrrngId}' />">
								<c:forEach items="${orderList}" var="ordList" varStatus="status">
									<option value="<c:out value='${ordList.cntrkOdr}' />" ><c:out value="${ordList.cntrkOdr}차" /></option>																
								</c:forEach>	
							</select>
						</td>
					</tr>
					<tr>
						<th scope="row">공사구간</th>
						<td colspan="3">
							<span name="cntrkSctnTy" id="cntrkSctnTy"></span>
						</td>
					</tr>
					<tr>
						<th scope="row">공사위치</th>
						<td colspan="3">
							<span name="cntrkLcAdres" id="cntrkLcAdres"></span>
						</td>
					</tr>
					<tr>
						<th scope="row">공사기간</th>
						<td colspan="3">
							<span name="cntrkDays" id="cntrkDays"></span>
						</td>
					</tr>
					
					<tr>
						<th scope="row" rowspan="11" name="thRow">공사내역</th>
						<td rowspan="11" name="tdRow">
							<span name="cntrkDtls" id="cntrkDtls"></span>
						</td>
						<th scope="row" class="no-bg border-left align-left" name="thFastRow"></th>
						<td class="align-center" name="tdFastRow"></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="data-default">
			<table class="data-list tbl-all-center">
				<colgroup>
					<col style="width: 15%;">
					<col style="width: auto;">
					<col style="width: auto;">
				</colgroup>
				<thead>
					<tr>
						<th colspan="col">차수</th>
						<th colspan="col">공사위치</th>
						<th colspan="col">공사기간</th>
					</tr>
				</thead>
				<tbody name="tbodyOdrInfo">
					<c:choose>
						<c:when test="${empty orderList}">
							<td colspan="3">데이터가 없습니다.</td>
						</c:when>
						<c:otherwise>
							<c:forEach items="${orderList}" var="ordList" varStatus="status">
								<tr data-cntrkPrrngId=<c:out value="${ordList.cntrkPrrngId}" />  data-lon=<c:out value="${ordList.lon}" />  data-lat=<c:out value="${ordList.lat}" /> >
									<td><c:out value="${ordList.cntrkOdr}차" /></td>
									<td><c:out value="${ordList.cntrkLcAdres}" /></td>
									<td><c:out value="${ordList.cntrkBeginDe}" /> ~ <c:out value="${ordList.cntrkEndDe}" /></td>
								</tr>																
							</c:forEach>
						</c:otherwise>					
					</c:choose>											
				</tbody>
			</table>
		</div>
		<div class="btn-wrap justify-content-start"></div>
	</div>
	<form:form name="dtlInfoInquiryForm" id="dtlInfoInquiryForm" method="post" onsubmit="return false;">
			<input type="hidden" id="plnYear" name="plnYear" value="<c:out value='${searchVO.plnYear}' />">
			<input type="hidden" id="plnQu" name="plnQu" value="<c:out value='${searchVO.plnQu}' />">
			<input type="hidden" id="cntrkTy" name="cntrkTy" value="<c:out value='${searchVO.cntrkTy}' />">
			<input type="hidden" id="chpsnPsitn" name="chpsnPsitn" value="<c:out value='${searchVO.chpsnPsitn}' />">
			<input type="hidden" id="cntrkLcAdres" name="cntrkLcAdres" value="<c:out value='${searchVO.cntrkLcAdres}' />">
			<input type="hidden" id="cntrkNm" name="cntrkNm" value="<c:out value='${searchVO.cntrkNm}' />">
			<input type="hidden" id="chpsnNm" name="chpsnNm" value="<c:out value='${searchVO.chpsnNm}' />">
			<input type="hidden" id="pageIndex" name="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
			
			<input type="hidden" id="plnYearSp" name="plnYearSp" value="<c:out value='${searchVO.plnYearSp}' />">
			<input type="hidden" id="plnQuSp" name="plnQuSp" value="<c:out value='${searchVO.plnQuSp}' />">
			<input type="hidden" id="cntrkLcAdresSp" name="cntrkLcAdresSp" value="<c:out value='${searchVO.cntrkLcAdresSp}' />">
			<input type="hidden" id="radius" name="radius" value="<c:out value='${searchVO.radius}' />">
			<input type="hidden" id="geomSp" name="geomSp" value="<c:out value='${searchVO.geomSp}' />">
			<input type="hidden" id="pageType" name="pageType" value="<c:out value='${searchVO.pageType}' />">
		</form:form>
	
	<div class="position-bottom btn-wrap">
		<div><button type="button" class="btn basic bi-list" id="btnCwiCancel">목록</button></div>
	</div>
<!-- //공사예정정보 -->