package egovframework.com.uss.umt.service;

import egovframework.com.cmm.ComDefaultVO;

public class DeptManageVO extends ComDefaultVO {

	private static final long serialVersionUID = 1L;
	private String orgnztId;
	private String orgnztNm;
	private String orgnztDc;
	private String orgnztCreatDe;
	private String groupId;
	private String groupNm;
	
	/**
	 * @return the orgnztId
	 */
	public String getOrgnztId() {
		return orgnztId;
	}
	/**
	 * @param orgnztId the orgnztId to set
	 */
	public void setOrgnztId(String orgnztId) {
		this.orgnztId = orgnztId;
	}
	/**
	 * @return the orgnztNm
	 */
	public String getOrgnztNm() {
		return orgnztNm;
	}
	/**
	 * @param orgnztNm the orgnztNm to set
	 */
	public void setOrgnztNm(String orgnztNm) {
		this.orgnztNm = orgnztNm;
	}
	/**
	 * @return the orgnztDc
	 */
	public String getOrgnztDc() {
		return orgnztDc;
	}
	/**
	 * @param orgnztDc the orgnztDc to set
	 */
	public void setOrgnztDc(String orgnztDc) {
		this.orgnztDc = orgnztDc;
	}
	public String getOrgnztCreatDe() {
		return orgnztCreatDe;
	}
	public void setOrgnztCreatDe(String orgnztCreatDe) {
		this.orgnztCreatDe = orgnztCreatDe;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public String getGroupNm() {
		return groupNm;
	}
	public void setGroupNm(String groupNm) {
		this.groupNm = groupNm;
	}
	
	
}
