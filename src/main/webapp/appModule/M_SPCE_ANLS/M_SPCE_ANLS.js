/**
 * 공간 분석
 */
var M_SPCE_ANLS = {
  /**
   * 초기화
   */
  init: function () {
    this.selector = ".spatial-analysis";
    this.facility = store["facility"].getData();
    this.type = null;
    this.list = null;
    this.initUi();
    this.bindEvents();
    this.loadTarget();
    this.loadFacility();
  },

  /**
   * 소멸자
   */
  destroy: function () {
    this.list = null;
    this.type = null;
    this.facility = null;
    $(this.selector).remove();
    this.selector = null;
    if(GLOBAL.layerBox != null){//데이터내보내기에서 그린 3d객체 있을시 삭제
		delWfSLayer(GLOBAL.layerBox)
		GLOBAL.layerBox = null
		GLOBAL.layerCount = 0
	}
  },

  /**
   * UI 초기화
   */
  initUi: function () {
    // 스크롤 적용
    $(".scroll-y", this.selector).mCustomScrollbar({
      scrollbarPosition: "outside",
    });
  },

  /**
   * 이벤트 연결
   */
  bindEvents: function () {
    const that = this;

    // 접기/펼치기
    $(".popup-toggle", that.selector).on("click", function () {
      $(this).parent().toggleClass("fold");
      if ($(this).parent().hasClass("fold")) {
        $(this).attr("title", "펼치기");
      } else {
        $(this).attr("title", "접기");
      }
    });

    // 분석
    $(".btn-analysis", that.selector).on("click", function () {
      that.highlight();
      that.analysis();
    });

    // 초기화
    $(".btn-reset", that.selector).on("click", function () {
      that.reset();
    });

    // 다운로드
    $(".btn-download", that.selector).on("click", function () {
      that.download();
    });
  },

  /**
   * 초기화
   */
  reset: function () {
    $("[name=analysis-target] option:first", this.selector).attr(
      "selected",
      true
    );
    $("[name=analysis-facility] option:first", this.selector).attr(
      "selected",
      true
    );
  },

  /**
   * 대상지역 불러오기
   */
  loadTarget: function () {
    loadingShowHide("show");
    store.emd.getData().done((features) => {
      const sorted = util.array.sort(features, "emd_kor_nm");
      const tags = sorted.map((feature) => {
        return `<option value="${feature.get("emd_cd")}">${feature.get(
          "emd_kor_nm"
        )}</option>`;
      });
      $("[name=analysis-target]", this.selector).html(
        `<option value="">읍면동 기준</option>${tags.join("")}`
      );
      loadingShowHide("hide");
    });
  },

  /**
   * 시설물 불러오기
   */
  loadFacility: function () {
    let tag = ``;
    this.facility.forEach((item) => {
      const name = item["tblNm"].toLowerCase();
      const title = item["lyrNm"];
      tag += `<option value="${name}">${title}</option>`;
    });
    $("[name=analysis-facility]", this.selector).html(tag);
  },

  /**
   * 표시
   */
  highlight: function () {
    const emdCode = $("[name=analysis-target]", this.selector).val();
    const dataId = $("[name=analysis-facility]", this.selector).val();
    loadingShowHide("show");
    if(mapType == "2D"){
    	 if (emdCode) {
    	      store.emd.getData().done((features) => {
    	        const findFeature = features.find(
    	          (feature) => feature.get("emd_cd") == emdCode
    	        );
    	        if (findFeature) {
    	          const filter = ol.format.filter.intersects(
    	            "geom",
    	            findFeature.getGeometry(),
    	            store.getPrj()
    	          );
    	          util.gis.getFeature([dataId], filter).done((geojson) => {
    	            const format = new ol.format.WKT();
    	            cmmUtil.highlightFeatures(geojson);
    	            const wkt = format.writeGeometry(findFeature.getGeometry());
    	            cmmUtil.moveGeometry(wkt);
    	          });
    	        }
    	      });
    	    } else {
    	      let filter = null;
    	      if(dataId == "tgd_spot_bridge"||dataId=='tgd_spsb_statn') {
    	    	filter = ol.format.filter.equalTo("sig_cd", "41830");
    	      }
    	      util.gis.getFeature([dataId], filter).done((geojson) => {
    	        cmmUtil.highlightFeatures(geojson);
    	        util.gis.getFeature(["tgd_scco_sig"]).done((json) => {
    	          cmmUtil.moveFeatures(json);
    	        });
    	      });
    	    }
    }else{
    	 $.ajax({
    		  type : "POST",
    		  url : "/anls/span/selectSpAnlsList.do",
    		  data: {
    			  "emdCd" : emdCode,
    			  "tabName" : dataId
    		  },
    		  dataType:"json",
    		  async: false,
    		  success : function(result, status){
    			if(status == "success") { 	       
    				if(GLOBAL.layerBox != null){
    					delWfSLayer(GLOBAL.layerBox);
    					GLOBAL.layerBox = null;
    					GLOBAL.layerCount = 0;
    				}
    				
    				var x = m_pos.init[0]
    				var y = m_pos.init[1]
    				var z = m_pos.init[2]+8000
    				
    				for(var i=0; i<result.length; i++){
    					
    					if(result[i].geom ){
    						make3dObject(result[i])
    						
    					}
    					if(result[i].centerpoint){
    						
    						x = parseFloat(result[i].centerpoint.split("(")[1].split(")")[0].split(" ")[0])
    						y = parseFloat(result[i].centerpoint.split("(")[1].split(")")[0].split(" ")[1])
    						z = 6000
    					}
    					
    				}

    				setCameraMoveLLAT(x,y,z,90);
    				
    			}else{
    			  toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
    			  return;
    			}
    		  }, complete : function(result, status){
    			  
    		  }
    		});
    }
    loadingShowHide("hide");
  },

  /**
   * 분석
   */
  analysis: function () {
    const emdCode = $("[name=analysis-target]", this.selector).val();
    const dataId = $("[name=analysis-facility]", this.selector).val();
    const type = this.facility.find(
      (item) => item["tblNm"].toLowerCase() == dataId
    )["lyrDtlKnd"];
    this.type = type;

    loadingShowHide("show");
    const data = { emdCode, dataId, type };
    $.get("/anls/spce/analysis.do", data)
      .done((response) => {
        if (this.type == "P" || this.type == "MP") {
          $(".th_value").text("개수");
        } else if (this.type == "L" || this.type == "ML") {
          $(".th_value").text("길이");
        } else if (this.type == "A" || this.type == "MA") {
          $(".th_value").text("면적");
        } else {
          console.log(`정의되지 않은 공간 타입입니다.`);
        }
        this.list = JSON.parse(response)["result"];
        this.renderList();
        this.renderChart();
        loadingShowHide("hide");
      })
      .fail(() => {
        alert("공간 분석에 실패하였습니다.");
        loadingShowHide("hide");
      });
  },

  /**
   * 다운로드
   */
  download: function () {
    if (this.list) {
      const titles = $(".table-title thead th")
        .toArray()
        .map((element) => {
          return $(element).text();
        });
      const data = encodeURIComponent(JSON.stringify(this.list));
      const chart = $(".analysis-chart", this.selector)[0].toDataURL();

      $.post("/anls/spce/createDownloadFile.do", {
        titles: titles.join(","),
        data: data,
        chart: chart,
      })
        .done((response) => {
          const name = JSON.parse(response)["result"];
          window.location.href = `/anls/spce/download.do?name=${name}`;
        })
        .fail(() => {
          alert("다운로드에 실패하였습니다.");
        });
    } else {
      alert("다운로드는 분석 후 가능합니다.");
    }
  },

  /**
   * 분석결과 목록 표시
   */
  renderList: function () {
    const tags = this.list.map((item) => {
      let tag = ``;
      tag += `<tr>`;
      tag += `  <td>${item["name"]}</td>`;
      tag += `  <td>${item["count"]}</td>`;
      if (this.type == "P" || this.type == "MP") {
        tag += `  <td>${item["value"]}개</td>`;
      } else if (this.type == "L" || this.type == "ML") {
        tag += `  <td>${this.formatLength(item["value"])}</td>`;
      } else if (this.type == "A" || this.type == "MA") {
        tag += `  <td>${this.formatArea(item["value"])}</td>`;
      } else {
        console.log(`정의되지 않은 공간 타입입니다.`);
      }
      tag += `</tr>`;
      return tag;
    });
    $(".scroll-y .data-list", this.selector).html(tags.join(""));
  },

  /**
   * 분석결과 차트 표시
   */
  renderChart: function () {
    const canvas = $(
      `<canvas class="analysis-chart" width="370" height="220"></canvas>`
    );
    $(".graph-box", this.selector).html(canvas);
    const ctx = canvas[0].getContext("2d");

    const labels = this.list.map((item) => {
      return item["name"];
    });
    const data = this.list.map((item) => {
      return item["value"];
    });
    const datasets = [
      {
        data: data,
        borderColor: "rgba(0, 0, 255, 1)",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
      },
    ];
    new Chart(ctx, {
      type: "bar",
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = "";
                if (this.type == "P" || this.type == "MP") {
                  label += `\r\n${context["raw"]}개`;
                } else if (this.type == "L" || this.type == "ML") {
                  label += `\r\n${this.formatLength(context["raw"])}`;
                } else if (this.type == "A" || this.type == "MA") {
                  label += `\r\n${this.formatArea(context["raw"])}`;
                } else {
                  label += `\r\n${context["formattedValue"]}`;
                }
                return label;
              },
            },
          },
        },
      },
      plugins: [
        {
          id: "custom_canvas_background_color",
          beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext("2d");
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
          },
        },
      ],
    });
  },

  /**
   * 길이 포맷
   * @param {number} length 길이
   * @returns 포맷 적용된 길이
   */
  formatLength: function (length) {
    let output;
    if (length > 1000) {
      output = Math.round((length / 1000) * 100) / 100 + " km";
    } else {
      output = Math.round(length * 100) / 100 + " m";
    }
    return output;
  },

  /**
   * 면적 포맷
   * @param {number} area 면적
   * @returns 포맷 적용된 면적
   */
  formatArea: function (area) {
    let output;
    if (area > 100000) {
      output = Math.round((area / 1000000) * 100) / 100 + " km\xB2";
    } else {
      output = Math.round(area * 100) / 100 + " m\xB2";
    }
    return output;
  },
};
