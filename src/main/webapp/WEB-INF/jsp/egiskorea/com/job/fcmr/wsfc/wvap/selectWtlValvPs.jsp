<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<style type="text/css">
	.popup-panel.popup-sub .select-wtlValvPs-popup-close {
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

<!-- 업무 > 시설관리 > 상수도시설 > 변류시설 상세보기-->

       	<div class="popup-header">변류시설 상세보기</div>
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
                                          	<c:out value="${wtlValvPsVO.ftr_cde_nm }"/>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<c:out value="${wtlValvPsVO.ftr_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">읍면동</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.hjd_cde_nm }"/>
                                       		
                                       </td>
                                       <th scope="row">도엽번호</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.sht_num }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관리기관</th>
                                       <td>
                                       	   <c:if test="${wtlValvPsVO.mng_cde_nm  != '' || wtlValvPsVO.mng_cde_nm  ne null}">
                                           		<c:out value="${wtlValvPsVO.mng_cde_nm }"/>
                                           </c:if>
                                           <c:if test="${wtlValvPsVO.mng_cde_nm  == '' || wtlValvPsVO.mng_cde_nm  eq null }">
                                           		<c:out value="${wtlValvPsVO.mng_cde }"/>
                                           </c:if>
                                       </td>
                                       <th scope="row">설치일자</th>
                                       <td>
                                           <div class="datapicker-group">
                                           		<c:out value="${wtlValvPsVO.ist_ymd }"/>
                                           </div>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">변류형식</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.mof_cde_nm }"/>
                                       </td>
                                       <th scope="row">관경(mm)</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.std_dip }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">제수변회전방향</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.sae_cde_nm }"/>
                                       </td>
                                       <th scope="row">제수변총회전수</th>
                                       <td>
	                                       	<c:out value="${wtlValvPsVO.tro_cnt }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">제수변현회전수</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.cro_cnt }"/>
                                       </td>
                                       <th scope="row">제수변구동방법</th>
                                       <td>
	                                       	<c:out value="${wtlValvPsVO.mth_cde_nm }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">시설물형태</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.for_cde_nm }"/>
                                       </td>
                                       <th scope="row">변실규격</th>
                                       <td>
	                                       	<c:out value="${wtlValvPsVO.val_std }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">설정압력</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.val_saf }"/>
                                       </td>
                                       <th scope="row">제작회사명</th>
                                       <td>
	                                       	<c:out value="${wtlValvPsVO.prc_nam }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">관로지형지물부호</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.pip_cde }"/>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
	                                       	<c:out value="${wtlValvPsVO.pip_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">이상상태</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.cst_cde_nm }"/>
                                       </td>
                                       <th scope="row">개패여부</th>
                                       <td>
	                                       	<c:out value="${wtlValvPsVO.off_cde_nm }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">공사번호</th>
                                       <td>
	                                       	<c:out value="${wtlValvPsVO.cnt_num }"/>
                                       </td>
                                       <th scope="row">방향각</th>
                                       <td>
                                       		<c:out value="${wtlValvPsVO.ang_dir }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
                                           	  <c:out value="${wtlValvPsVO.geom }"/>
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
                           	   <button type="button" class="btn basic bi-edit btn_edit" 		onclick="javascript:updateWtlValvPsView('<c:out value="${id }"/>')">수정</button>
                               <button type="button" class="btn basic bi-delete2 btn_delete" 	onclick="javascript:deleteWtlValvPs('<c:out value="${id }"/>')">삭제</button>  
                               <button type="button" class="btn basic bi-cancel btn_cancel" 	onclick="javascript:cancelSelectWtlValvPs();">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <!-- <button type="button" class="popup-close" title="닫기"></button> -->
           <button type="button" class="select-wtlValvPs-popup-close" title="닫기"></button>

<!-- 업무 > 시설관리 > 상수도시설 > 변류시설 상세보기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("selectWtlValvPs.jsp");
		
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
		$(".popup-panel .select-wtlValvPs-popup-close").on("click", function () {
            cancelSelectWtlValvPs();
    	});
		
	});
	
	//functions
	
	//소반시설 상세보기 취소
	function cancelSelectWtlValvPs() {
		//console.log("cancelSelectWtlValvPs()");
		
		$(".select-wtlValvPs-popup-close").closest('.popup-panel').removeClass('opened');
        // 초기화 (지도)
        dtmap.draw.dispose();
        dtmap.draw.clear();
        
        dtmap.vector.clearSelect();	//선택 해제
	}
	
	

</script>

	
