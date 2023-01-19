<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="javatime" uri="http://sargue.net/jsptags/time" %>

<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->

				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">클라우드 기반 서버관리</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">클라우드 기반 서버관리 할 수 있는 페이지 입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">

							<div class="cloud-group">
								<div class="cloud-items type01">
									<div class="cloud-header"><p>클라우드 변환 오류 데이터</p></div>
									<div class="cloud-body">
										<div class="tbl-default">
											<table class="tbl-basic">
												<colgroup>
													<col style="width: 5%;">
													<col style="width: auto;">
													<col style="width: 15%;">
													<col style="width: 15%;">
													<col style="width: 20%;">
													<col style="width: 10%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">No</th>
														<th scope="col">데이터명</th>
														<th scope="col">썸네일</th>
														<th scope="col">종류</th>
														<th scope="col">등록일</th>
														<th scope="col">취소</th>
													</tr>
												</thead>
											</table>
											<div class="mCustomScrollbar">
												<table class="tbl-basic">
													<colgroup>
														<col style="width: 5%;">
														<col style="width: auto;">
														<col style="width: 15%;">
														<col style="width: 15%;">
														<col style="width: 20%;">
														<col style="width: 10%;">
													</colgroup>
													<tbody>
														<tr>
															<td>1</td>
															<td>영상 테스트</td>
															<td>썸네일</td>
															<td>영상</td>
															<td>21.10.22 13:46:04</td>
															<td><button type="button" class="btn type07">취소</button></td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>

								<div class="cloud-items type02">
									<div class="cloud-header"><p>클라우드 변환 대기중 데이터</p></div>
									<div class="cloud-body">
										<div class="tbl-default">
											<table class="tbl-basic">
												<colgroup>
													<col style="width: 5%;">
													<col style="width: auto;">
													<col style="width: 15%;">
													<col style="width: 15%;">
													<col style="width: 20%;">
													<col style="width: 10%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">No</th>
														<th scope="col">데이터명</th>
														<th scope="col">썸네일</th>
														<th scope="col">종류</th>
														<th scope="col">등록일</th>
														<th scope="col">취소</th>
													</tr>
												</thead>
											</table>
											<div class="mCustomScrollbar">
												<table class="tbl-basic">
													<colgroup>
														<col style="width: 5%;">
														<col style="width: auto;">
														<col style="width: 15%;">
														<col style="width: 15%;">
														<col style="width: 20%;">
														<col style="width: 10%;">
													</colgroup>
													<tbody>
														<tr>
															<td>1</td>
															<td>영상 테스트</td>
															<td>썸네일</td>
															<td>영상</td>
															<td>21.10.22 13:46:04</td>
															<td><button type="button" class="btn type07">취소</button></td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>

								<div class="cloud-items type03">
									<div class="cloud-header"><p>클라우드 변환 진행중 데이터</p></div>
									<div class="cloud-body">
										<div class="tbl-default">
											<table class="tbl-basic">
												<colgroup>
													<col style="width: 5%;">
													<col style="width: auto;">
													<col style="width: 15%;">
													<col style="width: 15%;">
													<col style="width: 15%;">
													<col style="width: 10%;">
													<col style="width: 10%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">No</th>
														<th scope="col">데이터명</th>
														<th scope="col">종류</th>
														<th scope="col">등록일</th>
														<th scope="col">시작시간</th>
														<th scope="col">진행율</th>														
														<th scope="col">취소</th>
													</tr>
												</thead>
											</table>
											<div class="mCustomScrollbar">
												<table class="tbl-basic">
													<colgroup>
														<col style="width: 5%;">
														<col style="width: auto;">
														<col style="width: 15%;">
														<col style="width: 15%;">
														<col style="width: 15%;">
														<col style="width: 10%;">
														<col style="width: 10%;">
													</colgroup>
													<tbody>
														<tr>
															<td>1</td>
															<td>영상 테스트</td>
															<td>영상</td>
															<td>21.10.22 13:46:04</td>
															<td>21.10.22 13:46:04</td>
															<td>0%</td>
															<td><button type="button" class="btn type07">취소</button></td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>

								<div class="cloud-items type04">
									<div class="cloud-header"><p>클라우드 변환 완료 데이터</p></div>
									<div class="cloud-body">
										<div class="tbl-default">
											<table class="tbl-basic">
												<colgroup>
													<col style="width: 5%;">
													<col style="width: auto;">
													<col style="width: 10%;">
													<col style="width: 15%;">
													<col style="width: 15%;">
													<col style="width: 7%;">
													<col style="width: 10%;">
													<col style="width: 10%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">No</th>
														<th scope="col">데이터명</th>
														<th scope="col">종류</th>
														<th scope="col">등록일</th>														
														<th scope="col">시작시간</th>
														<th scope="col">소요시간</th>
														<th scope="col">지도에서 보기</th>
														<th scope="col">취소</th>
													</tr>
												</thead>
											</table>
											<div class="mCustomScrollbar">
												<table class="tbl-basic">
													<colgroup>
														<col style="width: 5%;">
														<col style="width: auto;">
														<col style="width: 10%;">
														<col style="width: 15%;">
														<col style="width: 15%;">
														<col style="width: 7%;">
														<col style="width: 10%;">
														<col style="width: 10%;">
													</colgroup>
													<tbody>
														<tr>
															<td>1</td>
															<td>영상 테스트</td>
															<td>영상</td>
															<td>21.10.22 13:46:04</td>
															<td>21.10.22 13:46:04</td>
															<td>676m</td>
															<td><button type="button" class="btn type08 bi-location">지도 바로가기</button></td>														
															<td><button type="button" class="btn basic">삭제</button></td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
                            
						</div>
					</div>
				</section>
				<!-- //content -->

<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->