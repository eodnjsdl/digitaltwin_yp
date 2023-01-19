package egiskorea.com.lyr.dtcv.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.lyr.dtcv.service.ConvertProgress;
import egiskorea.com.lyr.dtcv.service.DataConversionService;
import egiskorea.com.lyr.dtcv.service.MapsData;
import egiskorea.com.lyr.dtcv.service.WorkerCsvItem;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 데이터 변환을 관리하는 serviceImpl 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.12.08
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.08   이상화           최초 생성
 *  </pre>
 */

@Service("dataConversionService")
public class DataConversionServiceImpl extends EgovAbstractServiceImpl implements DataConversionService{	
	@Resource(name = "dataConversionDAO")
	private DataConversionDAO dataConversionDAO;
	
	/**
	 * @Description  변환 데이터 등록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.02.07
	 * @param mapsData
	 */
	public void insertDataConversion(MapsData mapsData) {
		dataConversionDAO.insertDataConversion(mapsData);
	}
	
	/**
	 * @Description 변환 진행율 등록 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.02.08
	 * @param convertProgress
	 */
	public void insertConvertProgress(ConvertProgress convertProgress) {
		dataConversionDAO.insertConvertProgress(convertProgress);
	}
	
	/**
	 * @Description csv 워커 등록 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.02.08
	 * @param workerCsvItem
	 */
	public void insertWorkerCsvItem(WorkerCsvItem workerCsvItem) {
		dataConversionDAO.insertWorkerCsvItem(workerCsvItem);
	}
	
	/**
	 * @Description progress 상태 값 확인 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.03.21
	 * @return convertProgress
	 */
	public ConvertProgress selectProgress(MapsData mapsData) {
		return dataConversionDAO.selectProgress(mapsData);
	}
	
	/**
	 * @Description progress 상태에 따른 state update 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.03.21
	 * @param convertProgress
	 */
	public void updateDataConversion(MapsData mapsData) {
		dataConversionDAO.updateDataConversion(mapsData);
	}
}
