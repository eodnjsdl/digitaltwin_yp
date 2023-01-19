<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="egis" uri="http://www.egiskorea.com/jsp/egis" %>
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
		
		<!-- chart.js -->
		<script src="/js/plugin/chart/chart.js"></script>
		<script src="/js/html2canvas.min.js" type="text/javascript"></script>
		<script src="/js/map-ui.js"></script>

		
		<!-- 공통 function 파일 -->
		<script src="/js/egiskorea/com/common.js"></script>
		<script src="/js/egiskorea/com/com.js"></script> 		
		<!-- 공통 파일 -->
		<script src="/js/egiskorea/com/cmm/common.js"></script>
		<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>
		<!-- 공통도구 관련 -->
		<script src="/js/egiskorea/com/cmt/ldbd/selectLdbdList.js"></script>
		<script src="/js/egiskorea/com/cmt/stre/stre.js"></script>
		<script src="/js/egiskorea/com/cmt/dwld/dwld.js"></script>
		<script src="/js/egiskorea/com/cmt/grph/grph.js"></script>
		<script src="/js/egiskorea/com/cmt/mmi/mmi.js"></script>
		<script src="/js/egiskorea/com/cmt/pti/pti.js"></script>
		<script src="/js/egiskorea/com/cmt/fvrt/fvrt.js"></script>
		<script src="/js/egiskorea/com/cmt/dron/dron.js"></script>
		<script src="/js/egiskorea/com/cmt/sach/sach.js"></script>

		<!-- 지적 관련 -->
		<script src="/js/egiskorea/com/geo/geographic.js"></script>
		<!-- 검색 관련 -->
		<script src="/js/egiskorea/com/sach/sach.js"></script>
		<!-- 주제도 관련 -->
		<script src="<c:url value='/js/egiskorea/com/tm/thematicMap.js'/>"></script>
		<!-- 레이어 관련 -->
		<script src="/js/egiskorea/com/lyr/lyr.js"></script>
        <script src="/js/egiskorea/com/lyr/layer.js"></script>

		<!-- 임시파일 -->
		<script src="/js/egiskorea/com/tmpr/temporary.js"></script>

		<link rel="stylesheet" href="/css/com/common.css">
		<link rel="stylesheet" href="/css/map.css">
		<link rel="stylesheet" href="/css/map2d.css">

		<!-- engine -->
		<script src="/engine/dt_info.js"></script>
		<script src="/engine/map_control.js"></script>
		<script src="/engine/map_event.js"></script>
		<script src="/engine/map_info.js"></script>
		<script src="/engine/map_chart.js"></script>
		<script src="/engine/map_layer.js"></script>
		<script src="/engine/ide/proj4js-combined.js"></script>
		<script src="/engine/ide/IDE.js"></script>

		<script src="/engine/ide/raphael-min.js"></script>

		<script src="/engine/ide/JSCanvasControlClass.js"></script>
		<script src="/engine/ide/JSObjectControlClass.js"></script>

		<script src="/engine/ide/JSImageClass.js"></script>

		<script src="/engine/ide/morris.min.js"></script>
		<link rel="stylesheet" href="engine/ide/morris.css">

		<!-- 2d -->
		<link rel="stylesheet" href="/engine/plugin/v6.7.0/ol.css">
		<script src="/engine/plugin/v6.7.0/proj4.js"></script>
		<script src="/engine/plugin/v6.7.0/ol.js"></script>
		<script src="/engine/plugin/v6.7.0/jsts.min.js"></script>
		<script src="/engine/plugin/v6.7.0/jspdf.umd.min.js"></script>
		<script src="/engine/plugin/v6.7.0/jspdf.plugin.autotable.min.js"></script>
		<script src="/engine/plugin/v6.7.0/malgun.js"></script>
		<script src="/engine/2d/App2D.js"></script>
		<script src="/engine/2d/map/YMap.js"></script>
		<script src="/engine/2d/map/modules/Select.js"></script>
		<script src="/engine/2d/map/modules/SelectFacility.js"></script>
		<script src="/engine/2d/map/modules/Highlight.js"></script>
		<script src="/engine/2d/map/modules/Measure.js"></script>
		<script src="/engine/2d/map/modules/DrawingTool.js"></script>
		<script src="/engine/2d/map/modules/EditTool.js"></script>
		<script src="/engine/2d/ui/MapControl.js"></script>
		<script src="/engine/2d/ui/MapCoordinates.js"></script>

		<!-- 분석  -->
		<script src="/js/egiskorea/com/anls/anls.js"></script>
		<!-- 복지시설 -->
		<script src="/js/egiskorea/com/job/wlre/wlre.js"></script>
		<!-- 가로등관리 -->
		<script src="/js/egiskorea/com/job/sffm/sffm.js"></script>
		<!-- CCTV관리 -->
		<script src="/js/egiskorea/com/job/cctv/cctv.js"></script>
		<!-- 그리기도구 -->
		<script src="/js/egiskorea/com/cmt/grph/grph3D.js"></script>

		<!-- 업무 관련 -->
		<script src="/js/egiskorea/com/job/job.js"></script>
		<script src="/js/egiskorea/com/job/spaceSearch.js"></script>
        <script src="/js/egiskorea/com/job/cmt/cmt.js"></script>
		<script src="/js/egiskorea/com/job/wrpp/wrpp.js"></script>
		<script src="/js/egiskorea/com/job/swg/swg.js"></script>
		<script src="<c:url value='/js/egiskorea/com/bcrn/bcrn.js'/>"></script><%--배경지도--%>
		<script src="/js/egiskorea/com/cmt/uai/uai.js"></script>

		<!-- 설정 -->
		<script src="/js/egiskorea/com/geo/map/map.js"></script>
	</head>
	<body class="<c:out value='${loginVO.id}'/>" onload="init2D();">
	<form:form name="tmpForm" id="tmpForm" action="/" method="post">
		<input type="hidden" name="pageIndex" id="pageIndex" value="1">
	</form:form>
		<div id="wrap"  style="background: black;">

			<!-- header -->
			<header id="header">
				<h1 class="logo"><a href="/index.html"><spring:message code="site.title" /></a></h1>
				<div class="util-box">
					<div class="user"><c:out value="${loginVO.name}" />님 <button type="button" id="userModify" class="user-btn" data-popup="userInfoUdt" onclick="aj_userInfoPopupOpen('<c:out value="${loginVO.id}" />')"></button></div> <button type="button" class="logout-btn" onClick="location.href='/uat/uia/logoutAction.do'">LOGOUT</button>
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
							<li><button type="button" id="dwldInfo" class="tool-btn icon03 dataPopup topPopup" data-popup="top-popup03" title="내보내기"></button></li>
							<li><button type="button" id="memoInfo" class="tool-btn icon04 dataPopup topPopup" data-popup="top-popup04" title="메모정보"></button></li>
							<li><button type="button" id="potoInfo" class="tool-btn icon05 dataPopup topPopup" data-popup="top-popup05" title="사진정보"></button></li>
							<li><button type="button" id="favorites" class="tool-btn icon06 dataPopup topPopup" data-popup="top-popup06" title="즐겨찾기"></button></li>
							<li><button type="button" id="" class="tool-btn icon07 dataPopup topPopup" data-popup="top-popup07" title="지도저장"></button></li>
							<li><button type="button" id="graphicInfo" class="tool-btn icon08 dataPopup topPopup" data-popup="top-popup08" title="그리기도구"></button></li>
							<li><button type="button" id="backgroundMapInfo" class="tool-btn icon09 dataPopup topPopup" data-popup="top-popup09" title="배경지도"></button></li>
							<li><button type="button" id="dronInfo" class="tool-btn icon10 dataPopup topPopup" data-popup="top-popup10" title="드론영상"></button></li>
							<li><button type="button" id="layerList" class="tool-btn icon11 dataPopup topPopup" data-popup="top-popup11" title="3D 레이어"></button></li>
						</ul>
					</div>

					<div class="map-board">
						<button type="button" class="bbs-btn notice-btn" data-popup="board-notice" title="공지사항" onclick="aj_selectNoticeList();"></button>
						<button type="button" class="bbs-btn opqna-btn" data-popup="board-opqna" title="운영지원" onclick="aj_selectOpQnaList(1)" ></button>
						<button type="button" class="bbs-btn qna-btn" data-popup="board-qna" title="게시판" onclick="aj_selectQnaList(1)"></button>
					</div>

					<div class="map-control">
						<ul>
							<li><button type="button" class="ctrl-btn compass" title="나침반"><span  name="compass" style="transform: rotate(0deg);"></span></button></li>
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
							<select class="form-select2 map-address-type">
								<option value="ldreg">지번</option>
								<option value="spbd">도로명</option>
							</select>
							<select class="form-select2 map-address-emd">
							</select>
							<select class="form-select2 map-address-li">
							</select>
							<!-- <span class="map-address-mntn-span"><input type="checkbox" id="map-address-mntn" class="map-address-mntn"><label for="map-address-mntn" style="color:#fff;">산</label></span> -->
							<span class="form-checkbox text map-address-mntn-span">
								<span><input type="checkbox" id="map-address-mntn" class="map-address-mntn"><label for="map-address-mntn" style="color:#fff;">산</label></span>
							</span>
							<input type="text" class="form-control map-address-text" placeholder="지번 입력"> <button type="button" class="search-btn map-address-search" title="검색"></button>
						</div>

						<!-- 좌표, 축적 -->
						<div class="coordinates">
							<div class="coordi-header">
								<div>
									<span class="x">127.48846105</span>
									<span class="y">37.49131546</span>
								</div>
								<!-- <button type="button" class="btn btn-sm type04">이동</button> -->
							</div>
							<div class="coordi-body">
								<div class="items">
									<h2>위도,경도 (DMS)</h2>
									<div class="row">
										<div class="c-col">
											<div class="dms-row">
												<span><input type="text" class="form-control lon-degree"><span class="form-text">도</span></span>
												<span><input type="text" class="form-control lon-minute"><span class="form-text">분</span></span>
												<span><input type="text" class="form-control lon-second"><span class="form-text">초</span></span>
												<span class="form-dash">,</span>
											</div>
										</div>
										<div class="c-col">
											<div class="dms-row">
												<span><input type="text" class="form-control lat-degree"><span class="form-text">도</span></span>
												<span><input type="text" class="form-control lat-minute"><span class="form-text">분</span></span>
												<span><input type="text" class="form-control lat-second"><span class="form-text">초</span></span>
											</div>
										</div>
									</div>
								</div>
								<div class="items">
									<h2>위도,경도 (Degree)</h2>
									<div class="row">
										<div class="c-col"><input type="text" class="form-control lon-hdms"></div>
										<div class="c-col"><input type="text" class="form-control lat-hdms"></div>
									</div>
								</div>
								<div class="items">
									<h2>사용자정의</h2>
									<div class="row">
										<div class="c-col">
											<select class="form-select3 coordi-projection" onchange="onchangeCoor()">
												<option value="EPSG:4326">EPSG : 4326</option>
												<option value="EPSG:3857">EPSG : 3857</option>
												<option value="EPSG:5179">EPSG : 5179</option>
												<option value="EPSG:5186">EPSG : 5186</option>
											</select>
										</div>
									</div>
									<div class="row">
										<div class="c-col"><input type="text" class="form-control coordi-x"></div>
										<div class="c-col"><input type="text" class="form-control coordi-y"></div>
										<div><button type="button" class="btn btn-sm type03 btn-apply">이동</button></div>
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
						<%--<%@ include file="/WEB-INF/jsp/egiskorea/com/tm/thematicMap.jsp" %>--%>
					</div>
					<!-- //주제도 -->

					<!-- 업무 -->
					<div class="lnb-work lnb-cont">
						<%@ include file="/WEB-INF/jsp/egiskorea/com/cmm/task.jsp" %>
					</div>
					<!-- //업무 -->
					
					<!-- 분석 -->
					<script>
					$(document).ready(function(){
						// 팝업창 닫기 event
					    $(".lnb-analysis .lnb-close").click(function() {
					        $(".lnb-analysis").stop().fadeOut(100);
					        $("#lnb li[data-menu]").removeClass("on");
					    });
					});
					</script>
					<div class="lnb-analysis lnb-cont">
						<div class="lnb-header"><h2 class="tit">분석</h2></div>
						<div class="lnb-body">
							<ul class="lnb-dep2" id="moduleList">
<!-- 								<li><button type="button" class="dataPopup" data-popup="analysis-01-01">조망권분석</button></li> -->
<!-- 								<li><button type="button" class="dataPopup" data-popup="analysis-01-02">일조권분석</button></li> -->
<!-- 								<li><button type="button" class="dataPopup" >가시권분석</button></li> -->
<!-- 								<li><button type="button" class="dataPopup" data-popup="analysis-01-04">경사분석</button></li> -->
<!-- 								<li><button type="button" class="dataPopup" data-popup="analysis-01-05">AI영상분석</button></li> -->
<!-- 								<li><button type="button" class="dataPopup" data-popup="analysis-01-06">지형단면도</button></li> -->
<!-- 								<li><button type="button" class="dataPopup" data-popup="analysis-01-07">지하시설단면</button></li> -->
<!-- 								<li><button type="button" class="dataPopup" >공간분석</button></li> -->
							</ul>
						</div>
						<div class="lnb-util">
							<button type="button" class="manualBtn" title="도움말" onclick="manualTab('분석')"></button>
							<button type="button" class="lnb-close" title="닫기"></button>
						</div>
					</div>
					
					<!-- //분석 -->
					
					<!-- 국토정보관리 -->
					<div class="lnb-territory lnb-cont">
					</div>
					<!-- //국토정보관리 -->
					
					<!-- 설정 -->
					<div class="lnb-setting lnb-cont">
					</div>
					<!-- //설정 -->
					
					<div class="side-util">
						<ul>
							<li data-menu="lnb-territory"><button type="button" class="side-btn territory" title="국토정보관리"></button></li>
							<li data-menu="lnb-manager"><button type="button" class="side-btn manager" title="관리자" onclick="window.open('/com/mngr/usr/selectGroupManageList.do')"></button></li>
							<li data-menu="lnb-setting"><button type="button" class="side-btn setting" title="설정"></button></li>
							<li><button type="button" class="side-btn manual" title="도움말" onclick="window.open('/userManual.do')"></button></li>
						</ul>
					</div>

				</div>
				<!-- //side -->
				
				<!-- left popup-panel -->
				<div id="leftPopup" class="popup-panel popup-left">
				</div>
				<!-- //left popup-panel -->
				
				<!-- left-sub popup-panel -->
				<div id="leftSubPopup" class="popup-panel popup-sub">
				</div>
				<!-- //left-sub popup-panel -->

				<!-- right popup-panel -->
				<div id="rightPopup" class="popup-panel popup-right">
				</div>
				<!-- //right popup-panel -->
				
				<!-- right-sub popup-panel -->
				<div id="rightSubPopup" class="popup-panel popup-sub">
				</div>
				<!-- //right-sub popup-panel -->
				
				<!-- bottom popup-panel -->
				<div id="bottomPopup" class="popup-panel popup-bottom">
				</div>
				<!-- //bottom popup-panel -->
				<!-- //LNB Popup -->

				
				<!-- top > 데이터 내보내기 -->
				<div class="popup-panel popup-right top-popup03" style="width: 420px;height: 807px;"></div>
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
													<textarea id="stre-memo" class="form-control" placeholder="메모를 작성해주세요"></textarea>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div class="position-bottom btn-wrap">
								<div><button type="button" class="btn basic bi-download">다운로드</button></div>
							</div>
						</div>

					</div>
					<button type="button" class="manualBtn" title="도움말" onclick="manualTab('지도저장')"></button>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 지도저장 -->

				<!-- top > 그리기 도구 -->
				<div class="popup-panel popup-right top-popup08">
				</div>
				<!-- //top > 그리기 도구 -->

				<!-- top > 배경지도 -->
				<div class="popup-panel popup-right top-popup09 background-map"></div>
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
					<button type="button" class="manualBtn" title="도움말" onclick="manualTab('드론영상')"></button>
					<button type="button" class="popup-close" title="닫기"></button>
				</div>
				<!-- //top > 드론영상 -->

				<!-- 업무 > 공간정보활용 > 관내업소정보조회 -->
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
					<button type="button" class="manualBtn" title="도움말" onclick="manualTab('대기오염')"></button>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-left-toggle" title="접기"></button>					
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
								<div class="chart-txt" style=""><p>보고싶은 차트를 선택해 주세요</p></div>
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
					<button type="button" class="manualBtn" title="도움말" onclick="manualTab('상수도시설')"></button>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 상수도시설 > 소방시설 -->
				
				<!-- 업무 > 시설관리 > 상수도시설 > 소방시설 상세보기 -->
				<div class="popup-panel popup-sub work-02-01-detail" style="top: 80px;right: 70px;width: 550px;height: 457px;">
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
				<div class="popup-panel popup-sub work-02-01-regist" style="top: 80px;right: 70px;width: 550px;height: 457px;">
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
					<button type="button" class="manualBtn" title="도움말" onclick="manualTab('하수도시설')"></button>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 하수도시설 > 하수연결관 -->
				
				<!-- 업무 > 시설관리 > 하수도시설 > 하수연결관 상세보기 -->
				<div class="popup-panel popup-sub work-02-02-01-detail" style="top: 80px;right: 70px;width: 550px;height: 457px;">
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
				<div class="popup-panel popup-sub work-02-02-regist" style="top: 80px;right: 70px;width: 550px;height: 457px;">
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
					<button type="button" class="manualBtn" title="도움말" onclick="manualTab('교통시설')"></button>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 교통시설 > 도로구간 -->
				
				<!-- 업무 > 시설관리 > 교통시설 > 도로구간 상세보기 -->
				<div class="popup-panel popup-sub work-02-03-01-detail" style="top: 80px;right: 70px;width: 550px;height: 457px;">
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
<%-- 				<c:import url="../job/spor/sportsList.jsp"></c:import> --%>
				<!-- /digitaltwin/src/main/webapp/WEB-INF/jsp/egiskorea/com/job/spor/sportsList.jsp -->
				<!-- 업무 > 시설관리 > 체육시설 -->
			
				<!-- //업무 > 시설관리 > 체육시설 -->

				<!-- 업무 > 공간정보활용 > 공간정보 편집도구 -->
				<div class="popup-panel popup-sub space-edit-tool" style="top: 80px;left: 320px;width: 385px;height: 200px;">
				</div>
				<!-- //업무 > 공간정보활용 > 공간정보 편집도구 -->


<!-- 				분석 > 조망권분석 -->
<!-- 				//분석 > 조망권분석 -->
<!-- 				분석 > 일조권분석 -->
<!-- 				//분석 > 일조권분석 -->
<!-- 				분석 > 경사분석 -->
<!-- 				//분석 > 경사분석 -->
<!-- 				분석 > 국공유지AI분석 -->
			
				<!-- 국토정보관리 > 등록하기 -->
				
				<!-- //국토정보관리 > 등록하기 -->

				<!-- 국토정보관리 > 속성정보 > 목록 -->
				
				<!-- //국토정보관리 > 속성정보 > 목록 -->

				<!-- 국토정보관리 > 속성정보 > 더보기 -->
				
				<!-- //국토정보관리 > 속성정보 > 더보기 -->


				<!-- top > 사용자정보 조회 및 수정 -->
				<div class="popup-panel popup-sub userInfoUdt" id="userInfo" >

				</div>
				<!-- //top > 사용자정보 조회 및 수정 -->

				<!-- 공지사항 -->
				<div class="popup-panel popup-bbs board-notice" id="notice">
				</div>
				<!-- //공지사항 -->
				
				<!-- 운영지원 -->
				<div class="popup-panel popup-bbs board-opqna" id="opqna">
				</div>
				<!-- //Q&A -->

				<!-- Q&A -->
				<div class="popup-panel popup-bbs board-qna" id="qna">
				</div>
				<!-- //Q&A -->



				<div class="popup-overlay"></div>
			
				<!-- 사용자 매뉴얼 -->
				<!-- //사용자 매뉴얼 -->

			</div>
			
			<!-- //container -->
		</div>
		
		<div id="toastMsg"></div>
		
		<!-- //wrap -->
		<script type="text/javascript">

			let app2D = null;
			let mapType = null; // 지도 타입 (2D, 3D)
			let m_bgType = null; //배경지도 타입 변수 기본값
			let mapServiceVO = null;
			let groupId = '<c:out value="${loginVO.groupId}" />'; //그룹 정보
			let is3dInit = false;	// 3D초기화 작업(한번만, 3D버튼-업무버튼-분석버튼-통합행정정보 중 처음 클릭시)
			let is3dBtn = false;	// 3D버튼 클릭인지 확인

			let coordinate2d = null;

			const initLocation = {
				center: [999028.8152684278, 1943589.1358372485],
				zoom: 17,
				extent : [982850.492470957, 1929803.45921341, 1030749.12996284, 1963477.22301901]
			};

			const store = new Store(); // 전역 저장소






			$(function() {
				mapServiceVO = aj_selectBackgroundMapBasicAtInfo(); //기본배경지도 정보 조회
				mapType = $(".map-control input[name=mapType]:checked").val();

				//2D 지도 생성
				if(!($("body").hasClass("hanam") || $("body").hasClass("gimpo") || $("body").hasClass("uijeongbu"))){
					app2D = new A
					pp2D(`<spring:message code="Gis.baro2map.key"/>`, initLocation, mapServiceVO.serviceId);
					app2D.selectBaseLocation(app2D.yMap); //즐겨찾기 장소 저장 (2D)

				}

				//제일 처음 3D 전환 버튼 클릭시 3D 지도 생성
				/* $(".map-control #mapType3D").one("click", function() {
					if(!is3dInit){
						loadingShowHide('show')
						call3D(true);

						is3dInit = true;
					}
				}); */

				// 2D, 3D 지도 전환 이벤트 연결
				$(".map-control input[name=mapType]").on("change", function() {
					const node = $(this);
					mapType = node.val();

					store.layerIds = []; // 레이어 초기화
					store.addLayerId("tgd_scco_sig");

					// 지도 변경 시 위치 정보 등 필요한 데이터 전달 및 기능 동작 중  지도 전환 시 초기화 하는 부분 협의 필요
					if(mapType == "2D") {
						m_bgType = (m_bgType == null) ? 'air' : m_bgType ;

						//분석 켜져있을시 div삭제 및 실행중인모듈 초기화
						removeAnalysis();
						// 2D 지도 생성
						app2D = new App2D(`<spring:message code="Gis.baro2map.key"/>`, initLocation, m_bgType);

						changeMap("2D");
						onOffLayer2D("S", "140", true);
						loadingShowHide('hide');
					} else {
						//$(".map-control #mapType3D").on("click", function() {
							if(!is3dInit){
								loadingShowHide('show')
								call3D(true);

								is3dInit = true;
							}else{
								loadingShowHide('show')
								//맵전환 2D/3D 위치,켜진레이어,줌 동기화_박규호
								changeMap("3D");

								// 2D 지도 제거
								if(app2D) {
									app2D.destroy();
									app2D = null;
								}

								loadWMS_3D("layer_S_140", storageId + ":tgd_scco_sig", "");
								loadingShowHide('hide');
							}

						//});
					}
				});

				// 양평 외 지역
				if($("body").hasClass("hanam") || $("body").hasClass("gimpo") || $("body").hasClass("uijeongbu")){
					$("#mapType3D").prop("checked", true);
					mapType = "3D";
				}
			});


			function init2D() {
				store.addLayerId("tgd_scco_li");
				store.addLayerId("tgd_scco_sig");
				store.addLayerId("tgd_scco_emd");
				onOffLayer2D("S", "139", true); //리
				onOffLayer2D("S", "140", true); //시군구
				onOffLayer2D("S", "138", true); //읍면동
			}

			// 3D 지도 생성
			function call3D(btn) {
				is3dBtn = btn;

				console.log("3D 지도 생성");
				var engineVersion = "v0.0.0.1";
				var initScript = document.createElement("script");

				initScript.src = "../engine/map_init.js?p=" + engineVersion;
				document.body.appendChild(initScript);
			}

			// 2D/3D맵 전환_박규호_
			function changeMap(type){
				$('.popup-close').trigger('click');
				$('input:checkbox').each(function(){
				    $(this).prop("checked",false);
				});
				$('div').each(function(){
				    $(this).removeClass('opened');
				});
				$('.lnb-body>ul>li').removeClass('on');
				$('#lnb>ul>li').removeClass('on');
				$('.side-util>ul>li').removeClass('on');
				$('.ctrl-group>button').removeClass('active');
				$(".lnb-cont").css("display","none");

				if(type=="2D"){
					$('.reset').trigger('click');
					var userlayerFalse = new Module.JSLayerList(false);
					var falseCount = userlayerFalse.count();
					for(var i =0; i<falseCount;i++){
						userlayerFalse.delLayerAtLast();
					}

					var userlayerTrue = new Module.JSLayerList(true);
					var count = userlayerTrue.count();
					for(var i =0; i<count;i++){
						userlayerTrue.delLayerAtLast();
					}
					setTiltCustom(90);
					//공통함수는 app2D바뀌는 속도랑 함수 속도 때문에 제어 힘들어서 코드가져와서 씀 _박규호
			    	var alt =Module.getViewCamera().getAltitude();
			    	alt = nearArr(alt);
			    	var zoom = changZoom(alt);
			    	var center = Module.getViewCamera().getCenterPoint();
			    	var centerLonLat = proj4("EPSG:4326", "EPSG:5179", [center.Longitude,center.Latitude]);
			    	app2D.getYMap().getMap().getView().setCenter(centerLonLat); 	//바로이동
			    	app2D.getYMap().getMap().getView().setZoom(zoom);

			    	// 나침반 정북방향 세팅
			    	$("span[name='compass']").css("transform", "rotate(0deg)");
				}else if(type=="3D"){
					init3D();
				    var zoom = app2D.getYMap().getMap().getView().getZoom();
				    zoom =Math.round(zoom);
				    app2D.getYMap().getMap().getView().setZoom(zoom);
				    var center = cmmUtil.getMapCenter();
				    var centerLonLat = proj4("EPSG:5179", "EPSG:4326", [center[0],center[1]]);
					var camera = Module.getViewCamera();
					zoom =zoomArr[zoom];
					var lon = centerLonLat[0];
					var lat = centerLonLat[1];
					var alt = Module.getMap().getTerrHeightFast(parseFloat(lon), parseFloat(lat));

					var location = new Module.JSVector3D(lon, lat, alt);
					camera.moveLookAt(location, 30, 0, zoom * 0.9);
					/* camera.setTilt(90);
					camera.moveLonLatAlt(centerLonLat[0], centerLonLat[1],zoom,false); */
				}
			}

			var zoomArr =[3261870,3261870,3261870,3261870,3261870,3261870,3261870,2258000,976670,564200,267000,145500,70100,35280,17750,8950,4350,2150,1100,600]
			//높이 값 근사치 배열에서 구하기_박규호
			function nearArr(alt){
			var closest = zoomArr.reduce(function (prev, curr){
				  return (Math.abs(curr - alt) < Math.abs(prev - alt) ? curr : prev);
				});
			return closest;
			}
			//높이값->ZOOM_박규호
			function changZoom(alt){
				switch(alt)
				{
					case(3261870):
						return 6;
						break;
					case(2258000):
						return 7;
						break;
					case(976670):
						return 8;
						break;
					case(564200):
						return 9;
						break;
					case(267000):
						return 10;
						break;
					case(145500):
						return 11;
						break;
					case(70100):
						return 12;
						break;
					case(35280):
						return 13;
						break;
					case(17750):
						return 14;
						break;
					case(8950):
						return 15;
						break;
					case(4350):
						return 16;
						break;
					case(2150):
						return 17;
						break;
					case(1100):
						return 18;
						break;
					case(600):
						return 19;
						break;
				}
			}

			//즐겨찾기
			//var xloc = ${fvrtList.xcord};
			//var yloc = ${fvrtList.ycord};
			//var baseLocation = proj4("EPSG:5179", "EPSG:4326", [xloc, yloc]);
			var baseLocation = null;


			</script>

	</body>
</html>