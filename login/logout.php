<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>
<style type="text/css">
  @import "./css/font.css";
</style>
<body>
<?php
	session_start();
    require '../modules/db.php';
	if ($_SESSION['connected'] != 'true') {
		$_SESSION['illegal_access'] = 1;
		header ("Location: ../");
	}
	
	$logout = ( ! empty( $_GET[ 'logout' ] ) ) ? $_GET[ 'logout' ] : false;
	if ( $logout == 'true' )	{
		session_destroy();
		header("Location: ../index.php?logout=true");
		exit;
	}
	header ("Location: ../");
?>
</body>
</html>