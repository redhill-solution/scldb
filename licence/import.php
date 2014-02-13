<?php
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

	function import($file, $trennZeichen) {
		if(empty($trennZeichen)) $trennZeichen = "\n";
		$file = file_get_contents($file);
		$importLizenzen = explode($trennZeichen, $file);
		$counter = 0;
		$sql = "INSERT INTO Lizenzen (lizenz) VALUES";
		for($i = 0; $i < sizeof($importLizenzen); $i++) {
			$importLizenzen[$i] = preg_replace('/\s/', '', $importLizenzen[$i]);
			if($importLizenzen[$i] != "") {
				$sql .= ($i > 0 ? ", " : "")."('".$importLizenzen[$i]."')";
				$counter++;
			} 
		}
		$sql .= " ON DUPLICATE KEY UPDATE lizenz = VALUES(lizenz)";
		mysql_query($sql);
		if (mysql_error()) {
	        return mysql_errno() . ": " . mysql_error();
		} else {
			return $counter." Lizenzen wurden importiert";
		}
	}
	$allowedExts = array("txt");
	$temp = explode(".", $_FILES["file"]["name"]);
	$extension = end($temp);
	if (($_FILES["file"]["type"] == "text/plain")
	&& ($_FILES["file"]["size"] < 20000)
	&& in_array($extension, $allowedExts))
	  {
	  if ($_FILES["file"]["error"] > 0)
	    {
	    $output = "Return Code: " . $_FILES["file"]["error"];
	    }
	  else
	    {

	    if (file_exists("upload/" . $_FILES["file"]["name"]))
	      {
	      $output = $_FILES["file"]["name"] . " already exists. ";
	      }
	    else
	      {
			$output = import($_FILES["file"]["tmp_name"]);

	      }
	    }
	  }
	else
	  {
	  $output = "Invalid file";
	  }
	  $_SESSION['output'] = $output;
	  header("Location: ./list.php"); 

?>