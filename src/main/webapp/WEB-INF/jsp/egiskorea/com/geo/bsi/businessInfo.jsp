<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>	
<script>
if("${fn:length(resultList)}" < 1){
	$("#rightPopup").removeClass("opened").html("");
	alert("등록된 업소정보가 없습니다.");
}
</script>
				<!-- 업소정보 -->
					<div class="popup-header">업소정보</div>
					<div class="popup-body">					
						<div class="tool-popup-body">
							<div class="tabBoxDepth1-wrap">
								<div class="scroll-y" style="height: 100%;">
									<c:forEach items="${resultList}" var="result" varStatus="status">
									<h3 class="cont-tit <c:if test="${status.count eq 1 }">marT0</c:if> "><c:out value="${result.bplcNm} "/></h3>
									<div class="data-default">
										<table class="data-list tbl-all-center">
											<colgroup>
												<col style="width: 8%;">
												<col style="width: 15%;">
												<col style="width: 27%;">
												<col style="width: 23%;">
												<col style="width: 27%;">
											</colgroup>
											<tbody>
												<%-- <tr>
													<th scope="row" colspan="2">업소명(전화번호)</th>
													<td colspan="3"><c:out value="${result.bplcNm} "/>(<c:out value="${result.lcTlp} "/>)</td>
												</tr> --%>
												<tr>
													<th scope="row" colspan="2">업소구분</th>
													<td><c:out value="${result.opnnSvcNm} "/></td>
													<th>업태</th>
													<td><c:out value="${result.bizcSeNm} "/></td>
												</tr>
												<tr>
													<th scope="row" colspan="2">지번주소(우편번호)</th>
													<td colspan="3"><c:out value="${result.lcAllAdr} "/>(<c:out value="${result.lcZip} "/>)</td>
												</tr>
												<tr>
													<th scope="row" colspan="2">도로명주소(우편번호)</th>
													<td colspan="3"><c:out value="${result.rdnAllAdr} "/>(<c:out value="${result.rdnZip} "/>)</td>
												</tr>
												<tr>
													<th scope="row" colspan="2">허가일자</th>
													<td colspan="3"><c:out value="${result.aupmDe} "/></td>
												</tr>
											</tbody>
										</table>										
									</div>
									</c:forEach>
								</div>	 
							</div>
						</div>						
					</div>
					<button type="button" class="popup-close" title="닫기"></button>								
				<!-- //업소정보 -->