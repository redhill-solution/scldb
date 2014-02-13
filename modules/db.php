<?php
  	$er_tbl_1 = "<table width='300' border='0' align='center' method='post'><tr><td align='center'><font color='#FF0000'>";
	$er_tbl_2 = "</font></td></tr></table>";

	/*
	//reading config file ---------------
	if($_SESSION['server'] == NULL) {
		$i = 0;
		$config_path = "http://".$_SERVER['SERVER_NAME']."/DB/config/sql_config.txt";
		$file_handle = fopen($config_path, "r") or die ("Konnte die Datei '".$config_path."' nicht öffnen! \n");
		while (!feof($file_handle)) {
			list  ($field1, $field2, $field3) = fscanf($file_handle, "%s %s %s");
			$arr[$i] = $field3;
			$i++;
		}
		fclose($file_handle);
		$_SESSION['server'] = $arr[0];
		$_SESSION['db'] = $arr[1];
	}*/
	date_default_timezone_set('Europe/Berlin'); 

	$_SESSION['server'] = "localhost";
	$_SESSION['db'] = "scldb";
	$_SESSION['username'] = "scldb";
	$_SESSION['password'] = 'scldb1234';
	//-----------------------------------
	//echo SID;
	mysql_connect($_SESSION['server'], $_SESSION['username'], $_SESSION['password']);
	mysql_select_db($_SESSION['db']);
	if (mysql_error()) {
		$output .= $er_tbl_1;
        $output .= mysql_errno() . ": " . mysql_error(). "\n";
		$output .= $er_tbl_2;
	}
	else {
		mysql_query("SET NAMES 'utf8'");
		//----------------------------------------------------------------------------------------------------------------------------------
		//Termin Tabellen
		mysql_query("CREATE TABLE IF NOT EXISTS KlausurBlock (	 
														klausur_nr INT(10) UNSIGNED AUTO_INCREMENT NOT NULL, 
														klausur_name VARCHAR(50), 
														fb TINYINT(3) UNSIGNED DEFAULT '1',
														startTime DATETIME,
														endTime DATETIME, 
														betreuerSCL VARCHAR(75),
														dozent VARCHAR(75),
														partnerFB VARCHAR(75),
														anzahlTeilnehmer SMALLINT(5) UNSIGNED DEFAULT '0',
														editorValue TEXT,
														genehmigt TINYINT(1) UNSIGNED DEFAULT '1',
														erstellt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
														PRIMARY KEY(klausur_nr), 
														INDEX klausur_name(klausur_name), 
														INDEX startTime(startTime),
														INDEX dozent(dozent)
														) ENGINE=InnoDB DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
													);
		mysql_query("CREATE TABLE IF NOT EXISTS Einzeltermine (
														klausur_nr INT(10) UNSIGNED NOT NULL,
														termin_nr INT(10) UNSIGNED NOT NULL,
														startTime DATETIME,
														endTime DATETIME,
														aufsichtSCL VARCHAR(75),
														aufsichtSCL2 VARCHAR(75),
														aufsicht VARCHAR(75),
														aufsicht2 VARCHAR(75),
														anzahlTeilnehmer SMALLINT(5) UNSIGNED DEFAULT '0',
														PRIMARY KEY(termin_nr),
														INDEX startTime(startTime)
														) ENGINE=InnoDB DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
													);

		mysql_query("CREATE TABLE IF NOT EXISTS TerminCheckList (
														klausur_nr INT(10) UNSIGNED NOT NULL,
														c1 DATETIME,
														c2 DATETIME,
														c3 DATETIME,
														c4 DATETIME,
														c5 DATETIME,
														c6 DATETIME,
														c7 DATETIME,
														c8 DATETIME,
														c9 DATETIME,
														c10 DATETIME,
														c11 DATETIME,
														c12 DATETIME,
														c13 DATETIME,
														c14 DATETIME,
														c15 DATETIME,
														c16 DATETIME,
														c17 DATETIME,
														c18 DATETIME,
														c19 DATETIME,
														bool1 CHAR(5) DEFAULT 'false',
														bool2 CHAR(5) DEFAULT 'false',
														bool3 CHAR(5) DEFAULT 'false',
														bool4 CHAR(5) DEFAULT 'false',
														bool5 CHAR(5) DEFAULT 'false',
														bool6 CHAR(5) DEFAULT 'false',
														bool7 CHAR(5) DEFAULT 'false',
														bool8 CHAR(5) DEFAULT 'false',
														bool9 CHAR(5) DEFAULT 'false',
														bool10 CHAR(5) DEFAULT 'false',
														bool11 CHAR(5) DEFAULT 'false',
														bool12 CHAR(5) DEFAULT 'false',
														bool13 CHAR(5) DEFAULT 'false',
														bool14 CHAR(5) DEFAULT 'false',
														bool15 CHAR(5) DEFAULT 'false',
														bool16 CHAR(5) DEFAULT 'false',
														bool17 CHAR(5) DEFAULT 'false',
														bool18 CHAR(5) DEFAULT 'false',
														bool19 CHAR(5) DEFAULT 'false',
														PRIMARY KEY(klausur_nr)
														) ENGINE=InnoDB DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
													);


		mysql_query("CREATE TABLE IF NOT EXISTS QMListe (
														klausur_nr INT(10) UNSIGNED NOT NULL,
														P1  Char(5) DEFAULT 'false',
														P2  CHAR(5) DEFAULT 'false',
														P3  CHAR(5) DEFAULT 'false',
														P4  CHAR(5) DEFAULT 'false',
														P5  CHAR(5) DEFAULT 'false',
														P6  CHAR(5) DEFAULT 'false',
														P7  CHAR(5) DEFAULT 'false',
														P8  CHAR(5) DEFAULT 'false',
														P9  CHAR(5) DEFAULT 'false',
														P10 CHAR(5) DEFAULT 'false',
														P11 CHAR(5) DEFAULT 'false',
														P12 CHAR(5) DEFAULT 'false',
														P13 CHAR(5) DEFAULT 'false',
														P14 CHAR(5) DEFAULT 'false',
														P15 CHAR(5) DEFAULT 'false',
														P16 CHAR(5) DEFAULT 'false',
														P17 CHAR(5) DEFAULT 'false',
														P18 CHAR(5) DEFAULT 'false',
														PRIMARY KEY(klausur_nr)
														) ENGINE=InnoDB DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
													);
		mysql_query("CREATE TABLE IF NOT EXISTS ProblemListe (
														id INT(10) UNSIGNED NOT NULL,
														klausur_nr INT(10) UNSIGNED,
														terminID INT(10) UNSIGNED,
														Problembereich VARCHAR(50),
														ProbZeitpunkt DATETIME,
														ProbBeschreibung VARCHAR(50),
														ProbStatQuo VARCHAR(50),
														ProbErledigt CHAR(5) DEFAULT 'false',
														PRIMARY KEY(id),
														INDEX klausur_nr(klausur_nr),
														INDEX terminID(terminID)
														) ENGINE=InnoDB DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
													);
		//----------------------------------------------------------------------------------------------------------------------------------
		// Stamm Daten
		mysql_query("CREATE TABLE IF NOT EXISTS Autoren (
														autoren_nr SMALLINT(5) UNSIGNED AUTO_INCREMENT NOT NULL,
														anrede VARCHAR(50),
														vorname VARCHAR(50),
														nachname VARCHAR(50),
														titel VARCHAR(25),
														email VARCHAR(75),
														telefon VARCHAR(30),
														interessent CHAR(5) DEFAULT 'false',
														klausur CHAR(5) DEFAULT 'false',
														moodleTest Char(5) DEFAULT 'false',
														einfuehrung Char(5) DEFAULT 'false',
														fb TINYINT(3) UNSIGNED DEFAULT '1',
														institut VARCHAR(75),
														fachgebiet VARCHAR(75),
														winAuth CHAR(5) DEFAULT 'false',
														winAuthDate DATETIME,
														perceptionName VARCHAR(75),
														perceptionFolder VARCHAR(75),
														kommentar TEXT,
														lizenz INT(10),
														login CHAR(5) DEFAULT 'false',
														PRIMARY KEY(autoren_nr),
														INDEX nachname(nachname)
														) ENGINE=InnoDB DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
													);
		mysql_query("CREATE TABLE IF NOT EXISTS Lizenzen (
														id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL,
														lizenz VARCHAR(50) DEFAULT NULL,
														vergeben TINYINT(1) default 0,
														autor SMALLINT(5) UNSIGNED,
														PRIMARY KEY(id),
														UNIQUE lizenz(lizenz),
														INDEX autor(autor)
														) ENGINE=InnoDB DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
													);
		mysql_query("CREATE TABLE IF NOT EXISTS Fachbereiche (
														id TINYINT(3) UNSIGNED AUTO_INCREMENT NOT NULL,
														fb VARCHAR(50),
														PRIMARY KEY(id),
														UNIQUE INDEX fb(fb)
														) ENGINE=InnoDB DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
													);

		mysql_query("CREATE TABLE IF NOT EXISTS Einstellungen (
														category TINYINT(3) UNSIGNED,
														setting TINYINT(3) UNSIGNED NOT NULL,
														value VARCHAR(75),
														PRIMARY KEY(setting),
														INDEX category(category)
														) ENGINE=InnoDB DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
													);
		
		mysql_query("ALTER TABLE `KlausurBlock` ADD FOREIGN KEY (`fb`) REFERENCES `Fachbereiche`(`id`) ON UPDATE CASCADE");
		mysql_query("ALTER TABLE `Einzeltermine` ADD FOREIGN KEY (`klausur_nr`) REFERENCES `KlausurBlock`(`klausur_nr`) ON DELETE CASCADE ON UPDATE CASCADE");
		mysql_query("ALTER TABLE `TerminCheckList` ADD FOREIGN KEY (`klausur_nr`) REFERENCES `KlausurBlock`(`klausur_nr`) ON DELETE CASCADE ON UPDATE CASCADE");
		mysql_query("ALTER TABLE `QMListe` ADD FOREIGN KEY (`klausur_nr`) REFERENCES `KlausurBlock`(`klausur_nr`) ON DELETE CASCADE ON UPDATE CASCADE");
		mysql_query("ALTER TABLE `ProblemListe` ADD FOREIGN KEY (`klausur_nr`) REFERENCES `KlausurBlock`(`klausur_nr`) ON DELETE CASCADE ON UPDATE CASCADE");
		//----------------------------------------------------------------------------------------------------------------------------------
		mysql_query("INSERT IGNORE INTO Fachbereiche(fb) VALUES('FB01 - Humanwissenschaften'),
														('FB02 - Geistes- und Kulturwissenschaften'),
														('FB05 - Gesellschaftswissenschaften'),
														('FB06 - Architektur, Stadt- und Landschaftsplanung'),
														('FB07 - Wirtschaftswissenschaften'),
														('FB10 - Mathematik und Naturwissenschaften'),
														('FB11 - Ökologische Agrarwissenschaften'),
														('FB14 - Bauingenieur- und Umweltingenieurwesen'),
														('FB15 - Maschinenbau'),
														('FB16 - Elektrotechnik/Informatik'),
														('SCL - Service Center Lehre')");
		mysql_query("INSERT IGNORE INTO Einstellungen(category, setting, value) 
												VALUES 	('1', '1',  '-27'),
														('1', '2',  '-25'),
														('1', '3',  '-24'),
														('1', '4',  '-22'),
														('1', '5',  '-17'),
														('1', '6',  '-15'),
														('1', '7',  '-13'),
														('1', '8',  '-12'),
														('1', '9',   '-9'),
														('1', '10',  '-7'),
														('1', '11',  '-5'),
														('1', '12',  '-3'),
														('1', '13',  '-2'),
														('1', '14',  '-2'),
														('1', '15',  '-1'),
														('1', '16',  '3'),
														('1', '17',  '4'),
														('1', '18',  '5'),
														('1', '19',  '6')");
if (mysql_error()) { //get error
			$output .= "<script>alert(\"".mysql_errno() . ": " . mysql_error()."\");</script>";;
		}
		$_SESSION['connected'] = 'true';
	}
?>