<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!doctype html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title><spring:message code="site.title" /></title>

		<script src="/js/com/jquery/jquery-3.4.1.min.js"></script>

		<!-- jquery-ui -->
		<script src="/js/com/jquery-ui/jquery-ui.js"></script>
		<link rel="stylesheet" href="/js/com/jquery-ui/jquery-ui.css">

		<!-- mCustomScrollbar -->
		<script src="/js/plugin/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
		<link rel="stylesheet" href="/js/plugin/mCustomScrollbar/jquery.mCustomScrollbar.css">

		<!-- rangeslider -->
		<script src="/js/plugin/rangeslider/rangeslider.js"></script>
		<link rel="stylesheet" href="/js/plugin/rangeslider/rangeslider.css">
		
		<!-- colorPicker -->
		<script src="/js/plugin/colorPicker/jquery.minicolors.min.js"></script>
		<link rel="stylesheet" href="/js/plugin/colorPicker/jquery.minicolors.css">
		
		<script src="/js/map-ui.js"></script>
		
		<!-- 공통 파일 -->
		<script src="/js/egiskorea/com/common.js"></script>		
		<!-- 공통도구 관련 -->
		<script src="/js/egiskorea/com/cmt/commonTool.js"></script>
		<!-- 지적 관련 -->
		<script src="/js/egiskorea/com/geo/geographic.js"></script>
		<!-- 레이어 관련 -->
		<script src="/js/egiskorea/com/lyr/layer.js"></script>
		<!-- 업무 관련 -->
		<script src="/js/egiskorea/com/job/job.js"></script>
		<!-- 임시파일 -->
		<script src="/js/egiskorea/com/tmpr/temporary.js"></script>
		<!-- 모듈 테스트 -->
		<script src="/js/egiskorea/com/test/test.js"></script>

		<link rel="stylesheet" href="/css/com/common.css">
		<link rel="stylesheet" href="/css/map.css">

		<!-- engine -->
		<script src="/engine/dt_info.js"></script>
		<script src="/engine/map_control.js"></script>
		<script src="/engine/map_event.js"></script>
		<script src="/engine/map_info.js"></script>
		<script src="/engine/map_layer.js"></script>
		<script src="/engine/ide/proj4js-combined.js"></script>
		<script src="/engine/ide/IDE.js"></script>

		<!-- 2d -->
		<link rel="stylesheet" href="/engine/plugin/v6.7.0/ol.css">
		<script src="/engine/plugin/v6.7.0/ol.js"></script>
		<script src="/engine/2d/App2D.js"></script>
		<script src="/engine/2d/store/Store.js"></script>
		<script src="/engine/2d/map/YMap.js"></script>
		<script src="/engine/2d/ui/MapControl.js"></script>
	</head>
	<body>
	<form:form name="tmpForm" id="tmpForm" method="post">
		<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	</form:form>
		<div id="wrap">

			<!-- header -->
			<header id="header">
				<h1 class="logo"><a href="/index.html"><spring:message code="site.title" /></a></h1>
				<div class="util-box">
					<div class="user"><c:out value="${loginVO.name}" />님 <button type="button" id="userModify" class="user-btn" data-popup="userInfoUdt"></button></div> <button type="button" class="logout-btn" onClick="/uat/uia/logoutAction.do">LOGOUT</button>
				</div>
			</header>
			<!-- //header -->

			<!-- container -->
			<div id="container">

				<!-- 지도영역 : style 임의로 적용. 작업 시 삭제하시면 됩니다. -->
				<canvas id="canvas" style="width: 100%; height: 100%; top: 0px; left: 0px;"></canvas>

				<!-- map-aside -->
				<div id="map-aside">
					<div class="map-tool">
						<ul class="map-tool-list">
							<li><button type="button" id="" class="tool-btn icon01 dataPopup topPopup" data-popup="top-popup01" title="통합행정정보"></button></li>
							<li><button type="button" id="landBuilding" class="tool-btn icon02 dataPopup topPopup" data-popup="top-popup02" title="지적/건물"></button></li>
							<li><button type="button" id="" class="tool-btn icon03 dataPopup topPopup" data-popup="top-popup03" title="내보내기"></button></li>
							<li><button type="button" id="" class="tool-btn icon04 dataPopup topPopup" data-popup="top-popup04" title="메모정보"></button></li>
							<li><button type="button" id="" class="tool-btn icon05 dataPopup topPopup" data-popup="top-popup05" title="사진정보"></button></li>
							<li><button type="button" id="" class="tool-btn icon06 dataPopup topPopup" data-popup="top-popup06" title="즐겨찾기"></button></li>
							<li><button type="button" id="" class="tool-btn icon07 dataPopup topPopup" data-popup="top-popup07" title="지도저장"></button></li>
							<li><button type="button" id="" class="tool-btn icon08 dataPopup topPopup" data-popup="top-popup08" title="그리기도구"></button></li>
							<li><button type="button" id="" class="tool-btn icon09 dataPopup topPopup" data-popup="top-popup09" title="배경지도"></button></li>
							<li><button type="button" id="" class="tool-btn icon10 dataPopup topPopup" data-popup="top-popup10" title="드론영상"></button></li>
						</ul>
					</div>

					<div class="map-board">
						<button type="button" class="bbs-btn notice-btn" data-popup="board-notice" title="공지사항"></button>
						<button type="button" class="bbs-btn qna-btn" data-popup="board-qna" title="게시판"></button>
					</div>

					<div class="map-control">
						<ul>
							<li><button type="button" class="ctrl-btn compass" title="나침반"><span style="transform: rotate(0deg);"></span></button></li>
							<li><button type="button" class="ctrl-btn reset" title="초기화"></button></li>
							<li><button type="button" class="ctrl-btn globe" title="위치 초기화"></button></li>
							<li class="ctrl-group">
								<button type="button" class="ctrl-btn location" title="위치"></button>
								<button type="button" class="ctrl-btn distance" title="거리"></button>
								<button type="button" class="ctrl-btn measure" title="면적"></button>
								<button type="button" class="ctrl-btn radius" title="반경"></button>
							</li>
							<li><button type="button" class="ctrl-btn scaleUp" onclick="mapZoomControlPlusRe()" title="확대"></button>
								<button type="button" class="ctrl-btn scaleDown" onclick="mapZoomControlMinusRe()" title="축소"></button>
							</li>
						</ul>

						<div class="map-type">
							<span class="knobs">
								<span><input type="radio" name="mapType" id="mapType2D" class="mapType2D" value="2D" checked="checked"><label for="mapType2D">2D</label></span>
								<span><input type="radio" name="mapType" id="mapType3D" value="3D"><label for="mapType3D">3D</label></span>
							</span>
						</div>
					</div>

					<div class="map-util">
						<div class="addrSelect">
							<select class="form-select2">
								<option value="">지번</option>
								<option value="">도로명</option>
							</select>
							<select class="form-select2">
								<option value="">행정동</option>
								<option value="">강산면</option>
							</select>
							<select class="form-select2">
								<option value="">법정리</option>
								<option value="">경강로</option>
							</select>
							<input type="text" class="form-control" placeholder="지번 입력"> <button type="button" class="search-btn" title="검색"></button>
						</div>

						<!-- 좌표, 축적 -->
						<div class="coordinates">
							<div class="coordi-header">
								<div>
									<span class="x">127.47609649416934</span>
									<span class="y">37.49284379468381</span>
								</div>
								<button type="button" class="btn btn-sm type04">이동</button>
							</div>
							<div class="coordi-body">
								<div class="items">
									<h2>위도,경도 (DMS)</h2>
									<div class="row">
										<div class="c-col">
											<div class="dms-row">
												<span><input type="text" class="form-control"><span class="form-text">도</span></span>
												<span><input type="text" class="form-control"><span class="form-text">분</span></span>
												<span><input type="text" class="form-control"><span class="form-text">초</span></span>
												<span class="form-dash">,</span>
											</div>
										</div>
										<div class="c-col">
											<div class="dms-row">
												<span><input type="text" class="form-control"><span class="form-text">도</span></span>
												<span><input type="text" class="form-control"><span class="form-text">분</span></span>
												<span><input type="text" class="form-control"><span class="form-text">초</span></span>
											</div>
										</div>
									</div>
								</div>
								<div class="items">
									<h2>위도,경도 (Degree)</h2>
									<div class="row">
										<div class="c-col"><input type="text" class="form-control"></div>
										<div class="c-col"><input type="text" class="form-control"></div>
									</div>
								</div>
								<div class="items">
									<h2>사용자정의</h2>
									<div class="row">
										<div class="c-col">
											<select class="form-select3" name="" id="">
												<option value="">EPSG : 5179</option>
												<option value="">EPSG : 5179</option>
												<option value="">EPSG : 5179</option>
											</select>
										</div>
									</div>
									<div class="row">
										<div class="c-col"><input type="text" class="form-control"></div>
										<div class="c-col"><input type="text" class="form-control"></div>
										<div><button type="button" class="btn btn-sm type03">적용</button></div>
									</div>
								</div>
							</div>
							<script>
								$( function() {
									$(".coordi-header > div").click(function(){
										$(".coordinates").toggleClass("active");
									});
								});
							</script>
						</div>
						<!-- //좌표, 축적 -->
					</div>
				</div>
				<!-- //map-aside -->

				<!-- 범례 -->
				<div class="legend-panel">
					<div class="legend-header"><p class="tit">범례</p></div>
					<div class="legend-body">
						<div class="legend-group">
							<div class="legend-items">
								<ul>
									<li><span class="legend"><img src="/images/legend/legend-cate01.svg" alt=""></span> 상수관로</li>
									<li><span class="legend"><img src="/images/legend/legend-cate02.svg" alt=""></span> 하수관로</li>
									<li><span class="legend"><img src="/images/legend/legend-cate03.svg" alt=""></span> 천연가스관로</li>
									<li><span class="legend"><img src="/images/legend/legend-cate04.svg" alt=""></span> 통신관로</li>
									<li><span class="legend"><img src="/images/legend/legend-cate05.svg" alt=""></span> 전력지중관로</li>
								</ul>
							</div>
							<div class="legend-items">
								<ul class="vertical-list">
									<li><span class="legend"><img src="/images/legend/legend-cate06.svg" alt=""></span> 지하수개발</li>
									<li><span class="legend"><img src="/images/legend/legend-cate07.svg" alt=""></span> 농업용 공공관정</li>
									<li><span class="legend"><img src="/images/legend/legend-cate08.svg" alt=""></span> 지하수이용시설</li>
								</ul>
							</div>
						</div>
					</div>
					<button type="button" class="legend-close" title="닫기"></button>
					<script>
						$(document).ready(function(){
							$(".legend-panel .legend-close").click(function(){
								$(".legend-panel").removeClass("opened");
							});
						});
					</script>
				</div>
				<!-- //범례 -->

				<!-- side -->
				<div id="side">
					<div id="lnb">
						<ul>
							<li data-menu="lnb-search"><button type="button" class="lnb-btn" title="검색"></button></li>
							<li data-menu="lnb-layer"><button type="button" class="lnb-btn" title="레이어"></button></li>
							<li data-menu="lnb-theme"><button type="button" class="lnb-btn" title="주제도"></button></li>
							<li data-menu="lnb-work"><button type="button" class="lnb-btn" title="업무"></button></li>
							<li data-menu="lnb-analysis"><button type="button" class="lnb-btn" title="분석"></button></li>
						</ul>
					</div>

					<!-- 검색 -->
					<div class="lnb-search lnb-cont">
						<%@ include file="/WEB-INF/jsp/egiskorea/com/cmm/search.jsp" %>
					</div>
					<!-- //검색 -->

					<!-- 레이어 -->
					<div class="lnb-layer lnb-cont">
					</div>
					<!-- //레이어 -->

					<!-- 주제도 -->
					<div class="lnb-theme lnb-cont">
						<%@ include file="/WEB-INF/jsp/egiskorea/com/cmm/theme.jsp" %>
					</div>
					<!-- //주제도 -->

					<!-- 업무 -->
					<div class="lnb-work lnb-cont">
						<%@ include file="/WEB-INF/jsp/egiskorea/com/cmm/task.jsp" %>
					</div>
					<!-- //업무 -->
					
					<!-- 분석 -->
					<div class="lnb-analysis lnb-cont">
						<div class="lnb-header"><h2 class="tit">분석</h2></div>
						<div class="lnb-body">
							<ul class="lnb-dep2" id="moduelList">
								<li><button type="button" class="dataPopup" data-popup="analysis-01-01">조망권분석</button></li>
								<li><button type="button" class="dataPopup" data-popup="analysis-01-02">일조권분석</button></li>
								<li><button type="button" class="dataPopup" >가시권분석</button></li>
								<li><button type="button" class="dataPopup" data-popup="analysis-01-04">경사분석</button></li>
								<li><button type="button" class="dataPopup" data-popup="analysis-01-05">AI영상분석</button></li>
								<li><button type="button" class="dataPopup" data-popup="analysis-01-06">지형단면도</button></li>
								<li><button type="button" class="dataPopup" data-popup="analysis-01-07">지하시설단면</button></li>
								<li><button type="button" class="dataPopup" >공간분석</button></li>
							</ul>
						</div>
					</div>
					<!-- //분석 -->
					
					<!-- 국토정보관리 -->
					<div class="lnb-territory lnb-cont">
					</div>
					<!-- //국토정보관리 -->
					
					<div class="side-util">
						<ul>
							<li data-menu="lnb-territory"><button type="button" class="side-btn territory" title="국토정보관리"></button></li>
							<li><button type="button" class="side-btn manager" title="관리자"></button></li>
							<li><button type="button" class="side-btn setting" title="설정"></button></li>
							<li><button type="button" class="side-btn help" title="도움말"></button></li>
						</ul>
					</div>

				</div>
				<!-- //side -->
				
				<!-- left popup-panel -->
				<div id="leftPopup" class="popup-panel popup-left">
				</div>
				<!-- //left popup-panel -->

				<!-- bottom popup-panel -->
				<div id="bottomPopup" class="popup-panel popup-bottom">
				</div>
				<!-- //bottom popup-panel -->
				<!-- //LNB Popup -->

				<!-- right popup-panel -->
				<div id="rightPopup" class="popup-panel popup-right">
				</div>
				<!-- //right popup-panel -->

				<!-- top > 데이터 내보내기 -->
				<div class="popup-panel popup-right top-popup03" style="width: 420px;height: 807px;">
					<div class="popup-header">데이터 내보내기</div>
					<div class="popup-body">

						<div class="tool-popup-body top-dataOut-body">
							<div class="tabBoxDepth1-wrap">
								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="dataOut01" class="on"><button type="button" class="inner-tab">영역기준</button></li>
										<li data-tab="dataOut02"><button type="button" class="inner-tab">시설물 기준</button></li>
									</ul>
								</div>
								<!-- 영역기준 -->
								<div class="tab-cont dataOut01 on">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 30%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row" rowspan="3">검색영역지정</th>
													<td>
														<span class="form-radio text group">
															<span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
															<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
														</span>
													</td>
												</tr>
												<tr>
													<td>
														<span class="drawing-obj small">
															<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
															<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
															<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
															<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
														</span>
													</td>
												</tr>
												<tr>
													<td>경계로부터 <span class="marL5 marR10"><input type="text" class="form-control w-60 align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</td>
												</tr>
												<tr>
													<th scope="row">저장내용</th>
													<td>
														<span class="form-radio text group">
															<span><input type="radio" name="file" id="rChk2-1" checked="checked"><label for="rChk2-1">Shape File</label></span>
															<span><input type="radio" name="file" id="rChk2-2"><label for="rChk2-2">엑셀파일</label></span>
														</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="btn-wrap justify-content-end marT5">
										<div><button type="button" class="btn basic bi-reset">초기화</button></div>
									</div>

									<div class="data-default marT20" style="height: 435px;">
										<table class="data-write">
											<colgroup>
												<col style="width: 10%;">
												<col style="width: auto;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">
														<span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span>
													</th>
													<th scope="col">데이터명</th>
												</tr>
											</thead>
										</table>
										<div class="scroll-y">
											<table class="data-list">
												<colgroup>
													<col style="width: 10%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<td class="align-center"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>건물</td>
													</tr>
													<tr>
														<td class="align-center"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>지적</td>
													</tr>
													<tr>
														<td class="align-center"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>가로등</td>
													</tr>
													<tr>
														<td class="align-center"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>도로</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div class="position-bottom btn-wrap">
										<div><button type="button" class="btn basic bi-out2">내보내기</button></div>
									</div>
								</div>
								<!-- //영역기준 -->

								<!-- 시설물 기준 -->
								<div class="tab-cont dataOut02">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 30%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row" rowspan="2">검색영역지정</th>
													<td>
														<div class="form-row">
															<div class="col">
																<select class="form-select">
																	<option value="">도로면</option>
																</select>
															</div>
															<div class="col-auto"><button type="button" class="btn type01 bi-location">지도에서 선택</button></div>
														</div>
													</td>
												</tr>
												<tr>
													<td>경계로부터 <span class="marL5 marR10"><input type="text" class="form-control w-60 align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</td>
												</tr>
												<tr>
													<th scope="row">저장내용</th>
													<td>
														<span class="form-radio text group">
															<span><input type="radio" name="file" id="rChk2-1" checked="checked"><label for="rChk2-1">Shape File</label></span>
															<span><input type="radio" name="file" id="rChk2-2"><label for="rChk2-2">엑셀파일</label></span>
														</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="btn-wrap justify-content-end marT5">
										<div><button type="button" class="btn basic bi-reset">초기화</button></div>
									</div>

									<div class="data-default marT20" style="height: 471px;">
										<table class="data-list">
											<colgroup>
												<col style="width: 10%;">
												<col style="width: auto;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">
														<span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span>
													</th>
													<th scope="col">데이터명</th>
												</tr>
											</thead>
										</table>
										<div class="scroll-y">
											<table class="data-list">
												<colgroup>
													<col style="width: 10%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<td class="align-center"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>건물</td>
													</tr>
													<tr>
														<td class="align-center"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>지적</td>
													</tr>
													<tr>
														<td class="align-center"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>가로등</td>
													</tr>
													<tr>
														<td class="align-center"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>도로</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div class="position-bottom btn-wrap">
										<div><button type="button" class="btn basic bi-out2">내보내기</button></div>
									</div>
								</div>
								<!-- //시설물 기준 -->
							</div>
						</div>

					</div>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 데이터 내보내기 -->

				<!-- top > 메모정보 -->
				<div class="popup-panel popup-right top-popup04" style="width: 480px;height: 807px;">
					<div class="popup-header">메모정보</div>
					<div class="popup-body">

						<div class="tool-popup-body top-memo-body">
							<div class="srch-box">
								<div class="form-row">
									<div class="col-auto">
										<select class="form-select">
											<option value="">제목</option>
											<option value="">작성자</option>
										</select>
									</div>
									<div class="col"><input type="text" class="form-control"></div>
									<div class="col-auto"><button type="button" class="btn type01 search">조회</button></div>
								</div>
							</div>

							<div class="btn-wrap justify-content-end">
								<div><a href="/contents/top04-regist.html" class="btn bi-write" target="_blank">등록</a></div>
							</div>

							<div class="bbs-top marT10">
								<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
								<div class="list-sort">
									<span class="form-radio text group">
										<span><input type="radio" name="list" id="rChk3-1" checked="checked"><label for="rChk3-1">제목순</label></span>
										<span><input type="radio" name="list" id="rChk3-2"><label for="rChk3-2">최신순</label></span>
									</span>
								</div>
							</div>
							<div class="bbs-list-wrap" style="height: 586px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: 15%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">번호</th>
													<th scope="col">제목</th>
													<th scope="col">작성자</th>
													<th scope="col">등록일</th>
													<th scope="col">공유</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="scroll-y">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: 15%;">
											</colgroup>
											<tbody>
												<tr>
													<td>50</td>
													<td class="align-left"><a href="/contents/top04-detail.html" class="subject" target="_blank">메모1 _입니다.</a></td>
													<td>홍길동</td>
													<td>2021.10.15</td>
													<td>공유</td>
												</tr>
												<tr>
													<td>49</td>
													<td class="align-left"><a href="javascript:void(0);" class="subject">메모1 _입니다.</a></td>
													<td>홍길동</td>
													<td>2021.10.15</td>
													<td>공유</td>
												</tr>
												<tr>
													<td>48</td>
													<td class="align-left"><a href="javascript:void(0);" class="subject">메모1 _입니다.</a></td>
													<td>홍길동</td>
													<td>2021.10.15</td>
													<td>공유</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<div class="pagination">
									<a href="javascript:void(0);" class="first" title="처음"></a>
									<a href="javascript:void(0);" class="prev" title="이전"></a>
									<strong class="current">1</strong>
									<a href="javascript:void(0);">2</a>
									<a href="javascript:void(0);">3</a>
									<a href="javascript:void(0);">4</a>
									<a href="javascript:void(0);">5</a>
									<a href="javascript:void(0);" class="next" title="다음"></a>
									<a href="javascript:void(0);" class="last" title="마지막"></a>
								</div>
							</div>
						</div>

					</div>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 메모정보 -->

				<!-- top > 사진정보 -->
				<div class="popup-panel popup-right top-popup05" style="width: 480px;height: 807px;">
					<div class="popup-header">사진정보</div>
					<div class="popup-body">

						<div class="tool-popup-body">
							<div class="srch-box">
								<div class="form-row">
									<div class="col-auto">
										<select class="form-select">
											<option value="">제목</option>
											<option value="">작성자</option>
										</select>
									</div>
									<div class="col"><input type="text" class="form-control"></div>
									<div class="col-auto"><button type="button" class="btn type01 search">조회</button></div>
								</div>
							</div>

							<div class="btn-wrap justify-content-end">
								<div><a href="/contents/top05-regist.html" class="btn bi-write" target="_blank">등록</a></div>
							</div>

							<div class="bbs-top marT10">
								<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
								<div class="list-sort">
									<span class="form-radio text group">
										<span><input type="radio" name="list" id="rChk3-1" checked="checked"><label for="rChk3-1">제목순</label></span>
										<span><input type="radio" name="list" id="rChk3-2"><label for="rChk3-2">최신순</label></span>
									</span>
								</div>
							</div>
							<div class="bbs-list-wrap" style="height: 586px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: 15%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">번호</th>
													<th scope="col">제목</th>
													<th scope="col">작성자</th>
													<th scope="col">등록일</th>
													<th scope="col">공유</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="scroll-y">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: 15%;">
											</colgroup>
											<tbody>
												<tr>
													<td>50</td>
													<td class="align-left"><a href="/contents/top05-detail.html" class="subject" target="_blank">사진 테스트 1 입니다.</a></td>
													<td>홍길동</td>
													<td>2021.10.15</td>
													<td>공유</td>
												</tr>
												<tr>
													<td>49</td>
													<td class="align-left"><a href="javascript:void(0);" class="subject">사진 테스트 1 입니다.</a></td>
													<td>홍길동</td>
													<td>2021.10.15</td>
													<td>공유</td>
												</tr>
												<tr>
													<td>48</td>
													<td class="align-left"><a href="javascript:void(0);" class="subject">사진 테스트 1 입니다.</a></td>
													<td>홍길동</td>
													<td>2021.10.15</td>
													<td>공유</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<div class="pagination">
									<a href="javascript:void(0);" class="first" title="처음"></a>
									<a href="javascript:void(0);" class="prev" title="이전"></a>
									<strong class="current">1</strong>
									<a href="javascript:void(0);">2</a>
									<a href="javascript:void(0);">3</a>
									<a href="javascript:void(0);">4</a>
									<a href="javascript:void(0);">5</a>
									<a href="javascript:void(0);" class="next" title="다음"></a>
									<a href="javascript:void(0);" class="last" title="마지막"></a>
								</div>
							</div>
						</div>

					</div>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 사진정보 -->

				<!-- top > 즐겨찾기 -->
				<div class="popup-panel popup-right top-popup06" style="width: 480px;height: 807px;">
					<div class="popup-header">즐겨찾기</div>
					<div class="popup-body">

						<div class="tool-popup-body">
							<div class="srch-box">
								<div class="form-row">
									<div class="col"><input type="text" class="form-control"></div>
									<div class="col-auto"><button type="button" class="btn type01 search">조회</button></div>
								</div>
							</div>

							<div class="btn-wrap justify-content-end">
								<div><a href="/contents/top06-regist.html" class="btn bi-write" target="_blank">등록</a></div>
							</div>

							<div class="bbs-top marT10">
								<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
								<div class="list-sort">
									<span class="form-radio text group">
										<span><input type="radio" name="list" id="rChk6-1" checked="checked"><label for="rChk6-1">제목순</label></span>
										<span><input type="radio" name="list" id="rChk6-2"><label for="rChk6-2">최신순</label></span>
									</span>
								</div>
							</div>
							<div class="bbs-list-wrap" style="height: 586px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 20%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">번호</th>
													<th scope="col">제목</th>
													<th scope="col">등록일</th>
													<th scope="col"></th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="scroll-y">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 20%;">
											</colgroup>
											<tbody>
												<tr>
													<td>10</td>
													<td class="subject"><a href="/contents/top06-update.html" class="badge-subject" target="_blank">양평군청 일대 지도사진 <span class="badge basic">기본</span></a></td>
													<td>2021.10.15</td>
													<td><button type="button" class="icon-btn location" title="이동"></button> <button type="button" class="icon-btn edit" title="다시저장"></button></td>
												</tr>
												<tr>
													<td>9</td>
													<td class="subject"><a href="javascript:void(0);">양평군청 일대 지도사진</a></td>
													<td>2021.10.15</td>
													<td><button type="button" class="icon-btn location" title="이동"></button> <button type="button" class="icon-btn edit" title="다시저장"></button></td>
												</tr>
												<tr>
													<td>8</td>
													<td class="subject"><a href="javascript:void(0);">양평군청 일대 지도사진</a></td>
													<td>2021.10.15</td>
													<td><button type="button" class="icon-btn location" title="이동"></button> <button type="button" class="icon-btn edit" title="다시저장"></button></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<div class="pagination">
									<a href="javascript:void(0);" class="first" title="처음"></a>
									<a href="javascript:void(0);" class="prev" title="이전"></a>
									<strong class="current">1</strong>
									<a href="javascript:void(0);">2</a>
									<a href="javascript:void(0);">3</a>
									<a href="javascript:void(0);">4</a>
									<a href="javascript:void(0);">5</a>
									<a href="javascript:void(0);" class="next" title="다음"></a>
									<a href="javascript:void(0);" class="last" title="마지막"></a>
								</div>
							</div>
						</div>

					</div>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 즐겨찾기 -->

				<!-- top > 지도저장 -->
				<div class="popup-panel popup-right top-popup07" style="width: 390px;height: 630px;">
					<div class="popup-header">지도저장</div>
					<div class="popup-body">

						<div class="tool-popup-body">
							<h3 class="cont-txt marT0">현재 지도화면을 저장합니다.</h3>
							<div class="saveMap-thumb"><img src="/images/thumb02.jpg" alt=""></div>
							<div class="btn-wrap">
								<div><button type="button" class="btn basic bi-png">PNG생성</button></div>
							</div>

							<div class="bbs-write-default">
								<table class="bbs-write">
									<colgroup>
										<col style="width: 20%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">형식</th>
											<td>
												<span class="form-radio text group">
													<span><input type="radio" name="saveMap" id="saveMapPNG" checked="checked"><label for="saveMapPNG">PNG(이미지)</label></span>
													<span><input type="radio" name="saveMap" id="saveMapPDF"><label for="saveMapPDF">PDF(이미지+메모)</label></span>
												</span>
											</td>
										</tr>
										<tr>
											<td colspan="2">
												<div class="cont" style="height: 147px;">
													<textarea name="" id="" class="form-control" placeholder="메모를 작성해주세요"></textarea>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div class="btn-wrap">
								<div><button type="button" class="btn basic bi-download">다운로드</button></div>
							</div>
						</div>

					</div>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 지도저장 -->

				<!-- top > 그리기 도구 -->
				<div class="popup-panel popup-right top-popup08" style="width: 480px;height: 807px;">
					<div class="popup-header">그리기 도구</div>
					<div class="popup-body">

						<div class="tool-popup-body">
							<div class="srch-box">
								<div class="form-row">
									<div class="col-auto">
										<select class="form-select">
											<option value="">분류</option>
										</select>
									</div>
									<div class="col-auto">
										<select class="form-select">
											<option value="">제목</option>
											<option value="">작성자</option>
										</select>
									</div>
									<div class="col"><input type="text" class="form-control"></div>
									<div class="col-auto"><button type="button" class="btn type01 search">조회</button></div>
								</div>
							</div>

							<div class="btn-wrap justify-content-end">
								<div><a href="/contents/top08-regist.html" class="btn bi-write" target="_blank">등록</a></div>
							</div>

							<div class="bbs-top marT10">
								<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
								<div class="list-sort">
									<span class="form-radio text group">
										<span><input type="radio" name="list" id="rChk3-1" checked="checked"><label for="rChk3-1">제목순</label></span>
										<span><input type="radio" name="list" id="rChk3-2"><label for="rChk3-2">최신순</label></span>
									</span>
								</div>
							</div>
							<div class="bbs-list-wrap" style="height: 586px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: 20%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 13%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">번호</th>
													<th scope="col">분류</th>
													<th scope="col">제목</th>
													<th scope="col">등록일</th>
													<th scope="col"></th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="scroll-y">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: 20%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 13%;">
											</colgroup>
											<tbody>
												<tr>
													<td>50</td>
													<td>시설물공사</td>
													<td class="align-left"><a href="javascript:void(0);" class="subject">2021.12 도로/보도 공사</a></td>
													<td>2021.10.15</td>
													<td><a href="" class="icon-btn edit"></a></td>
												</tr>
												<tr>
													<td>49</td>
													<td>시설물공사</td>
													<td class="align-left"><a href="javascript:void(0);" class="subject">2021.12 도로/보도 공사</a></td>
													<td>2021.10.15</td>
													<td><a href="" class="icon-btn edit"></a></td>
												</tr>
												<tr>
													<td>48</td>
													<td>시설물공사</td>
													<td class="align-left"><a href="javascript:void(0);" class="subject">2021.12 도로/보도 공사</a></td>
													<td>2021.10.15</td>
													<td><a href="" class="icon-btn edit"></a></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<div class="pagination">
									<a href="javascript:void(0);" class="first" title="처음"></a>
									<a href="javascript:void(0);" class="prev" title="이전"></a>
									<strong class="current">1</strong>
									<a href="javascript:void(0);">2</a>
									<a href="javascript:void(0);">3</a>
									<a href="javascript:void(0);">4</a>
									<a href="javascript:void(0);">5</a>
									<a href="javascript:void(0);" class="next" title="다음"></a>
									<a href="javascript:void(0);" class="last" title="마지막"></a>
								</div>
							</div>
						</div>

					</div>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 그리기 도구 -->

				<!-- top > 배경지도 -->
				<div class="popup-panel popup-right top-popup09" style="width: 325px;height: 807px;">
					<div class="popup-header">배경지도</div>
					<div class="popup-body">
						<div class="tool-popup-body tool-bgMap-body">
							<div class="scroll-y">
								<p class="cont-tit marT0">바로e맵(국토지리정보원)</p>
								<div class="mapBgType-group">
									<ul class="mapBgType-list">
										<li><input type="radio" name="mapBgType" id="mapBgType01"><label for="mapBgType01"><div class="img"><img src="/images/etc/mapBg-img01.jpg" alt=""></div><p class="text">일반</p></label></li>
										<li><input type="radio" name="mapBgType" id="mapBgType02"><label for="mapBgType02"><div class="img"><img src="/images/etc/mapBg-img01.jpg" alt=""></div><p class="text">항공</p></label></li>
									</ul>
								</div>
	
								<p class="cont-tit">항공사진</p>
								<div class="mapBgType-group">
									<ul class="mapBgType-list">
										<li><input type="radio" name="mapBgType" id="mapBgType03"><label for="mapBgType03"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2021</p></label></li>
										<li><input type="radio" name="mapBgType" id="mapBgType04"><label for="mapBgType04"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2020</p></label></li>
										<li><input type="radio" name="mapBgType" id="mapBgType05"><label for="mapBgType05"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2019</p></label></li>
										<li><input type="radio" name="mapBgType" id="mapBgType06"><label for="mapBgType06"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2018</p></label></li>
										<li><input type="radio" name="mapBgType" id="mapBgType07"><label for="mapBgType07"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2011</p></label></li>
										<li><input type="radio" name="mapBgType" id="mapBgType08"><label for="mapBgType08"><div class="img"><img src="/images/etc/mapBg-img02.jpg" alt=""></div><p class="text">2016</p></label></li>
									</ul>
								</div>
								<p class="cont-tit">주제도</p>
								<div class="mapBgType-group">
									<ul class="mapBgType-list">
										<li><input type="radio" name="mapBgType" id="mapBgType09"><label for="mapBgType03"><div class="img"><img src="/images/etc/mapBg-img03.jpg" alt=""></div><p class="text">지적도</p></label></li>
									</ul>
								</div>

							</div>
							<div class="position-bottom btn-wrap">
								<div><button type="button" class="btn basic bi-check">적용</button></div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 배경지도 -->

				<!-- top > 드론영상 -->
				<div class="popup-panel popup-right top-popup10" style="width: 480px;height: 807px;">
					<div class="popup-header">드론영상</div>
					<div class="popup-body">

						<div class="tool-popup-body">
							<div class="srch-box">
								<div class="form-row">
									<div class="col-auto">
										<select class="form-select">
											<option value="">제목</option>
											<option value="">작성자</option>
										</select>
									</div>
									<div class="col"><input type="text" class="form-control"></div>
									<div class="col-auto"><button type="button" class="btn type01 search">조회</button></div>
								</div>
							</div>

							<div class="btn-wrap justify-content-end">
								<div><a href="/contents/top10-regist.html" class="btn bi-write" target="_blank">등록</a></div>
							</div>

							<div class="bbs-top marT10">
								<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
								<div class="list-sort">
									<span class="form-radio text group">
										<span><input type="radio" name="list" id="rChk3-1" checked="checked"><label for="rChk3-1">제목순</label></span>
										<span><input type="radio" name="list" id="rChk3-2"><label for="rChk3-2">최신순</label></span>
									</span>
								</div>
							</div>
							<div class="bbs-list-wrap" style="height: 586px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: 15%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">번호</th>
													<th scope="col">제목</th>
													<th scope="col">촬영일</th>
													<th scope="col">등록일</th>
													<th scope="col">작성자</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="scroll-y">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 13%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: 15%;">
											</colgroup>
											<tbody>
												<tr>
													<td>50</td>
													<td class="align-left"><a href="/contents/top10-detail.html" class="subject" target="_blank">드론 테스트 1 입니다.</a></td>
													<td>2021.05.20</td>
													<td>2021.10.15</td>
													<td>홍길동</td>
												</tr>
												<tr>
													<td>50</td>
													<td class="align-left"><a href="javascript:void(0);" class="subject">드론 테스트 1 입니다.</a></td>
													<td>2021.05.20</td>
													<td>2021.10.15</td>
													<td>홍길동</td>
												</tr>
												<tr>
													<td>50</td>
													<td class="align-left"><a href="javascript:void(0);" class="subject">드론 테스트 1 입니다.</a></td>
													<td>2021.05.20</td>
													<td>2021.10.15</td>
													<td>홍길동</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<div class="pagination">
									<a href="javascript:void(0);" class="first" title="처음"></a>
									<a href="javascript:void(0);" class="prev" title="이전"></a>
									<strong class="current">1</strong>
									<a href="javascript:void(0);">2</a>
									<a href="javascript:void(0);">3</a>
									<a href="javascript:void(0);">4</a>
									<a href="javascript:void(0);">5</a>
									<a href="javascript:void(0);" class="next" title="다음"></a>
									<a href="javascript:void(0);" class="last" title="마지막"></a>
								</div>
							</div>
						</div>

					</div>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 드론영상 -->
				
				<!-- 레이어 > 레이어 정보 -->
				<div class="popup-panel popup-left left-layer-info" style="width: 515px;height: 807px;">
					<div class="popup-header">레이어 정보</div>
					<div class="popup-body">
						<div class="left-popup-body">						
							<div class="tabBoxDepth1-wrap">
								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="layerBasic" class="on"><button type="button" class="inner-tab">기본</button></li>
										<li data-tab="layerSymbol"><button type="button" class="inner-tab">심볼</button></li>
										<li data-tab="layerLabel"><button type="button" class="inner-tab">라벨</button></li>
									</ul>
								</div>
								<div class="tab-cont layerBasic on">
									<h3 class="cont-tit">기본정보</h3>
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 20%;">
												<col style="width: auto;">
												<col style="width: 20%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">명칭</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">테이블</th>
													<td>RDL_STLT_PS</td>
												</tr>
												<tr>
													<th scope="row">타입</th>
													<td>-</td>
													<th scope="row">데이터량</th>
													<td>-</td>
												</tr>
												<tr>
													<th scope="row">갱신 형태</th>
													<td>
														<select class="form-select">
															<option value="">-</option>
														</select>
													</td>
													<th scope="row">갱신 주기</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">최신 업데이트</th>
													<td>-</td>
													<th scope="row">공유 형태</th>
													<td>
														<select class="form-select">
															<option value="">-</option>
														</select>
													</td>
												</tr>
											</tbody>										
										</table>
									</div>
									<h3 class="cont-tit">속성정보</h3>
									<div class="data-default" style="height: 431px;">
										<table class="data-write">
											<colgroup>
												<col style="width: auto;">
												<col style="width: auto;">
												<col style="width: 17%;">
												<col style="width: 15%;">
												<col style="width: 80px;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">필드명(한글)</th>
													<th scope="col">필드명(영문)</th>
													<th scope="col">타입</th>
													<th scope="col">길이</th>
													<th scope="col">표출</th>
												</tr>
											</thead>
										</table>
										<div class="scroll-y">
											<table class="data-write tbl-all-center">
												<colgroup>
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 17%;">
													<col style="width: 15%;">
													<col style="width: 80px;">
												</colgroup>
												<tbody>
													<tr>
														<td><input type="text" class="form-control"></td>
														<td><input type="text" class="form-control"></td>
														<td>타원형</td>
														<td>0</td>
														<td>
															<select class="form-select">
																<option value="">Y</option>
																<option value="">N</option>
															</select>
														</td>
													</tr>
													<tr>
														<td><input type="text" class="form-control"></td>
														<td><input type="text" class="form-control"></td>
														<td>타원형</td>
														<td>0</td>
														<td>
															<select class="form-select">
																<option value="">Y</option>
																<option value="">N</option>
															</select>
														</td>
													</tr>
													<tr>
														<td><input type="text" class="form-control"></td>
														<td><input type="text" class="form-control"></td>
														<td>타원형</td>
														<td>0</td>
														<td>
															<select class="form-select">
																<option value="">Y</option>
																<option value="">N</option>
															</select>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div class="position-bottom btn-wrap"><div><button type="button" class="btn basic bi-check">적용</button></div></div>
								</div>
								<div class="tab-cont layerSymbol">
									<div>
										<div class="row">
											<div class="col-6">
												<p class="form-label">유효축척</p>
												<div class="input-group">											
													<div class="input-group-text">
														<span class="form-checkbox">
															<span><input type="checkbox" name="" id="chk2" checked="checked"><label for="chk2"></label></span>
														</span>
													</div>
													<input type="text" class="form-control">
													<div class="input-group-text">~</div>
													<input type="text" class="form-control">
												</div>
											</div>
										</div>
										<div class="row marT30">
											<span class="form-radio text marB5"><span><input type="radio" name="drawingType" id="drawing1" checked="checked"><label for="drawing1">일반스타일</label></span></span>
											<div class="col-6">
												<div class="tbl-list">
													<div class="term">색상</div>
													<div class="desc" style="width: 190px;">
														<input type="text" class="colorPicker">
													</div>
												</div>
											</div>
											<div class="col-3">
												<div class="tbl-list">											
													<div class="term">모양</div>
													<div class="desc flex-grow-1">
														<select class="form-select">
															<option value="">-</option>
														</select>
													</div>
												</div>
											</div>
											<div class="col-3">
												<div class="tbl-list">
													<div class="term">크기</div>
													<div class="desc flex-grow-1">
														<select class="form-select">
															<option value="">-</option>
														</select>
													</div>
												</div>
											</div>
										</div>
										<div class="row symbol-group-row marT30">
											<div class="col-6">
												<span class="form-radio text"><span><input type="radio" name="drawingType" id=""><label for="">기본제공 심볼</label></span></span>
												<div class="symbol-group">
													<button type="button"><img src="/images/symbol/1_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/2_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/3_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/4_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/5_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/6_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/7_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/8_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/9_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/10_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/11_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/12_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/13_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/14_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/15_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/16_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/17_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/18_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/19_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/20_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/21_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/22_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/23_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/24_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/25_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/26_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/27_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/28_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/29_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/30_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/31_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/32_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/33_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/34_s.png" alt=""></button>
													<button type="button"><img src="/images/symbol/35_s.png" alt=""></button>
												</div>
												<div class="d-flex align-items-center justify-content-end">
													<span class="form-label padR5">크기</span>
													<select class="form-select w-auto">
														<option value="">1</option>
														<option value="">2</option>
													</select>
												</div>
											</div>
											<div class="col-6">
												<span class="form-radio text"><span><input type="radio" name="drawingType" id="drawing3"><label for="drawing3">심볼 직접 등록</label></span></span>
												<div class="symbol-register">
													<div class="scroll-y">
														<ul class="form-radio sm text">
															<li><span><input type="radio" name="test" id="test1"><label for="test1"><img src="/images/symbol/19_s.png" alt=""> icon_img19.png</label></span>
																<button type="button" class="symbol-delete"></button>
															</li>
															<li><span><input type="radio" name="test" id="test2"><label for="test2"><img src="/images/symbol/15_s.png" alt=""> icon_img15.png</label></span>
																<button type="button" class="symbol-delete"></button>
															</li>
															<li><span><input type="radio" name="test" id="test3"><label for="test3"><img src="/images/symbol/8_s.png" alt=""> icon_img8.png</label></span>
																<button type="button" class="symbol-delete"></button>
															</li>
															<li><span><input type="radio" name="test" id="test1"><label for="test1"><img src="/images/symbol/19_s.png" alt=""> icon_img19.png</label></span>
																<button type="button" class="symbol-delete"></button>
															</li>
															<li><span><input type="radio" name="test" id="test2"><label for="test2"><img src="/images/symbol/15_s.png" alt=""> icon_img15.png</label></span>
																<button type="button" class="symbol-delete"></button>
															</li>
															<li><span><input type="radio" name="test" id="test3"><label for="test3"><img src="/images/symbol/8_s.png" alt=""> icon_img8.png</label></span>
																<button type="button" class="symbol-delete"></button>
															</li>
															<li><span><input type="radio" name="test" id="test1"><label for="test1"><img src="/images/symbol/19_s.png" alt=""> icon_img19.png</label></span>
																<button type="button" class="symbol-delete"></button>
															</li>
															<li><span><input type="radio" name="test" id="test2"><label for="test2"><img src="/images/symbol/15_s.png" alt=""> icon_img15.png</label></span>
																<button type="button" class="symbol-delete"></button>
															</li>
															<li><span><input type="radio" name="test" id="test3"><label for="test3"><img src="/images/symbol/8_s.png" alt=""> icon_img8.png</label></span>
																<button type="button" class="symbol-delete"></button>
															</li>
														</ul>												
													</div>
													<div class="form-file"> 													
														<input type="file" id="file"><input class="upload-name" value="파일선택">
														<label for="file">파일찾기</label> 
													</div>
													<script>
														$(document).ready(function(){ 
															var fileTarget = $('#file'); 
															fileTarget.on('change', function(){ // 값이 변경되면
																var cur=$(".form-file input[type='file']").val();
															$(".upload-name").val(cur);
															}); 
														}); 
													</script>
												</div>
												<div class="d-flex align-items-center justify-content-end">
													<span class="form-label padR5">크기</span>
													<select class="form-select w-auto">
														<option value="">1</option>
														<option value="">2</option>
													</select>
												</div>
											</div>
										</div>
									</div>
	
									<!-- Type02 -->
									<div style="display: none;">
										<div class="row">
											<div class="col-6">
												<p class="form-label">유효축척</p>
												<div class="input-group">											
													<div class="input-group-text">
														<span class="form-checkbox">
															<span><input type="checkbox" name="" id="chk2" checked="checked"><label for="chk2"></label></span>
														</span>
													</div>
													<input type="text" class="form-control">
													<div class="input-group-text">~</div>
													<input type="text" class="form-control">
												</div>
											</div>
										</div>
										<div class="row marT30">
											<div class="col-6">
												<div class="tbl-list">
													<div class="term">색상</div>
													<div class="desc" style="width: 190px;">
														<input type="text" class="colorPicker">
													</div>
												</div>
											</div>
											<div class="col-6">
												<div class="tbl-list">											
													<div class="term">모양</div>
													<div class="desc flex-grow-1">
														<select class="form-select">
															<option value="">-</option>
														</select>
													</div>
												</div>
											</div>
											<div class="col-12 marT10">
												<div class="tbl-list all-vertical-tbl">
													<div class="items">
														<div class="term">투명도</div>
														<div class="desc">													
															<div class="drawing-slider-box drawingOpacity">
																<div class="drawing-slider"><div id="" class="slider"></div></div>													
																<div class="spinner-group">
																	<input id="vertical-spinner" class="ui-spinner-input" min="0" max="100" step="10" value="20%">
																</div>
																<script>
																	$( function() {
																		$( ".spinner-group" ).controlgroup({
																			"direction": "vertical",
																		});
		
																		var handle = $("#drawingOpacity-handle" );
																		$(".drawingOpacity .slider").slider({
																			value: 20,
																			min: 0,
																			max: 100,
																			step: 10,
																			range: "min",
																			create: function() {
																				handle.text( $( this ).slider("value"));
																			},
																			slide: function(event, ui) {
																				handle.text( ui.value );
																			},
																			change: function(){
																				
																			}
																		});
																	});
																</script>
															</div>
														</div>
													</div>
													<div class="items marT10">
														<div class="term">두께</div>
														<div class="desc">
															<div class="drawing-slider-box drawingThickness">
																<div class="drawing-slider"><div id="" class="drawingThicknessSlider"></div></div>
																<input type="text" class="value-num" readonly>													
		
																<script>
																	$( function() {
																		$( ".drawingThicknessSlider" ).slider({
																		range: "min",
																		min: 0,
																		max: 100,
																		value: 20,
																		step: 10,
																		slide: function( event, ui ) {
																			$( ".drawingThickness .value-num" ).val( ui.value );
																		}
																		});
																		$( ".drawingThickness .value-num" ).val( $( ".drawingThicknessSlider" ).slider( "value" ) );
																	});
																</script>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
	
									<!-- Type03 -->
									<div class="row" style="display: none;">
										<div class="col-6">
											<p class="form-label">유효축척</p>
											<div class="input-group">											
												<div class="input-group-text">
													<span class="form-checkbox">
														<span><input type="checkbox" name="" id="chk2" checked="checked"><label for="chk2"></label></span>
													</span>
												</div>
												<input type="text" class="form-control">
												<div class="input-group-text">~</div>
												<input type="text" class="form-control">
											</div>
										</div>
										<div class="col-12 marT30">
											<div class="face-group">
												<div class="title-items"><p>색상</p><p>투명도</p><p>두께</p><p>모양</p></div>
												<div class="line-items">
													<div class="box-group">
														<p class="tit">선</p>
														<div>
															<input type="text" class="colorPicker">
															<script>
																$('.colorPicker').minicolors({
																	control:'hue',
																	defaultValue:'rgba(255, 0, 0)',
																	format:'rgb',
																	theme: 'default',
																	opacity: false,
																	swatches: []
																});
															</script>
														</div>
														<div>
															<div class="drawing-slider-box drawingOpacity">
																<div class="drawing-slider"><div id="" class="slider"></div></div>													
																<div class="spinner-group">
																	<input id="vertical-spinner" class="ui-spinner-input" min="0" max="100" step="10" value="20%">
																</div>
																<script>
																	$( function() {
																		$( ".spinner-group" ).controlgroup({
																			"direction": "vertical",
																		});
								
																		var handle = $("#vertical-spinner" );
																		$(".drawingOpacity .slider").slider({
																			value: 20,
																			min: 0,
																			max: 100,
																			step: 10,
																			range: "min",
																			create: function() {
																				handle.text( $( this ).slider("value"));
																			},
																			slide: function(event, ui) {
																				handle.text( ui.value );
																			},
																			change: function(){
																				
																			}
																		});
																	});
																</script>
															</div>
														</div>
														<div>
															<div class="drawing-slider-box drawingThickness">
																<div class="drawing-slider"><div id="" class="drawingThicknessSlider"></div></div>
																<input type="text" class="value-num" readonly>													
								
																<script>
																	$( function() {
																		$( ".drawingThicknessSlider" ).slider({
																		range: "min",
																		min: 0,
																		max: 100,
																		value: 20,
																		step: 10,
																		slide: function( event, ui ) {
																			$( ".drawingThickness .value-num" ).val( ui.value );
																		}
																		});
																		$( ".drawingThickness .value-num" ).val( $( ".drawingThicknessSlider" ).slider( "value" ) );
																	});
																</script>
															</div>
														</div>
														<div>
															<select class="form-select">
																<option value="">-</option>
															</select>
														</div>
													</div>
												</div>
												<div class="face-items">
													<div class="box-group">
														<p class="tit">면</p>
														<div>
															<input type="text" class="colorPicker">
															<script>
																$('.colorPicker').minicolors({
																	control:'hue',
																	defaultValue:'rgba(0, 255, 209)',
																	format:'rgb',
																	theme: 'default',
																	opacity: false,
																	swatches: []
																});
															</script>
														</div>
														<div>
															<div class="drawing-slider-box drawingOpacity">
																<div class="drawing-slider"><div id="" class="slider"></div></div>													
																<div class="spinner-group">
																	<input id="vertical-spinner" class="ui-spinner-input" min="0" max="100" step="10" value="20%">
																</div>
																<script>
																	$( function() {
																		$( ".spinner-group" ).controlgroup({
																			"direction": "vertical",
																		});
								
																		var handle = $("#vertical-spinner" );
																		$(".drawingOpacity .slider").slider({
																			value: 20,
																			min: 0,
																			max: 100,
																			step: 10,
																			range: "min",
																			create: function() {
																				handle.text( $( this ).slider("value"));
																			},
																			slide: function(event, ui) {
																				handle.text( ui.value );
																			},
																			change: function(){
																				
																			}
																		});
																	});
																</script>
															</div>
														</div>											
													</div>
												</div>
											</div>
										</div>
									</div>
								
									<div class="position-bottom btn-wrap"><div><button type="button" class="btn basic bi-check">적용</button></div></div>
								</div>
								<div class="tab-cont layerLabel">
									<div class="row marB30">
										<div class="col-6">
											<p class="form-label">라벨 필드</p>
											<div class="tbl-list">
												<div class="term">값</div>
												<div class="desc">
													<select class="form-select">
														<option value="">FTR_IDN</option>
													</select>
												</div>
											</div>
										</div>													
									</div>
									<div class="row marB30">
										<div class="col-6">
											<p class="form-label">유효축척</p>
											<div class="input-group">											
												<div class="input-group-text">
													<span class="form-checkbox">
														<span><input type="checkbox" name="" id="chk2" checked="checked"><label for="chk2"></label></span>
													</span>
												</div>
												<input type="text" class="form-control">
												<div class="input-group-text">~</div>
												<input type="text" class="form-control">
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-12">
											<p class="cont-txt">라벨스타일</p>
										</div>
										<div class="col-6 marB5">
											<div class="tbl-list">
												<div class="term">글씨</div>
												<div class="desc" style="width: 190px;">
													<input type="text" class="colorPicker">
												</div>
											</div>
										</div>
										<div class="col-6 marB5">
											<div class="tbl-list">											
												<div class="term">배경</div>
												<div class="desc" style="width: 190px;">
													<input type="text" class="colorPicker">
													<script>
														$('.colorPicker').minicolors({
															control:'hue',
															defaultValue:'rgba(255, 0, 0)',
															format:'rgb',
															theme: 'default',
															opacity: false,
															swatches: []
														});
													</script>
												</div>
											</div>
										</div>
										<div class="col-6">
											<div class="tbl-list">											
												<div class="term">폰트</div>
												<div class="desc flex-grow-1">
													<select class="form-select">
														<option value="">돋움체</option>
													</select>
												</div>
											</div>
										</div>
										<div class="col-6">
											<div class="tbl-list">											
												<div class="term">크기</div>
												<div class="desc flex-grow-1">
													<select class="form-select">
														<option value="">26px</option>
													</select>
												</div>
											</div>
										</div>									
									</div>
									<div class="position-bottom btn-wrap"><div><button type="button" class="btn basic bi-check">적용</button></div></div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
<%--					<button type="button" class="popup-left-toggle" title="접기"></button>--%>
					<script>
						$( function() {	
							//symbol 클릭 시 active
							$( ".symbol-group button" ).on( "click", function() {
								$(this).addClass("active").siblings().removeClass('active');
							});	

							//symbol 직접 등록 클릭 시 active
							$(".symbol-register input[type='radio']").click(function(){
								var radioChk = $(this).is(":checked");
								if(radioChk){
									$(this).closest("li").addClass('active').siblings().removeClass('active');
								}
							});

						});
					</script>
				</div>
				<!-- //Left 레이어 > 레이어 정보 -->


				<!-- 업무 > 공간정보활용 > 사업공유관리 -->
				<div class="popup-panel popup-left work-01-01" style="left: 320px;width: 515px;height: 807px;">
					<div class="popup-header">사업공유관리</div>
					<div class="popup-body">
						<div class="left-popup-body">						
							<div class="tabBoxDepth1-wrap">
								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="constructionPlan" class="on"><button type="button" class="inner-tab">공사계획정보</button></li>
										<li data-tab="constructionSchedule"><button type="button" class="inner-tab">공사예정정보</button></li>
										<li data-tab="constructionInquiry"><button type="button" class="inner-tab">공사정보 조회</button></li>
									</ul>
								</div>
								<!-- 공사계획정보 -->
								<div class="tab-cont constructionPlan on">
									<div class="srch-box">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 15%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">시기</th>
														<td>
															<div class="form-row">
																<div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="from"></div></div>
																<div class="col-auto form-dash">~</div>
																<div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="to" autocomplete="off"></div></div>
															</div>
														</td>
													</tr>
													<tr>
														<th scope="row" class="align-top">유형</th>
														<td>
															<div class="form-row">
																<div class="col">
																	<select class="form-select">
																		<option value="">전체</option>
																		<option value="">전체</option>
																	</select>
																</div>
																<div class="col">
																	<select class="form-select">
																		<option value="">집행부서</option>
																		<option value="">집행부서</option>
																	</select>
																</div>
																<div class="col">
																	<select class="form-select">
																		<option value="">읍면동</option>
																		<option value="">읍면동</option>
																	</select>
																</div>
															</div>
														</td>
													<tr>
														<th scope="row">공사명</th>
														<td><input type="text" class="form-control" placeholder="공사명을 입력해주세요."></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
	
									<div class="bbs-top">
										<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
										<div><a href="/contents/work-01-01-regist.html" class="btn bi-write">등록</a></div>
									</div>
									<div class="bbs-list-wrap" style="height: 456px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
										<div class="bbs-default">
											<div class="bbs-list-head">
												<table class="bbs-list">
													<colgroup>
														<col style="width: 10%;">
														<col style="width: 20%;">
														<col style="width: 20%;">
														<col style="width: 20%;">
														<col style="width: auto;">
													</colgroup>
													<thead>
														<tr>
															<th scope="col">
																<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
															</th>
															<th scope="col">공사유형</th>
															<th scope="col">집행부서</th>
															<th scope="col">집행시기</th>
															<th scope="col">공사명</th>
														</tr>
													</thead>
												</table>
											</div>
											<div class="scroll-y">
												<table class="bbs-list">
													<colgroup>
														<col style="width: 10%;">
														<col style="width: 20%;">
														<col style="width: 20%;">
														<col style="width: 20%;">
														<col style="width: auto;">								
													</colgroup>
													<tbody>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 4개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 4개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 4개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 4개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 4개소 CCTV 설치</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
	
										<div class="pagination">
											<a href="javascript:void(0);" class="first" title="처음"></a>
											<a href="javascript:void(0);" class="prev" title="이전"></a>
											<strong class="current">1</strong>
											<a href="javascript:void(0);">2</a>
											<a href="javascript:void(0);">3</a>
											<a href="javascript:void(0);">4</a>
											<a href="javascript:void(0);">5</a>
											<a href="javascript:void(0);" class="next" title="다음"></a>
											<a href="javascript:void(0);" class="last" title="마지막"></a>
										</div>
	
										<div class="btn-wrap"><div><button type="button" class="btn basic bi-delete2">선택삭제</button></div></div>
									</div>
								</div>
								<!-- //공사계획정보 -->
	
								<!-- 공사예정정보 -->
								<div class="tab-cont constructionSchedule">
									<div class="srch-box">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 15%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">시기</th>
														<td>
															<div class="form-row">
																<div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="from"></div></div>
																<div class="col-auto form-dash">~</div>
																<div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="to" autocomplete="off"></div></div>
															</div>
														</td>
													</tr>
													<tr>
														<th scope="row" class="align-top">유형</th>
														<td>
															<div class="form-row">
																<div class="col">
																	<select class="form-select">
																		<option value="">전체</option>
																		<option value="">전체</option>
																	</select>
																</div>
																<div class="col">
																	<select class="form-select">
																		<option value="">집행부서</option>
																		<option value="">집행부서</option>
																	</select>
																</div>
																<div class="col">
																	<select class="form-select">
																		<option value="">읍면동</option>
																		<option value="">읍면동</option>
																	</select>
																</div>
															</div>
														</td>
													<tr>
														<th scope="row">공사명</th>
														<td><input type="text" class="form-control" placeholder="공사명을 입력해주세요."></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
	
									<div class="bbs-top">
										<div class="bbs-list-num">조회결과 : <strong>45</strong>건</div>
										<div><button type="button" class="btn bi-write">등록</button></div>
									</div>
									<div class="bbs-list-wrap" style="height: 456px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
										<div class="bbs-default">
											<div class="bbs-list-head">
												<table class="bbs-list">
													<colgroup>
														<col style="width: 10%;">
														<col style="width: 20%;">
														<col style="width: 20%;">
														<col style="width: 20%;">
														<col style="width: auto;">
													</colgroup>
													<thead>
														<tr>
															<th scope="col">
																<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
															</th>
															<th scope="col">공사유형</th>
															<th scope="col">집행부서</th>
															<th scope="col">집행시기</th>
															<th scope="col">공사명</th>
														</tr>
													</thead>
												</table>
											</div>
											<div class="scroll-y">
												<table class="bbs-list">
													<colgroup>
														<col style="width: 10%;">
														<col style="width: 20%;">
														<col style="width: 20%;">
														<col style="width: 20%;">
														<col style="width: auto;">								
													</colgroup>
													<tbody>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 3개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 3개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 3개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 3개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 3개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 3개소 CCTV 설치</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>양평 유치원 인근 3개소 CCTV 설치</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
	
										<div class="pagination">
											<a href="javascript:void(0);" class="first" title="처음"></a>
											<a href="javascript:void(0);" class="prev" title="이전"></a>
											<strong class="current">1</strong>
											<a href="javascript:void(0);">2</a>
											<a href="javascript:void(0);">3</a>
											<a href="javascript:void(0);">4</a>
											<a href="javascript:void(0);">5</a>
											<a href="javascript:void(0);" class="next" title="다음"></a>
											<a href="javascript:void(0);" class="last" title="마지막"></a>
										</div>
	
										<div class="btn-wrap"><div><button type="button" class="btn basic bi-delete2">선택삭제</button></div></div>
									</div>
								</div>
								<!-- //공사예정정보 -->
	
								<!-- 공사정보 조회 -->
								<div class="tab-cont constructionInquiry">
	
									<div class="tabBoxDepth2-wrap marB20">
										<div class="tabBoxDepth2">
											<ul>
												<li data-tab="constructionInfo01" class="on"><button type="button" class="inner-tab">속성조회</button></li>
												<li data-tab="constructionInfo02"><button type="button" class="inner-tab">공간조회</button></li>
											</ul>
										</div>
										<div class="tab-cont constructionInfo01 on">
											<div class="srch-default">
												<table class="srch-tbl">
													<colgroup>
														<col style="width: 15%;">
														<col style="width: auto;">
													</colgroup>
													<tbody>
														<tr>
															<th scope="row">시기</th>
															<td>
																<div class="form-row">
																	<div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="from"></div></div>
																	<div class="col-auto form-dash">~</div>
																	<div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="to" autocomplete="off"></div></div>
																</div>
															</td>
														</tr>
														<tr>
															<th scope="row" class="align-top">유형</th>
															<td>
																<div class="form-row">
																	<div class="col">
																		<select class="form-select">
																			<option value="">전체</option>
																			<option value="">전체</option>
																		</select>
																	</div>
																	<div class="col">
																		<select class="form-select">
																			<option value="">집행부서</option>
																			<option value="">집행부서</option>
																		</select>
																	</div>
																	<div class="col">
																		<select class="form-select">
																			<option value="">읍면동</option>
																			<option value="">읍면동</option>
																		</select>
																	</div>
																</div>
																<div class="form-row">
																	<div class="col-4"><input type="text" class="form-control" placeholder="담당자명"></div>
																	<div class="col-8"><input type="text" class="form-control" placeholder="공사명"></div>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div class="btn-wrap">
												<div><button type="button" class="btn type01 search">조회</button></div>
											</div>
										</div>
										<div class="tab-cont constructionInfo02">
											<div class="srch-default">
												<table class="srch-tbl">
													<colgroup>
														<col style="width: 15%;">
														<col style="width: auto;">
													</colgroup>
													<tbody>
														<tr>
															<th scope="row">시기</th>
															<td>
																<div class="form-row">
																	<div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="from"></div></div>
																	<div class="col-auto form-dash">~</div>
																	<div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="to" autocomplete="off"></div></div>
																</div>
															</td>
														</tr>
														<tr>
															<th scope="row" class="align-top">위치</th>
															<td>
																<div class="form-row">
																	<div class="col"><input type="text" class="form-control"></div> 
																	<div class="col-auto"><button type="button" class="btn type01 bi-location">지도에서 선택</button></div>
																</div>
															</td>
														</tr>
														<tr>
															<th scope="row" class="align-top">반경</th>
															<td><input type="text" class="form-control w-100 " placeholder="0"> <sub>m</sub></td>
														</tr>
													</tbody>
												</table>
											</div>
											<div class="btn-wrap">
												<div><button type="button" class="btn type01 search">조회</button></div>
											</div>
										</div>
									</div>
	
									<div class="bbs-top">
										<div class="bbs-list-num">조회결과 : <strong>40</strong>건</div>
									</div>
									<div class="bbs-list-wrap" style="height: 432px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
										<div class="bbs-default">
											<div class="bbs-list-head">
												<table class="bbs-list">
													<colgroup>
														<col style="width: 20%;">
														<col style="width: 25%;">
														<col style="width: 20%;">
														<col style="width: auto;">
													</colgroup>
													<thead>
														<tr>
															<th scope="col">공사유형</th>
															<th scope="col">집행부서</th>
															<th scope="col">집행시기</th>
															<th scope="col">공사명</th>
														</tr>
													</thead>
												</table>
											</div>
											<div class="scroll-y">
												<table class="bbs-list">
													<colgroup>
														<col style="width: 20%;">
														<col style="width: 25%;">
														<col style="width: 20%;">
														<col style="width: auto;">
													</colgroup>
													<tbody>
														<tr class="highlight">
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>공흥리 443-14 일대<br>도로정비</td>
														</tr>
														<tr class="highlight">
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>공흥리 443-14 일대<br>도로정비</td>
														</tr>
														<tr>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>공흥리 443-14 일대<br>도로정비</td>
														</tr>
														<tr>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>공흥리 443-14 일대<br>도로정비</td>
														</tr>
														<tr>
															<td>도로정비</td>
															<td>건설과</td>
															<td>2022년 2분기</td>
															<td>공흥리 443-14 일대<br>도로정비</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<div class="pagination">
											<a href="javascript:void(0);" class="first" title="처음"></a>
											<a href="javascript:void(0);" class="prev" title="이전"></a>
											<strong class="current">1</strong>
											<a href="javascript:void(0);">2</a>
											<a href="javascript:void(0);">3</a>
											<a href="javascript:void(0);">4</a>
											<a href="javascript:void(0);">5</a>
											<a href="javascript:void(0);" class="next" title="다음"></a>
											<a href="javascript:void(0);" class="last" title="마지막"></a>
										</div>
									</div>
								</div>
								<!-- //공사정보 조회 -->
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
<%--					<button type="button" class="popup-left-toggle" title="접기"></button>					--%>
				</div>
				<!-- //업무 > 공간정보활용 > 사업공유관리 -->		
				
				<!-- 업무 > 공간정보활용 > 지하수관리 -->
				<div class="popup-panel popup-bottom work-01-02" style="left: 320px;width: 1600px;height: 378px;">
					<div class="popup-header">지하수관리</div>
					<div class="popup-body">
						<div class="bottom-popup-body bottom-popup-group">
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="top-search">
									<select class="form-select" onchange="if(this.value) window.open(this.value);">
										<option value="">농업용공공관정</option>
										<option value="/contents/work-01-02-01.html">지하수개발</option>
										<option value="/contents/work-01-02-02.html">지하수이용시설</option>
									</select>
								</div>
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="groundwaterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="groundwaterSpace"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div class="tab-cont groundwaterProperty on">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 30%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">관리구분</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">세부용도</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="읍면동"></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="시설명"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
									<div class="tab-cont groundwaterSpace">
										<div class="space-search-group">
											<div class="space-search-items">
												<span class="form-radio text group">
													<span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
													<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
												</span>
											</div>
											<div class="space-search-items">
												<span class="drawing-obj small">
													<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
												</span>
											</div>
											<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>									
									</div>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-write" data-popup="work-01-02-regist">등록</button> <button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
									<div class="bbs-default">
										<div class="bbs-list-head">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: 6%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 11%;">	
												</colgroup>
												<thead>
													<tr>
														<th scope="col">
															<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
														</th>
														<th scope="col">관리구분</th>
														<th scope="col">시설명</th>
														<th scope="col">주소</th>
														<th scope="col">시설상태</th>
														<th scope="col">시설물점검일</th>
														<th scope="col">용도</th>
														<th scope="col">세부용도</th>
														<th scope="col">구경 (㎜)</th>
														<th scope="col">심도 (m)</th>
														<th scope="col">양수능력 (㎥/일)</th>
														<th scope="col">토출관구경 (㎥)</th>
														<th scope="col">펌프형태</th>
														<th scope="col">펌프마력 (hp)</th>
														<th scope="col">담당자</th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="scroll-y">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: 6%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 11%;">					
												</colgroup>
												<tbody>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>지자체</td>
														<td>용문중원 551</td>
														<td>경기도 양평군 용문면 중원리551</td>
														<td>양호</td>
														<td>2019-08-31</td>
														<td>농업용</td>
														<td>전작</td>
														<td>200</td>
														<td>100</td>
														<td>150</td>
														<td>50</td>
														<td>수중</td>
														<td>3</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>
													<tr class="active"> <!-- 해당 상세보기 & 수정 시 active 추가 -->
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>지자체</td>
														<td>용문중원 551</td>
														<td>경기도 양평군 용문면 중원리551</td>
														<td>양호</td>
														<td>2019-08-31</td>
														<td>농업용</td>
														<td>전작</td>
														<td>200</td>
														<td>100</td>
														<td>150</td>
														<td>50</td>
														<td>수중</td>
														<td>3</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>지자체</td>
														<td>용문중원 551</td>
														<td>경기도 양평군 용문면 중원리551</td>
														<td>양호</td>
														<td>2019-08-31</td>
														<td>농업용</td>
														<td>전작</td>
														<td>200</td>
														<td>100</td>
														<td>150</td>
														<td>50</td>
														<td>수중</td>
														<td>3</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>지자체</td>
														<td>용문중원 551</td>
														<td>경기도 양평군 용문면 중원리551</td>
														<td>양호</td>
														<td>2019-08-31</td>
														<td>농업용</td>
														<td>전작</td>
														<td>200</td>
														<td>100</td>
														<td>150</td>
														<td>50</td>
														<td>수중</td>
														<td>3</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>													
												</tbody>
											</table>
										</div>
									</div>

									<div class="pagination">
										<a href="javascript:void(0);" class="first" title="처음"></a>
										<a href="javascript:void(0);" class="prev" title="이전"></a>
										<strong class="current">1</strong>
										<a href="javascript:void(0);">2</a>
										<a href="javascript:void(0);">3</a>
										<a href="javascript:void(0);">4</a>
										<a href="javascript:void(0);">5</a>
										<a href="javascript:void(0);" class="next" title="다음"></a>
										<a href="javascript:void(0);" class="last" title="마지막"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>					
				</div>
				<!-- //업무 > 공간정보활용 > 지하수관리 -->

				<!-- 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 등록하기 -->
				<div class="popup-panel popup-sub work-01-02-regist" style="bottom: 398px;right: 70px;width: 550px;height: 445px;">
					<div class="popup-header">농업용공공관정 등록하기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-write-wrap" style="height: 100%;">
								<div class="scroll-y">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">관리구분</th>
													<td>
														<select class="form-select">
															<option value="">지자체</option>
														</select>
													</td>
													<th scope="row">개발 연도</th>
													<td>
														<select class="form-select">
															<option value="">2016</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">시설명</th>
													<td colspan="3"><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">주소</th>
													<td colspan="3">
														<div class="form-row">
															<div class="col"><input type="text" class="form-control" value="경기도 양평군 양근리 448-9"></div> 
															<div class="col-auto"><button type="button" class="btn type01 bi-location">지도에서 선택</button></div>
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row">시설물상태</th>
													<td>
														<select class="form-select">
															<option value="">양호</option>
														</select>
													</td>
													<th scope="row">시설물점검일</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
												</tr>
												<tr>
													<th scope="row">용도</th>
													<td>
														<select class="form-select">
															<option value="">지자체</option>
														</select>
													</td>
													<th scope="row">세부용도</th>
													<td>
														<select class="form-select">
															<option value="">답작</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">구경(㎜)</th>
													<td class="align-right">200</td>
													<th scope="row">심도(m)</th>
													<td class="align-right">100</td>
												</tr>
												<tr>
													<th scope="row">양수능력(㎥/일)</th>
													<td class="align-right">150</td>
													<th scope="row">토출관구경(㎥)</th>
													<td class="align-right">50</td>
												</tr>
												<tr>
													<th scope="row">펌프형태</th>
													<td>
														<select class="form-select">
															<option value="">수중</option>
														</select>
													</td>
													<th scope="row">펌프마력(hp)</th>
													<td class="align-right">3</td>
												</tr>
												<tr>
													<th scope="row">담당자</th>
													<td colspan="3">
														<div class="form-row">
															<div class="col">
																<select class="form-select">
																	<option value="">국토토지과</option>
																</select>
															</div>
															<div class="col"><input type="text" class="form-control" placeholder="이름"></div>
															<div class="col"><input type="text" class="form-control" placeholder="전화번호"></div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="position-bottom btn-wrap">
									<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
								</div>
							</div>							
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 등록하기 -->

				<!-- 업무 > 공간정보활용 > 신재생에너지 -->
				<div class="popup-panel popup-bottom work-01-03" style="left: 320px;width: 1600px;height: 378px;">
					<div class="popup-header">신재생에너지</div>
					<div class="popup-body">
						<div class="bottom-popup-body bottom-popup-group">						
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="top-search">
									<select class="form-select">
										<option value="">태양광발전소</option>
									</select>
								</div>
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="energyProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="energySpace"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div class="tab-cont energyProperty on">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 30%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">운영상태</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">세부용도</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="읍면동"></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="발전소명"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
									<div class="tab-cont energySpace">
										<div class="space-search-group">
											<div class="space-search-items">
												<span class="form-radio text group">
													<span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
													<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
												</span>
											</div>
											<div class="space-search-items">
												<span class="drawing-obj small">
													<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
												</span>
											</div>
											<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-write" data-popup="work-01-03-regist">등록</button> <button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
									<div class="bbs-default">
										<div class="bbs-list-head">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: 7%;">
													<col style="width: 5%;">
													<col style="width: 7%;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 7%;">
													<col style="width: 7%;">
													<col style="width: 5%;">
													<col style="width: 5%;">
													<col style="width: 5%;">
													<col style="width: 5%;">
													<col style="width: 4%;">
													<col style="width: 5%;">
													<col style="width: 10%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">
															<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
														</th>
														<th scope="col">용도</th>
														<th scope="col">세부용도</th>
														<th scope="col">사업상태</th>
														<th scope="col">설치위치구분</th>
														<th scope="col">발전소명</th>
														<th scope="col">주소</th>
														<th scope="col">사업허가일자</th>
														<th scope="col">사업개시일자</th>
														<th scope="col">설비용량 (kw)</th>
														<th scope="col">공급전압 (kV)</th>
														<th scope="col">주파수 (Hz)</th>
														<th scope="col">소요부지면적 (㎡)</th>
														<th scope="col">지목</th>
														<th scope="col">집광판면적 (㎡)</th>
														<th scope="col">담당자</th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="scroll-y">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: 7%;">
													<col style="width: 5%;">
													<col style="width: 7%;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 7%;">
													<col style="width: 7%;">
													<col style="width: 5%;">
													<col style="width: 5%;">
													<col style="width: 5%;">
													<col style="width: 5%;">
													<col style="width: 4%;">
													<col style="width: 5%;">
													<col style="width: 10%;">
												</colgroup>
												<tbody>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>전기사업용</td>
														<td>발전사업용</td>
														<td>운영중</td>
														<td>건물위</td>
														<td>도르메 태양광발전소</td>
														<td>경기도 양평군 서종면 노문리 393-2</td>
														<td>2012.09.20</td>
														<td>213.03.27</td>
														<td>350.4</td>
														<td>380</td>
														<td>200</td>
														<td>100</td>
														<td>대</td>
														<td>50</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>													
												</tbody>
											</table>
										</div>
									</div>

									<div class="pagination">
										<a href="javascript:void(0);" class="first" title="처음"></a>
										<a href="javascript:void(0);" class="prev" title="이전"></a>
										<strong class="current">1</strong>
										<a href="javascript:void(0);">2</a>
										<a href="javascript:void(0);">3</a>
										<a href="javascript:void(0);">4</a>
										<a href="javascript:void(0);">5</a>
										<a href="javascript:void(0);" class="next" title="다음"></a>
										<a href="javascript:void(0);" class="last" title="마지막"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 공간정보활용 > 신재생에너지 -->

				<!-- 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 등록하기 -->
				<div class="popup-panel popup-sub work-01-03-regist" style="bottom: 398px;right: 70px;width: 550px;height: 445px;">
					<div class="popup-header">태양광발전소 등록하기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-write-wrap" style="height: 100%;">
								<div class="scroll-y">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">용도</th>
													<td>
														<select class="form-select">
															<option value="">전기사업용</option>
														</select>
													</td>
													<th scope="row">세부용도</th>
													<td>
														<select class="form-select">
															<option value="">발전사업용</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">발전소명</th>
													<td colspan="3"><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">주소</th>
													<td colspan="3">
														<div class="form-row">
															<div class="col"><input type="text" class="form-control" value="경기도 양평군 양근리 448-9"></div> 
															<div class="col-auto"><button type="button" class="btn type01 bi-location">지도에서 선택</button></div>
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row">사업상태</th>
													<td>
														<select class="form-select">
															<option value="">운영중</option>
														</select>
													</td>
													<th scope="row">설치위치구분</th>
													<td>
														<select class="form-select">
															<option value="">건물위</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">사업허가일자</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
													<th scope="row">사업개시일자</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
												</tr>
												<tr>
													<th scope="row">설비용량(kw)</th>
													<td class="align-right">200</td>
													<th scope="row">공급전압(kV)</th>
													<td class="align-right">100</td>
												</tr>
												<tr>
													<th scope="row">주파수(Hz)</th>
													<td class="align-right">150</td>
													<th scope="row">소요부지면적(㎥)</th>
													<td class="align-right">50</td>
												</tr>
												<tr>
													<th scope="row">지목</th>
													<td>
														<select class="form-select">
															<option value="">대</option>
														</select>
													</td>
													<th scope="row">집광판면적(㎥)</th>
													<td class="align-right">3</td>
												</tr>
												<tr>
													<th scope="row">담당자</th>
													<td colspan="3">
														<div class="form-row">
															<div class="col">
																<select class="form-select">
																	<option value="">국토토지과</option>
																</select>
															</div>
															<div class="col"><input type="text" class="form-control" placeholder="이름"></div>
															<div class="col"><input type="text" class="form-control" placeholder="전화번호"></div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="position-bottom btn-wrap">
									<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
								</div>
							</div>							
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 등록하기 -->

				<!-- 업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 등록하기 -->
				<div class="popup-panel popup-sub work-01-04-regist" style="bottom: 398px;right: 70px;width: 550px;height: 445px;">
					<div class="popup-header">가로등관리 등록하기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-write-wrap" style="height: 100%;">
								<div class="scroll-y">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">관리번호</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">읍면동</th>
													<td>
														<select class="form-select">
															<option value="">양근리</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">관리기관</th>
													<td>
														<select class="form-select">
															<option value="">운영중</option>
														</select>
													</td>
													<th scope="row">도로구간번호</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">등기구모형</th>
													<td>
														<select class="form-select">
															<option value="">세종형 종형</option>
														</select>
													</td>
													<th scope="row">설치위치구분</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
												</tr>
												<tr>
													<th scope="row">등주형식</th>
													<td>
														<select class="form-select">
															<option value="">기본형</option>
														</select>
													</td>
													<th scope="row">등주높이(m)</th>
													<td class="align-right">8</td>
												</tr>
												<tr>
													<th scope="row">등주재질</th>
													<td>
														<select class="form-select">
															<option value="">강관</option>
														</select>
													</td>
													<th scope="row">암 길이(m)</th>
													<td class="align-right">8</td>
												</tr>
												<tr>
													<th scope="row">광원종류</th>
													<td>
														<select class="form-select">
															<option value="">수운램프</option>
														</select>
													</td>
													<th scope="row">등기구수량</th>
													<td class="align-right">1</td>
												</tr>
												<tr>
													<th scope="row">담당자</th>
													<td colspan="3">
														<div class="form-row">
															<div class="col">
																<select class="form-select">
																	<option value="">국토토지과</option>
																</select>
															</div>
															<div class="col"><input type="text" class="form-control" placeholder="이름"></div>
															<div class="col"><input type="text" class="form-control" placeholder="전화번호"></div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="position-bottom btn-wrap">
									<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
								</div>
							</div>							
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 등록하기 -->
				
				<!-- 업무 > 공간정보활용 > 관내업소정보조회 -->
				<div class="popup-panel popup-bottom work-01-05" style="left: 320px;width: 1600px;height: 378px;">
					<div class="popup-header">관내업소정보조회</div>
					<div class="popup-body">
						<div class="bottom-popup-body bottom-popup-group">						
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="energyProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="energySpace"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div class="tab-cont energyProperty on">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 30%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">설치연도</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">설치일자</th>
														<td><div class="datapicker-group"><input type="text" id="" name="" class="datepicker" value="2021-10-21" autocomplete="off"></div></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="읍면동"></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="도로구간번호"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
									<div class="tab-cont energySpace">
										<div class="space-search-group">
											<div class="space-search-items">
												<span class="form-radio text group">
													<span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
													<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
												</span>
											</div>
											<div class="space-search-items">
												<span class="drawing-obj small">
													<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
												</span>
											</div>
											<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
									<div class="bbs-default">
										<div class="bbs-list-head">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 8%;">
													<col style="width: 14%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: auto;">
													<col style="width: 8%;">
													<col style="width: auto;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">
															<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
														</th>
														<th scope="col">업소구분</th>
														<th scope="col">관리번호</th>
														<th scope="col">사업장명</th>
														<th scope="col">영업상태</th>
														<th scope="col">업태구분명</th>
														<th scope="col">소재지 우편번호</th>
														<th scope="col">소재지 주소</th>
														<th scope="col">도로명 우편번호</th>
														<th scope="col">도로명 주소</th>														
													</tr>
												</thead>
											</table>
										</div>
										<div class="scroll-y">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 8%;">
													<col style="width: 14%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: auto;">
													<col style="width: 8%;">
													<col style="width: auto;">			
												</colgroup>
												<tbody>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>일반음식점</td>
														<td>4170000-101-2021-00003</td>
														<td>드론카페</td>
														<td>영업/정상</td>
														<td>한식</td>
														<td>476861</td>
														<td>경기도 양평군 양서면 양수리 1099-2</td>
														<td>12530</td>
														<td>경기도 양평군 양서면 양수로 144</td>														
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>일반음식점</td>
														<td>4170000-101-2021-00003</td>
														<td>드론카페</td>
														<td>영업/정상</td>
														<td>한식</td>
														<td>476861</td>
														<td>경기도 양평군 양서면 양수리 1099-2</td>
														<td>12530</td>
														<td>경기도 양평군 양서면 양수로 144</td>														
													</tr>													
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>일반음식점</td>
														<td>4170000-101-2021-00003</td>
														<td>드론카페</td>
														<td>영업/정상</td>
														<td>한식</td>
														<td>476861</td>
														<td>경기도 양평군 양서면 양수리 1099-2</td>
														<td>12530</td>
														<td>경기도 양평군 양서면 양수로 144</td>														
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									<div class="pagination">
										<a href="javascript:void(0);" class="first" title="처음"></a>
										<a href="javascript:void(0);" class="prev" title="이전"></a>
										<strong class="current">1</strong>
										<a href="javascript:void(0);">2</a>
										<a href="javascript:void(0);">3</a>
										<a href="javascript:void(0);">4</a>
										<a href="javascript:void(0);">5</a>
										<a href="javascript:void(0);" class="next" title="다음"></a>
										<a href="javascript:void(0);" class="last" title="마지막"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 공간정보활용 > 관내업소정보조회 -->

				<!-- 업무 > 공간정보활용 > 대기오염 -->
				<div class="popup-panel popup-left work-01-06" style="left: 320px;width: 515px;height: 807px;">
					<div class="popup-header">대기오염</div>
					<div class="popup-body">
						<div class="left-popup-body">						
							<div class="srch-box">
								<div class="srch-default">
									<table class="srch-tbl">
										<colgroup>
											<col style="width: 15%;">
											<col style="width: auto;">
										</colgroup>
										<tbody>
											<tr>
												<th scope="row">기준일시</th>
												<td>
													<div class="form-row">
														<div class="col"><div class="datapicker-group"><input type="text" id="dp1638342099432" name="" class="datepicker hasDatepicker" autocomplete="off"><button type="button" class="ui-datepicker-trigger"><img src="../images/icon/form-calendar.svg" alt="..." title="..."></button></div></div>
														<div class="col">
															<select class="form-select">
																<option value="">15시</option>
																<option value="">16시</option>
															</select>
														</div>
														<div class="col-auto"><button type="button" class="btn type01 search">조회</button></div>
													</div>
												</td>
											</tr>												
										</tbody>
									</table>
								</div>
							</div>
							<div class="bbs-top">
								<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
							</div>
							<div class="bbs-list-wrap" style="height: 624px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: auto;">
												<col style="width: 50px;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">관측소명</th>
													<th scope="col">미세</th>
													<th scope="col">초미세</th>
													<th scope="col">통합대기환경지수</th>
													<th scope="col"></th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="scroll-y">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: 20%;">
												<col style="width: auto;">
												<col style="width: 50px;">
											</colgroup>
											<tbody>
												<tr>
													<td>양평읍</td>
													<td>11㎍/㎥</td>
													<td>7㎍/㎥</td>
													<td>50</td>
													<td><button type="button" class="icon-btn stats" data-popup="work-01-06-detail" title="대기관측소"></button></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
	
								<div class="pagination">
									<a href="javascript:void(0);" class="first" title="처음"></a>
									<a href="javascript:void(0);" class="prev" title="이전"></a>
									<strong class="current">1</strong>
									<a href="javascript:void(0);">2</a>
									<a href="javascript:void(0);">3</a>
									<a href="javascript:void(0);">4</a>
									<a href="javascript:void(0);">5</a>
									<a href="javascript:void(0);" class="next" title="다음"></a>
									<a href="javascript:void(0);" class="last" title="마지막"></a>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
<%--					<button type="button" class="popup-left-toggle" title="접기"></button>					--%>
				</div>
				<!-- //업무 > 공간정보활용 > 대기오염 -->

				<!-- 업무 > 공간정보활용 > 대기오염 > 대기관측소 -->
				<div class="popup-panel popup-sub work-01-06-detail" style="top: 80px;left: 870px;width: 400px;height: 520px;">
					<div class="popup-header">대기관측소</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-default">
								<table class="data-list">
									<colgroup>
										<col style="width: 30%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">관측소명</th>
											<td>양평읍</td>
										</tr>
										<tr>									
											<th scope="row">주소</th>
											<td>경기 양평군 양평읍 양근강변길 7</td>
										</tr>
									</tbody>
								</table>
							</div>
							
							<div class="data-default">
								<table class="data-list tbl-all-center">
									<colgroup>
										<col style="width: 33.33%;">
										<col style="width: 33.33%;">
										<col style="width: auto;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col">미세먼지</th>
											<th scope="col">초미세먼지</th>
											<th scope="col">통합대기환경지수</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>11㎍/㎥ <div class="marT5"><button type="button" class="btn basic bi-stats">차트</button></div></td>
											<td>8㎍/㎥ <div class="marT5"><button type="button" class="btn basic bi-stats">차트</button></div></td>
											<td>50 <div class="marT5"><button type="button" class="btn basic bi-stats">차트</button></div></td>
										</tr>
									</tbody>
								</table>
							</div>
	
							<div class="chart-box">
								<div class="chart-txt" style=""><p>차트를 선택해 주세요.</p></div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					
					<script>
						$( function() {		
							$(".icon-btn.stats").click(function(){
								$(this).addClass("active");
							});										
						});
					</script>
				</div>
				<!-- //업무 > 공간정보활용 > 대기오염 > 대기관측소 -->


				<!-- 업무 > 시설관리 > 상수도시설 > 소방시설 -->
				<div class="popup-panel popup-bottom work-02-01" style="left: 320px;width: 1600px;height: 378px;">
					<div class="popup-header">상수도시설</div>
					<div class="popup-body">
						<div class="bottom-popup-body bottom-popup-group">						
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="top-search">
									<select class="form-select" onchange="if(this.value) window.open(this.value);">
										<option value="">소방시설</option>
										<option value="/contents/work-02-01-02.html">유량계</option>
										<option value="/contents/work-02-01-03.html">상수맨홀</option>
										<option value="/contents/work-02-01-04.html">상수관로</option>
										<option value="/contents/work-02-01-05.html">수압계</option>
										<option value="/contents/work-02-01-06.html">배수지</option>
										<option value="/contents/work-02-01-07.html">급수관로</option>
										<option value="/contents/work-02-01-08.html">변류시설</option>
									</select>
								</div>
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div class="tab-cont waterProperty on">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 30%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">시설구분</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">설치년도</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="읍면동"></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="소화전형식"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
									<div class="tab-cont waterSpace">
										<div class="space-search-group">
											<div class="space-search-items">
												<span class="form-radio text group">
													<span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
													<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
												</span>
											</div>
											<div class="space-search-items">
												<span class="drawing-obj small">
													<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
												</span>
											</div>
											<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-write" data-popup="work-02-01-regist">등록</button> <button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
									<div class="bbs-default">
										<div class="bbs-list-head">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">
															<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
														</th>
														<th scope="col">지형지물부호</th>
														<th scope="col">관리번호</th>
														<th scope="col">행정읍면동</th>
														<th scope="col">관리기관</th>
														<th scope="col">도엽번호</th>
														<th scope="col">설치일자</th>
														<th scope="col">위치</th>
														<th scope="col">수용가번호</th>
														<th scope="col">소화전방식</th>
														<th scope="col">소화전구경<br>(mm)</th>
														<th scope="col">관경<br>(mm)</th>
														<th scope="col">방향각</th>
														<th scope="col">급수탑높이</th>
														<th scope="col">공사번호</th>
														<th scope="col">기관관리번호</th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="scroll-y">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: auto;">			
												</colgroup>
												<tbody>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td><a href="javascript:void(0);" data-popup="work-02-01-detail">급수탑</a></td>
														<td>2020110001</td>
														<td>강하면</td>
														<td>경기동 양평군 수도사업소</td>
														<td>377100515C</td>
														<td>199.01.01</td>
														<td>경기도 양평군 강하면 123</td>
														<td>-</td>
														<td>지하단구</td>
														<td>100.0</td>
														<td>100.0</td>
														<td>0</td>
														<td>-</td>
														<td>-</td>
														<td>-</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									<div class="pagination">
										<a href="javascript:void(0);" class="first" title="처음"></a>
										<a href="javascript:void(0);" class="prev" title="이전"></a>
										<strong class="current">1</strong>
										<a href="javascript:void(0);">2</a>
										<a href="javascript:void(0);">3</a>
										<a href="javascript:void(0);">4</a>
										<a href="javascript:void(0);">5</a>
										<a href="javascript:void(0);" class="next" title="다음"></a>
										<a href="javascript:void(0);" class="last" title="마지막"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 상수도시설 > 소방시설 -->
				
				<!-- 업무 > 시설관리 > 상수도시설 > 소방시설 상세보기 -->
				<div class="popup-panel popup-sub work-02-01-detail" style="bottom: 398px;right: 70px;width: 550px;height: 459px;">
					<div class="popup-header">상세보기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-write-wrap" style="height: 100%;">
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
													<th scope="row">지형지물부호</th>
													<td>급수탑</td>
													<th scope="row">관리기관</th>
													<td>경기도 양평군 수도사업소</td>
												</tr>
												<tr>
													<th scope="row">관리번호</th>
													<td>2020110001</td>
													<th scope="row">행정읍면동</th>
													<td>강하면</td>
												</tr>
												<tr>
													<th scope="row">도엽번호</th>
													<td>377100515C</td>
													<th scope="row">설치일자</th>
													<td>2021-10-21</td>
												</tr>
												<tr>
													<th scope="row">수용가번호</th>
													<td>-</td>
													<th scope="row">소화전형식</th>
													<td>지하단구</td>
												</tr>
												<tr>
													<th scope="row">소화전구경(mm)</th>
													<td>-</td>
													<th scope="row">관경(mm)</th>
													<td>0</td>
												</tr>
												<tr>
													<th scope="row">급수탑높이</th>
													<td>-</td>
													<th scope="row">공사번호</th>
													<td>0</td>
												</tr>
												<tr>
													<th scope="row">방향각</th>
													<td>-</td>
													<th scope="row">기관관리번호</th>
													<td>0</td>
												</tr>
												<tr>
													<th scope="row">생성일</th>
													<td>2021-10-21</td>
													<th scope="row">생성자</th>
													<td>홍길동</td>
												</tr>
												<tr>
													<th scope="row">수정일</th>
													<td>2021-10-21</td>
													<th scope="row">수정자</th>
													<td>홍길동</td>
												</tr>
												<tr>
													<th scope="row">위치</th>
													<td colspan="3">경기도 양평군 양근리 448-9</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="position-bottom btn-wrap justify-content-end">
									<div><button type="button" class="btn basic bi-edit">수정</button> <button type="button" class="btn basic bi-delete">삭제</button></div>
								</div>
							</div>							
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 상수도시설 > 소방시설 상세보기 -->

				<!-- 업무 > 시설관리 > 상수도시설 > 소방시설 등록하기 -->
				<div class="popup-panel popup-sub work-02-01-regist" style="bottom: 398px;right: 70px;width: 550px;height: 459px;">
					<div class="popup-header">소방시설 등록하기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-write-wrap" style="height: 100%;">
								<div class="scroll-y">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">지형지물부호</th>
													<td>
														<select class="form-select">
															<option value="">급수탑</option>
														</select>
													</td>
													<th scope="row">관리기관</th>
													<td>
														<select class="form-select">
															<option value="">경기도 양평군 수도사업소</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">관리번호</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">행정읍면동</th>
													<td>
														<select class="form-select">
															<option value="">강하면</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">도엽번호</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">설치일자</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
												</tr>
												<tr>
													<th scope="row">수용가번호</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">소화전형식</th>
													<td>
														<select class="form-select">
															<option value="">지하단구</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">소화전구경(mm)</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">관경(mm)</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">급수탑높이</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">공사번호</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">방향각</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">기관관리번호</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">생성일</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
													<th scope="row">생성자</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">수정일</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
													<th scope="row">수정자</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">위치</th>
													<td colspan="3">
														<div class="form-row">
															<div class="col"><input type="text" class="form-control"></div> 
															<div class="col-auto"><button type="button" class="btn type01 bi-location" data-popup="space-edit-tool">지도에서 선택</button></div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="position-bottom btn-wrap">
									<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
								</div>
							</div>							
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 상수도시설 > 소방시설 등록하기 -->
				
				<!-- 업무 > 시설관리 > 하수도시설 > 하수연결관 -->
				<div class="popup-panel popup-bottom work-02-02" style="left: 320px;width: 1600px;height: 378px;">
					<div class="popup-header">하수도시설</div>
					<div class="popup-body">
						<div class="bottom-popup-body bottom-popup-group">						
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="top-search">
									<select class="form-select" onchange="if(this.value) window.open(this.value);">
										<option value="" selected>하수연결관</option>
										<option value="/contents/work-02-02-02.html">하수처리장</option>
										<option value="/contents/work-02-02-03.html">하수맨홀</option>
										<option value="/contents/work-02-02-04.html">하수관거</option>
										<option value="/contents/work-02-02-05.html">하수펌프장</option>
										<option value="/contents/work-02-02-06.html">측구</option>
										<option value="/contents/work-02-02-07.html">토구</option>
										<option value="/contents/work-02-02-08.html">물받이</option>
										<option value="/contents/work-02-02-09.html">환기구</option>
									</select>
								</div>
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div class="tab-cont waterProperty on">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 30%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">시설구분</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">설치년도</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="읍면동"></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="하수관용도"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
									<div class="tab-cont waterSpace">
										<div class="space-search-group">
											<div class="space-search-items">
												<span class="form-radio text group">
													<span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
													<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
												</span>
											</div>
											<div class="space-search-items">
												<span class="drawing-obj small">
													<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
												</span>
											</div>
											<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-write" data-popup="work-02-02-regist">등록</button> <button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
									<div class="bbs-default">
										<div class="bbs-list-head">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: auto;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">
															<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
														</th>
														<th scope="col">지형지물부호</th>
														<th scope="col">관리번호</th>
														<th scope="col">행정읍면동</th>
														<th scope="col">관리기관</th>
														<th scope="col">도엽번호</th>
														<th scope="col">설치일자</th>
														<th scope="col">위치</th>
														<th scope="col">하수관용도</th>
														<th scope="col">관재질</th>
														<th scope="col">시설물형태</th>
														<th scope="col">관경<br>(mm)</th>
														<th scope="col">연장<br>(m)</th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="scroll-y">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: auto;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">	
												</colgroup>
												<tbody>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td><a href="javascript:void(0);" data-popup="work-02-02-01-detail">제수변</a></td>
														<td>2020110001</td>
														<td>강하면</td>
														<td>경기동 양평군 수도사업소</td>
														<td>377062496A</td>
														<td>2018.08.01</td>
														<td>경기도 양평군 강하면 123</td>
														<td>합류관</td>
														<td>고무홀딩</td>
														<td>사각형</td>
														<td>300.0</td>
														<td>3.98</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									<div class="pagination">
										<a href="javascript:void(0);" class="first" title="처음"></a>
										<a href="javascript:void(0);" class="prev" title="이전"></a>
										<strong class="current">1</strong>
										<a href="javascript:void(0);">2</a>
										<a href="javascript:void(0);">3</a>
										<a href="javascript:void(0);">4</a>
										<a href="javascript:void(0);">5</a>
										<a href="javascript:void(0);" class="next" title="다음"></a>
										<a href="javascript:void(0);" class="last" title="마지막"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 하수도시설 > 하수연결관 -->
				
				<!-- 업무 > 시설관리 > 하수도시설 > 하수연결관 상세보기 -->
				<div class="popup-panel popup-sub work-02-02-01-detail" style="bottom: 398px;right: 70px;width: 550px;height: 459px;">
					<div class="popup-header">상세보기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-write-wrap" style="height: 100%;">
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
													<th scope="row">지형지물부호</th>
													<td>하수연결관</td>
													<th scope="row">관리기관</th>
													<td>경기도 양평군 수도사업소</td>
												</tr>
												<tr>
													<th scope="row">관리번호</th>
													<td>2020110001</td>
													<th scope="row">행정읍면동</th>
													<td>강하면</td>
												</tr>
												<tr>
													<th scope="row">도엽번호</th>
													<td>377100515C</td>
													<th scope="row">설치일자</th>
													<td>2021-10-21</td>
												</tr>
												<tr>
													<th scope="row">하수관용도</th>
													<td>합류관</td>
													<th scope="row">관재질</th>
													<td>주철</td>
												</tr>
												<tr>
													<th scope="row">시설물형태</th>
													<td>사각형</td>
													<th scope="row">관경(mm)</th>
													<td>300.0</td>
												</tr>
												<tr>
													<th scope="row">가로길이(m)</th>
													<td>-</td>
													<th scope="row">세로길이(m)</th>
													<td>-</td>
												</tr>
												<tr>
													<th scope="row">연장(m)</th>
													<td>3.89</td>
													<th scope="row">차선통로수</th>
													<td>-</td>
												</tr>
												<tr>
													<th scope="row">평균구배</th>
													<td>-</td>
													<th scope="row">관라벨</th>
													<td>1900/HP/Ø300/L4.2</td>
												</tr>
												<tr>
													<th scope="row">공사번호</th>
													<td>-</td>
													<th scope="row">기관관리번호</th>
													<td>-</td>
												</tr>
												<tr>
													<th scope="row">생성일</th>
													<td>2021-10-21</td>
													<th scope="row">생성자</th>
													<td>홍길동</td>
												</tr>
												<tr>
													<th scope="row">수정일</th>
													<td>2021-10-21</td>
													<th scope="row">수정자</th>
													<td>홍길동</td>
												</tr>
												<tr>
													<th scope="row">위치</th>
													<td colspan="3">경기도 양평군 양근리 448-9</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="position-bottom btn-wrap justify-content-end">
									<div><button type="button" class="btn basic bi-edit">수정</button> <button type="button" class="btn basic bi-delete">삭제</button></div>
								</div>
							</div>							
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 하수도시설 > 하수연결관 상세보기 -->

				<!-- 업무 > 시설관리 > 하수도시설 > 하수연결관 등록하기 -->
				<div class="popup-panel popup-sub work-02-02-regist" style="bottom: 398px;right: 70px;width: 550px;height: 459px;">
					<div class="popup-header">등록하기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-write-wrap" style="height: 100%;">
								<div class="scroll-y">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">지형지물부호</th>
													<td>
														<select class="form-select">
															<option value="">하수연결관</option>
														</select>
													</td>
													<th scope="row">관리기관</th>
													<td>
														<select class="form-select">
															<option value="">경기도 양평군 수도사업소</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">관리번호</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">행정읍면동</th>
													<td>
														<select class="form-select">
															<option value="">강하면</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">도엽번호</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">설치일자</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
												</tr>
												<tr>
													<th scope="row">하수관용도</th>
													<td>
														<select class="form-select">
															<option value="">합류관</option>
														</select>
													</td>
													<th scope="row">관재질</th>
													<td>
														<select class="form-select">
															<option value="">주철</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">시설물형태</th>
													<td>
														<select class="form-select">
															<option value="">사각형</option>
														</select>
													</td>
													<th scope="row">관경(mm)</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">가로길이(m)</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">세로길이(m)</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">연장(m)</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">차선통로수</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">평균구배</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">관라벨</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">공사번호</th>
													<td><input type="text" class="form-control"></td>
													<th scope="row">기관관리번호</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">생성일</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
													<th scope="row">생성자</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">수정일</th>
													<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
													<th scope="row">수정자</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">위치</th>
													<td colspan="3">
														<div class="form-row">
															<div class="col"><input type="text" class="form-control"></div> 
															<div class="col-auto"><button type="button" class="btn type01 bi-location" data-popup="space-edit-tool">지도에서 선택</button></div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="position-bottom btn-wrap">
									<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
								</div>
							</div>							
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 하수도시설 > 하수연결관 등록하기 -->

				<!-- 업무 > 시설관리 > 교통시설 > 도로구간 -->
				<div class="popup-panel popup-bottom work-02-03" style="left: 320px;width: 1600px;height: 378px;">
					<div class="popup-header">교통시설</div>
					<div class="popup-body">
						<div class="bottom-popup-body bottom-popup-group">						
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="top-search">
									<select class="form-select" onchange="if(this.value) window.open(this.value);">
										<option value="" selected>도로구간</option>
										<option value="/contents/work-02-03-02.html">철도선로</option>
										<option value="/contents/work-02-03-03.html">철도역사</option>
										<option value="/contents/work-02-03-04.html">지하철선로</option>
										<option value="/contents/work-02-03-05.html">지하철역사</option>
										<option value="/contents/work-02-03-06.html">교량</option>
										<option value="/contents/work-02-03-07.html">고가도로</option>
									</select>
								</div>
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div class="tab-cont waterProperty on">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 30%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">시설구분</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">설치년도</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="도로명"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
									<div class="tab-cont waterSpace">
										<div class="space-search-group">
											<div class="space-search-items">
												<span class="form-radio text group">
													<span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
													<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
												</span>
											</div>
											<div class="space-search-items">
												<span class="drawing-obj small">
													<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
												</span>
											</div>
											<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
									<div class="bbs-default">
										<div class="bbs-list-head">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: 8%;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 10%;">
													<col style="width: 10%;">
													<col style="width: 7%;">
													<col style="width: 7%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">
															<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
														</th>
														<th scope="col">시군구</th>
														<th scope="col">도로구간일련번호</th>
														<th scope="col">도로명(한글)</th>
														<th scope="col">도로명(영문)</th>
														<th scope="col">도로명코드</th>
														<th scope="col">고시일자</th>
														<th scope="col">광역도로구분</th>
														<th scope="col">기점</th>
														<th scope="col">종점</th>
														<th scope="col">도로폭</th>
														<th scope="col">도로길이</th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="scroll-y">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: 8%;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 10%;">
													<col style="width: 10%;">
													<col style="width: 7%;">
													<col style="width: 7%;">
												</colgroup>
												<tbody>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td><a href="javascript:void(0);" data-popup="work-02-03-01-detail">양평군</a></td>
														<td>2336</td>
														<td>중미산로</td>
														<td>Jungmisan-ro</td>
														<td>3217023</td>
														<td>2018.08.01</td>
														<td>시군구도로</td>
														<td>문호리391-1</td>
														<td>신복리 산189-21</td>
														<td>3.000</td>
														<td>238.487</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									<div class="pagination">
										<a href="javascript:void(0);" class="first" title="처음"></a>
										<a href="javascript:void(0);" class="prev" title="이전"></a>
										<strong class="current">1</strong>
										<a href="javascript:void(0);">2</a>
										<a href="javascript:void(0);">3</a>
										<a href="javascript:void(0);">4</a>
										<a href="javascript:void(0);">5</a>
										<a href="javascript:void(0);" class="next" title="다음"></a>
										<a href="javascript:void(0);" class="last" title="마지막"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 교통시설 > 도로구간 -->
				
				<!-- 업무 > 시설관리 > 교통시설 > 도로구간 상세보기 -->
				<div class="popup-panel popup-sub work-02-03-01-detail" style="bottom: 398px;right: 70px;width: 550px;height: 459px;">
					<div class="popup-header">상세보기</div>
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
												<th scope="row">도로구간일련번호</th>
												<td>2336</td>
												<th scope="row">도로명코드</th>
												<td>3217023</td>
											</tr>
											<tr>
												<th scope="row">도로명(한글)</th>
												<td>중미산로</td>
												<th scope="row">도로명(영문)</th>
												<td>Jungmisan-ro</td>
											</tr>
											<tr>
												<th scope="row">고시일자</th>
												<td>2012-10-18</td>
												<th scope="row">광역도로구분</th>
												<td>시군구도로</td>
											</tr>
											<tr>
												<th scope="row">도로위계기능구분</th>
												<td>로</td>
												<th scope="row">도로구간종속구분</th>
												<td>1차종속도로</td>
											</tr>
											<tr>
												<th scope="row">기점</th>
												<td>문호리391-1</td>
												<th scope="row">종점</th>
												<td>신복리 산189-21</td>
											</tr>
											<tr>
												<th scope="row">도로폭</th>
												<td>3.000</td>
												<th scope="row">도로길이</th>
												<td>238.347</td>
											</tr>
											<tr>
												<th scope="row">부여사유</th>
												<td colspan="3">중미산으로 향하는 도로</td>
											</tr>
											<tr>
												<th scope="row">부여일자</th>
												<td>2009-03-20</td>
												<th scope="row">이동일자</th>
												<td>2014-10-31</td>
											</tr>
											<tr>
												<th scope="row">이동사유</th>
												<td colspan="3">광역도로 정비 및 부여사유, 부여방식 정비</td>
											</tr>
											<tr>
												<th scope="row">이동사유코드</th>
												<td>90</td>
												<th scope="row">작업일시</th>
												<td>2014-10-31 00:44:06</td>
											</tr>												
										</tbody>
									</table>
								</div>
							</div>					
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 교통시설 > 도로구간 상세보기 -->

				<!-- 업무 > 시설관리 > 체육시설 -->
				<div class="popup-panel popup-bottom work-02-04" style="left: 320px;width: 1600px;height: 378px;">
					<div class="popup-header">체육시설</div>
					<div class="popup-body">
						<div class="bottom-popup-body bottom-popup-group">						
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div class="tab-cont sportsProperty on">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 30%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">시설구분</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">운영방식</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="읍면동"></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="시설명"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
									<div class="tab-cont sportsSpace">
										<div class="space-search-group">
											<div class="space-search-items">
												<span class="form-radio text group">
													<span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
													<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
												</span>
											</div>
											<div class="space-search-items">
												<span class="drawing-obj small">
													<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
												</span>
											</div>
											<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-write" data-popup="work-02-04-regist">등록</button> <button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
									<div class="bbs-default">
										<div class="bbs-list-head">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 11%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">
															<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
														</th>
														<th scope="col">시설구분</th>
														<th scope="col">운영방식</th>
														<th scope="col">시설명</th>
														<th scope="col">시설주소</th>
														<th scope="col">건립일자</th>
														<th scope="col">건물면적<br>(㎡)</th>
														<th scope="col">토지면적<br>(㎡)</th>
														<th scope="col">관리인원<br>(명)</th>
														<th scope="col">연간이용인원<br>(명)</th>
														<th scope="col">건립비용<br>(백만원)</th>
														<th scope="col">담당자</th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="scroll-y">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 8%;">
													<col style="width: 8%;">
													<col style="width: 11%;">		
												</colgroup>
												<tbody>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>체육시설</td>
														<td>위탁</td>
														<td>물맑은 양평종합운동장</td>
														<td>경기도 양평군 양평읍 회현리 379-11도</td>
														<td>2009.06.13</td>
														<td>2,035</td>
														<td>43,410</td>
														<td>9</td>
														<td>150</td>
														<td>802,574</td>
														<td class="align-left">교육체육과<br>홍길동 031-770-0000</td>
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>체육시설</td>
														<td>위탁</td>
														<td>물맑은 양평종합운동장</td>
														<td>경기도 양평군 양평읍 회현리 379-11도</td>
														<td>2009.06.13</td>
														<td>2,035</td>
														<td>43,410</td>
														<td>9</td>
														<td>150</td>
														<td>802,574</td>
														<td class="align-left">교육체육과<br>홍길동 031-770-0000</td>
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>체육시설</td>
														<td>위탁</td>
														<td>물맑은 양평종합운동장</td>
														<td>경기도 양평군 양평읍 회현리 379-11도</td>
														<td>2009.06.13</td>
														<td>2,035</td>
														<td>43,410</td>
														<td>9</td>
														<td>150</td>
														<td>802,574</td>
														<td class="align-left">교육체육과<br>홍길동 031-770-0000</td>
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>체육시설</td>
														<td>위탁</td>
														<td>물맑은 양평종합운동장</td>
														<td>경기도 양평군 양평읍 회현리 379-11도</td>
														<td>2009.06.13</td>
														<td>2,035</td>
														<td>43,410</td>
														<td>9</td>
														<td>150</td>
														<td>802,574</td>
														<td class="align-left">교육체육과<br>홍길동 031-770-0000</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									<div class="pagination">
										<a href="javascript:void(0);" class="first" title="처음"></a>
										<a href="javascript:void(0);" class="prev" title="이전"></a>
										<strong class="current">1</strong>
										<a href="javascript:void(0);">2</a>
										<a href="javascript:void(0);">3</a>
										<a href="javascript:void(0);">4</a>
										<a href="javascript:void(0);">5</a>
										<a href="javascript:void(0);" class="next" title="다음"></a>
										<a href="javascript:void(0);" class="last" title="마지막"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 체육시설 -->

				<!-- 업무 > 시설관리 > 체육시설 > 등록하기 -->
				<div class="popup-panel popup-sub work-02-04-regist" style="bottom: 398px;right: 70px;width: 550px;height: 459px;">
					<div class="popup-header">체육시설정보 등록하기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="tabBoxDepth3-wrap">
								<div class="tabBoxDepth3">
									<ul>
										<li data-tab="sportsFacility01" class="on"><button type="button" class="inner-tab">기본정보</button></li>
										<li data-tab="sportsFacility02"><button type="button" class="inner-tab">운영정보</button></li>
										<li data-tab="sportsFacility03"><button type="button" class="inner-tab">시설정보</button></li>
										<li data-tab="sportsFacility04"><button type="button" class="inner-tab">공간정보</button></li>
									</ul>
								</div>
								<!-- 기본정보 -->
								<div class="tab-cont sportsFacility01 on">
									<div class="scroll-y" style="height: 100%;">
										<div class="data-default">
											<table class="data-write">
												<colgroup>
													<col style="width: 23%;">
													<col style="width: auto;">
													<col style="width: 23%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">시설명</th>
														<td colspan="3"><input type="text" class="form-control"></td>												
													</tr>
													<tr>
														<th scope="row">주소</th>
														<td colspan="3">
															<div class="form-row">
																<div class="col"><input type="text" class="form-control"></div> 
																<div class="col-auto"><button type="button" class="btn type01 bi-location">지도에서 선택</button></div>
															</div>
														</td>												
													</tr>
													<tr>
														<th scope="row">시설유형</th>
														<td>
															<select name="" id="" class="form-select">
																<option value="">체육시설</option>
															</select>
														</td>
														<th scope="row">운영방식</th>
														<td>
															<select name="" id="" class="form-select">
																<option value="">위탁</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">건립비용(백만원)</th>
														<td><input type="text" class="form-control align-right"></td>
														<th scope="row">건립일</th>
														<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
													</tr>
													<tr>
														<th scope="row">건물면적(㎡)</th>
														<td><input type="text" class="form-control align-right"></td>
														<th scope="row">토지면적(㎡)</th>
														<td><input type="text" class="form-control align-right"></td>
													</tr>
													<tr>
														<th scope="row">관리인원(명)</th>
														<td><input type="text" class="form-control align-right"></td>
														<th scope="row">연간이용인원(명)</th>
														<td><input type="text" class="form-control align-right"></td>
													</tr>											
													<tr>
														<th scope="row">담당자</th>
														<td colspan="3">
															<div class="form-row">
																<div class="col">
																	<select name="" id="" class="form-select">
																		<option value="">국토토지과</option>
																	</select>
																</div>
																<div class="col"><input type="text" class="form-control" placeholder="이름"></div>
																<div class="col"><input type="text" class="form-control" placeholder="전화번호"></div>
															</div>
														</td>
													</tr>
													<tr>
														<th scope="row">시설물개요</th>
														<td colspan="3"><input type="text" class="form-control"></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div class="position-bottom btn-wrap">
										<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
									</div>
								</div>
								<!-- //기본정보 -->
			
								<!-- 운영정보 -->
								<div class="tab-cont sportsFacility02">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">운영연도</th>
													<td>
														<select name="" id="" class="form-select">
															<option value="">2021</option>
														</select>
													</td>
													<th scope="row">취득가액</th>
													<td><input type="text" class="form-control align-right"></td>
												</tr>
												<tr>
													<th scope="row">감가상각액</th>
													<td><input type="text" class="form-control align-right"></td>
													<th scope="row">감가상각누계액</th>
													<td><input type="text" class="form-control align-right"></td>
												</tr>
												<tr>
													<th scope="row">장부가액</th>
													<td><input type="text" class="form-control align-right"></td>
													<th scope="row">내용연수</th>
													<td><input type="text" class="form-control align-right"></td>
												</tr>
												<tr>
													<th scope="row">운영비용</th>
													<td><input type="text" class="form-control align-right"></td>
													<th scope="row">운영수익</th>
													<td><input type="text" class="form-control align-right"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="data-list-wrap marT10" style="height: 124px;">
										<div class="data-default">
											<table class="data-list tbl-all-center">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 10%;">
													<col style="width: 15%;">
													<col style="width: auto;">
													<col style="width: 15%;">
													<col style="width: 15%;">
													<col style="width: 15%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></th>
														<th scope="col">연도</th>
														<th scope="col">감가상각액</th>
														<th scope="col">감가상각 누계액</th>
														<th scope="col">장부가액</th>
														<th scope="col">비용</th>
														<th scope="col">수익</th>
													</tr>
												</thead>												
											</table>
											<div class="scroll-y">
												<table class="data-list tbl-all-center">
													<colgroup>
														<col style="width: 36px;">
														<col style="width: 10%;">
														<col style="width: 15%;">
														<col style="width: auto;">
														<col style="width: 15%;">
														<col style="width: 15%;">
														<col style="width: 15%;">
													</colgroup>
													<tbody>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>2021</td>
															<td>6</td>
															<td>6</td>
															<td>4,413</td>
															<td>1,103</td>
															<td>585</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>2021</td>
															<td>6</td>
															<td>6</td>
															<td>4,413</td>
															<td>1,103</td>
															<td>585</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<div class="pagination">
											<a href="javascript:void(0);" class="first" title="처음"></a>
											<a href="javascript:void(0);" class="prev" title="이전"></a>
											<strong class="current">1</strong>
											<a href="javascript:void(0);">2</a>
											<a href="javascript:void(0);">3</a>
											<a href="javascript:void(0);">4</a>
											<a href="javascript:void(0);">5</a>
											<a href="javascript:void(0);" class="next" title="다음"></a>
											<a href="javascript:void(0);" class="last" title="마지막"></a>
										</div>
									</div>								
									
									<div class="position-bottom btn-wrap">
										<div class="position-absolute left"><button type="button" class="btn basic bi-delete2">선택삭제</button></div>
										<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
									</div>
								</div>
								<!-- //운영정보 -->

								<!-- 시설정보 -->
								<div class="tab-cont sportsFacility03">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">시설명</th>
													<td colspan="3"><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">운영시간</th>
													<td colspan="3">
														<div class="form-row">
															<div class="col-auto">
																<select name="" id="" class="form-select">
																	<option value="">05 시</option>
																</select>
															</div>
															<div class="col-auto">~</div>
															<div class="col-auto">
																<select name="" id="" class="form-select">
																	<option value="">24 시</option>
																</select>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row">예약여부</th>
													<td>
														<span class="form-radio text group">
															<span><input type="radio" name="test" id="" checked=""><label for="">Y</label></span>
															<span><input type="radio" name="test" id=""><label for="">N</label></span>
														</span>
													</td>
													<th scope="row">층(호)수</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">시설설명</th>
													<td colspan="3"><input type="text" class="form-control"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="data-list-wrap marT10" style="height: 124px;">
										<div class="data-default">
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
														<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></th>
														<th scope="col">No</th>
														<th scope="col">시설명</th>
														<th scope="col">운영시간</th>
														<th scope="col">예약여부</th>
														<th scope="col">층(호)수</th>
														<th scope="col">시설설명</th>
													</tr>
												</thead>
											</table>
											<div class="scroll-y">
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
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<div class="pagination marT5">
											<a href="javascript:void(0);" class="first" title="처음"></a>
											<a href="javascript:void(0);" class="prev" title="이전"></a>
											<strong class="current">1</strong>
											<a href="javascript:void(0);">2</a>
											<a href="javascript:void(0);">3</a>
											<a href="javascript:void(0);">4</a>
											<a href="javascript:void(0);">5</a>
											<a href="javascript:void(0);" class="next" title="다음"></a>
											<a href="javascript:void(0);" class="last" title="마지막"></a>
										</div>
									</div>
									
									<div class="position-bottom btn-wrap">
										<div class="position-absolute left"><button type="button" class="btn basic bi-delete2">선택삭제</button></div>
										<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
									</div>
								</div>
								<!-- //시설정보 -->

								<!-- 공간정보 -->
								<div class="tab-cont sportsFacility04">
									<div class="data-list-wrap" style="height: 100%;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
										<div class="data-default">
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
														<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></th>
														<th scope="col">No</th>
														<th scope="col">시설명</th>
														<th scope="col">운영시간</th>
														<th scope="col">예약여부</th>
														<th scope="col">층(호)수</th>
														<th scope="col">시설설명</th>
													</tr>
												</thead>
											</table>
											<div class="scroll-y">
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
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<div class="pagination">
											<a href="javascript:void(0);" class="first" title="처음"></a>
											<a href="javascript:void(0);" class="prev" title="이전"></a>
											<strong class="current">1</strong>
											<a href="javascript:void(0);">2</a>
											<a href="javascript:void(0);">3</a>
											<a href="javascript:void(0);">4</a>
											<a href="javascript:void(0);">5</a>
											<a href="javascript:void(0);" class="next" title="다음"></a>
											<a href="javascript:void(0);" class="last" title="마지막"></a>
										</div>
									</div>
									<div class="position-bottom btn-wrap">
										<div class="position-absolute left"><button type="button" class="btn basic bi-delete2">선택삭제</button></div>
										<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
									</div>
								</div>
								<!-- //공간정보 -->
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 체육시설 > 등록하기 -->

				<!-- 업무 > 시설관리 > 복지시설 -->
				<div class="popup-panel popup-bottom work-02-05" style="left: 320px;width: 1600px;height: 378px;">
					<div class="popup-header">복지시설</div>
					<div class="popup-body">
						<div class="bottom-popup-body bottom-popup-group">						
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div class="tab-cont waterProperty on">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 30%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">시설구분</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">운영방식</th>
														<td>
															<select class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="읍면동"></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="시설명"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
									<div class="tab-cont waterSpace">
										<div class="space-search-group">
											<div class="space-search-items">
												<span class="form-radio text group">
													<span><input type="radio" name="test" id="rChk1-1" checked="checked"><label for="rChk1-1">현재화면영역</label></span>
													<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
												</span>
											</div>
											<div class="space-search-items">
												<span class="drawing-obj small">
													<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
												</span>
											</div>
											<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>										
									</div>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-write" data-popup="work-02-05-regist">등록</button> <button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
									<div class="bbs-default">
										<div class="bbs-list-head">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 10%;">
													<col style="width: 10%;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 8%;">
													<col style="width: 11%;">													
												</colgroup>
												<thead>
													<tr>
														<th scope="col">
															<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
														</th>
														<th scope="col">시설구분</th>
														<th scope="col">시설분류</th>
														<th scope="col">시설명</th>
														<th scope="col">주소</th>
														<th scope="col">전화번호</th>
														<th scope="col">시설 개요</th>														
													</tr>
												</thead>
											</table>
										</div>
										<div class="scroll-y">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 10%;">
													<col style="width: 10%;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 8%;">
													<col style="width: 11%;">	
												</colgroup>
												<tbody>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked="checked"><label for="chk1"></label></span></span></td>
														<td>복지시설</td>
														<td>아동청소년</td>
														<td>양평군장애인복지관 성인주간보호센터</td>
														<td>양평읍 중앙로 111번길 36-1</td>
														<td>031-773-9080</td>
														<td class="align-left">일상생활 지원서비스 건강관리 및 재활서비스</td>														
													</tr>													
												</tbody>
											</table>
										</div>
									</div>

									<div class="pagination">
										<a href="javascript:void(0);" class="first" title="처음"></a>
										<a href="javascript:void(0);" class="prev" title="이전"></a>
										<strong class="current">1</strong>
										<a href="javascript:void(0);">2</a>
										<a href="javascript:void(0);">3</a>
										<a href="javascript:void(0);">4</a>
										<a href="javascript:void(0);">5</a>
										<a href="javascript:void(0);" class="next" title="다음"></a>
										<a href="javascript:void(0);" class="last" title="마지막"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 복지시설 -->

				<!-- 업무 > 시설관리 > 복지시설 > 등록하기 -->
				<div class="popup-panel popup-sub work-02-05-regist" style="bottom: 398px;right: 70px;width: 550px;height: 330px;">
					<div class="popup-header">복지시설 등록하기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="data-default">
								<table class="data-write">
									<colgroup>
										<col style="width: 23%;">
										<col style="width: auto;">
										<col style="width: 23%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">시설명</th>
											<td colspan="3"><input type="text" class="form-control"></td>												
										</tr>										
										<tr>
											<th scope="row">시설분류</th>
											<td>
												<select class="form-select">
													<option value="">복지시설</option>
												</select>
											</td>
											<th scope="row">전화번호</th>
											<td><input type="text" class="form-control"></td>
										</tr>																		
										<tr>
											<th scope="row">담당자</th>
											<td colspan="3">
												<div class="form-row">
													<div class="col">
														<select class="form-select">
															<option value="">국토토지과</option>
														</select>
													</div>
													<div class="col"><input type="text" class="form-control" placeholder="이름"></div>
													<div class="col"><input type="text" class="form-control" placeholder="전화번호"></div>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">시설물개요</th>
											<td colspan="3"><input type="text" class="form-control"></td>
										</tr>
										<tr>
											<th scope="row">위치</th>
											<td colspan="3">
												<div class="form-row">
													<div class="col"><input type="text" class="form-control"></div> 
													<div class="col-auto"><button type="button" class="btn type01 bi-location">지도에서 선택</button></div>
												</div>
											</td>												
										</tr>
									</tbody>
								</table>
							</div>
							<div class="position-bottom btn-wrap">
								<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 복지시설 > 등록하기 -->
				
				<!-- 업무 > 공간정보활용 > 공간정보 편집도구 -->
				<div class="popup-panel popup-sub space-edit-tool" style="top: 80px;left: 320px;width: 385px;height: 200px;">
					<div class="popup-header">공간정보 편집도구</div>
					<div class="popup-body">
						<div class="sub-popup-body space-editTool">
							<div class="data-default">
								<table class="data-write">
									<tbody>
										<tr>
											<td>
												<div class="form-row">
													<div>
														<select class="form-select">
															<option value="">상수관로</option>
														</select>
													</div>
													<div class="col-auto"><button type="button" class="btn basic btn-xsm">스냅</button></div>
													<div class="col-auto"><button type="button" class="icon-btn edit" title="수정"></button> <button type="button" class="icon-btn delete" title="삭제"></button></div>
													<div class="col-auto" style="margin-left: auto;"><button type="button" class="btn type03 btn-xsm">객체추가</button></div>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div class="form-row">
													<div class="col">
														<select class="form-select">
															<option value="">위경도</option>
														</select>
													</div>
													<div class="col"><input type="text" class="form-control"></div>
													<div class="col"><input type="text" class="form-control"></div>
													<div class="col-auto"><button type="button" class="btn type03 btn-xsm">좌표추가</button></div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div class="position-bottom btn-wrap"><div><button type="button" class="btn basic bi-check">적용</button></div></div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 공간정보활용 > 공간정보 편집도구 -->


				<!-- 분석 > 조망권분석 -->
				<div class="small-popup small-left analysis-01-01">
					<div class="popup-header">조망권분석</div>
					<div class="popup-body">

						<div class="analysis-view-basic">
							<p class="cont-txt">조망점을 등록해주세요</p>
							<div class="btn-wrap"><button type="button" class="btn basic bi-cursor">선택</button></div>
						</div>

						<div class="analysis-view-list" style="display: none;">
							<div class="scroll-y">
								<ul>
									<li>
										<div>조망점 0</div>
										<div><button type="button" class="icon-btn location-sm" title="이동"></button> <button type="button" class="icon-btn delete" title="삭제"></button></div>
									</li>
									<li>
										<div>조망점 1</div>
										<div><button type="button" class="icon-btn location-sm" title="이동"></button> <button type="button" class="icon-btn delete" title="삭제"></button></div>
									</li>
									<li>
										<div>조망점 2</div>
										<div><button type="button" class="icon-btn location-sm" title="이동"></button> <button type="button" class="icon-btn delete" title="삭제"></button></div>
									</li>
									<li>
										<div>조망점 3</div>
										<div><button type="button" class="icon-btn location-sm" title="이동"></button> <button type="button" class="icon-btn delete" title="삭제"></button></div>
									</li>
									<li>
										<div>조망점 4</div>
										<div><button type="button" class="icon-btn location-sm" title="이동"></button> <button type="button" class="icon-btn delete" title="삭제"></button></div>
									</li>
								</ul>
							</div>
							<div class="btn-wrap"><div><button type="button" class="btn basic bi-check">등록완료</button> <button type="button" class="btn basic bi-delete">모두삭제</button></div></div>
						</div>

					</div>
					<button type="button" class="popup-toggle" title="접기"></button>
				</div>
				<!-- //분석 > 조망권분석 -->

				<!-- 분석 > 일조권분석 -->
				<div class="small-popup small-bottom analysis-01-02">
					<div class="popup-header">일조권분석</div>
					<div class="popup-body">
						<div class="sunlight-slider-wrap">
							<div class="sunlight-slider">
								<div class="ui-slider-handle"><span class="amount"></span></div>
							</div>
							<div class="sunlight-time">
								<span class="time start">00:00</span>
								<span class="time end">12:50</span>
							</div>
						</div>

						<div class="sunlight-option-group">
							<div class="items">
								<span class="tit">날짜선정</span>
								<div class="datapicker-group"><input type="text" class="datepicker"></div>
							</div>
							<div class="items">
								<span class="tit">시작시간</span>
								<select class="form-select">
									<option value="">06시</option>
								</select>
								<select class="form-select">
									<option value="">00분</option>
								</select>
							</div>
							<div class="items">
								<span class="tit">종료시간</span>
								<select class="form-select">
									<option value="">18시</option>
								</select>
								<select class="form-select">
									<option value="">00분</option>
								</select>
							</div>
							<div class="items">
								<span class="tit">속도간격</span>
								<select class="form-select">
									<option value="">1분</option>
								</select>
							</div>
							<div class="items playCtrl-group">
								<span><input type="radio" name="play" id="play" title="재생"><label for="play" class="play"></label></span>
								<span><input type="radio" name="play" id="pause" title="일시정지"><label for="pause" class="pause"></label></span>
								<span><input type="radio" name="play" id="stop" title="정지"><label for="stop" class="stop"></label></span>
							</div>
							<div class="items">
								<button type="button" class="icon-btn reset"></button>
							</div>
						</div>

						<script>
							var sunlightAmount = $(".amount" );
							$( function() {
							  $( ".sunlight-slider" ).slider({
								range: "min",
								value: 37,
								min: 1,
								max: 700,
								create: function() {
									sunlightAmount.text( $( this ).slider("value"));
								},
								slide: function( event, ui ) {
									sunlightAmount.text( ui.value );
								}
							  });
							});
						</script>
					</div>
					<button type="button" class="popup-toggle" title="접기"></button>
				</div>
				<!-- //분석 > 일조권분석 -->

				<!-- 분석 > 경사분석 -->
				<div class="small-popup small-left analysis-01-04" style="width: 260px;">
					<div class="popup-header">경사분석</div>
					<div class="popup-body">
						<p class="cont-txt">영역을 선택해 주세요</p>
						<div class="btn-wrap">
							<button type="button" class="btn basic bi-analysis">영역선택</button>
							<button type="button" class="btn basic bi-analysis complete" style="display: none;">선택완료</button><!-- 선택 완료 시  --> 
							
						</div>

						<div class="tbl-default">
							<table class="tbl-type1">
								<colgroup>
									<col style="width: 40%;">
									<col style="width: auto;">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">유형 선택</th>
										<td>
											<select class="form-select">
												<option value="">경사도</option>
												<option value="">경사향(색상)</option>
												<option value="">경사향(화살표)</option>
												<option value="">경사향도</option>
											</select>
										</td>
									</tr>
									<tr>
										<th scope="row">그리드 간격</th>
										<td>
											<div class="spinner-group w-50">
												<input id="vertical-spinner" class="ui-spinner-input" min="0" max="100" step="1" value="3">
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">화살표 해상도</th>
										<td>
											<div class="spinner-group w-50">
												<input id="vertical-spinner" class="ui-spinner-input" min="0" max="100" step="1" value="20">
											</div>
											<script>
												$( function() {
													$( ".spinner-group" ).controlgroup({
														"direction": "vertical",
													});
												});
											</script>
										</td>
									</tr>
									<tr>
										<th scope="row">화살표색상</th>
										<td><input type="text" class="colorPicker">
											<script>
												$('.colorPicker').minicolors({
													control:'hue',
													defaultValue:'rgba(255, 0, 0)',
													format:'rgb',
													theme: 'default',
													opacity: false,
													swatches: []
												});
											</script>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div class="btn-wrap">
							<div><button type="button" class="btn basic bi-loading">분석</button></div>
							<div class="position-absolute right"><button type="button" class="btn basic bi-reset">초기화</button></div>
						</div>

						<div style="display: none;">
							<div class="box2 tbl-default">
								<table class="tbl-type2">
									<colgroup>
										<col style="width: 44%;">
										<col style="width: 12%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<tr>
											<td>0˚ ~ 10˚</td>
											<td class="align-center"><span class="analSlopColorList" style="background-color: #77933C;"></span></td>
											<td class="align-right"><strong>36.74%</strong></td>
										</tr>	
										<tr>
											<td>10˚ ~ 15˚</td>
											<td class="align-center"><span class="analSlopColorList" style="background-color: #00B250;"></span></td>
											<td class="align-right">18.22%</td>
										</tr>
										<tr>
											<td>15˚ ~ 20˚</td>
											<td class="align-center"><span class="analSlopColorList" style="background-color: #C7DA9E;"></span></td>
											<td class="align-right">15.44%</td>
										</tr>
										<tr>
											<td>20˚ ~ 25˚</td>
											<td class="align-center"><span class="analSlopColorList" style="background-color: #FCD5B5;"></span></td>
											<td class="align-right">11.19%</td>
										</tr>
										<tr>
											<td>25˚ ~ 30˚</td>
											<td class="align-center"><span class="analSlopColorList" style="background-color: #FDC493;"></span></td>
											<td class="align-right">7.26%</td>
										</tr>
										<tr>
											<td>30˚ ~ 35˚</td>
											<td class="align-center"><span class="analSlopColorList" style="background-color: #F79646;"></span></td>
											<td class="align-right">5.06%</td>
										</tr>
										<tr>
											<td>35˚ ~ 40˚</td>
											<td class="align-center"><span class="analSlopColorList" style="background-color: #E46C0A;"></span></td>
											<td class="align-right">2.44%</td>
										</tr>
										<tr>
											<td>40˚ ~ 90˚</td>
											<td class="align-center"><span class="analSlopColorList" style="background-color: #FF0000;"></span></td>
											<td class="align-right">3.94%</td>
										</tr>									
									</tbody>
								</table>
							</div>

							<div class="form-row">
								<div class="col-auto">분석결과를</div>
								<div style="width: 89px;">
									<select class="form-select md">
										<option value="">JOS</option>
										<option value="">경사분석저장</option>
									</select>
								</div>
								<div class="col-auto"><button type="button" class="btn basic bi-download">다운로드</button></div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-toggle" title="접기"></button>
				</div>
				<!-- //분석 > 경사분석 -->

				<!-- 분석 > 국공유지AI분석 -->
				<div class="small-popup small-left analysis-01-05" style="width: 440px;height: 807px;">
					<div class="popup-header">AI영상분석</div>
					<div class="popup-body ai-analysis-body">
						<div class="ai-video-box">
							<span class="form-checkbox sm group">
								<span><input type="checkbox" name="" id="chk2-1"><label for="chk2-1">건물(지붕형)(0)</label></span>
								<span><input type="checkbox" name="" id="chk2-2"><label for="chk2-2">건물(옥상형)(0)</label></span>
								<span><input type="checkbox" name="" id="chk2-3"><label for="chk2-3">대(0)</label></span>
								<span><input type="checkbox" name="" id="chk2-4" checked="checked"><label for="chk2-4">창고용지(<strong>4</strong>)</label></span>
								<span><input type="checkbox" name="" id="chk2-5"><label for="chk2-5">임야(0)</label></span>
								<span><input type="checkbox" name="" id="chk2-6"><label for="chk2-6">전,답(0)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">과수원(0)</label></span>
								<span><input type="checkbox" name="" id="" checked="checked"><label for="">비닐하우스(백)(<strong>10</strong>)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">비닐하우스(흑)(0)</label></span>
								<span><input type="checkbox" name="" id="" checked="checked"><label for="">도로(<strong>34</strong>)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">주차장(0)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">철도용지(0)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">하천(0)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">유지(0)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">제방(0)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">염전(0)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">묘지(0)</label></span>
								<span><input type="checkbox" name="" id=""><label for="">기타(0)</label></span>
							</span>
						</div>
						<div class="btn-wrap"><div><button type="button" class="btn basic bi-loading">분석</button></div></div>
						<div class="data-default" style="height: 556px;">
							<table class="data-list">
								<colgroup>
									<col style="width: 15%;">
									<col style="width: 25%;">
									<col style="width: auto;">
									<col style="width: 15%;">
									<col style="width: 32px;">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">No</th>
										<th scope="col">판독유형</th>
										<th scope="col">분류</th>
										<th scope="col">정확도</th>
										<th scope="col"></th>
									</tr>
								</thead>										
							</table>
							<div class="scroll-y">
								<table class="data-list tbl-all-center">
									<colgroup>
										<col style="width: 15%;">
										<col style="width: 25%;">
										<col style="width: auto;">
										<col style="width: 15%;">
										<col style="width: 32px;">
									</colgroup>
									<tbody>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
										<tr>
											<td>1</td>
											<td>비닐하우스(백)</td>
											<td>건물(지붕형)</td>
											<td>0.41</td>
											<td><button type="button" class="icon-btn location sm" title="위치 이동"></button></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<button type="button" class="popup-toggle" title="접기"></button>
				</div>
				<!-- //분석 > 국공유지AI분석 -->

				<!-- 분석 > 지형단면도 -->
				<div class="small-popup small-bottom analysis-01-06" style="height: 300px;">
					<div class="popup-header">지형단면도</div>
					<div class="popup-body sectional-popup-body">
						<div class="sectional-box"><img src="/images/etc/graph-section.jpg" alt=""></div>
						<div class="btn-wrap"><button type="button" class="btn basic bi-cursor">단면위치 설정</button></div>
					</div>
					<button type="button" class="popup-toggle" title="접기"></button>
				</div>
				<!-- //분석 > 지형단면도 -->

				<!-- 분석 > 지하시설횡단면 -->
				<div class="small-popup small-bottom analysis-01-07" style="height: 300px;">
					<div class="popup-header">지하시설횡단면</div>
					<div class="popup-body sectional-popup-body">
						<div class="sectional-group">
							<div class="chart-items"><img src="/images/etc/graph-section2.jpg" alt=""></div>
							<div class="legend-items">
								<ul>
									<li><span class="cate cate01"></span>차도면</li>
									<li><span class="cate cate02"></span>보도면</li>
									<li><span class="cate cate03"></span>상수관로</li>
								</ul>
							</div>
						</div>
						<div class="btn-wrap"><button type="button" class="btn basic bi-cursor">단면위치 설정</button></div>
					</div>
					<button type="button" class="popup-toggle" title="접기"></button>
				</div>
				<!-- //분석 > 지하시설횡단면 -->
				
				
				<!-- 국토정보관리 > 등록하기 -->
				
				<!-- //국토정보관리 > 등록하기 -->

				<!-- 국토정보관리 > 속성정보 > 목록 -->
				
				<!-- //국토정보관리 > 속성정보 > 목록 -->

				<!-- 국토정보관리 > 속성정보 > 더보기 -->
				
				<!-- //국토정보관리 > 속성정보 > 더보기 -->


				<!-- top > 사용자정보 조회 및 수정 -->
				<div class="popup-panel popup-sub userInfoUdt">
					<div class="popup-header">사용자정보 조회 및 수정</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="tabBoxDepth3-wrap" style="height: 100%;">
								<div class="tabBoxDepth3">
									<ul>
										<li data-tab="userModify01" class="on"><button type="button" class="inner-tab">사용자 정보 조회</button></li>
										<li data-tab="userModify02"><button type="button" class="inner-tab">비밀번호 변경</button></li>
									</ul>
								</div>
								<!-- 사용자 정보 조회 -->
								<div class="tab-cont userModify01 on">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row"><span class="essential">*</span>아이디</th>
													<td>webmaster01</td>
												</tr>
												<tr>
													<th scope="row"><span class="essential">*</span>이름</th>
													<td><input type="text" class="form-control w-50p"></td>
												</tr>
												<tr>
													<th scope="row"><span class="essential">*</span>기관</th>
													<td>
														<div class="form-row">
															<div class="col-6"><input type="text" class="form-control"></div>
															<div class="col-auto"><button type="button" class="btn btn-xsm type06">선택</button></div>
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row"><span class="essential">*</span>부서명</th>
													<td><input type="text" class="form-control w-50p"></td>
												</tr>
												<tr>
													<th scope="row">대표 전화번호</th>
													<td>
														<div class="form-row">
															<div class="col-3">
																<select class="form-select">
																	<option value="">02</option>
																</select>
															</div>
															<div class="col-auto">-</div>
															<div class="col-3"><input type="text" class="form-control"></div>
															<div class="col-auto">-</div>
															<div class="col-3"><input type="text" class="form-control"></div>
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row">휴대폰번호</th>
													<td>
														<div class="form-row">
															<div class="col-3">
																<select class="form-select">
																	<option value="">010</option>
																</select>
															</div>
															<div class="col-auto">-</div>
															<div class="col-3"><input type="text" class="form-control"></div>
															<div class="col-auto">-</div>
															<div class="col-3"><input type="text" class="form-control"></div>
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row"><span class="essential">*</span>이메일</th>
													<td>
														<div class="form-row">
															<div class="col-4"><input type="text" class="form-control"></div>
															<div class="col-auto">@</div>
															<div class="col"><input type="text" class="form-control"></div>
															<div class="col-auto">
																<select class="form-select">
																	<option value="">naver.com</option>
																</select>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="position-bottom btn-wrap">
										<div><button type="button" class="btn basic bi-save">저장</button></div>
									</div>
								</div>
								<!-- //사용자 정보 조회 -->
			
								<!-- 비밀번호 변경 -->
								<div class="tab-cont userModify02">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 30%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">아이디</th>
													<td>webmaster01</td>
												</tr>
												<tr>
													<th scope="row">현재 비밀번호</th>
													<td><input type="password" class="form-control w-50p"></td>
												</tr>
												<tr>
													<th scope="row">변경 비밀번호</th>
													<td>
														<div class="form-row">
															<div class="col-6"><input type="password" class="form-control"></div>
															<div class="col-6"><span class="fs11 essential">※ 8~12자 숫자+영문자+특수문자의 조합으로 입력하세요</span></div>
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row">변경 비밀번호 확인</th>
													<td><input type="password" class="form-control w-50p"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="position-bottom btn-wrap">
										<div><button type="button" class="btn basic bi-save">저장</button></div>
									</div>
								</div>
								<!-- //비밀번호 변경 -->
							</div>	
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>	
					<script>
						$( function() {	
							$("#header .user-btn").click(function(){
								$(this).addClass("active");
								$(".popup-overlay").show();
							});

							$(".userInfoUdt .popup-close").click(function(){
								$("#header .user-btn").removeClass("active");
								$(".popup-overlay").hide();
							});
						});
					</script>
				</div>
				<!-- //top > 사용자정보 조회 및 수정 -->

				<!-- 공지사항 -->
				<div class="popup-panel popup-bbs board-notice">
					<div class="popup-header">공지사항</div>
					<div class="popup-body">
						<div class="bbs-popup-body">
							<div class="bbs-top">
								<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
								<div>
									<select class="form-select">
										<option value="">제목</option>
										<option value="">작성자</option>
									</select>
									<input type="text" class="form-control">
									<button type="submit" class="btn btn-xsm type06">검색</button>
								</div>
							</div>
	
							<div class="bbs-list-wrap" style="height: 673px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 36px;">
												<col style="width: 7%;">
												<col style="width: auto;">
												<col style="width: 55px;">
												<col style="width: 10%;">
												<col style="width: 10%;">
												<col style="width: 8%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">
														<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
													</th>
													<th scope="col">No</th>
													<th scope="col">제목</th>
													<th scope="col"></th>
													<th scope="col">등록일</th>
													<th scope="col">등록자</th>
													<th scope="col">조회수</th>
												</tr>
											</thead>
										</table>
									</div>
									<table class="bbs-list">
										<colgroup>
											<col style="width: 36px;">
											<col style="width: 7%;">
											<col style="width: auto;">
											<col style="width: 55px;">
											<col style="width: 10%;">
											<col style="width: 10%;">
											<col style="width: 8%;">
										</colgroup>
										<tbody>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>13</td>
												<td class="subject fixed"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>12</td>
												<td class="subject fixed"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>11</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>10</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>9</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>8</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>7</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>6</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>5</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>4</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>3</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>2</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>1</td>
												<td class="subject"><a href="javascript:void(0);">2021년 공공분야 가명정보 제공 실무 안내 온라인 설명회 개최 안내(6/25(금), 13:30~14:30 링크포함</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
										</tbody>
									</table>
								</div>
	
								<div class="pagination">
									<a href="javascript:void(0);" class="first" title="처음"></a>
									<a href="javascript:void(0);" class="prev" title="이전"></a>
									<strong class="current">1</strong>
									<a href="javascript:void(0);">2</a>
									<a href="javascript:void(0);">3</a>
									<a href="javascript:void(0);">4</a>
									<a href="javascript:void(0);">5</a>
									<a href="javascript:void(0);" class="next" title="다음"></a>
									<a href="javascript:void(0);" class="last" title="마지막"></a>
								</div>
	
								<div class="position-absolute left"><button type="button" class="btn basic bi-delete2">선택삭제</button></div>
								<div class="position-absolute right"><button type="button" class="btn basic bi-write2">등록</button></div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<script>
						$( function() {	
							$(".map-board .bbs-btn").click(function(){
								$(this).addClass("active");
								$(".popup-overlay").show();
							});

							$(".popup-bbs .popup-close").click(function(){
								$(".map-board .bbs-btn").removeClass("active");
								$(".popup-overlay").hide();
							});
						});
					</script>
				</div>
				<!-- //공지사항 -->

				<!-- Q&A -->
				<div class="popup-panel popup-bbs board-qna">
					<div class="popup-header">Q&A</div>
					<div class="popup-body">
						<div class="bbs-popup-body">
							<div class="bbs-top">
								<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
								<div>
									<select class="form-select">
										<option value="">제목</option>
										<option value="">작성자</option>
									</select>
									<input type="text" class="form-control">
									<button type="submit" class="btn btn-xsm type06">검색</button>
								</div>
							</div>
	
							<div class="bbs-list-wrap" style="height: 673px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 36px;">
												<col style="width: 7%;">
												<col style="width: auto;">
												<col style="width: 55px;">
												<col style="width: 10%;">
												<col style="width: 10%;">
												<col style="width: 8%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">
														<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
													</th>
													<th scope="col">No</th>
													<th scope="col">제목</th>
													<th scope="col"></th>
													<th scope="col">등록일</th>
													<th scope="col">등록자</th>
													<th scope="col">조회수</th>
												</tr>
											</thead>
										</table>
									</div>
									<table class="bbs-list">
										<colgroup>
											<col style="width: 36px;">
											<col style="width: 7%;">
											<col style="width: auto;">
											<col style="width: 55px;">
											<col style="width: 10%;">
											<col style="width: 10%;">
											<col style="width: 8%;">
										</colgroup>
										<tbody>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>13</td>
												<td class="subject fixed"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a> <span class="reply-badge">15</span></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>12</td>
												<td class="subject fixed"><a href="javascript:void(0);">OOO에서 △△△△를 ★★★★하면 □□□ 되나요?</a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>11</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a><span class="reply-badge">2</span></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>10</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>9</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>8</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>7</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>6</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>5</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>4</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>3</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>2</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
											<tr>
												<td><span class="form-checkbox"><span><input type="checkbox" name="" id=""><label for=""></label></span></span></td>
												<td>1</td>
												<td class="subject"><a href="javascript:void(0);">OOO 기능에 대해 문의 드립니다. </a></td>
												<td><a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a></td>
												<td>2021-09-11</td>
												<td>관리자1</td>
												<td>684</td>
											</tr>
										</tbody>
									</table>
								</div>
	
								<div class="pagination">
									<a href="javascript:void(0);" class="first" title="처음"></a>
									<a href="javascript:void(0);" class="prev" title="이전"></a>
									<strong class="current">1</strong>
									<a href="javascript:void(0);">2</a>
									<a href="javascript:void(0);">3</a>
									<a href="javascript:void(0);">4</a>
									<a href="javascript:void(0);">5</a>
									<a href="javascript:void(0);" class="next" title="다음"></a>
									<a href="javascript:void(0);" class="last" title="마지막"></a>
								</div>
	
								<div class="position-absolute left"><button type="button" class="btn basic bi-delete2">선택삭제</button></div>
								<div class="position-absolute right"><button type="button" class="btn basic bi-write2">등록</button></div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<script>
						$( function() {	
							$(".map-board .bbs-btn").click(function(){
								$(this).addClass("active");
								$(".popup-overlay").show();
							});

							$(".popup-bbs .popup-close").click(function(){
								$(".map-board .bbs-btn").removeClass("active");
								$(".popup-overlay").hide();
							});
						});
					</script>
				</div>
				<!-- //Q&A -->



				<div class="popup-overlay"></div>
				

			</div>
			<!-- //container -->

		</div>
		<!-- //wrap -->
		
		<script type="text/javascript">
			// 지도 타입 (2D, 3D)
			let mapType = null;
			$(function() {
				mapType = $(".map-control input[name=mapType]:checked").val();
				
				const initLocation = {
			      center: [14192012.092527417, 4507846.077882192],
			      zoom: 17
				};
				let app2D = null;
				
				// 2D, 3D 지도 전환 이벤트 연결
				$(".map-control input[name=mapType]").on("change", function() {
					const node = $(this);
					mapType = node.val(); 
					
					// 지도 변경 시 위치 정보 등 필요한 데이터 전달 및 기능 동작 중  지도 전환 시 초기화 하는 부분 협의 필요
					if(mapType == "2D") {
						// 3D 지도 제거 또는 숨김 (수정 부탁드립니다.);
						
						// 2D 지도 생성
						app2D = new App2D(initLocation);
					} else {
						// 2D 지도 제거
						if(app2D) {
							app2D.destroy();
						}
						
					}
				});
				
				// 2D, 3D 지도 전환 이벤트 실행
				$(".map-control input[name=mapType]:checked").trigger("change");
			});				
			
		</script>
		
	</body>
</html>