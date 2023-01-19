<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
    
				<!-- side -->
				<section id="side">
					<h2 class="hide">주메뉴</h2>
					<ul id="gnb" class="gnb-dep1">
						<li><a href="javascript:void(0);" class="gnb-dep1-tit">사용자 관리</a>
							<ul class="gnb-dep2">
								<li><a href="<c:url value='/com/mngr/usr/selectGroupManageList.do' />">그룹정보</a></li>
								<li><a href="<c:url value='/com/mngr/usr/selectDeptManageList.do' />">조직정보</a></li>
								<li><a href="<c:url value='/com/mngr/usr/selectUserManageList.do' />">사용자정보</a></li>
							</ul>
						</li>
						<li><a href="javascript:void(0);" class="gnb-dep1-tit">권한 관리</a>
							<ul class="gnb-dep2">
								<li><a href="<c:url value='/com/mngr/auth/selectRoleManageList.do' />">기능정보</a></li>
								<li><a href="<c:url value='/com/mngr/auth/selectAuthorManageList.do' />">권한정보</a></li>
								<li><a href="<c:url value='/com/mngr/auth/selectUserAuthorManageList.do' />">사용자권한</a></li>
							</ul>
						</li>
						<li><a href="javascript:void(0);" class="gnb-dep1-tit">이력관리</a>
							<ul class="gnb-dep2">
								<li><a href="<c:url value='/com/mngr/hist/selectConnectionHistoryList.do' />">접속이력 조회</a></li>
								<li><a href="<c:url value='/com/mngr/hist/selectUseHistoryList.do' />">사용이력 조회</a></li>
							</ul>
						</li>
						<li><a href="javascript:void(0);" class="gnb-dep1-tit">정보관리</a>
							<ul class="gnb-dep2">
								<li><a href="<c:url value='/com/mngr/info/selectCcmCmmnClCodeManageList.do' />">공통분류코드 관리</a></li>
								<li><a href="<c:url value='/com/mngr/info/selectCcmCmmnCodeManageList.do' />">공통코드 관리</a></li>
								<li><a href="<c:url value='/com/mngr/info/selectCcmCmmnDetailCodeManageList.do' />">공통상세코드 관리</a></li>
								<li><a href="<c:url value='/com/mngr/info/selectTMapManageList.do' />">주제도 관리</a></li>
								<li><a href="<c:url value='/com/mngr/info/selectLayerManageList.do' />">레이어 관리</a></li>
								<li><a href="<c:url value='/com/mngr/info/selectArticleManageList.do' />">공지사항 관리</a></li>
								<li><a href="<c:url value='/com/mngr/info/selectQnaManageList.do' />">Q&A답변 관리</a></li>
								<li><a href="<c:url value='/com/mngr/info/selectBBSManageList.do' />">게시판 관리</a></li>
								<li><a href="<c:url value='/com/mngr/info/selectOpQnaManageList.do' />">운영지원 관리</a></li>
							</ul>
						</li>
						<li><a href="javascript:void(0);" class="gnb-dep1-tit">서버관리</a>
							<ul class="gnb-dep2">
								<li><a href="<c:url value='/com/mngr/sver/selectMapServiceManageList.do' />">지도서비스관리</a></li>
								<li><a href="<c:url value='/com/mngr/sver/selectCloudServiceList.do' />">클라우드 기반 서버관리</a></li>
							</ul>
						</li>
						<li><a href="guide.html" class="gnb-dep1-tit">가이드</a></li>
					</ul>
				</section>
				<!-- //side -->