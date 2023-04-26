<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .select-wtlSplyLs-popup-close {
	    top: 0;
	    right: 0;
	    width: 39px;
	    height: 39px;
	    border-left: 1px solid #44516A;
	    background: url(/images/icon/popup-close2.svg) no-repeat 50% 50%;
	    border-top-right-radius: 10px;
	    position: absolute;
	}
</style>

<!-- 업무 > 시설관리 > 상수수도시설 > 급수관로 상세보기-->

       	<div class="popup-header">급수관로 상세보기</div>
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
                                          	<c:out value="${wtlSplyLsVO.ftr_cde_nm }"/>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<c:out value="${wtlSplyLsVO.ftr_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">읍면동</th>
                                       <td>
                                       		<c:out value="${wtlSplyLsVO.hjd_cde_nm }"/>
                                       </td>
                                       <th scope="row">도엽번호</th>
                                       <td>
											<c:out value="${wtlSplyLsVO.sht_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관리기관</th>
                                       <td>
                                       		<c:out value="${wtlSplyLsVO.mng_cde }"/>
                                       </td>
                                       <th scope="row">설치일자</th>
                                       <td>
                                           <div class="datapicker-group">
                                           		<c:out value="${wtlSplyLsVO.ist_ymd }"/>
                                           </div>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관용도</th>
                                       <td>
                                           <c:out value="${wtlSplyLsVO.saa_cde_nm }"/>
                                       </td>
                                       <th scope="row">관재질</th>
                                       <td>
                                           <c:out value="${wtlSplyLsVO.mop_cde_nm }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관경(mm)</th>
                                       <td>
                                       		<c:out value="${wtlSplyLsVO.std_dip }"/>
                                       </td>
                                       <th scope="row">연장</th>
                                       <td>
                                       		<c:out value="${wtlSplyLsVO.byc_len }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">접합종류</th>
                                       <td>
                                       		<c:out value="${wtlSplyLsVO.jht_cde_nm }"/>
                                       </td>
                                       <th scope="row">최저깊이</th>
                                       <td>
	                                       	<c:out value="${wtlSplyLsVO.low_dep }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">최고깊이</th>
                                       <td>
                                       		<c:out value="${wtlSplyLsVO.hgh_dep }"/>
                                       </td>
                                       <th scope="row">공사번호</th>
                                       <td>
	                                       	<c:out value="${wtlSplyLsVO.cnt_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관라벨</th>
                                       <td colspan="3">
	                                       	<c:out value="${wtlSplyLsVO.pip_lbl }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
                                           	  <input type="text" 	class="form-control txt-geometry-address" value="" readonly="readonly">
                                           	  <input type="hidden" 	name="geom" class="form-control" value="">
                                           </div>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="position-bottom btn-wrap justify-content-end">
                           <div>
                           	   <button type="button" class="btn basic bi-edit btn_edit" 		onclick="javascript:updateWtlSplyLsView('<c:out value="${id }"/>')">수정</button>
                               <button type="button" class="btn basic bi-delete2 btn_delete" 	onclick="javascript:deleteWtlSplyLs('<c:out value="${id }"/>')">삭제</button>  
                               <button type="button" class="btn basic bi-cancel btn_cancel" 	onclick="javascript:cancelSelectWtlSplyLs();">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="select-wtlSplyLs-popup-close" title="닫기"></button>

<!-- 업무 > 시설관리 > 상수수도시설 > 급수관로 상세보기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		//console.log("selectWtlSplyLs.jsp");
		
		//gird 데이터를 통한 주소 조회
		var id = "${id }";
		
		var geomData = getGeomDataForGridId(id);
		//console.log(geomData);
		if(geomData){
			getAddressForPoint(geomData, "#rightSubPopup .txt-geometry-address");
			$("#rightSubPopup input[name=geom]").val(geomData);
		}else{
			console.log("상세보기 좌표 오류");
		}
		
		///////////////
		//이벤트
		
		//닫기
		$(".popup-panel .select-wtlSplyLs-popup-close").on("click", function () {
            cancelSelectWtlSplyLs();
    	});
		
	});
	
	//functions
	
	//하수연결관 상세보기 취소
	function cancelSelectWtlSplyLs() {
		//console.log("cancelSelectWtlSplyLs()");
		
		$(".select-wtlSplyLs-popup-close").closest('.popup-panel').removeClass('opened');
        // 초기화 (지도)
        dtmap.draw.dispose();
        dtmap.draw.clear();
        
        dtmap.vector.clearSelect();	//선택 해제
	}
</script>