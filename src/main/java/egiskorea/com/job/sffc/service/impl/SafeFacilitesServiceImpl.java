package egiskorea.com.job.sffc.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import egiskorea.com.job.sffc.service.SafeFacilitesService;
import egiskorea.com.job.sffc.service.SafeFacilitesVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("safeFacilitesService")
public class SafeFacilitesServiceImpl implements SafeFacilitesService {

  @Override
  public List<EgovMap> selectWtlList(SafeFacilitesVO vo) {
    return null;
  }

  @Override
  public int selectWtlCnt(SafeFacilitesVO vo) {
    return 0;
  }}
