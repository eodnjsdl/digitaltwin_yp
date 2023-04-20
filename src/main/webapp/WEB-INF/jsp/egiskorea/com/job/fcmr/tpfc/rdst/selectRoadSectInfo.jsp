<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script>
$(".scroll-y").mCustomScrollbar({
    scrollbarPosition: "outside",
});
</script>
<!-- 업무 > 시설관리 > 교통시설 > 도로구간 상세보기 -->
<div class="popup-header">도로구간 상세보기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%; padding-bottom:0px!important;">
			<div class="scroll-y">
				<div class="data-default">
					<table class="data-detail">
						<colgroup>
							<col style="width: 23%;">
							<col style="width: auto;">
							<col style="width: 23%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">도로구간일련번호</th>
								<td>${result.rdsManNo}</td>
								<th scope="row">도로명코드</th>
								<td>${result.rnCd}</td>
							</tr>
							<tr>
								<th scope="row">도로명(한글)</th>
								<td>${result.rn}</td>
								<th scope="row">도로명(영문)</th>
								<td>${result.engRn}</td>
							</tr>
							<tr>
								<th scope="row">고시일자</th>
								<fmt:parseDate value="${result.ntfcDe}" var="dateValue" pattern="yyyyMMdd"/>
								<td><fmt:formatDate value="${dateValue}" pattern="yyyy.MM.dd"/></td>
								<th scope="row">광역도로구분</th>
								<td>${result.rdsManNo}</td>
							</tr>
							<tr>
								<th scope="row">도로위계기능구분</th>
								<td>${result.roaClsSe}</td>
								<th scope="row">도로구간종속구분</th>
								<td>${result.rdsDpnSe}</td>
							</tr>
							<tr>
								<th scope="row">기점</th>
								<td>${result.rbpCn}</td>
								<th scope="row">종점</th>
								<td>${result.repCn}</td>
							</tr>
							<tr>
								<th scope="row">도로폭</th>
								<td>${result.roadBt}</td>
								<th scope="row">도로길이</th>
								<td>${result.roadLt}</td>
							</tr>
							<tr>
								<th scope="row">부여사유</th>
								<td colspan="3">${result.alwncResn}</td>
							</tr>
							<tr>
								<th scope="row">부여일자</th>
								<fmt:parseDate value="${result.alwncDe}" var="dateValue" pattern="yyyyMMdd"/>
								<td><fmt:formatDate value="${dateValue}" pattern="yyyy.MM.dd"/></td>
								<th scope="row">이동일자</th>
								<fmt:parseDate value="${result.mvmnDe}" var="dateValue" pattern="yyyyMMdd"/>
								<td><fmt:formatDate value="${dateValue}" pattern="yyyy.MM.dd"/></td>
							</tr>
							<tr>
								<th scope="row">이동사유</th>
								<td colspan="3">${result.mvmnResn}</td>
							</tr>
							<tr>
								<th scope="row">이동사유코드</th>
								<td>${result.mvmResCd}</td>
								<th scope="row">작업일시</th>
								<fmt:parseDate value="${result.opertDe}" var="dateValue" pattern="yyyyMMddHHmmss"/>
								<td><fmt:formatDate value="${dateValue}" pattern="yyyy.MM.dd HH:mm:ss"/></td>
							</tr>												
						</tbody>
					</table>
				</div>
			</div>
			<div class="position-bottom btn-wrap">
				<div>
					<button type="button" class="btn basic bi-cancel closeSub">취소</button>
				</div>
			</div><!-- // class="position-bottom btn-wrap" -->
		</div>
	</div>
</div>
<button type="button" class="popup-close" title="닫기" onClick="cancelMode();"></button>				
<!-- 업무 > 시설관리 > 교통시설 > 도로구간 상세보기 end -->