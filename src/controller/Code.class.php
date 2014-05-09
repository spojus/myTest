<?php
//class
class Code {
	
	function __construct() {}
	
	function __destruct() {}
	
	function initPage() {
		echo 'This is initPage, please Submit';
		return CODE_OK;
	}
	
	function submit() {
		$content = $_POST['code'];
		$url = $this->saveAsTemp($content);
		gotoUrl($url);
	}
	
	function readLastCode() {
		$filePath = $this->getLastCodePath();
		$content = file_get_contents($filePath);
		return ajaxReturn(CODE_OK, $content);
	}
	
	//获取最后文件路径
	private function getLastCodePath() {
		return ROOT_PATH.'code/temp/temp.php';
	}
	
	//保存临时文件
	private function saveAsTemp($content) {
		$tmpPath = ROOT_PATH.'code/temp/';
		$fileName = 'temp';
		$extName = 'php';
		
		$dot = strlen($extName) ? '.' : '';
		$filePath = $tmpPath.$fileName.$dot.$extName;
		$length = file_put_contents($filePath, $content);
		if($length !== strlen($content)) {
			showMsg('write failed!');
		}
		
		return $filePath;
	}
	
}
