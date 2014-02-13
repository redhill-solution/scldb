<?php
	//+-----------------------------------------------------------------------------------------+
	//|		Session-Functions																	|
	//+-----------------------------------------------------------------------------------------+
	session_start();
	//check if logged in
	require '../modules/db.php';
	$logout = ( ! empty( $_GET[ 'logout' ] ) ) ? $_GET[ 'logout' ] : false;
	if ( $logout == 'true' )	{
		$_SESSION['loggedout'] = 1;
	}
	if ($_SESSION['connected'] != 'true') {
		$_SESSION['illegal_access'] = 0;
		header ("Location: /login/login.php?location=/authors/list.php");
	}
	//Recive Session-Data
	$User = $_SESSION['username'];
	//---------------------------------------------------
	if( isset($_GET['tms']) && !empty($_GET['tms'])){
		$date = $_GET['tms'];
	} else {
		$date = time();
		//$date = mktime(0,0,0,5,27,2013);
	}
	$server_time = time();

	if( isset($_SESSION['output']) && !empty($_SESSION['output'])){
		echo "<script> alert(\"".$_SESSION['output']."\");  </script>";
		$_SESSION['output'] = NULL;
	}
	//+-----------------------------------------------------------------------------------------+
	//|		Settings																			|
	//+-----------------------------------------------------------------------------------------+
	// Calendar Settings
	$curr_date_color = "#003F7D";			
	//---------------------------------------------------
	//+-----------------------------------------------------------------------------------------+
	//|		Get MysqlDates																		|
	//+-----------------------------------------------------------------------------------------+
	//-----------------------------------------------------------------
	$usedLicence = 0;
	$b_row = mysql_query("SELECT p.id, e.autoren_nr, e.vorname, e.nachname, p.lizenz, p.vergeben, s.fb FROM Lizenzen p LEFT OUTER JOIN Autoren e ON e.lizenz = p.id LEFT OUTER JOIN Fachbereiche s ON s.id = e.fb"); //ORDER BY x DESC
	if(mysql_num_rows($b_row) > 0) {
		$numRows = 0;
		while($b_result = mysql_fetch_array($b_row)) {
			$Autor[$numRows]['id'] 			= $b_result[0];
			$Autor[$numRows]['autorenID'] 	= $b_result[1];
			$Autor[$numRows]['vorname'] 	= $b_result[2];
			$Autor[$numRows]['nachname'] 	= $b_result[3];
			$Autor[$numRows]['lizenz'] 		= $b_result[4];
			$Autor[$numRows]['vergeben'] 	= $b_result[5];
			$FBpart							= explode(" ", $b_result[6]);
			$Autor[$numRows]['fb'] 			= $FBpart[0];

			if($Autor[$numRows]['vorname'] == null) $Autor[$numRows]['vorname'] = "";
			if($Autor[$numRows]['nachname'] == null) {
				$Autor[$numRows]['nachname'] = "";
			} else {
				$usedLicence++;
			}
			//if($Autor[$numRows]['lizenz'] == null) $Autor[$numRows]['lizenz'] = "";
			if($Autor[$numRows]['fb'] == null) $Autor[$numRows]['fb'] = "";

			$numRows++;
		}
	}
	//echo "<script> alert(\"".$Autor."\"); </script>";
	//---------------------------------------------------------------------------

	//-------------------------------------------------------------------------------------------
?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>E-Klausuren DB - Lizenzen</title>
</head>
<style type="text/css">
  @import "../css/font.css";
  @import "../css/navi.css";
  @import "../css/mainBody.css";
  @import "../css/authors.css";
  /*@import "/modules/jquery/css/smoothness/jquery-ui-1.10.3.custom.css";*/
</style>
<script src="../modules/_static/jquery-1.9.1.js"></script>
<script src="../modules/_static/jquery-migrate-1.2.1.min.js"></script>
<script src="../modules/jsPDF/dist/jspdf.min.js"></script>
<body>
<script>
if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

var Autoren 		= new Array();
var UserName		= <?php echo json_encode($_SESSION['username']); ?>;
var usedLicence		= <?php echo json_encode($usedLicence); ?>;

Autoren			= <?php echo json_encode($Autor); ?>;

</script>
<script type="text/javascript" language="javascript" src="list.js">
</script>
<script src="../modules/navi.js"></script>
<script> navi("info_box",3); </script>
</body>
</html>