<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!-- top > 그리기 도구 -->
<div class="popup-header">그리기 도구</div>
<div class="popup-body">

	<div class="tool-popup-body top-drawing-body">						
		<h3 class="cont-tit">그리기 등록하기</h3>
		<div class="bbs-write-default">
			<form class="searchForm" onsubmit="return false;">
		    <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
            <input type="hidden" name="searchCl" value="<c:out value='${searchCl}' />">
            </form>
                
			<table class="bbs-write">
				<colgroup>
					<col style="width: 18%;">
					<col style="width: auto;">
				</colgroup>
				<tbody>
					<tr>
						<th scope="row">분류</th>
						<td>
							<select name="cl_id" class="form-select" style="width:320px;">
								<c:forEach items="${clList}" var="cl">
									<option value="<c:out value="${cl.clId}" />"><c:out value="${cl.clNm}" /></option>
								</c:forEach>
							</select>
						</td>
					</tr>
					<tr>
						<th scope="row">제목</th>
						<td><input type="text" name="sj" class="form-control"></td>
					</tr>
					<tr>
						<th scope="row">그리기<br>객체</th>
						<td>
							<span class="drawing-obj">
								<span><input type="radio" name="drawing" id="drawing_translate" value="Translate"><label for="drawing_translate" class="obj-10" title="이동"></label></span>
								<span><input type="radio" name="drawing" id="drawing_modify" value="Modify"><label for="drawing_modify" class="obj-10" title="수정"></label></span>
								<span><input type="radio" name="drawing" id="drawing_point" value="Point" title="Point"><label for="drawing_point" class="obj-01" title="포인트"></label></span>
								<span><input type="radio" name="drawing" id="drawing_marker" value="Marker"><label for="drawing_marker" class="obj-02" title="마커"></label></span>
								<span><input type="radio" name="drawing" id="drawing_line" value="LineString"><label for="drawing_line" class="obj-03" title="라인"></label></span>
								<!-- <span><input type="radio" name="drawing" id="drawing_curve" value="Curve"><label for="drawing_curve" class="obj-04"></label></span> -->
								<span><input type="radio" name="drawing" id="drawing_rect" value="Rectangle"><label for="drawing_rect" class="obj-05" title="사각형"></label></span>
								<span><input type="radio" name="drawing" id="drawing_triangle" value="Triangle"><label for="drawing_triangle" class="obj-06" title="삼각형"></label></span>
								<span><input type="radio" name="drawing" id="drawing_polygon" value="Polygon"><label for="drawing_polygon" class="obj-07" title="다각형"></label></span>
								<span><input type="radio" name="drawing" id="drawing_circle" value="Circle"><label for="drawing_circle" class="obj-08" title="원형"></label></span>
								<span><input type="radio" name="drawing" id="drawing_text" value="Text"><label for="drawing_text" class="obj-09" title="글자"></label></span>
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<div class="tabBoxDepth2-wrap marT15">
			<div class="tabBoxDepth2">
				<ul>
					<li data-tab="drawingTabPoint" class="on"><button type="button" class="inner-tab">점</button></li>
					<li data-tab="drawingTabLine"><button type="button" class="inner-tab">선</button></li>
					<li data-tab="drawingTabPolygon"><button type="button" class="inner-tab">면</button></li>
					<li data-tab="drawingTabText"><button type="button" class="inner-tab">문자</button></li>
				</ul>
			</div>
			<!-- 점 -->
			<div class="tab-cont drawingTabPoint on">
				<div class="row row_point">
					<span class="form-radio text marB5"><span><label>일반스타일</label></span></span>
					<div class="col-6">
						<div class="tbl-list">
							<div class="term">색상</div>
							<div class="desc w-150">
								<input type="text" class="pointColor">
							</div>
						</div>
					</div>
					<div class="col-6">
						<div class="tbl-list vertical-tbl">
							<div class="items">
								<div class="term">모양</div>
								<div class="desc flex-grow-1">
									<select class="form-select pointShape">
										<option value="Circle">Circle</option>
										<option value="Rectangle">Rectangle</option>
										<option value="Triangle">Triangle</option>
										<option value="Star">Star</option>
										<option value="Cross">Cross</option>
										<option value="X">X</option>
									</select>
								</div>
							</div>
							<div class="items">
								<div class="term">크기</div>
								<div class="desc w-150">
									<input type="number" class="form-control pointSize" value="10" min="4" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row symbol-group-row marT30 row_marker">
					<div class="col-left">
						<span class="form-radio text"><span><label>기본제공 심볼</label></span></span>
						<div class="symbol-group">
							<button type="button" class="active"><img src="/images/symbol/1_s.png" data-id="1_s" alt=""></button>
							<button type="button"><img src="/images/symbol/2_s.png" data-id="2_s" alt=""></button>
							<button type="button"><img src="/images/symbol/3_s.png" data-id="3_s" alt=""></button>
							<button type="button"><img src="/images/symbol/4_s.png" data-id="4_s" alt=""></button>
							<button type="button"><img src="/images/symbol/5_s.png" data-id="5_s" alt=""></button>
							<button type="button"><img src="/images/symbol/6_s.png" data-id="6_s" alt=""></button>
							<button type="button"><img src="/images/symbol/7_s.png" data-id="7_s" alt=""></button>
							<button type="button"><img src="/images/symbol/8_s.png" data-id="8_s" alt=""></button>
							<button type="button"><img src="/images/symbol/9_s.png" data-id="9_s" alt=""></button>
							<button type="button"><img src="/images/symbol/10_s.png" data-id="10_s" alt=""></button>
							<button type="button"><img src="/images/symbol/11_s.png" data-id="11_s" alt=""></button>
							<button type="button"><img src="/images/symbol/12_s.png" data-id="12_s" alt=""></button>
							<button type="button"><img src="/images/symbol/13_s.png" data-id="13_s" alt=""></button>
							<button type="button"><img src="/images/symbol/14_s.png" data-id="14_s" alt=""></button>
							<button type="button"><img src="/images/symbol/15_s.png" data-id="15_s" alt=""></button>
							<button type="button"><img src="/images/symbol/16_s.png" data-id="16_s" alt=""></button>
							<button type="button"><img src="/images/symbol/17_s.png" data-id="17_s" alt=""></button>
							<button type="button"><img src="/images/symbol/18_s.png" data-id="18_s" alt=""></button>
							<button type="button"><img src="/images/symbol/19_s.png" data-id="19_s" alt=""></button>
							<button type="button"><img src="/images/symbol/20_s.png" data-id="20_s" alt=""></button>
							<button type="button"><img src="/images/symbol/21_s.png" data-id="21_s" alt=""></button>
							<button type="button"><img src="/images/symbol/22_s.png" data-id="22_s" alt=""></button>
							<button type="button"><img src="/images/symbol/23_s.png" data-id="23_s" alt=""></button>
							<button type="button"><img src="/images/symbol/24_s.png" data-id="24_s" alt=""></button>
							<button type="button"><img src="/images/symbol/25_s.png" data-id="25_s" alt=""></button>
							<button type="button"><img src="/images/symbol/26_s.png" data-id="26_s" alt=""></button>
							<button type="button"><img src="/images/symbol/27_s.png" data-id="27_s" alt=""></button>
							<button type="button"><img src="/images/symbol/28_s.png" data-id="28_s" alt=""></button>
							<button type="button"><img src="/images/symbol/29_s.png" data-id="29_s" alt=""></button>
							<button type="button"><img src="/images/symbol/30_s.png" data-id="30_s" alt=""></button>
							<button type="button"><img src="/images/symbol/31_s.png" data-id="31_s" alt=""></button>
							<button type="button"><img src="/images/symbol/32_s.png" data-id="32_s" alt=""></button>
							<button type="button"><img src="/images/symbol/33_s.png" data-id="33_s" alt=""></button>
							<button type="button"><img src="/images/symbol/34_s.png" data-id="34_s" alt=""></button>
							<button type="button"><img src="/images/symbol/35_s.png" data-id="35_s" alt=""></button>
						</div>
						<div class="d-flex align-items-center justify-content-end">
							<span class="form-label padR5">크기 비율</span>
							<select class="form-select w-auto markerScale">
								<option value="0.5">0.5</option>
								<option value="1" selected="selected">1</option>
								<option value="2">2</option>
							</select>
						</div>
					</div>
					<div class="col-right">
						<span class="form-radio text"><span><label>심볼 직접 등록</label></span></span>
						<div class="symbol-register">
							<div class="scroll-y">
								<ul class="form-radio sm text custom-container">
									<c:forEach items="${imageMarkerList}" var="marker">
										<li>
											<span>
												<label><img src="${marker.img}" data-id="${marker.mkrId}" alt="${marker.mkrNm}"> ${marker.mkrNm}</label>
											</span>
											<%-- <button type="button" data-id="${marker.mkrId}" class="symbol-delete"></button> --%>
										</li>
									</c:forEach>
								</ul>												
							</div>
							<div class="form-file">				
								<input type="file" id="drawing-file" class="drawing-file" ><input class="upload-name" value="파일선택">
								<label for="drawing-file">파일찾기</label> 
							</div>
						</div>
						<div class="d-flex align-items-center justify-content-end">
							<span class="form-label padR5">크기 비율</span>
							<select name="" id="" class="form-select w-auto customScale">
								<option value="0.5">0.5</option>
								<option value="1" selected="selected">1</option>
								<option value="2">2</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<!-- //점 -->

			<!-- 선 -->
			<div class="tab-cont drawingTabLine">
				<div class="row">
					<div class="col-6">
						<div class="tbl-list">
							<div class="term">색상</div>
							<div class="desc w-150">
								<input type="text" class="strokeColor">
							</div>
						</div>
					</div>
					<div class="col-6">
						<div class="tbl-list">
							<div class="term">모양</div>
							<div class="desc flex-grow-1">
								<select class="form-select strokeLineDash">
									<option value="SOLID">실선</option>
									<option value="DOT">점선</option>
									<option value="DASHED">파선</option>
									<option value="DASH-DOTTED">쇄선</option>
									<option value="DASH-DOUBLE-DOTTED">이중쇄선</option>
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
										<div class="drawing-slider"><div class="strokeOpacitySlider"></div></div>													
										<div class="spinner-group">
											<input class="ui-spinner-input strokeOpacity" min="0" max="100" step="1" value="20%" readonly="readonly" />
										</div>
									</div>
								</div>
							</div>
							<div class="items marT10">
								<div class="term">두께</div>
								<div class="desc">
									<div class="drawing-slider-box drawingThickness">
										<div class="drawing-slider"><div class="strokeWidthSlider"></div></div>
										<input type="text" class="value-num strokeWidth" min="1" max="50" step="1" value="3" readonly="readonly" />
									</div>
								</div>
							</div>
						</div>
					</div>									
					<div class="col-12 marT20">
						<div class="tbl-list">
							<div class="term">시작화살표</div>
							<div class="desc">
								<span class="switch"><input type="checkbox" class="checkbox strokeStartArrow" id="strokeStartArrow"><label for="strokeStartArrow"><span class="knobs"></span></label></span>
							</div>
							<div class="term marL30">끝화살표</div>
							<div class="desc">
								<span class="switch"><input type="checkbox" class="checkbox strokeEndArrow" id="strokeEndArrow"><label for="strokeEndArrow"><span class="knobs"></span></label></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- //선 -->

			<!-- 면 -->
			<div class="tab-cont drawingTabPolygon">
				<div class="face-group">
					<div class="title-items"><p>색상</p><p>투명도</p><p>두께</p><p>모양</p></div>
					<div class="line-items">
						<div class="box-group">
							<p class="tit">선</p>
							<div>
								<input type="text" class="strokeColor">
							</div>
							<div>
								<div class="drawing-slider-box drawingOpacity">
									<div class="drawing-slider"><div class="strokeOpacitySlider"></div></div>													
									<div class="spinner-group">
										<input class="ui-spinner-input strokeOpacity" min="0" max="100" step="1" value="20%" readonly="readonly" />
									</div>
								</div>
							</div>
							<div>
								<div class="drawing-slider-box drawingThickness">
									<div class="drawing-slider"><div class="strokeWidthSlider"></div></div>
									<input type="text" class="value-num strokeWidth" min="1" max="50" step="1" value="3" readonly="readonly" />
								</div>
							</div>
							<div>
								<select class="form-select strokeLineDash">
									<option value="SOLID">실선</option>
									<option value="DOT">점선</option>
									<option value="DASHED">파선</option>
									<option value="DASH-DOTTED">쇄선</option>
									<option value="DASH-DOUBLE-DOTTED">이중쇄선</option>
								</select>
							</div>
						</div>
					</div>
					<div class="face-items">
						<div class="box-group">
							<p class="tit">면</p>
							<div>
								<input type="text" class="fillColor">
							</div>
							<div>
								<div class="drawing-slider-box drawingOpacity">
									<div class="drawing-slider"><div class="fillOpacitySlider"></div></div>													
									<div class="spinner-group">
										<input class="ui-spinner-input fillOpacity" min="0" max="100" step="1" value="80%" readonly="readonly" />
									</div>
								</div>
							</div>											
						</div>
					</div>
				</div>
			</div>
			<!-- //면 -->

			<!-- 문자 -->
			<div class="tab-cont drawingTabText">
				<div class="row">
					<div class="col-12">
						<div class="tbl-list">
							<div class="term">문자</div>
							<div class="desc w-350">
								<input type="text" class="form-control text" placeholder="지도에 표시할 문자를 입력하여 주십시오." />
							</div>
						</div>
					</div>
					<div class="col-6 marT10">
						<div class="tbl-list">
							<div class="term">글씨</div>
							<div class="desc w-150">
								<input type="text" class="fillColor">
							</div>
						</div>
					</div>
					<div class="col-6 marT10">
						<div class="tbl-list">
							<div class="term">배경</div>
							<div class="desc w-150">
								<input type="text" class="strokeColor">
							</div>
						</div>
					</div>
					<div class="col-6 marT10">
						<div class="tbl-list">
							<div class="term">폰트</div>
							<div class="desc flex-grow-1">
								<select class="form-select font">
									<option value="맑은고딕" selected="selected">맑은고딕</option>
									<option value="바탕">바탕체</option>
									<option value="돋움">돋움체</option>
									<option value="궁서">궁서체</option>
									<option value="고딕">고딕체</option>
								</select>
							</div>
						</div>
					</div>
					<div class="col-6 marT10">
						<div class="tbl-list">
							<div class="term">크기</div>
							<div class="desc flex-grow-1">
								<div class="desc">
									<div class="drawing-slider-box drawingThickness">
										<div class="drawing-slider"><div class="fontSizeSlider"></div></div>
										<input type="text" class="value-num fontSize" min="10" max="50" step="1" value="26px" readonly="readonly" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-6 marT10">
						<div class="tbl-list">
							<div class="term">모양</div>
							<div class="desc flex-grow-1">
								<div class="text-decoration-group">
									<span><input type="checkbox" id="drawingFontBold" class="fontBold"><label for="drawingFontBold" class="fontBold"></label></span>
									<span><input type="checkbox" id="drawingFontItalic" class="fontItalic"><label for="drawingFontItalic" class="fontItalic"></label></span>
									<!-- <span><input type="checkbox" id="drawingFontUnder" class="fontUnder"><label for="drawingFontUnder" class="fontUnder"></label></span> -->
								</div>
							</div>
						</div>
					</div>
					<div class="col-6 marT10">
						<div class="tbl-list">
							<div class="term">정렬</div>
							<div class="desc flex-grow-1">
								<div class="text-align-group">
									<span><input type="radio" name="textAlign" id="drawingAlignLeft" value="left" checked="checked"><label for="drawingAlignLeft" class="alignLeft"></label></span>
									<span><input type="radio" name="textAlign" id="drawingAlignCenter" value="center"><label for="drawingAlignCenter" class="alignCenter"></label></span>
									<span><input type="radio" name="textAlign" id="drawingAlignRight" value="right"><label for="drawingAlignRight" class="alignRight"></label></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- //문자 -->
		</div>

		<div class="position-bottom btn-wrap">
			<div><button type="button" class="btn basic bi-write2 btn_save">등록</button> <button type="button" class="btn basic bi-cancel btn_cancel">취소</button></div>
		</div>
	</div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('그리기 도구')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 그리기 도구 -->