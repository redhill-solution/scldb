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
	function compareTitel_UP(a,b) {
		if (a.titel.toLowerCase() < b.titel.toLowerCase())
			return -1;
		if (a.titel.toLowerCase() > b.titel.toLowerCase())
			return 1;
		return 0;
	}
	function compareTitel_DOWN(a,b) {
		if (a.titel.toLowerCase() > b.titel.toLowerCase())
			return -1;
		if (a.titel.toLowerCase() < b.titel.toLowerCase())
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
	function sortFor(option) {
		var element = document.getElementById("Table");
		if(element != null) element.parentNode.removeChild(element);
		if(!SortUp) {
			if(option == "compareID") Autoren.sort(compareID_UP);
			if(option == "compareLastName") Autoren.sort(compareLastName_UP);
			if(option == "compareSurName") Autoren.sort(compareSurName_UP);
			if(option == "compareTitel") Autoren.sort(compareTitel_UP);
			if(option == "compareFB") Autoren.sort(compareFB_UP);
			if(option == "compareLicense") Autoren.sort(compareLicense_UP);
			SortUp = true;
		} else {
			if(option == "compareID") Autoren.sort(compareID_DOWN);
			if(option == "compareLastName") Autoren.sort(compareLastName_DOWN);		
			if(option == "compareSurName") Autoren.sort(compareSurName_DOWN);		
			if(option == "compareTitel") Autoren.sort(compareTitel_DOWN);		
			if(option == "compareFB") Autoren.sort(compareFB_DOWN);		
			if(option == "compareLicense") Autoren.sort(compareLicense_DOWN);
			SortUp = false;
		}
		createTable();
	}
	function createTable() {
		var htmlCode = 				"<tr class='TableHeadings'>";
		htmlCode += 					"<td class='TableID'><a href='javascript:void[0]' onclick='sortFor(\"compareID\")'>ID</a></td>";
		htmlCode += 					"<td class='TableLastName'><a href='javascript:void[0]' onclick='sortFor(\"compareLastName\")'>Nachname</a></td>";
		htmlCode += 					"<td class='TableSurname'><a href='javascript:void[0]' onclick='sortFor(\"compareSurName\")'>Vorname</a></td>";
		htmlCode += 					"<td class='TableTitel'><a href='javascript:void[0]' onclick='sortFor(\"compareTitel\")'>Titel</a></td>";
		htmlCode += 					"<td class='TableFB'><a href='javascript:void[0]' onclick='sortFor(\"compareFB\")'>Fachbereich</a></td>";
		htmlCode += 					"<td class='TableLicense'><a href='javascript:void[0]' onclick='sortFor(\"compareLicense\")'>Educampus-Lizenzen</a></td>";
		htmlCode += 				"</tr>";
		for(var DataCount = 0; DataCount < numberOfAuths; DataCount++){
			if((DataCount % 2) != 0) var TRColor = "TableTRLight";
			else var TRColor = "TableTRDark";
			htmlCode += 			"<tr class='"+TRColor+"' id='"+DataCount+"'>";
			htmlCode += 				"<td class='TableIDData'>"+Autoren[DataCount].id+"</td>";
			htmlCode += 				"<td class='TableLNData'>"+Autoren[DataCount].nachname+"</td>";
			htmlCode += 				"<td class='TableSNData'>"+Autoren[DataCount].vorname+"</td>";
			htmlCode += 				"<td class='TableTitelData'>"+Autoren[DataCount].titel+"</td>";
			htmlCode += 				"<td class='TableFBData'>"+Autoren[DataCount].fb+"</td>";
			htmlCode += 				"<td class='TableLicData'>"+Autoren[DataCount].lizenz+"</td>";
			htmlCode += 			"</tr>";
		}
		htmlCode += 			"<tr class='TableTRAdd'>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		if( numberOfAuths > 1) htmlCode += 	"<td><span class='TableAddition'>"+numberOfAuths+" Autoren im System</span></td>";
		if( numberOfAuths <= 1) htmlCode += 	"<td><span class='TableAddition'>"+numberOfAuths+" Autor im System</span></td>";
		htmlCode += 			"</tr>";
		htmlCode += 			"<tr class='TableTR'>";
		htmlCode += 				"<td>&nbsp;</td>";
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
            
        $(".TableTRDark").click(function() {
    		window.location.href = "edit.php?id="+Autoren[parseFloat(this.id)].id;
    	});
    	$(".TableTRLight").click(function() {
    		window.location.href = "edit.php?id="+Autoren[parseFloat(this.id)].id;
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
	//var numberOfAuths 	= AuthID.length;

	if($.isArray(Autoren) && Autoren.length > 0) {
		var numberOfAuths 	= Autoren.length;
		sortFor("compareLastName");
		
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
	}

	//-------------------------------------------------------------------------------
	//Create HTML Elements
	var htmlCode = "<div align='center' id='center'><div id='container'>";
	htmlCode +=	"<div id='info_box'>";
	htmlCode += 		"<div id='toolBox'>";
	htmlCode += 			"<div id='newContactPos'><a href='javascript:void[0]' onclick='newContact()' title='neuen Autor erstellen'><div id='newContact'>&nbsp;</div></a></div>";
	//htmlCode += 			"<div id='printPos'><a href='javascript:void[0]' title='Liste drucken'><div id='print'>&nbsp;</div></a></div>";
	htmlCode += 			"<div id='toPDFPos'><a href='javascript:void[0]' title='Liste als PDF herunterladen'><div id='toPDF'>&nbsp;</div></a></div>";
	htmlCode += 		"</div>"; // toolBox
	htmlCode += 	"<div align='center'>";
	htmlCode += 		"<div id='mainBlock'>";
	htmlCode +=  		"</div>";	//mainBlock
	htmlCode +=  	"</div>";
	htmlCode += "</div>"; //info_box
	htmlCode += "</div></div>";
	htmlCode += "</br>"; //space
	
	document.write(htmlCode);
	createTable();
	
	$("#printPos").click(function() {;
		PrintElem(mainBlock);
	});
    $('#toPDFPos').click(function () {
    	var doc = new jsPDF();
    	//---------------------------------------------------------------
    	doc.setProperties({
    	    title: 'SCL Autoren - Übersicht',
    	    author: UserName.toString(),
    	    keywords: 'pdf, javascript,generated',
    	});
    	//---------------------------------------------------------------
    	var AuthArrayPDF = Autoren;
    	AuthArrayPDF.sort(compareLastName_UP);
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
    	doc.text(15, 18, 'SCL Autoren - Übersicht');
    	//---------------------------------------------------------------
    	doc.setFontSize(9);
    	doc.setFontType("bold");
    	doc.setFont("helvetica");
    	//---------------------------------------------------------------
    	doc.setDrawColor(0);
    	doc.setFillColor(73, 73, 73);
    	doc.rect(10, 20, 190, 5, 'F')
    	doc.setTextColor(255);
    	doc.text(20, TableBegin, 'ID');
    	doc.text(35, TableBegin, 'Nachname');
    	doc.text(70, TableBegin, 'Vorname');
    	doc.text(100, TableBegin, 'Titel');
    	doc.text(120, TableBegin, 'FB');
    	doc.text(140, TableBegin, 'Educampus-Lizenzen');
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
    	    	doc.text(20, y, 'ID');
    	    	doc.text(35, y, 'Nachname');
    	    	doc.text(70, y, 'Vorname');
    	    	doc.text(100, y, 'Titel');
    	    	doc.text(120, y, 'FB');
    	    	doc.text(140, y, 'Educampus-Lizenzen');
    	    	doc.setTextColor(0);
    	    	//---------------------------------------------------------------
        		y += HeaderSpace;
    		}
    		
    		doc.text(20, y, AuthArrayPDF[DataCount].id.toString());
    		doc.text(35, y, AuthArrayPDF[DataCount].nachname.toString());
    		doc.text(70, y, AuthArrayPDF[DataCount].vorname.toString());
    		doc.text(100, y, AuthArrayPDF[DataCount].titel.toString());
    		doc.text(120, y, AuthArrayPDF[DataCount].fb.toString());
    		doc.text(140, y, AuthArrayPDF[DataCount].lizenz.toString());
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
	    	doc.text(20, y, 'ID');
	    	doc.text(35, y, 'Nachname');
	    	doc.text(70, y, 'Vorname');
	    	doc.text(100, y, 'Titel');
	    	doc.text(120, y, 'FB');
	    	doc.text(140, y, 'Educampus-Lizenzen');
	    	doc.setTextColor(0);
	    	y += HeaderSpace;
    	} else y += 3;
    	doc.setLineWidth(0.2);
    	doc.line(10, y, 200, y);
    	y += LineSpace;
    	if(numberOfAuths > 1) doc.text(20, y, numberOfAuths.toString()+" Autoren im System");
    	if(numberOfAuths <= 1) doc.text(20, y, numberOfAuths.toString()+" Autor im System");
    	//---------------------------------------------------------------
    	doc.save('SCL_Autoren_'+CurrentDate.getFullYear().toString()+formatNumber(CurrentDate.getMonth()+1).toString()+formatNumber(CurrentDate.getDate()).toString()+'.pdf')
    });
	//-------------------------------------------------------------------------------