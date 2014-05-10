<?php
//path
define('ROOT_PATH',	'.'.DIRECTORY_SEPARATOR);
define('SRC_PATH',	ROOT_PATH.'src'.DIRECTORY_SEPARATOR);

//result code
define('CODE_OK', 0);
define('CODE_FAIL', -1);

include_once(SRC_PATH.DIRECTORY_SEPARATOR.'common.function.php');
include_once(SRC_PATH.DIRECTORY_SEPARATOR.'common.config.php');
//get post code



//get file code



if(!(isset($_GET['C']) && isset($_GET['A']))) {
	showMsg('no C or A');
}

$CONTROLLER = $_GET['C'];
$ACTION = $_GET['A'];

if(strlen($CONTROLLER)) {
	include_once(SRC_PATH.'controller'.DIRECTORY_SEPARATOR.$CONTROLLER.'.class.php');
}

$CLASS = new $CONTROLLER;
$CLASS->$ACTION();





?>