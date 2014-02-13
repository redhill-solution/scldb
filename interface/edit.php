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
	} 
	//Recive Session-Data
	$User = $_SESSION['username'];

	//+-----------------------------------------------------------------------------------------+
	//|		Save Data																			|
	//+-----------------------------------------------------------------------------------------+
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
											editorValue,
											genehmigt) 
				 					VALUES(	'".$cdName."',
				 							(SELECT id FROM Fachbereiche WHERE fb = '".$cdFB."'),
				 							'".$startDate."',
				 							'".$stopDate."',
				 							'".$cdDozent."',
				 							'".$cdTeil."',
				 							'".$cdComment."',
				 							0
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
		header("Location: ./calendar.php?tms=".mktime(0,0,0, $cdMonth, $cdDay, $cdYear)); 
		//header("Location: ./calendar.php"); 
		exit();
	}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>E-Klausuren DB - Anmeldeformular</title>
</head>
<style type="text/css">
  @import "../css/font.css";
  @import "../css/navi.css";
  @import "../css/mainBody.css";
  @import "../modules/datepicker/css/smoothness/jquery-ui-1.10.3.custom.css";
  @import "../css/createAuthor.css";
  @import "../modules/select2/select2.css";
</style>
<script src="../modules/_static/jquery-1.9.1.js"></script>
<script src="../modules/_static/jquery-migrate-1.2.1.min.js"></script>
<script src="../modules/select2/select2.js"></script>
<script src="../modules/datepicker/js/jquery-ui-1.10.3.custom.min.js"></script>
<body>
<script>


</script>
<script type="text/javascript" language="javascript" src="createAuthor.js">
</script>
<script src="../modules/navi.js"></script>
<script> navi("info_box",2); </script>
</body>
</html>