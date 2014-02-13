<?php
	function date2sql($date) {
		if($date == NULL || $date == "") { return ("NULL"); }
		list($DateFormat_Day,$DateFormat_Month, $DateFormat_Year) = explode('.', $date);
		if($DateFormat_Day < 10 && substr($DateFormat_Day, 0, 1) !== '0') 
			$DateFormat_Day = "0".$DateFormat_Day;
		if($DateFormat_Month < 10 && substr($DateFormat_Month, 0, 1) !== '0') 
			$DateFormat_Month = "0".$DateFormat_Month;
		$DateFormat =$DateFormat_Year."-".$DateFormat_Month."-".$DateFormat_Day;
		$TimeFormat	= $DateFormat." 00:00:00";
		return ("'".$TimeFormat."'");
	}
	function sql2date($date) {
		if($date == NULL || $date == "") return ("");
		$date = substr($date, 0, -9);
		list($DateFormat_Year,$DateFormat_Month, $DateFormat_Day) = explode('-', $date);
		if($DateFormat_Day < 10 && substr($DateFormat_Day, 0, 1) !== '0') 
			$DateFormat_Day = "0".$DateFormat_Day;
		if($DateFormat_Month < 10 && substr($DateFormat_Month, 0, 1) !== '0') 
			$DateFormat_Month = "0".$DateFormat_Month;
		$DateFormat =$DateFormat_Day.".".$DateFormat_Month.".".$DateFormat_Year;
		return ($DateFormat);
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

		$lizenz = $_POST['lizenz'];
		if($lizenz != "" && $lizenz != null)  { //echo "<script> alert(\"test\");alert(\"".$lizenz."\"); </script>";
			$vergeben = 1;
		} else {
			$lizenz = "NULL";
			$vergeben = 0;
		}
		mysql_query("REPLACE INTO Autoren (".($_POST['id'] == '(neu)' ? "" : "autoren_nr,")." anrede, vorname, nachname, titel, email, 
			telefon, interessent, klausur, moodleTest, einfuehrung, fb, institut, fachgebiet, 
			winAuth, winAuthDate, perceptionName, perceptionFolder, kommentar, lizenz, login ) 
		VALUES(".($_POST['id'] == '(neu)' ? "" : "'".$_POST['id']."',")." ".($_POST['anrede'] == "" ? "NULL" : "'".$_POST['anrede']."'").", 
			".($_POST['vorname'] == "" ? "NULL" : "'".$_POST['vorname']."'").", ".($_POST['nachname'] == "" ? "NULL" : "'".$_POST['nachname']."'").", 
			".($_POST['titel'] == "" ? "NULL" : "'".$_POST['titel']."'").", ".($_POST['email'] == "" ? "NULL" : "'".$_POST['email']."'").", 
			".($_POST['telefon'] == "" ? "NULL" : "'".$_POST['telefon']."'").", ".($_POST['interessent'] == "on" ? "'true'" : "'false'").",
			".($_POST['klausur'] == "on" ? "'true'" : "'false'").", ".($_POST['moodleTest'] == "on" ? "'true'" : "'false'").", ".($_POST['einfuehrung'] == "on" ? "'true'" : "'false'").",
			(SELECT id FROM Fachbereiche WHERE fb = '".$_POST['fb']."'), ".($_POST['institut'] == "" ? "NULL" : "'".$_POST['institut']."'").", 
			".($_POST['fachgebiet'] == "" ? "NULL" : "'".$_POST['fachgebiet']."'").", ".($_POST['winAuth'] == "on" ? "'true'" : "'false'").", ".date2sql($_POST['winAuthDate']).", 
			".($_POST['perceptionName'] == "" ? "NULL" : "'".$_POST['perceptionName']."'").", ".($_POST['perceptionFolder'] == "" ? "NULL" : "'".$_POST['perceptionFolder']."'").", 
			".($_POST['kommentar'] == null || $_POST['kommentar'] == "null" ? "NULL" : "'".$_POST['kommentar']."'").", (SELECT id FROM Lizenzen WHERE lizenz = '".$lizenz."'), ".($_POST['login'] == "on" ? "'true'" : "'false'").")"); 

		

		if($_POST['id'] == '(neu)') {
			//neu
			$Lid = mysql_insert_id();
			mysql_query("INSERT INTO Lizenzen (lizenz, autor, vergeben) VALUES('".$lizenz."',".$Lid.",".$vergeben.") ON DUPLICATE KEY UPDATE autor = ".$Lid.", vergeben = ".$vergeben);
		} else {
			$Lid = $_POST['id']; 
			if(isset($lizenz) && !empty($lizenz) && $lizenz != null && $lizenz != "NULL") {
				//ändern
				$vergeben = 1;
				if($_POST['origLiz'] != null && $_POST['origLiz'] != "" && $_POST['origLiz'] != "null") {
					mysql_query("INSERT INTO Lizenzen (lizenz, autor, vergeben) VALUES('".$_POST['origLiz']."', NULL, 0) ON DUPLICATE KEY UPDATE autor = NULL, vergeben = 0");
				} 
				mysql_query("INSERT INTO Lizenzen (lizenz, autor, vergeben) VALUES('".$lizenz."', ".$Lid.", 1) ON DUPLICATE KEY UPDATE autor = ".$Lid.", vergeben = 1");
			} else {
				$vergeben = 0;
				//löschen
				mysql_query("INSERT INTO Lizenzen (lizenz, autor, vergeben) VALUES('".$_POST['origLiz']."', NULL, 0) ON DUPLICATE KEY UPDATE autor = NULL, vergeben = 0");
			}
		}
				
		header("Location: ./edit.php?id=".$Lid);

	}
	//+-----------------------------------------------------------------------------------------+
	//|		Delete Data																			|
	//+-----------------------------------------------------------------------------------------+
	if (isset($_POST['ctrl_delete']) && !empty($_POST['ctrl_delete'])) {
		mysql_query("DELETE FROM Autoren WHERE autoren_nr = ".$_POST['id']);
		header("Location: ./list.php"); 
	}
	//+-----------------------------------------------------------------------------------------+
	//|		Get Data																			|
	//+-----------------------------------------------------------------------------------------+
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
	// Lade alle Lizenzen 
	$getLizenzen = mysql_query('SELECT lizenz FROM Lizenzen WHERE vergeben = 0');
	if(mysql_num_rows($getLizenzen) > 0) {
		$lizenzArray;
		$lizCnt = 0;
		while($lizResult=mysql_fetch_array($getLizenzen)) {
			$lizenzArray[$lizCnt] = $lizResult[0];
			$lizCnt++;
		}
	} else { $lizenzArray[0] = 0; }
	// Lade alle Autoren
	$getAllAuthors = mysql_query('SELECT vorname, nachname FROM Autoren ORDER BY nachname');
	if(mysql_num_rows($getAllAuthors) > 0) {
		$AutorenSurName;
		$AutorenLastName;
		$AutCnt = 0;
		while($AutorenRes=mysql_fetch_array($getAllAuthors)) {
			$AutorenSurName[$AutCnt] 	= $AutorenRes[0];
			$AutorenLastName[$AutCnt]	= $AutorenRes[1];
			$AutCnt++;
		}
	} else {
		$AutorenSurName = array();
		$AutorenLastName = array();
	}

	if(isset($_GET['id']) && !empty($_GET['id'])) {
		$id = $_GET['id'];
		//Lade Infos dieses Autors
		$getThisAuthor = mysql_query("SELECT e.*, s.fb, p.lizenz FROM Autoren e INNER JOIN Fachbereiche s ON s.id = e.fb LEFT OUTER JOIN Lizenzen p ON p.id = e.lizenz WHERE autoren_nr=".$id);
		while($thisAuthResult = mysql_fetch_array($getThisAuthor)) {
			$Autor["id"] = $thisAuthResult[0];
			$Autor["anrede"] = $thisAuthResult[1];
			$Autor["vorname"] = $thisAuthResult[2];
			$Autor["nachname"] = $thisAuthResult[3];
			$Autor["titel"] = $thisAuthResult[4];
			$Autor["email"] = $thisAuthResult[5];
			$Autor["telefon"] = $thisAuthResult[6];
			$Autor["interessent"] = $thisAuthResult[7];
			$Autor["klausur"] =$thisAuthResult[8];
			$Autor["moodleTest"] = $thisAuthResult[9];
			$Autor["einfuehrung"] = $thisAuthResult[10];
			//Fb ID = $thisAuthResult[11];
			$Autor["institut"] = $thisAuthResult[12];
			$Autor["fachgebiet"] = $thisAuthResult[13];
			$Autor["winAuth"] = $thisAuthResult[14];
			$Autor["winAuthSince"] = sql2date($thisAuthResult[15]);
			$Autor["perceptionName"] = $thisAuthResult[16];
			$Autor["perceptionFolder"] = $thisAuthResult[17];
			$Autor["kommentar"] = $thisAuthResult[18];
			
			$Autor["login"] = $thisAuthResult[20];
			$Autor["fb"] = $thisAuthResult[21];
			$Autor["lizenz"] = $thisAuthResult[22];
		}
		//Lade alle Klausuren des Autors
		$nameString = $Autor["nachname"].", ".$Autor["vorname"];
		//$today = date("Y-m-d H:i:s");
		$today = date("Y-m-d H:i:s", mktime(0,0,0,1,1,2014));
		$getTests = mysql_query("SELECT klausur_nr, klausur_name, startTime, endTime FROM KlausurBlock WHERE dozent = '{$nameString}' AND startTime >= '{$today}' ORDER BY startTime ASC");
		$counter = 0;
		while($testResult = mysql_fetch_array($getTests)) {
			$Klausur[$counter]["id"] = $testResult[0];
			$Klausur[$counter]["name"] = $testResult[1];
			$Klausur[$counter]["startTime"] = date_create($testResult[2])->getTimestamp();
			$Klausur[$counter]["endTime"] = date_create($testResult[3])->getTimestamp();
			$counter++;
		}
	} else {
		$Autor["id"] = "(neu)";
		$Autor["anrede"] = NULL;
		$Autor["vorname"] = NULL;
		$Autor["nachname"] = NULL;
		$Autor["titel"] = NULL;
		$Autor["email"] = "";
		$Autor["telefon"] = "";
		$Autor["interessent"] = NULL;
		$Autor["klausur"] = NULL;
		$Autor["moodleTest"] = NULL;
		$Autor["einfuehrung"] = NULL;
		//Fb ID = $thisAuthResult[10];
		$Autor["institut"] = "";
		$Autor["fachgebiet"] = "";
		$Autor["winAuth"] = NULL;
		$Autor["winAuthSince"] = "";
		$Autor["perceptionName"] = "";
		$Autor["perceptionFolder"] = "";
		$Autor["kommentar"] = "";
		$Autor["lizenz"] = NULL;
		$Autor["login"] = NULL;
		$Autor["fb"] = $fbArray[0];
	}


?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>E-Klausuren DB - Autoren</title>
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

	var autor = new Array();
	var autorenVorname = new Array();
	var autorenNachname = new Array();
	var fachbereiche = new Array();
	var klausuren = new Array();
	var numOfKlausur;
	var lizenzArray = new Array();

	autor	= <?php echo json_encode($Autor); ?>;
	autorenVorname	= <?php echo json_encode($AutorenSurName); ?>;
	autorenNachname	= <?php echo json_encode($AutorenLastName); ?>;
	fachbereiche = <?php echo json_encode($fbArray); ?>;
	klausuren = <?php echo json_encode($Klausur); ?>;
	numOfKlausur = <?php echo json_encode($counter); ?>;
	lizenzArray = <?php echo json_encode($lizenzArray); ?>;

</script>
<script type="text/javascript" language="javascript" src="createAuthor.js">
</script>
<script src="../modules/navi.js"></script>
<script> navi("info_box",2); </script>
</body>
</html>