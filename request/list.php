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
		header ("Location: ../login/login.php?location=/calendar/calendar.php");
		exit;
	}
	//Recive Session-Data
	$User = $_SESSION['username'];
	//+-----------------------------------------------------------------------------------------+
	//|		Save Data																			|
	//+-----------------------------------------------------------------------------------------+
	if (isset($_POST['ctrl_save']) && !empty($_POST['ctrl_save'])) {
		//echo "<script> alert(\"UPDATE KlausurBlock SET genehmigt = 0 WHERE klausur_nr = ".$_POST['id']."\");</script>";
		mysql_query("UPDATE KlausurBlock SET genehmigt = 1 WHERE klausur_nr = ".$_POST['id']); 

		//header("Location: ./edit.php?id=".$Lid);

	}
	if (isset($_POST['ctrl_delete']) && !empty($_POST['ctrl_delete'])) {
		//echo "<script> alert(\"UPDATE KlausurBlock SET genehmigt = 0 WHERE klausur_nr = ".$_POST['id']."\");</script>";
		mysql_query("DELETE FROM KlausurBlock WHERE klausur_nr = ".$_POST['id']); 

		//header("Location: ./edit.php?id=".$Lid);

	}
	//+-----------------------------------------------------------------------------------------+
	//|		GET Data																			|
	//+-----------------------------------------------------------------------------------------+
	$sqlDates = mysql_query("SELECT e.klausur_nr, e.klausur_name, e.startTime, e.endTime, e.dozent, e.anzahlTeilnehmer, e.erstellt, s.fb FROM KlausurBlock e INNER JOIN Fachbereiche s ON s.id = e.fb WHERE e.genehmigt = 0");
	if(mysql_num_rows($sqlDates) > 0) {
		$numRows = 0;
		while($b_result = mysql_fetch_array($sqlDates)) {
			$Dates[$numRows]['id'] 			= $b_result[0];
			$Dates[$numRows]['name'] 		= $b_result[1];
			$Dates[$numRows]['startTime'] 	= date_create($b_result[2])->getTimestamp();
			$Dates[$numRows]['endTime'] 	= date_create($b_result[3])->getTimestamp();
			$Dates[$numRows]['dozent'] 		= $b_result[4];
			$Dates[$numRows]['teilnehmer'] 	= $b_result[5];
			$Dates[$numRows]['erstellt'] 	= date_create($b_result[6])->getTimestamp();
			$Dates[$numRows]['fb'] 			= $b_result[7];

			$numRows++;
		}
	}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>E-Klausuren DB - Termin Anträge</title>
</head>
<style type="text/css">
  @import "../css/font.css";
  @import "../css/navi.css";
  @import "../css/mainBody.css";
  @import "../css/request.css";
  @import "../modules/datepicker/css/smoothness/jquery-ui-1.10.3.custom.css";
  @import "../modules/select2/select2.css";
</style>
<script type="text/javascript" src="../modules/_static/jquery-1.9.1.js"></script>
<script type="text/javascript" src="../modules/_static/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="../modules/select2/select2.js"></script>
<body>
<div align='center' id='center'>
	<div id='container'>
		<div id='info_box'>
			<div id='toolBox'></div>
			<div id='mainBlock' align='center'>
				<form id='save' method='post' ><input type='hidden' name='ctrl_NotSave' id='submitParam' value='true'></form>
			</div>
		</div>
	</div>
</div>
<script>
	var dates = new Array(); 

	dates = <?php echo json_encode($Dates); ?>; 
</script>
<script type="text/javascript" src="./list.js"></script>
<script src="../modules/navi.js"></script>
<script> navi("info_box",4); </script>
<br />
</body>
</html>