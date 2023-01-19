package egiskorea.com.geo.emi.service.impl;

import javax.annotation.Resource;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.Row;

import egiskorea.com.geo.emi.service.ExaminationInfo;
import egiskorea.com.geo.emi.service.ExaminationInfoService;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.rte.fdl.excel.EgovExcelMapping;
import egovframework.rte.fdl.excel.util.EgovExcelUtil;

/**
 * @Description Excel 조사정보 매핑 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.01.05
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.05   이상화           최초 생성
 *  </pre>
 */

public class ExcelExaminationInfoMapping extends EgovExcelMapping {
	
	/** SurveyInfoService */
	@Resource(name = "examinationInfoService")
    private ExaminationInfoService examinationInfoService;
	
	/**
	 * 조사정보 엑셀파일 맵핑
	 */
	@Override
	public Object mappingColumn(Row row) {
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		
		HSSFCell cell0 = (HSSFCell) row.getCell(0); HSSFCell cell1 = (HSSFCell) row.getCell(1); HSSFCell cell2 = (HSSFCell) row.getCell(2); HSSFCell cell3 = (HSSFCell) row.getCell(3); HSSFCell cell4 = (HSSFCell) row.getCell(4);
    	HSSFCell cell5 = (HSSFCell) row.getCell(5); HSSFCell cell6 = (HSSFCell) row.getCell(6); HSSFCell cell7 = (HSSFCell) row.getCell(7); HSSFCell cell8 = (HSSFCell) row.getCell(8); HSSFCell cell9 = (HSSFCell) row.getCell(9);
		HSSFCell cell10 = (HSSFCell) row.getCell(10); HSSFCell cell11 = (HSSFCell) row.getCell(11); HSSFCell cell12 = (HSSFCell) row.getCell(12); HSSFCell cell13 = (HSSFCell) row.getCell(13); HSSFCell cell14 = (HSSFCell) row.getCell(14);
		HSSFCell cell15 = (HSSFCell) row.getCell(15); HSSFCell cell16 = (HSSFCell) row.getCell(16); HSSFCell cell17 = (HSSFCell) row.getCell(17); HSSFCell cell18 = (HSSFCell) row.getCell(18); HSSFCell cell19 = (HSSFCell) row.getCell(19);
		HSSFCell cell20 = (HSSFCell) row.getCell(20); HSSFCell cell21 = (HSSFCell) row.getCell(21); HSSFCell cell22 = (HSSFCell) row.getCell(22); HSSFCell cell23 = (HSSFCell) row.getCell(23); HSSFCell cell24 = (HSSFCell) row.getCell(24);
		HSSFCell cell25 = (HSSFCell) row.getCell(25); HSSFCell cell26 = (HSSFCell) row.getCell(26); HSSFCell cell27 = (HSSFCell) row.getCell(27); HSSFCell cell28 = (HSSFCell) row.getCell(28); HSSFCell cell29 = (HSSFCell) row.getCell(29);
		HSSFCell cell30 = (HSSFCell) row.getCell(30); HSSFCell cell31 = (HSSFCell) row.getCell(31); HSSFCell cell32 = (HSSFCell) row.getCell(32); HSSFCell cell33 = (HSSFCell) row.getCell(33); HSSFCell cell34 = (HSSFCell) row.getCell(34);
		HSSFCell cell35 = (HSSFCell) row.getCell(35); HSSFCell cell36 = (HSSFCell) row.getCell(36); HSSFCell cell37 = (HSSFCell) row.getCell(37); HSSFCell cell38 = (HSSFCell) row.getCell(38); HSSFCell cell39 = (HSSFCell) row.getCell(39);
		HSSFCell cell40 = (HSSFCell) row.getCell(40); HSSFCell cell41 = (HSSFCell) row.getCell(41); HSSFCell cell42 = (HSSFCell) row.getCell(42); HSSFCell cell43 = (HSSFCell) row.getCell(43); HSSFCell cell44 = (HSSFCell) row.getCell(44);
		HSSFCell cell45 = (HSSFCell) row.getCell(45); HSSFCell cell46 = (HSSFCell) row.getCell(46); HSSFCell cell47 = (HSSFCell) row.getCell(47); HSSFCell cell48 = (HSSFCell) row.getCell(48); HSSFCell cell49 = (HSSFCell) row.getCell(49);
		HSSFCell cell50 = (HSSFCell) row.getCell(50); HSSFCell cell51 = (HSSFCell) row.getCell(51); HSSFCell cell52 = (HSSFCell) row.getCell(52); HSSFCell cell53 = (HSSFCell) row.getCell(53); HSSFCell cell54 = (HSSFCell) row.getCell(54);
		HSSFCell cell55 = (HSSFCell) row.getCell(55); HSSFCell cell56 = (HSSFCell) row.getCell(56); HSSFCell cell57 = (HSSFCell) row.getCell(57); HSSFCell cell58 = (HSSFCell) row.getCell(58); HSSFCell cell59 = (HSSFCell) row.getCell(59);
		HSSFCell cell60 = (HSSFCell) row.getCell(60); HSSFCell cell61 = (HSSFCell) row.getCell(61); HSSFCell cell62 = (HSSFCell) row.getCell(62); HSSFCell cell63 = (HSSFCell) row.getCell(63); HSSFCell cell64 = (HSSFCell) row.getCell(64);
		HSSFCell cell65 = (HSSFCell) row.getCell(65); HSSFCell cell66 = (HSSFCell) row.getCell(66); HSSFCell cell67 = (HSSFCell) row.getCell(67); HSSFCell cell68 = (HSSFCell) row.getCell(68); HSSFCell cell69 = (HSSFCell) row.getCell(69);
		HSSFCell cell70 = (HSSFCell) row.getCell(70); HSSFCell cell71 = (HSSFCell) row.getCell(71); HSSFCell cell72 = (HSSFCell) row.getCell(72); HSSFCell cell73 = (HSSFCell) row.getCell(73); HSSFCell cell74 = (HSSFCell) row.getCell(74);
		HSSFCell cell75 = (HSSFCell) row.getCell(75); HSSFCell cell76 = (HSSFCell) row.getCell(76); HSSFCell cell77 = (HSSFCell) row.getCell(77); HSSFCell cell78 = (HSSFCell) row.getCell(78); HSSFCell cell79 = (HSSFCell) row.getCell(79);
		HSSFCell cell80 = (HSSFCell) row.getCell(80); HSSFCell cell81 = (HSSFCell) row.getCell(81); HSSFCell cell82 = (HSSFCell) row.getCell(82); HSSFCell cell83 = (HSSFCell) row.getCell(83); HSSFCell cell84 = (HSSFCell) row.getCell(84);
		HSSFCell cell85 = (HSSFCell) row.getCell(85); HSSFCell cell86 = (HSSFCell) row.getCell(86); HSSFCell cell87 = (HSSFCell) row.getCell(87); HSSFCell cell88 = (HSSFCell) row.getCell(88); HSSFCell cell89 = (HSSFCell) row.getCell(89);
		HSSFCell cell90 = (HSSFCell) row.getCell(90); HSSFCell cell91 = (HSSFCell) row.getCell(91); HSSFCell cell92 = (HSSFCell) row.getCell(92); HSSFCell cell93 = (HSSFCell) row.getCell(93); HSSFCell cell94 = (HSSFCell) row.getCell(94);
		HSSFCell cell95 = (HSSFCell) row.getCell(95); HSSFCell cell96 = (HSSFCell) row.getCell(96); HSSFCell cell97 = (HSSFCell) row.getCell(97); HSSFCell cell98 = (HSSFCell) row.getCell(98); HSSFCell cell99 = (HSSFCell) row.getCell(99);
		HSSFCell cell100 = (HSSFCell) row.getCell(100); HSSFCell cell101 = (HSSFCell) row.getCell(101); HSSFCell cell102 = (HSSFCell) row.getCell(102); HSSFCell cell103 = (HSSFCell) row.getCell(103); HSSFCell cell104 = (HSSFCell) row.getCell(104);
		HSSFCell cell105 = (HSSFCell) row.getCell(105); HSSFCell cell106 = (HSSFCell) row.getCell(106); HSSFCell cell107 = (HSSFCell) row.getCell(107); HSSFCell cell108 = (HSSFCell) row.getCell(108); HSSFCell cell109 = (HSSFCell) row.getCell(109);
		HSSFCell cell110 = (HSSFCell) row.getCell(110); HSSFCell cell111 = (HSSFCell) row.getCell(111); HSSFCell cell112 = (HSSFCell) row.getCell(112); HSSFCell cell113 = (HSSFCell) row.getCell(113); HSSFCell cell114 = (HSSFCell) row.getCell(114);
		HSSFCell cell115 = (HSSFCell) row.getCell(115); HSSFCell cell116 = (HSSFCell) row.getCell(116); HSSFCell cell117 = (HSSFCell) row.getCell(117); HSSFCell cell118 = (HSSFCell) row.getCell(118); HSSFCell cell119 = (HSSFCell) row.getCell(119);
		HSSFCell cell120 = (HSSFCell) row.getCell(120); HSSFCell cell121 = (HSSFCell) row.getCell(121); HSSFCell cell122 = (HSSFCell) row.getCell(122); HSSFCell cell123 = (HSSFCell) row.getCell(123); HSSFCell cell124 = (HSSFCell) row.getCell(124);
		HSSFCell cell125 = (HSSFCell) row.getCell(125); HSSFCell cell126 = (HSSFCell) row.getCell(126); HSSFCell cell127 = (HSSFCell) row.getCell(127); HSSFCell cell128 = (HSSFCell) row.getCell(128); HSSFCell cell129 = (HSSFCell) row.getCell(129);
		HSSFCell cell130 = (HSSFCell) row.getCell(130); HSSFCell cell131 = (HSSFCell) row.getCell(131); HSSFCell cell132 = (HSSFCell) row.getCell(132); HSSFCell cell133 = (HSSFCell) row.getCell(133); HSSFCell cell134 = (HSSFCell) row.getCell(134);
		HSSFCell cell135 = (HSSFCell) row.getCell(135); HSSFCell cell136 = (HSSFCell) row.getCell(136); HSSFCell cell137 = (HSSFCell) row.getCell(137); HSSFCell cell138 = (HSSFCell) row.getCell(138); HSSFCell cell139 = (HSSFCell) row.getCell(139);
		HSSFCell cell140 = (HSSFCell) row.getCell(140); HSSFCell cell141 = (HSSFCell) row.getCell(141); HSSFCell cell142 = (HSSFCell) row.getCell(142); HSSFCell cell143 = (HSSFCell) row.getCell(143); HSSFCell cell144 = (HSSFCell) row.getCell(144);
		HSSFCell cell145 = (HSSFCell) row.getCell(145);


		ExaminationInfo vo = new ExaminationInfo();

		vo.setPnu(EgovExcelUtil.getValue(cell0) + "1" + EgovExcelUtil.getValue(cell1) + EgovExcelUtil.getValue(cell2)); // 행정구역코드 + 1 + 본번  + 부번 = pnu
		vo.setStartDate(EgovExcelUtil.getValue(cell3)); vo.setEndDate(EgovExcelUtil.getValue(cell4)); vo.setUpdateDate(EgovExcelUtil.getValue(cell5));
		vo.setMain(EgovExcelUtil.getValue(cell6)); vo.setSub(EgovExcelUtil.getValue(cell7)); vo.setOri(EgovExcelUtil.getValue(cell8));
		vo.setJ0100(EgovExcelUtil.getValue(cell9)); vo.setJ0200(EgovExcelUtil.getValue(cell10)); vo.setJ0301(EgovExcelUtil.getValue(cell11)); vo.setJ0302(EgovExcelUtil.getValue(cell12)); vo.setJ0401(EgovExcelUtil.getValue(cell13));
		vo.setJ0401p(EgovExcelUtil.getValue(cell14)); vo.setJ0402(EgovExcelUtil.getValue(cell15)); vo.setJ0402p(EgovExcelUtil.getValue(cell16)); vo.setJ0403(EgovExcelUtil.getValue(cell17)); vo.setJ0403p(EgovExcelUtil.getValue(cell18));
		vo.setJ0501(EgovExcelUtil.getValue(cell19)); vo.setJ0501p(EgovExcelUtil.getValue(cell20)); vo.setJ0502(EgovExcelUtil.getValue(cell21)); vo.setJ0502p(EgovExcelUtil.getValue(cell22)); vo.setJ0503(EgovExcelUtil.getValue(cell23));
		vo.setJ0503p(EgovExcelUtil.getValue(cell24)); vo.setG0100(EgovExcelUtil.getValue(cell142)); vo.setG0101(EgovExcelUtil.getValue(cell143)); vo.setSaveYn(EgovExcelUtil.getValue(cell144)); vo.setOpinion(EgovExcelUtil.getValue(cell145));
		vo.setFrstRegisterId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		vo.setLastUpdusrId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
		
		vo.setC0100p(EgovExcelUtil.getValue(cell25)); vo.setC0100n(EgovExcelUtil.getValue(cell26)); vo.setC0100c(EgovExcelUtil.getValue(cell27)); vo.setC0200p(EgovExcelUtil.getValue(cell28)); vo.setC0200n(EgovExcelUtil.getValue(cell29));
		vo.setC0200c(EgovExcelUtil.getValue(cell30)); vo.setC0301n(EgovExcelUtil.getValue(cell31)); vo.setC0301e(EgovExcelUtil.getValue(cell32)); vo.setC0302p(EgovExcelUtil.getValue(cell33)); vo.setC0302n(EgovExcelUtil.getValue(cell34));
		vo.setC0302c(EgovExcelUtil.getValue(cell35)); vo.setC0302e(EgovExcelUtil.getValue(cell36)); vo.setC0401p(EgovExcelUtil.getValue(cell37)); vo.setC0401n(EgovExcelUtil.getValue(cell38)); vo.setC0401c(EgovExcelUtil.getValue(cell39));
		vo.setC0402p(EgovExcelUtil.getValue(cell40)); vo.setC0402n(EgovExcelUtil.getValue(cell41)); vo.setC0402c(EgovExcelUtil.getValue(cell42)); vo.setC0403p(EgovExcelUtil.getValue(cell43)); vo.setC0403n(EgovExcelUtil.getValue(cell44));
		vo.setC0403c(EgovExcelUtil.getValue(cell45)); vo.setC0500p(EgovExcelUtil.getValue(cell46)); vo.setC0500n(EgovExcelUtil.getValue(cell47)); vo.setC0500c(EgovExcelUtil.getValue(cell48)); vo.setC0601p(EgovExcelUtil.getValue(cell49));
		vo.setC0601n(EgovExcelUtil.getValue(cell50)); vo.setC0601c(EgovExcelUtil.getValue(cell51)); vo.setC0602p(EgovExcelUtil.getValue(cell52)); vo.setC0602n(EgovExcelUtil.getValue(cell53)); vo.setC0602c(EgovExcelUtil.getValue(cell54));
		
		vo.setL0100p(EgovExcelUtil.getValue(cell55)); vo.setL0100n(EgovExcelUtil.getValue(cell56)); vo.setL0100c(EgovExcelUtil.getValue(cell57)); vo.setL0100e(EgovExcelUtil.getValue(cell58)); vo.setL0201p(EgovExcelUtil.getValue(cell59));
		vo.setL0201n(EgovExcelUtil.getValue(cell60)); vo.setL0201c(EgovExcelUtil.getValue(cell61)); vo.setL0202p(EgovExcelUtil.getValue(cell62)); vo.setL0202n(EgovExcelUtil.getValue(cell63)); vo.setL0202c(EgovExcelUtil.getValue(cell64));
		vo.setL0202e(EgovExcelUtil.getValue(cell65)); vo.setL0301p(EgovExcelUtil.getValue(cell66)); vo.setL0301n(EgovExcelUtil.getValue(cell67)); vo.setL0301c(EgovExcelUtil.getValue(cell68)); vo.setL0302p(EgovExcelUtil.getValue(cell69));
		vo.setL0302n(EgovExcelUtil.getValue(cell70)); vo.setL0302c(EgovExcelUtil.getValue(cell71)); vo.setL0303p(EgovExcelUtil.getValue(cell72)); vo.setL0303n(EgovExcelUtil.getValue(cell73)); vo.setL0303c(EgovExcelUtil.getValue(cell74));
		vo.setL0400p(EgovExcelUtil.getValue(cell75)); vo.setL0400n(EgovExcelUtil.getValue(cell76)); vo.setL0400c(EgovExcelUtil.getValue(cell77)); vo.setL0500p(EgovExcelUtil.getValue(cell78)); vo.setL0500n(EgovExcelUtil.getValue(cell79));
		vo.setL0500c(EgovExcelUtil.getValue(cell80)); vo.setL0601p(EgovExcelUtil.getValue(cell81)); vo.setL0601n(EgovExcelUtil.getValue(cell82)); vo.setL0601c(EgovExcelUtil.getValue(cell83)); vo.setL0602p(EgovExcelUtil.getValue(cell84));
		vo.setL0602n(EgovExcelUtil.getValue(cell85)); vo.setL0602c(EgovExcelUtil.getValue(cell86));
		
		vo.setB0101p(EgovExcelUtil.getValue(cell87)); vo.setB0101n(EgovExcelUtil.getValue(cell88)); vo.setB0101c(EgovExcelUtil.getValue(cell89)); vo.setB0102p(EgovExcelUtil.getValue(cell90)); vo.setB0102n(EgovExcelUtil.getValue(cell91));
		vo.setB0102c(EgovExcelUtil.getValue(cell92)); vo.setB0102e(EgovExcelUtil.getValue(cell93)); vo.setB0201p(EgovExcelUtil.getValue(cell94)); vo.setB0201n(EgovExcelUtil.getValue(cell95)); vo.setB0201c(EgovExcelUtil.getValue(cell96));
		vo.setB0202p(EgovExcelUtil.getValue(cell97)); vo.setB0202n(EgovExcelUtil.getValue(cell98)); vo.setB0202c(EgovExcelUtil.getValue(cell99)); vo.setB0202e(EgovExcelUtil.getValue(cell100)); vo.setB0300p(EgovExcelUtil.getValue(cell101));
		vo.setB0300n(EgovExcelUtil.getValue(cell102)); vo.setB0300c(EgovExcelUtil.getValue(cell103)); vo.setB0400p(EgovExcelUtil.getValue(cell104)); vo.setB0400n(EgovExcelUtil.getValue(cell105)); vo.setB0400c(EgovExcelUtil.getValue(cell106));
		vo.setB0400e(EgovExcelUtil.getValue(cell107)); vo.setB0500p(EgovExcelUtil.getValue(cell108)); vo.setB0500n(EgovExcelUtil.getValue(cell109)); vo.setB0500c(EgovExcelUtil.getValue(cell110)); vo.setB0500e(EgovExcelUtil.getValue(cell111));
		vo.setB0601p(EgovExcelUtil.getValue(cell112)); vo.setB0601n(EgovExcelUtil.getValue(cell113)); vo.setB0601c(EgovExcelUtil.getValue(cell114)); vo.setB0602p(EgovExcelUtil.getValue(cell115)); vo.setB0602n(EgovExcelUtil.getValue(cell116));
		vo.setB0602c(EgovExcelUtil.getValue(cell117)); vo.setB0602e(EgovExcelUtil.getValue(cell118)); vo.setB0700p(EgovExcelUtil.getValue(cell119)); vo.setB0700n(EgovExcelUtil.getValue(cell120)); vo.setB0700c(EgovExcelUtil.getValue(cell121));
		vo.setB0800p(EgovExcelUtil.getValue(cell122)); vo.setB0800n(EgovExcelUtil.getValue(cell123)); vo.setB0800c(EgovExcelUtil.getValue(cell124)); vo.setB0900p(EgovExcelUtil.getValue(cell125)); vo.setB0900n(EgovExcelUtil.getValue(cell126));
		vo.setB0900c(EgovExcelUtil.getValue(cell127)); vo.setB0900e(EgovExcelUtil.getValue(cell128)); vo.setB1000p(EgovExcelUtil.getValue(cell129)); vo.setB1000n(EgovExcelUtil.getValue(cell130)); vo.setB1000c(EgovExcelUtil.getValue(cell131));
		vo.setB1100p(EgovExcelUtil.getValue(cell132)); vo.setB1100n(EgovExcelUtil.getValue(cell133)); vo.setB1100c(EgovExcelUtil.getValue(cell134));
		
		vo.setT0100(EgovExcelUtil.getValue(cell135)); vo.setT0200(EgovExcelUtil.getValue(cell136)); vo.setT0300(EgovExcelUtil.getValue(cell137)); vo.setT0400(EgovExcelUtil.getValue(cell138)); vo.setT0500(EgovExcelUtil.getValue(cell139));
		vo.setT0600(EgovExcelUtil.getValue(cell140)); vo.setT0700(EgovExcelUtil.getValue(cell141));
		
		return vo;
	}
}
