/***********************************
* 공유재산 실태조사서 ServiceImpl
* @author  : 이혜인
* @since   : 2023.03.05
* @version : 1.0
************************************/
package egiskorea.com.job.adas.publnd.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.sun.star.awt.Rectangle;

import egiskorea.com.cmm.service.impl.CmmnDAO;
import egiskorea.com.job.adas.publnd.service.PbprtAccdtWrinvstgService;
import egiskorea.com.job.adas.publnd.service.PbprtAccdtWrinvstgVO;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.com.cmm.service.FileVO;
import kr.dogfoot.hwplib.object.HWPFile;
import kr.dogfoot.hwplib.object.bodytext.Section;
import kr.dogfoot.hwplib.object.bodytext.control.ControlTable;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.CtrlHeaderGso;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.gso.GsoHeaderProperty;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.gso.HeightCriterion;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.gso.HorzRelTo;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.gso.ObjectNumberSort;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.gso.RelativeArrange;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.gso.TextFlowMethod;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.gso.TextHorzArrange;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.gso.VertRelTo;
import kr.dogfoot.hwplib.object.bodytext.control.ctrlheader.gso.WidthCriterion;
import kr.dogfoot.hwplib.object.bodytext.control.gso.ControlRectangle;
import kr.dogfoot.hwplib.object.bodytext.control.gso.GsoControlType;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponent.ShapeComponentNormal;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponent.lineinfo.LineArrowShape;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponent.lineinfo.LineArrowSize;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponent.lineinfo.LineEndShape;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponent.lineinfo.LineInfo;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponent.lineinfo.LineType;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponent.lineinfo.OutlineStyle;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponent.shadowinfo.ShadowInfo;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponent.shadowinfo.ShadowType;
import kr.dogfoot.hwplib.object.bodytext.control.gso.shapecomponenteach.ShapeComponentRectangle;
import kr.dogfoot.hwplib.object.bodytext.control.table.Cell;
import kr.dogfoot.hwplib.object.bodytext.control.table.Row;
import kr.dogfoot.hwplib.object.bodytext.paragraph.Paragraph;
import kr.dogfoot.hwplib.object.bodytext.paragraph.text.HWPChar;
import kr.dogfoot.hwplib.object.bodytext.paragraph.text.HWPCharNormal;
import kr.dogfoot.hwplib.object.bodytext.paragraph.text.HWPCharType;
import kr.dogfoot.hwplib.object.docinfo.BinData;
import kr.dogfoot.hwplib.object.docinfo.bindata.BinDataCompress;
import kr.dogfoot.hwplib.object.docinfo.bindata.BinDataState;
import kr.dogfoot.hwplib.object.docinfo.bindata.BinDataType;
import kr.dogfoot.hwplib.object.docinfo.borderfill.fillinfo.FillInfo;
import kr.dogfoot.hwplib.object.docinfo.borderfill.fillinfo.ImageFill;
import kr.dogfoot.hwplib.object.docinfo.borderfill.fillinfo.ImageFillType;
import kr.dogfoot.hwplib.object.docinfo.borderfill.fillinfo.PictureEffect;
import kr.dogfoot.hwplib.reader.HWPReader;
import kr.dogfoot.hwplib.writer.HWPWriter;

@Service
public class PbprtAccdtWrinvstgServiceImpl implements PbprtAccdtWrinvstgService {

	/* 공통 DAO */
	@Resource(name = "cmmnDao")
	CmmnDAO cmmnDao;
	
	/** 한글 파일 템플릿 경로 */
	public static final String HWP_PATH = EgovProperties.getProperty("Globals.publnd.hwpStorePath");
	/** 다운로드 파일명 */
	public static final String HWP_FILE_NM = "공유재산실태_조사서";
	
    //private static final String imageFilePath = "C:" + File.separator + "sample_hwp" + File.separator + "sample.jpg";
    //private static final String imageFileExt = "jpg";
    private static final BinDataCompress compressMethod = BinDataCompress.ByStorageDefault;

    private int INSTANCE_ID = 0x5bb840e1;
    private int streamIndex;
    private int binDataID;

    private ControlRectangle rectangle;
    private Rectangle shapePosition = new Rectangle(0, 0, 75, 75);
    

	@Override
	public void downloadWrinvstgToHwpFile(PbprtAccdtWrinvstgVO pbprtAccdtWrinvstgVO, HttpServletRequest request, HttpServletResponse response) throws Exception {

		// 공유재산실태 조사서 정보 조회
		int publndNo = pbprtAccdtWrinvstgVO.getPublndNo();
		pbprtAccdtWrinvstgVO = cmmnDao.selectOne("publndMng.selectPbprtAccdtWrinvstg", publndNo);
		
		// 공유재산실태 조사서 템플릿 파일
		String hwpFilePath = request.getSession().getServletContext().getRealPath(HWP_PATH) + "pbprtAccdtWrinvstg_tmplat.hwp";
		
		// 한글 파일 읽기
		HWPFile hwpFile = HWPReader.fromFile(hwpFilePath);
		// 본문 조회
		Section s = hwpFile.getBodyText().getSectionList().get(0);
		// 테이블 객체 조회
		ControlTable table = (ControlTable) (s.getParagraph(4).getControlList().get(0));
		
		String atchFileId = null;
		String imageFilePath = "";
	    String imageFileExt = "";
	    String satlitPhotoSn = null;	
	    String sptPhotoSn = null;

    	atchFileId = pbprtAccdtWrinvstgVO.getAtchFileId();
    	FileVO fileDtlInfo = new FileVO();
    	
		int rowCount = table.getRowList().size();
        for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            if (rowIndex > 0) {
                Row row = table.getRowList().get(rowIndex);
                for (Cell cell : row.getCellList()) {
                	Paragraph text = cell.getParagraphList().getParagraph(0);
                	String textValue = "";
                	if (text.getText() != null) {
                		textValue = text.getNormalString();
                	}
                	
                	// VO의 key, value 가져오기
                	Object obj = pbprtAccdtWrinvstgVO;
                    for (Field field : obj.getClass().getDeclaredFields()) {
                        field.setAccessible(true);
                        // VO value
        				Object value = field.get(obj);
        				
        				// VO field 값과 hwp template의 text를 비교
        				if (textValue.equals(field.getName()) && value != null) {
        					if (textValue.equals("bsrpCn") || textValue.equals("exmnr")) {
        						value = mdfcnText(value.toString());
        					}
        		            changeParagraphText(text, value.toString());
        				} else if (textValue.equals(field.getName()) && value == null) {
        					changeParagraphText(text, "");
        				}
                    }
                    
                    // 이미지 파일 처리
                    if (textValue.equals("satlitPhoto")) {
                    	satlitPhotoSn = String.valueOf(pbprtAccdtWrinvstgVO.getSatlitPhotoSn());
                    	if (atchFileId != null && satlitPhotoSn != null && !satlitPhotoSn.equals("9")) {
                    		pbprtAccdtWrinvstgVO.setFileSn(String.valueOf(pbprtAccdtWrinvstgVO.getSatlitPhotoSn()));
                    		
                    		fileDtlInfo = cmmnDao.selectOne("publndMng.selectAtchFileDtlInfo", pbprtAccdtWrinvstgVO);
                    		imageFilePath = fileDtlInfo.getFileStreCours() + File.separator + fileDtlInfo.getStreFileNm();
                    		imageFileExt = fileDtlInfo.getFileExtsn();
                    		insertShapeWithImage(hwpFile, text, imageFilePath, imageFileExt);
                    	}
                    } else if (textValue.equals("sptPhoto")) {
                    	sptPhotoSn = String.valueOf(pbprtAccdtWrinvstgVO.getSptPhotoSn());
                    	if (atchFileId != null && sptPhotoSn != null && !sptPhotoSn.equals("9")) {
                    		pbprtAccdtWrinvstgVO.setFileSn(String.valueOf(pbprtAccdtWrinvstgVO.getSptPhotoSn()));
                    		
                    		fileDtlInfo = cmmnDao.selectOne("publndMng.selectAtchFileDtlInfo", pbprtAccdtWrinvstgVO);
                    		imageFilePath = fileDtlInfo.getFileStreCours() + File.separator + fileDtlInfo.getStreFileNm();
                    		imageFileExt = fileDtlInfo.getFileExtsn();
                    		insertShapeWithImage(hwpFile, text, imageFilePath, imageFileExt);
                    	}
                    }

                }
				 
            }
        }
        
        String fileNm = getDispositionCheck(HWP_FILE_NM, getBrowserCheck(request));
		
        response.setContentType("application/x-hwp;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileNm + ".hwp\";");
        response.flushBuffer();

        HWPWriter.toStream(hwpFile, response.getOutputStream());
		
	}
	
	
    /**
     * 브라우저 체크
     * @param request       HttpServletRequest request
     * @throws IOException, InvocationTargetException, SQLException
     */
    private static String getBrowserCheck(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");
        if (header.contains("MSIE") || header.contains("Trident")) {
            return "MSIE";
        } else if (header.contains("Chrome")) {
            return "Chrome";
        } else if (header.contains("Opera")) {
            return "Opera";
        } else if (header.contains("Firefox")) {
            return "Firefox";
        }
        return "MSIE";
    }
    
    /**
     * 브라우저별 파일명 인코딩
     *
     * @param filename
     * @param browser
     * @return String
     * @throws IOException, InvocationTargetException, SQLException
     */
    private static String getDispositionCheck(String filename, String browser)
            throws IOException, InvocationTargetException, SQLException {
        String encodedFilename = null;
        if (browser.equals("MSIE")) {
            encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
        } else if (browser.equals("Firefox")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Opera")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Chrome")) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < filename.length(); i++) {
                char c = filename.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        }
        return encodedFilename;
    }
	
    private static void changeParagraphText(Paragraph paragraph, String textValue) throws UnsupportedEncodingException {
        ArrayList<HWPChar> newCharList = getNewCharList(paragraph.getText().getCharList(), textValue);
        changeNewCharList(paragraph, newCharList);
        removeLineSeg(paragraph);
        removeCharShapeExceptFirstOne(paragraph);
    }
    
    public static ArrayList<HWPChar> getNewCharList(ArrayList<HWPChar> oldList, String textValue) throws UnsupportedEncodingException {
        ArrayList<HWPChar> newList = new ArrayList<HWPChar>();
        ArrayList<HWPChar> listForText = new ArrayList<HWPChar>();
        for (HWPChar ch : oldList) {
            if (ch.getType() == HWPCharType.Normal) {
                listForText.add(ch);
            } else {
                if (listForText.size() > 0) {
                    listForText.clear();
                    String newText = textValue;

                    newList.addAll(toHWPCharList(newText));
                }
                newList.add(ch);
            }
        }

        if (listForText.size() > 0) {
            listForText.clear();
            String newText = textValue;

            newList.addAll(toHWPCharList(newText));
        }
        return newList;
    }

    private static ArrayList<HWPChar> toHWPCharList(String text) {
        ArrayList<HWPChar> list = new ArrayList<HWPChar>();
        int count = text.length();
        if (count > 0) {
        	for (int index = 0; index < count; index++) {
        		HWPCharNormal chn = new HWPCharNormal();
        		chn.setCode((short) text.codePointAt(index));
        		list.add(chn);
        	}
        }
        return list;
    }

    private static void changeNewCharList(Paragraph paragraph, ArrayList<HWPChar> newCharList) {
        paragraph.getText().getCharList().clear();
        for (HWPChar ch : newCharList) {
            paragraph.getText().getCharList().add(ch);
        }
        paragraph.getHeader().setCharacterCount(newCharList.size());
    }

    private static void removeLineSeg(Paragraph paragraph) {
        paragraph.deleteLineSeg();
    }

    private static void removeCharShapeExceptFirstOne(Paragraph paragraph) {
        int size = paragraph.getCharShape().getPositonShapeIdPairList().size();
        if (size > 1) {
            for (int index = 0; index < size - 1; index++) {
                paragraph.getCharShape().getPositonShapeIdPairList().remove(1);
            }
            paragraph.getHeader().setCharShapeCount(1);
        }
    }
    
    private void insertShapeWithImage(HWPFile hwpFile, Paragraph cellText, String imageFilePath, String imageFileExt) throws IOException {
        addBinData(hwpFile, imageFilePath, imageFileExt);
        binDataID = addBinDataInDocInfo(streamIndex, hwpFile, imageFileExt);
        addGsoControl(hwpFile, cellText);
    }

    private void addBinData(HWPFile hwpFile, String imageFilePath, String imageFileExt) throws IOException {
        streamIndex = hwpFile.getBinData().getEmbeddedBinaryDataList().size() + 1;
        String streamName = getStreamName(imageFileExt);
        byte[] fileBinary = loadFile(imageFilePath);

        hwpFile.getBinData().addNewEmbeddedBinaryData(streamName, fileBinary, compressMethod);
    }

    private String getStreamName(String imageFileExt) {
        return "Bin" + String.format("%04X", streamIndex) + "." + imageFileExt;
    }

    private byte[] loadFile(String imageFilePath) throws IOException {
        File file = new File(imageFilePath);
        byte[] buffer = new byte[(int) file.length()];
        InputStream ios = null;
        try {
            ios = new FileInputStream(file);
            ios.read(buffer);
        } finally {
            try {
                if (ios != null)
                    ios.close();
            } catch (IOException e) {
            }
        }
        return buffer;
    }

    private int addBinDataInDocInfo(int streamIndex, HWPFile hwpFile, String imageFileExt) {
        BinData bd = new BinData();
        bd.getProperty().setType(BinDataType.Embedding);
        bd.getProperty().setCompress(compressMethod);
        bd.getProperty().setState(BinDataState.NotAccess);
        bd.setBinDataID(streamIndex);
        bd.setExtensionForEmbedding(imageFileExt);
        hwpFile.getDocInfo().getBinDataList().add(bd);
        return hwpFile.getDocInfo().getBinDataList().size();
    }

    private void addGsoControl(HWPFile hwpFile, Paragraph cellText) {
        createRectangleControlAtFirstParagraph(hwpFile, cellText);

        setCtrlHeaderGso();
        setShapeComponent();
        setShapeComponentRectangle();
    }

    private void createRectangleControlAtFirstParagraph(HWPFile hwpFile, Paragraph cellText) {
        // 문단에서 사각형 컨트롤의 위치를 표현하기 위한 확장 문자를 넣는다.
    	cellText.getText().addExtendCharForGSO();

        // 문단에 사각형 컨트롤 추가한다.
        rectangle = (ControlRectangle) cellText.addNewGsoControl(GsoControlType.Rectangle);
    }

    private void setCtrlHeaderGso() {
        CtrlHeaderGso hdr = rectangle.getHeader();
        GsoHeaderProperty prop = hdr.getProperty();
        prop.setLikeWord(false);
        prop.setApplyLineSpace(false);
        prop.setVertRelTo(VertRelTo.Para);
        prop.setVertRelativeArrange(RelativeArrange.TopOrLeft);
        prop.setHorzRelTo(HorzRelTo.Para);
        prop.setHorzRelativeArrange(RelativeArrange.TopOrLeft);
        prop.setVertRelToParaLimit(true);
        prop.setAllowOverlap(true);
        prop.setWidthCriterion(WidthCriterion.Absolute);
        prop.setHeightCriterion(HeightCriterion.Absolute);
        prop.setProtectSize(false);
        prop.setTextFlowMethod(TextFlowMethod.FitWithText);
        prop.setTextHorzArrange(TextHorzArrange.BothSides);
        prop.setObjectNumberSort(ObjectNumberSort.Figure);

        hdr.setyOffset(fromMM(shapePosition.Y));
        hdr.setxOffset(fromMM(shapePosition.X));
        hdr.setWidth(fromMM(shapePosition.Width));
        hdr.setHeight(fromMM(shapePosition.Height));
        hdr.setzOrder(0);
        hdr.setOutterMarginLeft(0);
        hdr.setOutterMarginRight(0);
        hdr.setOutterMarginTop(0);
        hdr.setOutterMarginBottom(0);
        hdr.setInstanceId(INSTANCE_ID);
        hdr.setPreventPageDivide(false);
        hdr.getExplanation().setBytes(null);
    }

    private int fromMM(int mm) {
        if (mm == 0) {
            return 1;
        }

        return (int) ((double) mm * 72000.0f / 254.0f + 0.5f);
    }

    private void setShapeComponent() {
        ShapeComponentNormal sc = (ShapeComponentNormal) rectangle.getShapeComponent();
        sc.setOffsetX(0);
        sc.setOffsetY(0);
        sc.setGroupingCount(0);
        sc.setLocalFileVersion(1);
        sc.setWidthAtCreate(fromMM(shapePosition.Width));
        sc.setHeightAtCreate(fromMM(shapePosition.Height));
        sc.setWidthAtCurrent(fromMM(shapePosition.Width));
        sc.setHeightAtCurrent(fromMM(shapePosition.Height));
        sc.setRotateAngle(0);
        sc.setRotateXCenter(fromMM(shapePosition.Width / 2));
        sc.setRotateYCenter(fromMM(shapePosition.Height / 2));

        sc.createLineInfo();
        LineInfo li = sc.getLineInfo();
        li.getProperty().setLineEndShape(LineEndShape.Flat);
        li.getProperty().setStartArrowShape(LineArrowShape.None);
        li.getProperty().setStartArrowSize(LineArrowSize.MiddleMiddle);
        li.getProperty().setEndArrowShape(LineArrowShape.None);
        li.getProperty().setEndArrowSize(LineArrowSize.MiddleMiddle);
        li.getProperty().setFillStartArrow(true);
        li.getProperty().setFillEndArrow(true);
        li.getProperty().setLineType(LineType.None);
        li.setOutlineStyle(OutlineStyle.Normal);
        li.setThickness(0);
        li.getColor().setValue(0);

        sc.createFillInfo();
        FillInfo fi = sc.getFillInfo();
        fi.getType().setPatternFill(false);
        fi.getType().setImageFill(true);
        fi.getType().setGradientFill(false);
        fi.createImageFill();
        ImageFill imgF = fi.getImageFill();
        imgF.setImageFillType(ImageFillType.FitSize);
        imgF.getPictureInfo().setBrightness((byte) 0);
        imgF.getPictureInfo().setContrast((byte) 0);
        imgF.getPictureInfo().setEffect(PictureEffect.RealPicture);
        imgF.getPictureInfo().setBinItemID(binDataID);

        sc.createShadowInfo();
        ShadowInfo si = sc.getShadowInfo();
        si.setType(ShadowType.None);
        si.getColor().setValue(0xc4c4c4);
        si.setOffsetX(283);
        si.setOffsetY(283);
        si.setTransparent((short) 0);

        sc.setMatrixsNormal();
    }

    private void setShapeComponentRectangle() {
        ShapeComponentRectangle scr = rectangle.getShapeComponentRectangle();
        scr.setRoundRate((byte) 0);
        scr.setX1(0);
        scr.setY1(0);
        scr.setX2(fromMM(shapePosition.Width));
        scr.setY2(0);
        scr.setX3(fromMM(shapePosition.Width));
        scr.setY3(fromMM(shapePosition.Height));
        scr.setX4(0);
        scr.setY4(fromMM(shapePosition.Height));
    }
    
    // HTML Entities를 줄바꿈 표시로 수정
 	private String mdfcnText(String str) {
     	str = str
     	.replaceAll("&lt;div&gt;", "\n")
     	.replaceAll("&lt;/div&gt;", "");
         return str;
     }
    
}
