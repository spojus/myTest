<?php

function showMsg($message, $type='exit') {
	exit($message);
}

function gotoUrl($url, $type='header') {
	switch($type){
		case 'header':
			header('Location: '.$url);
			break;
		default:
			echo '<script>location.href="'.$url.'"</script>';
	}
}

// 循环创建目录 
function mk_dir($dir, $mode = 0755) {
	if(is_dir($dir) || @mkdir($dir, $mode))
		return true; 
	if(!mk_dir(dirname($dir), $mode))
		return false; 
	return @mkdir($dir, $mode); 
}

function ajaxReturn($resultCode, $data, $message='', $type='json') {
	$contentTypes = array(
		'json'=>'application/json',
		'xml'=>'application/xml',
		'stream'=>'application/octet-stream',
		'text'=>'text/plain',
		'html'=>'text/html',
	);
	
	$contentType = $contentTypes[$type];
	header('Content-Type: '.$contentType);
	if($type === 'json') {
		$ret = array();
		$ret['code'] = $resultCode;
		$ret['data'] = $data;
		if($message === '') {
			if($resultCode === CODE_OK) {
				$ret['message'] = 'Operate Success!';
			}else{
				$ret['message'] = 'Operate Error!';
			}
		}else{
			$ret['message'] = $message;
		}
		
		echo json_encode($ret);
	}
	return $resultCode;
}