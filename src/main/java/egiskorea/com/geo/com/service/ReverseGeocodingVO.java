package egiskorea.com.geo.com.service;
/**
 * @description : ReverseGeocodingVO 클래스
 * @packageName : egiskorea.com.geo.com.service
 * @Class : ReverseGeocodingVO
 * @author SI사업부문 서비스개발팀 이준호
 * @since 2022-07-26
 * @version 1.0
 * @see
 * << 개정이력(Modification Information) >>
 *
 * 수정일               수정자            수정내용
 * ----------   --------   ---------------------------
 * 2022-07-26		이준호	최초 생성
 */

public class ReverseGeocodingVO {
    /* wkt(x,y) 5174 좌표 */
    private String wkt5174;

    /* wkt(x,y) 5179 좌표 */
    private String wkt5179;

    public String getWkt5174() {
        return wkt5174;
    }

    public void setWkt5174(String wkt5174) {
        this.wkt5174 = wkt5174;
    }

    public String getWkt5179() {
        return wkt5179;
    }

    public void setWkt5179(String wkt5179) {
        this.wkt5179 = wkt5179;
    }
}
