<?php
	$MAX_AUTH = 85;
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

	function fillAuth() {
		$char = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
		for($j = 0; $j < rand(4, 5); $j++) {
			$anrede .= $char[rand(0,51)];
		}
		for($i = 0; $i < rand(10, 17); $i++) {
			$vorname .= $char[rand(0,51)];
			$nachname .= $char[rand(0,51)];
			$preMail .= $char[rand(0,51)];
			$afterMail .= $char[rand(0,51)];
			$perceptionName .= $char[rand(0,51)];
			$telefon .= rand(0, 9);
		}
		$email = $preMail."@".$afterMail.".de";
		$fb = rand(1,11);
		$interessent = "true";
		$klausur = "true";
		$moodleTest = "true";
		$bba = "true";
		$winAuth = "true";

		$year = "2014";
		$lizenz = rand(1,100);
		$month = rand(1,12);
		$day = rand(1,28);
		$hour = rand(8,16);
		$minute = rand(0,59);
		$bbaDate = ($year < 10 ? "0".$year : $year)."-".($month < 10 ? "0".$month : $month)."-".($day < 10 ? "0".$day : $day)." ".($hour < 10 ? "0".$hour : $hour).":".($minute < 10 ? "0".$minute : $minute).":00";
		$winAuthDate = ($year < 10 ? "0".$year : $year)."-".($month < 10 ? "0".$month : $month)."-".($day < 10 ? "0".$day : $day)." ".($hourEnd < 10 ? "0".$hourEnd : $hourEnd).":".($minute < 10 ? "0".$minute : $minute).":00";
		mysql_query("REPLACE INTO Autoren (anrede, vorname, nachname, email, telefon, interessent, klausur, moodleTest, fb, winAuth, winAuthDate, perceptionName, lizenz) VALUES('{$anrede}', '{$vorname}', '{$nachname}', '{$email}', '{$telefon}', '{$interessent}', '{$klausur}', '{$moodleTest}', {$fb}, '{$winAuth}', '{$winAuthDate}', '{$perceptionName}', '{$lizenz}')"); 
	}

	for($p = 0; $p < $MAX_AUTH; $p++) {
		fillAuth();
	}
	echo "done";

?>