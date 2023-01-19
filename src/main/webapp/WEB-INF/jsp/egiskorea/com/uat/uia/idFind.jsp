<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
			<script>
				$(document).ready(function(){
					$("#selidEmail").change(function(){
						$("#idEmail").val($(this).val());
					})
					
					$('.find-result-box').addClass("hide");
					$('.bi-check').addClass("hide");
				});
				
				// 아이디 찾기
				function aj_selectId() {
					
					var name = $('#name').val();
					var idEmailId = $('#idEmailId').val();
					var idEmail = $('#idEmail').val();
					var email = idEmailId + "@" + idEmail;
					
					if(name == null || name == "") {
						alert("이름을 입력하세요.");
						$('#name').focus();
						return;
					} else if(idEmailId == null || idEmailId == "" || idEmail == null || idEmail == "") {
						alert("이메일을 입력하세요.");
						
						if(idEmailId == null || idEmailId == "") {
							$('#idEmailId').focus();
						} else {
							$('#idEmail').focus();
						}
						return;
					} 
					
					$.ajax({
						type : "POST",
						url : "/uat/uia/selectIdFind.do",
						data : {
							"name" : name,
							"email" : email
						},
						dataType : "json",
						async: false,
						success : function(returnData, status){
							
							$('.bi-cancel').addClass("hide");
							$('.find-result-box').removeClass("hide");
							$('.bi-check').removeClass("hide");
							
							if(returnData.result == "success") {
								$('.id-result').removeClass("essential");
								$('.id-result').html("<span>" + returnData.resultInfo + "</span>");
							} else if (returnData.result == "fail"){
								$('.id-result').addClass("essential");
								$('.id-result').html("검색하신 정보와 매칭되는 사용자가 없습니다!");
							} 
						}
					});
				}
				
				//팝업창 button event
				$('.bi-cancel, .bi-check').on("click", function() {
					$('#dialog-findId').dialog('close');
				}); 
				
			</script>
	
			<p class="cont-txt">등록된 사용자 정보를 입력해 주세요</p>
			<div class="login-default">
				<table>
					<colgroup>
						<col style="width: 15%;">
						<col style="width: auto;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">이름</th>
							<td>
								<div class="form-row">
									<div class="col-4"><input type="text" id="name" class="form-control"></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">이메일</th>
							<td>
								<div class="form-row">
									<div class="col-4"><input type="text" class="form-control" id="idEmailId"></div>
									<div class="col-auto">@</div>
									<div class="col"><input type="text" class="form-control" id="idEmail"></div>
									<div class="col-auto">
										<select name="" id="selidEmail" class="form-select">
											<option value="">직접 입력</option>
											<option value="korea.kr">korea.kr</option>
											<option value="lx.or.kr">lx.or.kr</option>
											<option value="gmail.com">gmail.com</option>
											<option value="naver.com">naver.com</option>
										</select>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="btn-wrap"><div><button type="button" class="btn type01 find" onclick="aj_selectId();">찾기</button></div></div>

			<div class="find-result-box">
				<p class="tit">찾기 결과</p>
				<p class="result-txt id-result"><span></span></p>
				<!-- <p class="result-txt essential">검색하신 정보와 매칭되는 사용자가 없습니다!</p> -->
			</div>
			<div class="btn-wrap">
				<div>
				<button type="button" class="btn basic bi-cancel">취소</button> 
				<button type="button" class="btn basic bi-check">확인</button>
				</div>
			</div>
		<!-- //아이디 찾기 -->
			