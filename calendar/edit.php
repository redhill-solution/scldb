<?php 
	function formatNumber($num) {
		if($num < 10) $num = "0".$num;
		return ($num);
	}
	function convertTimeToSQLFormat($date, $hour, $minute) {
		list($DateFormat_Day,$DateFormat_Month, $DateFormat_Year) = explode('.', $date);
		if($DateFormat_Day < 10 && substr($DateFormat_Day, 0, 1) !== '0') 
			$DateFormat_Day = "0".$DateFormat_Day;
		if($DateFormat_Month < 10 && substr($DateFormat_Month, 0, 1) !== '0') 
			$DateFormat_Month = "0".$DateFormat_Month;
		$DateFormat =$DateFormat_Year."-".$DateFormat_Month."-".$DateFormat_Day;
		if($minute < 10 && substr($minute, 0, 1) !== '0') 	
			$minute 	= "0".$minute;
		if($hour < 10 && substr($hour, 0, 1) !== '0') 		
			$hour 	= "0".$hour;
		$TimeFormat	= $DateFormat." ".$hour.":".$minute.":00";
		return ($TimeFormat);
	}
	function checkNull ($inVar) {
		$retVal = $inVar;
		if(empty($retVal) || $retVal == 'null' || $retVal == 'undefined') {
			$retVal = 'NULL';
		} else {
			$retVal = "'".$retVal."'";
		}
		return ($retVal);
	}
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
	} 
	//Recive Session-Data
	$User = $_SESSION['username'];

	if( isset($_GET['vCL']) && !empty($_GET['vCL'])){
		$vCL = $_GET['vCL'];
	} else {
		$vCL = "cal";
	}
	if( isset($_GET['lS']) && !empty($_GET['lS'])){
		$listStartTime = $_GET['lS'];
	} else $listStartTime = "";
	if( isset($_GET['lE']) && !empty($_GET['lE'])){
		$listStopTime = $_GET['lE'];
	} else $listStopTime = "";
	if( isset($_GET['lSN']) && !empty($_GET['lSN'])){
		$listSpecialName = $_GET['lSN'];
	} else $listSpecialName = "";
	if( isset($_GET['location']) && !empty($_GET['location']) && isset($_GET['authID']) && !empty($_GET['authID'])){
		$sourceLoc = $_GET['location'];
		$sourceID = $_GET['authID'];
	} else {
		$sourceLoc = "calendar";
		$sourceID = null;
	}


	$monthDate 		= array("Januar",
							"Feburar",
							"März",
							"April",
							"Mai",
							"Juni",
							"Juli",
							"August",
							"September",
							"Oktober",
							"November",
							"Dezember");
	//+-----------------------------------------------------------------------------------------+
	//|		Delete Event																		|
	//+-----------------------------------------------------------------------------------------+
	if (isset($_POST['ctrl_delete']) && !empty($_POST['ctrl_delete'])) {
		if(isset($_GET['id']) && !empty($_GET['id'])) {
			$id 	= $_GET['id'];
			echo "<script> alert('".$id."'); </script>";
			mysql_query("DELETE FROM KlausurBlock WHERE klausur_nr = {$id}");
			header ("Location: calendar.php");
		}
	}
	//+-----------------------------------------------------------------------------------------+
	//|		Save Event																			|
	//+-----------------------------------------------------------------------------------------+
	if (isset($_POST['ctrl_save']) && !empty($_POST['ctrl_save'])) {
		$id 	= $_GET['id'];
		$SDnum 	= $_GET['SD'];
		$PVnum 	= $_GET['PV'];
		//-------------------------------------------------------------------------
		//konvertiere Zeit in richtiges Zeitformat => HHMM
		//echo "<script> alert('".$_POST['Date']."'); </script>";
		$TimeFormat_Start = convertTimeToSQLFormat($_POST['Date'], $_POST['hourMenu_strt'],$_POST['minuteMenu_strt']);
		$TimeFormat_Stop  = convertTimeToSQLFormat($_POST['Date'], $_POST['hourMenu_stop'],$_POST['minuteMenu_stop']);


		mysql_query("REPLACE INTO KlausurBlock (	klausur_nr,
													klausur_name, 
													fb, 
													startTime, 
													endTime, 
													betreuerSCL, 
													dozent, 
													partnerFB, 
													anzahlTeilnehmer, 
													editorValue
													) 
						 					VALUES(	'".$id."',
						 							'".$_POST['klausur_name']."',
						 							(SELECT id FROM Fachbereiche WHERE fb = '".$_POST['fachbereich']."'),
						 							'".$TimeFormat_Start."',
						 							'".$TimeFormat_Stop."',
						 							'".$_POST['scl_betreuer']."',
						 							'".$_POST['dozent']."',
						 							'".$_POST['ansprch_fb']."',
						 							'".$_POST['teilnehmer']."',
						 							'".$_POST['EditorTextField']."'
						 						)");
		//-------------------------------------------------------------------------
		//Termincheckliste
		/*for($ValNum = 1; $ValNum <= 19; $ValNum++) {
			$TimeFormatCheck = convertTimeToSQLFormat(date('d.m.Y', $_POST['picker'.($ValNum-1)]));
			mysql_query("REPLACE INTO TerminCheckList ( tableIndex, klausur_nr, row, time, checked )
				VALUES('".$id.formatNumber($ValNum)."', '".$id."', '".$ValNum."', '".$TimeFormatCheck."', '".$_POST['check'.($ValNum-1)]."')");
		}*/

		mysql_query("REPLACE INTO TerminCheckList (klausur_nr, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, 
			c13, c14, c15, c16, c17, c18, c19, bool1, bool2, bool3, bool4, bool5, bool6, bool7, bool8, bool9, 
			bool10, bool11, bool12, bool13, bool14, bool15, bool16, bool17, bool18, bool19) VALUES('".$id."', 
			'".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker0']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker1']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker2']))."', 
			'".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker3']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker4']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker5']))."', 
			'".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker6']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker7']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker8']))."', 
			'".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker9']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker10']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker11']))."', 
			'".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker12']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker13']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker14']))."', 
			'".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker15']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker16']))."', '".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker17']))."', 
			'".convertTimeToSQLFormat(date('d.m.Y', $_POST['picker18']))."', '".$_POST['check'.(0)]."', '".$_POST['check'.(1)]."', '".$_POST['check'.(2)]."', '".$_POST['check'.(3)]."', '".$_POST['check'.(4)]."', '".$_POST['check'.(5)]."', '".$_POST['check'.(6)]."', '".$_POST['check'.(7)]."', '".$_POST['check'.(8)]."', '".$_POST['check'.(9)]."', '".$_POST['check'.(10)]."', 
			'".$_POST['check'.(11)]."', '".$_POST['check'.(12)]."', '".$_POST['check'.(13)]."', '".$_POST['check'.(14)]."', '".$_POST['check'.(15)]."', '".$_POST['check'.(16)]."', '".$_POST['check'.(17)]."', '".$_POST['check'.(18)]."')"); 
		
		//-------------------------------------------------------------------------
		//Qualitätsmanagement
		//echo "<script> alert('".convertTimeToSQLFormat($_POST['sdStartTime'.$snum], $_POST['sdStartHour'], $_POST['sdStartMin'])."'); </script>";
		$QMquery = "REPLACE INTO QMListe ( klausur_nr, P1, P2, P3, P4, P5, P6, P7, P8, P9, ";
		$QMquery .= "P10, P11, P12, P13, P14, P15, P16, P17, P18) VALUES ( '".$id."', ";
		for($cpqsNUM = 0; $cpqsNUM < 6; $cpqsNUM++) {
			$QMquery .= "'".$_POST['checkCPQS'.$cpqsNUM]."', ";
		}
		for($cpktNUM = 0; $cpktNUM < 7; $cpktNUM++) {
			$QMquery .= "'".$_POST['checkCPKT'.$cpktNUM]."', ";
		}
		for($cpnkNUM = 0; $cpnkNUM < 4; $cpnkNUM++) {
			$QMquery .= "'".$_POST['checkCPNK'.$cpnkNUM]."', ";
		}
		$QMquery .= "'".$_POST['checkCPNK4']."')";
		mysql_query($QMquery);
		//-------------------------------------------------------------------------
		//Einzeltermine
		for($snum = 1; $snum <= $SDnum; $snum++) {
			$betSCL 	= checkNull($_POST['sdBetreuerSCL'.$snum]);
			$betSCL2 	= checkNull($_POST['sdsdBetreuerSCL2'.$snum]);
			$auf 		= checkNull($_POST['sdAufsicht'.$snum]);
			$auf2 		= checkNull($_POST['sdAufsicht2'.$snum]);

			//$intLat = !empty($intLat) ? "'$intLat'" : "NULL";
			mysql_query("REPLACE INTO Einzeltermine ( termin_nr, klausur_nr, startTime, endTime, aufsichtSCL,
														aufsichtSCL2, aufsicht, aufsicht2, anzahlTeilnehmer)
												VALUES ('".$_POST['sdID'.$snum]."',
														'".$id."',
														'".convertTimeToSQLFormat($_POST['sdStartTime'.$snum], $_POST['sdStartHour'.$snum], $_POST['sdStartMin'.$snum])."',
														'".convertTimeToSQLFormat($_POST['sdEndTime'.$snum], $_POST['sdEndHour'.$snum], $_POST['sdEndMin'.$snum])."',
														$betSCL,
														$betSCL2,
														$auf,
														$auf2,
														'".$_POST['sdTeilnehmer'.$snum]."')
														");
		}
		for($difnum = $SDnum+1; $difnum < 10; $difnum++) {
			$terminID = $id.formatNumber($difnum);
			mysql_query("DELETE FROM Einzeltermine WHERE termin_nr = $terminID");
		}
		//Probleme
		for($pnum = 0; $pnum < $PVnum; $pnum++) {
			if($_POST['pBool'.$pnum] == 'true') {
				$ProbSid = checkNull($_POST['pSingleDate'.$pnum]);
				$ProbSec = checkNull($_POST['pSection'.$pnum]);
				$ProbDes = checkNull($_POST['pDes'.$pnum]);
				$ProbStat = checkNull($_POST['pStat'.$pnum]);
				mysql_query("REPLACE INTO ProblemListe ( id, klausur_nr, terminID, Problembereich, ProbZeitpunkt, 
														ProbBeschreibung, ProbStatQuo, ProbErledigt)
												VALUES ('".$_POST['pID'.$pnum]."',
														'".$_POST['pKlausurID'.$pnum]."',
														$ProbSid,
														$ProbSec,
														'".convertTimeToSQLFormat($_POST['pDate'.$pnum], $_POST['pHour'.$pnum], $_POST['pMin'.$pnum])."',
														$ProbDes,
														$ProbStat,
														'".$_POST['pCheck'.$pnum]."')
														");
			}
		}
		$delPV = explode(",", $_POST['PVnum']);
		//echo "<script> alert('".$test[1]."'); </script>";

		for($pifnum = 1; $pifnum <= 10; $pifnum++) {
			if(in_array($pifnum, $delPV) == false) {
				//echo "<script> alert('".$pifnum."'); </script>";
				$terminID = $id.formatNumber($pifnum);
				mysql_query("DELETE FROM ProblemListe WHERE id = $terminID");
			}
		}
	}
	//+-----------------------------------------------------------------------------------------+
	//|		Get Data																|
	//+-----------------------------------------------------------------------------------------+
	if(isset($_GET['id']) && !empty($_GET['id'])) {
		// Lade alle Klausurnamen
		$knames = mysql_query('SELECT klausur_name FROM KlausurBlock group by klausur_name ORDER BY klausur_name DESC'); //ORDER BY x DESC
		if(mysql_num_rows($knames) > 0) {
			$knameArray;
			$KAcnt = 0;
			while($KAResult=mysql_fetch_array($knames)) {
				$knameArray[$KAcnt] = $KAResult[0];
				$KAcnt++;
			}
		} else { $knameArray[0] = 'Datenbank ist leer'; }
		// Lade alle Fachbereiche
		$getFachbereichVal = mysql_query('SELECT fb FROM Fachbereiche');
		if(mysql_num_rows($getFachbereichVal) > 0) {
			$fbArray;
			$FBcnt = 0;
			while($fbResult=mysql_fetch_array($getFachbereichVal)) {
				$fbArray[$FBcnt] = $fbResult[0];
				$FBcnt++;
			}
		} else { $fbArray[0] = 0; }
		// Lade alle Autoren
		$getAutoren = mysql_query('	SELECT autoren_nr, vorname, nachname, fb
									FROM Autoren ORDER BY nachname');
		if(mysql_num_rows($getAutoren) > 0) {
			$AutorenID;
			$AutorenSurName;
			$AutorenLastName;
			$AutorenFB;
			$AutCnt = 0;
			while($AutorenRes=mysql_fetch_array($getAutoren)) {
				$AutorenID[$AutCnt] 		= $AutorenRes[0];
				$AutorenSurName[$AutCnt] 	= $AutorenRes[1];
				$AutorenLastName[$AutCnt]	= $AutorenRes[2];
				$AutorenFB[$AutCnt]			= $AutorenRes[3];
				$AutCnt++;
			}
		}
		//--------------------------------------------------------------------------
		$id = $_GET['id'];
		//$tms = $_GET['tms'];
		// Fetch Table dates Data
		$a_row = mysql_query("SELECT e.*, s.fb FROM KlausurBlock e INNER JOIN Fachbereiche s ON s.id = e.fb WHERE klausur_nr=".$id); //ORDER BY x DESC

		$a_result=mysql_fetch_array($a_row);
		$BlockArray['id'] 				= $a_result[0];
		$BlockArray['name'] 			= $a_result[1];
		//$a_result[2] = fb.id
		$BlockArray['fb'] 				= $a_result[2];
		$BlockArray['startTime'] 		= date_create($a_result[3])->getTimestamp();
		$BlockArray['endTime'] 			= date_create($a_result[4])->getTimestamp();
		$BlockArray['dozent'] 			= $a_result[6];
		$BlockArray['partner'] 			= $a_result[7];
		$BlockArray['betreuer'] 		= $a_result[5];
		$BlockArray['teilnehmer'] 		= $a_result[8];
		//$BlockArray['timeNotes'] 		= $a_result[10];
		$BlockArray['notes'] 			= $a_result[9];
		//-----------------------------------------------------------------
		$b_row = mysql_query("SELECT * FROM Einzeltermine WHERE klausur_nr=".$id); //ORDER BY x DESC
		$numRows = 0;
		while($b_result = mysql_fetch_array($b_row)) {
			$SDValues[$numRows]['termin_id'] 		= $b_result[1];
			$SDValues[$numRows]['startTime'] 		= date_create($b_result[2])->getTimestamp();
			$SDValues[$numRows]['endTime'] 			= date_create($b_result[3])->getTimestamp();
			$SDValues[$numRows]['betreuerSCL'] 		= $b_result[4];
			$SDValues[$numRows]['betreuerSCL2'] 	= $b_result[5];
			$SDValues[$numRows]['aufsicht'] 		= $b_result[6];
			$SDValues[$numRows]['aufsicht2']		= $b_result[7];
			$SDValues[$numRows]['teilnehmer']		= $b_result[8];
			$numRows++;
		}
		//-----------------------------------------------------------------
		$c_row = mysql_query("SELECT * FROM ProblemListe WHERE klausur_nr=".$id); //ORDER BY x DESC
		if(mysql_num_rows($c_row) != FALSE) {
			$numRows = 0;
			while($c_result = mysql_fetch_array($c_row)) {
				$ProbVal[$numRows]['id']					= $c_result[0];
				$ProbVal[$numRows]['klausur_nr']			= $c_result[1];
				//$ProbVal[$numRows]['einzeltermin_id']		= $c_result[2];
				$ProbVal[$numRows]['Problembereich']		= $c_result[3];
				$ProbVal[$numRows]['Zeitpunkt']				= date_create($c_result[4])->getTimestamp();
				$ProbVal[$numRows]['Problembeschreibung']	= $c_result[5];
				$ProbVal[$numRows]['StatQuo']				= $c_result[6];
				$ProbVal[$numRows]['erledigt']				= $c_result[7];
				if($c_result[2] != NULL) {
					$pID = substr($c_result[2],1);
					$pTime = date('H:i', $SDValues[$pID-1]['startTime']);
					$ProbVal[$numRows]['einzeltermin_id'] = $pTime." Uhr (id: ".$c_result[2].")";
				}
				$numRows++;
				//echo "<script> alert('".$ProbVal[$numRows]['einzeltermin_id']."'); </script>";
			}
		} else { 
			$ProbVal[0]['einzeltermin_id']		= NULL;
			$ProbVal[0]['Problembereich']		= NULL;
			$ProbVal[0]['Zeitpunkt']			= $BlockArray['startTime'];
			$ProbVal[0]['Problembeschreibung']	= NULL;
			$ProbVal[0]['StatQuo']				= NULL;
			$ProbVal[0]['erledigt']				= "false";
		}
		//-----------------------------------------------------------------
		$d_row = mysql_query("SELECT c1, bool1, c2, bool2, c3, bool3, c4, bool4, c5, bool5, c6, bool6, c7, bool7, 
			c8, bool8, c9, bool9, c10, bool10, c11, bool11, c12, bool12, c13, bool13, c14, bool14, c15, bool15, 
			c16, bool16, c17, bool17, c18, bool18, c19, bool19 FROM TerminCheckList WHERE klausur_nr = '".$id."'");
		while($d_result = mysql_fetch_array($d_row)) {
			$dCnt = 0;
			for($dNum = 0; $dNum < 19; $dNum++) {
				$pickerDate[$dNum]['date'] = date_create($d_result[$dCnt])->getTimestamp();
				$dCnt++;
				$pickerDate[$dNum]['check'] = $d_result[$dCnt];
				$dCnt++;
			}
		}
		//-----------------------------------------------------------------
		$q_row = mysql_query("SELECT * FROM QMListe WHERE klausur_nr=".$id); //ORDER BY x DESC
		if(mysql_num_rows($q_row) != FALSE) {
			$q_result = mysql_fetch_array($q_row);
			for($Rnum = 1; $Rnum < 19; $Rnum++) {
				$QMChecks[] = $q_result[$Rnum];
			}
		} else {
			$QMChecks = array_fill(0, 18, "false");
		}
		//---------------------------------------------------------------------------
		// Lade alle IDs
		$getIDVal = mysql_query('SELECT klausur_nr FROM KlausurBlock');
		if(mysql_num_rows($getIDVal) > 0) {
			$idArray;
			$IDcnt = 0;
			while($IDResult=mysql_fetch_array($getIDVal)) {
				$idArray[$IDcnt] = $IDResult[0];
				$IDcnt++;
			}
		} 
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>E-Klausuren DB - Termindetails</title>
</head>
<style type="text/css">
  @import "../css/font.css";
  @import "../css/navi.css";
  @import "../css/mainBody.css";
  @import "../modules/datepicker/css/smoothness/jquery-ui-1.10.3.custom.css";
  @import "../css/view.css";
  @import "../modules/select2/select2.css";
</style>
<script src="../modules/_static/jquery-1.9.1.js"></script>
<script src="../modules/_static/jquery-migrate-1.2.1.min.js"></script>
<script src="../modules/select2/select2.js"></script>
<script src="../modules/datepicker/js/jquery-ui-1.10.3.custom.min.js"></script>
<body>
<script>
// Parse PHP Variables to JS Variable
var fbArray		= new Array();
var knameArray	= new Array();
var idArray		= new Array();
var AutID 		= new Array();
var AutLastName = new Array();
var AutSurName 	= new Array();
var AutFB 		= new Array();
var Autoren 	= new Array();
var sclTeam		= new Array();
var pickerDate	= new Array();
var BlockArray 	= new Array();
var SDValues	= new Array();
var QMChecks	= new Array();
var ProbVal		= new Array();
var vCL;
var sourceLoc, sourceID;
var listStartTime, listStopTime, listSpecialName;

fbArray				= <?php echo json_encode($fbArray); ?>;
knameArray			= <?php echo json_encode($knameArray); ?>;
idArray				= <?php echo json_encode($idArray); ?>;
AutID 				= <?php echo json_encode($AutorenID); ?>;
AutLastName			= <?php echo json_encode($AutorenLastName); ?>;
AutSurName			= <?php echo json_encode($AutorenSurName); ?>;
AutFB				= <?php echo json_encode($AutorenFB); ?>;
pickerDate			= <?php echo json_encode($pickerDate); ?>;
BlockArray			= <?php echo json_encode($BlockArray); ?>;
SDValues			= <?php echo json_encode($SDValues); ?>;
QMChecks			= <?php echo json_encode($QMChecks); ?>;
ProbVal				= <?php echo json_encode($ProbVal); ?>;
vCL					= <?php echo json_encode($vCL); ?>;
listStartTime		= <?php echo json_encode($listStartTime); ?>;
listStopTime		= <?php echo json_encode($listStopTime); ?>;
listSpecialName		= <?php echo json_encode($listSpecialName); ?>;
sourceLoc			= <?php echo json_encode($sourceLoc); ?>;
sourceID			= <?php echo json_encode($sourceID); ?>;

</script>
<script src="edit.js"></script>
<script src="../modules/navi.js"></script>
<script> navi("info_box",1); </script>
</body>
</html>