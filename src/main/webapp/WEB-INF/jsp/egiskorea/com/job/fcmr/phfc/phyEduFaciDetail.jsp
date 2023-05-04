<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

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
</script>

<!-- 업무 > 시설관리 > 체육시설 > 상세보기 -->
<div class="popup-header">체육시설 상세보기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
					<table class="data-write">
						<tbody>
							<tr>
								<th scope="row">관리번호</th>
								<td>
									<c:out value="${result.gid}"></c:out>
								</td>
								<th scope="row">데이터 기준일 </th>
								<td>
									<fmt:parseDate value="${result.lastModfDt}" var="dateFmt" pattern="yyyy-MM-dd HH:mm:ss"/>
									<fmt:formatDate value="${dateFmt}"  pattern="yyyy-MM-dd"/>											
								</td>
							</tr>
							<tr>
								<th scope="row">시설명</th>
								<td colspan="3"><c:out value="${result.fcltyNm}"></c:out></td>												
							</tr>
							<tr>
								<th scope="row">주소</th>
								<td colspan="3">
									<div class="form-row">
										<div class="col"><c:out value="${result.adres}"></c:out></div> 
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">시설유형</th>
								<td>
									<c:set var="fcltyTy" value="${result.fcltyTy}" />
									<c:choose>
										<c:when test='${fcltyTy eq "ALSFC01"}'>
											게이트볼장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC02"}'>
											국궁장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC03"}'>
											그라운드골프장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC04"}'>
											농구장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC05"}'>
											다목적강당								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC06"}'>
											다목적운동장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC07"}'>
											다목적체육관								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC08"}'>
											배드민턴장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC09"}'>
											볼링장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC10"}'>
											생활체육관								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC11"}'>
											수영장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC12"}'>
											스쿼시장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC13"}'>
											씨름장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC14"}'>
											야구장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC15"}'>
											육상경기장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC16"}'>
											인공암벽장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC17"}'>
											인라인스케이트장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC18"}'>
											족구장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC19"}'>
											체육관								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC20"}'>
											축구장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC21"}'>
											탁구장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC22"}'>
											테니스장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC23"}'>
											파크골프장								
										</c:when>
										<c:when test='${fcltyTy eq "ALSFC24"}'>
											풋살장								
										</c:when>
										<c:otherwise>
											${result.fcltyTy}
										</c:otherwise>
									</c:choose>
								</td>
								<th scope="row">운영방식</th>
								<td>
									<c:out value="${result.operMthd}"></c:out>
								</td>
							</tr>
							<tr>
								<th scope="row">건립비용(백만원)</th>
								<td>
									<c:out value="${result.ercCt}"></c:out>
								</td>
								<th scope="row">설립일자</th>
								<td>
									<c:out value="${result.fondDe}"></c:out>
								</td>
							</tr>
							<tr>
								<th scope="row">건물면적(㎡)</th>
								<td>
									<c:out value="${result.buldSize}"></c:out>
								</td>
								<th scope="row">토지면적(㎡)</th>
								<td>
									<c:out value="${result.ladSize}"></c:out>
								</td>
							</tr>
							<tr>
								<th scope="row">관리인원(명)</th>
								<td>
									<c:out value="${result.manageNmpr}"></c:out>
								</td>
								<th scope="row">연간이용인원(명)</th>
								<td>
									<c:out value="${result.fyerUtlztnNmpr}"></c:out>
								</td>
							</tr>											
							<tr>
								<th scope="row">담당자</th>
								<td colspan="3">
									<div class="form-row">
										<div class="col"><c:out value="${result.chrgDeptNm}"></c:out></div>
										<div class="col"><c:out value="${result.chargerNm}"></c:out></div>
										<div class="col"><c:out value="${result.cttpcTelno}"></c:out></div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">시설물개요</th>
								<td colspan="3"><c:out value="${result.fcltySumry}"></c:out></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="position-bottom btn-wrap">
				<div class="position-bottom btn-wrap justify-content-between">
					<button type="button" class="btn basic bi-list" id ="sportsMng" name="sportsMng" onclick="getPhyMngView(<c:out value="${result.gid}"/>)">운영정보 관리</button>
					<button type="button" class="btn basic bi-list" id ="sportsFacMng" name ="sportsFacMng" style="left: -35px;" onclick="getPhyFaciMngView(<c:out value="${result.gid}"/>)">시설정보 관리</button>
					<button type="button" class="btn basic bi-edit" id="lampUpdate" style="right: -70px;" onclick="updatePhyEduFaciView(<c:out value="${result.gid}"></c:out>)">수정</button> 
					<button type="button" class="btn basic bi-delete2" id ="deleteSports" style="right: -35px;" onclick="deletePhyEduFaci(<c:out value="${result.gid}"></c:out>)">삭제</button>
					<button type="button" class="btn basic bi-cancel" onclick="closePhyEduFaciPopup();">취소</button>
				</div>
			</div>							
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="closeInsertPhyFaci();"></button> -->
<button type="button" class="phy-popup-close" title="닫기" onclick="closePhyEduFaciPopup();"></button>	
<!-- 업무 > 시설관리 > 체육시설 > 상세보기 end -->