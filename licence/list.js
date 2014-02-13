// JavaScript Document
	function newContact() {
		if(confirm('Neuen Autor erstellen?')){
			window.location.href = "./edit.php";
		}
	}
	function formatNumber(num) {
		if(num < 10) num = "0"+num;
		return [num];
	}
	function compareID_UP(a,b) {
		if (parseFloat(a.id) < parseFloat(b.id))
			return -1;
		if (parseFloat(a.id) > parseFloat(b.id))
			return 1;
		return 0;
	}
	function compareID_DOWN(a,b) {
		if (parseFloat(a.id) > parseFloat(b.id))
			return -1;
		if (parseFloat(a.id) < parseFloat(b.id))
			return 1;
		return 0;
	}
	function compareLastName_UP(a,b) {
		if (a.nachname.toLowerCase() < b.nachname.toLowerCase())
			return -1;
		if (a.nachname.toLowerCase() > b.nachname.toLowerCase())
			return 1;
		return 0;
	}
	function compareLastName_DOWN(a,b) {
		if (a.nachname.toLowerCase() > b.nachname.toLowerCase())
			return -1;
		if (a.nachname.toLowerCase() < b.nachname.toLowerCase())
			return 1;
		return 0;
	}
	function compareSurName_UP(a,b) {
		if (a.vorname.toLowerCase() < b.vorname.toLowerCase())
			return -1;
		if (a.vorname.toLowerCase() > b.vorname.toLowerCase())
			return 1;
		return 0;
	}
	function compareSurName_DOWN(a,b) {
		if (a.vorname.toLowerCase() > b.vorname.toLowerCase())
			return -1;
		if (a.vorname.toLowerCase() < b.vorname.toLowerCase())
			return 1;
		return 0;
	}
	function compareFB_UP(a,b) {
		if (a.fb.toLowerCase() < b.fb.toLowerCase())
			return -1;
		if (a.fb.toLowerCase() > b.fb.toLowerCase())
			return 1;
		return 0;
	}
	function compareFB_DOWN(a,b) {
		if (a.fb.toLowerCase() > b.fb.toLowerCase())
			return -1;
		if (a.fb.toLowerCase() < b.fb.toLowerCase())
			return 1;
		return 0;
	}
	function compareLicense_UP(a,b) {
		if (a.lizenz.toLowerCase() < b.lizenz.toLowerCase())
			return -1;
		if (a.lizenz.toLowerCase() > b.lizenz.toLowerCase())
			return 1;
		return 0;
	}
	function compareLicense_DOWN(a,b) {
		if (a.lizenz.toLowerCase() > b.lizenz.toLowerCase())
			return -1;
		if (a.lizenz.toLowerCase() < b.lizenz.toLowerCase())
			return 1;
		return 0;
	}
	function showImport() {
		var upload = "<div id='WinBorder'>";
		upload += "<span id='WinHeadText'>Importiere Lizenzen</span>";
		upload += "</span>";
		upload += "</div>";
		upload += "<div align='center'><div id='borderImport'>&nbsp;</div></div>";
		upload += "<form action='import.php' method='post' enctype='multipart/form-data'>";
		upload += "<div id='uploadCenter' align='center'>";
		upload += "<label for='file'>Datei:</label>";
		upload += "<input type='file' name='file' id='file' accept='text/plain'><br>";
		upload += "</div>";
		upload += "<div id='control' align='center'>"
		upload += "<input type='submit' name='submit' value='Importieren'>";
		upload += "<input type='button' value='Abbrechen' onclick='cancelImport()'>";
		upload += "</div>";
		upload += "</form>";

		div = document.createElement("div");
		div.id = "uploadForm";
		div.style.left = (($(window).width() / 2) - (450/2))+"px";
		div.innerHTML = upload;
		document.body.appendChild(div);

		div = document.createElement("div");
		div.id = "uploadBack";
		document.body.appendChild(div);
	}

	function cancelImport() {
		var element = document.getElementById("uploadForm");
		if(element != null) {
			element.parentNode.removeChild(element);
		}
		element = document.getElementById("uploadBack");
		if(element != null) {
			element.parentNode.removeChild(element);
		}
	}
	Array.prototype.sortFor = function(option) {
		var element = document.getElementById("Table");
		if(element != null) element.parentNode.removeChild(element);
		if(!SortUp) {
			if(option == "compareID") this.sort(compareID_UP);
			if(option == "compareLastName") this.sort(compareLastName_UP);
			if(option == "compareSurName") this.sort(compareSurName_UP);
			if(option == "compareFB") this.sort(compareFB_UP);
			if(option == "compareLicense") this.sort(compareLicense_UP);
			SortUp = true;
		} else {
			if(option == "compareID") this.sort(compareID_DOWN);
			if(option == "compareLastName") this.sort(compareLastName_DOWN);		
			if(option == "compareSurName") this.sort(compareSurName_DOWN);		
			if(option == "compareFB") this.sort(compareFB_DOWN);		
			if(option == "compareLicense") this.sort(compareLicense_DOWN);
			SortUp = false;
		}
		var parentBlock = document.getElementById('Table');
        if(parentBlock != null) {
		           parentBlock.parentNode.removeChild(parentBlock);
        }
		createTable(this);
	}

	function showUsed() {
		var checkbox = document.getElementById("showCheck");
		if(checkbox != null) {
			var checkStatus = checkbox.checked;
			if(checkStatus == true ) {
				checkbox.checked = 0;
				//create New Array
				var newArray = new Array();
				var newIndex = 0;
				for(var i = 0; i < Autoren.length; i++) {
					if(Autoren[i].nachname != "") {
						newArray[newIndex++] = {id: Autoren[i].id, lizenz: Autoren[i].lizenz, vorname: Autoren[i].vorname, nachname: Autoren[i].nachname, vergeben: Autoren[i].vergeben, fb: Autoren[i].fb, autorenID: Autoren[i].autorenID};
					}
				}
				var parentBlock = document.getElementById('Table');
		        if(parentBlock != null) {
		           parentBlock.parentNode.removeChild(parentBlock);
		        }		 
      
		        createTable(newArray);
			} else {
				checkbox.checked = 1;
				var parentBlock = document.getElementById('Table');
		        if(parentBlock != null) {
		           parentBlock.parentNode.removeChild(parentBlock);
		        }	
		        createTable(Autoren);
			}
		}
	}
	function createTable(inAutoren) {
		alert
		var listLength = inAutoren.length;
		printArray = inAutoren;
		var htmlCode = 				"<tr class='TableHeadings'>";
		htmlCode += 					"<td class='TableID'><a href='javascript:void[0]' id='aID' >ID</a></td>";
		htmlCode += 					"<td class='TableLicense'><a href='javascript:void[0]' id='aLic' >Educampus-Lizenzen</a></td>";
		htmlCode += 					"<td class='TableLastName'><a href='javascript:void[0]' id='aLast' >Nachname</a></td>";
		htmlCode += 					"<td class='TableSurname'><a href='javascript:void[0]' id='aSur' >Vorname</a></td>";
		htmlCode += 					"<td class='TableFB'><a href='javascript:void[0]' id='aFB' >Fachbereich</a></td>";
		htmlCode += 				"</tr>";
		for(var DataCount = 0; DataCount < listLength; DataCount++){
			if(inAutoren[DataCount].vergeben != 0) {
				if((DataCount % 2) != 0) var TRColor = "TableTRLight";
				else var TRColor = "TableTRDark";
			} else {
				if((DataCount % 2) != 0) var TRColor = "TableTRLightNC";
				else var TRColor = "TableTRDarkNC";
			}
			htmlCode += 			"<tr class='"+TRColor+"' id='"+DataCount+"'>";
			htmlCode += 				"<td class='TableIDData'>"+inAutoren[DataCount].id+"</td>";
			htmlCode += 				"<td class='TableLicData'>"+inAutoren[DataCount].lizenz+"</td>";
			htmlCode += 				"<td class='TableLNData'>"+inAutoren[DataCount].nachname+"</td>";
			htmlCode += 				"<td class='TableSNData'>"+inAutoren[DataCount].vorname+"</td>";
			htmlCode += 				"<td class='TableFBData'>"+inAutoren[DataCount].fb+"</td>";
			htmlCode += 			"</tr>";
		}
		htmlCode += 			"<tr class='TableTRAdd'>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 	"<td colspan='2' style='text-align: center;'><span class='TableAddition'>"+usedLicence+" von "+Autoren.length+" Lizenzen vergeben</span></td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 			"</tr>";
		htmlCode += 			"<tr class='TableTR'>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 			"</tr>";

		var parentBlock = document.getElementById('mainBlock');
        if(parentBlock != null) {
            var table = document.createElement("table");
            table.id = "Table";
            table.innerHTML = htmlCode;
            parentBlock.appendChild(table); 
        }
        $("#aID").click(function() {
        	inAutoren.sortFor("compareID");
      	});
      	$("#aLic").click(function() {
        	inAutoren.sortFor("compareLicense");
      	});
  		$("#aLast").click(function() {
  	  		inAutoren.sortFor("compareLastName");
  		});
		$("#aSur").click(function() {
	  		inAutoren.sortFor("compareSurName");
		});
		$("#aFB").click(function() {
	  		inAutoren.sortFor("compareFB");
		});

        $(".TableTRDark").click(function() {
    		window.location.href = "../authors/edit.php?id="+inAutoren[parseFloat(this.id)].autorenID;
    	});
    	$(".TableTRLight").click(function() {
    		window.location.href = "../authors/edit.php?id="+inAutoren[parseFloat(this.id)].autorenID;
    	});
	}
//-------------------------------------------------------------------------------
	//Transfer PHP Variables to Javascript Variables
	/*var fbArray 		= new Array();
	var knameArray		= new Array();
	tms					= <?php echo json_encode($tms); ?>;
	gID					= <?php echo json_encode($gID); ?>;
	KlausurName			= <?php echo json_encode($KlausurName); ?>;
	startTime			= new Date( <?php echo json_encode($startTime); ?> *1000);
	endTime				= new Date( <?php echo json_encode($endTime); ?> *1000);*/
	//-------------------------------------------------------------------------------
	var SortUp = false;
	
	//var AuthArray 		= new Array();
	var AuthID			= ["0","1","2","3","4","5","6","7","8","9"];
	var printArray = new Array();
	//var numberOfAuths 	= AuthID.length

	//-------------------------------------------------------------------------------
	//Create HTML Elements
	var htmlCode = "<div align='center' id='center'><div id='container'>";
	htmlCode +=	"<div id='info_box'>";
	htmlCode += 		"<div id='toolBox'>";
	htmlCode += 			"<div id='newContactPos'><a href='javascript:void[0]' onclick='showImport()' title='neue Lizenz importieren'><div id='newContact'>&nbsp;</div></a></div>";
	//htmlCode += 			"<div id='printPos'><a href='javascript:void[0]' title='Liste drucken'><div id='print'>&nbsp;</div></a></div>";
	htmlCode += 			"<div id='toPDFPos'><a href='javascript:void[0]' title='Liste als PDF herunterladen'><div id='toPDF'>&nbsp;</div></a></div>";
	htmlCode += 			"<div id='horLine1'></div>";
	htmlCode +=				"<a href='javascript:void[0]' onclick='showUsed()' ><div id='showLic'><input type='checkbox' id='showCheck' value='false' checked><div id='showText'>zeige alle Lizenzen</div></div></a>";
	htmlCode += 		"</div>"; // toolBox
	htmlCode += 		"<div align='center'>";
	htmlCode += 		"<div id='mainBlock'>";
	htmlCode +=  		"</div>";	//mainBlock
	htmlCode +=  	"</div>";
	htmlCode += "</div>"; //info_box
	htmlCode += "</div></div>";
	htmlCode += "</br>"; //space
	
	document.write(htmlCode);

	if($.isArray(Autoren) && Autoren.length > 0) {
		var numberOfAuths 	= Autoren.length;
		Autoren.sortFor("compareID");
		//showUsed();
		/*for(var id = numberOfAuths; id >= 0; id--) {
			AuthArray[id] 		= {	id			: id,
									vorname 	: "Vorname"+id,
									nachname 	: "Nachname"+id,
									titel 		: "",
									fb 			: "FB"+id,
									lizenz 		: "",
									telefon 	: "",
									email 		: ""
								};
		}*/
	} else {
		var numberOfAuths 	= 0;
		var Autoren = new Array();
		createTable(Autoren);
	}
	$("#printPos").click(function() {;
		PrintElem(mainBlock);
	});
    $('#toPDFPos').click(function () {
    	var doc = new jsPDF();
    	//---------------------------------------------------------------
    	doc.setProperties({
    	    title: 'SCL Lizenzen - Übersicht',
    	    author: UserName.toString(),
    	    keywords: 'pdf, javascript,generated',
    	});
    	//---------------------------------------------------------------
    	var cWidth1 = 20;
    	var cWidth2 = 35;
    	var cWidth3 = 80;
    	var cWidth4 = 120;
    	var cWidth5 = 170;
    	var AuthArrayPDF = printArray;
    	var numberOfAuths = AuthArrayPDF.length;
    	AuthArrayPDF.sort(compareID_UP);
    	var currentPage = 1;
    	var PageStart = true;
    	var TableBegin = 24;
    	var TotalPages = 1;
    	var HeaderSpace = 6;
    	var LineSpace = 6;
    	var totalHeight = 276;
    	var MonthName = [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ];
    	var DayName = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    	var CurrentDate = new Date();
    	//---------------------------------------------------------------
    	var TotalRows = numberOfAuths;
    	var RowsPerPage;
    	var needPage = true;
    	var TableBeginSite = TableBegin;
    	var HeaderSpaceSite = HeaderSpace;
    	
    	while(needPage) {
    		RowsPerPage = Math.floor((totalHeight-TableBeginSite-HeaderSpaceSite)/LineSpace);
     		
	    	if((TotalRows - RowsPerPage) > 0 ) {
	    		//Zeilen passen nicht auf eine Seite
	    		TotalPages++;
	    		TotalRows -= RowsPerPage;
	    		TableBeginSite = 14;
	    		HeaderSpaceSite = 0;
	    	} else {
	    		if((totalHeight-TableBeginSite-HeaderSpaceSite-(TotalRows*LineSpace)-9) > 0) {
	    			//Alles passt auf eine Seite
	    			needPage = false;
	    		} else {
	    			//Zeilen Passen auf eine Seite, Footer aber nicht
		    		TotalPages++;
		    		TotalRows -= RowsPerPage;
		    		TableBeginSite = 14;
		    		HeaderSpaceSite = 0;
	    		}
	    	}
    	}
    	//---------------------------------------------------------------
    	doc.setDrawColor(0);
    	doc.setFillColor(225, 220, 200);
    	doc.rect(10, 10, 190, 10, 'F')
    	doc.setFontSize(20);
    	doc.setFont("helvetica");
    	doc.text(15, 18, 'SCL Lizenzen - Übersicht');
    	//---------------------------------------------------------------
    	doc.setFontSize(9);
    	doc.setFontType("bold");
    	doc.setFont("helvetica");
    	//---------------------------------------------------------------
    	doc.setDrawColor(0);
    	doc.setFillColor(73, 73, 73);
    	doc.rect(10, 20, 190, 5, 'F')
    	doc.setTextColor(255);
    	doc.text(cWidth1, TableBegin, 'ID');
    	doc.text(cWidth2, TableBegin, 'Educampus-Lizenzen');
    	doc.text(cWidth3, TableBegin, 'Nachname');
    	doc.text(cWidth4, TableBegin, 'Vorname');
    	doc.text(cWidth5, TableBegin, 'FB');
    	doc.setTextColor(0);
    	//---------------------------------------------------------------
    	doc.setFontType("normal");
    	doc.setFontSize(8);
    	doc.text(175,287, "SEITE "+currentPage.toString()+" VON "+TotalPages.toString())
    	doc.text(10,287, DayName[CurrentDate.getDay()].toString()+", "+formatNumber(CurrentDate.getDate()).toString()+". "+MonthName[CurrentDate.getMonth()].toString()+" "+CurrentDate.getFullYear().toString());
    	doc.setFontSize(9);
    	//---------------------------------------------------------------
    	var y = TableBegin;
    	for(var DataCount = 0; DataCount < numberOfAuths; DataCount++){
    		if(PageStart) {
    			y += HeaderSpace;
    			PageStart = false;
    		}
    		else y += LineSpace;
    		
    		if(y > totalHeight) {
    			y = TableBegin-10;
    			currentPage++;
    			doc.addPage();
    			//---------------------------------------------------------------
    			doc.setFontSize(8);
    	    	doc.text(175,287, "SEITE "+currentPage.toString()+" VON "+TotalPages.toString())
    	    	doc.text(10,287, DayName[CurrentDate.getDay()].toString()+", "+formatNumber(CurrentDate.getDate()).toString()+". "+MonthName[CurrentDate.getMonth()].toString()+" "+CurrentDate.getFullYear().toString());
    	    	doc.setFontSize(9);
    	    	//---------------------------------------------------------------
    	    	doc.setDrawColor(0);
    	    	doc.setFillColor(73, 73, 73);
    	    	doc.rect(10, 10, 190, 5, 'F')
    	    	doc.setTextColor(255);
    	    	doc.text(cWidth1, y, 'ID');
    	    	doc.text(cWidth2, y, 'Educampus-Lizenzen');
    	    	doc.text(cWidth3, y, 'Nachname');
    	    	doc.text(cWidth4, y, 'Vorname');
    	    	doc.text(cWidth5, y, 'FB');
    	    	doc.setTextColor(0);
    	    	//---------------------------------------------------------------
        		y += HeaderSpace;
    		}
    		
    		doc.text(cWidth1, y, AuthArrayPDF[DataCount].id.toString());
    		doc.text(cWidth2, y, AuthArrayPDF[DataCount].lizenz.toString());
    		doc.text(cWidth3, y, AuthArrayPDF[DataCount].nachname.toString());
    		doc.text(cWidth4, y, AuthArrayPDF[DataCount].vorname.toString());
    		doc.text(cWidth5, y, AuthArrayPDF[DataCount].fb.toString());
    		
    	}
    	//---------------------------------------------------------------
    	if(y > (totalHeight-8)) {
			y = TableBegin-10;
			currentPage++;
			doc.addPage();
			//---------------------------------------------------------------
			doc.setFontSize(8);
	    	doc.text(175,287, "SEITE "+currentPage.toString()+" VON "+TotalPages.toString())
	    	doc.text(10,287, DayName[CurrentDate.getDay()].toString()+", "+formatNumber(CurrentDate.getDate()).toString()+". "+MonthName[CurrentDate.getMonth()].toString()+" "+CurrentDate.getFullYear().toString());
	    	doc.setFontSize(9);
	    	//---------------------------------------------------------------
	    	doc.setDrawColor(0);
	    	doc.setFillColor(73, 73, 73);
	    	doc.rect(10, 10, 190, 5, 'F')
	    	doc.setTextColor(255);
	    	doc.text(cWidth1, y, 'ID');
	    	doc.text(cWidth2, y, 'Educampus-Lizenzen');
	    	doc.text(cWidth3, y, 'Nachname');
	    	doc.text(cWidth4, y, 'Vorname');
	    	doc.text(cWidth5, y, 'FB');
	    	doc.setTextColor(0);
	    	y += HeaderSpace;
    	} else y += 3;
    	doc.setLineWidth(0.2);
    	doc.line(10, y, 200, y);
    	y += LineSpace;
    	doc.text(20, y, usedLicence.toString()+" von "+Autoren.length+" Lizenzen vergeben");
    	//---------------------------------------------------------------
    	doc.save('SCL_Lizenzen_'+CurrentDate.getFullYear().toString()+formatNumber(CurrentDate.getMonth()+1).toString()+formatNumber(CurrentDate.getDate()).toString()+'.pdf')
    });
	//-------------------------------------------------------------------------------