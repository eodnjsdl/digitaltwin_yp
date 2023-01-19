package egiskorea.com.cmt.dwld.service;

/**
 * 
 * @Description 데이터 다운로드 vo 
 * @author 최원석
 * @since 2022.01.30
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.30		이름기입	최초 생성
 *  </pre>
 */
public class DataDownloadVO {

  /** 타입 */
  private String type;

  /** 데이터 아이이디 목록 */
  private String dataIds;

  /** 버퍼 */
  private Integer buffer;

  /** WKT */
  private String wkt;

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getDataIds() {
    return dataIds;
  }

  public void setDataIds(String dataIds) {
    this.dataIds = dataIds;
  }

  public Integer getBuffer() {
    return buffer;
  }

  public void setBuffer(Integer buffer) {
    this.buffer = buffer;
  }

  public String getWkt() {
    return wkt;
  }

  public void setWkt(String wkt) {
    this.wkt = wkt;
  }
}
