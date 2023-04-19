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

		
		<!-- 공통 function 파일 -->
		<script src="/js/egiskorea/com/common.js"></script>
		<script src="/js/egiskorea/com/com.js"></script> 		
		<!-- 공통 파일 -->
		<script src="/js/egiskorea/com/cmm/common.js"></script>
		<!-- 공통도구 관련 -->
		<script src="/js/egiskorea/com/cmt/ldbd/selectLdbdList.js"></script>
		<script src="/js/egiskorea/com/cmt/stre/stre.js"></script>
		<script src="/js/egiskorea/com/cmt/dwld/dwld.js"></script>
		<script src="/js/egiskorea/com/cmt/grph/grph.js"></script>
		<script src="/js/egiskorea/com/cmt/mmi/mmi.js"></script>
		<script src="/js/egiskorea/com/cmt/pti/pti.js"></script>
		<script src="/js/egiskorea/com/cmt/fvrt/fvrt.js"></script>
		<script src="/js/egiskorea/com/cmt/dron/dron.js"></script>

		<!-- 지적 관련 -->
		<script src="/js/egiskorea/com/geo/geographic.js"></script>
		<!-- 검색 관련 -->
		<!-- 주제도 관련 -->
		<script src="<c:url value='/js/egiskorea/com/tm/thematicMap.js'/>"></script>
		
		<link rel="stylesheet" href="/css/com/common.css">
		<link rel="stylesheet" href="/css/map.css">
		<link rel="stylesheet" href="/css/map2d.css">

		<!-- 업무 관련 -->
		<script src="/js/egiskorea/com/job/job.js"></script>
		<script src="/js/egiskorea/com/job/spaceSearch.js"></script>
        <script src="/js/egiskorea/com/job/cmt/cmt.js"></script>
		<script src="/js/egiskorea/com/job/wrpp/wrpp.js"></script>
		<script src="/js/egiskorea/com/job/swg/swg.js"></script>
		
	</head>
	<body>
		<input type="hidden" id="prmTxt" value="${txt }">
                <div class="manual-panel">
					<div class="manual-header"><p class="tit">사용자 메뉴얼</p></div>
					<div class="manual-body">
						<div class="manual-lnb scroll-y">
							<ul class="manual-dep1">
								<li><button type="button" class="dep1-tit" title="접기">통합검색</button>
									<ul class="manual-dep2">
										<li><button type="button" class="dep2-tit" data-manual="sach-01">통합검색</button></li>
										<li><button type="button" class="dep2-tit" data-manual="sach-02">주소검색(지번)</button></li>
										<li><button type="button" class="dep2-tit" data-manual="sach-03">주소검색(도로명)</button></li>
										<li><button type="button" class="dep2-tit" data-manual="sach-04">공간검색(영역)</button></li>
										<li><button type="button" class="dep2-tit" data-manual="sach-05">공간검색(시설물)</button></li>
									</ul>
								</li>
								<li><button type="button" class="dep1-tit" title="펼치기">공통도구</button>
									<ul class="manual-dep2">
										<li><button type="button" class="dep2-tit">정보조회</button>
											<ul class="manual-dep3">
												<li><button type="button" class="dep3-tit" data-manual="info-01">통합행정정보</button></li>
												<li><button type="button" class="dep3-tit" data-manual="info-02">지적/건물</button></li>
												<li><button type="button" class="dep3-tit" data-manual="info-03">데이터 내보내기</button></li>
												<li><button type="button" class="dep3-tit" data-manual="info-04">메모정보</button></li>
												<li><button type="button" class="dep3-tit" data-manual="info-05">사진정보</button></li>
												<li><button type="button" class="dep3-tit" data-manual="info-06">즐겨찾기</button></li>
												<li><button type="button" class="dep3-tit" data-manual="info-07">지도저장</button></li>
												<li><button type="button" class="dep3-tit" data-manual="info-08">그리기 도구</button></li>
												<li><button type="button" class="dep3-tit" data-manual="info-09">배경지도</button></li>
												<li><button type="button" class="dep3-tit" data-manual="info-10">드론영상</button></li>
											</ul>
										</li>
										<li><button type="button" class="dep2-tit">제어도구</button>
											<ul class="manual-dep3">
												<li><button type="button" class="dep3-tit" data-manual="tool-01">지도제어</button></li>
												<li><button type="button" class="dep3-tit" data-manual="tool-02">레이어</button></li>
											</ul>
										</li>
									</ul>
								</li>
								<li><button type="button" class="dep1-tit" title="펼치기">업무</button>
									<ul class="manual-dep2">
										<li><button type="button" class="dep2-tit">공간정보활용</button>
											<ul class="manual-dep3">
												<li><button type="button" class="dep3-tit" data-manual="shape-01">공간검색공통</button></li>
												<li><button type="button" class="dep3-tit" data-manual="shape-02">사업공유관리</button></li>
												<li><button type="button" class="dep3-tit" data-manual="shape-03">지하수관리</button></li>
												<li><button type="button" class="dep3-tit" data-manual="shape-04">신재생에너지</button></li>
												<li><button type="button" class="dep3-tit" data-manual="shape-05">안전시설물관리</button></li>
												<li><button type="button" class="dep3-tit" data-manual="shape-06">관내업소정보조회</button></li>
												<li><button type="button" class="dep3-tit" data-manual="shape-07">대기오염</button></li>
											</ul>
										</li>
										<li><button type="button" class="dep2-tit">시설관리</button>
											<ul class="manual-dep3">
												<li><button type="button" class="dep3-tit" data-manual="fcty-01">상수도시설</button></li>
												<li><button type="button" class="dep3-tit" data-manual="fcty-02">하수도시설</button></li>
												<li><button type="button" class="dep3-tit" data-manual="fcty-03">교통시설</button></li>
												<li><button type="button" class="dep3-tit" data-manual="fcty-04">체육시설</button></li>
												<li><button type="button" class="dep3-tit" data-manual="fcty-05">복지시설</button></li>
												<li><button type="button" class="dep3-tit" data-manual="fcty-06">시설예약관리</button></li>
											</ul>
										</li>
										<li><button type="button" class="dep2-tit">분석</button>
											<ul class="manual-dep3">
												<li><button type="button" class="dep3-tit" data-manual="anls-01">AI영상분석(3D)</button></li>
												<li><button type="button" class="dep3-tit" data-manual="anls-02">조망권분석(3D)</button></li>
												<li><button type="button" class="dep3-tit" data-manual="anls-03">경사분석(3D)</button></li>
												<li><button type="button" class="dep3-tit" data-manual="anls-04">공간분석</button></li>
												<li><button type="button" class="dep3-tit" data-manual="anls-05">일조권분석(3D)</button></li>
												<li><button type="button" class="dep3-tit" data-manual="anls-06">지형단면도(3D)</button></li>
												<li><button type="button" class="dep3-tit" data-manual="anls-07">지하시설단면도</button></li>
												<li><button type="button" class="dep3-tit" data-manual="anls-08">가시권분석(3D)</button></li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="manual-container">
							<div class="manual-wrap scroll-y">
								
								<!-- 통합검색 > 통합검색 -->
								<div class="manual-cont sach-01 on">
									<div class="manual-tit"><p><strong>통합검색</strong></p> <span class="manual-txt">시설 명칭에 대한 통합검색을 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/sach-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 검색</li>
													<li><span class="num">2</span>통합검색 탭을 선택합니다.</li>
													<li><span class="num">3</span>조건(시설명)을 입력하고 검색 버튼을 클릭합니다.</li>
													<li><span class="num">4</span>검색 결과와 건수를 표시합니다.</li>
													<li><span class="num">5</span>검색된 결과를 클릭하면 해당 시설의 위치로<br>이동하고 해당 위치를 표시합니다.</li>
													<li><span class="num">6</span>검색결과를 엑셀파일로 다운로드 합니다.</li>
													<li><span class="num">7</span>검색조건 및 결과를 초기화합니다.</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<!-- //통합검색 > 통합검색 -->

								<!-- 통합검색 > 주소검색(지번) -->
								<div class="manual-cont sach-02">
									<div class="manual-tit"><p><strong>주소검색(지번)</strong></p> <span class="manual-txt">지번주소로 위치 검색을 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/sach-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 검색</li>
													<li><span class="num">2</span>주소검색 탭을 선택한 뒤 지번주소 탭을 선택합니다.</li>
													<li><span class="num">3</span>조건(읍면동, 리, 번지)을 입력하고 검색 버튼을 클릭합니다.</li>
													<li><span class="num">4</span>검색 결과와 건수를 표시합니다.</li>
													<li><span class="num">5</span>검색된 결과를 클릭하면 해당 주소 위치로 이동하고 <br>해당 위치를 표시합니다.</li>
													<li><span class="num">6</span>검색조건 및 결과를 초기화합니다.</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<!-- //통합검색 > 주소검색(지번) -->

								<!-- 통합검색 > 주소검색(도로명) -->
								<div class="manual-cont sach-03">
									<div class="manual-tit"><p><strong>주소검색(도로명)</strong></p> <span class="manual-txt">도로명주소로 위치 검색을 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/sach-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 검색</li>
													<li><span class="num">2</span>주소검색 탭을 선택한 뒤 도로명주소 탭을 선택합니다.</li>
													<li><span class="num">3</span>조건(읍면동, 도로명, 건물번호)을 입력하고 <br>검색 버튼을 클릭합니다.</li>
													<li><span class="num">4</span>검색 결과와 건수를 표시합니다.</li>
													<li><span class="num">5</span>검색된 결과를 클릭하면 해당 주소 위치로 이동하고<br>해당 위치를 표시합니다.</li>
													<li><span class="num">6</span>검색조건 및 결과를 초기화합니다.</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<!-- //통합검색 > 주소검색(도로명) -->

								<!-- 통합검색 > 공간검색(영역) -->
								<div class="manual-cont sach-04">
									<div class="manual-tit"><p><strong>공간검색(영역)</strong></p> <span class="manual-txt">영역기준으로 공간검색을 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/sach-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 검색</li>
													<li><span class="num">2</span>공간검색 탭을 선택한 뒤 영역기준 탭을 선택합니다.</li>
													<li><span class="num">3</span>검색대상과 검색영역을 설정하고 검색버튼을 클릭합니다. <br>
														검색영역은 현재 화면 영역과 사용자가 정의하는 영역(점, 선, 다각형, 원)이 있습니다.  설정된 영역을 버퍼를 추가로 설정할 수 있습니다.</li>
													<li><span class="num">4</span>검색 결과와 건수를 표시합니다.</li>
													<li><span class="num">5</span>검색된 결과를 클릭하면 해당 주소 위치로 이동하고 해당 위치를 표시합니다.</li>
													<li><span class="num">6</span>검색조건 및 결과를 초기화합니다.</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<!-- //통합검색 > 공간검색(영역) -->

								<!-- 통합검색 > 공간검색(시설물) -->
								<div class="manual-cont sach-05">
									<div class="manual-tit"><p><strong>공간검색(시설물)</strong></p> <span class="manual-txt">시설물기준으로 공간검색을 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/sach-05.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 검색</li>
													<li><span class="num">2</span>공간검색 탭을 선택한 뒤 시설물기준 탭을 선택합니다.</li>
													<li><span class="num">3</span>검색대상과 검색위치에 있는 시설을 설정하고 검색버튼을 클릭합니다. <br>검색 위치의 시설과 버퍼를 이용하여 해당 시설을 주변까지 검색합니다.</li>
													<li><span class="num">4</span>검색 결과와 건수를 표시합니다.</li>
													<li><span class="num">5</span>검색된 결과를 클릭하면 해당 주소 위치로 이동하고 해당 위치를 표시합니다.</li>
													<li><span class="num">6</span>검색조건 및 결과를 초기화합니다.</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<!-- //통합검색 > 공간검색(시설물) -->
								
								<!-- 공통도구 > 정보조회 > 통합행정정보 -->
								<div class="manual-cont info-01">
									<div class="manual-tit"><p>통합행정정보<strong> > <u>1. 토지대장 조회</u></strong></p> <span class="manual-txt">통합행정정보 중 토지대장을 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/info-01-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 통합행정정보 ▶ 토지대장</li>
													<li><span class="num">2</span>읍/면/리, 지번을 선택/입력하여 검색 시, 해당 지적을 지도 상에 표시하고 통합행정정보를 조회합니다.</li>
													<li><span class="num">3</span>국토조사정보를 조회합니다.</li>
													<li><span class="num">4</span>통합행정정보를 엑셀 다운로드합니다.</li>
													<li><span class="num">5</span>통합행정정보 선택 후, 지도 상의 지적 선택 시 해당 지적을 표시하고 통합행정정보를 조회합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>통합행정정보<strong> > <u>2. 건축물대장 조회 </u></strong></p> <span class="manual-txt">통합행정정보 중 건축물대장을 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-01-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 통합행정정보 ▶ 건축물대장</li>
													<li><span class="num">2</span>읍/면/리, 지번을 선택/입력하여 검색 시, 해당 지적을 <br>지도 상에 표시하고 통합행정정보를 조회합니다.</li>
													<li><span class="num">3</span>통합행정정보를 엑셀 다운로드합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>통합행정정보<strong> > <u>3. 토지이용계획 조회</u></strong></p> <span class="manual-txt">통합행정정보 중 토지이용계획을 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-01-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 통합행정정보 ▶ 토지이용계획</li>
													<li><span class="num">2</span>읍/면/리, 지번을 선택/입력하여 검색 시, 해당 지적을<br>지도 상에 표시하고 통합행정정보를 조회합니다.</li>
													<li><span class="num">3</span>통합행정정보를 엑셀 다운로드합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>통합행정정보<strong> > <u>4. 공시지가 조회</u></strong></p> <span class="manual-txt">통합행정정보 중 공시지가를 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-01-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 통합행정정보 ▶ 공시지가</li>
													<li><span class="num">2</span>읍/면/리, 지번을 선택/입력하여 검색 시, 해당 지적을 <br>지도 상에 표시하고 통합행정정보를 조회합니다.</li>
													<li><span class="num">3</span>통합행정정보를 엑셀 다운로드합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>통합행정정보<strong> > <u>5. 개별주택가격 조회</u></strong></p> <span class="manual-txt">통합행정정보 중 개별주택가격을 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-01-05.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 통합행정정보 ▶ 개별주택가격</li>
													<li><span class="num">2</span>읍/면/리, 지번을 선택/입력하여 검색 시, 해당 지적을<br>지도 상에 표시하고 통합행정정보를 조회합니다.</li>
													<li><span class="num">3</span>통합행정정보를 엑셀 다운로드합니다.</li>
												</ul>
											</div>
										</div>
									</div>

								</div>
								<!-- //공통도구 > 정보조회 > 통합행정정보 -->

								<!-- 공통도구 > 정보조회 > 지적/건물 -->
								<div class="manual-cont info-02">
									<div class="manual-tit"><p><strong>지적/건물</strong></p> <span class="manual-txt">통합행정정보 중 지적/건물을 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 지적/건물 조회</li>
													<li><span class="num">2</span>지도에서 지적/건물 선택을 선택합니다.</li>
													<li><span class="num">3</span>②에서 선택된 항목의 정보를 우측리스트에 표현합니다.</li>
													<li><span class="num">4</span>②에서 선택된 항목의 위치로 이동합니다.</li>              
												</ul>
											</div>
										</div>
									</div>
								</div>
								<!-- //공통도구 > 정보조회 > 지적/건물 -->

								<!-- 공통도구 > 정보조회 > 데이터 내보내기 -->
								<div class="manual-cont info-03">
									<div class="manual-tit"><p>데이터 내보내기 <strong>> <u>1. 영역기준 조회</u></strong></p> <span class="manual-txt">영역기준의 데이터를 내보내기합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/info-03-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 데이터 내보내기 ▶ 영역 기준</li>
													<li><span class="num">2</span>영역기준탭 - 검색영역지정
														<p class="manual-list2">현재화면영역을 선택한경우 현재 화면을 기준으로 합니다. (⑥ 번의 기능은 사용하실수 없습니다.) </p>
													</li>
													<li><span class="num">3</span>영역기준탭 - 사용자정의 탭
														<ul class="manual-list2">
															<li>⑤번 안에있는 점,선,면,원 을 선택후 ⑥번의 경계범위를 입력해 사용자가 지도에 그린 도형으로부터 <br>⑥번 입력값 이내 범위를 설정할 수 있습니다.</li>
															<li>점 : ⑤번에서 점을 선택 후 지도클릭시 선택한곳에 점을 생성합니다.</li>
															<li>선 : ⑤번에서 선을 선택 후 지도클릭시 두 곳 이상을 클릭후 더블클릭하여 선을 생성합니다.</li>
															<li>면 : ⑤번에서 면을 선택 후 지도에서 드래그하여 면을 생성합니다.</li>
															<li>원 : ⑤번에서 원을 선택 후 지도에서 드래그하여 원을 생성합니다.</li>
														</ul>
													</li>
													<li><span class="num">7</span>데이터 내보내기 할 시설물을 선택할 수 있습니다.</li>
													<li><span class="num">8</span>⑦번에서 선택한 시설물값을 ④번에서 선택한 데이터 파일로 내보내기 합니다.</li>
													<li><span class="num">9</span>초기화 버튼 클릭시 검색조건과 도형을 초기화 합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>데이터 내보내기 <strong>> <u>2. 시설물기준 조회</u></strong></p> <span class="manual-txt">시설물기준의 데이터를 내보내기합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-03-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 데이터 내보내기 ▶ 시설물 기준</li>
													<li><span class="num">2</span>시설물을 선택할 수 있습니다. <br>시설물을 선택 하지 않을 시, 내보내기 기능을 이용할 수 없습니다.</li>
													<li><span class="num">3</span>지도에서 선택버튼을 누르면 선택한 시설물이 지도에 표현됩니다.</li>
													<li><span class="num">4</span>지도에서 표현된 시설물을 선택할 수 있습니다.</li>
													<li><span class="num">5</span>선택한 시설물로부터 ⑤번의 입력 값 범위내의 <br>시설물을 조회할 수 있습니다.</li>
													<li><span class="num">6</span>④번에서 선택한 시설물범위내의 ⑥번의 리스트들의 <br>시설물을 선택할 수 있습니다.</li>
													<li><span class="num">7</span>선택한 파일로 내보내기 할 수 있습니다.</li>
													<li><span class="num">8</span>④번에서 선택한 시설물의 ⑤값의 범위 내로 <br>⑥번에서의 선택된 시설물데이터를 ⑦번 파일로 내보내기 합니다.</li>
													<li><span class="num">9</span>검색 값과 지도에 표현된 시설물을 초기화 합니다.</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<!-- //공통도구 > 정보조회 > 데이터 내보내기 -->

								<!-- 공통도구 > 정보조회 > 메모정보 -->
								<div class="manual-cont info-04">
									<div class="manual-tit"><p>메모정보 <strong>> <u>1. 조회</u></strong></p> <span class="manual-txt">메모정보를 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-04-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 메모정보</li>
													<li><span class="num">2</span>조건을 선택하고 조회합니다.</li>
													<li><span class="num">3</span>메모정보 등록페이지로 이동합니다.</li>
													<li><span class="num">4</span>메모정보를 상세페이지로 이동합니다.</li>
													<li><span class="num">5</span>마커 클릭시 해당 메모정보의 상세페이지로 이동합니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>메모정보 <strong>> <u>2. 등록</u></strong></p> <span class="manual-txt">메모정보를 등록합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-04-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 메모정보 ▶ 등록</li>
													<li><span class="num">2</span>­메모정보 내용을 입력합니다.</li>
													<li><span class="num">3</span>지도에서 선택하기를 누른 후 지도에서 해당 지역을 <br>클릭하면 클릭위치의 지번을 얻을 수 있습니다.</li>
													<li><span class="num">4</span>메모정보를 등록합니다. 목록으로 이동합니다.</li>
													<li><span class="num">5</span>메모정보 등록을 취소합니다. 목록으로 이동합니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>메모정보 <strong>> <u>3. 상세조회</u></strong></p> <span class="manual-txt">메모정보를 상세조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/info-04-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 메모정보 ▶ 제목선택</li>
													<li><span class="num">2</span>­상세페이지로 이동되며 해당지역으로 지도 이동합니다.</li>
													<li><span class="num">3</span>메모정보 목록페이지로 이동합니다.</li>
													<li><span class="num">4</span>메모정보 수정페이지로 이동합니다.</li>
													<li><span class="num">5</span>해당 메모정보를 삭제합니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>메모정보 <strong>> <u>4. 수정</u></strong></p> <span class="manual-txt">메모정보를 수정합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-04-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 메모정보 ▶ 제목선택 ▶ 수정</li>
													<li><span class="num">2</span>­내용을 수정합니다. <br>지도에서 다시 선택하여 위치를 수정할 수 있습니다.</li>
													<li><span class="num">3</span>메모정보 수정 내용을 수정합니다.</li>
													<li><span class="num">4</span>메모정보 수정을 취소합니다.메모정보 상세페이지로 이동합니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

								</div>
								<!-- //공통도구 > 정보조회 > 메모정보 -->

								<!-- 공통도구 > 정보조회 > 사진정보 -->
								<div class="manual-cont info-05">
									<div class="manual-tit"><p>사진정보 <strong>> <u>1. 조회</u></strong></p> <span class="manual-txt">사진정보를 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-05-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 사진정보</li>
													<li><span class="num">2</span>조건을 선택하고 조회합니다.</li>
													<li><span class="num">3</span>사진정보를 등록페이지로 이동합니다.</li>
													<li><span class="num">4</span>사진정보를 상세페이지로 이동합니다.</li>
													<li><span class="num">5</span>마커 클릭시 해당 사진정보 상세페이지로 이동합니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>사진정보 <strong>> <u>2. 등록</u></strong></p> <span class="manual-txt">사진정보를 등록합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-05-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 사진정보 ▶ 등록</li>
													<li><span class="num">2</span>­내용을 입력합니다.</li>
													<li><span class="num">3</span>지도에서 선택하기를 누른 후 지도에서 해당 지역을 클릭하면 <br>클릭위치의 지번을 얻을 수 있습니다.</li>
													<li><span class="num">4</span>사진정보를 등록합니다.</li>
													<li><span class="num">5</span>⑤번에서 체크한 사진을 삭제할 수 있습니다.</li>
													<li><span class="num">6</span>사진정보를 선택삭제 합니다.</li>
													<li><span class="num">7</span>사진정보를 등록합니다. 목록으로 돌아갑니다.</li>
													<li><span class="num">8</span>사진정보등록을 취소합니다. 목록으로 돌아갑니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>사진정보 <strong>> <u>3. 상세조회</u></strong></p> <span class="manual-txt">사진정보를 상세조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/info-05-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 사진정보 ▶ 제목선택</li>
													<li><span class="num">2</span>­내용을 확인합니다.</li>
													<li><span class="num">3</span>사진이 여러 장일 경우 다음사진,이전사진을 조회할 수 있습니다.</li>
													<li><span class="num">4</span>해당사진을 다운로드 할 수 있습니다.</li>
													<li><span class="num">5</span>사진정보 목록으로 이동합니다.</li>
													<li><span class="num">6</span>사진정보를 수정페이지로 이동합니다.</li>
													<li><span class="num">7</span>해당 사진정보를 삭제합니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>사진정보 <strong>> <u>4. 수정</u></strong></p> <span class="manual-txt">사진정보를 수정합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-05-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 사진정보 ▶ 제목선택 ▶ 수정페이지</li>
													<li><span class="num">2</span>­지도에서 선택하기를 누른 후 지도에서 해당 지역을 클릭하면 <br>클릭위치의 지번을 얻을 수 있습니다.</li>
													<li><span class="num">3</span>파일을 수정할 수 있습니다.</li>
													<li><span class="num">4</span>④번을 선택하여 해당 사진을 삭제할 수 있습니다.</li>
													<li><span class="num">5</span>사진을 선택삭제 합니다.</li>
													<li><span class="num">6</span>사진정보를 수정합니다.</li>
													<li><span class="num">7</span>사진정보 사진정보 상세페이지로 이동합니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

								</div>
								<!-- //공통도구 > 정보조회 > 사진정보 -->

								<!-- 공통도구 > 정보조회 > 즐겨찾기 -->
								<div class="manual-cont info-06">
									<div class="manual-tit"><p>즐겨찾기 <strong>> <u>1. 조회</u></strong></p> <span class="manual-txt">즐겨찾기를 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-06-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 즐겨찾기</li>
													<li><span class="num">2</span>조건에 맞게 조회합니다.</li>
													<li><span class="num">3</span>즐겨찾기 정보 등록페이지로 이동합니다.</li>
													<li><span class="num">4</span>즐겨찾기 정보 상세페이지로 이동합니다.</li>
													<li><span class="num">5</span>즐겨찾기 정보에 저장된 위치로 이동합니다.</li>
													<li><span class="num">6</span>해당 즐겨찾기 정보의 수정페이지로 이동합니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>즐겨찾기 <strong>> <u>2. 등록</u></strong></p> <span class="manual-txt">즐겨찾기 정보를 등록합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-06-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 즐겨찾기 ▶ 등록</li>
													<li><span class="num">2</span>­제목을 입력합니다.</li>
													<li><span class="num">3</span>기본화면으로 저장할 수 있습니다.</li>
													<li><span class="num">4</span>즐겨찾기 정보 등록을 합니다. 목록으로 이동합니다.</li>
													<li><span class="num">5</span>즐겨찾기 정보 취소을 합니다. 목록으로 이동합니다.</li>
												</ul>
												<p class="ex-txt">※ 3D에서는 등록,수정,삭제가 불가합니다.</p>	
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>즐겨찾기 <strong>> <u>3. 수정</u></strong></p> <span class="manual-txt">즐겨찾기 정보를 수정합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-06-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 즐겨찾기 ▶ 제목선택 ▶ 수정</li>
													<li><span class="num">2</span>­제목을 수정합니다.</li>
													<li><span class="num">3</span>즐겨찾기 위치정보를 현재 위치로 저장합니다.</li>
													<li><span class="num">4</span>즐겨찾기 정보 수정을 합니다. </li>
													<li><span class="num">5</span>즐겨찾기 정보 수정을 취소합니다. 목록으로 이동합니다.</li>
												</ul>
											</div>
										</div>
									</div>

								</div>
								<!-- //공통도구 > 정보조회 > 즐겨찾기 -->

								<!-- 공통도구 > 정보조회 > 지도저장 -->
								<div class="manual-cont info-07">
									<div class="manual-tit"><p><strong>지도저장</strong></p> <span class="manual-txt">지도를 저장합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-07.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 지도저장</li>
													<li><span class="num">2</span>­현재 지도화면을 확인합니다.</li>
													<li><span class="num">3</span>PNG를 생성합니다.</li>
													<li><span class="num">4</span>저장방식
														<ul class="manual-list2">
															<li>PNG : 지도 이미지만 저장</li>
															<li>PDF : 메모정보와 함께 저장</li>
														</ul>
													</li>
													<li><span class="num">5</span>저장 버튼
														<p class="manual-list2">생성된 파일을 다운로드하고 팝업창 닫기</p>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<!-- //공통도구 > 정보조회 > 지도저장 -->

								<!-- 공통도구 > 정보조회 > 그리기 도구 -->
								<div class="manual-cont info-08">
									<div class="manual-tit"><p>그리기도구 <strong>> <u>1. 조회</u></strong></p> <span class="manual-txt">지도를 기반으로 한 사용자 그리기 정보를 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/info-08-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 그리기도구</li>
													<li><span class="num">2</span>­검색조건 (분류, 제목, 작성자)를 선택하여 조회합니다.</li>
													<li><span class="num">3</span>조회 결과를 표시하며, 제목순, 최신순으로 정렬합니다.</li>
													<li><span class="num">4</span>결과 항목의 제목을 클릭하여, 그리기 상세정보와 지도위에 작도한 정보를 표출합니다.</li>
													<li><span class="num">5</span>체크박스를 선택하면, 지도위에 작도한 정보 만을 표출합니다.</li>
													<li><span class="num">6</span>그리기 정보 등록 화면으로 전환합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>그리기도구 <strong>> <u>2. 등록(점) </u></strong></p> <span class="manual-txt">그리기 도구 중 점 (일반 포인트, 이미지 마커) 객체를 등록합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-08-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>그리기 정보(분류, 제목)를 입력합니다.</li>
													<li><span class="num">2</span>­그리기 점 객체 (포인트, 마커)를 선택합니다.</li>
													<li><span class="num">3</span>그리기 점 객체의 스타일 (색상, 크기 등)을 입력합니다.</li>
													<li><span class="num">4</span>3번을 반복하여 그리기가 완료되면 등록버튼을 <br>클릭하여 내용을 저장합니다.</li>
													<li><span class="num">5</span>클릭하여, 해당 그리기 작업을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>그리기도구 <strong>> <u>3. 등록(선) </u></strong></p> <span class="manual-txt">그리기 도구 중 라인 객체를 등록합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-08-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>그리기 정보(분류, 제목)를 입력합니다.</li>
													<li><span class="num">2</span>그리기 라인 객체를 선택합니다.</li>
													<li><span class="num">3</span>그리기 라인 객체의 스타일 (색상, 모양, 두께 등)을 입력합니다.</li>
													<li><span class="num">4</span>3번을 반복하여 그리기가 완료되면 등록버튼을 <br>클릭하여 내용을 저장합니다.</li>
													<li><span class="num">5</span>클릭하여, 해당 그리기 작업을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>그리기도구 <strong>> <u>4. 등록(면) </u></strong></p> <span class="manual-txt">그리기 도구 중 면 (사각형, 삼각형, 다각형, 원) 객체를 등록합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-08-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>그리기 정보(분류, 제목)를 입력합니다.</li>
													<li><span class="num">2</span>그리기 면(사각형, 삼각형, 다각형, 원) 객체를 선택합니다.</li>
													<li><span class="num">3</span>그리기 면 객체의 스타일 <br>(선색상, 모양, 두께, 면색상, 투명도 등)을 입력합니다.</li>
													<li><span class="num">4</span>3번을 반복하여 그리기가 완료되면 등록버튼을 <br>클릭하여 내용을 저장합니다.</li>
													<li><span class="num">5</span>클릭하여, 해당 그리기 작업을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>그리기도구 <strong>> <u>5. 등록(문자) </u></strong></p> <span class="manual-txt">그리기 도구 중 문자 객체를 등록합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-08-05.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>그리기 정보(분류, 제목)를 입력합니다.</li>
													<li><span class="num">2</span>그리기 문자 객체를 선택합니다.</li>
													<li><span class="num">3</span>그리기 문자 객체의 스타일 (폰트, 크기, 색상 등)을 입력합니다.</li>
													<li><span class="num">4</span>3번을 반복하여 그리기가 완료되면 등록버튼을 <br>클릭하여 내용을 저장합니다.</li>
													<li><span class="num">5</span>클릭하여, 해당 그리기 작업을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>

								</div>
								<!-- //공통도구 > 정보조회 > 그리기 도구 -->

								<!-- 공통도구 > 정보조회 > 배경지도 -->
								<div class="manual-cont info-09">
									<div class="manual-tit"><p><strong>배경지도</strong></p> <span class="manual-txt">배경지도를 변경합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/info-09.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 배경지도</li>
													<li><span class="num">2</span>바로e맵 항공/일반 지도를 선택하여 변경합니다.</li>
													<li><span class="num">3</span>변경된 지도를 적용합니다.</li>
												</ul>
											</div>
										</div>
									</div>	
								</div>
								<!-- //공통도구 > 정보조회 > 배경지도 -->

								<!-- 공통도구 > 정보조회 > 드론영상 -->
								<div class="manual-cont info-10">
									<div class="manual-tit"><p>드론영상 <strong>> <u>1. 조회</u></strong></p> <span class="manual-txt">드론영상 (동영상, 이미지) 정보를 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-10-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 드론영상</li>
													<li><span class="num">2</span>조건(제목, 작성자)을 선택하고 조회합니다.</li>
													<li><span class="num">3</span>조회 결과를 표시하며, 제목순, 최신순으로 정렬합니다.</li>
													<li><span class="num">4</span>결과 항목의 제목을 클릭하여, 드론 영상의 상세정보를 조회합니다.</li>
													<li><span class="num">5</span>드론영상 정보 등록 화면으로 전환합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>드론영상 <strong>> <u>2. 상세조회</u></strong></p> <span class="manual-txt">드론영상 (동영상, 이미지)의 상세정보를 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/info-10-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 드론영상 ▶ 조회결과 제목선택</li>
													<li><span class="num">2</span>드론영상 기본정보(제목, 작성자, 등록일, 촬영일)를 조회합니다.</li>
													<li><span class="num">3</span>드론영상 (동영상, 이미지)을 확인합니다. (동영상일 경우 디스플레이 가능)</li>
													<li><span class="num">4</span>드론영상 (동영상, 이미지)을 다운로드합니다.</li>
													<li><span class="num">5</span>이전 조회결과 화면으로 이동합니다.</li>
													<li><span class="num">6</span>해당 드론영상 정보 수정화면으로 전환합니다.</li>
													<li><span class="num">7</span>해당 드론영상 정보를 삭제합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>드론영상 <strong>> <u>3. 등록</u></strong></p> <span class="manual-txt">드론영상 (동영상, 이미지) 의 정보를 등록합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/info-10-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 드론영상 ▶ 등록</li>
													<li><span class="num">2</span>드론영상의 제목과 촬영일을 입력합니다.</li>
													<li><span class="num">3</span>드론영상 (동영상, 이미지) 파일을 등록합니다.</li>
													<li><span class="num">4</span>드론영상 (동영상, 이미지)의 설명을 입력합니다.</li>
													<li><span class="num">5</span>이전 화면으로 이동합니다.</li>
													<li><span class="num">6</span>입력한 드론영상 정보를 데이터베이스에 등록합니다.</li>
													<li><span class="num">7</span>등록작업을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>드론영상 <strong>> <u>4. 수정</u></strong></p> <span class="manual-txt">드론영상 (동영상, 이미지)의 정보를 수정합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/info-10-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 메모정보 ▶ 제목선택 ▶ 수정</li>
													<li><span class="num">2</span>입력된 ­드론영상의 제목과 촬영일을 수정합니다.</li>
													<li><span class="num">3</span>입력된 드론영상 (동영상, 이미지) 파일을 수정합니다.</li>
													<li><span class="num">4</span>입력된 드론영상 (동영상, 이미지)의 설명을 수정합니다.</li>
													<li><span class="num">5</span>이전 화면으로 이동합니다.</li>
													<li><span class="num">6</span>수정한 드론영상 정보를 데이터베이스에 갱신합니다.</li>
													<li><span class="num">7</span>수정작업을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>

								</div>
								<!-- //공통도구 > 정보조회 > 드론영상 -->

								<!-- 공통도구 > 제어도구 > 지도제어 -->
								<div class="manual-cont tool-01">
									<div class="manual-tit"><p>지도제어 <strong>> <u>1. 나침반, 초기화, 지도 이동 </u></strong></p> <span class="manual-txt">정북방향이동, 지도 초기화, 지번&도로명주소로 검색하여 지도 이동을 지원합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/tool-01-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>나침반 ▶ 나침반을 클릭합니다. 지도가 정북방향으로 이동됩니다.</li>
													<li><span class="num">2</span>지도 초기화 ▶ 지도 초기화 버튼을 클릭하여 <br>지도 위에 그려진 측정값들을 초기화합니다.</li>
													<li><span class="num">3</span>지도 위치 초기화 ▶ 지도 위치 초기화 버튼을 클릭하여 <br>초기 위치로 이동합니다. </li>
													<li><span class="num">4</span>지번, 도로명주소를 입력후 검색시 해당 위치로 이동합니다.</li>
													<li><span class="num">5</span>화면 중심 좌표를 표출합니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>지도제어 <strong>> <u>2. 위치측정 </u></strong></p> <span class="manual-txt">위치 측정 도구를 이용하여 클릭 지점의 주소, 좌표값을 표출 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/tool-01-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>위치 측정 버튼을 클릭하여, 위치 측정을 활성화 합니다.</li>
													<li><span class="num">2</span>지도에서 한 지점을 클릭합니다.</li>
													<li><span class="num">3</span>위치 정보 표출 표출합니다.
														<ul class="manual-list2">
															<li>마우스 클릭 위치에 정보창 표출</li>
															<li>위치의 주소, 좌표를 표시</li>
															<li>‘ X ’ 클릭 시, 정보창 닫기</li>
														</ul>
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>지도제어 <strong>> <u>3. 거리측정 </u></strong></p> <span class="manual-txt">거리 측정 도구를 이용하여 두점 이상의 거리 정보를 표출 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/tool-01-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>거리 측정 버튼을 클릭하여, 거리측정을 활성화 합니다.</li>
													<li><span class="num">2</span>지도에서 두점 이상을 클릭하여, 거리 정보를 표출 합니다.
														<ul class="manual-list2">
															<li>마우스 클릭 시 마다 구간, 누적 거리 표시</li>
															<li>더블 클릭 시 거리측정 확정 및 기능 중단</li>
														</ul>
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>지도제어 <strong>> <u>4. 면적측정 </u></strong></p> <span class="manual-txt">면적 측정 도구를 이용하여 세점 이상의 면적정보를 표출 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/tool-01-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>면적 측정 버튼을 클릭하여, 면적 측정을 활성화 합니다.</li>
													<li><span class="num">2</span>지도에서 세점 이상을 클릭하여, 면적 정보를 표출 합니다.
														<ul class="manual-list2">
															<li>마우스 클릭 시 마다 구간, 누적 거리 표시</li>
															<li>더블 클릭 시 면적측정 확정 및 기능 중단</li>
														</ul>
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>지도제어 <strong>> <u>5. 반경측정 </u></strong></p> <span class="manual-txt">반경 측정 도구를 이용하여 반경 정보를 표출 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/tool-01-05.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>반경 측정 버튼을 클릭하여, 반경 측정을 활성화 합니다. </li>
													<li><span class="num">2</span>지도에서 두점을 클릭하여, 반경정보 표출를 표출합니다.
														<p class="manual-list2">원으로 반경 범위 측정</p>
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>지도제어 <strong>> <u>6. 확대/축소, 2D/3D전환 </u></strong></p> <span class="manual-txt">지도의 확대 또는 축소 , 2D 3D 지도 모둘변경 기능을 지원합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/tool-01-06.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>‘+’ 버튼을 클릭하여, 지도를 확대합니다.</li>
													<li><span class="num">2</span>‘-’ 버튼을 클릭하여, 지도를 축소합니다.</li>
													<li><span class="num">3</span>3D 버튼을 클릭하여, 3D 지도가 화면에 표출 됩니다.</li>
													<li><span class="num">4</span>2D 버튼을 클릭하여, 2D 지도가 화면에 표출 됩니다.</li>
												</ul>
											</div>
										</div>
									</div>

								</div>
								<!-- //공통도구 > 제어도구 > 지도제어 -->

								<!-- 공통도구 > 제어도구 > 레이어 -->
								<div class="manual-cont tool-02">
									<div class="manual-tit"><p>레이어 <strong>> <u>1. 레이어 조회  </u></strong></p> <span class="manual-txt">레이어를 조회합니다.</span></div>
									<div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/tool-02-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 레이어
														<p class="manual-list2">사용자가 목록관리에서 추가해준 레이어들이 표출됩니다.</p>	
													</li>
													<li><span class="num">2</span>레이어명 또는 카테고리를 입력하고, <br>Enter 입력 또는 검색 버튼을 클릭합니다.</li>
													<li><span class="num">3</span>버튼을 클릭하여, 레이어관리창을 띄웁니다.
														<p class="manual-list2">목록관리 / 등록관리</p>
													</li>
													<li><span class="num">4</span>해당 레이어를 지도 상에 가시화 및 가시화 해제를 합니다.</li>
													<li><span class="num">5</span>해당 카테고리의 레이어를 지도 상에 <br>가시화 및 가시화 해제를 합니다.</li>
													<li><span class="num">6</span>해당 레이어의 정보관리창을 띄웁니다.</li>
													<li><span class="num">7</span>사용자의 레이어 목록에서 해당 레이어를 제거합니다.</li>
													<li><span class="num">8</span>목록에 있는 레이어들을 모두 비활성화합니다.</li>
													<li><span class="num">9</span>레이어 팝업창을 닫습니다.</li>
												</ul>
											</div>
										</div>
									</div>
									
									<div class="manual-tit"><p>레이어 <strong>> <u>2. 기본정보 조회  </u></strong></p> <span class="manual-txt">레이어의 기본 정보를 관리합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/tool-02-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 레이어 ▶ 레이어 정보 ▶ 기본탭
														<p class="manual-list2">선택한 레이어의 기본정보를 조회 및 수정합니다.</p>	
													</li>
													<li><span class="num">2</span>수정할 기본정보와 속성정보를 입력합니다.</li>
													<li><span class="num">3</span>입력한 정보를 업데이트합니다.</li>
													<li><span class="num">4</span>팝업창을 접고 펼칩니다.</li>
													<li><span class="num">5</span>팝업창을 완전히 닫습니다.</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="manual-tit"><p>레이어 <strong>> <u>3. 목록관리  </u></strong></p> <span class="manual-txt">레이어 목록 정보를 관리합니다.</span></div>
									<div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/tool-02-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 레이어 ▶ 레이어관리 ▶ 목록관리탭
														<p class="manual-list2">사용자가 등록하거나 공유된 레이어 목록을 관리합니다.</p>	
													</li>
													<li><span class="num">2</span>레이어 분류 선택 및 레이어명 입력 후 검색 버튼을 클릭하여 레이어 목록을 검색합니다.</li>
													<li><span class="num">3</span>삭제 또는 레이어 목록에 추가할 레이어를 체크하여 선택한 레이어 목록칸에 추가합니다.</li>
													<li><span class="num">4</span>선택한 레이어 목록을 삭제합니다.</li>
													<li><span class="num">5</span>선택한 레이어 목록을 사용자의 레이어 목록에 추가합니다.</li>
													<li><span class="num">6</span>팝업창을 접고 펼칩니다.</li>
													<li><span class="num">7</span>팝업창을 완전히 닫습니다.</li>
												</ul>
											</div>
										</div>
									</div>

								</div>
								<!-- //공통도구 > 제어도구 > 레이어 -->
                                
                                <!-- 업무 > 공간정보활용 > 공간검색공통 -->
								<div class="manual-cont shape-01">
									<div class="manual-tit"><p><strong>공간검색공통</strong></p> <span class="manual-txt">현재화면영역과 사용자 정의 기준 영역으로 공간 조회 합니다.</span></div>
									<div class="manual-box">
										<div class="card-group column">
											<div>
												<div class="img-items"><img src="/images/manual/shape-01-01.jpg" alt=""></div>
												<div class="text-items">
													<ul class="manual-list1">
														<li><span class="num">1</span>공간 검색탭을 클릭합니다.</li>
														<li><span class="num">2</span>현재 화면 영역을 선택합니다</li>
                                                        <li><span class="num">3</span>조회 버튼을 클릭하여, 현재 화면 영역을 공간 검색 합니다.</li>
													</ul>
												</div>
											</div>
											<div>
												<div class="img-items"><img src="/images/manual/shape-01-02.jpg" alt=""></div>
												<div class="text-items">
													<ul class="manual-list1">
														<li><span class="num">1</span>사용자정의를 클릭합니다.</li>
														<li><span class="num">2</span>공간 검색을 할 조건을 클릭하여 선택합니다.<br>
                                                            <ul class="manual-list2">
                                                                <li>포인트, 하나의 지점을 지도 위에서 클릭하여 선택합니다.</li>
                                                                <li>라인, 두개 이상의 지점을 지도 위에서 클릭하여 영역을 선택합니다.</li>
                                                                <li>사각형, 마우스 클릭후 드레그 하여 영역을 설정합니다.</li>
                                                                <li>원, 마우스 클릭후 드레그 하여 영역을 설정합니다.</li>
                                                            </ul>
                                                        </li>
														<li><span class="num">3</span>경계로부터 범위를 입력 합니다.</li>
														<li><span class="num">4</span>조회 버튼을 클릭하여, 공간 검색이 실행되며<br>
                                                            검색된 목록이 표출됩니다.
                                                        </li>
													</ul>
												</div>
											</div>
										</div>
									</div>

								</div>
								<!-- //업무 > 공간정보활용 > 공간검색공통 -->

                                <!--업무 > 공간정보활용 > 사업공유관리-->
                                <div class="manual-cont shape-02">
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>1. 공사계획정보 조회</u></strong></p> <span class="manual-txt">공사계획정보를 조회합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group">
                                            <div class="img-items"><img src="/images/manual/shape-02-01.jpg" alt=""></div>
                                            <div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>업무 ▶사업공유관리탭을 클릭합니다.</li>
													<li><span class="num">2</span>검색할 조건을 선택하고 조회합니다.</li>
													<li><span class="num">3</span>목록을 클릭하여, 공사계획정보를 상세조회 합니다.</li>
													<li><span class="num">4</span>지도 위 POI 마커를 클릭하여, 클릭된 공사계획정보 상세조회 합니다.</li>
													<li><span class="num">5</span>등록 버튼을 클릭하여 등록페이지로 이동합니다.</li>
													<li><span class="num">6</span>초기화 버튼을 클릭하여, 검색 목록을 초기화 합니다.</li>
												</ul>
											</div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>2. 공사계획정보 등록</u></strong></p> <span class="manual-txt">공사계획정보를 등록합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group horizontal">
                                            <div class="img-items"><img src="/images/manual/shape-02-02.jpg" alt=""></div>
                                            <div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>등록 페이지에서 다음 항목들을 입력합니다.</li>
													<li><span class="num">2</span>등록 버튼을 클릭하여, 공사계획정보를 등록합니다.</li>
													<li><span class="num">3</span>취소 버튼을 클릭하여, 공사계획정보 등록을 취소합니다.</li>
												</ul>
											</div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>3. 공사계획정보 수정</u></strong></p> <span class="manual-txt">공사계획정보를 수정합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group horizontal">
                                            <div class="img-items"><img src="/images/manual/shape-02-03.jpg" alt=""></div>
                                            <div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>공사계획정보 상세페이지에서 수정버튼을 클릭하여,<br>
                                                        수정페이지로 이동 합니다.
                                                    </li>
													<li><span class="num">2</span>저장버튼을 클릭하여, 수정된 내용을 저장합니다.</li>
													<li><span class="num">3</span>취소 버튼을 클릭하여, 공사계획정보 수정을 취소합니다.</li>
												</ul>
											</div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>4. 공사계획정보 삭제</u></strong></p> <span class="manual-txt">공사계획정보를 삭제합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group horizontal">
                                            <div class="img-items"><img src="/images/manual/shape-02-04.jpg" alt=""></div>
                                            <div class="text-items">
                                                <ul class="manual-list1">
                                                    <li><span class="num">1</span>상세페이지가 표출됩니다.</li>
                                                    <li><span class="num">2</span>삭제 버튼을 클릭하여, 공사계획정보를 삭제합니다.</li>
                                                    <li><span class="num">3</span>취소 버튼을 클릭하여, 공사계획정보 상세 조회가 종료 됩니다.</li>
                                                    <li><span class="num">4</span>수정 버튼을 클릭하여, 공사계획정보 수정페이지로 이동 합니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>5. 공사예정정보 조회</u></strong></p> <span class="manual-txt">공사예정정보를 조회합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group">
                                            <div class="img-items"><img src="/images/manual/shape-02-05.jpg" alt=""></div>
                                            <div class="text-items">
                                                <ul class="manual-list1">
                                                    <li><span class="num">1</span>사업공유관리 ▶ 공사예정정보탭 을 클릭합니다.</li>
                                                    <li><span class="num">2</span>검색할 조건을 선택하고 조회합니다.</li>
                                                    <li><span class="num">3</span>목록을 클릭하여, 공사예정정보를 상세조회합니다.</li>
                                                    <li><span class="num">4</span>지도 위 POI 마커를 클릭하여, 클릭된 공사예정정보 상세조회합니다.</li>
                                                    <li><span class="num">5</span>등록 버튼을 클릭하여 등록페이지로 이동합니다.</li>
                                                    <li><span class="num">6</span>초기화 버튼을 클릭하여, 검색 목록을 초기화 합니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>6. 공사예정정보 등록</u></strong></p> <span class="manual-txt">공사예정정보 정보를 등록합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group">
                                            <div class="img-items"><img src="/images/manual/shape-02-06.jpg" alt=""></div>
                                            <div class="text-items">
                                                <ul class="manual-list1">
                                                    <li><span class="num">1</span>등록 페이지에서 공사계획정보 조회를 클릭합니다.</li>
                                                    <li><span class="num">2</span>공사계획정보 조회 창이 나타나며 체크박스를 클릭하여 선택합니다.</li>
                                                    <li><span class="num">3</span>선택을 클릭하여, 선택된 정보들이 기본 정보에 들어옵니다.</li>
                                                    <li><span class="num">4</span>차수 정보를 선택합니다.</li>
                                                    <li><span class="num">5</span>적용버튼을 클릭하여, 기본 정보를  등록합니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-group horizontal">
                                            <div class="img-items"><img src="/images/manual/shape-02-07.jpg" alt=""></div>
                                            <div class="text-items">
                                                <ul class="manual-list1">
                                                    <li><span class="num">6</span>차수를 선택합니다.</li>
                                                    <li><span class="num">7</span>차수별 공사정보를 입력합니다.</li>
                                                    <li><span class="num">8</span>적용 버튼을 클릭하여, 차수별 공사정보를 저장합니다.</li>
                                                    <li><span class="num">9</span>목록 버튼을 클릭하여, 목록 페이지로 이동합니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>7. 공사예정정보 수정</u></strong></p> <span class="manual-txt">공사예정정보를 수정합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group">
                                            <div class="img-items"><img src="/images/manual/shape-02-08.jpg" alt=""></div>
                                            <div class="text-items">
                                                <ul class="manual-list1">
                                                    <li><span class="num">1</span>공사예정정보 상세페이지에서 수정버튼을 클릭하여, 수정페이지로 이동 합니다.</li>
                                                    <li><span class="num">2</span>공사예정정보 기본정보 및 차수별 공사정보를 수정한 후 적용버튼을 클릭하여 수정합니다.</li>
                                                    <li><span class="num">3</span>취소버튼을 클릭하여, 공사예정정보 수정을 취소합니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>8. 공사예정정보 삭제</u></strong></p> <span class="manual-txt">공사예정정보를 삭제합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group horizontal">
                                            <div class="img-items"><img src="/images/manual/shape-02-09.jpg" alt=""></div>
                                            <div class="text-items">
                                                <ul class="manual-list1">
                                                    <li><span class="num">1</span>삭제버튼을 클릭하여, 공사예정정보를 삭제합니다.</li>
                                                    <li><span class="num">2</span>취소버튼을 클릭하여, 공사예정정보 조회화면으로 이동합니다.</li>
                                                    <li><span class="num">3</span>체크박스를 클릭하여 선택합니다.</li>
                                                    <li><span class="num">4</span>선택삭제 버튼을 클릭하여, 선택된 차수 정보를 삭제합니다.</li>
                                                    <li><span class="num">5</span>수정 버튼을 클릭하여, 수정 페이지로 이동합니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>9. 공사정보(속성)</u></strong></p> <span class="manual-txt">공사정보(속성)를 조회합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group">
                                            <div class="img-items"><img src="/images/manual/shape-02-10.jpg" alt=""></div>
                                            <div class="text-items">
                                                <ul class="manual-list1">
                                                    <li><span class="num">1</span>사업공유관리 ▶ 공사정보조회탭 을 클릭합니다.</li>
                                                    <li><span class="num">2</span>속성조회 탭에서 검색할 조건을 선택하고 조회합니다.</li>
                                                    <li><span class="num">3</span>목록을 클릭하여, 공사정보조회 상세를 조회합니다.</li>
                                                    <li><span class="num">4</span>지도 위 POI 마커를 클릭하여, 클릭된 공사정보조회 상세를 조회합니다.</li>
                                                    <li><span class="num">5</span>초기화 버튼을 클릭하여, 검색 목록을 초기화 합니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>10. 공사정보(공간)</u></strong></p> <span class="manual-txt">공사정보(공간)를 조회합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group">
                                            <div class="img-items"><img src="/images/manual/shape-02-11.jpg" alt=""></div>
                                            <div class="text-items">
                                                <ul class="manual-list1">
                                                    <li><span class="num">1</span>공간 조회할 값 시기, 지도에서 선택된 위치, 반경을 입력 합니다.</li>
                                                    <li><span class="num">2</span>조회 버튼을 클릭하여, 조회합니다.</li>
                                                    <li><span class="num">3</span>목록을 클릭하여, 공사정보 조회 상세페이지를 조회합니다.</li>
                                                    <li><span class="num">4</span>지도 위 POI 마커를 클릭하여, 클릭된 공사정보조회 상세를 조회합니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="manual-tit"><p>사업공유관리 <strong>&gt; <u>11. 공사정보 상세조회</u></strong></p> <span class="manual-txt">공사정보를 상세조회합니다.</span></div>
                                    <div class="manual-box">
                                        <div class="card-group">
                                            <div class="img-items"><img src="/images/manual/shape-02-12.jpg" alt=""></div>
                                            <div class="text-items">
                                                <ul class="manual-list1">
                                                    <li><span class="num">1</span>공사정보 조회 에서 목록을 클릭 또는 지도상의 POI마커를 클릭하면, 상세페이지가 조회 됩니다.</li>
                                                    <li><span class="num">2</span>목록을 클릭하여, 공사정보 조회 페이지로 이동합니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--//업무 > 공간정보활용 > 사업공유관리-->

                                <!--업무 > 공간정보활용 > 지하수관리-->
                                <div class="manual-cont shape-03">
                                    <div class="manual-tit"><p>지하수관리 <strong>&gt; <u>1. 조회</u></strong></p> <span class="manual-txt">지하수시설을 속성정보 또는 공간정보를 통해 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-03-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 업무 ▶ 지하수관리</li>
													<li><span class="num">2</span>지하수시설 선택란(농업용공공관정 / 지하수관리 / 지하수이용시설)</li>
													<li><span class="num">3</span>속성검색/공간검색 조건을 선택하여 조회합니다.</li>
													<li><span class="num">4</span>지하수관리 페이지에 조회된 목록을 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">5</span>해당 시설의 POI마커를 클릭하여 상세조회합니다.</li>
													<li><span class="num">6</span>엑셀저장 버튼을 클릭하여, 데이터를 다운로드합니다.</li>
													<li><span class="num">7</span>초기화 버튼을 클릭하여, 검색 목록을 초기화합니다.</li>
												</ul>
												<p class="ex-txt">*공간검색의 경우, 공간검색(공통) 참조.</p>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>지하수관리 <strong>&gt; <u>2. 등록</u></strong></p> <span class="manual-txt">지하수시설을 등록합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/shape-03-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>지하수 관리에서 ­등록 버튼을 클릭하여,<br>
                                                        등록페이지를 표출합니다.
                                                    </li>
													<li><span class="num">2</span>등록하기 페이지에서 등록 버튼을 클릭하여,<br>
                                                        지하수시설을 등록합니다.
                                                    </li>
													<li><span class="num">3</span>취소 버튼을 클릭하여, 지하수시설 등록을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>지하수관리 <strong>&gt; <u>3. 수정</u></strong></p> <span class="manual-txt">지하수시설을 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-03-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>지하수관리 페이지에 조회된 목록을 클릭하여, 지하수시설을 상세조회 합니다.</li>
													<li><span class="num">2</span>해당 시설의 상세보기 페이지에서 수정 버튼을 클릭하여, 수정페이지가 표출 됩니다.</li>
													<li><span class="num">3</span>수정완료 버튼을 클릭하여 수정내용을 저장한 후, 상세보기 창으로 돌아갑니다.</li>
													<li><span class="num">4</span>취소 버튼을 클릭하여, 수정을 취소하고 상세보기 창으로 돌아갑니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>지하수관리 <strong>&gt; <u>4. 삭제</u></strong></p> <span class="manual-txt">지하수시설을 삭제합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-03-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>지하수관리 페이지에 조회된 목록을 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">2</span>해당 시설의 POI마커를 클릭하여 상세조회 합니다.</li>
													<li><span class="num">3</span>삭제 버튼을 클릭하여, 지하수시설을 삭제합니다.</li>
													<li><span class="num">4</span>취소 버튼을 클릭하여, 상세조회 창을 닫습니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 공간정보활용 > 지하수관리-->

                                <!--업무 > 공간정보활용 > 신재생에너지-->
                                <div class="manual-cont shape-04">
                                    <div class="manual-tit"><p>신재생에너지 <strong>&gt; <u>1. 조회</u></strong></p> <span class="manual-txt">신재생에너지 시설 속성정보 또는 공간정보를 통해 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-04-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 업무 ▶ 신재생에너지</li>
													<li><span class="num">2</span>신재생에너지 선택란(태양광발전소)</li>
													<li><span class="num">3</span>속성검색/공간검색 조건을 선택하여 조회합니다.</li>
													<li><span class="num">4</span>신재생에너지 페이지에 조회된 목록을 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">5</span>해당 시설의 POI마커를 클릭하여 상세조회합니다.</li>
													<li><span class="num">6</span>엑셀저장 버튼을 클릭하여, 데이터를 다운로드합니다.</li>
													<li><span class="num">7</span>초기화 버튼을 클릭하여, 검색 목록을 초기화합니다.</li>
												</ul>
												<p class="ex-txt">※ 공간검색의 경우, 공간검색(공통) 참조.</p>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>신재생에너지 <strong>&gt; <u>2. 등록</u></strong></p> <span class="manual-txt">신재생에너지 시설을 등록합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/shape-04-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>신재생에너지에서 등록 버튼을 클릭하여,<br>
                                                        등록페이지를 표출합니다.
                                                    </li>
													<li><span class="num">2</span>등록하기 페이지에서 등록 버튼을 클릭하여,<br>
                                                        신재생에너지 시설을 등록합니다.
                                                    </li>
													<li><span class="num">3</span>취소 버튼을 클릭하여, 신재생에너지 시설을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>신재생에너지 <strong>&gt; <u>3. 수정</u></strong></p> <span class="manual-txt">신재생에너지 시설을 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-04-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>신재생에너지 페이지에 조회된 목록을 클릭하여, 신재생에너지 시설을 상세조회 합니다.</li>
													<li><span class="num">2</span>해당 시설의 상세보기 페이지에서 수정 버튼을 클릭하여, 수정페이지가 표출 됩니다.</li>
													<li><span class="num">3</span>수정완료 버튼을 클릭하여 수정내용을 저장한 후, 상세보기 창으로 돌아갑니다.</li>
													<li><span class="num">4</span>취소 버튼을 클릭하여, 수정을 취소하고 상세보기 창으로 돌아갑니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>신재생에너지 <strong>&gt; <u>4. 삭제</u></strong></p> <span class="manual-txt">신재생에너지 시설을 삭제합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-04-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>신재생에너지 페이지에 조회된 목록을 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">2</span>해당 시설의 POI마커를 클릭하여 상세조회 합니다.</li>
													<li><span class="num">3</span>삭제 버튼을 클릭하여, 지하수시설을 삭제합니다.</li>
													<li><span class="num">4</span>취소 버튼을 클릭하여, 상세조회 창을 닫습니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 공간정보활용 > 신재생에너지-->
                                
                                <!--업무 > 공간정보활용 > 안전시설물관리-->
                                <div class="manual-cont shape-05">
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>1. 가로등관리(조회)</u></strong></p> <span class="manual-txt">안전시설물인 가로등의 속성정보 또는 공간정보를 통해 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-05-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>업무 ▶ 안전시설물관리탭을 클릭합니다.</li>
													<li><span class="num">2</span>가로등관리를 선택합니다.</li>
													<li><span class="num">3</span>속성검색/공간검색 조건을 선택하여 조회합니다.</li>
													<li><span class="num">4</span>가로등 객체를 클릭하거나 해당 리스트를 클릭하여 가로등 상세정보를 조회합니다.</li>
													<li><span class="num">5</span>엑셀저장 버튼을 클릭하여, 가로등 데이터를 엑셀로 다운로드합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>2. 가로등관리(등록)</u></strong></p> <span class="manual-txt">안전시설물인 가로등을 등록합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/shape-05-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>등록버튼을 클릭하여, 가로등 등록페이지를 호출합니다.</li>
													<li><span class="num">2</span>가로등 정보를 입력한 후 등록버튼을 클릭하여<br>
                                                        가로등을 등록합니다.
                                                    </li>
													<li><span class="num">3</span>취소버튼을 클릭하여, 가로등 등록을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>3. 가로등관리(수정)</u></strong></p> <span class="manual-txt">안전시설물인 가로등을 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-05-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>가로등 상세보기 페이지의 수정버튼을 클릭하여, 가로등 수정페이지를 호출합니다.</li>
													<li><span class="num">2</span>가로등 정보를 수정한 후 저장버튼을 클릭하여 가로등을 수정합니다.</li>
													<li><span class="num">3</span>취소버튼을 클릭하여, 가로등 수정을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>4. 가로등관리(삭제)</u></strong></p> <span class="manual-txt">안전시설물인 가로등을 삭제합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/shape-05-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>가로등 상세보기 페이지의 삭제버튼을 클릭하여,<br>
                                                        가로등을 삭제합니다.
                                                    </li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>5. 가로등관리(영향권분석)</u></strong></p> <span class="manual-txt">안전시설물인 가로등과 범죄주의구간을 융합하여 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-05-05.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>영향권 체크박스를 클릭하여 범죄주의구간을 조회합니다.</li>
													<li><span class="num">2</span>가로등 영향권을 m단위로 입력한 후 엔터키를 눌러 가로등의 영향권을 분석합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>6. CCTV관리(조회)</u></strong></p> <span class="manual-txt">안전시설물인 CCTV를 속성정보 또는 공간정보를 통해 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-05-06.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>업무 ▶ 안전시설물관리탭을 클릭합니다.</li>
													<li><span class="num">2</span>CCTV관리를 선택합니다.</li>
													<li><span class="num">3</span>속성검색/공간검색 조건을 선택하여 조회합니다.</li>
													<li><span class="num">4</span>CCTV 객체를 클릭하거나 해당 리스트를 클릭하여 CCTV 상세정보를 조회합니다.</li>
													<li><span class="num">5</span>엑셀저장 버튼을 클릭하여, CCTV 데이터를 엑셀로 다운로드합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>7. CCTV관리(등록)</u></strong></p> <span class="manual-txt">안전시설물인 CCTV를 등록합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/shape-05-07.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>등록버튼을 클릭하여, CCTV 등록페이지를 호출합니다.</li>
													<li><span class="num">2</span>CCTV 정보를 입력한 후 등록버튼을 클릭하여<br>
                                                        CCTV를 등록합니다.
                                                    </li>
													<li><span class="num">3</span>취소버튼을 클릭하여, CCTV 등록을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>8. CCTV관리(수정)</u></strong></p> <span class="manual-txt">안전시설물인 CCTV를 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-05-08.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>CCTV 상세보기 페이지의 수정버튼을 클릭하여, CCTV 수정페이지를 호출합니다.</li>
													<li><span class="num">2</span>CCTV 정보를 수정한 후 저장버튼을 클릭하여 CCTV을 수정합니다.</li>
													<li><span class="num">3</span>취소버튼을 클릭하여, CCTV 수정을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>9. CCTV관리(삭제)</u></strong></p> <span class="manual-txt">안전시설물인 CCTV를 삭제합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/shape-05-09.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>CCTV 상세보기 페이지의 삭제버튼을 클릭하여,<br>
                                                        CCTV를 삭제합니다.
                                                    </li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>안전시설물관리 <strong>&gt; <u>10. CCTV관리(영향권분석)</u></strong></p> <span class="manual-txt">안전시설물인 CCTV와 범죄주의구간을 융합하여 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-05-10.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>영향권 체크박스를 클릭하여 범죄주의구간을 조회합니다.</li>
													<li><span class="num">2</span>CCTV 영향권을 m단위로 입력한 후 엔터키를 눌러 가로등의 영향권을 분석합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 공간정보활용 > 안전시설물관리-->

                                <!--업무 > 공간정보활용 > 관내업소정보조회-->
                                <div class="manual-cont shape-06">
                                    <div class="manual-tit"><p><strong>관내업소정보조회</strong></p> <span class="manual-txt">관내업소정보를 속성정보 또는 공간정보를 통해 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-06-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 업무 ▶ 관내업소정보조회</li>
													<li><span class="num">2</span>­속성검색/공간검색 조건을 선택하여 조회합니다.</li>
													<li><span class="num">3</span>관내업소정보조회 페이지에 조회된 목록을 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">4</span>해당 시설의 POI마커를 클릭하여 상세조회합니다.</li>
													<li><span class="num">5</span>엑셀저장 버튼을 클릭하여, 데이터를 다운로드합니다.</li>
													<li><span class="num">6</span>초기화 버튼을 클릭하여, 검색 목록을 초기화합니다.</li>
												</ul>
                                                <p class="ex-txt">※ 공간검색의 경우, 공간검색(공통) 참조.</p>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 공간정보활용 > 관내업소정보조회-->

                                <!--업무 > 공간정보활용 > 대기오염-->
                                <div class="manual-cont shape-07">
                                    <div class="manual-tit"><p><strong>대기오염</strong></p> <span class="manual-txt">양평군 대기오염 측정소별 실시간 데이터를 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/shape-07-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>업무 ▶ 대기오염 탭을 클릭합니다.</li>
													<li><span class="num">2</span>­양평군 대기오염 측정소별 실시간 데이터가 표출됩니다.</li>
													<li><span class="num">3</span>차트 버튼을 눌러서 상세정보를 확인합니다.</li>
													<li><span class="num">4</span>상세화면에서 차트 버튼을 눌러서 같은 시간대에 지난 1달 데이터를 조회합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 공간정보활용 > 대기오염-->

                                <!--업무 > 시설관리 > 상수도시설-->
                                <div class="manual-cont fcty-01">
                                    <div class="manual-tit"><p>상수도시설 <strong>&gt; <u>1. 조회</u></strong></p> <span class="manual-txt">상수도시설을 속성정보 또는 공간정보를 통해 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-01-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 업무 ▶ 상수도시설</li>
													<li><span class="num">2</span>­상수도 시설 선택란(소방시설/상수관로/유량계/상수맨홀/상수관로심도/수압계/배수지/급수관로/변류시설)</li>
													<li><span class="num">3</span>속성검색/공간검색 조건을 선택하여 조회합니다.</li>
													<li><span class="num">4</span>상수도시설 페이지에 조회된 목록을 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">5</span>해당 시설의 POI마커를 클릭하여 상세조회합니다.</li>
													<li><span class="num">6</span>엑셀저장 버튼을 클릭하여, 데이터를 다운로드합니다.</li>
													<li><span class="num">7</span>초기화 버튼을 클릭하여, 검색 목록을 초기화합니다.</li>
												</ul>
                                                <p class="ex-txt">※ 지하시설물은 설정 > 지형투명도를 낮게 설정해야 식별이 용이합니다.</p>
                                                <p class="ex-txt">※ 공간검색의 경우, 공간검색(공통) 참조.</p>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>상수도시설 <strong>&gt; <u>2. 등록</u></strong></p> <span class="manual-txt">상수도시설을 등록합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-01-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>상수도시설에서 등록 버튼을 클릭하여, 등록페이지를 표출합니다.</li>
													<li><span class="num">2</span>­등록페이지에서 <지도에서 선택> 버튼을 클릭하여, 공간정보 편집도구를 엽니다.</li>
													<li><span class="num">3</span>공간정보 편집도구 페이지에서 적용 버튼을 클릭하여, 등록할 위치정보를 적용합니다.</li>
													<li><span class="num">4</span>등록하기 페이지에서 등록 버튼을 클릭하여, 상수도시설을 등록합니다.</li>
													<li><span class="num">5</span>취소 버튼을 클릭하여, 상수도시설 등록을 취소합니다.</li>
												</ul>
                                                <p class="ex-txt">※ 상수도시설 등록 및 공간정보 편집 도구는 2D에서만 가능합니다.</p>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>상수도시설 <strong>&gt; <u>3. 수정</u></strong></p> <span class="manual-txt">상수도시설을 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-01-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>­상수도시설 페이지에 조회된 목록을 클릭하여, 상수도시설을 상세조회 합니다.</li>
													<li><span class="num">2</span>해당 시설의 상세보기 페이지에서 수정 버튼을 클릭하여, 수정페이지가 표출됩니다.</li>
													<li><span class="num">3</span>수정완료 버튼을 클릭하여 수정내용을 저장한 후, 상세보기 창으로 돌아갑니다.</li>
													<li><span class="num">4</span>취소 버튼을 클릭하여, 수정을 취소하고 상세보기 창으로 돌아갑니다.</li>
												</ul>
                                                <p class="ex-txt">※ 상수도시설 등록 및 공간정보 편집 도구는 2D에서만 가능합니다.</p>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>상수도시설 <strong>&gt; <u>4. 삭제</u></strong></p> <span class="manual-txt">상수도시설을 삭제합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-01-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>­상수도시설 페이지에 조회된 목록을 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">2</span>해당 시설의 POI마커를 클릭하여 상세조회 합니다.</li>
													<li><span class="num">3</span>삭제 버튼을 클릭하여, 상수도시설을 삭제합니다.</li>
													<li><span class="num">4</span>취소 버튼을 클릭하여, 상세조회 창을 닫습니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 시설관리 > 상수도시설-->

                                <!--업무 > 시설관리 > 하수도시설-->
                                <div class="manual-cont fcty-02">
                                    <div class="manual-tit"><p>하수도시설 <strong>&gt; <u>1. 조회</u></strong></p> <span class="manual-txt">하수도시설을 속성정보 또는 공간정보를 통해 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-02-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 업무 ▶ 하수도시설</li>
													<li><span class="num">2</span>하수도 시설 선택란(하수연결관/하수관거심도/하수처리장/하수맨홀/면형하수관거/하수관거/하수펌프장/측구/토구/물받이/환기구)</li>
													<li><span class="num">3</span>속성검색/공간검색 조건을 선택하여 조회합니다.</li>
													<li><span class="num">4</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">5</span>엑셀저장 버튼을 클릭하여, 데이터를 다운로드합니다.</li>
													<li><span class="num">6</span>초기화 버튼을 클릭하여, 검색 목록을 초기화합니다.</li>
												</ul>
                                                <p class="ex-txt">※ 지하시설물은 설정 > 지형투명도를 낮게 설정해야 식별이 용이합니다.</p>
                                                <p class="ex-txt">※ 공간검색의 경우, 공간검색(공통) 참조.</p>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>하수도시설 <strong>&gt; <u>2. 등록</u></strong></p> <span class="manual-txt">하수도시설을 등록합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-02-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>하수도시설에서 등록 버튼을 클릭하여, 등록페이지를 표출합니다.</li>
													<li><span class="num">2</span>등록페이지에서 <지도에서 선택> 버튼을 클릭하여, 공간정보 편집도구를 엽니다.</li>
													<li><span class="num">3</span>공간정보 편집도구 페이지에서 적용 버튼을 클릭하여, 등록할 위치정보를 적용합니다.</li>
													<li><span class="num">4</span>등록하기 페이지에서 등록 버튼을 클릭하여, 하수도시설을 등록합니다.</li>
													<li><span class="num">5</span>취소 버튼을 클릭하여, 하수도시설 등록을 취소합니다.</li>
												</ul>
                                                <p class="ex-txt">※ 하수도시설 수정시, 공간정보 편집 도구는 2D에서만 가능합니다.</p>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>하수도시설 <strong>&gt; <u>3. 수정</u></strong></p> <span class="manual-txt">하수도시설을 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-02-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>하수도시설 페이지에서 조회된 목록을 클릭하여, 하수도시설을 상세조회 합니다.</li>
													<li><span class="num">2</span>해당 시설의 상세보기 페이지에서 수정 버튼을 클릭하여, 수정페이지가 표출 됩니다.</li>
													<li><span class="num">3</span>수정완료 버튼을 클릭하여 수정내용을 저장한 후, 상세보기 창으로 돌아갑니다.</li>
													<li><span class="num">4</span>취소 버튼을 클릭하여, 수정을 취소하고 상세보기 창으로 돌아갑니다.</li>
												</ul>
                                                <p class="ex-txt">※ 하수도시설 수정시, 공간정보 편집 도구는 2D에서만 가능합니다.</p>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>하수도시설 <strong>&gt; <u>4. 삭제</u></strong></p> <span class="manual-txt">하수도시설을 삭제합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-02-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>하수도시설 페이지에 조회된 목록을 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">2</span>삭제 버튼을 클릭하여, 상수도시설을 삭제합니다.</li>
													<li><span class="num">3</span>취소 버튼을 클릭하여, 상세조회 창을 닫습니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 시설관리 > 하수도시설-->

                                <!--업무 > 시설관리 > 교통시설-->
                                <div class="manual-cont fcty-03">
                                    <div class="manual-tit"><p><strong>교통시설</strong></p> <span class="manual-txt">교통시설을 속성정보 또는 공간정보를 통해 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-03-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>업무 ▶ 교육시설탭을 클릭합니다.</li>
													<li><span class="num">2</span>속성검색/공간검색 조건을 선택하여 조회합니다. 속성검색시 사용자가 검색하고자 하는<br>
                                                        읍면동, 도로폭, 도로명을 선택 및 입력하여 검색합니다. 검색조건없이 검색시 기본데이터를 조회합니다.<br>
                                                        <p class="ex-txt">※ 공간검색의 경우, 공간검색(공통) 참조.</p>
                                                    </li>
													<li><span class="num">3</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">4</span>해당 POI를 선택하면 상세조회 합니다.</li>
													<li><span class="num">5</span>클릭하여, 데이터를 엑셀로 다운로드합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 시설관리 > 교통시설-->

                                <!--업무 > 시설관리 > 체육시설-->
                                <div class="manual-cont fcty-04">
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>1. 조회</u></strong></p> <span class="manual-txt">체육시설을 속성정보 또는 공간정보를 통해 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-04-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>업무 ▶ 체육시설탭을 클릭합니다.</li>
													<li><span class="num">2</span>속성검색/공간검색 조건을 선택하여 조회합니다.</li>
													<li><span class="num">3</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">4</span>해당 POI를 선택하면 상세조회 합니다.</li>
													<li><span class="num">5</span>클릭하여, 데이터를 엑셀로 다운로드합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>2. 등록</u></strong></p> <span class="manual-txt">체육시설을 등록합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/fcty-04-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>등록 버튼을 클릭합니다.</li>
													<li><span class="num">2</span>등록버튼을 클릭하여, 체육시설을 등록합니다.</li>
													<li><span class="num">3</span>취소버튼을 클릭하여, 체육시설 등록을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>3. 수정</u></strong></p> <span class="manual-txt">체육시설을 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-04-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>체육시설 상세보기 하단에 수정 버튼을 클릭합니다.</li>
													<li><span class="num">3</span>수정 완료 후 저장 버튼을 눌러 저장합니다.</li>
													<li><span class="num">4</span>취소 버튼을 눌러 수정을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>4. 삭제</u></strong></p> <span class="manual-txt">체육시설을 삭제합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/fcty-04-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>체육시설 상세보기에서 삭제버튼을 눌러 해당 내용을 삭제합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>5. 운영정보관리 조회</u></strong></p> <span class="manual-txt">체육시설 운영정보를 조회 합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-04-05.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>체육시설 상세보기에서 운영정보 관리 버튼을 클릭 합니다.</li>
													<li><span class="num">3</span>체육시설 운영정보관리 탭에서 운영정보를 합니다.</li>
													<li><span class="num">4</span>취소 버튼을 눌러 운영정보 관리를 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>6. 운영정보관리 등록 / 수정</u></strong></p> <span class="manual-txt">체육시설 운영정보를 등록 또는 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-04-06.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>체육시설 상세보기에서 운영정보 관리 버튼을 클릭 합니다</li>
													<li><span class="num">3</span>체육시설 운영정보관리 탭에서 운영정보를 입력 합니다.</li>
													<li><span class="num">4</span>작성 완료 후 등록 버튼을 눌러 운영정보를 등록 합니다.<br>
                                                        <ul class="manual-list2">
                                                            <li>새로운 년도일 경우 : 신규 등록</li>
                                                            <li>기존 년도 : 수정 등록</li>
                                                        </ul>
                                                    </li>
													<li><span class="num">5</span>취소 버튼을 눌러 운영정보 관리를 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>7. 운영정보관리 삭제</u></strong></p> <span class="manual-txt">체육시설 운영정보를 삭제 합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-04-07.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>체육시설 상세보기에서 운영정보 관리 버튼을 클릭 합니다</li>
													<li><span class="num">3</span>체육시설 운영정보관리 탭에서 삭제 할 운영정보 체크박스를 체크 합니다.</li>
													<li><span class="num">4</span>선택 완료 후 선택삭제 버튼을 눌러 운영정보를 삭제 합니다.</li>
													<li><span class="num">5</span>취소 버튼을 눌러 운영정보 관리를 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>8.시설정보관리 조회</u></strong></p> <span class="manual-txt">체육시설 시설정보를 조회 합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-04-08.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>체육시설 상세보기에서 시설정보 관리 버튼을 클릭 합니다.</li>
													<li><span class="num">3</span>체육시설 시설정보관리 탭에서 시설정보를 조회합니다.</li>
													<li><span class="num">4</span>취소 버튼을 눌러 시설정보 관리를 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>9.시설정보관리 등록/수정</u></strong></p> <span class="manual-txt">체육시설 시설정보를 등록 합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-04-09.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>체육시설 상세보기에서 시설정보 관리 버튼을 클릭 합니다.</li>
													<li><span class="num">3</span>체육시설 시설정보관리 탭에서 시설정보를 입력 합니다.</li>
													<li><span class="num">4</span>작성 완료 후 등록 버튼을 눌러 시설정보를 등록 합니다.</li>
													<li><span class="num">5</span>취소 버튼을 눌러 시설정보 관리를 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>체육시설 <strong>&gt; <u>10.시설정보관리 삭제</u></strong></p> <span class="manual-txt">체육시설 시설정보를 삭제 합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-04-10.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>체육시설 상세보기에서 시설정보 관리 버튼을 클릭 합니다.</li>
													<li><span class="num">3</span>체육시설 시설정보관리 탭에서 삭제할 시설정보 체크박스를 체크 합니다.</li>
													<li><span class="num">4</span>선택 완료 후 선택삭제 버튼을 눌러 시설정보를 삭제 합니다.</li>
													<li><span class="num">5</span>취소 버튼을 눌러 시설정보 관리를 취소합니다. </li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 시설관리 > 체육시설-->

                                <!--업무 > 시설관리 > 복지시설-->
                                <div class="manual-cont fcty-05">
                                    <div class="manual-tit"><p>복지시설 <strong>&gt; <u>1. 조회</u></strong></p> <span class="manual-txt">복지시설을 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-05-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 복지시설</li>
													<li><span class="num">2</span>속성검색/공간검색 조건을 선택하여 조회합니다.</li>
													<li><span class="num">3</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">4</span>해당 POI를 선택하면 상세조회 합니다.</li>
													<li><span class="num">5</span>클릭하여, 데이터를 엑셀로 다운로드합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>복지시설 <strong>&gt; <u>2. 등록</u></strong></p> <span class="manual-txt">복지시설을 등록합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/fcty-05-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>등록 버튼을 클릭합니다.</li>
													<li><span class="num">2</span>등록버튼을 클릭하여, 복지시설을 등록합니다.</li>
													<li><span class="num">3</span>취소버튼을 클릭하여, 복지시설 등록을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>복지시설 <strong>&gt; <u>3. 수정</u></strong></p> <span class="manual-txt">복지시설을 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-05-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>복지시설 상세보기 하단에 수정 버튼을 클릭합니다.</li>
													<li><span class="num">3</span>수정 완료 후 저장 버튼을 눌러 저장합니다.</li>
													<li><span class="num">4</span>취소 버튼을 눌러 수정을 취소합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>복지시설 <strong>&gt; <u>4. 삭제</u></strong></p> <span class="manual-txt">복지시설을 삭제합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/fcty-05-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>해당 시설의 목록을 클릭하여 상세조회 합니다.</li>
													<li><span class="num">2</span>복지시설 상세보기에서 삭제버튼을 눌러 해당 내용을 삭제합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 시설관리 > 복지시설-->

                                <!--업무 > 시설관리 > 시설예약관리-->
                                <div class="manual-cont fcty-06">
                                    <div class="manual-tit"><p>시설예약관리 <strong>&gt; <u>1. 조회</u></strong></p> <span class="manual-txt">시설예약정보를 검색 및 조회합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/fcty-06-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>메인메뉴 ▶ 업무 ▶ 시설예약관리</li>
													<li><span class="num">2</span>년도,월 날짜조건을 선택하여 조회합니다.</li>
													<li><span class="num">3</span>등록 버튼을 클릭하여, 시설예약정보 등록페이지로 이동합니다.</li>
													<li><span class="num">4</span>시설예약관리 페이지에 조회된 목록을 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">5</span>해당 시설의 POI마커를 클릭하여, 상세조회 합니다.</li>
													<li><span class="num">6</span>초기화 버튼을 클릭하여, 검색 목록을 초기화합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>시설예약관리 <strong>&gt; <u>2. 등록</u></strong></p> <span class="manual-txt">시설예약정보를 등록합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/fcty-06-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>예약할 시설을 선택하여 조회합니다.</li>
													<li><span class="num">2</span>①에서 선택한 시설의 정보들을 확인한 후,<br>
                                                        예약 정보를 입력합니다.
                                                    </li>
													<li><span class="num">3</span>등록 버튼을 클릭하여, 시설예약정보를 등록합니다.</li>
													<li><span class="num">4</span>취소 버튼을 클릭하여, 시설예약정보 등록을<br>
                                                        취소하고 목록으로 돌아갑니다.
                                                    </li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>시설예약관리 <strong>&gt; <u>3. 수정</u></strong></p> <span class="manual-txt">시설예약정보를 수정합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/fcty-06-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>시설예약관리 상세페이지에서 수정버튼을 클릭하여, 수정페이지로 이동합니다</li>
													<li><span class="num">2</span>수정완료 버튼을 클릭하여 수정내용을 저장한 후, 상세보기 창으로 돌아갑니다.</li>
													<li><span class="num">3</span>취소 버튼을 클릭하여, 수정을 취소하고 상세보기 창으로 돌아갑니다.</li>
													<li><span class="num">4</span>클릭하여, 수정을 취소하고 상세보기 창으로 돌아갑니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                    <div class="manual-tit"><p>시설예약관리 <strong>&gt; <u>4. 삭제</u></strong></p> <span class="manual-txt">시설예약정보를 삭제합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group horizontal">
											<div class="img-items"><img src="/images/manual/fcty-06-04.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>시설예약관리 상세보기 창에서 삭제 버튼을 클릭하여,<br>
                                                        시설예약정보를 삭제합니다.
                                                    </li>
													<li><span class="num">2</span>취소 버튼을 클릭하여, 상세보기 창을 닫고 목록으로 돌아갑니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 시설관리 > 시설예약관리-->

                                <!--업무 > 분석 > AI분석(3D)-->
                                <div class="manual-cont anls-01">
                                    <div class="manual-tit"><p><strong>AI분석(3D)</strong></p> <span class="manual-txt">현재 화면을 기준으로 건물, 토지 등의 객체에 대한 AI영상분석을 수행 합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-01-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>분석  ▶ AI영상분석</li>
													<li><span class="num">2</span>분석대상 항목을 체크하여 선택합니다.</li>
													<li><span class="num">3</span>지도화면을 조정 후  분석버튼을 눌러 ai영상 분석을 실행합니다.</li>
													<li><span class="num">4</span>검색된 항목리스트에서 이동 버튼을 클릭하여 해당위치로 이동합니다.</li>
												</ul>
                                                <p class="ex-txt">*하단리스트는 AI가 분석한 결과값이며 해당위치의 속성과 다른 값 일수 있습니다.</p>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 분석 > AI분석(3D)-->

                                <!--업무 > 분석 > 조망권분석(3D)-->
                                <div class="manual-cont anls-02">
                                    <div class="manual-tit"><p><strong>조망권분석(3D)</strong></p> <span class="manual-txt">건물, 지표면 등 원하는 위치에서의 조망권을 분석합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-02-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>분석  ▶ 조망권분석</li>
													<li><span class="num">2</span>조망점 분석 선택창에서 등록버튼을 클릭 합니다.</li>
													<li><span class="num">3</span>지도 위에 분석할 곳을 클릭하여, 조망점 분석지점을 선택합니다.</li>
													<li><span class="num">4</span>등록완료 버튼을 클릭하여 조망 점을 등록 합니다.</li>
													<li><span class="num">5</span>이동을 누르면 선택된 조망 점으로 이동하며 조망권 모드로 변경됩니다.</li>
													<li><span class="num">6</span>삭제버튼을 클릭하여, 입력된 조망점을 삭제합니다. </li>
													<li><span class="num">7</span>해제 버튼 클릭시 조망권모드를 해제합니다.</li>
													<li><span class="num">8</span>모든 조망점을 삭제하고 초기화면으로 이동합니다.</li>
												</ul>
                                                <p class="ex-txt">* 조망 점은 최대 5개로 생성할 수 있으며 4개 미만일 경우 따로 등록버튼을 누르지않아도 지도 클릭시 새로운 조망 점을 등록 할 수 있습니다.</p>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 분석 > 조망권분석(3D)-->

                                <!--업무 > 분석 > 경사분석(3D)-->
                                <div class="manual-cont anls-03">
                                    <div class="manual-tit"><p><strong>경사분석(3D)</strong></p> <span class="manual-txt">특정 영역의 경사를 분석합니다</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-03-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>분석  ▶ 경사 분석</li>
													<li><span class="num">2</span>영역선택 버튼을 누릅니다. 영역 선택모드로 변환됩니다.</li>
												</ul>
											</div>
										</div>
                                        <div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-03-02.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">3</span>지도화면에서 분석 할 3점 이상 클릭하여 영역을 선택합니다.</li>
													<li><span class="num">4</span>영역선택 후 선택완료 버튼을 누릅니다</li>
													<li><span class="num">5</span>분석버튼을 누르면 해당지역의 경사도를 분석합니다. 경사를 분석하여 리스트로 표출합니다.</li>
													<li><span class="num">6</span>입력한 분석 값을 초기화합니다.</li>
												</ul>
											</div>
										</div>
                                        <div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-03-03.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">7</span>분석한 리스트를 다운로드 합니다.(pdf)</li>
													<li><span class="num">8</span>분석옵션을 변경해 원하는 분석  값을 확인할 수 있습니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 분석 > 경사분석(3D)-->

                                <!--업무 > 분석 > 공간분석-->
                                <div class="manual-cont anls-04">
                                    <div class="manual-tit"><p><strong>공간분석</strong></p> <span class="manual-txt">시설물에 관한 공간분석을 합니다</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-04-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>분석  ▶ 공간 분석</li>
													<li><span class="num">2</span>대상지역과 분석시설을 조건으로 넣을 수 있습니다.</li>
													<li><span class="num">3</span>분석버튼을 누릅니다. 검색기준의 시설물을 리스트와 차트로 표출하며 검색지역으로 지도 이동을 합니다.<br>
                                                        또 검색된 지역의 시설물을 지도에 표출합니다.
                                                    </li>
													<li><span class="num">4</span>검색조건을 초기화합니다.</li>
													<li><span class="num">5</span>검색된 조건을 엑셀 다운로드 합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 분석 > 공간분석-->

                                <!--업무 > 분석 > 일조권분석(3D)-->
                                <div class="manual-cont anls-05">
                                    <div class="manual-tit"><p><strong>일조권분석(3D)</strong></p> <span class="manual-txt">특정일시, 위치에서의 일조권을 분석합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-05-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>분석  ▶ 일조권분석</li>
													<li><span class="num">2</span>일조권 분석창</li>
													<li><span class="num">3</span>일조권 조건을 선택합니다.<br>
                                                        <p class="ex-txt">*년월일/시작시간/종료시간/속도간격</p>
                                                    </li>
													<li><span class="num">4</span>시뮬레이션을 재생, 일시정지, 정지 합니다.</li>
													<li><span class="num">5</span>일조권 조건과 그림자를 초기화합니다.</li>
													<li><span class="num">6</span>슬라이더를 이용해 원하는 시간대의 일조권을 확인할 수 있습니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 분석 > 일조권분석(3D)-->

                                <!--업무 > 분석 > 지형단면도(3D)-->
                                <div class="manual-cont anls-06">
                                    <div class="manual-tit"><p><strong>지형단면도(3D)</strong></p> <span class="manual-txt">지형의 단면을 분석합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-06-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>분석  ▶ 지형단면도</li>
													<li><span class="num">2</span>단면위치설정을 누른 후 지도 영역에서 2점이상 클릭합니다. (단면위치설정모드로 변경됩니다)</li>
													<li><span class="num">3</span>입력한 두 점을 잇는 선을 기준으로 분석된 값이 차트로 표출됩니다.</li>
													<li><span class="num">4</span>이동버튼을 눌러 지도 화면을 조정 할 수 있습니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 분석 > 지형단면도(3D)-->

                                <!--업무 > 분석 > 지하시설단면도-->
                                <div class="manual-cont anls-07">
                                    <div class="manual-tit"><p><strong>지하시설단면도</strong></p> <span class="manual-txt">지하시설단면도를 분석합니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-07-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>분석  ▶지하시설단면도</li>
													<li><span class="num">2</span>조회할 단면 위치를 지도 위의 임의의 두 지점을 클릭하여 설정합니다.</li>
													<li><span class="num">3</span>단면 위치 설정 시, 지하시설횡단면 차트를 조회하고 차트 상에 마우스 커서가 위치한 곳을 지도 상에 표시합니다.</li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 분석 > 지하시설단면도-->

                                <!--업무 > 분석 > 가시권분석(3D)-->
                                <div class="manual-cont anls-08">
                                    <div class="manual-tit"><p><strong>가시권분석(3D)</strong></p> <span class="manual-txt">특정 위치에서의 가시권을 분석합니다. 가시범위는 녹색, 비가시범위는 적색으로 표시 됩니다.</span></div>
                                    <div class="manual-box">
										<div class="card-group">
											<div class="img-items"><img src="/images/manual/anls-08-01.jpg" alt=""></div>
											<div class="text-items">
												<ul class="manual-list1">
													<li><span class="num">1</span>분석  ▶ 가시권분석</li>
													<li><span class="num">2</span>지도에서 가시권분석을 하고 싶은 장소를 클릭합니다.</li>
													<li><span class="num">3</span>*pan조절 : 분석영역의 좌우를 조절할 수 있습니다.<br>
                                                        *Tilt조절 : 분석영역의 상하를 조절할 수 있습니다.<br>
                                                        *Fox X조절 : x축에 해당되는 분석영역을 늘이고 줄일 수 있습니다.<br>
                                                        *Fox Y조절 : y축에 해당되는 분석영역을 늘이고 줄일 수 있습니다.<br>
                                                    </li>
												</ul>
											</div>
										</div>
									</div>
                                </div>
                                <!--//업무 > 분석 > 가시권분석(3D)-->

							</div>
						</div>
					</div>
					<button type="button" class="manual-close" title="닫기"></button>

					<script>
						$(document).ready(function(){
							//manual Popup Open
							$(".side-util .manual").on("click", function(){
								$(".manual-panel").show();
								$(".popup-overlay").show();
								$(".manual-dep1 > li:first-child .manual-dep2").show();
								$(".manual-dep1 > li:first-child").addClass('active');
                                $(".manual-dep1 > li:first-child .manual-dep2 > li:first-child").addClass("on");
								$(".manual-cont").removeClass("on");
								$(".manual-cont.sach-01").addClass("on");
							});

							//manual Popup Close
							$(".manual-close").on("click", function(){
								$(this).parents(".manual-panel").hide();
								$(".popup-overlay").hide();
								$(".side-util .manual").parent().removeClass("on");
								$(".manual-lnb").children().find(".active, .on").removeClass("active on");
								$(".manual-dep2, .manual-dep3").hide();
								$('.manual-panel').remove();
							});

							$(".manual-lnb").children().find(".active").parent().show();
							//depth1
							$(".manual-dep1 .dep1-tit").on("click", function(){
								$(this).parent().toggleClass("active").siblings().removeClass("active").children(".manual-dep2").hide();
								if($(this).parent().hasClass("active")){
									$(this).attr("title", "접기").next(".manual-dep2").show();
								} else {
									$(this).attr("title", "열기").next(".manual-dep2").hide();
								}
							});
							
							//depth2
							$(".manual-dep2 li").not(":has('.manual-dep3')").children(".dep2-tit").addClass("noDepth3");
                            $(".manual-dep2 .dep2-tit").on("click", function(){
                                $(this).parent().toggleClass("active");
                                if($(this).hasClass("noDepth3")){
                                    $(".manual-dep2 li").not($(this).parent()).removeClass("active on").children(".manual-dep3").stop().slideUp(200);
                                    $(this).removeAttr("title").parent().addClass("on");
                                } else {
                                    if($(this).parent().hasClass("active")){
                                        $(this).attr("title", "접기");
                                        $(this).next(".manual-dep3").stop().slideDown().parent().siblings(':not(.on)').removeClass("on active").find(".manual-dep3").stop().slideUp(200);
                                    } else {
                                        $(this).attr("title", "열기");
                                        $(this).next(".manual-dep3").stop().slideUp();
                                    }
                                };

                            });

							//depth2 (length를 이용하는 방법)
							// $(".manual-dep2 > li").not(":has('.manual-dep3')").children(".dep2-tit").addClass("noDepth3");
							// $(".manual-dep2 .dep2-tit").on("click", function(){
							// 	if($(this).parent().has("ul").length > 0 ){
							// 		$(this).parent().toggleClass("active").siblings().removeClass("active").children(".manual-dep3").stop().slideUp(200);
							// 		if($(this).parent().hasClass("active")){
							// 			$(this).attr("title", "접기");
							// 			$(this).next(".manual-dep3").stop().slideDown();
							// 		} else {
							// 			$(this).attr("title", "펼치기");
							// 			$(this).next(".manual-dep3").stop().slideUp();
							// 		}
							// 	} else {
							// 		$(this).parent().addClass("active").siblings().removeClass("active");
							// 	}
							// });

							//depth3
							$(".dep3-tit").on("click", function(){
                                $(".manual-dep2 li").not($(this).parents()).removeClass("active on").children(".manual-dep3").stop().slideUp(200);
                                $(this).parent().parent().parent().addClass("on");
                                $(".dep3-tit").parent().removeClass("active");
								$(this).parent().addClass("active");
							});

							//manual-lnb 클릭 시 manual-cont open
							$(".dep2-tit, .dep3-tit").on("click", function(){
								$("."+$(this).data("manual")).addClass("on").siblings().removeClass("on");

                                $(".manual-panel .mCSB_container").css("top", "0");
                                $(".manual-panel .mCSB_dragger").css("top", "0");
								$('.manual-panel .scroll-y').mCustomScrollbar('scrollTo', 'top', {scrollInertia : 0});
							});
							
							let txt = $('#prmTxt').val();
							manualTab(txt);
						});

                        function manualTab(txt) {
                            $('.manual-panel .manual-dep1 li, .manual-cont').removeClass('on active');
                            $('.manual-panel .manual-dep1 ul').hide();

                            $('.manual-panel .manual-dep1 button').each(function(){
                                // if ($(this).text().indexOf(txt) != -1) {
                                if ($(this).text() == txt) {
                                    $(this).parents('li').each(function(){
                                        if (!$(this).hasClass('active')) $(this).children('button').click();
                                        $(".manual-panel").show();
                                        $(".popup-overlay").show();
                                    });
                                }
                            });
                        }
					</script>
				</div>

	</body>
</html>