package egiskorea.com.mngr.sver.service.impl;

import egiskorea.com.cmm.service.CmmUtils;
import egiskorea.com.mngr.sver.service.MapServiceManageService;
import egiskorea.com.mngr.sver.service.MapServiceVO;
import egovframework.com.cmm.EgovWebUtil;
import egovframework.com.cmm.service.EgovProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


/**
 * @description : 지도서비스 관리 service 구현부 클래스
 * @packageName : egiskorea.com.mngr.sver.service
 * @Class : MapServiceManageServiceImpl
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022-02-16
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 * 수정일               수정자            수정내용
 * ----------   --------   ---------------------------
 * 2022-02-16		이준호	최초 생성
 *
 */
@Service(value = "mapServiceManageService")
public class MapServiceManageServiceImpl implements MapServiceManageService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MapServiceManageServiceImpl.class);

    @Resource(name = "mapServiceManageDAO")
    private MapServiceManageDAO mapServiceManageDAO;

    /**
     * @Description 지도서비스 관리 목록 조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return List(MapServiceVO) 지도서비스 관리 목록
     * @throws Exception
     */
    public List<MapServiceVO> selectMapServiceManageList(MapServiceVO mapServiceVO) throws Exception {
        return mapServiceManageDAO.selectMapServiceManageList(mapServiceVO);
    }

    /**
     * @Description 지도서비스 관리 목록 갯수
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return int(지도서비스 전체목록 갯수)
     * @throws Exception
     */
    public int selectMapServiceManageListCnt(MapServiceVO mapServiceVO) throws Exception {
        return mapServiceManageDAO.selectMapServiceManageListCnt(mapServiceVO);
    }

    /**
     * @Description 지도서비스 관리 등록
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int insertMapServiceManage(MapServiceVO mapServiceVO) {
        int affectedRow = 0;

        try {
            affectedRow = mapServiceManageDAO.insertMapServiceManage(mapServiceVO);
            if ("Y".equals(mapServiceVO.getBasicAt())) {
                updateMapServiceBasicAt("N", mapServiceVO.getMapserviceId());
            }
        } catch (Exception e) {
            LOGGER.info("-----------지도서비스관리 등록 실패-----------");
            LOGGER.debug(e.getMessage());
        }

        return affectedRow;
    }

    /**
     * @Description 지도서비스 관리 상세조회
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return MapServiceVO(지도서비스)
     * @throws Exception
     */
    public MapServiceVO selectMapServiceManage(MapServiceVO mapServiceVO) throws Exception {
        return mapServiceManageDAO.selectMapServiceManage(mapServiceVO);
    }

    /**
     * @Description 지도서비스 관리 수정
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int updateMapServiceManage(MapServiceVO mapServiceVO) {
        int affectedRow = 0;

        try {
            affectedRow = mapServiceManageDAO.updateMapServiceManage(mapServiceVO);
            if ("Y".equals(mapServiceVO.getBasicAt())) {
                updateMapServiceBasicAt("N", mapServiceVO.getMapserviceId());
            }
        } catch (Exception e) {
            LOGGER.info("-----------서비스지도관리 수정 실패-----------");
            LOGGER.debug(e.getMessage());
        }

        return affectedRow;
    }

    /**
     * @Description 지도서비스 관리 삭제
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.16
     * @param mapServiceVO
     * @return affected Rows(쿼리 성공 수 반환)
     * @throws Exception
     */
    public int deleteMapServiceManage(MapServiceVO mapServiceVO) {
        int affectedRow = 0;

        try {
            /**
             * 첨부파일 있을 경우 첨부파일 삭제후 디비 삭제처리 해주기.
             */
            MapServiceVO oldMapServiceVO = mapServiceManageDAO.selectMapServiceManage(mapServiceVO);
            fileDelete(oldMapServiceVO);

            affectedRow = mapServiceManageDAO.deleteMapServiceManage(mapServiceVO);
        } catch (Exception e) {
            LOGGER.info("-----------지도서비스관리 삭제 실패-----------");
            LOGGER.debug(e.getMessage());
        }

        return affectedRow;
    }



    /**
     * @Description 업로드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param multipartFile
     * @param mapServiceVO
     * @return {true|false} 성공시 true, 실패시 false
     */
    public boolean fileUpload(MultipartFile multipartFile, MapServiceVO mapServiceVO) {

        boolean isUpoad = false; //업로드 성공여부
        String path = EgovProperties.getProperty("Globals.fileStorePath"); //업로드 경로

        /* 저장될 파일 이름 생성 */
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddhhmmssSSS");
        String timeStamp = LocalDateTime.now().format(formatter);
        String originalFileNm = multipartFile.getOriginalFilename();
        String extension = StringUtils.getFilenameExtension(originalFileNm).toLowerCase(); //파일 확장자
        String streFileNm = "MAPSERVICE_" + timeStamp + "0." + extension;

        if (CmmUtils.mkdir(path)) { //폴더가 있을 경우(없을 경우 정상적으로 생성후 true반환)
            File file = new File(EgovWebUtil.filePathBlackList(path + streFileNm));
            try {
                FileCopyUtils.copy(multipartFile.getBytes(), file);
                if (file.exists()) { //정상적으로 업로드 성공시
                    mapServiceVO.setOriginalFileNm(originalFileNm);
                    mapServiceVO.setStreFileNm(streFileNm);
                    isUpoad = true;
                }
            } catch (IOException e) {
                LOGGER.info("-----------지도서비스 파일 업로드 실패-----------");
                LOGGER.debug(e.getMessage());
            }
        }

        return isUpoad;
    }

    /**
     * @Description 첨부파일 삭제후 디비도 업데이트 해주는 메소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.02.24
     * @param oldMapServiceVO
     * @throws Exception
     */
    public int fileDelete(MapServiceVO oldMapServiceVO) {
        int affectedRow = 0;

        String path = EgovProperties.getProperty("Globals.fileStorePath"); //업로드 경로
        if (org.apache.commons.lang.StringUtils.isNotBlank(oldMapServiceVO.getStreFileNm())) { //디비에 첨부파일 있을 경우
            File file = new File(EgovWebUtil.filePathBlackList(path + oldMapServiceVO.getStreFileNm()));
            if (file.isFile()) { //실제로 파일이 있을 경우
                if (file.delete()) { //정상적으로 파일이 삭제 됬을 경우
                    try {
                        affectedRow = mapServiceManageDAO.updateMapServiceManageFileDelete(oldMapServiceVO);
                    } catch (Exception e) {
                        LOGGER.info("-----------지도서비스 파일삭제 후 파일명 업데이트 실패-----------");
                        LOGGER.debug(e.getMessage());
                    }
                }
            }
        }
        return affectedRow;
    }

    /**
     * @Description mapserviceId값을 포함하지 않는 배경지도사용여부 값 변경 해주는 메소드
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.04.08
     * @param basicAt
     * @param mapserviceId
     * @throws Exception
     */
    private void updateMapServiceBasicAt(String basicAt, String mapserviceId) throws Exception {
        MapServiceVO mapServiceVO = new MapServiceVO();
        mapServiceVO.setBasicAt(basicAt);
        mapServiceVO.setMapserviceId(mapserviceId);
        mapServiceManageDAO.updateMapServiceBasicAt(mapServiceVO);
    }

}
