<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">

	/* 닫기 버튼 개별 설정 */
	.popup-panel.popup-sub .popup-close {
	    top: 0;
	    right: 0;
	    width: 39px;
	    height: 39px;
	    border-left: 1px solid white;
	    background: url(../images/icon/popup-close.svg) no-repeat 50% 50%;
	    border-top-right-radius: 10px;
	}
	
	/* 정류소 아이디 input 개별 설정 */
	.work-03-01-detail > .popup-header input, .work-03-01-regist > .popup-header input {
	    width: 120px;
	    padding: 0 3%;
	    margin-left: 10px;
	    border: none;
	    background-color: #e6e8ed;
	    font-size: 15px;
	    font-weight: 700;
	    text-align: center;
	    border-radius: 15px;
	}

</style>

<!-- 업무 > 교통분석 > 버스정류소 > 정류소경유노선 조회-->
<div class="work-03-01-detail">
    <div class="popup-header">
        <label for="data-stNumb" id="tgdBusSttnInfo"></label>
        <input type="text" id="data-stNumb" value="" class="bluetxt">
    </div>
    <div class="popup-body">
        <div class="sub-popup-body">
            <div class="data-write-wrap" style="height: 100%;">
                <div class="scroll-y mCustomScrollbar _mCS_63" style="position: relative; overflow: visible;"><div id="mCSB_63" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_outside" tabindex="0" style="max-height: none;"><div id="mCSB_63_container" class="mCSB_container" style="position:relative; top:0; left:0;" dir="ltr">
                    <div class="data-default bus">
                        <ol>
                        	<c:forEach items="${tbdThrghRouteInfoVO}" var="item">
                            <li>
                                <label class="busNumb-info">
                                    <small id="busType">
                                    	<c:choose>
					                        <c:when test="${item.routeTy == '11'}">
					                           	직행
					                        </c:when>
					                        <c:when test="${item.routeTy == '12' || item.routeTy == '13'}">
					                           	시내일반
					                        </c:when>
					                        <c:when test="${item.routeTy == '14'}">
					                           	급행
					                        </c:when>
					                        <c:when test="${item.routeTy == '15'}">
					                           	따복
					                        </c:when>
					                        <c:when test="${item.routeTy == '16'}">
					                           	경기
					                        </c:when>
					                        <c:when test="${item.routeTy == '21'}">
					                           	직행
					                        </c:when>
					                        <c:when test="${item.routeTy == '22' || item.routeTy == '23'}">
					                           	일반
					                        </c:when>
					                        <c:when test="${item.routeTy == '30'}">
					                           	마을
					                        </c:when>
					                        <c:when test="${item.routeTy == '41' || item.routeTy == '42' || item.routeTy == '43'}">
					                           	시외
					                        </c:when>
					                        <c:when test="${item.routeTy == '51' || item.routeTy == '52' || item.routeTy == '53'}">
					                           	공항
					                        </c:when>
					                        <c:otherwise>
					                        	일반
					                        </c:otherwise>
					                    </c:choose>
                                    </small>
                                    <input type="text" value="<c:out value="${item.routeNm }"/>" readonly>
                                </label>
                                <label class="st-BusInfo">
                                    <input type="text" value="<c:out value="${item.cdpntSttnNm }"/>" readonly>
                                    <span class="sideArrow"></span>
                                    <input type="text" value="<c:out value="${item.tmnlSttnNm }"/>" readonly>
                                </label>
                            </li>
                          	</c:forEach>
                        </ol>
                    </div>
                </div></div><div id="mCSB_63_scrollbar_vertical" class="mCSB_scrollTools mCSB_63_scrollbar mCS-light mCSB_scrollTools_vertical" style="display: block;"><div class="mCSB_draggerContainer"><div id="mCSB_63_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; top: 0px; display: block; height: 122px; max-height: 324px;"><div class="mCSB_dragger_bar" style="line-height: 30px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
            </div>
            <div class="position-bottom btn-wrap">
                <div>
                    <button type="button" id="cancelSelectBusSttn" class="btn type01">닫기</button>
                </div>
            </div>							
        </div>
    </div>
    <button type="button" class="popup-close" onclick="cancelSelectBusSttn();" title="닫기"></button>				
</div>
<!-- 업무 > 교통분석 > 버스정류소 > 정류소경유노선 조회 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		
		//닫기
 		$("#cancelSelectBusSttn").on("click", function () {
			cancelSelectBusSttn();
    	});
		
	});
	
	//functions
	
	//정류소경유노선 조회 취소
	function cancelSelectBusSttn() {
		
		$(".popup-close").closest('#rightSubPopup').removeClass('opened');	// 우측팝업 닫기
        dtmap.vector.clearSelect();											//선택 해제
        TRFICANALS.Ax5UiGrid.clearSelect();									//그리드 선택 해제
        
	}
	
	// 버스 노선유형별 색상 지정
	var busTypeElements = document.querySelectorAll('#busType');
	busTypeElements.forEach(function(element) {
	    var routeTyNm = element.textContent.trim();

	    switch (routeTyNm) {
		    case '직행':
		    case '경기':
		        element.classList.add('rdBusType');
		        break;
		    case '시내일반':
		        element.classList.add('GrBusType');
		        break;
		    case '급행':
		        element.classList.add('gBusType');
		        break;
		    case '따복':
		        element.classList.add('pkBusType');
		        break;
		    case '일반':
		        element.classList.add('blBusType');
		        break;
		    case '마을':
		        element.classList.add('ywBusType');
		        break;
		    case '시외':
		        element.classList.add('gmBusType');
		        break;
		    case '공항':
		        element.classList.add('preBusType');
		        break;
		    default:
		        // 기본 동작 설정 (예: 다른 경우에는 'blBusType' 추가)
		        element.classList.add('blBusType');
		}

	});
	
</script>