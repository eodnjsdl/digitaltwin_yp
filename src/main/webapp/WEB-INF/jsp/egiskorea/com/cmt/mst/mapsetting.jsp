<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="lnb-setting lnb-cont">
	<div class="lnb-header"><h2 class="tit">설정</h2></div>
	<div class="lnb-body">
		<div class="scroll-y">
			<ul class="setting-list">
				<li><span class="cont-tit">수직폴리곤</span> <button type="button" class="setting-toggle close" title="접기"></button>
					<div class="box3">
						<div class="tbl-list vertical-tbl">
							<div class="items">
								<div class="term">두께</div>
								<div class="desc">
									<div class="slider-box">
										<div class="slider"><div class="slider-handle"></div></div>
										<input type="text" class="value-num" readonly>
									</div>
								</div>
							</div>
							<div class="items">
								<div class="term">색상</div>
								<div class="desc"><input type="text" class="colorPicker"></div>
								<script>
									$('.colorPicker').minicolors({
										control:'hue',
										defaultValue:'rgba(255, 0, 0)',
										format:'rgb',
										theme: 'default',
										opacity: false,
										swatches: []
									});
								</script>
							</div>
						</div>
					</div>
				</li>
				<li><span class="cont-tit">지형투명도</span> <button type="button" class="setting-toggle close" title="접기"></button>
					<div class="box3">
						<div class="tbl-list vertical-tbl">
							<div class="items">
								<div class="term">투명도</div>
								<div class="desc">
									<div class="slider-box">
										<div class="slider"><div class="slider-handle"></div></div>
										<input type="text" class="value-num" readonly>
									</div>
								</div>
							</div>
						</div>
						<p class="ex-text">*지하시설물 가시화시 지형투명도를 설정</p>
					</div>
				</li>
				<li><span class="cont-tit">영상품질</span> <button type="button" class="setting-toggle close" title="접기"></button>
					<div class="box3">
						<div class="tbl-list vertical-tbl">
							<div class="items">
								<div class="term">레벨</div>
								<div class="desc">
									<div class="slider-box">
										<div class="slider"><div class="slider-handle"></div></div>
										<input type="text" class="value-num" readonly>
									</div>
								</div>
							</div>
						</div>
						<p class="ex-text">*드론영상 가시화시 영상품질 설정</p>
					</div>
				</li>
			</ul>
		</div>
				
		
		<script>
			$(function(){
				$(".slider-box .slider-handle").slider({
					range: "min",
					min: 0,
					max: 100,
					value: 20,
					step: 10,
					slide: function(event, ui){
						$(".slider-box .value-num").val(ui.value);
					}
				});
				$(".slider-box .value-num").val( $(".slider-box .slider-handle").slider("value"));
			});
		</script>
	</div>
	<div class="lnb-util"><button type="button" class="popup-close" title="닫기"></button></div>
				
	<script>
		$(document).ready(function(){

			$(".setting-list .setting-toggle").click(function(){
				$(this).find(".open").removeClass("open").addClass("close");

				if( $(this).hasClass("close") ){
					$(this).removeClass("close").addClass("open").attr("title","펼치기");
					$(this).next(".box3").slideUp(200);

				}else if( $(this).hasClass("open")){
					$(this).removeClass("open").addClass("close").attr("title","접기");
					$(this).next(".box3").slideDown(200);
				}
			});
			
			// $("#setting-close").click(function(){
			// 	($(this).parent().parent().parent()).stop().fadeOut(100);
			// 	$(".ctrl-btn").removeClass("active");
			// });
		});
	</script>
</div>