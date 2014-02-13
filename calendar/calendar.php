<?php
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
	function formatNumber($num) {
		if($num < 10) $num = "0".$num;
		return ($num);
	}
	function tcDates($timestamp, $Settings) {
	    // Feste Feiertage werden nach dem Schema ddmm eingetragen
	    $feiertage[] = "0101"; // Neujahrstag
	    $feiertage[] = "0105"; // Tag der Arbeit
	    $feiertage[] = "0310"; // Tag der Deutschen Einheit
	    $feiertage[] = "2512"; // Erster Weihnachtstag
	    $feiertage[] = "2612"; // Zweiter Weihnachtstag

	    // Bewegliche Feiertage berechnen
	    $tage = 60 * 60 * 24;
	    $ostersonntag = easter_date(date('Y', $timestamp));
	    $feiertage[] = date("dm", $ostersonntag - 2 * $tage);  // Karfreitag
	    $feiertage[] = date("dm", $ostersonntag + 1 * $tage);  // Ostermontag
	    $feiertage[] = date("dm", $ostersonntag + 39 * $tage); // Himmelfahrt
	    $feiertage[] = date("dm", $ostersonntag + 50 * $tage); // Pfingstmontag
		
		//echo date('Y-m-d', strtotime($myDate . ' +1 Weekday'));
	    // Prüfen, ob Feiertag
	    for($numPara = 0; $numPara < 19; $numPara++) {
		    $code = date("dm", strtotime("+".$Settings[$numPara]." Weekday", $timestamp));
		    $datum = getdate(strtotime("+".$Settings[$numPara]." Weekday", $timestamp));
		    $wochentag = $datum['wday'];

		    if(in_array($code, $feiertage)) {
		    	$addDay = 1;
		    	while(in_array($code, $feiertage)) {
		    		if($Settings[$numPara] < 0) {
			  			$code = date("dm", strtotime("+".($Settings[$numPara]-$addDay)." Weekday", $timestamp));
						$datum = getdate(strtotime("+".($Settings[$numPara]-$addDay)." Weekday", $timestamp));
			    	    $retArray[$numPara] = date('d.m.Y', strtotime("+".($Settings[$numPara]-$addDay)." Weekday", $timestamp));
			    	} else {
			    		$code = date("dm", strtotime("+".($Settings[$numPara]+$addDay)." Weekday", $timestamp));
						$datum = getdate(strtotime("+".($Settings[$numPara]+$addDay)." Weekday", $timestamp));
			    	    $retArray[$numPara] = date('d.m.Y', strtotime("+".($Settings[$numPara]+$addDay)." Weekday", $timestamp));
			    	}
			    	$wochentag = $datum['wday'];
		  			$addDay++;
		  		}
		    } else {
		       $retArray[$numPara] = date('d.m.Y', strtotime("+".$Settings[$numPara]." Weekday", $timestamp));
		    }
		}
		return ($retArray);
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
		exit;
	}
	//Recive Session-Data
	$User = $_SESSION['username'];
	//---------------------------------------------------
	if( isset($_GET['tms']) && !empty($_GET['tms'])){
		$date = $_GET['tms'];
	} else {
		$date = time();
	}
	if( isset($_GET['view']) && !empty($_GET['view'])){
		$view = $_GET['view'];
	} else {
		$view = "cal";
	}
	if( isset($_GET['xPos']) && !empty($_GET['xPos'])){
		$xPos = $_GET['xPos'];
	} else {
		$xPos = 0;
	}
	if( isset($_GET['yPos']) && !empty($_GET['yPos'])){
		$yPos = $_GET['yPos'];
	} else {
		$yPos = 0;
	}
	$server_time = time();
	//+-----------------------------------------------------------------------------------------+
	//|		Settings																			|
	//+-----------------------------------------------------------------------------------------+
	// Calendar Settings
	$curr_date_color = "#003F7D";			
	//---------------------------------------------------
	//+-----------------------------------------------------------------------------------------+
	//|		Get MysqlDates																		|
	//+-----------------------------------------------------------------------------------------+
	//---------------------------------------------------------------------------
	if(isset($_GET['sem']) && !empty($_GET['sem'])) {
		list($sDay, $sMonth, $sYear, $eDay, $eMonth, $eYear) = explode(".",$_GET['sem']);
		$startDate = "'".date("Y-m-d H:i:s", mktime(0, 0, 0, $sMonth, $sDay, $sYear))."'";
		$endDate = "'".date("Y-m-d H:i:s", mktime(23, 59, 59, $eMonth, $eDay, $eYear))."'";
		if( isset($_GET['sn']) && !empty($_GET['sn'])){
			$listSpecialName = $_GET['sn'];
		} 
		if( isset($_GET['jsSE']) && !empty($_GET['jsSE'])){
			list($jsSDay, $jsSMonth, $jsSYear, $jsEDay, $jsEMonth, $jsEYear) = explode(".",$_GET['jsSE']);

			$jsSqlStartDate = mktime(0, 0, 0, $sMonth, $sDay, $sYear);
			$jsSqlEndDate = mktime(23, 59, 59, $eMonth, $eDay, $eYear);
			$jsStartDate = date("d.m.Y", mktime(0, 0, 0, $jsSMonth, $jsSDay, $jsSYear));
			$jsEndDate = date("d.m.Y", mktime(0, 0, 0, $jsEMonth, $jsEDay, $jsEYear));
		} else {
			$jsSqlStartDate = mktime(0, 0, 0, $sMonth, $sDay, $sYear);
			$jsSqlEndDate = mktime(23, 59, 59, $eMonth, $eDay, $eYear);
			$jsStartDate = date("d.m.Y", mktime(0, 0, 0, $sMonth, $sDay, $sYear));
			$jsEndDate = date("d.m.Y", mktime(0, 0, 0, $eMonth, $eDay, $eYear));
		}
	} else {
		if(date("md") < 420) {
			$startDate = "'".date("Y-m-d H:i:s", mktime(0, 0, 0, 4, 20, date("Y")-1))."'";
			$endDate = "'".date("Y-m-d H:i:s", mktime(23, 59, 59, 10, 19, date("Y")))."'";
			$listSpecialName = "WiSe ".(date("Y")-1)."/".date("Y");

			$jsSqlStartDate = mktime(0, 0, 0, 4, 20, date("Y")-1);
			$jsSqlEndDate = mktime(23, 59, 59, 10, 19, date("Y"));
			$jsStartDate = date("d.m.Y", mktime(0, 0, 0, 10, 20, date("Y")-1));
			$jsEndDate = date("d.m.Y", mktime(0, 0, 0, 4, 19, date("Y")));
		}
		if(date("md") >= 420 && date("md") <= 1019) {
			$startDate = "'".date("Y-m-d H:i:s", mktime(0, 0, 0, 10, 20, date("Y")-1))."'";
			$endDate = "'".date("Y-m-d H:i:s", mktime(0, 59, 59, 4, 19, date("Y")+1))."'";
			$listSpecialName = "SoSe ".date("Y");

			$jsSqlStartDate = mktime(0, 0, 0, 10, 20, date("Y")-1);
			$jsSqlEndDate = mktime(23, 59, 59, 4, 19, date("Y")+1);
			$jsStartDate = date("d.m.Y", mktime(0, 0, 0, 4, 20, date("Y")));
			$jsEndDate = date("d.m.Y", mktime(0, 0, 0, 10, 19, date("Y")));
		}
		if(date("md") > 1019 ) { 
			$startDate = "'".date("Y-m-d H:i:s", mktime(0, 0, 0, 4, 20, date("Y")))."'";
			$endDate = "'".date("Y-m-d H:i:s", mktime(23, 59, 59, 10, 19, date("Y")+1))."'";
			$listSpecialName = "WiSe ".date("Y")."/".(date("Y")+1);

			$jsSqlStartDate = mktime(0, 0, 0, 4, 20, date("Y"));
			$jsSqlEndDate =  mktime(23, 59, 59, 10, 19, date("Y")+1);
			$jsStartDate = date("d.m.Y", mktime(0, 0, 0, 10, 20, date("Y")));
			$jsEndDate =  date("d.m.Y", mktime(0, 0, 0, 4, 19, date("Y")+1));
		}
	}

	$countDates = mysql_query("SELECT COUNT(1) FROM KlausurBlock");
	$totalDates = mysql_result($countDates,0);
	$dataToBeLoaded = 2;
	/*if( isset($_GET['limit']) && !empty($_GET['limit'])){
		$_SESSION['sqlLimit'] = $_GET['limit'];
		$limit = $_SESSION['sqlLimit'];
	} else if( isset($_SESSION['sqlLimit']) && !empty($_SESSION['sqlLimit'])){
		$limit = $_SESSION['sqlLimit'];
	} else {
		$limit = $dataToBeLoaded;
	}
	$start = 0;*/

	//$sqlDates = "SELECT * FROM ( SELECT klausur_nr,klausur_name,startTime,endTime,dozent FROM KlausurBlock WHERE startTime >= {$startDate} AND startTime <= {$endDate} ORDER BY startTime LIMIT {$start}, {$limit}) q JOIN Einzeltermine a USING (klausur_nr) ORDER BY q.startTime ";
	$sqlDates = "SELECT * FROM ( SELECT klausur_nr,klausur_name,startTime,endTime,dozent FROM KlausurBlock WHERE startTime >= {$startDate} AND startTime <= {$endDate} AND genehmigt = 1 ORDER BY startTime) q JOIN Einzeltermine a USING (klausur_nr) ORDER BY q.startTime ";
	//echo "<script> alert(\"".$sqlDates."\"); </script>";
	$count = 0;
	$getDates = mysql_query($sqlDates);
	while($dataArray=mysql_fetch_array($getDates)) {
		$Block[$count]['id']	= $dataArray[0];
		$Block[$count]['name'] 	= $dataArray[1];
		$Block[$count]['startTime']		= date_create($dataArray[2])->getTimestamp();
		$Block[$count]['endTime'] 		= date_create($dataArray[3])->getTimestamp();
		$Block[$count]['dozent']		= $dataArray[4];
		$SDvalues[$count]['klausur_nr']		= $Block[$count]['id'];
		$SDvalues[$count]['termin_nr']		= $dataArray[5];
		$SDvalues[$count]['startTime']		= date_create($dataArray[6])->getTimestamp();
		$SDvalues[$count]['endTime'] 			= date_create($dataArray[7])->getTimestamp();
		$SDvalues[$count]['aufsichtSCL']		= $dataArray[8];
		$SDvalues[$count]['aufsichtSCL2']		= $dataArray[9];
		//$dataArray[10] + $dataArray[11] = aufsich + aufsicht2
		$SDvalues[$count]['anzahlTeilnehmer']	= $dataArray[12];
		$count++;
	}
	//$limit += $dataToBeLoaded;

	/*$count = 0;
	$tableHasData = true;
	$getColumn = mysql_query('SELECT klausur_nr,klausur_name,startTime,endTime,dozent FROM KlausurBlock ORDER BY startTime Limit 1');	
	while($dataArray=mysql_fetch_array($getColumn)) {
		$Block[$count]['id']	= $dataArray[0];
		$Block[$count]['name'] 	= $dataArray[1];
		$Block[$count]['startTime']		= date_create($dataArray[2])->getTimestamp();
		$Block[$count]['endTime'] 		= date_create($dataArray[3])->getTimestamp();
		$Block[$count]['dozent']		= $dataArray[4];
		$count++;
	}

	$num = 0;
	$d_row = mysql_query('SELECT klausur_nr,termin_nr,startTime,endTime,aufsichtSCL,aufsichtSCL2,anzahlTeilnehmer FROM Einzeltermine ORDER BY startTime');	
	while($d_result=mysql_fetch_array($d_row)) {
		$SDvalues[$num]['klausur_nr']		= $d_result[0];
		$SDvalues[$num]['termin_nr']		= $d_result[1];
		$SDvalues[$num]['startTime']		= date_create($d_result[2])->getTimestamp();
		$SDvalues[$num]['endTime'] 			= date_create($d_result[3])->getTimestamp();
		$SDvalues[$num]['aufsichtSCL']		= $d_result[4];
		$SDvalues[$num]['aufsichtSCL2']		= $d_result[5];
		$SDvalues[$num]['anzahlTeilnehmer']	= $d_result[6];
		$num++;
	}*/
	// Lade alle Klausurnamen
	$knames = mysql_query('SELECT klausur_name FROM KlausurBlock 
				group by klausur_name ORDER BY klausur_name DESC'); //ORDER BY x DESC
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
	// Lade Datum aus TerminCheckList für Color-Wert Berechnung
	/*for($numOfTests = 0; $numOfTests < $count; $numOfTests++) {
		//$colorResult = mysql_fetch_array(mysql_query("SELECT c".($numOfTests+1)." FROM TerminCheckList WHERE KLAUSUR_NR = '".$Block[$numOfTests]['id']."' AND bool".$numOfTests." = 'false' ORDER BY TIME ASC LIMIT 1"));
		$getColorDates[$numOfTests] = $colorResult[0] != NULL ? date_create($colorResult[0])->getTimestamp() : NULL;

	}*/
	for($numOfTests = 0; $numOfTests < $count; $numOfTests++) {
		$boolString = "SELECT ";
		for($nmbOfEl = 1; $nmbOfEl < 20; $nmbOfEl++) {
			$boolString .= "bool".$nmbOfEl.($nmbOfEl < 19 ? ", " : " ");
		}
		$boolString .= "FROM TerminCheckList WHERE KLAUSUR_NR = '".$Block[$numOfTests]['id']."'";
		//echo "<script> alert(\"".$boolString."\"); </script>";
		$boolResult = mysql_fetch_row(mysql_query($boolString));
		//echo "<script> alert(\"".count($boolResult)."\"); </script>";
		$bool2Cnt = 0;
		for($boolCnt = 0; $boolCnt < count($boolResult); $boolCnt++) {
			if($boolResult[$boolCnt] == "false") {
				$boolIndex[$bool2Cnt] = $boolCnt+1;
				$bool2Cnt++;
			}
		}

		$colorString = "SELECT ";
		foreach($boolIndex as $cIndex) {
			$colorString .= "c".$cIndex.",";
		}
		$colorString = substr($colorString, 0, -1); 
		$colorString .= " FROM TerminCheckList WHERE KLAUSUR_NR = '".$Block[$numOfTests]['id']."'";
		$colorResult = mysql_fetch_row(mysql_query($colorString));
		sort($colorResult);
		$getColorDates[$numOfTests] = $colorResult[0] != NULL ? date_create($colorResult[0])->getTimestamp() : NULL;
	}
	//-------------------------------------------------------------------------------------------
	//Create Date to MySQL DB
	if (isset($_POST['ctrl_save']) && !empty($_POST['ctrl_save'])) {
		$_SESSION['sqlLimit']++;
		//Zeiteinstellungen für die Termincheckliste
		$getSet = mysql_query("SELECT value FROM Einstellungen WHERE category = 1");
		while($settResult=mysql_fetch_array($getSet)) {
			$Settings[] = $settResult[0];
		}

		$startDate = convertTimeToSQLFormat($_POST['cdDate'], $_POST['cdHourStart'], $_POST['cdMinStart']);
		$stopDate = convertTimeToSQLFormat($_POST['cdDate'], $_POST['cdHourStop'], $_POST['cdMinStop']);
		$SDstopDate = convertTimeToSQLFormat($_POST['cdDate'], $_POST['cdHourStart']+1, $_POST['cdMinStart']);
		$cdName = $_POST['cdName'];
		$cdFB = $_POST['cdFB'];
		$cdDozent = $_POST['cdDozent'];
		$cdTeil = $_POST['cdTeil'];
		$cdComment = $_POST['cdComment'];
		$cdColor = $_POST['color'];
		$TimeSlotFree = true;

		//echo "<script> alert(\"".$startDate."\"); </script>";

		list($cdDay, $cdMonth, $cdYear) = explode(".", $_POST['cdDate']);

		//create TerminCheckList Date Distances
		$klausurTS = mktime(0,0,0, $cdMonth, $cdDay, $cdYear);
		$klausurDate = date('d.m.Y', $klausurTS);
		$checkPoint = tcDates($klausurTS, $Settings);

		if($TimeSlotFree){
			mysql_query("INSERT INTO KlausurBlock (	klausur_name, 
											fb, 
											startTime, 
											endTime, 
											dozent,  
											anzahlTeilnehmer, 
											editorValue) 
				 					VALUES(	'".$cdName."',
				 							(SELECT id FROM Fachbereiche WHERE fb = '".$cdFB."'),
				 							'".$startDate."',
				 							'".$stopDate."',
				 							'".$cdDozent."',
				 							'".$cdTeil."',
				 							'".$cdComment."'
				 						)");
			$Lid = mysql_insert_id();
			mysql_query("INSERT INTO Einzeltermine ( termin_nr,
													klausur_nr,
													startTime,
													endTime) 
										VALUES( '".$Lid."01"."',
												'".$Lid."',
												'".$startDate."',
												'".$SDstopDate."'
											)");
			//TerminCheckList
			mysql_query("INSERT INTO TerminCheckList (klausur_nr, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, 
				c13, c14, c15, c16, c17, c18, c19, bool1, bool2, bool3, bool4, bool5, bool6, bool7, bool8, bool9, 
				bool10, bool11, bool12, bool13, bool14, bool15, bool16, bool17, bool18, bool19) VALUES('".$Lid."', 
				'".convertTimeToSQLFormat($checkPoint[0])."', '".convertTimeToSQLFormat($checkPoint[1])."', '".convertTimeToSQLFormat($checkPoint[2])."', 
				'".convertTimeToSQLFormat($checkPoint[3])."', '".convertTimeToSQLFormat($checkPoint[4])."', '".convertTimeToSQLFormat($checkPoint[5])."', 
				'".convertTimeToSQLFormat($checkPoint[6])."', '".convertTimeToSQLFormat($checkPoint[7])."', '".convertTimeToSQLFormat($checkPoint[8])."', 
				'".convertTimeToSQLFormat($checkPoint[9])."', '".convertTimeToSQLFormat($checkPoint[10])."', '".convertTimeToSQLFormat($checkPoint[11])."', 
				'".convertTimeToSQLFormat($checkPoint[12])."', '".convertTimeToSQLFormat($checkPoint[13])."', '".convertTimeToSQLFormat($checkPoint[14])."', 
				'".convertTimeToSQLFormat($checkPoint[15])."', '".convertTimeToSQLFormat($checkPoint[16])."', '".convertTimeToSQLFormat($checkPoint[17])."', 
				'".convertTimeToSQLFormat($checkPoint[18])."', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 
				'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false')"); 
		}
		//header("Location: ./calendar.php?tms=".mktime(0,0,0, $cdMonth, $cdDay, $cdYear)); 
		header("Location: ./edit.php?id=".$Lid); 
		exit();
	}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>E-Klausuren DB - Belegungsplan</title>
</head>
<style type="text/css">
  @import "../css/font.css";
  @import "../css/calendar.css";
  @import "../css/navi.css";
  @import "../css/mainBody.css";
  @import "../css/createDate.css";
  @import "../css/loadingAnimation.css";
  @import "../modules/datepicker/css/smoothness/jquery-ui-1.10.3.custom.css";
  @import "../modules/select2/select2.css";
</style>
<script type="text/javascript" src="../modules/_static/jquery-1.9.1.js"></script>
<script type="text/javascript" src="../modules/_static/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="../modules/select2/select2.js"></script>
<script type="text/javascript" src="../modules/datepicker/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="../modules/jsPDF/dist/jspdf.min.js"></script>
<script type="text/javascript" src="../modules/loadingAnimation.js"></script>
<body>
<div align='center' id='center'><div id='container'></div></div>
<script type="text/javascript" language="javascript" src="createDate.js"></script>
<script type="text/javascript" language="javascript" src="calendar.js"></script>
<script type="text/javascript" language="javascript" src="list.js"></script>
<script>

var user = <?php echo json_encode($User); ?>;

var server_date = new Date( <?php echo json_encode($date); ?> * 1000);
var CurrentServerTime = new Date(<?php echo json_encode($server_time); ?> * 1000 );

var totalD = <?php echo json_encode($totalDates); ?>;
var sqlLimit = <?php echo json_encode($limit); ?>;

var Block 				= new Array();
var SDvalues			= new Array();
var SplitStartDateStart	= new Array();
var SplitStartDateEnd	= new Array();
var Autoren 			= new Array();
var AutorenID			= new Array();
var AutorenSurName		= new Array();
var AutorenLastName		= new Array();
var AutorenFB			= new Array();
var fbArray				= new Array();
var knameArray			= new Array();
var view				= new Array();
var colorDate			= new Array();

//var listStartTime = "", listStopTime = "", listSpecialName = "";
if(<?php echo json_encode($Block); ?> != null) Block = <?php echo json_encode($Block); ?>;
if(<?php echo json_encode($Block); ?> != null) SDvalues = <?php echo json_encode($SDvalues); ?>;
fbArray				= <?php echo json_encode($fbArray); ?>;
knameArray			= <?php echo json_encode($knameArray); ?>;
AutorenID			= <?php echo json_encode($AutorenID); ?>;
AutorenSurName		= <?php echo json_encode($AutorenSurName); ?>;
AutorenLastName		= <?php echo json_encode($AutorenLastName); ?>;
AutorenFB			= <?php echo json_encode($AutorenFB); ?>;
view				= <?php echo json_encode($view); ?>;
colorDate			= <?php echo json_encode($getColorDates); ?>;

var today = new Date();

listSpecialName		= <?php echo json_encode($listSpecialName); ?>;
sqlStartDate		= new Date(<?php echo json_encode($jsSqlStartDate); ?> * 1000);
sqlEndDate			= new Date(<?php echo json_encode($jsSqlEndDate); ?> * 1000);
jsStartDate		= <?php echo json_encode($jsStartDate); ?>;
jsEndDate			= <?php echo json_encode($jsEndDate); ?> ;

for(var counter = 0; counter < Block.length; counter++) {
	Block[counter].startTime 	= new Date(Block[counter].startTime*1000);
	Block[counter].endTime 		= new Date(Block[counter].endTime*1000);
	if(colorDate[counter] != null) {
		var dif = Math.round(((new Date(colorDate[counter]*1000)) - today)/86400000);
		Block[counter].blockColor 	=  (dif < 3) ? 1 : (dif < 7 && dif >= 3) ? 2 : (dif < 14 && dif >= 7) ? 3 : (dif < 30 && dif >= 14) ? 4 : (dif >= 30) ? 5 : 6;
	} else {
		Block[counter].blockColor = 6;
	}
}

if(view == "week") {
	CalendarMain(sqlStartDate, sqlEndDate, listSpecialName, jsStartDate, jsEndDate);
} else {
	CalendarMain(sqlStartDate, sqlEndDate, listSpecialName, jsStartDate, jsEndDate);
	listMain(listSpecialName, sqlStartDate, sqlEndDate, jsStartDate, jsEndDate);
}
/*Standard Ansicht Kalender
if(view == "list") {
	CalendarMain();
	listMain(listStartTime, listStopTime, listSpecialName);
} else {
	CalendarMain();
}*/

var positionX = <?php echo json_encode($xPos); ?>;
var positionY = <?php echo json_encode($yPos); ?>;
window.scrollTo(positionX, positionY);

</script>
<script src="../modules/navi.js"></script>
<script> navi("info_box",1); </script>
<br />
</body>
</html>