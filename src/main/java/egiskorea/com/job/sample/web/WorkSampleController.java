package egiskorea.com.job.sample.web;

import egiskorea.com.job.sample.service.WorkSampleVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/job/sample")
public class WorkSampleController {

    private static final Logger logger = LoggerFactory.getLogger(WorkSampleController.class);

    @RequestMapping(value = "/page.do")
    public String page(
            @ModelAttribute("workSampleVO") WorkSampleVO workSampleVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/sample/page";
    }

    @RequestMapping(value = "/pageDetail.do")
    public String pageDetail(
            @ModelAttribute("workSampleVO") WorkSampleVO workSampleVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/sample/pageDetail";
    }

    @RequestMapping(value = "/pageInsert.do")
    public String pageInsert(
            @ModelAttribute("workSampleVO") WorkSampleVO workSampleVO,
            ModelMap model) throws Exception {
        return "egiskorea/com/job/sample/pageInsert";
    }
}
