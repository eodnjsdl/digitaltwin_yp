package egiskorea.com.lyr.dtcv.service;

/**
 * @Description 데이터 변환을 관리하는 service 클래스
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

public interface DataConversionService {

	/**
	 * @Description  변환 데이터 등록
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.02.07
	 * @param mapsData
	 */
	public void insertDataConversion(MapsData mapsData);

	/**
	 * @Description 변환 진행율 등록 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.02.08
	 * @param convertProgress
	 */
	public void insertConvertProgress(ConvertProgress convertProgress);

	/**
	 * @Description csv 워커 등록 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.02.08
	 * @param workerCsvItem
	 */
	public void insertWorkerCsvItem(WorkerCsvItem workerCsvItem);

	/**
	 * @Description progress 상태 값 확인 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.03.21
	 * @return mapsData
	 */
	public ConvertProgress selectProgress(MapsData mapsData);

	/**
	 * @Description progress 상태에 따른 state update 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.03.21
	 * @param mapsData
	 */
	public void updateDataConversion(MapsData mapsData);

}
