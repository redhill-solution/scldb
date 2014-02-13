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

	function fillLic() {

		$char = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
		for($i = 0; $i < rand(10, 17); $i++) {
			$lizenz .= $char[rand(0,51)];
		}

		$vergeben = rand(0,1);
		$autor = rand(1, 80);
		
		mysql_query("REPLACE INTO Lizenzen (lizenz, vergeben, autor) VALUES('{$lizenz}', '{$vergeben}', '{$autor}')"); 
	}

	for($p = 0; $p < $MAX_AUTH; $p++) {
		fillLic();
	}
	echo "done";

?>