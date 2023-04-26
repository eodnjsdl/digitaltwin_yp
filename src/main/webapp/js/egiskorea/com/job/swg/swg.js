/**
 * 하수도 관리
 */
class SewerSupplyFacility extends FacilityCommon {
  /**
   * 생성자
   * @param {string} container 컨테이너
   */
  constructor(container) {
    super(container);
    this.title = "하수도관리";
    this.list = [
      { value: "SwlConnLs", title: "하수연결관" },
      { value: "SwlDeptPs", title: "하수관거심도" },
      { value: "SwlDranPs", title: "하수처리장" },
      { value: "SwlManhPs", title: "하수맨홀" },
      { value: "SwlPipeAs", title: "면형하수관거" },
      { value: "SwlPipeLm", title: "하수관거" },
      { value: "SwlPumpPs", title: "하수펌프장" },
      { value: "swlSideLs", title: "측구" },
      { value: "swlSpewPs", title: "토구" },
      { value: "swlSpotPs", title: "물받이" },
      { value: "swlVentPs", title: "환기구" },
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
    if (className == "SwlConnLs") {
      facility = new SwlConnLs();
      if(!app2D){alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");}
    } else if (className == "SwlDeptPs") {
      facility = new SwlDeptPs();
    } else if (className == "SwlDranPs") {
      facility = new SwlDranPs();
    } else if (className == "SwlManhPs") {
      facility = new SwlManhPs();
    } else if (className == "SwlPipeLm") {
      facility = new SwlPipeLm();
      if(!app2D){alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");}
    } else if (className == "SwlPumpPs") {
      facility = new SwlPumpPs();
    } else if (className == "swlSideLs") {
      facility = new SwlSideLs();
      if(!app2D){alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");}
    } else if (className == "swlSpewPs") {
      facility = new SwlSpewPs();
    } else if (className == "swlSpotPs") {
      facility = new SwlSpotPs();
    } else if (className == "swlVentPs") {
      facility = new SwlVentPs();
    } else if (className == "SwlPipeAs") {
      facility = new SwlPipeAs();
      if(!app2D){alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");}
    }

    return facility;
  }
}

/**
 * 하수연결관
 */
class SwlConnLs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_conn_ls";
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
        codeData: [{ value: "SB003", text: "하수연결관" }],
        default: "SB003",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: false,
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
        visible: false,
        align: "right",
        type: "text",
        maxLength: 11,
      },
      {
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",

        search: {
          title: "설치년도",
          type: "year",
          getFilter: (name, val) => {
            // return ol.format.filter.like(name, `${val}*`);
            return `${name} like ${val}`
          },
        },

        type: "date",
      },

      {
        column: "sba_cde",
        title: "하수관용도",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-017",
      },
      {
        column: "mop_cde",
        title: "관재질",
        visible: true,
        align: "",

        type: "code",
        code: "OGC-003",
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
        column: "std_dip",
        title: "관경",
        visible: true,
        align: "",
        search: true,
        type: "number",
        min: 0,
      },
      {
        column: "std_hol",
        title: "가로길이",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "std_vel",
        title: "세로길이",
        visible: false,
        align: "",
        type: "number",
        min: 0,
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
        column: "sph_lin",
        title: "차선통로수",
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
        column: "pip_lbl",
        title: "관라벨",
        visible: false,
        align: "",
        type: "text",
        maxLength: 28,
      },
    ];
  }
}

/**
 * 하수관거심도
 */
class SwlDeptPs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_dept_ps";
    this.geometryType = "point";
    this.icons = [{ icon: "./images/poi/swlDeptPs_poi.png" }];
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
        codeData: [{ value: "SB900", text: "하수관거심도" }],
        default: "SB900",
      },
      {
        column: "pip_dep",
        title: "심도",
        visible: true,
        align: "center",
        type: "number",
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
    ];
  }
}

/**
 * 하수처리장
 */
class SwlDranPs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_dran_ps";
    this.geometryType = "point";
    this.icons = [{ icon: "./images/poi/swlDranPs_poi.png" }];
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
        codeData: [{ value: "SB200", text: "하수처리장" }],
        default: "SB200",
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
        column: "drn_nam",
        title: "하수처리장명",
        visible: true,
        align: "",
        search: true,
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
        column: "soo_cde",
        title: "개통상태",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-023",
      },
      {
        column: "adp_ara",
        title: "처리구역면적",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "sbb_cde",
        title: "하수처리방식",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-056",
      },
      {
        column: "pcc_vol",
        title: "청천시처리용량",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "puc_vol",
        title: "우천시처리용량",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "qw1_exp",
        title: "설계유입수_수질",
        visible: false,
        align: "",
        type: "text",
      },
      {
        column: "qw2_exp",
        title: "설계유출수_수질",
        visible: false,
        align: "",
        type: "text",
      },
      {
        column: "pip_len",
        title: "차집관연장",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "dra_nam",
        title: "방류수역명",
        visible: false,
        align: "",
        type: "text",
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
        visible: false,
        align: "",
        type: "number",
        min: 0,
        valid: "int",
      },
    ];
  }
}
/**
 * 하수맨홀
 */
class SwlManhPs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_manh_ps";
    this.geometryType = "point";
    this.icons = [{ icon: "./images/poi/swlManhPs_poi.png" }];
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
        codeData: [{ value: "SB101", text: "하수맨홀" }],
        default: "SB101",
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
        column: "ecn_ymd",
        title: "최종준설일자",
        visible: false,
        align: "",
        type: "date",
      },
      {
        column: "smu_cde",
        title: "하수맨홀용도",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-013",
      },
      {
        column: "for_cde",
        title: "시설물형태",
        visible: true,
        search: true,
        align: "",
        type: "code",
        code: "OGC-001",
      },
      {
        column: "som_cde",
        title: "맨홀종류",
        visible: false,
        search: true,
        align: "",
        type: "code",
        //code: "OGC-012",
        code: "OGC-002",	// 공통코드와 상이
      },
      {
        column: "man_dip",
        title: "하수맨홀구경",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "man_hol",
        title: "하수맨홀가로",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "man_vel",
        title: "하수맨홀세로",
        visible: false,
        align: "",
        type: "number",
      },

      {
        column: "sbc_cde",
        title: "뚜껑재질",
        visible: false,
        align: "",
        type: "code",
        code: "OGC-014",
      },
      {
        column: "ivt_cde",
        title: "인버트유무",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-015",
      },
      {
        column: "lad_cde",
        title: "사다리설치유무",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-016",
      },
      {
        column: "mos_hsl",
        title: "하수맨홀고도",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "lms_hsl",
        title: "하수맨홀저고",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "cst_cde",
        title: "이상상태",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-010",
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
        visible: false,
        align: "",
        type: "number",
        min: 0,
        valid: "int",
      },
    ];
  }
}

/**
 * 하수관거
 */
class SwlPipeLm extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_pipe_lm";
    this.geometryType = "MultiLineString";
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
          { value: "SB001", text: "암거" },
          { value: "SB002", text: "개거" },
        ],
        default: "SB001",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: false,
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
        visible: false,
        align: "left",
        type: "code",
        code: "MNG-001",
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
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",
        type: "date",
      },
      {
        column: "sba_cde",
        title: "하수관용도",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-017",
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
        column: "lit_cde",
        title: "규모",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-018",
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
        column: "std_hol",
        title: "가로길이",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "std_vel",
        title: "세로길이",
        visible: false,
        align: "",
        type: "number",
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
        column: "beg_dep",
        title: "시점깊이",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "end_dep",
        title: "종점깊이",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "sbk_hsl",
        title: "시점관저고",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "sbl_hsl",
        title: "종점관저고",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "pip_slp",
        title: "평균구배",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "sph_lin",
        //title: "평균구배",
        title: "차선통로수",	// db와 상이
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "bst_ara",
        title: "우수배수면적",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "drt_ara",
        title: "오수배수면적",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "sbq_spd",
        title: "우천시_유속",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "sbr_spd",
        title: "청천시_유속",
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
        column: "pip_lbl",
        title: "관라벨",
        visible: false,
        align: "",
        type: "text",
        maxLength: 28,
      },
      {
        column: "bom_cde",
        title: "시점맨홀지형지물부호",
        visible: false,
        align: "",
        type: "code",
        code: "FTR-001",
      },
      {
        column: "bom_idn",
        title: "시점맨홀관리번호",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "eom_cde",
        title: "종점맨홀지형지물부호",
        visible: false,
        align: "",
        type: "code",
        code: "FTR-001",
      },
      {
        column: "eom_idn",
        title: "종점맨홀관리번호",
        visible: false,
        align: "",
        type: "number",
      },
    ];
  }
}
/**
 * 하수펌프장
 */
class SwlPumpPs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_pump_ps";
    this.geometryType = "point";
    this.icons = [{ icon: "./images/poi/swlPumpPs_poi.png" }];
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
        codeData: [{ value: "SB210", text: "하수펌프장" }],
        default: "SB210",
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
        visible: false,
        align: "left",
        type: "code",
        code: "MNG-001",
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
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",
        type: "date",
      },

      {
        column: "pmp_nam",
        title: "하수펌프장명",
        visible: true,
        search: true,
        align: "",
        type: "text",
      },
      {
        column: "gai_ara",
        title: "부지면적",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "soo_cde",
        title: "개통상태",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-023",
      },
      {
        column: "sbe_cde",
        title: "펌프장용도",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-055",
      },
      {
        column: "day_vol",
        title: "일일처리용량",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "max_vol",
        title: "최대저수용량",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "stp_hsl",
        title: "표고",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "pmp_wal",
        title: "수위",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "cos_vol",
        title: "청천시_오수양수능력",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "uos_vol",
        title: "우천시_오수양수능력",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "usu_vol",
        title: "우수양수능력",
        visible: false,
        align: "",
        type: "number",
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
/**
 * 측구
 */
class SwlSideLs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_side_ls";
    this.geometryType = "MultiLineString";
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
        codeData: [{ value: "SB004", text: "측구" }],
        default: "SB004",
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
        visible: false,
        align: "left",
        type: "code",
        code: "MNG-001",
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
        column: "ist_ymd",
        title: "설치일자",
        visible: true,
        align: "",
        type: "date",
      },

      {
        column: "aeg_cde",
        title: "촉구구분",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-054",
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
        column: "std_hol",
        title: "가로길이",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "std_vel",
        title: "세로길이",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "sph_lin",
        title: "차선통로수",
        visible: false,
        align: "",
        type: "number",
        min: 0,
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

/**
 * 토구
 */
class SwlSpewPs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_spew_ps";
    this.geometryType = "point";
    this.icons = [{ icon: "./images/poi/swlSpewPs_poi.png" }];
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
        codeData: [{ value: "SB104", text: "토구" }],
        default: "SB104",
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
        column: "vmt_cde",
        title: "토구용도",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-145",
      },
      {
        column: "for_cde",
        title: "시설물형태",
        visible: true,
        align: "",
        type: "code",
        search: true,
        code: "OGC-001",
      },
      {
        column: "spw_dip",
        title: "원형토구내경",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "spw_hol",
        title: "각형토구가로길이",
        visible: true,
        align: "",
        type: "number",
      },
      {
        column: "spw_vel",
        title: "각형토구세로길이",
        visible: true,
        align: "",
        type: "number",
      },

      {
        column: "spw_hsl",
        title: "토구표고",
        visible: true,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "spw_wal",
        title: "평균수위",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },

      {
        column: "riv_nam",
        //title: "세로길이",
        title: "하천명",	// db와 상이
        visible: false,
        align: "",
        type: "text",
      },
      {
        column: "spw_saf",
        title: "계획방류량",
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },
      {
        column: "dra_cde",
        title: "배수구역지형지물부호",
        visible: false,
        align: "",

        type: "code",
        codeData: [{ value: "SB310", text: "배수구역" }],
        //default: "SA310",
        default: "SB310",	// 코드 상이
      },
      {
        //column: "dra_cde",
        column: "dra_idn",	// db와 상이
        title: "배수구역관리번호",
        visible: false,
        align: "",

        type: "number",
      },

      {
        column: "dsp_cde",
        title: "처리구역지형지물부호",
        visible: false,
        align: "",

        type: "code",
        codeData: [{ value: "SB300", text: "처리구역" }],
        //default: "SA300",
        default: "SB300",	// 코드 상이
      },
      {
        //column: "dsp_cde",
        column: "dra_idn",	// db와 상이
        title: "처리구역관리번호",
        visible: false,
        align: "",

        type: "number",
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
/**
 * 물받이
 */
class SwlSpotPs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_spot_ps";
    this.geometryType = "point";
    this.icons = [{ icon: "./images/poi/swlSpotPs_poi.png" }];
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
        codeData: [{ value: "SB102", text: "물받이" }],
        default: "SB102",
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
        column: "ecn_ymd",
        title: "최종준설일자",
        visible: false,
        align: "",
        type: "date",
      },
      {
        column: "sbd_cde",
        title: "물받이용도",
        visible: true,
        align: "",
        type: "code",
        code: "OGC-043",
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
        column: "spt_dip",
        title: "원형물받이내경",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "spt_hol",
        title: "각형물받이가로길이",
        visible: false,
        align: "",
        type: "number",
      },
      {
        column: "spt_vel",
        title: "각형물받이세로길이",
        visible: false,
        align: "",
        type: "number",
      },

      {
        column: "spt_dep",
        //title: "평균수위",
        title: "물받이깊이",	// db와 상이
        visible: false,
        align: "",
        type: "number",
        min: 0,
      },

      {
        column: "cov_cde",
        title: "물받이뚜껑형태",
        visible: false,
        align: "",
        search: true,
        type: "code",
        //code: "OGC-0133",
        code: "OGC-133",	// 공통코드와 상이
      },
      {
        column: "mop_cde",
        title: "관재질",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-044",
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
        visible: true,
        align: "",
        type: "number",
        min: 0,
        valid: "int",
      },
    ];
  }
}
/**
 * 환기구
 */
class SwlVentPs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_vent_ps";
    this.geometryType = "point";
    this.icons = [{ icon: "./images/poi/swlVentPs_poi.png" }];
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
        codeData: [{ value: "SB410", text: "환기구" }],
        default: "SB410",
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
        column: "vnt_dip",
        title: "환기구구경",
        visible: true,
        align: "",
        type: "number",
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
        column: "mof_cde",
        title: "흡출기형식",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-012",
      },
      {
        column: "hmp_cde",
        title: "흡출기재질",
        visible: true,
        align: "",
        search: true,
        type: "code",
        code: "OGC-172",
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

/**
 * 면형하수관거
 */
class SwlPipeAs extends Facility {
  /**
   * 생성자
   */
  constructor(container) {
    super(container);
    this.featureType = "swl_pipe_as";
    this.geometryType = "MultiPolygon";
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
          { value: "SB901", text: "면형암거" },
          { value: "SB902", text: "면형개거" },
        ],
        default: "SB901",
      },
      {
        column: "ftr_idn",
        title: "관리번호",
        visible: true,
        align: "",
        search: true,
        isOnEdit: true,
        type: "number",
        isEdit: false,
      },
    ];
  }
}
