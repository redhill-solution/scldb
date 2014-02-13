<?php
	//+-----------------------------------------------------------------------------------------+
	//|		Session-Functions																	|
	//+-----------------------------------------------------------------------------------------+
	session_start();
	
	//check if logged in
	$logout = ( ! empty( $_GET[ 'logout' ] ) ) ? $_GET[ 'logout' ] : false;
	if ( $logout == 'true' )	{
		$_SESSION['loggedout'] = 1;
	}
	if ($_SESSION['connected'] != 'true') {
		$_SESSION['illegal_access'] = 0;
		header ("Location: ./login/login.php");
	} //else header ("Location: overview.php")

	//user_info & logout table
	$User = $_SESSION['username'];	
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>E-Klausuren DB - Startseite</title>
<style type="text/css">
  @import "./css/font.css";
  @import "./css/navi.css";
  @import "./css/mainBody.css";
  @import "./modules/datepicker/css/smoothness/jquery-ui-1.10.3.custom.css";
  @import "./css/overview.css";
  @import "./modules/select2/select2.css";
</style>
<script src="./modules/_static/jquery-1.9.1.js"></script>
<script src="./modules/_static/jquery-migrate-1.2.1.min.js"></script>
<script src="./modules/select2/select2.js"></script>
<script src="./modules/datepicker/js/jquery-ui-1.10.3.custom.min.js"></script>
</head>
<body>
	<div align='center' style='height: 100%;' >
		<div id='container'>
			<div id='info_box'>
				<div id='toolBox'>
				
				</div>
				<div id='mainBlock' align='center'>

				</div>
			</div>
		</div>
	</div>
<script src="./modules/navi.js"></script>
<script> navi("info_box",0); </script>
</body>
</html>