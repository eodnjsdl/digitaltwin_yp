package egiskorea.com.cmm.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import egiskorea.com.cmm.service.CompressService;

/**
 * @Description 압축 서비스 구현 클래스
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
 *  2022.01.30		최원석	최초 생성
 *  </pre>
 */

@Service("compressService")
public class CompressServiceImpl implements CompressService {

  /**
   * 폴더 압축
   */
  @Override
  public void compressFolder(String folderPath, String zipPath) throws Exception {
    File zipFile = new File(zipPath);
    zipFile.createNewFile();
    ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(zipFile));
    File folder = new File(folderPath);
    for (File file : folder.listFiles()) {
      ZipEntry zipEntry = new ZipEntry(file.getName());
      zipOutputStream.putNextEntry(zipEntry);
      InputStream is = FileUtils.openInputStream(file);
      IOUtils.copy(is, zipOutputStream);
      is.close();
    }
    zipOutputStream.closeEntry();
    zipOutputStream.close();
  }
}
