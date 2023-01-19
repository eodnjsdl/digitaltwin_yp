package egiskorea.com.anls.spce.service;

/**
 * 
 * @Description 공간 분석 결과 vo 
 * @author 최원석
 * @since 2022.02.05
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.05		최원석	최초 생성
 *  </pre>
 */
public class SpaceAnalysisResultVO {

  /** 코드 */
  private String code;

  /** 명칭 */
  private String name;

  /** 건 수 */
  private Integer count;

  /** 건 수 or 길이 or 면적 */
  private Double value;

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getCount() {
    return count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }

  public Double getValue() {
    return value;
  }

  public void setValue(Double value) {
    this.value = value;
  }
}
