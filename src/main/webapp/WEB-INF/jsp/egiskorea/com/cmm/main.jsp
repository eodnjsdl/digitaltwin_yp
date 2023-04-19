<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="egis" uri="http://www.egiskorea.com/jsp/egis" %>
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title><spring:message code="site.title"/></title>

    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="/images/common/favicon.ico"/>

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

    <!-- ui -->
    <script src="/js/ui/ui.js"></script>

    <!-- toastr 2.1.4 -->
    <script type="text/javascript" src="/js/plugin/toastr-2.1.4/toastr.js"></script>
    <script type="text/javascript" src="/js/util/toast-confirm.js"></script>

	<!-- ax5 grid css -->
    <link rel="stylesheet" href="/js/plugin/ax5grid/ax5grid.css">

    <!-- common stylesheet -->
    <link rel="stylesheet" href="/css/com/common.css">
    <link rel="stylesheet" href="/css/map.css">

    <!-- toastr 2.1.4 stylesheet -->
    <link rel="stylesheet" type="text/css" href="/js/plugin/toastr-2.1.4/toastr.css">

    <!-- jspdf 6.7.0 -->
    <script src="/engine/plugin/v6.7.0/jspdf.umd.min.js"></script>
    <script src="/engine/plugin/v6.7.0/jspdf.plugin.autotable.min.js"></script>

    <!-- ax5 grid-->
    <script src="/js/plugin/ax5grid/ax5core.min.js"></script>
    <script src="/js/plugin/ax5grid/ax5grid.min.js"></script>
    

    <!-- zoom -->
    <link href="/js/plugin/jquery-fat-zoom.js/css/zoom.css" rel="stylesheet">
    <script type="text/javascript" src="/js/plugin/jquery-fat-zoom.js/dist/zoom.js"></script>

    <!-- font 맑은고딕: stre.js (지도저장기능 수행 시) -->
    <script src="/engine/plugin/v6.7.0/malgun.js"></script>

    <!-- 2d -->
    <link rel="stylesheet" href="/css/map2d.css">
	<link rel="stylesheet" href="/css/splitmap.css">
    <link rel="stylesheet" href="/engine/plugin/v6.7.0/ol.css">
    <script src="/engine/plugin/v6.7.0/proj4.js"></script>
    <script src="/engine/plugin/v6.7.0/ol.js"></script>
    <script src="/engine/plugin/v6.7.0/jsts.min.js"></script>


    <script src="/engine/dt_info.js"></script>

    <!-- DTMAP Plugin -->
    <script src="/js/plugin/lodash/lodash.min.js"></script>
    <script src="/js/plugin/html2canvas/html2canvas.min.js"></script>
    <script src="/js/plugin/eventEmitter/EventEmitter.min.js"></script>
    <script src="/js/plugin/rbush/rbush.min.js"></script>

    <!-- DTMAP -->
    <script src="/js/map/dtmap.js"></script>

    <script src="/js/map/dtmap-config.js"></script>
    <script src="/js/map/dtmap-urls.js"></script>
    <script src="/js/map/dtmap-util.js"></script>

    <!-- 2D Map js -->
    <script src="/js/map/2d/map2d.js"></script>
    <script src="/js/map/2d/config.js"></script>
    <script src="/js/map/2d/modules/map2d-baselayer.js"></script>
    <script src="/js/map/2d/modules/map2d-layer.js"></script>
    <script src="/js/map/2d/modules/map2d-measure.js"></script>
    <script src="/js/map/2d/modules/map2d-location.js"></script>
    <script src="/js/map/2d/modules/map2d-draw.js"></script>
    <script src="/js/map/2d/modules/map2d-vector.js"></script>
	<script src="/js/map/2d/modules/map2d-multiview.js"></script>

    <!-- 3D Map js -->
    <script src="/js/map/3d/map3d.js"></script>
    <script src="/js/map/3d/config.js"></script>
    <script src="/js/map/3d/modules/map3d-layer.js"></script>
    <script src="/js/map/3d/modules/map3d-color.js"></script>
    <script src="/js/map/3d/modules/map3d-compass.js"></script>
    <script src="/js/map/3d/modules/map3d-measure.js"></script>
    <script src="/js/map/3d/modules/map3d-overlay.js"></script>
    <script src="/js/map/3d/modules/map3d-location.js"></script>
    <script src="/js/map/3d/modules/map3d-draw.js"></script>
    <script src="/js/map/3d/modules/map3d-vector.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-base.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-group.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-wms.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-wfs.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-poi.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-geom.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-point.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-line.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-polygon.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-csv.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-3ds.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-img.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-shp.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-facility.js"></script>

    <!-- 양평 레이어 상수 -->
    <script src="/js/map/yp-layer.js"></script>

    <!-- 공통 파일 -->
    <script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>

    <!-- 통합행정정보 -->
    <script src="/js/egiskorea/com/cmt/uai/uai.js"></script>
    <!-- 지적/건물 -->
    <script src="/js/egiskorea/com/cmt/ldbd/selectLdbdList.js"></script>
    <!-- 내보내기 -->
    <script src="/js/egiskorea/com/cmt/dwld/dwld.js"></script>
    <!-- 메모저장 -->
    <script src="/js/egiskorea/com/cmt/mmi/mmi.js"></script>
    <!-- 사진정보 -->
    <script src="/js/egiskorea/com/cmt/pti/pti.js"></script>
    <!-- 즐겨찾기 -->
    <script src="/js/egiskorea/com/cmt/fvrt/fvrt.js"></script>
    <!-- 지도저장 -->
    <script src="/js/egiskorea/com/cmt/stre/stre.js"></script>
    <!-- 그리기 -->
    <script src="/js/egiskorea/com/cmt/grph/grph.js"></script>
    <!-- 드론영상 -->
    <script src="/js/egiskorea/com/cmt/dron/dron.js"></script>
    <!-- 3D레이어 -->

    <!-- 배경지도 -->
    <script src="/js/egiskorea/com/bcrn/bcrn.js"></script>

    <!-- 업무 -->
    <script src="/js/egiskorea/com/job/job.js"></script>
    <script src="/js/egiskorea/com/job/cmt/cmt.js"></script>
    <script src="/js/egiskorea/com/job/wrpp/wrpp.js"></script>
    <script src="/js/egiskorea/com/job/swg/swg.js"></script>
    
    <!-- uhh add...  -->
    <!-- [[업무 /시설관리 재작업]]  -->
    
	<!-- [상수도 시설] --> 
	<script src="/js/egiskorea/com/job/fcmr/wsfc/facilityWaterSupply.js"></script>		<!-- 상수도시설  공통 -->
	<!-- {상수도 하위 메뉴}  -->	
	<script src="/js/egiskorea/com/job/fcmr/wsfc/wfip/wtlFirePs.js"></script>			<!-- 소방시설  -->
	<script src="/js/egiskorea/com/job/fcmr/wsfc/wpil/wtlPipeLm.js"></script>			<!-- 상수관로 -->
	<script src="/js/egiskorea/com/job/fcmr/wsfc/wflp/wtlFlowPs.js"></script>			<!-- 유량계 -->
	<!-- 상수맨홀 -->
	<!-- 상수관로심도 -->
	<!-- 수압계 -->
	<!-- 배수지 -->
	<!-- 급수관로 -->
	<!-- 변류시설 -->
	
	<!-- ////////////////////////////  -->
	
	<!-- [하수도시설]  -->
	<!-- {하수도시설  공통} -->
	<!-- 하수연결관  -->
	<!-- 하수관거심도  -->
	<!-- 하수처리장  -->
	<!-- 하수맨홀  -->
	<!-- 면형하수관거  -->
	<!-- 하수관거  -->
	<!-- 하수펌프장  -->
	<!-- 측구  -->
	<!-- 토구  -->
	<!-- 물받이  -->
	<!-- 환기구  -->
	
	<!-- ////////////////////////////  -->
	
	<!-- [교통시설]  -->
	<script src="/js/egiskorea/com/job/fcmr/tpfc/facilityTransportation.js"></script>	<!-- 교통시설  공통 -->
	<!-- {교통 하위 메뉴}  -->	
	<!-- 도로구간  -->
	<script src="/js/egiskorea/com/job/fcmr/tpfc/rdst/roadSect.js"></script>			
	<!-- 철도선로 -->
	<script src="/js/egiskorea/com/job/fcmr/tpfc/rrtc/rlroadTc.js"></script>
	<!-- 철도역사 -->
	<script src="/js/egiskorea/com/job/fcmr/tpfc/rrst/rlroadSt.js"></script>
	<!-- 지하철선로 -->
	<script src="/js/egiskorea/com/job/fcmr/tpfc/sbtc/sbwayTc.js"></script>
	<!-- 지하철역사 -->
	<script src="/js/egiskorea/com/job/fcmr/tpfc/sbst/sbwaySt.js"></script>
	<!-- 교량 -->
	<script src="/js/egiskorea/com/job/fcmr/tpfc/brdg/brdge.js"></script>
	<!-- 고가도로 -->
	<script src="/js/egiskorea/com/job/fcmr/tpfc/ovps/ovrpass.js"></script>
	<!-- 터널 -->
	<script src="/js/egiskorea/com/job/fcmr/tpfc/tunl/tunnl.js"></script>
	
	<!-- ////////////////////////////  -->
	
	<!-- [체육시설]  -->
	<script src="/js/egiskorea/com/job/fcmr/phfc/facilityPhysicalEducation.js"></script>
	<!-- ////////////////////////////  -->
	
	<!-- [복지시설]  -->
	
	<!-- ////////////////////////////  -->
	
	<!-- [시설예약관리]  -->
	
	<!-- uhh add... end  -->
	
	
    <!-- 분석 -->
    <script src="/js/egiskorea/com/anls/anls.js"></script>

    <!-- 지적 정보 -->
    <script src="/js/egiskorea/com/geo/geographic.js"></script>
    
    <!-- 레이어 -->
	<script src="/js/egiskorea/com/sach/sach.js"></script>
    <!-- 레이어 -->
	<script src="/js/egiskorea/com/lyr/layer.js"></script>
	<!-- 주제도 -->
	<script src="/js/egiskorea/com/tm/thematicMap.js"></script>

</head>
<body class="<c:out value='${loginVO.id}'/>">
<form:form name="tmpForm" id="tmpForm" action="/" method="post">
    <input type="hidden" name="pageIndex" id="pageIndex" value="1">
</form:form>
<div id="wrap" style="background: black;">

    <!-- header -->
    <header id="header">
        <h1 class="logo"><a href="/index.html"><spring:message code="site.title"/></a></h1>
        <div class="util-box">
            <div class="user"><c:out value="${loginVO.name}"/>님
                <button type="button" class="user-btn" data-popup="userInfoUdt" data-name="사용자정보" onclick="aj_userInfoPopupOpen('<c:out value="${loginVO.id}"/>')"></button>
                <button type="button" class="info-btn" data-name="도움말" onclick="window.open('/userManual.do')"></button>
				<button type="button" class="manager-btn" data-name="관리자" onclick="window.open('/com/mngr/usr/selectGroupManageList.do')"></button>            
            	<button type="button" class="logout-btn" data-name="로그아웃" onClick="location.href='/uat/uia/logoutAction.do'"></button>
            </div>
            <ul class="GNB">
				<li>
					<span>정보공유</span>
					<ul>
						<li><button type="button" id="memoInfo" data-popup="rightPopup">메모정보</button></li>
						<li><button type="button" id="potoInfo" data-popup="rightPopup">사진정보</button></li>
						<li><button type="button" id="graphicInfo" data-popup="rightPopup">그리기정보</button></li>
					</ul>
				</li>
				<li>
					<span>영상/지도</span>
					<ul>
						<li><button type="button" id="dronInfo" data-popup="rightPopup">드론영상</button></li>
						<li><button type="button" id="dwldInfo" data-popup="rightPopup">내보내기</button></li>
						<li><button type="button" id="saveMap" data-popup="rightPopup">지도저장</button></li>
					</ul>
				</li>
				<li>
					<span>게시판</span>
					<ul>
						<li><button type="button" id="notice" data-popup="bbsPopup">공지사항</button></li>
						<li><button type="button" id="qna" data-popup="bbsPopup">QnA</button></li>
						<li><button type="button" id="opqna" data-popup="bbsPopup">운영지원</button></li>
					</ul>
				</li>
				<li>
					<span>지도설정</span>
					<ul>
						<li><button type="button" id="backgroundMapInfo" data-popup="rightPopup">배경지도</button></li>
						<li><button type="button" id="화면분할" class="rightPopup">화면분할</button></li>
						<li><button type="button" id="favorites" data-popup="rightPopup">즐겨찾기</button></li>
					</ul>
				</li>
			</ul>
			<script>
				$('.GNB li ul').slideUp();
				$('.GNB').on('mouseenter',function(){
					$('.GNB li ul').stop().slideDown(300);
				}).on('mouseleave',function(){
					$('.GNB li ul').stop().slideUp(300);
				});
			</script>
        </div>
    </header>
    <!-- //header -->

    <!-- container -->
    <div id="container">

        <!-- 지도영역 -->
        <div id="map2D" style="width: 100%; height:100%; display:none;"></div>
        <div id="map3D" style="width: 100%; height:100%; display:none; user-select:none"></div>

        <!-- map-aside -->
        <div id="map-aside">
            <div class="map-control">
			    <ul>
			        <li>
			        	<button type="button" class="ctrl-btn compass" data-name="나침반"><span style="transform: rotate(0deg);"></span></button>
		        	</li>
			        <li>
			        	<button type="button" class="ctrl-btn reset" data-name="초기화"></button>
			        	<button type="button" class="ctrl-btn globe" data-name="위치 초기화"></button>
			        </li>
			        <li>
			        	<button type="button" class="ctrl-btn integrated-info" data-popup="rightPopup" data-name="통합행정정보"></button>
						<button type="button" class="ctrl-btn building" data-popup="rightPopup" data-name="지적/건물"></button>
					</li>
			        <li class="ctrl-group">
			            <button type="button" class="ctrl-btn location" data-name="위치"></button>
			            <button type="button" class="ctrl-btn distance" data-name="거리"></button>
			            <button type="button" class="ctrl-btn measure" data-name="면적"></button>
			            <button type="button" class="ctrl-btn radius" data-name="반경"></button>
			            <button type="button" class="ctrl-btn setting" data-popup="rightPopup"  data-name="설정"></button>
			        </li>
			        <li><button type="button" class="ctrl-btn scaleUp"  data-name="확대"></button>
			            <button type="button" class="ctrl-btn scaleDown"  data-name="축소"></button>
			        </li>
			    </ul>
			</div>

            <div class="map-util">
				<div class="addrSelect">
					<form action="">
						<select name="" id="" class="form-select2">
							<option value="">지번</option>
							<option value="">도로명</option>
						</select>
						<select name="" id="" class="form-select2">
							<option value="">행정동</option>
							<option value="">강산면</option>
						</select>
						<select name="" id="" class="form-select2">
							<option value="">법정리</option>
							<option value="">경강로</option>
						</select>
						<input type="text" class="form-control" placeholder="지번 입력"> <button type="button" class="search-btn" title="검색"></button>
					</form>
					<form action="">
						축척 1 :
						<input type="text" class="form-control scale" placeholder="10000"> <button type="button" class="btn wl btn-sm type04">이동</button>
					</form>
				</div>
	
				<!-- 좌표, 축적 -->
				<div class="coordinates">
					<div class="coordi-header">
						<div>
							<span class="x">127.47609649416934</span>
							<span class="y">37.49284379468381</span>
						</div>
						<button type="button" class="btn wl btn-sm type04">위치이동</button>
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
                            <li><span class="legend"><img src="/images/legend/legend-cate01.svg" alt=""></span> 상수관로
                            </li>
                            <li><span class="legend"><img src="/images/legend/legend-cate02.svg" alt=""></span> 하수관로
                            </li>
                            <li><span class="legend"><img src="/images/legend/legend-cate03.svg" alt=""></span> 천연가스관로
                            </li>
                            <li><span class="legend"><img src="/images/legend/legend-cate04.svg" alt=""></span> 통신관로
                            </li>
                            <li><span class="legend"><img src="/images/legend/legend-cate05.svg" alt=""></span> 전력지중관로
                            </li>
                        </ul>
                    </div>
                    <div class="legend-items">
                        <ul class="vertical-list">
                            <li><span class="legend"><img src="/images/legend/legend-cate06.svg" alt=""></span> 지하수개발
                            </li>
                            <li><span class="legend"><img src="/images/legend/legend-cate07.svg" alt=""></span> 농업용 공공관정
                            </li>
                            <li><span class="legend"><img src="/images/legend/legend-cate08.svg" alt=""></span> 지하수이용시설
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <button type="button" class="legend-close" title="닫기"></button>
            <script>
                $(document).ready(function () {
                    $(".legend-panel .legend-close").click(function () {
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
				    <li data-menu="lnb-search" class=""><button type="button" class="lnb-btn">검색</button></li>
				    <li data-menu="lnb-layer" class=""><button type="button" class="lnb-btn">레이어</button></li>
				    <li data-menu="lnb-theme" class=""><button type="button" class="lnb-btn">주제도</button></li>
				    <li data-menu="lnb-space" class=""><button type="button" class="lnb-btn">공간정보</button></li>
				    <li data-menu="lnb-facility" class=""><button type="button" class="lnb-btn">시설관리</button></li>
				    <li data-menu="lnb-traffic" class=""><button type="button" class="lnb-btn">교통분석</button></li>
				    <li data-menu="lnb-administrative" class=""><button type="button" class="lnb-btn">행정자산</button></li>
				    <li data-menu="lnb-territory" class=""><button type="button" class="lnb-btn">국토조사</button></li>
				    <li data-menu="lnb-analysis" class=""><button type="button" class="lnb-btn">분석</button></li>
				</ul>
				<div class="map-type">
				    <span class="knobs">
				        <span><input type="radio" name="mapType" value="2D" id="mapType2D" checked=""><label for="mapType2D">2D</label></span>
				        <span><input type="radio" name="mapType" value="3D" id="mapType3D"><label for="mapType3D">3D</label></span>
				    </span>
				</div>
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
            </div>
            <!-- //주제도 -->
	
			<!-- 공간정보 -->
			<div class="lnb-space lnb-cont">
				<div class="lnb-header"><h2 class="tit">공간정보</h2></div>
				<div class="lnb-body">
					<div class="scroll-y">
						<ul class="lnb-list">
							<li><p class="lnb-dep1">공간정보활용</p>
								<ul class="lnb-dep2">
									<li><button id="constructionPlan" type="button" class="dataPopup" data-popup="leftPopup">사업공유관리</button></li>
									<li><button id="undergroundWaterManagement" type="button" class="dataPopup" data-popup="bottomPopup">지하수관리</button></li>
									<li><button id="renewableEnergy" type="button" class="dataPopup" data-popup="bottomPopup">신재생에너지</button></li>
									<li><button id="safetyFacilitiesManagement" type="button" class="dataPopup" data-popup="bottomPopup">안전시설물관리</button></li>
									<li><button id="inBusinessEstaInfo" type="button" class="dataPopup" data-popup="bottomPopup">관내업소정보조회</button></li>
									<li><button id="atmospherePollution" type="button" class="dataPopup" data-popup="leftPopup">대기오염</button></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div class="lnb-util"><button type="button" class="manualBtn" title="도움말"></button><button type="button" class="lnb-close" title="닫기"></button></div>
			</div>
			<!-- //공간정보 -->
			
            <!-- 시설관리 -->
			<div class="lnb-facility lnb-cont">
				<div class="lnb-header"><h2 class="tit">시설관리</h2></div>
				<div class="lnb-body">
					<div class="scroll-y">
						<ul class="lnb-list">
							<li><p class="lnb-dep1">시설관리</p>
								<ul class="lnb-dep2">
									<li><button type="button" id="waterSupplyFacility" class="dataPopup" data-popup="bottomPopup">상수도시설</button></li>
									<li><button type="button" id="sewerSupplyFacility" class="dataPopup" data-popup="bottomPopup">하수도시설</button></li>
									<li><button type="button" id="transportationFacility" class="dataPopup" data-popup="bottomPopup">교통시설</button></li>
									<li><button type="button" id="physicalEducationFacility" class="dataPopup" data-popup="bottomPopup">체육시설</button></li>
									<li><button type="button" id="welfareFacility" class="dataPopup" data-popup="bottomPopup">복지시설</button></li>
									<li><button type="button" id="faciReseMng" class="dataPopup" data-popup="leftPopup">시설예약관리</button></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div class="lnb-util"><button type="button" class="manualBtn" title="도움말"></button><button type="button" class="lnb-close" title="닫기"></button></div>
			</div>
            <!-- //시설관리 -->
            
            <!-- 교통분석 -->
            <div class="lnb-traffic lnb-cont">
				<div class="lnb-header"><h2 class="tit">교통분석</h2></div>
				<div class="lnb-body">
					<div class="scroll-y">
						<ul class="lnb-list">
							<li><p class="lnb-dep1">교통분석</p>
								<ul class="lnb-dep2">
									<li><button type="button" id="BusRouteInformation" class="dataPopup" data-popup="">버스노선정보</button></li>
									<li><button type="button" id="PopulationInformation" class="dataPopup" data-popup="">인구정보</button></li>
									<li><button type="button" id="TransportationVulnerability" id="BusRouteInformation"class="dataPopup" data-popup="">대중교통 취약분석</button></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div class="lnb-util"><button type="button" class="manualBtn" title="도움말"></button><button type="button" class="lnb-close" title="닫기"></button></div>
			</div>
            <!-- //교통분석 -->
            
			<!-- 행정자산 -->
			<div class="lnb-administrative lnb-cont">
				<div class="lnb-header"><h2 class="tit">행정자산</h2></div>
				<div class="lnb-body">
					<div class="scroll-y">
						<ul class="lnb-list">
							<li><p class="lnb-dep1">행정자산</p>
								<ul class="lnb-dep2">
									<li><button type="button" id="AdministrativeAsset" class="dataPopup" data-popup="">행정자산관리</button></li>
									<li><button type="button" id="CoownedLand" class="dataPopup" data-popup="">공유지관리</button></li>
									<li><button type="button" id="SurveyProperty" class="dataPopup" data-popup="bottomPopup">공유재산 실태조사</button></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div class="lnb-util"><button type="button" class="manualBtn" title="도움말"></button><button type="button" class="lnb-close" title="닫기"></button></div>
			</div>
			<!-- //행정자산 -->
			
			<!-- 국토조사 -->
			<div class="lnb-territory lnb-cont">
			</div>
			<!-- //국토조사 -->
			
            <!-- 분석 -->
            <div class="lnb-analysis lnb-cont">
         		<div class="lnb-header"><h2 class="tit">분석</h2></div>
				<div class="lnb-body"> 
					<div class="scroll-y">
						<ul class="lnb-list">
							<li><p class="lnb-dep1">분석</p>
								<ul class="lnb-dep2">
			                        <li>
			                            <button type="button" id="M_AI_IMAGE" class="dataPopup" data-popup="analysis-01-05" data-maptype="3D">
			                                AI영상분석(3D)
			                            </button>
			                        </li>
			                        <li>
			                            <button type="button" id="M_ROV_ANLS" class="dataPopup" data-popup="analysis-01-01" data-maptype="3D">
			                                 	조망권분석(3D)
			                            </button>
			                        </li>
			                        <li>
			                            <button type="button" id="M_SLOPE" class="dataPopup" data-popup="analysis-01-04" data-maptype="3D">
			                                	경사분석(3D)
			                            </button>
			                        </li>
			                        <li>
			                            <button type="button" id="M_SPCE_ANLS" class="dataPopup" data-maptype="2D">
			                                	공간분석
			                            </button>
			                        </li>
			                        <li>
			                            <button type="button" id="M_SUHN_ANLS" class="dataPopup" data-popup="analysis-01-02" data-maptype="3D">
			                                	일조권분석(3D)
			                            </button>
			                        </li>
			                        <li>
			                            <button type="button" id="M_TPPH_SECT" class="dataPopup" data-popup="analysis-01-06" data-maptype="3D">
			                                	지형단면도(3D)
			                            </button>
			                        </li>
			                        <li>
			                            <button type="button" id="M_UNDG_FCTY_SECT" class="dataPopup" data-popup="analysis-01-07" data-maptype="2D">
			                                	지하시설단면
			                            </button>
			                        </li>
			                        <li>
			                            <button type="button" id="M_VSBL_ANLS" class="dataPopup" data-maptype="3D">
			                                	가시권분석(3D)
			                            </button>
			                        </li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div class="lnb-util"><button type="button" class="manualBtn" title="도움말"></button><button type="button" class="lnb-close" title="닫기"></button></div>
			</div>
            <!-- //분석 -->
            
        </div>
        <!-- //side -->

		<!-- 팝업 메뉴 전체 -->
		<!-- 팝업 메뉴 기본틀 -->
        <!-- left popup-panel -->
        <div id="leftPopup" class="popup-panel popup-left">
        </div>
        <!-- //left popup-panel -->

        <!-- right popup-panel -->
        <div id="rightPopup" class="popup-panel popup-right popup-draggable">
        </div>
        <!-- //right popup-panel -->

        <!-- right-sub popup-panel -->
        <div id="rightSubPopup" class="popup-panel popup-sub popup-draggable">
        </div>
        <!-- //right-sub popup-panel -->

        <!-- bottom popup-panel -->
        <div id="bottomPopup" class="popup-panel popup-bottom">
        </div>
        <!-- //bottom popup-panel -->
         
        <!-- bbs popup-panel -->
        <div id="bbsPopup" class="popup-panel popup-bbs">
        </div>
        <!-- //bbs popup-panel -->
        <!-- //팝업 메뉴 기본틀 -->
        
        <!-- 팝업 메뉴 예외 틀 -->
        <!-- 사용자정보 조회 및  수정 -->
		<div id="userInfoUdt" class="popup-panel popup-sub userInfoUdt">
        </div>
        <!-- 사용자정보 조회 및  수정 -->
        <!-- //팝업 메뉴 예외 틀 -->
        
		<!-- //팝업 메뉴 전체 -->

        <!-- 사용자 매뉴얼 -->
        <!-- //사용자 매뉴얼 -->
		
		<!-- 업데이트 안내 -->
		<div class="basic-popup" style="width: 500px;">
			<div class="basic-header"><p class="tit">업데이트 안내</p></div>
			<div class="basic-body">
				<div class="cont">
					<p>2022.09.19기준 업데이트 </p>
					<ul class="list-type1">
						<li>내용</li>
						<li>내용내용</li>
					</ul>
				</div>
			</div>
			<div class="basic-footer">
				<form name="popupForm">
					<span class="today-checkbox">
						<input type="checkbox" name="expiredays" id="popup01"><label for="popup01">오늘 하루 팝업 더 이상 보지 않기</label>
					</span>
				</form>
			</div>
			<button type="button" class="basic-close" title="닫기"></button>
			<script>
				$(document).ready(function(){
					$(".basic-popup .basic-close").click(function(){
						$(".basic-popup").hide();
					});
					
					function closePop(){
						if(document.popupForm.expiredays.checked){
							setCookie( "popup", "hide" , 1 );
						}
					}
	
					function setCookie( cookieName, cookieValue, expireDate ){
						var today = new Date();
						today.setDate( today.getDate() + parseInt( expireDate ) );
						document.cookie = cookieName + "=" + escape( cookieValue ) + "; path=/; expires=" + today.toGMTString() + ";";
					}
	
					$("#popup01").on("click", function(){
						closePop();
						$(this).parents(".basic-popup").hide();
					});
	
	
				  if(document.cookie.indexOf("popup=hide") < 0 ){
						$(".basic-popup").show();
					}else{
						$(".basic-popup").hide();				
					}
				  
				  $('.basic-popup').draggable({
						containment: "#container",
						scroll: false,
						start: function() {
							$(this).css({transform: "none", top: $(this).offset().top+"px", left:$(this).offset().left+"px"});
						}
					});
				});
			</script>				
		</div>
		<!-- //업데이트 안내 -->
		
		<!-- 팝업 가림판 -->
		<div class="popup-overlay"></div>
		<!-- //팝업 가림판 -->
		
		<!-- 마우스 오른쪽 선택 팝업 -->
		<div class="context hide" style="top: 400px;left: 400px;">
			<a href="" class="c01">통합행정정보</a>
			<a href="" class="c02">지적/건물</a>
			<a href="" class="c03">사진등록</a>
			<a href="" class="c04">메모등록</a>
			<a href="" class="c05">위치정보</a>
			<a href="" class="c06">화면저장</a>
			<a href="" class="c07">3D전환</a>
		</div>
		<!-- //마우스 오른쪽 선택 팝업 -->
    </div>
    <!-- //container -->
</div>

<div id="toastMsg"></div>

<!-- //wrap -->
<script type="text/javascript">
    dtmap.urls.set({
        EMAP_KEY: `<spring:message code="Gis.baro2map.key"/>`
    })
    /**
     * 초기 지도 선택 가능
     * dtmap.init('2D');
     * dtmap.init('3D');
     */
    dtmap.init('2D');
    /**
     * 초기화 UI
     */
    ui.init();

</script>

</body>
</html>