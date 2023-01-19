

/**
 * 양평 지도
 */
class YMap {
  /**
   * 지도 생성
   * @param {String|Element} target 타겟 Element
   * @param {ol.View} view 뷰
   * @param {string} baro2mapKey 바로e맵 KEYKEY
   * @param {string} mapBgType 배경지도 종류 (emap, air) -플랫폼개발부문 DT솔루션 이준호(22.04.13) 추가
   * @param {Array.<string>} moduleNames 모듈명 목록
   */
  constructor(target, view, baro2mapKey, mapBgType, moduleNames) {
    this.map = this.createMap(target, view);
    this.apiKey = baro2mapKey;
    this.interactions = []; // 상호 작용 목록
    this.listeners = []; // 이벤트 리스너 목록 (상호작용 변경/초기화 시 실행 되는 함수)

    this.modules = {};
    moduleNames.forEach((moduleName) => {
      if (moduleName == "select") {
        this.modules["select"] = new Select(this);
      }
      if (moduleName == "selectFacility") {
        this.modules["selectFacility"] = new SelectFacility(this);
      }
      if (moduleName == "highlight") {
        this.modules["highlight"] = new Highlight(this);
      }
      if (moduleName == "measure") {
        this.modules["measure"] = new Measure(this);
      }
      if (moduleName == "drawingTool") {
        this.modules["drawingTool"] = new DrawingTool(this);
      }
      if (moduleName == "editTool") {
        this.modules["editTool"] = new EditTool(this);
      }
    });

    this.backgroundMapLayerChange(mapBgType); //mapBgType에 따라 배경지도 종류 선택해주기.
  }

  /**
   * 지도 생성
   * @param {String|Element} target 타겟 Element
   * @param {ol.View} view 뷰
   */
  createMap(target, view) {
    const map = new ol.Map({
      target: target,
      layers: [],
      // controls: [],
      interactions: this.defaultInteractions(),
      controls: this.defaultControls(),
      view: view,
    });
    return map;
  }

  /**
   * WMS 레이어 설정
   * @param {Array.<string>} layerNames 레이어명 목록
   */
  setWMSLayers(layerNames) {
    const layers = this.map.getLayers().getArray();
    layers
      .filter((layer) => layer.get("type") == "wms")
      .forEach((layer) => {
        this.map.removeLayer(layer);
      });

    layerNames.forEach(
      ((layerName) => {
        addWMSLayer(layerName);
      }).bind(this)
    );
  }
  /**
   * WMS 레이어 검색
   * @param {string} layerName 레이어명
   * @returns
   */
  findWMSLayer(layerName) {
    return this.map
      .getLayers()
      .getArray()
      .find((layer) => layer.get("name") == layerName);
  }

  /**
   * WMS 레이어 추가
   * @param {string} layerName 레이어명
   * @param {string} sld
   * @param {number} zIndex
   */
  addWMSLayer(layerName, sld, zIndex) {
    const promises = [];
    if (sld && sld.indexOf("OnlineResource") >= 0) {
      const xml = $.parseXML(sld);
      $(xml)
        .find("se\\:ExternalGraphic")
        .toArray()
        .forEach((element) => {
          const onlineResource = $(element).find("se\\:OnlineResource");
          const src = onlineResource.attr("xlink:href");
          promises.push(util.sld.getBase64(src));
        });
    }
    Promise.all(promises).then((response) => {
      const params = { LAYERS: layerName };
      if (sld) {
        if (response.length > 0) {
          const xml = $.parseXML(sld);
          $(xml)
            .find("se\\:ExternalGraphic")
            .toArray()
            .forEach((element, index) => {
              const onlineResource = $(element).find("se\\:OnlineResource");
              onlineResource.remove();
              $(element).append(
                `<se:InlineContent encoding="base64">${response[index].replace(
                  "data:image/png;base64,",
                  ""
                )}</se:InlineContent>`
              );
            });

          sld = new XMLSerializer().serializeToString(xml);
        }
        params["SLD_BODY"] = sld;
      }
      const layer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          url: "/gis/wms",
          params: params,
          serverType: "geoserver",
          type: "wms",
          imageLoadFunction: function (imageTile, src) {
            const index = src.indexOf("SLD_BODY");
            if (index >= 0) {
              const sldBody = src.substring(index, src.indexOf("&", index));
              const imageSrc = src.replace(sldBody, "");
              const body = decodeURIComponent(sldBody.replace("SLD_BODY=", ""));
              fetch(imageSrc, {
                method: "POST",
                body: body,
              })
                .then((response) => {
                  if (response.ok) {
                    return response.blob();
                  }
                })
                .then(function (blob) {
                  const objectUrl = URL.createObjectURL(blob);
                  imageTile.getImage().src = objectUrl;
                });
            } else {
              imageTile.getImage().src = src;
            }
          },
        }),
        zIndex: zIndex,
        visible: true,
      });
      layer.set("name", layerName);
      this.map.addLayer(layer);
    });
  }

  /**
   * WMS 레이어 삭제
   * @param {string} layerName 레이어명
   */
  removeWMSLayer(layerName) {
    const findLayer = this.map
      .getLayers()
      .getArray()
      .find((layer) => layer.get("name") == layerName);
    if (findLayer) {
      this.map.removeLayer(findLayer);
    }
  }

  modifyWMSLayer(layerName, sld) {
    const findLayer = this.map
      .getLayers()
      .getArray()
      .find((layer) => layer.get("name") == layerName);
    if (findLayer) {
      const promises = [];
      if (sld && sld.indexOf("OnlineResource") >= 0) {
        const xml = $.parseXML(sld);
        $(xml)
          .find("se\\:ExternalGraphic")
          .toArray()
          .forEach((element) => {
            const onlineResource = $(element).find("se\\:OnlineResource");
            const src = onlineResource.attr("xlink:href");
            promises.push(util.sld.getBase64(src));
          });
      }
      Promise.all(promises).then((response) => {
        const params = { LAYERS: layerName };
        if (sld) {
          if (response.length > 0) {
            const xml = $.parseXML(sld);
            $(xml)
              .find("se\\:ExternalGraphic")
              .toArray()
              .forEach((element, index) => {
                const onlineResource = $(element).find("se\\:OnlineResource");
                onlineResource.remove();
                $(element).append(
                  `<se:InlineContent encoding="base64">${response[
                    index
                  ].replace("data:image/png;base64,", "")}</se:InlineContent>`
                );
              });

            sld = new XMLSerializer().serializeToString(xml);
          }
          params["SLD_BODY"] = sld;
        }
        findLayer.getSource().updateParams({ SLD_BODY: sld });
      });
    }
  }

  /**
   * @description 배경지도 레이어 변경 해주는 함수.
   * @Author 플랫폼개발부문 DT솔루션 이준호
   * @Date 2022.04.13
   * @param {string} mapBgType 배경지도 종류
   */
  backgroundMapLayerChange(mapBgType) {
    if (mapBgType == "air") {
      this.map.addLayer(this.createAirBackgroundMap());
    } else {
      this.map.addLayer(this.createEmapBackgroundMap());
    }
  }

  /**
   * 배경지도 변경
   * @param {string} mapBgType 배경지도 종류
   */
  changemap(mapBgType) {
    const layers = this.map.getLayers().getArray();
    layers
      .filter((layer) => layer.get("type") == "backgroundMap")
      .forEach((layer) => {
        this.map.removeLayer(layer);
      });

    this.backgroundMapLayerChange(mapBgType);
  }

  /**
   * @description id값으로 Feature vector 객체 조회 하는 함수
   * @Author 플랫폼개발부문 DT솔루션 이준호
   * @Date 2022.04.21
   * @param id feature id 값
   * @returns feature POI가 반환된다.
   */
  getFeature(id) {
    var vectorLayers = [];
    var layers = this.map.getLayers();
    layers.forEach(function(layer) {
      var source = layer.getSource();
      if (source instanceof ol.source.Vector) {
        if (source.getFeatures().length > 0) {
          vectorLayers.push(source.getFeatures());
        }
      }
    });

    return vectorLayers[0].find(feature => feature.getId() == id);
  }

  /**
   * @description 현재 등록되어 있는 features 반환
   * @Author 플랫폼개발부문 DT솔루션 이준호
   * @Date 2022.04.27
   * @returns {*} features
   */
  getFeatures() {
    var features = [];
    var layers = this.map.getLayers();
    layers.forEach(function(layer) {
      var source = layer.getSource();
      if (source instanceof ol.source.Vector) {
        if (source.getFeatures().length > 0) {
          features.push(source.getFeatures());
        }
      }
    });

    return features[0];
  }

  /**
   * 바로e맵 일반지도 생성
   * @returns 레이어
   */
  createEmapBackgroundMap() {
    return new ol.layer.Tile({
      type: "backgroundMap",
      detailtype: "eamp",
      zIndex: 1,
      extent: initLocation.extent,
      source: new ol.source.WMTS({
		// 실서버 행정망
		//url: `http://10.165.2.30/intEmap/extEmap/openapi/Gettile.do?apiKey=${this.apiKey}`,
		// 실서버 LX망
		//url: `http://10.20.30.81/extEmap/openapi/Gettile.do?apiKey=${this.apiKey}`,
		// 개발서버 행정망
		//url: `http://203.228.54.54/intEmap/extEmap/openapi/Gettile.do?apiKey=${this.apiKey}`,
		// 개발서버 LX망
		url: `http://203.228.54.47/extEmap/openapi/Gettile.do?apiKey=${this.apiKey}`,
        crossOrigin: "*",
        projection: "EPSG:5179",
        wrapX: true,
        layer: "korean_map",
        style: "korean",
        format: "image/jpg",
        matrixSet: "korean",
        tileGrid: new ol.tilegrid.WMTS({
          matrixIds: [
            "L05",
            "L06",
            "L07",
            "L08",
            "L09",
            "L10",
            "L11",
            "L12",
            "L13",
            "L14",
            "L15",
            "L16",
            "L17",
            "L18",
            "L19",
          ],
          resolutions: [
            2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16,
            4.08, 2.04, 1.02, 0.51, 0.255,
          ],
          origin: [-200000, 4000000],
        }),
      }),
    });
  }

  /**
   * 바로e맵 항공지도 생성
   * @returns 레이어
   */
  createAirBackgroundMap() {
    const that = this;
    return new ol.layer.Tile({
      type: "backgroundMap",
      detailtype: "air",
      zIndex: 1,
      extent: initLocation.extent,
      source: new ol.source.WMTS({
    	url: `http://210.117.198.120:8081/o2map/services?apikey=${this.apiKey}`,
        crossOrigin: "*",
        projection: "EPSG:5179",
        wrapX: true,
        layer: "AIRPHOTO",
        format: "image/jpg",
        matrixSet: "NGIS_AIR",
        tileGrid: new ol.tilegrid.WMTS({
          matrixIds: [
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
          ],
          resolutions: [
            2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16,
            4.08, 2.04, 1.02, 0.51, 0.255,
          ],
          origin: [-200000, 4000000], 
        }),
        tileLoadFunction: function (imageTile, src) {
		  // 실서버 행정망
		  //imageTile.getImage().src =  "http://10.165.2.30/intEmap/extEmap/openapi/proxy/proxyTile.jsp?apikey=" + that.apiKey + "&URL=" +
		  // 실서버 LX망
		  //imageTile.getImage().src =  "http://10.20.30.81/extEmap/openapi/proxy/proxyTile.jsp?apikey=" + that.apiKey + "&URL=" +
		  // 개발서버 행정망
          //imageTile.getImage().src =  "http://203.228.54.54/intEmap/extEmap/openapi/proxy/proxyTile.jsp?apikey=" + that.apiKey + "&URL=" +
		  // 개발서버 LX망
          imageTile.getImage().src =  "http://203.228.54.47/extEmap/openapi/proxy/proxyTile.jsp?apikey=" + that.apiKey + "&URL=" +
		  encodeURIComponent(src);
        },
      }),
    });
  }

  /**
   * 지도 가져오기
   * @returns {ol.Map} 지도
   */
  getMap() {
    return this.map;
  }

  /**
   * 모듈 가져오기
   * @param {String} moduleName 모듈명
   * @returns 모듈
   */
  getModule(moduleName) {
    return this.modules[moduleName];
  }

  /**
   * 기본 상호작용 목록
   */
  defaultInteractions() {
    const interactions = ol.interaction.defaults();

    // 더블클릭 확대 막음. DrawEnd와 충돌남
    interactions.removeAt(1);
    return interactions;
  }

  /**
   * 기본 컨트롤 목록
   * @returns
   */
  defaultControls() {
    const controls = [];
    return controls;
  }

  /**
   * 이동
   * @param {Array.<number>} center 중심점
   * @param {number} zoom 축척 레벨
   */
  move(center, zoom) {
    this.getMap().getView().animate({
      center: center,
      zoom: zoom,
      duration: 1000,
    });
  }

  /**
   * 확대
   */
  zoomIn() {
    const zoom = this.getMap().getView().getZoom();
    this.getMap()
      .getView()
      .animate({
        zoom: zoom + 1,
        duration: 500,
      });
  }

  /**
   * 축소
   */
  zoomOut() {
    const zoom = this.getMap().getView().getZoom();
    this.getMap()
      .getView()
      .animate({
        zoom: zoom - 1,
        duration: 500,
      });
  }

  /**
   * 초기화
   */
  reset() {
    const map = this.getMap();
    for (const [key, module] of Object.entries(this.modules)) {
      if (module.reset) {
        module.reset();
      }
    }
    this.interactions.forEach((interaction) => {
      map.removeInteraction(interaction);
    });
    const overlays = map.getOverlays();
    for (let i = overlays.getLength() - 1; i >= 0; i--) {
      const overlay = overlays.item(i);
      map.removeOverlay(overlay);
    }
    this.interactions = [];
  }

  /**
   * 상호작용 초기화
   */
  clearInteraction() {
    const that = this;
    this.interactions.forEach((interaction) => {
      that.map.removeInteraction(interaction);
    });
    this.interactions = [];
    that.notify();
  }

  /**
   * 상호 작용 목록 설정
   * @param {Array.<ol.interaction.Interaction>} interactions 상호작용 목록
   */
  setInteractions(interactions) {
    const that = this;
    that.clearInteraction();
    interactions.forEach((interaction) => {
      that.map.addInteraction(interaction);
    });
    that.interactions = interactions;
    that.notify();
  }

  /**
   * 구독
   * @param {fn} fn
   */
  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.unsubscribe(fn);
    };
  }

  /**
   * 구독 해제
   * @param {Function} fn
   */
  unsubscribe(fn) {
    const index = this.listeners.findIndex((linstener) => linstener === fn);
    if (index >= 0) {
      this.listeners.splice(index);
    }
  }

  /**
   * 구독 알림
   */
  notify() {
    this.listeners.forEach((handler) => {
      handler();
    });
  }

  /**
   * 이미지 내보내기
   * @returns Deferred 객체
   */
  exportImage() {
    const deferred = $.Deferred();
    const map = this.map;
    map.once("rendercomplete", function () {
      const mapCanvas = document.createElement("canvas");
      const size = map.getSize();
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      const mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(
        map.getViewport().querySelectorAll(".ol-layer canvas, canvas.ol-layer"),
        function (canvas) {
          if (canvas.width > 0) {
            const opacity =
              canvas.parentNode.style.opacity || canvas.style.opacity;
            mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
            let matrix;
            const transform = canvas.style.transform;
            if (transform) {
              // Get the transform parameters from the style's transform matrix
              matrix = transform
                .match(/^matrix\(([^\(]*)\)$/)[1]
                .split(",")
                .map(Number);
            } else {
              matrix = [
                parseFloat(canvas.style.width) / canvas.width,
                0,
                0,
                parseFloat(canvas.style.height) / canvas.height,
                0,
                0,
              ];
            }
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );
            mapContext.drawImage(canvas, 0, 0);
          }
        }
      );

      deferred.resolve(mapCanvas.toDataURL(), size[0], size[1]);
    });
    map.renderSync();
    return deferred;
  }

  /**
   * @description feature POI 아이콘 Highlight 해주는 함수.
   * @Author 플랫폼개발부문 DT솔루션 이준호
   * @Date 2022.04.21
   * @param feature POI 객체
   * @param active on일 경우 활성화 시키고 아닐경우 활성된 아이콘 일반 아이콘으로 변경 해주는 값.
   */
  poiIconHighlight(feature, active) {
    let iconSrc = null;

    var icon = feature.get("icon");

    if (icon) {
      if (active == 'on') {
        iconSrc = feature.get("icon").replace(".png", "_on.png"); //선택시 변경할 아이콘 경로 변경.
      } else {
        iconSrc = feature.get("icon").replace("_on.png", ".png"); //선택시 변경할 아이콘 경로 변경.
      }

      const style = new ol.style.Style({ //새로운 스타일 선언
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          src: iconSrc
        }),
        text: new ol.style.Text({
          text: feature.get('text'),
          font: "14px 'Noto Sans KR'",
          fill: new ol.style.Fill({
            color: "rgb(255, 255, 255)",
          }),
          stroke: new ol.style.Stroke({
            color: "rgb(0, 0, 0)",
            width: 2
          }),
          textAlign: "center",
          textBaseline: "bottom",
          offsetY: 15,
        })
      });
      feature.setStyle(style); //feature 객체에 변경된 스타일 넣어주기.
    }
  }
}
