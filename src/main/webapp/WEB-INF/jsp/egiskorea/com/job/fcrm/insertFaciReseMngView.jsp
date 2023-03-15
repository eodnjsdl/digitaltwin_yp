<!-- 업무 > 시설관리 > 시설예약관리 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script src="/js/egiskorea/com/job/fcrm/fcrm.js"></script>
<script>
// 시설예약관리 등록하기 버튼
$("#faciRegistBtn").on("click", function(){
	var form = $("#insertFaciReseMngForm")[0];
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
	
	if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
		// 예약중복체크
		let dubChk = 'N';
		$.ajax({
			type : "POST",
			url  : "/job/fcrm/dubCheckFaciReseMngRegist.do",
			data : formData,
			async:false,
			processData : false,
			contentType : false,
			dataType : "json",
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
			aj_registFaciReseMng(); 
		}
	}
});

// 등록 ajax
function aj_registFaciReseMng(){
	
	var form = $("#insertFaciReseMngForm")[0];
	var formData = new FormData(form);
	
	ui.loadingBar("show");
   	$.ajax({
   		type : "POST",
   		url	 : "/job/fcrm/insertFaciReseMng.do",
   		data : formData,
		processData : false,
		contentType : false,
		dataType: "json",
		success : function(returnData, status){
			if(returnData.result == "success") {
				alert("<spring:message code="success.common.insert" />");
				aj_selectFaciReseMngList($("#tmpForm")[0]);
			} else {
				alert("<spring:message code="fail.common.insert" />");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
			
		}, 
   	});
}

var lastSrchYMDtl = "<c:out value='${faciReseMngVO.srchYM}' />";
</script>                          
    <div class="data-write-wrap">
        <div class="scroll-y">
		<form:form id="insertFaciReseMngForm" method="post">     
            <p class="cont-tit">예약시설 정보</p>
            <div class="data-default">
                <table class="data-write">
                    <colgroup>
                        <col style="width: 32%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">시설명</th>
                            <td>
                                <select name="gid" id="gid" class="form-select facilNm">
                                	<option value="">시설을 선택하세요</option>
                                	<c:forEach items="${facilNmList}" var="facilNmList" varStatus="status">
										<option value="<c:out value='${facilNmList.gid}' />">
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
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">운영시간</th>
                            <td>
                                <div class="form-row">
                                    <div class="col operStrtTime align-center">
                                    </div>
                                    <div class="col-auto form-dash">~</div>
                                    <div class="col operEndTime align-center">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">예약가능여부</th>
                            <td class="rsrvAt"></td>
                        </tr>
                        <tr>
                            <th scope="row">층(호)수</th>
                            <td class="hoCnt"></td>
                        </tr>
                        <tr>
                            <th scope="row">시설설명</th>
                            <td class="fcltyDtl"></td>
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
                            		<input type="text" class="datepicker" id="rsrvDe" name="rsrvDe">
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
                            <td><input type="text" class="form-control rsvctmInfo" id="rsvctmNm" name="rsvctmNm"></td>
                        </tr>
                        <tr>
                            <th scope="row">연락처</th>
                            <td><input type="text" class="form-control rsvctmInfo" id="rsvctmCttpc" name="rsvctmCttpc"></td>
                        </tr>
                        <tr>
                            <th scope="row">비용</th>
                            <td><input type="text" class="form-control" id="useCt" name="useCt" value="0"></td>
                        </tr>
                        <tr>
                            <th scope="row">비고</th>
                            <td><textarea id="rm" name="rm" class="form-control" style="height: 135px;"></textarea></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <form:form name="searchDtlForm" id="searchDtlForm">
            	<input type="hidden" name="srchYM" id="srchYM" value="<c:out value='${faciReseMngVO.srchYM}' />">
            	<input type="hidden" name="pageIndex" id="pageIndex" value="">
            </form:form> 
	    </form:form>
        </div>

        <div class="position-bottom btn-wrap">
            <div>
            	<button type="button" class="btn basic bi-write2" id="faciRegistBtn">등록</button> 
            	<button type="button" class="btn basic bi-cancel" id="faciListBtn">취소</button>
            </div>
        </div>
    </div>
