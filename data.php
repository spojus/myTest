<?php
//path
define('ROOT_PATH',	'./');
define('SRC_PATH',	ROOT_PATH.'src/');

//result code
define('CODE_OK', 0);
define('CODE_FAIL', -1);

include_once(SRC_PATH.'/common.function.php');
include_once(SRC_PATH.'/common.config.php');
//get post code



//get file code



if(!(isset($_GET['C']) && isset($_GET['A']))) {
	showMsg('no C or A');
}

$CONTROLLER = $_GET['C'];
$ACTION = $_GET['A'];

if(strlen($CONTROLLER)) {
	include_once(SRC_PATH.'controller/'.$CONTROLLER.'.class.php');
}

$CLASS = new $CONTROLLER;
$CLASS->$ACTION();





?>