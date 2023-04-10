<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>



<!-- 업무 > 시설관리 > 상수수도시설 > 소방시설 등록하기-->

       	<div class="popup-header">소방시설 등록하기</div>
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
                                          	<%-- <c:out value="${wtlFirePsVO.ftr_cde_nm }"/> --%>
                                          	<select name="ftr_cde" class="form-select" readonly="readonly">
                                          		<option value="SA118">급수탑</option>
                                          		<option value="SA119" selected="selected">소화전</option>
                                          	</select>
                                       </td>
                                       <th scope="row">관리번호</th>
                                       <td>
                                       	  	<%-- <c:out value="${wtlFirePsVO.ftr_idn }"/> --%>
                                       	  	<input type="number" name="ftr_idn" class="form-control" value="" readonly="readonly">
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
                                       		<%-- <c:out value="${wtlFirePsVO.sht_num }"/> --%>
                                       		<input type="text" name="sht_num" class="form-control" value="" maxlength="11">
                                       </td>
                                       <th scope="row">설치일자</th>
                                       <td>
                                       	 	<input type="text" name="ist_ymd" class="form-control datepicker " value="" id="dp1680677660036">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">수용가번호</th>
                                       <td>
                                       		<%-- <c:if test="${wtlFirePsVO.hom_num  != '' || wtlFirePsVO.hom_num  ne null}">
	                                       		<c:out value="${wtlFirePsVO.hom_num }"/>
                                       		</c:if> --%>
                                       		<input type="text" name="hom_num" class="form-control" value="" maxlength="50">
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
                                       		<input type="number" name="fir_dip" class="form-control" value="">
                                       </td>
                                       <th scope="row">관경(mm)</th>
                                       <td>
                                       		<input type="number" name="std_dip" class="form-control" value="">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">급수탑높이</th>
                                       <td>
                                       		<%-- <c:out value="${wtlFirePsVO.sup_hit }"/> --%>
                                       		<input type="number" name="sup_hit" class="form-control" value="" id="testt">
                                       </td>
                                       <th scope="row">공사번호</th>
                                       <td>
	                                       	<%-- <c:out value="${wtlFirePsVO.cnt_num }"/> --%>
	                                       	<input type="text" name="cnt_num" class="form-control" value="" maxlength="8">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">방향각</th>
                                       <td colspan="3" >
                                       		<%-- <c:out value="${wtlFirePsVO.ang_dir }"/> --%>
                                       		<input type="number" name="ang_dir" class="form-control" value="">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th scope="row">위치</th>
                                       <td colspan="3">
                                           <div class="form-row">
                                           		<div class="col">
                                           			<input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
                                           			<input type="hidden" name="geom" class="form-control" value="">
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
                       <div class="position-bottom btn-wrap">
                           <div>
                           	    <button type="button" class="btn basic bi-edit btn_add" onclick="insertWtlFirePs();">등록</button>
                           		<button type="button" class="btn basic bi-cancel btn_cancel">취소</button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button type="button" class="popup-close" title="닫기" onclick="cancelMode();"></button>

<!-- 업무 > 시설관리 > 상수수도시설 > 소방시설 등록하기 end -->

<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		console.log("insertWtlFirePsView.jsp");
        
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
		
		
     	// 지도에서 선택
        $(".btn-select-map", this).on("click", function () {
        	console.log( '등록 화면');
        	console.log(this);
        	
        	ui.loadingBar("show");
            $('.space-edit-tool').load("/job/fcts/editView.do", () => {
            	
                //this.initUi();
                
                //선, 면 데이터면 좌표 입력 창 암보이게 수정
                //if (!(this.geometryType == "point" || this.geometryType == "multipoint")) {
		            //$(".tr_coordinate", this.selector).hide();
		        //}
                
                //this.bindEvents();
                //this.loadSnap();
                $(".space-edit-tool").show();
                
               	$.getJSON(
			        "/com/mngr/info/selectAllLayerManageList.do"
			   	).done((response) => {
			    	//console.log(response);  
			    	//console.log(response["list"]);
			    	var list = response["list"];
			    	let tag = `<option value="">시설물</option>`;
			    	for(var i=0; i<list.length; i++){
			    		const name 	= list[i].tblNm.toLowerCase();
			    		const title = list[i].lyrNm;
			    		tag += `<option value=`+name+`>`+title+`</option>`; 
			    	}
			    	$(".space-edit-tool select[name=edit-snap-target]").html(tag);
			    }); 
               	
               	var obj = {};
               	obj.geometryType = "point";
              
               	geoEditBindEvents(obj);
                
                ui.loadingBar("hide");
            });
        	
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
	
	//공간정보 편집도구
	function geoEditBindEvents(obj) {
		console.log("geoEditBindEvents(obj)");
		console.log(obj);
		
		const that = obj;

        // 닫기
        $(".space-edit-tool .editView-popup-close", that.selector).on("click", function () {
            //that.reset();
            $(".space-edit-tool").hide();
        });

        // 스냅
        $(".edit-btn-snap", that.selector).on("click", function () {
            const featureType = $("[name=edit-snap-target]", that.selector).val();
            if (featureType) {
                // cmmUtil.highlightSnapLayer(featureType);
                toastr.warning("cmmUtil.highlightSnapLayer(featureType);", "객체 스내핑 모드");
            } else {
                alert("스냅할 대상을 선택하여 주십시오.");
            }
        });

        // 객체 추가
        $(".edit-btn-add", that.selector).on("click", function () {
            let type = null;
            if (that.geometryType == "point" || that.geometryType == "multipoint") {
                type = "Point";
            } else if (
                that.geometryType == "linestring" ||
                that.geometryType == "multilinestring"
            ) {
                type = "LineString";
            } else if (
                that.geometryType == "polygon" ||
                that.geometryType == "multipolygon"
            ) {
                type = "Polygon";
            } else {
                console.log(`지원되지 않는 공간 타입입니다.`);
            }

            if (type) {
                //cmmUtil.drawEditGeometry(type);
                
                //aj_selectMemoLocation();
                dtmap.draw.active({type: 'Point', once: true});
            	dtmap.on('drawend', _onDrawEnd_wtlFirePsGeom);
                
                //toastr.warning("cmmUtil.drawEditGeometry(type);", "객체 그리기 모드");
            }
        });

        // 객체 수정
        $(".edit-btn-modify", that.selector).on("click", function () {
            // cmmUtil.modifyEditGeometry();
            toastr.warning("cmmUtil.modifyEditGeometry();", "객체 수정 모드");
        });

        // 객체 삭제
        $(".edit-btn-remove", that.selector).on("click", function () {
            if (confirm("객체를 삭제하시겠습니까?")) {
                // cmmUtil.removeEditGeometry();
                toastr.warning("cmmUtil.removeEditGeometry();", "객체 삭제 모드");
            }
        });

        // 좌표 추가
        $(".edit-add-coordinate", that.selector).on("click", function () {
            const xNode = $(".edit-x", that.selector);
            const yNode = $(".edit-y", that.selector);
            if (xNode.val() && yNode.val()) {
                const format = new ol.format.WKT();
                const x = xNode.val();
                const y = yNode.val();
                const point = new ol.geom.Point([x, y]);
                const wkt = format.writeGeometry(
                    point.transform("EPSG:4326", store.getPrj())
                );
                // cmmUtil.addEditGeometry(wkt);
                toastr.warning("cmmUtil.addEditGeometry(wkt);", "객체 추가");
            } else {
                if (!xNode.val()) {
                    xNode.focus();
                } else if (!yNode.val()) {
                    yNode.focus();
                }
                alert("좌표를 입력하여 주십시오.");
            }
        });

        // 적용
        $(".edit-btn-apply", that.selector).on("click", function () {
            /* const wkt = cmmUtil.getEditGeometry();
            if (wkt) {
                const format = new ol.format.WKT();
                let geometry = format.readGeometry(wkt);
                if (that.geometryType.indexOf("multi") >= 0) {
                    if (geometry instanceof ol.geom.Point) {
                        geometry = new ol.geom.MultiPoint([geometry.getCoordinates()]);
                    } else if (geometry instanceof ol.geom.LineString) {
                        geometry = new ol.geom.MultiLineString([geometry]);
                    } else if (geometry instanceof ol.geom.Polygon) {
                        geometry = new ol.geom.MultiPolygon([geometry]);
                    }
                }
                if (that.onApply) {
                    that.reset();
                    that.onApply(geometry);
                }
            } else {
                alert(`공간정보를 입력하여 주십시오.`);
            } */
            var xObj = $(".space-edit-tool .edit-x").val();
            var yObj = $(".space-edit-tool .edit-y").val();
            
            var xObj = parseFloat(xObj);
    		var yObj = parseFloat(yObj);
            
        	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
    			$("#insertWtlFirePsForm .txt-geometry-address").val(result["address"]);
    			const format = new ol.format.WKT();
    			const point = new ol.geom.Point([xObj, yObj]);
    			const wkt = format.writeGeometry(point);
    			$("#insertWtlFirePsForm input[name=geom]").val(wkt);
    			
    			$(".space-edit-tool").hide();
    		});
            
        });
        
	}
	
	
	//
	function _onDrawEnd_wtlFirePsGeom(e){
		dtmap.draw.dispose();
		var geom = e.geometry;
		const position = geom.getFlatCoordinates();
		var xObj = parseFloat(position[0]);
		var yObj = parseFloat(position[1]);
		
		$(".space-edit-tool .edit-x").val(xObj);
		$(".space-edit-tool .edit-y").val(yObj);
		
		/* cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
			$("#insertWtlFirePsForm .txt-geometry-address").val(result["address"]);
			const format = new ol.format.WKT();
			const point = new ol.geom.Point([xObj, yObj]);
			const wkt = format.writeGeometry(point);
			$("#insertWtlFirePsForm input[name=geom]").val(wkt);
		}); */
		
		
		
	}
	
	function _onDrawEnd_memo2(e) {
		console.log("_onDrawEnd_memo2()");
		dtmap.draw.dispose();
		var geom = e.geometry;
		const position = geom.getFlatCoordinates();
		var xObj = parseFloat(position[0]);
		var yObj = parseFloat(position[1]);
		cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
			$("#loc_memo").val(result["address"]);
			const format = new ol.format.WKT();
			const point = new ol.geom.Point([xObj, yObj]);
			const wkt = format.writeGeometry(point);
			$("#wkt").val(wkt);
		});
	}
	
	
	//지도에서 선택 _ 주소 및 경위도 위치 가져오기
	/* function fn_getLocation() {
		dtmap.draw.active({type: 'Point', once: true});
		dtmap.on('drawend', onDrawEnd);
	}
	function onDrawEnd(e) {
		dtmap.draw.dispose();
		var geom = e.geometry;
		const position = geom.getFlatCoordinates();
		var xObj = parseFloat(position[0]);
		var yObj = parseFloat(position[1]);
		cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
			$("#adres").val("경기도 양평군 "+result["address"]);
			const format = new ol.format.WKT();
			const point = new ol.geom.Point([xObj, yObj]);
			const wkt = format.writeGeometry(point);
			$("#geom").val(wkt);
		});
	} */

	

</script>

	