<?php 
session_start();
if( isset($_GET['location']) && !empty($_GET['location'])){
	$location = $_GET['location'];
} else {
	$location = "../";
}

if ($_SESSION['illegal_access'] > 0) {
	$output .= "<table width=\"300\" border=\"0\" align=\"center\" method=\"post\"><tr><td align=\"center\" class=\"error\">Sie müssen eingeloggt sein!</td></tr></table>";
	} else $_SESSION['illegal_access'] = 'false';
	
	if ($_SESSION['loggedout'] > 0) {
		$output .= "<table width=\"300\" border=\"0\" align=\"center\" method=\"post\"><tr><td align=\"center\" class=\"normal\">Sie wurden ordnungsgemäß ausgeloggt!></td></tr></table>";
	} else $_SESSION['illegal_access'] = 'false';
		
	if (isset($_POST['formaction'])) {
		$_SESSION['connected'] = 'false';
		$_SESSION['username'] = $_POST['Username'];
		$_SESSION['password'] = $_POST['Pass'];
		require '../modules/db.php';
		if ($_SESSION['connected'] == 'true') {
			header ("Location: ".$location); 
		} 
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<style type="text/css">
  @import "../css/font.css";
</style>
</head>
<body>
<form method="post">
<table width="300" border="0" align="center" method="post" action="">
  <tr>
    <td width="80">Nutzer:</td>
    <td width="220"><input type="text" name="Username" value=<?php echo $_SESSION['username'];?> />&nbsp;</td>
  </tr>
  <tr>
    <td width="80">Passwort:</td>
    <td width="220"><input type="password" name="Pass" value=<?php echo $_SESSION['password'];?>/>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <input type="submit" name="formaction" value="Einloggen" />&nbsp;</td>
  </tr>
</table> 
</form>
<?php 
	echo $output;
	
?>
</body>
</html>