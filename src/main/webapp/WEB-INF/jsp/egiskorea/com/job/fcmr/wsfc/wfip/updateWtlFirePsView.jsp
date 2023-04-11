<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!-- 업무 > 시설관리 > 상수도시설 > 소방시설 수정하기-->

       	<div class="popup-header">소방시설 수정하기</div>
           <div class="popup-body">
               <div class="sub-popup-body">
                   <div class="data-write-wrap" style="height: 100%;">
                       <div class="scroll-y">
                       	   <form id="insertWtlFirePsForm" method="post">
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
                                          	<c:out value="${wtlFirePsVO.ftr_cde_nm }"/>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<c:out value="${wtlFirePsVO.ftr_idn }"/>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">읍면동</th>
                                       <td>
                                       		<%-- <c:out value="${wtlFirePsVO.hjd_cde_nm }"/> --%>
                                       		<select name="hjd_cde" class="form-select">
                                       			<option value="">선택</option>
                                       		</select>	
                                       </td>
                                       <th scope="row">관리기관</th>
                                       <td>
                                       	   <%-- <c:if test="${wtlFirePsVO.mng_cde_nm  != '' || wtlFirePsVO.mng_cde_nm  ne null}">
                                           		<c:out value="${wtlFirePsVO.mng_cde_nm }"/>
                                           </c:if>
                                           <c:if test="${wtlFirePsVO.mng_cde_nm  == '' || wtlFirePsVO.mng_cde_nm  eq null }">
                                           		<c:out value="${wtlFirePsVO.mng_cde }"/>
                                           </c:if> --%>
                                           <select name="mng_cde" class="form-select">
                                       			<option value="">선택</option>
                                       		</select>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">도엽번호</th>
                                       <td>
                                       		<input type="text" name="sht_num" class="form-control" value="${wtlFirePsVO.sht_num }" maxlength="11">
                                       </td>
                                       <th scope="row">설치일자</th>
                                       <td>
                                       	 	<input type="text" name="ist_ymd" class="form-control datepicker " value="${wtlFirePsVO.ist_ymd }" id="dp1680677660036">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">수용가번호</th>
                                       <td>
                                       		<input type="text" name="hom_num" class="form-control" value="${wtlFirePsVO.hom_num }" maxlength="50">
                                       </td>
                                       <th scope="row">소화전형식</th>
                                       <td>
                                           <%-- <c:out value="${wtlFirePsVO.mof_cde_nm }"/> --%>
                                           <select name="mof_cde" class="form-select">
                                       			<option value="">선택</option>
                                       	   </select>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">소화전구경(mm)</th>
                                       <td>
                                       		<input type="number" name="fir_dip" class="form-control" value="${wtlFirePsVO.fir_dip }">
                                       </td>
                                       <th scope="row">관경(mm)</th>
                                       <td>
                                       		<input type="number" name="std_dip" class="form-control" value="${wtlFirePsVO.std_dip }">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">급수탑높이</th>
                                       <td>
                                       		<input type="number" name="sup_hit" class="form-control" value="${wtlFirePsVO.sup_hit }">
                                       </td>
                                       <th scope="row">공사번호</th>
                                       <td>
	                                       	<input type="text" name="cnt_num" class="form-control" value="${wtlFirePsVO.cnt_num }" maxlength="8">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">방향각</th>
                                       <td colspan="3" >
                                       		<input type="number" name="ang_dir" class="form-control" value="${wtlFirePsVO.ang_dir }">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
                                           		<div class="col">
                                           			<input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
                                           		</div>                    
                                           		<div class="col-auto">
                                           			<button type="button" class="btn type01 bi-location btn-select-map" data-popup="space-edit-tool">지도에서 선택</button>
                                           		</div>                  
                                           </div>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                           </form>
                           
                       </div>
                       <div class="position-bottom btn-wrap justify-content-end">
                           <div>
                           	    <button type="button" class="btn basic bi-write2 btn_save" onclick="alert('수정완료')">수정완료</button>
                           		<button type="button" class="btn basic bi-cancel btn_cancel">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="popup-close" title="닫기" onclick="cancelMode();"></button>

<!-- 업무 > 시설관리 > 상수도시설 > 소방시설 수정하기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("updateWtlFirePsView.jsp");
        
		// 날짜 형식 처리 예정 
        // 날짜 적용 - 지금 8자리로 되어 있어 이것 사용 (변경 예정) 
		// 현재 db column 길이는 8~9자리 로 되어 었음 
      	$(".datepicker").datepicker({
            showOn: "both",
            buttonImage: "/images/icon/form-calendar.svg",
            dateFormat: "yymmdd",
        }); 
        
		// 날짜 - 10자리(yyyy-mm-dd) 적용시 사용
      	//ui.callDatePicker();

		//////////////////
		//selectbox 값 세팅
		
      	//읍면동 
		let hjd_cde = '${wtlFirePsVO.hjd_cde }';
      	getCmmCodeData("YPE001", "#rightSubPopup select[name=hjd_cde]", hjd_cde);
      	
      	//관리기관
      	let mng_cde = '${wtlFirePsVO.mng_cde }';
      	getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]", mng_cde);
      	
      	//소화전형식
      	let mof_cde = '${wtlFirePsVO.mof_cde }';
      	getCmmCodeData("OGC-048", "#rightSubPopup select[name=mof_cde]", mof_cde);
      	
      	///////////////////////
      	//gird 데이터를 통한 주소 조회
		var gridRowId = "${gridRowId }";
		
		var geomData = getGeomDataForGridRowId(gridRowId);
		console.log("geomData>>");
		console.log(geomData);
		if(geomData){
			getAddressForPoint(geomData, "#rightSubPopup .txt-geometry-address");
		}else{
			console.log("상세보기 좌표 오류");
		}
        
		
		
		// 지도에서 선택
        $(".btn-select-map", this.element).on("click", function () {
        	console.log( '수정화면');
        	alert(this);
        	
            /* this.editingTool = new EditingTool(
                that.geometryType,
                that.feature.getGeometry(),
                (geometry) => {
                    this.feature.setGeometry(geometry);
                    this.getAddress(geometry).done((result) => {
                        if (result["address"]) {
                            this.address = result["address"];
                        } else {
                            this.address = "";
                        }
                        $(".txt-geometry-address", that.selector).val(this.address);
                    });

                    const format = new ol.format.WKT();
                    cmmUtil.highlightGeometry(format.writeGeometry(geometry));

                    this.editingTool = null;
                }
            ); */
            
        });
		
		
		
	});

</script>

	