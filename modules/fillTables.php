<?php
	$MAX_DATES = 85;

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

	$getSet = mysql_query("SELECT value FROM Einstellungen WHERE category = 1");
	while($settResult=mysql_fetch_array($getSet)) {
		$Settings[] = $settResult[0];
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
	function fillDates($Settings) {
		$char = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");

		$data = array();
		for($j = 0; $j < rand(10, 25); $j++) {
			$data[0] .= $char[rand(0,51)];
		}

		$data[1] = rand(1,11);

		$year = "2014";
		$month = rand(1,12);
		$day = rand(1,28);
		$hour = rand(8,16);
		$minute = rand(0,59);
		$data[2] = ($year < 10 ? "0".$year : $year)."-".($month < 10 ? "0".$month : $month)."-".($day < 10 ? "0".$day : $day)." ".($hour < 10 ? "0".$hour : $hour).":".($minute < 10 ? "0".$minute : $minute).":00";
		$hourEnd = $hour + rand(1,5);
		$data[3] = ($year < 10 ? "0".$year : $year)."-".($month < 10 ? "0".$month : $month)."-".($day < 10 ? "0".$day : $day)." ".($hourEnd < 10 ? "0".$hourEnd : $hourEnd).":".($minute < 10 ? "0".$minute : $minute).":00";

		for($j = 0; $j < rand(10, 25); $j++) {
			$data[4] .= "".$char[rand(0,51)];
		}
		$data[5] = rand(0,80);

		mysql_query("INSERT INTO KlausurBlock (	klausur_name, fb, startTime, endTime, dozent, anzahlTeilnehmer) VALUES(	'".$data[0]."', '".$data[1]."', '".$data[2]."', '".$data[3]."', '".$data[4]."', '".$data[5]."')");

		$id = mysql_insert_id();

		unset($data);



		for($snum = 1; $snum <= rand(1, 5); $snum++) {
			$data[0] = $id."0"+$snum;
			$data[1] = ($year < 10 ? "0".$year : $year)."-".($month < 10 ? "0".$month : $month)."-".($day < 10 ? "0".$day : $day)." ".($hour < 10 ? "0".$hour : $hour).":".($minute < 10 ? "0".$minute : $minute).":00";
			$hourEnd = $hour+1;
			$data[2] = ($year < 10 ? "0".$year : $year)."-".($month < 10 ? "0".$month : $month)."-".($day < 10 ? "0".$day : $day)." ".($hourEnd < 10 ? "0".$hourEnd : $hourEnd).":".($minute < 10 ? "0".$minute : $minute).":00";

			mysql_query("REPLACE INTO Einzeltermine ( termin_nr, klausur_nr, startTime, endTime) VALUES ('".$data[0]."', '".$id."', '".$data[1]."', '".$data[2]."')"); 
		}

		$klausurTS = mktime(0,0,0, $month, $day, $year);
		$klausurDate = date('d.m.Y', $klausurTS);
		$checkPoint = tcDates($klausurTS, $Settings);

		mysql_query("INSERT INTO TerminCheckList (klausur_nr, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, 
			c13, c14, c15, c16, c17, c18, c19, bool1, bool2, bool3, bool4, bool5, bool6, bool7, bool8, bool9, 
			bool10, bool11, bool12, bool13, bool14, bool15, bool16, bool17, bool18, bool19) VALUES('".$id."', 
			'".convertTimeToSQLFormat($checkPoint[0])."', '".convertTimeToSQLFormat($checkPoint[1])."', '".convertTimeToSQLFormat($checkPoint[2])."', 
			'".convertTimeToSQLFormat($checkPoint[3])."', '".convertTimeToSQLFormat($checkPoint[4])."', '".convertTimeToSQLFormat($checkPoint[5])."', 
			'".convertTimeToSQLFormat($checkPoint[6])."', '".convertTimeToSQLFormat($checkPoint[7])."', '".convertTimeToSQLFormat($checkPoint[8])."', 
			'".convertTimeToSQLFormat($checkPoint[9])."', '".convertTimeToSQLFormat($checkPoint[10])."', '".convertTimeToSQLFormat($checkPoint[11])."', 
			'".convertTimeToSQLFormat($checkPoint[12])."', '".convertTimeToSQLFormat($checkPoint[13])."', '".convertTimeToSQLFormat($checkPoint[14])."', 
			'".convertTimeToSQLFormat($checkPoint[15])."', '".convertTimeToSQLFormat($checkPoint[16])."', '".convertTimeToSQLFormat($checkPoint[17])."', 
			'".convertTimeToSQLFormat($checkPoint[18])."', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 
			'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false')"); 
	}

	for($p = 0; $p < $MAX_DATES; $p++) {
		fillDates($Settings);
	}
	echo "done";

?>