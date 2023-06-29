package egiskorea.com.job.adas.asmng.service;

import org.springframework.stereotype.Service;

@Service("administAssetsCSVUploading")
public final class AdministAssetsCSVUploading {
	
	private AdministAssetsCSVUploading() {
		
	}
	
	private volatile static AdministAssetsCSVUploading administAssetsCSVInstance = null;
	
	private int dataCountForProgress = 0;
	
	private boolean isUploading = false;
	
	public static AdministAssetsCSVUploading getInstance() {
		if (administAssetsCSVInstance == null) {
			synchronized (AdministAssetsCSVUploading.class) {
				if (administAssetsCSVInstance == null) {
					administAssetsCSVInstance = new AdministAssetsCSVUploading();
				}
			}
		}
		return administAssetsCSVInstance;
	}
	
	public int getDataCountForProgress() {
		return dataCountForProgress;
	}
	
	public void setDataCountForProgress(int dataCountForProgress) {
		this.dataCountForProgress = dataCountForProgress;
	}
	
	public boolean getIsUploading() {
		return isUploading;
	}
	
	public void setIsUploading(boolean isUploading) {
		this.isUploading = isUploading;
	}
}
