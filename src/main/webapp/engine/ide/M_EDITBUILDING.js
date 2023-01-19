/**
 * SUBJECT : 도시계획 -> 건물편집 객체 AUTHOR : 윤수민 COMMENT : 종료시 관련 이벤트 모두 해제되어야함.
 */

var M_EDITBUILDING = {
	/* constant */
	CONTROLLER_URL: "/digitalTwin",

	/* variables(private) */
	buildingManager: null, // API 호출 객체(JSBuildingManager)
	mapAPI: null,

	mouseState: "none", // 건물 편집 마우스 컨트롤 상태 (none, add, edit, delete)

	isLibraryInit: false, // 라이브러리 초기화
	isActive: false, // 모듈 활성화 상태
	isMouseClickDown: false, // 마우스가 지도 위에서 눌려진 상태

	/* data */
	library_isLoaded: {
		// 라이브러리 로드 상태
		F: false,
		S: false,
		U: false,
	},

	libraryInfo: {}, // 등록 라이브러리 정보
	selectLibraryInfo: null, // 선택 된 라이브러리 정보

	projectInfo: {}, // 저장 프로젝트 정보
	currentProjectInfo: null, // 로드 된 프로젝트 정보

	/* delete real3d info */
	deleteReal3dInfo: [], // 삭제한 real3d 타일 건물 정보

	/* functions */
	// 초기화
	init: function () {
//		console.log("init");

		if (this.buildingManager == null) {
			this.buildingManager = Module.GetBuildingManager();
		}

		if (this.mapAPI == null) {
			this.mapAPI = Module.getMap();
		}
		
		this.buildingManager.SetActiveLibrary(true);

		// 필요 스크립트 로드
		// if (typeof XDViewer == 'undefined') {
		// this.initReferenceScript([ {
		// src : "./assets/js/module/M_EDITBUILDING_LIB/XDViewer.js",
		// onload : function() {
		// XDViewer.canvas.style.display = "none";
		// XDViewer.resize(128, 128);
		// XDViewer.camera.zoom(3000);

		// // 디버그용 sumin 200915
		// // XDViewer.canvas.style.display = "block";
		// // document.body.append(XDViewer.canvas);
		// }
		// } ]);
		// }

		this.initLibrary();
//		this.initProject();
		this.initEvent();

		this.buildingManager.SetActiveLibrary(true);
		this.isActive = true;

		// 기본 마우스 State는 객체 선택 상태
		Module.XDSetMouseState(Module.MML_SELECT_POINT);

		// 텍스쳐 용량 상향 조정
		Module.getOption().setTexturePoolSize(2 * 1024 * 1024 * 1024); // 2GB
	},

	// 종료
	destory: function () {
		this.destoryEvent();

		this.buildingManager.SetActiveLibrary(false);
		this.isActive = false;

		Module.XDSetMouseState(6);

		// 텍스쳐 용량 기본 값으로 하향 재조정
		Module.getOption().setTexturePoolSize(512 * 1024 * 1024); // 512MB
	},

	hide: function () {
		this.setMouseState("none");
	},

	display: function () {},

	/**
	 * 이벤트
	 * *******************************************************************************
	 */
	// 마우스 Down
	onMouseDown: function (e) {
		M_EDITBUILDING.isMouseClickDown = true;
	},

	// 마우스 Move
	onMouseMove: function (e) {
		// 마우스 버튼이 눌려진 상태면(드래그 중이면)
		if (this.isMouseClickDown) {
			// 선택 된 오브젝트의 화면 상 위치를 찾는다
			var screenPosition = this.getSelectedLibraryObjectScreenPosition();
			if (screenPosition == null) {
				return;
			}

			var selectedObjectType = this.getSelectedLibraryObjectType();
			if (selectedObjectType == "real3d") {
				// Real3d 타일 객체
				this.setTileObjectOptionInterfacePosition(screenPosition.x, screenPosition.y);
			} else if (selectedObjectType == "library") {
				// 오브젝트 위에 모델 이동 인터페이스가 올라오도록 위치를 재조정한다
				this.setEditModelInterfacePosition(screenPosition.x, screenPosition.y);

				Module.XDRenderData();
			}
		}
	},

	// 마우스 Up
	onMouseUp: function (e) {
		this.isMouseClickDown = false;

		// 선택 된 오브젝트의 화면 상 위치를 찾는다
		var screenPosition = this.getSelectedLibraryObjectScreenPosition();
		
		if (screenPosition == null) {
			// 선택 된 객체가 없으면 건물 편집 인터페이스를 끈다
			document.getElementById("editModelInterface").style.display = "none";
			// document.getElementById("tileObjectOptionInterface").style.display = "none";
			return;
		} else {
			// 선택한 건물이 Real3d 타일 객체인지 건물 편집으로 추가한 객체인지 판별
			var selectedObjectType = this.getSelectedLibraryObjectType();

			if (selectedObjectType == "real3d") {
				// Real3d 타일 객체
				this.setTileObjectOptionInterfacePosition(screenPosition.x, screenPosition.y);
				// document.getElementById("tileObjectOptionInterface").style.display = "block";

				// 건물 편집 인터페이스는 끈다
				document.getElementById("editModelInterface").style.display = "none";

				this.setMouseState("edit");

				return;
			} else if (selectedObjectType == "library") {
				// 건물 편집으로 추가한 건물. 오브젝트 위에 모델 이동 인터페이스가 올라오도록 위치를 재조정한다
				this.setEditModelInterfacePosition(screenPosition.x, screenPosition.y);
				document.getElementById("editModelInterface").style.display = "block";

				// 타일 오브젝트(real3d) 인터페이스는 끈다
				// document.getElementById("tileObjectOptionInterface").style.display = "none";

				this.setMouseState("edit");

			} else {
				return;
			}
		}
	},

	// 마우스 Wheel
	onMouseWheel: function (e) {
		// 마우스 휠로 지도가 줌 인, 아웃 중일 때는 인터페이스를 숨긴다
		document.getElementById("editModelInterface").style.display = "none";
//		document.getElementById("tileObjectOptionInterface").style.display = "none";

		setTimeout(function () {
			// 선택 된 오브젝트의 화면 상 위치를 찾는다
			var screenPosition = M_EDITBUILDING.getSelectedLibraryObjectScreenPosition();
			if (screenPosition == null) {
				return;
			}

			var selectedObjectType = M_EDITBUILDING.getSelectedLibraryObjectType();

			if (selectedObjectType == "real3d") {
				M_EDITBUILDING.setTileObjectOptionInterfacePosition(screenPosition.x, screenPosition.y);
				// document.getElementById("tileObjectOptionInterface").style.display = "block";
			} else if (selectedObjectType == "library") {
				// 오브젝트 위에 모델 이동 인터페이스가 올라오도록 위치를 재조정한다
				M_EDITBUILDING.setEditModelInterfacePosition(screenPosition.x, screenPosition.y);
				document.getElementById("editModelInterface").style.display = "block";
			}
		}, 500);
	},

	// 이벤트 리셋
	initEvent: function () {
		// 인터페이스 이벤트 설정
		$("#editModelMove").mousedown(function () {
			M_EDITBUILDING.buildingManager.SetMoveOperation(true);
		});
		$("#editModelMove").mouseup(function () {
			M_EDITBUILDING.buildingManager.SetMoveOperation(false);
		});
		$("#editModelInterface").mousemove(function (e) {
			if (M_EDITBUILDING.buildingManager.GetMoveOperation()) {
				var screenPosition = M_EDITBUILDING.getSelectedLibraryObjectScreenPosition();
				M_EDITBUILDING.setEditModelInterfacePosition(screenPosition.x, screenPosition.y);
			}
		});
	},

	// 이벤트 삭제
	destoryEvent: function () {},

	/**
	 * 환경 초기화
	 * **********************************************************************************
	 */
	initReferenceScript: function (_scriptInfo) {
		for (var i = 0; i < _scriptInfo.length; i++) {
			var script = document.createElement("script");
			script.src = _scriptInfo[i].src;
			script.onload = _scriptInfo[i].onload;

			document.body.appendChild(script);
		}
	},

	/**
	 * 라이브러리 관리
	 * *******************************************************************************
	 */
	// 라이브러리 리스트 초기화
	initLibrary: function () {
		if (this.isLibraryInit) {
			return;
		}

//		this.loadLibraryList("F"); // 시설물 로드
//		this.loadLibraryList("S"); // 건물 로드
//		this.loadLibraryList("U"); // 기타 로드

		this.isLibraryInit = true;

//		this.setLibraryDisplayType("S");
	},

	// 타입 별(시설물, 건물, 사용자 모델.. 등) 라이브러리 리스트 요청
	loadLibraryList: function (_libraryType) {
		this.library_isLoaded[_libraryType] = false;

		// 요청 URL 생성
		var reqURL = this.CONTROLLER_URL;
		if (_libraryType == "U") {
			reqURL += "/moduleHelper/editBuilding/getUserModuleList.do?MID=" + D_MEMBER.MID;
		} else {
			reqURL += "/moduleHelper/editBuilding/getDefaultModuleList.do?M_TYPE=" + _libraryType;
		}

		// 라이브러리 리스트 로드
		$.ajax({
			url: reqURL,
			method: "get",
			libraryType: _libraryType,
			success: function (_data, _status, _xhr) {
				// 데이터 체크
				if (_data.lenght == 0) {
					console.log("[Error] Invalid Library List Data");
					return false;
				}

				// 기존 리스트는 모두 지운다
				var data = JSON.parse(_data);
				console.log(data);
				var libraryList = data.modelList;

				// 모든 라이브러리 선택 버튼 삭제
				document.getElementById("libraryList_" + this.libraryType).innerHTML = "";

				M_EDITBUILDING.library_isLoaded[this.libraryType] = true;
				M_EDITBUILDING.setDisplayLibraryLoadProgressCircle(this.libraryType, false);

				// 라이브러리 데이터 요청
				for (var i = 0; i < libraryList.length; i++) {
					// 라이브러리 정보 저장
					M_EDITBUILDING.libraryInfo[libraryList[i].mlid] = libraryList[i];

					// 라이브러리 선택 버튼 생성
					M_EDITBUILDING.createLibrarySelectButton(libraryList[i]);
				}
			},

			error: function (xhr, status, thrown) {
				console.log("[Error] Failed Load Library List");
			},
		});
	},

	// 라이브러리 모델 등록
	loadLibrary: function (_libraryInfo, _callback, _callbackParam) {
		var temp = "input.3ds";
		temp = temp.split(".");
		var format = temp[temp.length - 1];

		var mlid = _libraryInfo;
		
		var sort = $("#" + mlid).closest(".tab-cont").attr("id");
		var folder = "";
		
		if(sort == "edit-building1"){
			folder = "building";
		} else if(sort == "edit-building2"){
			folder = "facility";
		} else if(sort == "edit-building3"){
			folder = "etc";
		}
		
//		console.log("3ds 존재여부 : " + ("http://" + location.host + "/3ds/" + folder +"/" + mlid + ".3ds").complete);
//		console.log("3DS 존재여부 : " + ("http://" + location.host + "/3ds/" + folder +"/" + mlid + ".3DS").complete);
//		console.log("jpg 존재여부 : " + ("http://" + location.host + "/3ds/" + folder +"/" + mlid + ".jpg").complete);
//		console.log("JPG 존재여부 : " + ("http://" + location.host + "/3ds/" + folder +"/" + mlid + ".JPG").complete);
		
//		console.log("http://" + location.host + "/3ds/" + folder +"/" + mlid + ".3ds");
//		console.log("http://" + location.host + "/3ds/" + folder + "/" +mlid + ".jpg");
		
		var result = this.buildingManager.AddLibrary({
			id: mlid,
			format: format,
			modelurl: "http://" + location.host + "/3ds/" + folder +"/" + mlid + ".3ds",
			textureurl: "http://" + location.host + "/3ds/" + folder + "/" +mlid + ".jpg",
			callback: _callback,
			callbackparam: _callbackParam,
		});
		
//		console.log(this.buildingManager.AddLibrary.textureurl);
//		console.log(result);
		
/*		if (_libraryInfo.model_type == "U") {
			this.buildingManager.AddLibrary({
				id: mlid,
				format: format,
				modelurl: this.CONTROLLER_URL + "/moduleHelper/editBuilding/getUserLibraryModel.do?MLID=" + mlid + "&MID=" + D_MEMBER.MID,
				textureurl: this.CONTROLLER_URL + "/moduleHelper/editBuilding/getUserLibraryTexture.do?MLID=" + mlid + "&MID=" + D_MEMBER.MID,
				callback: _callback,
				callbackparam: _callbackParam,
			});
		} else {
			this.buildingManager.AddLibrary({
				id: mlid,
				format: format,
				modelurl: this.CONTROLLER_URL + "/moduleHelper/editBuilding/getTemplateLibraryModel.do?MLID=" + mlid + "&MID=0",
				textureurl: this.CONTROLLER_URL + "/moduleHelper/editBuilding/getTemplateLibraryTexture.do?MLID=" + mlid + "&MID=0",
				callback: _callback,
				callbackparam: _callbackParam,
			});
		}*/
	},

	openFileSelector: function () {
		var fileSelector = document.getElementById("uploadLibarayFile");
		fileSelector.click();
	},

	// 사용자 라이브러리 저장
	uploadLibrary: function (_files) {
		// 썸네일 생성
		var formData = new FormData();
		formData.append("MID", D_MEMBER.MID);
		formData.append("THUMB", "");

		// uploadLibarayFile
		for (var i = 0; i < _files.length; i++) {
			formData.append("modelFiles", _files[i]);
		}

		$.ajax({
			url: "/digitalTwin/moduleHelper/editBuilding/insertUserModel.do",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			dataType: "json",
			enctype: "multipart/form-data",
			success: function (result) {
				var newMLID = result.MLID;

				// 디스크에 파일이 올라올 때까지 잠시 대기 후 썸네일 이미지 전송
				setTimeout(function () {
					// 썸네일 생성 후 결과 base64 이미지 데이터를 콜백 함수로 수신
					M_EDITBUILDING.createLibraryThumbnail(
						M_EDITBUILDING.CONTROLLER_URL + "/moduleHelper/editBuilding/getUserLibraryModel.do?MLID=" + result.MLID.toString() + "&MID=" + D_MEMBER.MID,
						M_EDITBUILDING.CONTROLLER_URL + "/moduleHelper/editBuilding/getUserLibraryTexture.do?MLID=" + result.MLID.toString() + "&MID=" + D_MEMBER.MID,

						function (base64Thumbnail, _callbackParam) {
							// 생성한 썸네일 이미지를 컨트롤러로 전송
							M_EDITBUILDING.uploadLibraryThumbnail(_callbackParam.MLID, base64Thumbnail);
						},
						{
							MLID: newMLID,
						}
					);
				}, 5000);
			},
		});
	},

	// 라이브러리 썸네일 생성
	createLibraryThumbnail: function (_modelURL, _textureURL, _complateCallback, _callbackParam) {
		XDViewer.loadModel({
			key: "thumbnail",
			url: _modelURL,
			texture: _textureURL,
			format: "3ds",
			callback: function (_key) {
				XDViewer.renewFrame();
				_complateCallback(XDViewer.canvas.toDataURL(), _callbackParam);
				XDViewer.clearModels();
			},
		});
	},

	// 라이브러리의 썸네일 갱신
	uploadLibraryThumbnail: function (mlid, base64Thumbnail, _callback) {
		var formData = new FormData();
		formData.append("MID", D_MEMBER.MID);
		formData.append("MLID", mlid);
		formData.append("THUMB", base64Thumbnail);

		$.ajax({
			url: "/digitalTwin/moduleHelper/editBuilding/updateModelThumbnail.do",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			dataType: "json",
			enctype: "multipart/form-data",
			success: function (result) {
				// 사용자 모델 리스트 갱신
				M_EDITBUILDING.loadLibraryList("U");

				if (this.callback) {
					this.callback();
				}
			},
			callback: _callback,
		});
	},

	/* 라이브러리 로드 완료 체크 */
	checkAllTypeLibararyLoaded: function () {
		return this.library_isLoaded.F && this.library_isLoaded.S && this.library_isLoaded.U;
	},

	/**
	 * 인터페이스
	 * *******************************************************************************
	 */
	setTileObjectOptionInterfacePosition: function (_screenX, _screenY) {
		var editInterface = document.getElementById("tileObjectOptionInterface");

		// 오브젝트 화면 좌표 위치에 건물 편집 인터페이스를 올린다
		editInterface.style.left = _screenX - 26 + "px";
		editInterface.style.top = _screenY + "px";
		editInterface.style.display = "block";
	},

	setEditModelInterfacePosition: function (_screenX, _screenY) {
		var editInterface = document.getElementById("editModelInterface");

		// 오브젝트 화면 좌표 위치에 건물 편집 인터페이스를 올린다
		editInterface.style.left = _screenX - 57 + "px";
		editInterface.style.top = _screenY - 57 + 40 + "px";
		editInterface.style.display = "block";
	},

	// 라이브러리 리스트 출력 타입 설정 (S:건물, F:시설물, U:사용자모델)
	setLibraryDisplayType: function (_type) {
		// 모든 버튼 선택 비활성화
		$("#btn_library_category_S").removeClass("active");
		$("#btn_library_category_F").removeClass("active");
		$("#btn_library_category_U").removeClass("active");

		// 모든 라이브러리 컨텐츠 숨김
		$("#libraryContents_S").css("display", "none");
		$("#libraryContents_F").css("display", "none");
		$("#libraryContents_U").css("display", "none");

		// 특정 라이브러리 컨텐츠 보임, 버튼 활성화
		this.setDisplayLibraryLoadProgressCircle(_type, !this.library_isLoaded[_type]);

		$("#btn_library_category_" + _type).addClass("active");
		$("#libraryContents_" + _type).css("display", "block");

		$(".moduleEditBuildingLibrayListWrap").addClass("hide");
		$("#libraryList_" + _type).removeClass("hide");

		// 모든 서브 카테고리 버튼 disabled
		document.getElementById("library_sub_category_S").style.display = "none";
		document.getElementById("library_sub_category_F").style.display = "none";

		// 기본 라이브러리(건물, 시설물)의 경우 서브 카테고리가 있으므로 드롭박스 표시 smin 201207
		if (_type == "S" || _type == "F") {
			document.getElementById("library_sub_category_" + _type).style.display = "inline-flex";
		}
	},

	setDisplayLibraryLoadProgressCircle: function (_type, _display) {
		console.log("setDisplayLibraryLoadProgressCircle : " + _type + ", " + _display);

		// 특정 라이브러리 컨텐츠 보임, 버튼 활성화
		if (_display) {
			// 라이브러리 리스트가 로딩 중이면 로딩 중 표시
			$("#library_progressLoading_" + _type).css("display", "block");
			$("#libraryList_" + _type).css("display", "none");
		} else {
			// 라이브러리 리스트가 로드 되었으면 리스트 표시
			$("#library_progressLoading_" + _type).css("display", "none");
			$("#libraryList_" + _type).css("display", "block");
		}
	},

	// 서브 카테고리로 라이브러리 필터링 sumin 201207
	setLibraryFilterBySubCategory: function (_mainType, _subType) {
		// 큰 카테고리 노드 가져오기
		var libraryButtons = document.getElementById("libraryList_" + _mainType).childNodes;
		var libButtonLen = libraryButtons.length;
		if (!libButtonLen) {
			return;
		}

		// 모두 보기(ALL) 상태이면 모든 노드를 보도록 설정
		if (_subType == "ALL") {
			for (var i = 0; i < libButtonLen; i++) {
				libraryButtons[i].style.display = "block";
			}
		} else {
			// 특정 카테고리만 필터해서 출력하는 경우 subType이 같은 것만 출력
			for (var i = 0; i < libButtonLen; i++) {
				if (libraryButtons[i].subType == _subType) {
					libraryButtons[i].style.display = "block";
				} else {
					libraryButtons[i].style.display = "none";
				}
			}

			// 카테고리 이름 설정
			var subCategoryName = "전체";

			switch (_subType) {
				case "RES":
					subCategoryName = "주거";
					break;
				case "BRG":
					subCategoryName = "교량";
					break;
				case "MED":
					subCategoryName = "의료";
					break;
				case "EDU":
					subCategoryName = "교육";
					break;
				case "SPO":
					subCategoryName = "스포츠";
					break;
				case "BSN":
					subCategoryName = "비즈니스";
					break;
				case "ENG":
					subCategoryName = "에너지";
					break;
				case "REL":
					subCategoryName = "종교";
					break;
				case "OTH":
					subCategoryName = "기타";
					break;
				case "LAN":
					subCategoryName = "조경";
					break;
				case "TRA":
					subCategoryName = "교통";
					break;
				case "REC":
					subCategoryName = "휴양";
					break;
				default:
					return;
			}

			document.getElementById("library_sub_category_button_" + _mainType).innerHTML = subCategoryName;
		}

		// 라이브러리
		//console.log(_mainCategory + ", " + _subCategory);f
	},

	// 라이브러리 선택 버튼 추가
	createLibrarySelectButton: function (_libraryInfo) {
		var libraryListWrap = $("#libraryList_" + _libraryInfo.model_type)[0];

		// 라이브러리 선택 버튼 생성
		var libButton = document.createElement("li");

		// 버튼 이미지로 모델 썸네일 이미지 지정
		var libButtonImage = document.createElement("img");
		libButtonImage.classList.add("moduleEditBuildingLibraryListImage");

		if (_libraryInfo.thumb_base64 == null) {
			libButtonImage.src = "./assets/img/misc/empty_building_library_preview.png";
		} else {
			libButtonImage.src = _libraryInfo.thumb_base64;
		}

		// 라이브러리 버튼에 이미지 붙이고 라이브러리 리스트에 추가
		libButton.appendChild(libButtonImage);
		libButtonImage.mlid = _libraryInfo.mlid;
		libButtonImage.id = "btn_library_" + _libraryInfo.mlid;
		libButton.subType = _libraryInfo.sub_type;
		libButton.classList.add("btn_library");

		if (libraryListWrap.childNodes.length == 0) {
			libraryListWrap.appendChild(libButton);
		} else {
			libraryListWrap.insertBefore(libButton, libraryListWrap.childNodes[0]);
		}

		// 라이브러리 선택 시 실행할 기능 지정
		libButtonImage.onclick = function () {
			var selectedLibrary = $(".selectLibrary");
			for (var i = 0; i < selectedLibrary.length; i++) {
				var lib = selectedLibrary[i];
				lib.classList.remove("selectLibrary");
			}

			this.classList.add("selectLibrary");

			M_EDITBUILDING.onClickLibraryButton(this.mlid);
		};
	},

	onClickLibraryButton: function (_mlid) {
		// 선택한 건물을 추가 건물로 지정
		if (M_EDITBUILDING.buildingManager.IsExistLibraryName(_mlid.toString())) {
			M_EDITBUILDING.selectLibrary(_mlid);
		} else {
			document.body.style.cursor = "wait";

			// 라이브러리 객체가 엔진에 로드 안되었으면 로드
			M_EDITBUILDING.loadLibrary(
					_mlid,
				function (e) {
//					console.log("library load callback");
					M_EDITBUILDING.selectLibrary(_mlid);
				},
				{
					mlid: _mlid,
				}
			);
		}
	},

	// 라이브러리 미리보기 이미지 설정
	setLibraryPreview: function (_thumbnailImageSrc) {
		var preview = document.getElementById("libraryPreview");
		preview.src = _thumbnailImageSrc;
	},

	// 건물 추가 버튼 선택 활성화
	setActiveAddObjectButton: function (_active) {
		if (_active) {
			$("#addLibraryObject").addClass("active");
			$("#addLibraryObject span").html("등록완료");
		} else {
			$("#addLibraryObject").removeClass("active");
			$("#addLibraryObject span").html("건물등록");
			this.mouseState = "edit";
		}
	},

	// 건물 선택 해제
	uncheckObject: function () {
		document.getElementById("editModelInterface").style.display = "none";

		this.setMouseState("none");

		Module.getMap().clearSelectObj();
		Module.XDRenderData();
	},

	// 건물 삭제 버튼 선택 활성화
	setActiveDeleteObjectButton: function (_active) {
		if (_active) {
			$("#deleteLibraryObject").addClass("active");
		} else {
			$("#deleteLibraryObject").removeClass("active");
		}
	},

	// 프로젝트 저장 인터페이스 열기
	openProjectSaveInterface: function (_) {
		if ($("#projectSaveInterface").css("display") == "block") {
			return;
		}

		// 현재 시간으로 프로젝트 이름 자동 지정
		var date = new Date();
		document.getElementById("editBuildingProjectNameInput").value = "Project_" + date.getTime();

		// 프로젝트 리스트, 프로젝트 저장 인터페이스 스위칭
		$("#projectSaveInterface").fadeIn();
	},

	// 프로젝트 저장 인터페이스 닫기
	closeProjectSaveInterface: function () {
		if ($("#projectSaveInterface").css("display") == "none") {
			return;
		}

		// 프로젝트 리스트, 프로젝트 저장 인터페이스 스위칭
		$("#projectSaveInterface").fadeOut();
	},

	// 프로젝트 선택 버튼 추가
	createProjectSelectButton: function (_projectInfo) {
		var projectListWrap = $("#editbuildingProjectList")[0];

		// 프로젝트 선택 버튼 생성
		var projectButton = document.createElement("li");

		// 프로젝트 이름 텍스트 설정
		projectButton.innerHTML += "<i class='col-1 fa fa-home'></i>";
		projectButton.innerHTML += "<span class='col'>" + _projectInfo.project_name + "</span>";
		projectButton.innerHTML += "<button type='button' class='col-3 btn icon-btn btn-sm btn-secondary'><i class='fa fa-download'></i></button>";

		// 프로젝트 버튼 PID 지정 및 클래스 설정
		projectButton.classList.add("btn_project");
		projectButton.pid = _projectInfo.pid;

		// 프로젝트 버튼 리스트에 추가
		projectListWrap.appendChild(projectButton);

		// 프로젝트 선택 시 실행할 기능 지정
		projectButton.onclick = function () {
			// 선택한 건물을 추가 건물로 지정
			M_EDITBUILDING.loadProject(this.pid);
		};
	},

	/**
	 * 건물 편집
	 * *******************************************************************************
	 */

	selectLibrary: function (_mlid) {
		
//		console.log("오니??");
//		console.log(this.libraryInfo[_mlid]);
		// 선택한 라이브러리 정보 저장
		this.selectLibraryInfo = this.libraryInfo[_mlid];

		// 선택한 건물 이미지를 건물 미리보기 이미지로 출력
//		this.setLibraryPreview(this.selectLibraryInfo.thumb_base64);

		// 버튼 선택 상태 재설정
		this.setActiveAddObjectButton(true);

		// 마우스 모드 설정
		this.setMouseState("add");

		// 추가할 라이브러리 지정
		this.buildingManager.SelectLibrary(_mlid);
	},

	getSelectedLibraryObjectType: function () {
		var selectObjectInfo = this.buildingManager.GetSelectedLibraryObject();
		if (selectObjectInfo == "NG") {
			return "null";
		}

		var objectType = "null";

		switch (selectObjectInfo.split("#")[8]) {
			case "0":
				objectType = "library";
				break;
			case "1":
				objectType = "real3d";
				break;
			default:
				break;
		}

		return objectType;
	},

	getSelectedLibraryObjectScreenPosition: function () {
		var selectObjectInfo = this.buildingManager.GetSelectedLibraryObject();
//		console.log(selectObjectInfo);
		if (selectObjectInfo == "NG") {
			return null;
		}

		var screenPosition = selectObjectInfo.split("#")[0].split(",");

		return new Module.JSVector2D(parseInt(screenPosition[0]), parseInt(screenPosition[1]));
	},

	// 지정한 마우스 상태 on/off 전환. off 시 마우스 상태를 none으로 둔다.
	toggleMouseState: function (_mode) {
		if (this.mouseState == _mode) {
			this.setMouseState("none");
		} else {
			this.setMouseState(_mode);
		}
	},

	// 마우스 상태 설정
	setMouseState: function (_mode) {
		// 지도 내 모델 추가, 삭제 버튼 비활성화 상태로 리셋
		switch (_mode) {
			// 라이브러리에서 선택한 건물을 지도에 추가하는 모드
			case "add":
				this.buildingManager.SetLibraryStatus(2);
				this.setActiveAddObjectButton(true);
				this.setActiveDeleteObjectButton(false);

				document.body.style.cursor = "copy";

				break;

			case "edit":
				// 마우스 상태를 건물 편집 상태로 바꾸고 건물 편집 오브젝트 활성화
				this.buildingManager.SetLibraryStatus(3);
				this.buildingManager.SetEditObject(true);

				this.setActiveAddObjectButton(false);
				this.setActiveDeleteObjectButton(false);

				document.body.style.cursor = "default";

				break;

			case "delete":
				this.buildingManager.SetLibraryStatus(1);
				this.setActiveAddObjectButton(false);
				this.setActiveDeleteObjectButton(true);

				document.body.style.cursor = "no-drop";

				break;

			case "none":
				this.buildingManager.SetLibraryStatus(0);

				this.setActiveAddObjectButton(false);
				this.setActiveDeleteObjectButton(false);

				document.body.style.cursor = "default";

				return;

			default:
				return;
		}

		this.mouseState = _mode;
	},

	// 건물 높이 설정
	modifyObjectHeight: function (_amount) {
		this.buildingManager.EditObjectScaleZ(_amount);
	},

	// 건물 횡 방향 스케일 설정 sumin 201113
	modifyObjectWideScale: function (_amount) {
		this.buildingManager.EditObjectScaleX(_amount);
		this.buildingManager.EditObjectScaleY(_amount);
	},

	// 건물 방향 설정
	setObjectDirection: function (_angle) {
		// 선택 된 라이브러리 오브젝트 받아오기
		var editLibraryObject = this.buildingManager.GetEditObject();
		editLibraryObject.setDirection(parseFloat(_angle));
		Module.XDRenderData();

		// 건물 방향 출력 값 갱신
		document.getElementById("editModelDirectionText").innerHTML = _angle + "(º)";
	},

	/* 라이브러리 오브젝트 삭제 */
	deleteObject: function () {
		M_EDITBUILDING.buildingManager.DeleteSelectedObject();
		document.getElementById("editModelInterface").style.display = "none";
	},

	/**
	 * 프로젝트
	 * *******************************************************************************
	 */
	// 프로젝트 기능 및 인터페이스 초기화
	initProject: function () {
		this.loadProjectList();
	},

	// 프로젝트 리스트 로드
	loadProjectList: function () {
		// 프로젝트 리스트 URL
		var reqURL = this.CONTROLLER_URL + "/moduleHelper/editBuilding/getProjectList.do?MID=" + D_MEMBER.MID;

		$.ajax({
			url: reqURL,
			method: "get",
			dataType: "json",
			success: function (_data, _status, _xhr) {
				// 프로젝트 리스트 클리어
				document.getElementById("editbuildingProjectList").innerHTML = "";

				var projectList = _data.projectList;

				for (var i = 0; i < projectList.length; i++) {
					// 프로젝트 로드 버튼 추가
					M_EDITBUILDING.createProjectSelectButton(projectList[i]);

					// 프로젝트 정보 저장
					M_EDITBUILDING.projectInfo[projectList[i].pid] = projectList[i];
				}
			},
			error: function (xhr, status, thrown) {
				console.log("[Error] Failed Load Project List");
			},
		});
	},

	// 프로젝트 데이터 로드
	loadProject: function (pid) {
		console.log("loadProject : " + pid);

		// 프로젝트 데이터
		var projectInfo = this.projectInfo[pid];
		if (typeof projectInfo == "undefined") {
			return;
		}

		// 프로젝트 로드
		var projectContent = projectInfo.project_content;
		if (typeof projectContent == "undefined") {
			return;
		}

		// 이미 로드 된 프로젝트가 있으면 프로젝트 로드 전으로 초기화
		if (this.currentProjectInfo != null) {
			// 기존 추가 된 라이브러리 오브젝트 클리어
			this.buildingManager.ClearLibraryObject();

			// 기존 삭제 처리한 real3d 건물들 다시 복원
			var layerList = new Module.JSLayerList(false);
			for (var i = 0; i < this.currentProjectInfo.DELETE.length; i++) {
				// 건물 레이어 정보 반환 후 건물이 보이거나 다시 로드되지 않도록 설정
				var layer = layerList.nameAtLayer(this.currentProjectInfo.DELETE[i].layerName);
				if (layer == null) {
					return;
				}

				layer.SetDefineVisibleByFileName(this.currentProjectInfo.DELETE[i].xdoName, 2, true);
			}
		}

		// 프로젝트 데이터 파싱 정보 파싱
		var projectContent = JSON.parse(projectContent);

		// 추가 된 건물 리스트
		var libraryObjects = projectContent.ADD;

		// 라이브러리 오브젝트 추가
		for (var i = 0; i < libraryObjects.length; i++) {
			var libraryObjectInfo = libraryObjects[i];

			// 선택한 건물을 추가 건물로 지정
			if (this.buildingManager.IsExistLibraryName(libraryObjectInfo.MLID)) {
				this.buildingManager.AddLibraryObject({
					position: new Module.JSVector3D(libraryObjectInfo.LONGITUDE, libraryObjectInfo.LATITUDE, libraryObjectInfo.ALTITUDE),
					library_name: libraryObjectInfo.MLID,
					object_key: i.toString(),
					scale: new Module.JSSize3D(libraryObjectInfo.SCALE_WIDTH, libraryObjectInfo.SCALE_HEIGHT, libraryObjectInfo.SCALE_DEPTH),
					direction: libraryObjectInfo.DIRECTION,
				});
			} else {
				// 라이브러리 객체가 엔진에 로드 안되었으면 로드
				this.loadLibrary(
					this.libraryInfo[libraryObjectInfo.MLID],
					function (e) {
						M_EDITBUILDING.buildingManager.AddLibraryObject({
							position: new Module.JSVector3D(e.LONGITUDE, e.LATITUDE, e.ALTITUDE),
							library_name: e.MLID,
							object_key: i.toString(),
							scale: new Module.JSSize3D(e.SCALE_WIDTH, e.SCALE_HEIGHT, e.SCALE_DEPTH),
							direction: e.DIRECTION,
						});
					},
					libraryObjects[i]
				);
			}
		}

		// 삭제 타일 건물 숨김 처리
		if (projectContent.DELETE) {
			var layerList = new Module.JSLayerList(false);
			for (var i = 0; i < projectContent.DELETE.length; i++) {
				// 건물 레이어 정보 반환 후 건물이 보이거나 다시 로드되지 않도록 설정
				var layer = layerList.nameAtLayer(projectContent.DELETE[i].layerName);
				if (layer == null) {
					return;
				}

				layer.SetDefineVisibleByFileName(projectContent.DELETE[i].xdoName, 2, false);
			}
		}

		this.currentProjectInfo = projectContent;

		Module.XDRenderData();
	},

	// 프로젝트 데이터를 컨트롤러로 전송, 저장
	uploadProject: function () {
		var projectData = {};

		// 라이브러리 오브젝트 배치 데이터 가져오기
		projectData.ADD = this.getLibraryObjectAddInformation();
		projectData.DELETE = this.deleteReal3dInfo;

		// 프로젝트 저장 인터페이스 닫기
		this.closeProjectSaveInterface();

		// 프로젝트 저장
		var formData = new FormData();
		formData.append("PROJECT_JSON", JSON.stringify(projectData));
		formData.append("MID", D_MEMBER.MID.toString());

		var projectCenter = this.getProjectCenterPosition();
		formData.append("MOVE_LON", 0.0);
		formData.append("MOVE_LAT", 0.0);
		formData.append("MOVE_ALT", 0.0);

		formData.append("PROJECT_NAME", document.getElementById("editBuildingProjectNameInput").value);
		formData.append("THUMB", this.getProjectThumbnail());

		$.ajax({
			url: "/digitalTwin/moduleHelper/editBuilding/insertEditBuildingProject.do",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			dataType: "json",
			enctype: "multipart/form-data",
			success: function (result) {
				M_EDITBUILDING.loadProjectList();
			},
			error: function (xhr, status, thrown) {
				console.log("[Error] Failed Upload Project");
			},
		});
	},

	// 추가 된 건물 정보 반환
	getLibraryObjectAddInformation: function () {
		var libraryObjects = [];
		var objectCount = this.buildingManager.GetObjectCount();

		for (var i = 0; i < objectCount; i++) {
			var libraryObject = this.buildingManager.IndexAtObject(i);

			var libraryObjectData = {
				MLID: libraryObject.getLibraryName(),
			};

			// position
			var position = libraryObject.getPosition();
			libraryObjectData.LONGITUDE = position.Longitude;
			libraryObjectData.LATITUDE = position.Latitude;
			libraryObjectData.ALTITUDE = position.Altitude;
			libraryObjectData.DIRECTION = libraryObject.getDirection();

			// scale
			var scale = libraryObject.getScale();
			libraryObjectData.SCALE_WIDTH = scale.width;
			libraryObjectData.SCALE_HEIGHT = scale.height;
			libraryObjectData.SCALE_DEPTH = scale.depth;

			libraryObjects.push(libraryObjectData);
		}

		return libraryObjects;
	},

	// 추가 된 건물 정보 반환
	getProjectCenterPosition: function () {
		var libraryObjects = [];
		var objectCount = this.buildingManager.GetObjectCount();

		// 모든 추가 된 건물의 위치 평균 값을 구한다
		var totalPosition_lon = 0.0;
		var totalPosition_lat = 0.0;
		var totalPosition_alt = 0.0;

		for (var i = 0; i < objectCount; i++) {
			var libraryObject = this.buildingManager.IndexAtObject(i);

			var position = libraryObject.getPosition();

			totalPosition_lon += position.Longitude;
			totalPosition_lat += position.Latitude;
			totalPosition_alt += position.Altitude;
		}

		return {
			longitude: totalPosition_lon / objectCount,
			latitude: totalPosition_lat / objectCount,
			altitude: totalPosition_alt / objectCount,
		};
	},

	// 현재 이미지를 프로젝트 썸네일 이미지로 저장
	getProjectThumbnail: function () {
		return "TEST";
	},

	// 현재 배치 된 건물들을 하나의 3ds 통으로 저장
	downloadProjectFile: function () {
		// this.buildingManager.exportAllLibraryObjectsAsFormatData();
	},

	/**
	 * 타일 건물 제어
	 * *******************************************************************************
	 */

	// 타일 로드 된 건물 오브젝트 삭제
	deleteReal3dObject: function () {
		// 삭제 대상 건물 정보 반환
		var selectObjectInfo = this.buildingManager.GetSelectedLibraryObject();
		if (selectObjectInfo == "NG") {
			return;
		}

		selectObjectInfo = selectObjectInfo.split("#");
		if (selectObjectInfo[8] != "1") {
			// real3d('1'), library('0')
			return;
		}

		// 건물 레이어 정보 반환 후 건물이 보이거나 다시 로드되지 않도록 설정
		var layerList = new Module.JSLayerList(false);
		var layer = layerList.nameAtLayer(selectObjectInfo[1]);
		if (layer == null) {
			return;
		}

		layer.SetDefineVisibleByFileName(selectObjectInfo[2], 2, false);
		this.mapAPI.clearSelectObj();

		// 삭제 건물 등록
		this.deleteReal3dInfo.push({
			layerName: selectObjectInfo[1],
			xdoName: selectObjectInfo[2],
		});

		// 타일 건물 버튼 인터페이스 닫기
		document.getElementById("tileObjectOptionInterface").style.display = "none";
	},

	// Real3d 건물을 라이브러리로 등록
	uploadReal3dObjectAsLibrary: function () {
		this.setLibraryDisplayType("U");
		// document.getElementById("library_progressLoading").style.display = "block";
		// document.getElementById("libraryList_Contents").style.display = "none";

		this.library_isLoaded.U = false;

		// 건물 선택 정보 반환
		var selectObjectInfo = this.buildingManager.GetSelectedLibraryObject();
		if (selectObjectInfo == "NG") {
			return;
		}

		selectObjectInfo = selectObjectInfo.split("#");
		if (selectObjectInfo[8] != "1") {
			// real3d('1'), library('0')
			return;
		}

		// real3d 건물 데이터를 3ds로 변환해 받아오기
		var layerList = new Module.JSLayerList(false);
		var layer = layerList.nameAtLayer(selectObjectInfo[1]);
		if (layer == null) {
			return;
		}

		var real3dTo3dsData = layer.GetReal3DFormatData(selectObjectInfo[9], "3ds");
		if (real3dTo3dsData == null) {
			return;
		}

		// XDServer로부터 텍스쳐 이미지 받아오기
		var textureRequestURL = selectObjectInfo[11] + "/requestLayerObject?Layer=" + selectObjectInfo[1];
		textureRequestURL += "&Level=" + selectObjectInfo[4];
		textureRequestURL += "&IDX=" + selectObjectInfo[6];
		textureRequestURL += "&IDY=" + selectObjectInfo[7];
		textureRequestURL += "&DataFile=" + selectObjectInfo[10];
		textureRequestURL += "&APIKey=767B7ADF-10BA-3D86-AB7E-02816B5B92E9";

		$.ajax({
			url: textureRequestURL,
			type: "GET",
			modelData: real3dTo3dsData,
			modelFormat: "3ds",
			imageFormat: selectObjectInfo[10].split(".")[1],
			xhrFields: {
				responseType: "blob",
			},
			success: function (_imageData) {
				// 엔진에서 출력한 3ds 건물 데이터 wrapping
				var modelBlob = new Blob([this.modelData], {
					type: "application/octet-stream",
				});

				var formData = new FormData();
				formData.append("MID", D_MEMBER.MID);
				formData.append("MODEL_DATA", new File([modelBlob], "name"));
				formData.append("MODEL_FORMAT", this.modelFormat);
				formData.append("TEXTURE_IMAGE", new File([_imageData], "name"));
				formData.append("TEXTIRE_FORMAT", this.imageFormat);

				// 라이브러리로 저장
				$.ajax({
					url: "/digitalTwin/moduleHelper/editBuilding/insertUserModelForBinary.do",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					dataType: "json",
					enctype: "multipart/form-data",
					success: function (result) {
						var newMLID = result.MLID;

						// 디스크에 파일이 올라올 때까지 잠시 대기 후 썸네일 이미지 전송
						setTimeout(function () {
							// 썸네일 생성 후 결과 base64 이미지 데이터를 콜백 함수로 수신
							M_EDITBUILDING.createLibraryThumbnail(
								M_EDITBUILDING.CONTROLLER_URL + "/moduleHelper/editBuilding/getUserLibraryModel.do?MLID=" + result.MLID.toString() + "&MID=" + D_MEMBER.MID,
								M_EDITBUILDING.CONTROLLER_URL + "/moduleHelper/editBuilding/getUserLibraryTexture.do?MLID=" + result.MLID.toString() + "&MID=" + D_MEMBER.MID,
								function (base64Thumbnail, _callbackParam) {
									// 생성한 썸네일 이미지를 컨트롤러로 전송
									M_EDITBUILDING.uploadLibraryThumbnail(_callbackParam.MLID, base64Thumbnail, function () {
										// 라이브러리 갱신 완료 체크
										M_EDITBUILDING.library_isLoaded.U = true;

										// 프로그레스 링은 숨기고 라이브러리 리스트 보임
										if (M_EDITBUILDING.checkAllTypeLibararyLoaded()) {
											// document.getElementById("library_progressLoading").style.display = "none";
											// document.getElementById("libraryList_Contents").style.display = "block";
										}
									});
								},
								{
									MLID: newMLID,
								}
							);
						}, 5000);
					},
				});
			},
			error: function (xhr, status, thrown) {
				console.log("[Error] Failed Upload Library");
			},
		});
	},

	// 오브젝트 해발고도 표시 sumin 201207
	setDisplayAltitude: function (_display) {
		this.buildingManager.SetDisplayObjectTextPOI(_display);
		Module.XDRenderData();
	},
};
