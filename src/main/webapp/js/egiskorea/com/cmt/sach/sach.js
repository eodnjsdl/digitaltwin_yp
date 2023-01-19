$(function () {
  new MapAddressSearch();
});

/**
 * 지도 주소 검색
 */
class MapAddressSearch {
  /**
   * 생성자
   */
  constructor() {
    this.bindEvents();
    this.load();
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    // 지도 주소 검색 타입
    $(".map-address-type").on("change", function () {
      const node = $(this);
      if (node.val() == "ldreg") {
        $(".map-address-mntn-span").show();
      } else {
        $(".map-address-mntn-span").hide();
      }
      $(".map-address-emd").trigger("change");
    });

    // 읍면동 선택 시 '리' 또는 '도로명' 표시
    $(".map-address-emd").on("change", function () {
      const node = $(this);
      const emdCd = node.val();
      that.loadLi(emdCd);
    });

    // 지번 검색
    $(".map-address-search").on("click", function () {
      that.search();
    });
    $(".map-address-text").on("keydown", function (event) {
      if (event.keyCode == "13") {
        $(".map-address-search").trigger("click");
      }
    });
  }

  /**
   * 읍면동
   */
  load() {
    loadingShowHide("show");
    store.emd.getData().done((features) => {
      const sorted = util.array.sort(features, "emd_kor_nm");
      const tags = sorted.map((feature) => {
        return `<option value="${feature.get("emd_cd")}">${feature.get(
          "emd_kor_nm"
        )}</option>`;
      });
      $(".map-address-emd").html(tags.join(""));
      $(".map-address-emd").trigger("change");
      loadingShowHide("hide");
    });
  }

  /**
   * 리 or 도로명
   * @param {string} emdCd 읍면동코드
   */
  loadLi(emdCd) {
    loadingShowHide("show");
    const type = $(".map-address-type").val();
    if (type == "ldreg") {
      const filter = ol.format.filter.like("li_cd", `${emdCd}*`);
      util.gis
        .getFeature(["tgd_scco_li"], filter, null, null, [
          "gid",
          "li_cd",
          "li_kor_nm",
        ])
        .done((geojson) => {
          try {
            const format = new ol.format.GeoJSON();
            const features = format.readFeatures(geojson);
            const sorted = util.array.sort(features, "li_kor_nm");
            const tags = sorted.map((feature) => {
              return `<option value="${feature.get("li_cd")}">${feature.get(
                "li_kor_nm"
              )}</option>`;
            });
            $(".map-address-li").html(
              `<option value="">선택</option>${tags.join("")}`
            );
          } catch (error) {
            console.log(`리 을 가져오는데 실패했습니다.`);
          } finally {
            loadingShowHide("hide");
          }
        });
    } else if (type == "spbd") {
      const filter = ol.format.filter.equalTo("emd_cd", emdCd);
      //util.gis.getFeature(["v_tgd_sprd_rn"], filter).done((geojson) => {
      util.gis
        .getFeature(["tgd_sprd_rn"], filter, null, null, [
          "gid",
          "rn_cd",
          "rn",
          "emd_cd",
        ])
        .done((geojson) => {
          try {
            const format = new ol.format.GeoJSON();
            const features = format.readFeatures(geojson);
            const sorted = util.array.sort(features, "rn");
            const tags = sorted.map((feature) => {
              return `<option value="${feature.get("rn_cd")}">${feature.get(
                "rn"
              )}</option>`;
            });
            $(".map-address-li").html(
              `<option value="">선택</option>${tags.join("")}`
            );
          } catch (error) {
            console.log(`도로명을 가져오는데 실패했습니다.`);
          } finally {
            loadingShowHide("hide");
          }
        });
      loadingShowHide("hide");
    } else {
      console.log(`지원되지 않는 주소 검색 타입입니다.`);
      loadingShowHide("hide");
    }
  }

  /**
   * 통합행정정보 리 or 도로명 표출후 값 선택 해주기 함수
   * @param {string} emdCd 읍면동코드
   * @param {string} liCd 리 도로명
   */
  loadLi_3D(pnu) {
    let emd = pnu.substr(0, 8);
    let li = pnu.substr(0, 10);
    let mntn = pnu.substr(10, 1);
    let main = pnu.substr(11, 4) * 1;
    let sub = pnu.substr(15, 4) * 1;
    const filter = ol.format.filter.like("li_cd", `${emd}*`);

    util.gis.getFeature(["tgd_scco_li"], filter).done((geojson) => {
      try {
        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(geojson);
        const sorted = util.array.sort(features, "li_kor_nm");
        const tags = sorted.map((feature) => {
          return `<option value="${feature.get("li_cd")}">${feature.get(
            "li_kor_nm"
          )}</option>`;
        });
        $(".form-select.map-address-li").html(
          `<option value="">선택</option>${tags.join("")}`
        );
      } catch (error) {
        console.log(`리 을 가져오는데 실패했습니다.`);
      } finally {
        loadingShowHide("show");

        $("#emd").val(emd);
        $("#main").val(main);
        $("#sub").val(sub);
        mntn == 2
          ? $("#mntn").prop("checked", true)
          : $("#mntn").prop("checked", false);

        let count = 0;
        let Interval = setInterval(() => {
          $("#li").val(li);
          count++;
          if ($("#li").val() == li || count == 20) {
            clearInterval(Interval);
            loadingShowHide("hide");
          }
        }, 100);
      }
    });
  }

  /**
   * 검색
   */
  search() {
    const type = $(".map-address-type").val();
    if (type == "ldreg") {
      this.searchAddress();
    } else if (type == "spbd") {
      this.searchRoadAddresss();
    } else {
      console.log(`지원되지 않는 주소 검색 타입입니다.`);
    }
  }

  /**
   * 주소 검색
   */
  searchAddress() {
    const emdCd = $(".map-address-emd").val();
    const liCd = $(".map-address-li").val();
    const mntn = $(".map-address-mntn").is(":checked") ? "2" : "1";
    const text = $(".map-address-text").val();
    if (text) {
      const split = text.trim().split("-");
      const mnnm = split[0];
      const slno = split[1];

      let pnu = "";
      if (liCd) {
        pnu += liCd;
      } else {
        pnu += emdCd + "..";
      }
      pnu += mntn;
      pnu += mnnm.padStart(4, "0");
      pnu += slno ? slno.padStart(4, "0") : "....";

      loadingShowHide("show");
      const filter = ol.format.filter.like("pnu", pnu);
      util.gis.getFeature(["lsmd_cont_ldreg_41830"], filter).done((geojson) => {
        try {
          if (geojson.totalFeatures > 0) {
            cmmUtil.moveFeatures(geojson);
          } else {
            alert(`검색 결과가 없습니다.`);
          }
        } catch (error) {
          console.log(`지번 주소를 가져오는데 실패했습니다.`);
        } finally {
          loadingShowHide("hide");
        }
      });
    } else {
      if (liCd) {
        loadingShowHide("show");
        const filter = ol.format.filter.equalTo("li_cd", liCd);
        util.gis.getFeature(["tgd_scco_li"], filter).done((geojson) => {
          try {
            if (geojson.totalFeatures > 0) {
              cmmUtil.moveFeatures(geojson);
            } else {
              alert(`검색 결과가 없습니다.`);
            }
          } catch (error) {
            console.log(`리 을 가져오는데 실패했습니다.`);
          } finally {
            loadingShowHide("hide");
          }
        });
      } else {
        store.emd.getData().done((features) => {
          const feature = features.find(
            (feature) => emdCd == feature.get("emd_cd")
          );
          const format = new ol.format.GeoJSON();
          const geojson = format.writeFeatures([feature]);
          cmmUtil.moveFeatures(geojson);
        });
      }
    }
  }

  /**
   * 도로명 검색
   */
  searchRoadAddresss() {
    const emdCd = $(".map-address-emd").val();
    const liCd = $(".map-address-li").val();
    const text = $(".map-address-text").val();
    if (text) {
      const split = text.trim().split("-");
      const mnnm = split[0];
      const slno = split[1];

      const filters = [];
      if (liCd) {
        filters.push(ol.format.filter.equalTo("rn_cd", liCd));
      } else {
        filters.push(ol.format.filter.equalTo("emd_cd", emdCd.substring(5, 8)));
      }
      if (mnnm) {
        filters.push(ol.format.filter.equalTo("buld_mnnm", parseInt(mnnm, 10)));
      }
      if (slno) {
        filters.push(ol.format.filter.equalTo("buld_slno", parseInt(slno, 10)));
      }

      loadingShowHide("show");
      const filter = new ol.format.filter.And(...filters);
      util.gis.getFeature(["tgd_spbd_buld"], filter).done((geojson) => {
        try {
          if (geojson.totalFeatures > 0) {
            cmmUtil.moveFeatures(geojson);
          } else {
            alert(`검색 결과가 없습니다.`);
          }
        } catch (error) {
          console.log(`도로명 주소를 가져오는데 실패했습니다.`);
        } finally {
          loadingShowHide("hide");
        }
      });
    } else {
      if (liCd) {
        loadingShowHide("show");
        const filter = ol.format.filter.equalTo("rn_cd", liCd);
        util.gis.getFeature(["v_tgd_sprd_rn"], filter).done((geojson) => {
          try {
            if (geojson.totalFeatures > 0) {
              cmmUtil.moveFeatures(geojson);
            } else {
              alert(`검색 결과가 없습니다.`);
            }
          } catch (error) {
            console.log(`도로명을 가져오는데 실패했습니다.`);
          } finally {
            loadingShowHide("hide");
          }
        });
      } else {
        store.emd.getData().done((features) => {
          const feature = features.find(
            (feature) => emdCd == feature.get("emd_cd")
          );
          const format = new ol.format.GeoJSON();
          const geojson = format.writeFeatures([feature]);
          cmmUtil.moveFeatures(geojson);
        });
      }
    }
  }
}
