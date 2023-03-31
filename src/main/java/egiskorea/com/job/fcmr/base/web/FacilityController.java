package egiskorea.com.job.fcmr.base.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.job.fcmr.base.service.FacilityVO;



/**
 * @Description 시설물 공통 클래스
 * @author 황의현
 * @since 2021.03.29
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.03.29   황의현           최초 생성
 */
@Controller
@RequestMapping("/job/fcmr/base")
public class FacilityController {
	
  private static final Logger logger = LoggerFactory.getLogger(FacilityController.class);

  /**
   * 
   * @Description : 시설물 목록 화면 조회 
   * @Author 황의현
   * @Date 2023.03.29
   * @return 시설물 뷰 경로
   * @throws Exception
   */
  @RequestMapping(value = "/getFacilityListView.do")
  public String getFacilityListView(
          @ModelAttribute("facilityVO") FacilityVO facilityVO,
          ModelMap model) throws Exception {
      return "egiskorea/com/job/fcmr/facilityListView";
  }
  
  /**
   * 
   * @Description : 시설물 상세 화면 조회 
   * @Author 황의현
   * @Date 2023.03.31
   * @return 시설물 뷰 경로
   * @throws Exception
   */

  @RequestMapping(value = "/getFacilityDetailView.do")
  public String getFacilityDetailView(
          @ModelAttribute("facilityVO") FacilityVO facilityVO,
          ModelMap model) throws Exception {
      return "egiskorea/com/job/fcmr/facilityDetailView";
  }
  
  /**
   * 
   * @Description : 시설물 등록 화면 조회 
   * @Author 황의현
   * @Date 2023.03.31
   * @return 시설물 뷰 경로
   * @throws Exception
   */
  @RequestMapping(value = "/getFacilityInsertView.do")
  public String getFacilityInsertView(
          @ModelAttribute("facilityVO") FacilityVO facilityVO,
          ModelMap model) throws Exception {
      return "egiskorea/com/job/fcmr/facilityInsertView";
  }
  
}
