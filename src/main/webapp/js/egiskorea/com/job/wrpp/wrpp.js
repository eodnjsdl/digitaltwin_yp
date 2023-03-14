/**
 * 상수도 관리
 */
class WaterSupplyFacility extends FacilityCommon {
  /**
   * 생성자
   * @param {string} container 컨테이너
   */
  constructor(container) {
    super(container);
    this.title = "상수도관리";
    this.list = [
      {
        value: "WtlFirePs",
        title: "소방시설",
      },
      {value: "WtlPipeLm", title: "상수관로"},
      {value: "WtlFlowPs", title: "유량계"},
      {value: "WtlManhPs", title: "상수맨홀"},
      {value: "WtlPipePs", title: "상수관로심도"},
      {value: "WtlPrgaPs", title: "수압계"},
      {value: "WtlServPs", title: "배수지"},
      {value: "wtlSplyLs", title: "급수관로"},
      {value: "wtlValvPs", title: "변류시설"},
    ];
    this.data = null;
    this.initUi();
    this.bindEvents();
    $(".facility-select", this.container).trigger("change");
  }

  /**
   * 시설물 객체
   * @param {string} className 클래스명
   * @returns
   */
  getObjByName(className) {
    let facility = null;
    if (className == "WtlFirePs") {
      facility = new WtlFirePs();
    } else if (className == "WtlPipeLm") {
      facility = new WtlPipeLm();
      // if(!app2D){alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");}
    } else if (className == "WtlFlowPs") {
      facility = new WtlFlowPs();
      // if(!app2D){alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");}
    } else if (className == "WtlManhPs") {
      facility = new WtlManhPs();
    } else if (className == "WtlPipePs") {
      facility = new WtlPipePs();
      // if(!app2D){alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");}
    } else if (className == "WtlPrgaPs") {
      facility = new WtlPrgaPs();
    } else if (className == "WtlServPs") {
      facility = new WtlServPs();
    } else if (className == "wtlSplyLs") {
      facility = new WtlSplyLs();
      // if(!app2D){alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");}
    } else if (className == "wtlValvPs") {
      facility = new WtlValvPs();
    }
    return facility;
  }
}

/**
 * 소방시설
 */
class WtlFirePs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "wtl_fire_ps";
    this.geometryType = "point";
    this.icons = [
      {
        ftrCde: "SA118",
        icon: "./images/poi/waterTower_poi.png",
      },
      {
        ftrCde: "SA119",
        icon: "./images/poi/hydrant_poi.png",
      },
    ];
    this.columns = [
      { column: "gid", title: "아이디", visible: false, isView: false },
      {
        column: "ftr_cde",
        title: "지형지물부호",
        visible: true,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [
          { value: "SA118", text: "급수탑" },
          { value: "SA119", text: "소화전" },
        ],
        default: "SA119",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "hjd_cde",
        title: "읍면동",
        visible: true,
        align: "",
        search: true,
        type: "emd",
      },
      {
        column: "mng_cde",
        title: "관리기관",
        visible: true,
        align: "left",
        type: "code",
        code: "MNG-001",
      },
      {
        column: "sht_num",
        title: "도엽번호",
        visible: true,
        align: "right",
        type: "text",
        maxLength: 11,
      },
      {
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",
        /*
        search: {
          title: "설치년도",
          type: "year",
          getFilter: (name, val) => {
            return ol.format.filter.like(name, `${val}*`);
          },
        },
        */
        type: "date",
      },
      {
        column: "hom_num",
        title: "수용가번호",
        visible: true,
        align: "",
        type: "text",
        maxLength: 50,
      },
      {
        column: "mof_cde",
        title: "소화전형식",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-048",
      },
      {
        column: "fir_dip",
        title: "소화전구경",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "std_dip",
        title: "관경",
        visible: true,
        align: "",
        search: true,
        type: "number",
        min: 0,
      },
      {
        column: "sup_hit",
        title: "급수탑높이",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "cnt_num",
        title: "공사번호",
        visible: false,
        align: "",
        type: "text",
        maxLength: 8,
      },
      {
        column: "sys_chk",
        title: "대장초기화여부",
        visible: false,
        isView: false,
        maxLength: 8,
      },
      {
        column: "ang_dir",
        title: "방향각",
        visible: false,
        align: "",
        type: "number",
        min: 0,
        valid: "int",
      },

      { column: "geom", title: "공간정보", visible: false, isView: false },
    ];
  }
}

/**
 * 상수관로
 */
class WtlPipeLm extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "wtl_pipe_lm";
    this.geometryType = "multilinestring";
    this.columns = [
      { column: "gid", title: "아이디", visible: false, isView: false },
      {
        column: "ftr_cde",
        title: "지형지물부호",
        visible: true,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [{ value: "SA001", text: "상수관로" }],
        default: "SA001",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "hjd_cde",
        title: "읍면동",
        visible: true,
        align: "",
        search: true,
        type: "emd",
      },
      {
        column: "sht_num",
        title: "도엽번호",
        visible: false,
        align: "",
        type: "text",
        maxLength: 11,
      },
      {
        column: "mng_cde",
        title: "관리기관",
        visible: false,
        align: "",
        type: "text",
        maxLength: 8,
      },
      {
        column: "ist_ymd",
        title: "설치일자",
        visible: false,
        align: "",
        /*
          search: {
            title: "설치년도",
            type: "year",
            getFilter: (name, val) => {
              return ol.format.filter.like(name, `${val}*`);
            },
          },
        */
        type: "date",
      },
      {
        column: "saa_cde",
        title: "관용도",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-004",
      },
      {
        column: "mop_cde",
        title: "관재질",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-003",
      },
      {
        column: "std_dip",
        title: "관경",
        visible: true,
        align: "",
        search: true,
        type: "number",
        step: 50,
        min: 0,
        valid: "int",
      },
      {
        column: "byc_len",
        title: "연장",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "jht_cde",
        title: "접합종류",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-005",
      },
      {
        column: "low_dep",
        title: "최저깊이",
        visible: false,
        align: "",
        format: (value) => {
          if (Number.isNaN(value)) {
            return value.toFixed(2);
          } else {
            return value || "";
          }
        },
        type: "number",
        min: 0,
      },
      {
        column: "hgh_dep",
        title: "최고깊이",
        visible: false,
        align: "",
        format: (value) => {
          if (Number.isNaN(value)) {
            return value.toFixed(2);
          } else {
            return value || "";
          }
        },
        type: "number",
        min: 0,
      },
      {
        column: "cnt_num",
        title: "공사번호",
        visible: false,
        align: "",
        type: "text",
        maxLength: 8,
      },
      {
        column: "sys_chk",
        title: "대장초기화여부",
        visible: false,
        isView: false,
        maxLength: 8,
      },
      {
        column: "iqt_cde",
        title: "탐사구분",
        visible: false,
        align: "",
        type: "code",
        maxLength: 8,
      },
      {
        column: "pip_lbl",
        title: "관라벨",
        visible: false,
        align: "",
        type: "text",
        maxLength: 28,
      },
      { column: "geom", title: "공간정보", visible: false, isView: false },
    ];
  }
}

class WtlFlowPs extends Facility {
  constructor(container) {
    super(container);
    this.featureType = "wtl_flow_ps";
    this.geometryType = "point";
    this.columns = [
      { column: "gid", title: "아이디", visible: false, isView: false },
      {
        column: "ftr_cde",
        title: "지형지물부호",
        visible: true,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [{ value: "SA117", text: "유량계" }],
        default: "SA117",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "hjd_cde",
        title: "읍면동",
        visible: true,
        align: "",
        search: true,
        type: "emd",
      },
      {
        column: "mng_cde",
        title: "관리기관",
        visible: true,
        align: "left",
        type: "code",
        code: "MNG-001",
      },
      {
        column: "sht_num",
        title: "도엽번호",
        visible: true,
        align: "right",
        type: "text",
        maxLength: 11,
      },
      {
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",
        type: "date",
      },
      {
        column: "gag_cde",
        title: "유량계종류",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-141",
      },
      {
        column: "mof_cde",
        title: "유량계형식",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-041",
      },
      {
        column: "std_dip",
        title: "관경",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "prc_nam",
        title: "제작회사명",
        visible: false,
        align: "",
        type: "text",
        maxLength: 100,
      },
      {
        column: "pip_cde",
        title: "관로지형지물부호",
        visible: false,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [{ value: "SA001", text: "상수관로" }],
        default: "SA001",
      },
      {
        column: "pip_idn",
        title: "관리번호",
        visible: false,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "cnt_num",
        title: "공사번호",
        visible: false,
        align: "",
        type: "text",
        maxLength: 8,
      },
      {
        column: "sys_chk",
        title: "대장초기화여부",
        visible: false,
        isView: false,
        maxLength: 8,
      },
      {
        column: "ang_dir",
        title: "방향각",
        visible: false,
        align: "",
        type: "number",
        min: 0,
        valid: "int",
      },
    ];
  }
}
class WtlManhPs extends Facility {
  constructor(container) {
    super(container);
    this.featureType = "wtl_manh_ps";
    this.geometryType = "point";
    this.icons = [
    	{ ftrCde: "SA100", icon: "./images/poi/wtlManhPs_poi.png" },
    	{ ftrCde: "SA991", icon: "./images/poi/expansionJoint_poi.png" }
    ];
    this.columns = [
      { column: "gid", title: "아이디", visible: false, isView: false },
      {
        column: "ftr_cde",
        title: "지형지물부호",
        visible: false,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [
          { value: "SA100", text: "상수맨홀" },
          { value: "SA991", text: "신축관실" },
        ],
        default: "SA100",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "hjd_cde",
        title: "읍면동",
        visible: true,
        align: "",
        search: true,
        type: "emd",
      },
      {
        column: "sht_num",
        title: "도엽번호",
        visible: false,
        align: "right",
        type: "text",
        maxLength: 11,
      },
      {
        column: "mng_cde",
        title: "관리기관",
        visible: true,
        align: "center",
        type: "code",
        code: "MNG-001",
      },
      {
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",
        type: "date",
      },
      {
        column: "dpg_std",
        title: "규격",
        visible: true,
        align: "",
        search: true,
        type: "text",
        maxLength: 50,
      },
      {
        column: "som_cde",
        title: "맨홀종류",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-002",
      },
      {
        column: "mhs_cde",
        title: "맨홀형태",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-006",
      },
      {
        column: "cnt_num",
        title: "공사번호",
        visible: false,
        align: "",
        type: "text",
        maxLength: 50,
      },
      {
        column: "sys_chk",
        title: "대장초기화여부",
        visible: false,
        isView: false,
        maxLength: 8,
      },
      {
        column: "ang_dir",
        title: "방향각",
        visible: true,
        align: "",
        type: "number",
        min: 0,
        valid: "int",
      },
    ];
  }
}

class WtlPipePs extends Facility {
  constructor(container) {
    super(container);
    this.featureType = "wtl_pipe_ps";
    this.geometryType = "point";
    this.columns = [
      { column: "gid", title: "아이디", visible: false, isView: false },
      {
        column: "ftr_cde",
        title: "지형지물부호",
        visible: true,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [{ value: "SA900", text: "상수관로 심도" }],
        default: "SA900",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        search: true,
        isEdit: false,
      },
      {
        column: "pip_dep",
        title: "심도",
        visible: true,
        align: "center",
        type: "number",
      },
    ];
  }
}

class WtlPrgaPs extends Facility {
  constructor(container) {
    super(container);
    this.featureType = "wtl_prga_ps";
    this.geometryType = "point";
    this.icons = [{ icon: "./images/poi/wtlPrgaPs_poi.png" }];
    this.columns = [
      { column: "gid", title: "아이디", visible: false, isView: false },
      {
        column: "ftr_cde",
        title: "지형지물부호",
        visible: false,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [{ value: "SA121", text: "수압계" }],
        default: "SA121",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "hjd_cde",
        title: "읍면동",
        visible: true,
        align: "",
        search: true,
        type: "emd",
      },
      {
        column: "sht_num",
        title: "도엽번호",
        visible: false,
        align: "right",
        type: "text",
        maxLength: 11,
      },
      {
        column: "mng_cde",
        title: "관리기관",
        visible: true,
        align: "left",
        type: "code",
        code: "MNG-001",
      },
      {
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",
        type: "date",
      },
      {
        column: "pga_cde",
        title: "수압계종류",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-137",
      },
      {
        column: "mof_cde",
        title: "수압계형식",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-041",
      },
      {
        column: "std_dip",
        title: "관경",
        visible: true,
        align: "",
        search: true,
        type: "number",
        min: 0,
      },
      {
        column: "std_saf",
        title: "기준압력",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "avg_saf",
        title: "기준압력",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "msr_saf",
        title: "측정압력",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "srv_dip",
        title: "배수관_관경",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "pip_cde",
        title: "관로지형지물부호",
        visible: false,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [{ value: "SA001", text: "상수관로" }],
        default: "SA001",
      },
      {
        column: "pip_idn",
        title: "관로관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "cnt_num",
        title: "공사번호",
        visible: false,
        align: "",
        type: "text",
        maxLength: 8,
      },
      {
        column: "sys_chk",
        title: "대장초기화여부",
        visible: false,
        isView: false,
        maxLength: 8,
      },
      {
        column: "ang_dir",
        title: "방향각",
        visible: false,
        align: "",
        type: "number",
        min: 0,
        valid: "int",
      },
    ];
  }
}

class WtlServPs extends Facility {
  constructor(container) {
    super(container);
    this.featureType = "wtl_serv_ps";
    this.geometryType = "point";
    this.icons = [{ icon: "./images/poi/wtlServPs_poi.png" }];
    this.columns = [
      { column: "gid", title: "아이디", visible: false, isView: false },
      {
        column: "ftr_cde",
        title: "지형지물부호",
        visible: true,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [{ value: "SA114", text: "배수지" }],
        default: "SA114",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "hjd_cde",
        title: "읍면동",
        visible: true,
        align: "",
        search: true,
        type: "emd",
      },
      {
        column: "sht_num",
        title: "도엽번호",
        visible: true,
        align: "right",
        type: "text",
        maxLength: 11,
      },
      {
        column: "mng_cde",
        title: "관리기관",
        visible: true,
        align: "left",
        type: "code",
        code: "MNG-001",
      },
      {
        column: "fns_ymd",
        title: "준공일자",
        visible: true,
        align: "",
        type: "date",
      },
      {
        column: "srv_nam",
        title: "배수지명",
        visible: true,
        align: "",
        search: true,
        type: "text",
      },
      {
        column: "pur_nam",
        title: "정수장명",
        visible: true,
        align: "",
        type: "text",
      },
      {
        column: "gai_ara",
        title: "부지면적",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "sag_cde",
        title: "관리방법",
        visible: false,
        align: "left",
        search: true,
        type: "code",
        code: "OGC-001",
      },
      {
        column: "srv_vol",
        title: "시설용량",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "hgh_wal",
        title: "최고수위",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "low_wal",
        title: "최저수위",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "isr_vol",
        title: "배수지유입량",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "sup_are",
        title: "급수지역",
        visible: false,
        align: "",
        type: "text",
        maxLength: 50,
      },
      {
        column: "sup_pop",
        title: "급수인구",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "scw_cde",
        title: "배수지제어방법",
        visible: false,
        align: "",
        type: "code",
        code: "OGC-134",
      },

      {
        column: "cnt_num",
        title: "공사번호",
        visible: false,
        align: "",
        type: "text",
        maxLength: 8,
      },
      {
        column: "sys_chk",
        title: "대장초기화여부",
        visible: false,
        isView: false,
        maxLength: 8,
      },
    ];
  }
}

class WtlSplyLs extends Facility {
  constructor(container) {
    super(container);
    this.featureType = "wtl_sply_ls";
    this.geometryType = "multilinestring";
    this.columns = [
      { column: "gid", title: "아이디", visible: false, isView: false },
      {
        column: "ftr_cde",
        title: "지형지물부호",
        visible: false,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [{ value: "SA002", text: "급수관로" }],
        default: "SA002",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "hjd_cde",
        title: "읍면동",
        visible: true,
        align: "",
        search: true,
        type: "emd",
      },
      {
        column: "sht_num",
        title: "도엽번호",
        visible: false,
        align: "right",
        type: "text",
        maxLength: 11,
      },
      // {
      //   column: "mng_cde",
      //   title: "관리기관",
      //   visible: true,
      //   align: "left",
      //   type: "code",
      //   code: "MNG-001",
      // },
      {
        column: "mng_cde",
        title: "관리기관",
        visible: true,
        align: "",
        type: "text",
        maxLength: 8,
      },
      {
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",
        type: "date",
      },
      {
        column: "saa_cde",
        title: "관용도",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-004",
      },
      {
        column: "mop_cde",
        title: "관재질",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-003",
      },
      {
        column: "std_dip",
        title: "관경",
        visible: true,
        align: "",
        search: true,
        type: "number",
        step: 50,
        min: 0,
        valid: "int",
      },
      {
        column: "byc_len",
        title: "연장",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "jht_cde",
        title: "접합종류",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-005",
      },
      {
        column: "low_dep",
        title: "최저깊이",
        visible: false,
        align: "",
        format: (value) => {
          if (Number.isNaN(value)) {
            return value.toFixed(2);
          } else {
            return value || "";
          }
        },
        type: "number",
        min: 0,
      },
      {
        column: "hgh_dep",
        title: "최고깊이",
        visible: false,
        align: "",
        format: (value) => {
          if (Number.isNaN(value)) {
            return value.toFixed(2);
          } else {
            return value || "";
          }
        },
        type: "number",
        min: 0,
      },
      {
        column: "cnt_num",
        title: "공사번호",
        visible: false,
        align: "",
        type: "text",
        maxLength: 8,
      },
      {
        column: "sys_chk",
        title: "대장초기화여부",
        visible: false,
        isView: false,
        maxLength: 8,
      },
      {
        column: "pip_lbl",
        title: "관라벨",
        visible: false,
        align: "",
        type: "text",
        maxLength: 28,
      },
      { column: "geom", title: "공간정보", visible: false, isView: false },
    ];
  }
}
class WtlValvPs extends Facility {
  constructor(container) {
    super(container);
    this.featureType = "wtl_valv_ps";
    this.geometryType = "point";
    this.icons = [
      { ftrCde: "SA200", icon: "./images/poi/stopValve_poi.png" },
      { ftrCde: "SA201", icon: "./images/poi/nonreturnValve_poi.png" },
      { ftrCde: "SA202", icon: "./images/poi/drainValve_poi.png" },
      { ftrCde: "SA203", icon: "./images/poi/exhaustValve_poi.png" },
      { ftrCde: "SA204", icon: "./images/poi/prsRelifValve_poi.png" },
      { ftrCde: "SA205", icon: "./images/poi/safetyValve_poi.png" },
    ];
    this.columns = [
      { column: "gid", title: "아이디", visible: false, isView: false },
      {
        column: "ftr_cde",
        title: "지형지물부호",
        visible: true,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        search: true,
        codeData: [
          { value: "SA200", text: "상수제수변" },
          { value: "SA201", text: "상수역지변" },
          { value: "SA202", text: "상수이토변" },
          { value: "SA203", text: "상수배기변" },
          { value: "SA204", text: "상수감압변" },
          { value: "SA205", text: "상수안전변" },
        ],
        default: "SA200",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "hjd_cde",
        title: "읍면동",
        visible: true,
        align: "center",
        search: true,
        type: "emd",
      },
      {
        column: "sht_num",
        title: "도엽번호",
        visible: false,
        align: "right",
        type: "text",
        maxLength: 11,
      },
      {
        column: "mng_cde",
        title: "관리기관",
        visible: false,
        align: "left",
        type: "code",
        code: "MNG-001",
      },
      {
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",
        type: "date",
      },
      {
        column: "mof_cde",
        title: "변류형식",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-031",
      },
      {
        column: "std_dip",
        title: "관경",
        visible: true,
        align: "",
        search: true,
        type: "number",
        step: 50,
        min: 0,
        valid: "int",
      },
      {
        column: "sae_cde",
        title: "제수변회전방향",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-007",
      },
      {
        column: "tro_cnt",
        title: "제수변총회전수",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "cro_cnt",
        title: "제수변현회전수",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "mth_cde",
        title: "제수변구동방법",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-008",
      },
      {
        column: "for_cde",
        title: "시설물형태",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-001",
      },

      {
        column: "val_std",
        title: "변실규격",
        visible: true,
        align: "",
        type: "text",
      },
      {
        column: "val_saf",
        title: "설정압력",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "prc_nam",
        title: "제작회사명",
        visible: false,
        align: "",
        type: "text",
        maxLength: 100,
      },
      {
        column: "pip_cde",
        title: "관로지형지물부호",
        visible: false,
        align: "",
        isEdit: false,
        required: true,
        type: "code",
        codeData: [{ value: "SA001", text: "상수관로" }],
        default: "SA001",
      },
      {
        column: "pip_idn",
        title: "관리번호",
        visible: false,
        align: "",
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
      {
        column: "cst_cde",
        title: "이상상태",
        visible: true,
        align: "center",
        type: "code",
        code: "OGC-010",
      },
      {
        column: "off_cde",
        title: "개패여부",
        visible: true,
        align: "center",
        type: "code",
        code: "OGC-011",
      },
      {
        column: "cnt_num",
        title: "공사번호",
        visible: false,
        align: "",
        type: "text",
        maxLength: 50,
      },
      {
        column: "ang_dir",
        title: "방향각",
        visible: true,
        align: "",
        type: "number",
        min: 0,
        valid: "int",
      },
      {
        column: "sys_chk",
        title: "대장초기화여부",
        visible: false,
        isView: false,
        maxLength: 8,
      },
    ];
  }
}
