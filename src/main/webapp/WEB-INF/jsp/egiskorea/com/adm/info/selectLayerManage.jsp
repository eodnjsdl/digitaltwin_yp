<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%pageContext.setAttribute("crlf", "\r\n"); %>

<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->

				<!-- content -->
				<section id="content">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">레이어 관리</h3>
							<p class="page-txt">레이어 목록을 입력 관리 할 수 있는 페이지입니다.</p>
						</div>
					</div>
					
					<div class="row">
						<div class="col-12">
							<div class="bbs-detail-default">
								<table class="bbs-detail">
									<colgroup>
										<col style="width: 20%;">
										<col style="width: 30%;">
										<col style="width: 20%;">
										<col style="width: 30%;"> 
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">분류</th>
											<td colspan="3">
												<c:out value="${layerSet.lyrCl}"/>
											</td>
										</tr>
										<tr>
											<th scope="row">레이어명</th>
											<td>
												<c:out value="${layerSet.lyrNm}" escapeXml="false"/>
											</td>
											<th scope="row">테이블명</th>
											<td>
												<c:out value="${layerSet.tblNm}" escapeXml="false"/>
											</td>
										</tr>
										<tr>
											<th scope="row">타입</th>
											<td>
												<c:out value="${layerSet.lyrKnd}"/>
											</td>
											<th scope="row">데이터량</th>
											<td>
												<c:out value="${dataCount}"/>
											</td>
										</tr>
										<tr>
											<th scope="row">등록자</th>
											<td>
												<c:out value="${layerSet.frstRegisterNm}"/>
											</td>
											<th scope="row">등록일</th>
											<td>
												<c:out value="${layerSet.frstRegistDt}"/>
											</td>
										</tr>
										<tr>
											<th scope="row">갱신형태</th>
											<td>
												<c:out value="${layerSet.rnwlStle}"/>
											</td>
											<th scope="row">갱신주기</th>
											<td>
												<c:out value="${layerSet.rnwlCycle}"/>
											</td>
										</tr>
										<tr>
											<th scope="row">갱신일</th>
											<td>
												<c:out value="${layerSet.lastModfDt}"/>
											</td>
											<th scope="row">공유유형</th>
											<td>
												<c:out value="${layerSet.cnrsStle}"/>
											</td>
										</tr>											
									</tbody>
								</table>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit"></h3>
							<p class="page-txt">속성정보</p>
						</div>
					</div>
					
					<div class="row">
						<div class="col-12">
							<div class="bbs-detail-default">
								<table class="bbs-list">
									<colgroup>
										<col style="width: 23%;">
										<col style="width: 23%;">
										<col style="width: 15%;">
										<col style="width: 15%;">
										<col style="width: auto%;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col">필드명(한글)</th>
											<th scope="col">필드명(영문)</th>
											<th scope="col">타입</th>
											<th scope="col">길이</th>
											<th scope="col">표출여부</th>
										</tr>
									</thead>
									<tbody>
									
									<c:if test="${fn:length(layerAttribute) == 0}">
										<tr>
											<td colspan="5">자료가 없습니다.</td>
										</tr>
									</c:if>
									
									<c:forEach var="resultInfo" items="${layerAttribute}" varStatus="status">
										<tr>
											<td><c:out value="${resultInfo.atrbNm}"/></td>
											<td><c:out value="${resultInfo.atrbId}"/></td>
											<td><c:out value="${resultInfo.atrbType}"/></td>
											<td><fmt:parseNumber value="${resultInfo.atrbLt}"/></td>
											<td><c:out value="${resultInfo.eprssAt}"/></td>
										</tr>
									</c:forEach>
									
									</tbody>
								</table>
							</div>
							
							<div class="btn-wrap justify-content-center">
								<div>
									<a href="<c:url value='/com/mngr/info/selectLayerManageList.do'/>" class="btn basic">목록</a>
								</div>
							</div>
						</div>
					</div>
					
				</section>
				<!-- //content -->
				
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->