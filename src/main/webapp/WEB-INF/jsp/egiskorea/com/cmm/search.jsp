<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
						<div class="lnb-header"><h2 class="tit">검색</h2></div>
						<div class="lnb-body">
							<div class="tabBoxDepth1-wrap">
								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="searchTotal" class="on"><button type="button" class="inner-tab">명칭검색</button></li>
										<li data-tab="searchAddr"><button type="button" class="inner-tab">주소검색</button></li>
										<li data-tab="searchArea"><button type="button" class="inner-tab">공간검색</button></li>
									</ul>
								</div>
								<!-- 통합검색 -->
								<div class="tab-cont searchTotal on">
									<div class="srch-box">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control total-keyword " name="nm" id="nm" placeholder="검색어를 입력해 주세요."></div>
											<div class="col-auto"><button type="button" class="btn type01 search total-search">검색</button></div>
										</div>
									</div>

									<div class="bbs-top">
										<div class="bbs-list-num">조회결과 : <strong>0</strong>건</div>
										<div><button type="button" class="btn basic bi-excel">엑셀저장</button></div>
									</div>
									
                                    <form id="excel_form" name="excel_form" method="post" style="display:none;">
                                        <input type="hidden" class="hidden-total-keyword" name="nm" />
                                    </form>
									<div class="search-empty" style="display: none;"><p class="text">검색 결과가 없습니다.</p></div>
									<div class="searchResult-wrap" style="height: 560px;">
										<div class="scroll-y">
											<ul class="search-list">
												<li class="noData"><div class="items search"><p class="text">검색어를 입력해주세요</p></div></li><!-- items = 검색 전 : search / 데이터 없을 시 : data -->
<%--											 <li><a href="javascript:void(0);">--%>
<%--														<p class="name">양평영업소</p>--%>
<%--														<p class="addr road"><span class="cate">도로명</span>경강로 1401</p>--%>
<%--														<p class="addr jibun"><span class="cate">지번</span>아산리 569</p>--%>
<%--													</a>--%>
<%--												</li>--%>
											</ul>
										</div>

										<div class="pagination">
										</div>
									</div>

								</div>


								<!-- 주소검색 -->
								<div class="tab-cont searchAddr">
									<div class="tabBoxDepth2-wrap">
										<div class="tabBoxDepth2">
											<ul>
												<li data-tab="addrSearchJibun" class="on"><button type="button" class="inner-tab">지번주소</button></li>
												<li data-tab="addrSearchRoad"><button type="button" class="inner-tab">도로명주소</button></li>
											</ul>
										</div>
										<div class="tab-cont addrSearchJibun on">
											<div class="form-row">
												<div class="col-6">
													<select class="form-select search-address-emd">
													</select>
												</div>
												<div class="col-6">
													<select class="form-select search-address-li">
													</select>
												</div>
											</div>
											<div class="form-row">
												<div class="col-auto">
													<span class="form-checkbox text">
														<span><input type="checkbox" id="search-address-mntn" class="search-address-mntn"><label for="search-address-mntn">산</label></span>
													</span>
												</div>
												<div class="col"><input type="text" class="form-control search-address-mnnm"></div>
												<div class="col-auto">-</div>
												<div class="col"><input type="text" class="form-control search-address-slno"></div>
											</div>
											<div class="btn-wrap marT10">
												<div><button type="button" class="btn type01 search search-address-search">검색</button></div>
											</div>
										</div>
										<div class="tab-cont addrSearchRoad">
											<div class="form-row">
												<div class="col-6">
													<select class="form-select search-road-emd">
													</select>
												</div>
												<div class="col-6">
													<select class="form-select search-road-rn">
													</select>
												</div>
											</div>
											<div class="form-row">
												<div class="col"><input type="text" class="form-control search-road-mnnm"></div>
												<div class="col-auto">-</div>
												<div class="col"><input type="text" class="form-control search-road-slno"></div>
											</div>
											<div class="btn-wrap marT10">
												<div><button type="button" class="btn type01 search search-road-search">검색</button></div>
											</div>
										</div>
									</div>

									<div class="bbs-top">
										<div class="bbs-list-num">조회결과 : <strong>0</strong>건</div>
									</div>

									<div class="search-empty" style="display: none;"><p class="text">검색 결과가 없습니다.</p></div>

									<div class="searchResult-wrap" style="height: 479px;">
										<div class="scroll-y">
											<ul class="search-list">
											</ul>
										</div>

										<div class="pagination">
										</div>
									</div>
								</div>
								<!-- //주소검색 -->

								<!-- 공간검색 -->
								<div class="tab-cont searchArea">
									<div class="tabBoxDepth2-wrap">
										<div class="tabBoxDepth2">
											<ul>
												<li data-tab="areaSearchArea" class="on"><button type="button" class="inner-tab">영역기준</button></li>
												<li data-tab="addrSearchfacility"><button type="button" class="inner-tab">시설물 기준</button></li>
											</ul>
										</div>
										<div class="tab-cont areaSearchArea on">
											<div class="srch-default">
												<table class="srch-tbl">
													<colgroup>
														<col style="width: 20%;">
														<col style="width: auto;">
													</colgroup>
													<tbody>
														<tr>
															<th scope="row">검색대상</th>
															<td>
																<select name="area-search-target" class="form-select">
																</select>
															</td>
														</tr>
														<tr>
															<th scope="row">검색영역 지정</th>
															<td>
																<div class="space-search-group">
																	<div class="space-search-items">
																		<span class="form-radio text group">
																			<span><input type="radio" name="rad-search-area" id="rad-search-area-extent" value="extent" checked="checked"><label for="rad-search-area-extent">현재화면영역</label></span>
																			<span><input type="radio" name="rad-search-area" id="rad-search-area-custom" value="custom" ><label for="rad-search-area-custom">사용자 정의</label></span>
																		</span>
																	</div>
																	<div class="space-search-items space-search-area">
																		<span class="drawing-obj small">
																			<span><input type="radio" name="rad-search-drawing" id="rad-search-drawing-point" value="1" checked="checked"><label for="rad-search-drawing-point" class="obj-sm01"></label></span>
																			<span><input type="radio" name="rad-search-drawing" id="rad-search-drawing-linestring" value="2"><label for="rad-search-drawing-linestring" class="obj-sm02"></label></span>
																			<span><input type="radio" name="rad-search-drawing" id="rad-search-drawing-box" value="3"><label for="rad-search-drawing-box" class="obj-sm03"></label></span>
																			<span><input type="radio" name="rad-search-drawing" id="rad-search-drawing-circle" value="4"><label for="rad-search-drawing-circle" class="obj-sm04"></label></span>
																		</span>
																	</div>
																	<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center area-search-buffer" placeholder="0" value="0" /> <sub>m</sub></span> 이내 범위</div>
																</div>																
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div class="btn-wrap">
												<div><button type="button" class="btn type01 search">검색</button></div>
											</div>
										</div>
										<div class="tab-cont addrSearchfacility">											
											<div class="srch-default">
												<table class="srch-tbl">
													<colgroup>
														<col style="width: 20%;">
														<col style="width: auto;">
													</colgroup>
													<tbody>
														<tr>
															<th scope="row">검색대상</th>
															<td>
																<select name="facility-search-target" class="form-select">
																</select>
															</td>
														</tr>
														<tr>
															<th scope="row">기준</th>
															<td>
																<div class="space-search-group">
																	<div class="space-search-items form-row">
																		<div class="col">
																			<select name="standard-search-target" class="form-select">
																			</select>
																		</div> 
																		<div class="col-auto"><button type="button" class="btn btn-xsm type06 btn-select-map">선택</button></div>
																	</div>
																	<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center facility-search-buffer" placeholder="0" value="0"> <sub>m</sub></span> 이내 범위</div>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div class="btn-wrap">
												<div><button type="button" class="btn type01 search">검색</button></div>
											</div>
										</div>
									</div>

									<div class="bbs-top">
										<div class="bbs-list-num">조회결과 : <strong>0</strong>건</div>
									</div>

									<div class="search-empty" style="display: none;height: 379px;"><p class="text">검색 결과가 없습니다.</p></div>

									<div class="searchResult-wrap" style="height: 379px;">
										<div class="scroll-y">
											<ul class="search-list type01"></ul>
										</div>

										<div class="pagination">
										</div>
									</div>

								</div>
								<!-- //공간검색 -->
							</div>
						</div>
						<div class="lnb-util"><button type="button" class="manualBtn" title="도움말"></button> <button type="button" class="lnb-resetBtn" title="초기화"></button><button type="button" class="lnb-close" title="닫기"></button></div>
						<script>
							$(document).ready(function(){
								$(".searchResult-wrap .search-list a").click(function(){
									$(this).parent().addClass("active").siblings().removeClass("active");
								});

								$(".searchArea .tabBoxDepth2 .inner-tab").click(function(){
									if( $("li[data-tab='addrSearchfacility']").hasClass("on") ){
										$(".searchArea .searchResult-wrap").css({'height': '416px'});
										$(".searchArea .search-empty").css({'height': '416px'});
									} else {
										$(".searchArea .searchResult-wrap").css({'height': '379px'});
										$(".searchArea .search-empty").css({'height': '379px'});
									}
								});
							});
						</script>