<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script>
// 닫기
$("#rightSubPopup .popup-close").unbind('click').bind('click',function() {
	// 등록, 상세, 수정 팝업 창 닫기
	if ($("#rightSubPopup").hasClass("opened")) {
		$("#rightSubPopup").removeClass("opened");
		$("#rightSubPopup").empty();
	}
});
</script>
	<div class="popup-header">관내업소정보조회 상세보기</div>
	<div class="popup-body">
		<div class="sub-popup-body">
			<div class="scroll-y" style="height: 100%;">
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
								<th scope="row">관리번호</th>
								<td style="word-break:break-all"><c:out value="${result.mngNo}" /></td>
								<th scope="row">업태구분명</th>
								<td><c:out value="${result.bizcSeNm}" /></td>
							</tr>
							<tr>
								<th scope="row">인허가일자</th>
								<td><c:out value="${result.aupmDe}" /></td>
								<th scope="row">인허가취소일자</th>
								<td><c:out value="${result.aupmCanlDe}" /></td>
							</tr>																								
							<tr>
								<th scope="row">영업상태구분코드</th>
								<td><c:out value="${result.bsnStaeSeCd}" /></td>
								<th scope="row">영업상태명</th>
								<td><c:out value="${result.bsnStaeNm}" /></td>
							</tr>
							<tr>
								<th scope="row">상세영업상태코드</th>
								<td><c:out value="${result.dealBsnStaeCd}" /></td>
								<th scope="row">상세영업상태명</th>
								<td><c:out value="${result.dealBsnStaeNm}" /></td>
							</tr>
							<tr>
								<th scope="row">폐업일자</th>
								<td><c:out value="${result.cbizDe}" /></td>
								<th scope="row">재개업일자</th>
								<td><c:out value="${result.relcDe}" /></td>
							</tr>
							<tr>
								<th scope="row">소재지전화</th>
								<td><c:out value="${result.lcTlp}" /></td>
								<th scope="row">소재지면적</th>
								<td><c:out value="${result.lcAr}" /></td>
							</tr>
							<tr>
								<th scope="row">소재지우편번호</th>
								<td><c:out value="${result.lcZip}" /></td>
								<th scope="row">도로명우편번호</th>
								<td><c:out value="${result.rdnZip}" /></td>
							</tr>
							<tr>
								<th scope="row">소재지주소</th>
								<td><c:out value="${result.lcAllAdr}" /></td>
								<th scope="row">도로명주소</th>
								<td><c:out value="${result.rdnAllAdr}" /></td>
							</tr>
							<tr>
								<th scope="row">사업장명</th>
								<td><c:out value="${result.bplcNm}" /></td>
								<th scope="row">최종수정시점</th>
								<td><c:out value="${result.lastUpdtPnttm}" /></td>
							</tr>
							<tr>
								<th scope="row">데이터갱신구분</th>
								<td><c:out value="${result.dataUpdtSe}" /></td>
								<th scope="row">데이터갱신일자</th>
								<td><c:out value="${result.dataUpdtDe}" /></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기" onClick="cancelMode();"></button>				
<!-- </div> -->
<!-- //업무 > 공간정보활용 > 관내업소정보조회 > 상세보기 -->
