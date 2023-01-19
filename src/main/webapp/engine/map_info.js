/**
 * @Class Name : map_info.js
 * @Description : 지도 정보 js 
 * @
 * @  수정일     	      수정자              		수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021.11.09    최초생성
 *
 * @author 스마트융합사업본부 김선옥
 * @since 2021.11.09 
 * @version 1.0
 * @see
 */

/*************************************************************** 위치 정보 *************************************************************************/
// (경도, 위도, 고도, 각도, 방향)
let m_pos = {
	init : [127.48846105923461, 37.49131546088355, 1720.3767651356757, 90, 0], // 초기 위치
	extent : [127.20319512097201, 37.154772955203785, 127.78725858822045, 37.60045538734813, 75000] // 바운더리 
};

let userSetup = {
	vertclPynColorR : 0,
	vertclPynColorG : 0,
	vertclPynColorB : 0,
	vertclPynThick : 0,
	vertclPynHeight : 0,
	tpgrphTrnsprc : 0,
	vidoQlityLevel : 0
}