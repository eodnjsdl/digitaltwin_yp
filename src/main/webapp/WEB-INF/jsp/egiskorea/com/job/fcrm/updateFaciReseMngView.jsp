<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/fcrm/fcrm.js"></script>
<script>
// 예약시간 표출
var timeHtml = '';
var timeVal = '';
var timeSet = ':00';
var timeText = '시';

var strt = '${result.operStrtTime}';
var end = '${result.operEndTime}';

var strtSub = strt.substring(0,2);
var endSub = end.substring(0,2);

for(var i = strtSub; i <= endSub; i++){
	timeVal = i;
	timeHtml += "<option value=" + timeVal + timeSet + " > " + timeVal + timeText + "</option>";
}
$(".timepicker").append(timeHtml);

$("#rsrvStrtTm").val('${result.rsrvStrtTm}');
$("#rsrvEndTm").val('${result.rsrvEndTm}');

// 시설예약관리 수정
$("#fcrmUpdateBtn").on("click", function(){
	var form = $("#updateFaciReseMngForm")[0];
	var formData = new FormData(form);
	
	if($("#asstnFcltySn").val() == '선택해주세요' || $("#gid").val() == '') {
		alert("예약할 시설을 선택해주세요!");
		return false;
	}
	if($(".rsvctmInfo").val() == '') {
		alert("예약자 정보를 입력하세요!");
		return false;
	}
	if($("#rsrvStrtTm").val() > $("#rsrvEndTm").val()){
		alert("예약시간을 확인해주세요!");
		return false;
	}
	if(isNaN($("#useCt").val()) == true || Math.sign($("#useCt").val()) == '-1') {
		alert("숫자(양수)만 입력해주세요!");
		return false;
	}
	
	if(confirm("<spring:message code="common.update.msg" />")){	//수정하시겠습니까?
		// 예약중복체크		
		let dubChk = 'N';	
		$.ajax({
       		type : "POST",
			url: "/job/fcrm/dubCheckFaciReseMngUpdate.do",
			data : formData,
			async:false,
			processData : false,
			contentType : false,
			dataType: "json",
			success : function(data){
				if( data >= '1' ) {
					dubChk = 'Y'
					alert("이미 예약이 완료된 시간이 포함되어있습니다.");
			   	}
			}
		});
		if( dubChk == "Y" ){
			return false;
		} else {
			//aj_updateFaciReseMng(); 
		}
	}
});

// 수정 ajax
function aj_updateFaciReseMng(){
	var form = $("#updateFaciReseMngForm")[0];
	var formData = new FormData(form);
	
	ui.loadingBar("show");
   	$.ajax({
   		type : "POST",
		url: "/job/fcrm/updateFaciReseMng.do",
		data : formData,
		processData : false,
		contentType : false,
		dataType: "json",
		success : function(returnData, status){
			if(returnData.result == "success") {
				alert("<spring:message code="success.common.update" />");
				//aj_selectFaciReseMngList($("#tmpForm")[0]);
				aj_selectFaciReseMng($("#fcrmUpdateBtn").data('gid'), $("#fcrmUpdateBtn").data('rsrvsn'));
			}else{
				alert("<spring:message code="fail.common.update" />");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

var lastSrchYMDtl = "<c:out value='${faciReseMngVO.srchYM}' />";
</script> 
	
    <div class="data-write-wrap">
        <div class="scroll-y">
		<form:form id="updateFaciReseMngForm" method="post">                           
            <p class="cont-tit">예약시설 정보</p>
            <div class="data-default">
                <table class="data-detail">
                    <colgroup>
                        <col style="width: 32%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">시설명</th>
                            <td>
                            	<select name="gid" id="gid" class="form-select facilNm" disabled>
                                	<c:forEach items="${facilNmList}" var="facilNmList" varStatus="status">
										<option value="<c:out value='${facilNmList.gid}' />" <c:if test="${result.gid == facilNmList.gid}">selected</c:if>>
											<c:out value="${facilNmList.fcltyDc}" />
										</option>																
									</c:forEach>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">예약시설</th>
                            <td>
                            	<select name="asstnFcltySn" id="asstnFcltySn" class="form-select facilDtlNm">
                                	<option value="">시설명을 선택하세요</option>
                                	<c:forEach items="${facilAsstnList}" var="facilAsstnList" varStatus="status">
                                		<option value="<c:out value='${facilAsstnList.asstnFcltySn}' />" <c:if test="${result.asstnFcltySn == facilAsstnList.asstnFcltySn || result.gid == facilAsstnList.gid}">selected</c:if>>
											<c:out value="${facilAsstnList.asstnFcltyNm}" />
										</option>
                                	</c:forEach>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">운영시간</th>
                            <td>
                            	<div class="form-row">
                                    <div class="col operStrtTime align-center">
                                    	<c:forEach items="${faciAsstnDtlList}" var="faciAsstnDtlList" varStatus="status">
	                            			<c:out value="${faciAsstnDtlList.operStrtTime}" />
	                            		</c:forEach>
                                    </div>
                                    <div class="col-auto form-dash">~</div>
                                    <div class="col operEndTime align-center">
                                    	<c:forEach items="${faciAsstnDtlList}" var="faciAsstnDtlList" varStatus="status">
	                            			<c:out value="${faciAsstnDtlList.operEndTime}" />
	                            		</c:forEach>
                                    </div>
                                </div> 
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">예약가능여부</th>
                            <td class="rsrvAt">
                            	<c:forEach items="${faciAsstnDtlList}" var="faciAsstnDtlList" varStatus="status">
                           			<c:choose>
                           				<c:when test="${faciAsstnDtlList.rsrvAt eq 'N'}">가능</c:when>
                           				<c:when test="${faciAsstnDtlList.rsrvAt eq 'Y'}">불가능</c:when>
                           			</c:choose>
                           		</c:forEach>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">층(호)수</th>
                            <td class="hoCnt">
                            	<c:forEach items="${faciAsstnDtlList}" var="faciAsstnDtlList" varStatus="status">
                           			<c:out value="${faciAsstnDtlList.hoCnt}" />
                           		</c:forEach>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">시설설명</th>
                            <td class="fcltyDtl">
                            	<c:forEach items="${faciAsstnDtlList}" var="faciAsstnDtlList" varStatus="status">
                           			<c:out value="${faciAsstnDtlList.fcltyDtl}" />
                           		</c:forEach>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="cont-tit">예약 정보</p>
            <div class="data-default">
                <table class="data-write">
                    <colgroup>
                        <col style="width: 32%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">예약일</th>
                            <td>
                            	<div class="datapicker-group">
                            		<input type="text" class="datepicker" id="rsrvDe" name="rsrvDe" value="<c:out value="${result.rsrvDe}" />">
                            	</div>	
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">예약시간</th>
                            <td>
                            	<div class="form-row">
                                    <div class="col">
                                        <select name="rsrvStrtTm" id="rsrvStrtTm" class="form-select timepicker">
                                        </select>
                                    </div>
                                    <div class="col-auto form-dash">~</div>
                                    <div class="col">
                                        <select name="rsrvEndTm" id="rsrvEndTm" class="form-select timepicker">
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">예약자</th>
                            <td><input type="text" class="form-control rsvctmInfo" id="rsvctmNm" name="rsvctmNm" value="<c:out value="${result.rsvctmNm}" />"></td>
                        </tr>
                        <tr>
                            <th scope="row">연락처</th>
                            <td><input type="text" class="form-control rsvctmInfo" id="rsvctmCttpc" name="rsvctmCttpc" value="<c:out value="${result.rsvctmCttpc}" />"></td>
                        </tr>
                        <tr>
                            <th scope="row">비용</th>
                            <td><input type="text" class="form-control" id="useCt" name="useCt" value="<c:out value="${result.useCt}" />"></td>
                        </tr>
                        <tr>
                            <th scope="row">비고</th>
                            <td><textarea id="rm" name="rm" class="form-control" style="height: 135px;"><c:out value="${result.rm}" /></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" id="rsrvStrtTm2" name="rsrvStrtTm2" value="${result.rsrvStrtTm}">
                <input type="hidden" id="rsrvEndTm2" name="rsrvEndTm2" value="${result.rsrvEndTm}">
                <input type="hidden" id="rsrvSn" name="rsrvSn" value="${result.rsrvSn}">
                <input type="hidden" name="gid" value="${result.gid}">
            </div>
	    </form:form>
        </div>

        <div class="position-bottom btn-wrap">
        	<div>
	        	<button type="button" class="btn basic bi-write2" id="fcrmUpdateBtn" data-rsrvsn='<c:out value="${result.rsrvSn}" />' data-gid='<c:out value="${result.gid}" />'>수정완료</button>
	            <button type="button" class="btn basic bi-cancel" id="faciCancelBtn" data-rsrvsn='<c:out value="${result.rsrvSn}" />' data-gid='<c:out value="${result.gid}" />'>취소</button>
        	</div>
        </div>
    </div>
