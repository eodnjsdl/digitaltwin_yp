<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- 건축물대장 -->
<div class="popup-header">공유지관리 상세보기</div>
	<div class="popup-body">
		<div class="sub-popup-body">
			<div class="data-write-wrap" style="height: 100%;">
				<div class="data-default">
					<table class="data-list tbl-all-center">
						<colgroup>
							<col style="width: 10%;">
							<col style="width: auto;">
							<col style="width: 10%;">
							<col style="width: 10%;">
							<col style="width: 13%;">
							<col style="width: 13%;">
							<col style="width: auto;">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">대장종류</th>
								<th scope="col">건물명</th>
								<th scope="col">동명</th>
								<th scope="col">주용도</th>
								<th scope="col">연면적(㎡)</th>
								<th scope="col">승인일자</th>
								<th scope="col">지번주소</th>
							</tr>
						</thead>
					</table>	
					<div class="scroll-y" style="height: 150px;">
					<table class="data-list tbl-all-center">
						<colgroup>
							<col style="width: 10%;">
							<col style="width: auto;">
							<col style="width: 10%;">
							<col style="width: 10%;">
							<col style="width: 13%;">
							<col style="width: 13%;">
							<col style="width: auto;">
						</colgroup>	
						<tbody>
							<c:choose>
								<c:when test="${fn:length(resultListm) > 0}">
								<c:forEach items="${resultListm}" var="result" varStatus="status">
									<tr class="br-title" data-mgmBldrgstPk="${result.mgmBldrgstPk}">
										<td><c:out value="${result.regstrKindCdNm}" /></td>
										<td><c:out value="${result.bldNm}" /></td>
										<td><c:out value="${result.dongNm}" /></td>
										<td><c:out value="${result.mainPurpsCdNm}" /></td>
										<td><c:out value="${result.totArea}" /></td>
										<td><c:out value="${result.useAprDay}" /></td>
										<td><c:out value="${result.platPlc}" /></td>
									</tr>														
								</c:forEach>
								</c:when>
								<c:otherwise>
									<tr>
										<td colspan="7">정보가 없습니다.</td>
									</tr>	
								</c:otherwise>
							</c:choose>	
						</tbody>
					</table>										
					</div>		
				</div>
			
			<div class="scroll-y" style="height: 65%;">
				<h4 class="cont-stit">상세내용</h4>
				<c:choose>
					<c:when test="${fn:length(resultListm) > 0}">
						<c:forEach items="${resultListm}" var="result" varStatus="status">
							<div class="br-detail ${result.mgmBldrgstPk}" style="display: none;">
								<div class="data-default">
									<table class="data-detail">
										<colgroup>
											<col style="width: 30%;">
											<col style="width: 30%;">
											<col style="width: 30%;">
											<col style="width: 30%;">
										</colgroup>
										<tbody>
											<tr>
												<th scope="row">지번주소</th>
												<td><c:out value="${result.platPlc}" /></td>
												<th scope="row">도로명주소</th>
												<td><c:out value="${result.newPlatPlc}" /></td>
											</tr>
											<tr>
												<th scope="row">동명칭</th>
												<td><c:out value="${result.dongNm}" /></td>
												<th scope="row">양성화여부</th>
												<td>-</td>
											</tr>
											<tr>
												<th scope="row">대지면적(㎡)</th>
												<td><c:out value="${result.platArea}" /></td>
												<th scope="row">주/부속구분</th>
												<td><c:out value="${result.mainAtchGbCdNm}" /></td>
											</tr>
											<tr>
												<th scope="row">건폐율(%)</th>
												<td><c:out value="${result.bcRat}" /></td>
												<th scope="row">연면적(㎡)</th>
												<td><c:out value="${result.totArea}" /></td>
											</tr>
											<tr>
												<th scope="row">용적율 산정연면적(㎡)</th>
												<td><c:out value="${result.vlRatEstmTotArea}" /></td>
												<th scope="row">용적율(%)</th>
												<td><c:out value="${result.vlRat}" /></td>
											</tr>
											<tr>
												<th scope="row">구조</th>
												<td><c:out value="${result.strctCdNm}" /></td>
												<th scope="row">구조(기타)</th>
												<td><c:out value="${result.etcStrct}" /></td>
											</tr>
											<tr>
												<th scope="row">주용도</th>
												<td><c:out value="${result.mainPurpsCdNm}" /></td>
												<th scope="row">용도(기타)</th>
												<td><c:out value="${result.etcPurps}" /></td>
											</tr>
											<tr>
												<th scope="row">지붕</th>
												<td><c:out value="${result.roofCdNm}" /></td>
												<th scope="row">지붕(기타)</th>
												<td><c:out value="${result.etcRoof}" /></td>
											</tr>
											<tr>
												<th scope="row">세대수</th>
												<td><c:out value="${result.hhldCnt}" /></td>
												<th scope="row">가구수</th>
												<td><c:out value="${result.fmlyCnt}" /></td>
											</tr>
											<tr>
												<th scope="row">높이</th>
												<td><c:out value="${result.heit}" /></td>
												<th scope="row">지상층수</th>
												<td><c:out value="${result.grndFlrCnt}" /></td>
											</tr>
											<tr>
												<th scope="row">지하층수</th>
												<td><c:out value="${result.ugrndFlrCnt}" /></td>
												<th scope="row">승용승강기대수</th>
												<td><c:out value="${result.rideUseElvtCnt}" /></td>
											</tr>
											<tr>
												<th scope="row">비상용승강기대수</th>
												<td><c:out value="${result.emgenUseElvtCnt}" /></td>
												<th scope="row">총동연면적</th>
												<td><c:out value="${result.totDongTotArea}" /></td>
											</tr>
											<tr>
												<th scope="row">옥외기계식주차대수</th>
												<td><c:out value="${result.oudrMechUtcnt}" /></td>
												<th scope="row">옥외기계식주차면적</th>
												<td><c:out value="${result.oudrMechArea}" /></td>
											</tr>
											<tr>
												<th scope="row">옥내자주식주차대수</th>
												<td><c:out value="${result.indrAutoUtcnt}" /></td>
												<th scope="row">옥내자주식주차면적</th>
												<td><c:out value="${result.indrAutoArea}" /></td>
											</tr>
											<tr>
												<th scope="row">옥외자주식주차대수</th>
												<td><c:out value="${result.oudrAutoUtcnt}" /></td>
												<th scope="row">옥외자주식주차면적</th>
												<td><c:out value="${result.oudrAutoArea}" /></td>
											</tr>
											<tr>
												<th scope="row">허가일</th>
												<td><c:out value="${result.pmsDay}" /></td>
												<th scope="row">착공일</th>
												<td><c:out value="${result.stcnsDay}" /></td>
											</tr>
											<tr>
												<th scope="row">사용승인일</th>
												<td><c:out value="${result.useAprDay}" /></td>
												<th scope="row">허가번호</th>
												<td><c:out value="${result.pmsnoYear}" />-<c:out value="${result.pmsnoKikCdNm}" />-<c:out value="${result.pmsnoYear}" /></td>
											</tr>
										</tbody>
									</table>										
								</div>
							</div>
						</c:forEach>
					</c:when>
					<c:otherwise>
						<div class="data-default">
							<table class="data-detail">
								<colgroup>
									<col style="width: 20%;">
									<col style="width: 30%;">
									<col style="width: 20%;">
									<col style="width: 30%;">
								</colgroup>
								<tr>
									<td colspan="4" style="text-align: center;">정보가 없습니다.</td>
								</tr>
							</table>
						</div>	
					</c:otherwise>
				</c:choose>	
				
				<h4 class="cont-stit">층별현황</h4>
				<div class="data-default">
					<table class="data-detail tbl-all-center">
						<colgroup>
							<col style="width: 9%;">
							<col style="width: 9%;">
							<col style="width: auto;">
							<col style="width: auto;">
							<col style="width: 13%;">
							<col style="width: 13%;">
							<col style="width: 12%;">
							<col style="width: 12%;">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">구분</th>
								<th scope="col">층명</th>
								<th scope="col">구조</th>
								<th scope="col">기타구조</th>
								<th scope="col">주용도</th>
								<th scope="col">기타용도</th>
								<th scope="col">면적(㎡)</th>
								<th scope="col">주부속구분</th>
							</tr>
						</thead>
						<tbody>
							<c:if test="${fn:length(resultList1) > 0}">
								<c:forEach items="${resultList1}" var="result" varStatus="status">
								
									<tr class="br-floorStatus ${result.mgmBldrgstPk}" style="display: none;">
										<td><c:out value="${result.flrGbCdNm}" /></td>
										<td><c:out value="${result.flrNoNm}" /></td>
										<td><c:out value="${result.strctCdNm}" /></td>
										<td><c:out value="${result.etcStrct}" /></td>
										<td><c:out value="${result.mainPurpsCdNm}" /></td>
										<td><c:out value="${result.etcPurps}" /></td>
										<td><c:out value="${result.area}" /></td>
										<td><c:out value="${result.mainAtchGbCdNm}" /></td>
									</tr>
									
								</c:forEach>
							</c:if>
							<c:if test="${fn:length(resultList1) == 0}">
								<tr>
									<td colspan="8">정보가 없습니다.</td>
								</tr>
							</c:if>
						</tbody>
					</table>										
				</div>
				
				
				<h4 class="cont-stit">관련지번현황</h4>
				<div class="data-default">
					<table class="data-list tbl-all-center">
						<colgroup>
							<col style="width: 50%;">
							<col style="width: 50%;">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">지번주소</th>
								<th scope="col">도로명주소</th>
							</tr>
						</thead>
						<tbody>
							<c:if test="${fn:length(resultList2) > 0}">
								<c:forEach items="${resultList2}" var="result" varStatus="status">
									<tr class="br-platPlcStatus ${result.mgmBldrgstPk} idx_${status.index}" style="display: none;">
										<td><c:out value="${result.platPlc}" /></td>
										<td><c:out value="${result.newPlatPlc}" /></td>
									</tr>
								</c:forEach>
							</c:if>
							<c:if test="${fn:length(resultList2) == 0}">
								<tr>
									<td colspan="2">정보가 없습니다.</td>
								</tr>
							</c:if>
						</tbody>
					</table>										
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="popup-close" title="닫기"></button>	
<!-- //건축물대장 -->
<style type="text/css">
.br-floorStatus td { word-break: break-all;}
</style>
<script>
$(".br-title").on("click", function () {
    
	//행 활성화 표시
	$(".br-title").css("background", "none");
	$(this).css("background", "aliceblue");
	
	//상세내용 바꾸기
	var mgmBldrgstPk = $(this).data('mgmbldrgstpk');
	
	$(".br-detail").css("display", "none");
	$(".br-detail").each(function(index, item) {
		if($(this).hasClass(mgmBldrgstPk)){
			if($(item).css("display") == "none"){
				$(item).show();
			}					
		}
	});
	
	//층별현황 바꾸기
	$(".br-floorStatus").css("display", "none");
	$(".br-floorStatus").each(function(index, item) {
		if($(this).hasClass(mgmBldrgstPk)){
			if($(item).css("display") == "none"){
				$(item).show();
			}					
		}
	});
	
	//관련지번현황 바꾸기
	$(".br-platPlcStatus").css("display", "none");
	$(".br-platPlcStatus").each(function(index, item) {
		if($(this).hasClass(mgmBldrgstPk)){
			if($(item).css("display") == "none"){
				$(item).show();
				return false;	//하나만 출력
			}					
		}
	});
	
});

$(".br-title").eq(0).trigger("click");
</script>