package egiskorea.com.job.adas.publndMng.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.adas.asmng.service.AdministAssetsVO;
import egiskorea.com.job.adas.publndMng.service.PublndMngService;
import egiskorea.com.job.adas.publndMng.service.PublndMngVO;

@Service("publndMngService")
public class PublndMngServiceImpl implements PublndMngService {
	
	@Resource(name = "publndMngDAO")
	private PublndMngDAO publndMngDAO;
	
	@Override
	public List<AdministAssetsVO> selectPublndInfoList(PublndMngVO publndMngVO) {
		List<AdministAssetsVO> result = null;
		
		result = publndMngDAO.selectPublndInfoList(publndMngVO);
		
		return result;
	}

	@Override
	public int selectPublndInfoListTotalCnt(PublndMngVO publndMngVO) {
		int result = 0;
		
		result = publndMngDAO.selectPublndInfoListTotalCnt(publndMngVO);
		
		return result;
	}

	@Override
	public List<PublndMngVO> selectPublndPnuInfoList(PublndMngVO publndMngVO) {
		List<PublndMngVO> result = null;
		
		int pageNo = 0;
		pageNo = publndMngVO.getPageNo();
		if (pageNo != 0) {
			pageNo *= 10;
		}
		publndMngVO.setPageNo(pageNo);
		
		result = publndMngDAO.selectPublndPnuInfoList(publndMngVO);
		
		for (int i = 0; i < result.size(); i++) {
			String pnu = "";
			pnu += result.get(i).getStdgCd();
			pnu += result.get(i).getMtnCd();
			if (result.get(i).getLnbr().length() < 4) {
				String empty = "";
				int length = result.get(i).getLnbr().length();
				for (int j = 0; j < 4 - length; j++) {
					empty += "0";
				}
				pnu += empty + result.get(i).getLnbr();
			} else {
				pnu += result.get(i).getLnbr();
			}
			if (result.get(i).getHo().length() < 4) {
				String empty = "";
				int length = result.get(i).getHo().length();
				for (int j = 0; j < 4 - length; j++) {
					empty += "0";
				}
				pnu += empty + result.get(i).getHo();
			} else {
				pnu += result.get(i).getHo();
			}
			result.get(i).setPnu(pnu);
		}
		
		return result;
	}

	@Override
	public List<String> selectPublndMngYearList() {
		List<String> result = null;
		
		result = publndMngDAO.selectPublndMngYearList();
		
		return result;
	}

}
