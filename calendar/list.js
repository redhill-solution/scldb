function formatCorrect(value){
	if(value < 10) value = "0"+value;
	return [ value ];
}
function shortenName(maxChars, word) {
	if(word.length > maxChars) {
		return [word.substring(0,maxChars)+"..."];
	}
	else return [word];
}
function shortenNamePDF(maxChars, word) {
	if(word.length > maxChars) {
		return [word.substring(0,maxChars)];
	}
	else return [word];
}
Array.prototype.indexOfObject = function(item){
	for(var i = 0; i < this.length; i++) {
		if(this[i].id == item) {
			return i;
		}
	}
	return (-1);
}
function getPosition(id) {
	var xPosition = 0;
	var yPosition = 0;

	var element = document.getElementById(id);
 
	while(element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return { x: xPosition, y: yPosition };
}
function createTable(start, end) {
	var numOfMonth = 0;
	var showMonth;
	var htmlCode = 				"<tr class='TableHeadings'>";
	htmlCode += 					"<td class='TableMonat'><span class='bold'>Monat</span></td>";
	htmlCode += 					"<td class='TableDatum'><span class='bold'>Datum</span></td>";
	htmlCode += 					"<td class='TableStartzeit'><span class='bold'>Startzeit</span></td>";
	htmlCode += 					"<td class='TableEndzeit'><span class='bold'>Endzeit</span></td>";
	htmlCode += 					"<td class='TableDozent'><span class='bold'>Dozent</span></td>";
	htmlCode += 					"<td class='TableName'><span class='bold'>Bezeichnung Klausur</span></td>";
	htmlCode += 					"<td class='TableBetSCL1'><span class='bold'>Betreuer 1</span></td>";
	htmlCode += 					"<td class='TableBetSCL2'><span class='bold'>Betreuer 2</span></td>";
	htmlCode += 					"<td class='TableTeilnehmer'><span class='bold'>Prüflinge</span></td>";
	htmlCode += 				"</tr>";
	var colID	= new Array();
	var numTerm = 0, numPruef = 0;
	var totalTerm = 0, totalPruef = 0;
	if(start != null) {
		start = start.split(".");
		start = new Date(start[2],start[1]-1,start[0]);
	} 
	if(end != null ) {
		end = end.split(".");
		end = new Date(end[2],end[1]-1,end[0]);
		end.setHours(23);
		end.setMinutes(59);
	}
	var countD = 0;
	for(var DataCount = 0; DataCount < SDvalues.length; DataCount++){
		if((start == null && end == null) || (new Date(SDvalues[DataCount].startTime*1000) >= start && new Date(SDvalues[DataCount].endTime*1000) <= end)) {
			var shortDozent, shortName, shortBET1, shortBET2;
			var SingleStartTime  = new Date(SDvalues[DataCount].startTime*1000);
			if(DataCount > 0) var SinglelVGL = new Date(SDvalues[DataCount-1].startTime*1000);
			else var SinglelVGL = new Date(SDvalues[DataCount].startTime*1000);
			var SingleEndTime	 = new Date(SDvalues[DataCount].endTime*1000);
			showMonth = returnMonthName(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getMonth()+1)+" "+Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getFullYear();
			colID[DataCount] = Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].id;	

			if(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].dozent != null) shortDozent = shortenName( 12, Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].dozent);
			if(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].name != null) shortName = shortenName( 23, Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].name);
			if(SDvalues[DataCount].aufsichtSCL != null) shortBET1 = shortenName( 12, SDvalues[DataCount].aufsichtSCL);
			if(SDvalues[DataCount].aufsichtSCL2 != null) shortBET2 = shortenName( 12, SDvalues[DataCount].aufsichtSCL2);

			if(countD == 0 ||  SingleStartTime.getMonth() != SinglelVGL.getMonth()) {
				if(countD != 0 ) { htmlCode += "<tr class='sumTR' ><td class='sumTerm' colspan='2'>"+numTerm+" Termine</td><td></td><td></td><td></td><td></td><td></td><td></td><td class='teilSum'>"+numPruef+"</td></tr>";}
				htmlCode += "<tr class='MonthTR'>";
				htmlCode += "<td class='MonthTD' colspan='3'>"+showMonth+"</td>";
				htmlCode += "</tr>";
				numPruef = 0;
				numTerm = 0;
				numOfMonth++;
			}
			if((countD % 2) != 0) var TRColor = "TableTRLight";
			else var TRColor = "TableTRDark";
			htmlCode += 			"<tr class='"+TRColor+"' id='"+DataCount+"'>";
			htmlCode += 				"<td class='dataTD'>"+(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].blockColor == 1 ? "<div class='DateColorRed'></div>" : Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].blockColor == 2 ? "<div class='DateColorOrange'></div>" : Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].blockColor == 3 ? "<div class='DateColorYellow'></div>" : Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].blockColor == 4 ? "<div class='DateColorGreenLight'></div>" : Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].blockColor == 5 ? "<div class='DateColorGreen'></div>" : Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].blockColor == 6 ? "<div class='DateColorGray'></div>" : "" )+"</td>";
			htmlCode += 				"<td class='dataTD'>"+formatCorrect(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getDate())+"."+formatCorrect(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getMonth()+1)+"."+formatCorrect(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getFullYear())+"</td>";
			htmlCode += 				"<td class='dataTD'>"+formatCorrect(SingleStartTime.getHours())+":"+formatCorrect(SingleStartTime.getMinutes())+" Uhr </td>";
			htmlCode += 				"<td class='dataTD'>"+formatCorrect(SingleEndTime.getHours())+":"+formatCorrect(SingleEndTime.getMinutes())+" Uhr </td>";
			if(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].dozent != null) htmlCode += "<td class='dataTD'>"+shortDozent+"</td>";
			else htmlCode += "<td class='dataTD'></td>";
			if(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].name != null) htmlCode += 	"<td class='dataTD'>"+shortName+"</td>";
			else htmlCode += "<td class='dataTD'></td>";
			if(SDvalues[DataCount].aufsichtSCL != null) htmlCode += "<td class='dataTD'>"+shortBET1+"</td>";
			else htmlCode += "<td class='dataTD'></td>";
			if(SDvalues[DataCount].aufsichtSCL2 != null) htmlCode += "<td class='dataTD'>"+shortBET2+"</td>";
			else htmlCode += "<td class='dataTD'></td>";
			if(SDvalues[DataCount].anzahlTeilnehmer != 0) htmlCode += "<td class='dataTDTeil'>"+SDvalues[DataCount].anzahlTeilnehmer+"</td>";
			else htmlCode += "<td class='dataTD'></td>";
			htmlCode += 			"</tr>";
			numPruef += parseFloat(SDvalues[DataCount].anzahlTeilnehmer);
			numTerm++;
			totalPruef += parseFloat(SDvalues[DataCount].anzahlTeilnehmer);
			totalTerm++;
			countD++;
		}
	}

	htmlCode += "<tr class='sumTR' ><td class='sumTerm' colspan='2'>"+numTerm+" Termine</td><td></td><td></td><td></td><td></td><td></td><td></td><td class='teilSum'>"+numPruef+"</td></tr>";
	htmlCode += 			"<tr class='TableTRAdd'>";
	if(totalTerm > 1) htmlCode += 				"<td colspan='2' class='totTerm'>"+totalTerm+" Termine</td>";
	else htmlCode += 				"<td colspan='2' class='totTerm'>"+totalTerm+" Termin</td>";
	htmlCode += 				"<td colspan='6'>&nbsp;</td>";
	htmlCode += 				"<td class='totPruef'>"+totalPruef+"</td>";
	htmlCode += 			"</tr>";
	htmlCode += 			"<tr class='TableTR'>";
	htmlCode += 				"<td colspant='9'>&nbsp;</td>";
	htmlCode += 			"</tr>";
	
	var parentBlock = document.getElementById('list');
    if(parentBlock != null) {
        var table = document.createElement("table");
        table.id = "Table";
        table.innerHTML = htmlCode;
        parentBlock.appendChild(table); 
    }
	/*if(totalD >= sqlLimit) {
    	htmlCode = "<a id='sqlDataLink' href='calendar.php?limit="+sqlLimit+"&xPos="+(window.screenX + window.outerWidth)+"&yPos="+(window.screenY + window.outerHeight)+"' ><div id='nextData'>Lade weitere Termine ...</div></a></br></br>";
		var parentBlock = document.getElementById('list');
	    if(parentBlock != null) {
	        var div = document.createElement("div");
	        div.innerHTML = htmlCode;
	        parentBlock.appendChild(div); 
	    }
    } else {
    	htmlCode = "<div id='nextData' style='background: none !important; cursor:default;'>&nbsp;</div>";
		var parentBlock = document.getElementById('list');
	    if(parentBlock != null) {
	        var div = document.createElement("div");
	        div.innerHTML = htmlCode;
	        parentBlock.appendChild(div); 
	    }
    }*/

    $(".TableTRDark").click(function() {
		//Standard Ansicht Kalender : window.location.href = "edit.php?id="+colID[parseFloat(this.id)]+"&vCL=list&lS=\""+listStartTime+"\"&lE=\""+listStopTime+"\"&lSN=\""+listSpecialName+"\"";
		window.location.href = "edit.php?id="+colID[parseFloat(this.id)]+"&lSN=\""+listSpecialName+"\"";
	});
	$(".TableTRLight").click(function() {
		//Standard Ansicht Kalender : window.location.href = "edit.php?id="+colID[parseFloat(this.id)]+"&vCL=list&lS=\""+listStartTime+"\"&lE=\""+listStopTime+"\"&lSN=\""+listSpecialName+"\"";
		window.location.href = "edit.php?id="+colID[parseFloat(this.id)]+"&lSN=\""+listSpecialName+"\"";
	});

	return numOfMonth;
}
function killFormRange() {
	element = document.getElementById("grayBackRange");
	element.parentNode.removeChild(element);	
	element2 = document.getElementById("timeRange");
	element2.parentNode.removeChild(element2);	
}
function createPicker(id){
	$(document).ready(function () {
	    $("#"+id).datepicker({ 
	        firstDay: 1,
	        showWeek: true,
	        changeYear: true,
	        changeMonth: true,
	        monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
	        monthNamesShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ],
	        dayNames: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag" ],
	        dayNamesMin: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
	        dayNamesShort: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
	        dateFormat: "dd.mm.yy",
	        weekHeader: "KW"
	    });
	});
}
function setSem(sqlStart, sqlEnd, start, end, specialName, nextLast){
	var stField = document.getElementById("startRange");
	var enField = document.getElementById("endRange");
	
	if(nextLast != null) {
		var startDate = start.split(".");
		startDate = new Date(startDate[2],startDate[1]-1,startDate[0]);
		startDate = startDate /1000;
	} else {
		var startDate = new Date();
		startDate = startDate /1000;
	}

	if(start != null && end != null) {
		//alert("1");
		var elementTab = document.getElementById('cbuttonsRange');
		if(elementTab != null) elementTab.parentNode.removeChild(elementTab); 

		var timeStart = start.split(".");
		var timeEnd = end.split(".");
		var timeStartSql = new Date(sqlStart);
		var timeEndSql = new Date(sqlEnd);

		timeStart = new Date(timeStart[2],timeStart[1]-1,timeStart[0]);
		timeEnd = new Date(timeEnd[2],timeEnd[1]-1,timeEnd[0]);

		stField.value = start;
		enField.value = end;

		if(timeStart >= timeStartSql && timeEnd <= timeEndSql) {
			if(nextLast != null) {
				server_date = timeStart;
			} else {
				server_date = new Date();
			}
			//alert((timeStart/1000)+" >= "+(timeStartSql/1000)+" && "+(timeEnd/1000)+" <= "+(timeEndSql/1000));
			//alert(timeStart+" >= "+timeStartSql+" && "+timeEnd+" <= "+timeEndSql);
			var	openWin = "<input type='button' value='Anzeigen' onclick='listMain(\""+specialName+"\", \""+sqlStart+"\", \""+sqlEnd+"\", \""+start+"\", \""+end+"\")'/>&nbsp;";	
			openWin += "<input type='button' value='Abbrechen' onclick='killFormRange()'/>";
		} else {
			//alert((timeStart/1000)+" < "+(timeStartSql/1000)+" || "+(timeEnd/1000)+" > "+(timeEndSql/1000));
			//alert(timeStart+" < "+timeStartSql+" || "+timeEnd+" > "+timeEndSql);
			var	openWin = "<input type='button' value='Anzeigen' onclick='location.href=\"calendar.php?sem="+start+"."+end+"&sn="+specialName+"&tms="+startDate+"\"' />&nbsp;";	
			openWin += "<input type='button' value='Abbrechen' onclick='killFormRange()'/>";
		}

		var parentBlock = document.getElementById('timeRangePos');
		if(parentBlock != null) {
		    var div = document.createElement("div");
		    div.id = "cbuttonsRange";
		    div.align = "center";
		    div.innerHTML = openWin;
		    parentBlock.appendChild(div);
		}
	} else {
		//alert("2");
		start = stField.value;
		end = enField.value;

		if(start == "" || end == "" || start == null || end == null) {
			alert("Kein Zeitraum gewählt!");
			return -1;
		}

		var timeStart = start.split(".");
		var timeEnd = end.split(".");
		var timeStartSql = new Date(sqlStart);
		var timeEndSql = new Date(sqlEnd);

		timeStart = new Date(timeStart[2],timeStart[1]-1,timeStart[0]);
		timeEnd = new Date(timeEnd[2],timeEnd[1]-1,timeEnd[0]);

		if(timeStart > timeEnd) {
			alert("Ungültiges Zeitinterval!");
			return -1;
		}
		specialName = start+" - "+end;
		if(timeStart >= timeStartSql && timeEnd <= timeEndSql) {
			//alert((timeStart/1000)+" >= "+(timeStartSql/1000)+" && "+(timeEnd/1000)+" <= "+(timeEndSql/1000));
			//alert(timeStart+" >= "+timeStartSql+" && "+timeEnd+" <= "+timeEndSql);
			server_date = timeStart;
			listMain(specialName, sqlStart, sqlEnd, start, end);
		} else {
			//alert((timeStart/1000)+" < "+(timeStartSql/1000)+" || "+(timeEnd/1000)+" > "+(timeEndSql/1000));
			//alert(timeStart+" < "+timeStartSql+" || "+timeEnd+" > "+timeEndSql);
			window.location="calendar.php?sem="+start+"."+end+"&sn="+specialName+"&tms="+startDate;
		}
	}
}

function setTimeRange(sqlStart, sqlEnd) {
	var lastSem, currentSem, nextSem;
	var lastSt, lastEnd, currentSt, currentEnd, nextSt, nextEnd;
	var today = new Date();
	var todayForm = (today.getMonth()+1)+""+(today.getDate());

	if(todayForm < 420) {
		lastSem = "SoSe "+(today.getFullYear()-1);
		currentSem = "WiSe "+(today.getFullYear()-1)+"/"+today.getFullYear();
		nextSem = "SoSe "+(today.getFullYear());

		lastSt = "20.04."+(today.getFullYear()-1); 
		lastEnd = "19.10."+(today.getFullYear()-1); 
		currentSt = "20.10."+(today.getFullYear()-1);
		currentEnd = "19.04."+today.getFullYear();
		nextSt = "20.04."+today.getFullYear();
		nextEnd = "19.10."+today.getFullYear();
	}
	if(todayForm >= 420 && today.getMonth()+1 <= 1019) {
		lastSem = "WiSe "+(today.getFullYear()-1)+"/"+today.getFullYear();
		currentSem = "SoSe "+today.getFullYear();
		nextSem = "WiSe "+today.getFullYear()+"/"+(today.getFullYear()+1);

		lastSt = "20.10."+(today.getFullYear()-1); 
		lastEnd = "19.04."+today.getFullYear(); 
		currentSt = "20.04."+today.getFullYear();
		currentEnd = "19.10."+today.getFullYear();
		nextSt = "20.10."+today.getFullYear();
		nextEnd = "19.04."+(today.getFullYear()+1);
	}
	if(todayForm > 1019) { 
		lastSem = "SoSe "+today.getFullYear();
		currentSem = "WiSe "+today.getFullYear()+"/"+(today.getFullYear()+1);
		nextSem = "SoSe "+(today.getFullYear()+1);

		lastSt = "20.04."+today.getFullYear(); 
		lastEnd = "19.10."+today.getFullYear(); 
		currentSt = "20.10."+today.getFullYear();
		currentEnd = "19.04."+(today.getFullYear()+1);
		nextSt = "20.04."+(today.getFullYear()+1);
		nextEnd = "19.10."+(today.getFullYear()+1);
	}

	var openWin;

	var div = document.createElement("div");
	div.id = "grayBackRange";
	document.body.appendChild(div);  

	openWin = "<div id='timeRangePos'>";
    openWin += "<div id='WinBorderRange'>";
    openWin += "<span id='WinHeadTextRange'>Zeitbereich eingrenzen:</span>";
    openWin += "</div>";	
    openWin += "<div id='dateStart' align='center'>";
	openWin += "<input type='text' id='startRange' placeholder='Startzeit wählen...'/></div>";
	openWin += "<div id='dateEnd' align='center'>";
	openWin += "<input type='text' id='endRange' placeholder='Endzeit wählen...'/></div>";
	openWin += "<div align='center' class='semChoose'><input class='semButt' type='button' value='"+nextSem+"' onclick='setSem(\""+sqlStart+"\",\""+sqlEnd+"\", \""+nextSt+"\", \""+nextEnd+"\", \""+nextSem+"\", \"next\")' /></div>";
	openWin += "<div align='center' class='semChoose'><input class='semButt' type='button' value='"+currentSem+"' onclick='setSem(\""+sqlStart+"\",\""+sqlEnd+"\", \""+currentSt+"\", \""+currentEnd+"\", \""+currentSem+"\")' /></div>";
	openWin += "<div align='center' class='semChoose' ><input class='semButt' type='button' value='"+lastSem+"' onclick='setSem(\""+sqlStart+"\",\""+sqlEnd+"\", \""+lastSt+"\", \""+lastEnd+"\", \""+lastSem+"\", \"last\")' /></div>";
	openWin += "<div id='cbuttonsRange' align='center'>";
	openWin += "<input type='button' value='Anzeigen' onclick='setSem(\""+sqlStart+"\",\""+sqlEnd+"\")'/>&nbsp;";	
	openWin += "<input type='button' value='Abbrechen' onclick='killFormRange()'/>";
	openWin += "</div>";
	openWin += "</div>";

	var parentBlock = document.getElementById('container');
	if(parentBlock != null) {
	    var div = document.createElement("div");
	    div.id = "timeRange";
	    div.innerHTML = openWin;
	    parentBlock.appendChild(div);
	}

	createPicker('startRange');
	createPicker('endRange');

}

function listMain(specialName, sqlStartDate, sqlEndDate, start, end) {
	if(document.getElementById("timeRange") != null) killFormRange();
	elementTab = document.getElementById('info_box');
	if(elementTab != null) elementTab.parentNode.removeChild(elementTab); 
	var height = 45;
	if(specialName != null) var rangeInfo = specialName;
	else var rangeInfo = "Alle Termine";

	if(start && end) {
		if(specialName != null) rangeInfo = specialName;
		else rangeInfo = start+" - "+end;
	} else {
		start = null;
		end = null;
	}
	//alert(sqlStartDate+", "+sqlEndDate+", "+start+", "+end);
	var dummyDate = new Date();
	dummyDate.setHours(8);
	dummyDate.setMinutes(0);
	dummyDate.setSeconds(0);
	var writeDoc = "<div id='toolBox'>";
	writeDoc +=			"<div id='listViewPos'><a id='changelistView' href='javascript:void[0]' onclick='CalendarMain(\""+sqlStartDate+"\", \""+sqlEndDate+"\", \""+specialName+"\", \""+start+"\", \""+end+"\")' title='Wochen Ansicht'><div id='calView'>&nbsp;</div></a></div>";
	writeDoc +=			"<div id='addEntryPos'><a href='javascript:void[0]' onclick='createForm(\""+(dummyDate / 1000)+"\")' title='neuen Termin erstellen'><div id='addEntry'>&nbsp;</div></a></div>";
	writeDoc +=			"<div id='toPDFPos'><a href='javascript:void[0]' onclick='printPDF()' title='Liste als PDF herunterladen'><div id='toPDF'>&nbsp;</div></a></div>";
	writeDoc += 		"<div id='timeSelPos'><a href='javascript:void[0]' onclick='setTimeRange(\""+sqlStartDate+"\", \""+sqlEndDate+"\")' title='Zeitrahmen wählen'><div id='timeSel'>&nbsp;</div></a></div>";
	writeDoc +=			"<div align='center' class='centerText'><a class='datehover' href ='javascript:void[0]' onclick='setTimeRange(\""+sqlStartDate+"\", \""+sqlEndDate+"\")'><strong>"+rangeInfo+"</strong></a></div>";
	writeDoc +=		"</div>";
	writeDoc +=		"<div id='list' align='center' >";
	writeDoc +=		"</div>";

	var parentBlock = document.getElementById('container');
    var div = document.createElement("div");
    div.id = "info_box";
    div.innerHTML = writeDoc;
    parentBlock.appendChild(div);  

    var numOfMonth = createTable(start, end);

    //alert("3: "+sqlStartDate);
	$('#toPDFPos').click(function () {
		createPDF(specialName, start, end, SDvalues, numOfMonth, Block);

	});
}

function createPDF(specialName, start, end, SDvalues, numOfMonth, Block) {

	var doc = new jsPDF();
	if(specialName != null) var timeName = "   "+specialName;
	else if(start != null && end != null) var timeName = "   "+start+" - "+end;
	else var timeName = "";
	//---------------------------------------------------------------
	doc.setProperties({
	    title: 'SCL Einzeltermine'+timeName, //+currentSemester
	    //author: UserName.toString(),
	    keywords: 'pdf, javascript,generated'
	});
	//---------------------------------------------------------------

	var MonthName = [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ];
	var DayName = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
	var CurrentDate = new Date();
	//---------------------------------------------------------------

	if(start != null) {
		start = start.split(".");
		start = new Date(start[2],start[1]-1,start[0]);
	} 
	if(end != null ) {
		end = end.split(".");
		end = new Date(end[2],end[1]-1,end[0]);
		end.setHours(23);
		end.setMinutes(59);
	}
	//---------------------------------------------------------------
	/*var TotalRows = 0;
	for(var i = 0; i < SDvalues.length; i++){
		if((start == null && end == null) || (new Date(SDvalues[i].startTime*1000) >= start && new Date(SDvalues[i].endTime*1000) <= end)) {
			TotalRows++;
		}
	}*/
	//var RowsPerPage;
	var TableBeginSite = TableBegin;
	//var HeaderSpaceSite = HeaderSpace;
	var countD = 0;
	var numTerm = 0, numPruef = 0;
	var totalTerm = 0, totalPruef = 0;
	var showMonth = null;
	var currentPage = 1;
	//var PageStart = true;
	//var TotalPages = 1;
	//var needPage = true;
	var TableBegin = 24;
	var HeaderSpace = 6;
	var LineSpace = 6;
	var totalHeight = 297-20; //A4 Heigth - 2cm
	//var headBlock = 10+10+5+5; //TopSpace+HeaderBlock+TableHeader+FirstMonth
	//var monthSpace = (numOfMonth-1)*(LineSpace+LineSpace+2); //(Number of Month - FirstMonth) * (0.6+0.8)
	var resultSpace = 11.5;
	//var nextBlock = 0;

/*
	while(needPage) {
		RowsPerPage = Math.floor((totalHeight*TotalPages-headBlock-nextBlock*(TotalPages-1)-monthSpace-resultSpace*TotalPages)/LineSpace);
    	if((TotalRows - RowsPerPage) > 0 ) {
    		//Zeilen passen nicht auf eine Seite
    		TotalPages++;
    		nextBlock = 10+5+6;
    		HeaderSpaceSite = 0;
    	} else {
    		//Zeilen passen auf eine Seite
    		needPage = false;
    	}
	}*/
	//---------------------------------------------------------------
	doc.setDrawColor(0);
	doc.setFillColor(225, 220, 200);
	doc.rect(10, 10, 190, 10, 'F')
	doc.setFontSize(20);
	doc.setFont("helvetica");
	doc.text(15, 18, 'Einzeltermine Klausuren'+timeName); //+currentSemester
	//---------------------------------------------------------------
	doc.setFontSize(8);
	doc.setFontType("normal");
	doc.setFont("helvetica");
	//---------------------------------------------------------------
	doc.setDrawColor(0);
	doc.setFillColor(73, 73, 73);
	doc.rect(10, 20, 190, 5, 'F')
	doc.setTextColor(255);
	doc.text(12, 23.5, 'Monat');
	doc.text(24, 23.5, 'Datum');
	doc.text(38, 23.5, 'Startzeit');
	doc.text(55, 23.5, 'Endzeit');
	doc.text(69, 23.5, 'Dozent');
	doc.text(96, 23.5, 'Bezeichnung Klausur');
	doc.text(138, 23.5, 'Betreuer 1');
	doc.text(161, 23.5, 'Betreuer 2');
	doc.text(183, 23.5, 'Prüflinge');

	doc.setTextColor(0);
	//---------------------------------------------------------------
	doc.setFontType("normal");
	doc.setFontSize(8);
	doc.text(185,287, "SEITE "+currentPage.toString());
	doc.text(10,287, DayName[CurrentDate.getDay()].toString()+", "+formatNumber(CurrentDate.getDate()).toString()+". "+MonthName[CurrentDate.getMonth()].toString()+" "+CurrentDate.getFullYear().toString());
	doc.setFontSize(8);
	//---------------------------------------------------------------
	var y = TableBegin;
	for(var DataCount = 0; DataCount < SDvalues.length; DataCount++){
		if((start == null && end == null) || (new Date(SDvalues[DataCount].startTime*1000) >= start && new Date(SDvalues[DataCount].endTime*1000) <= end)) {
			var shortDozent, shortName, shortBET1, shortBET2;
			var SingleStartTime  = new Date(SDvalues[DataCount].startTime*1000);
			var SingleEndTime	 = new Date(SDvalues[DataCount].endTime*1000);
			if(DataCount > 0) var SinglelVGL = new Date(SDvalues[DataCount-1].startTime*1000);
			else var SinglelVGL = new Date(SDvalues[DataCount].startTime*1000);
			showMonth = returnMonthName(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getMonth()+1)+" "+Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getFullYear();
			if(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].dozent != null) shortDozent = shortenNamePDF( 13, Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].dozent);
			if(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].name != null) shortName = shortenNamePDF( 26, Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].name);
			if(SDvalues[DataCount].aufsichtSCL != null) shortBET1 = shortenNamePDF( 12, SDvalues[DataCount].aufsichtSCL);
			if(SDvalues[DataCount].aufsichtSCL2 != null) shortBET2 = shortenNamePDF( 12, SDvalues[DataCount].aufsichtSCL2);

			/*if(PageStart) {
				y += HeaderSpace;
				PageStart = false;
			}
			else y += LineSpace;*/

			y += 6;

			if(countD == 0 ||  SingleStartTime.getMonth() != SinglelVGL.getMonth()) {
				if(countD != 0 ) { 
					doc.setDrawColor(0);
					doc.setFillColor(220, 220, 220);
					doc.rect(15, y-3.5, 185, 5, 'F')
					doc.text(20, y, numTerm.toString()+" Termine");
					doc.text(187, y, numPruef.toString());
					y += LineSpace+2;
				}
				doc.setFontSize(9);
				doc.setFontType("bold");
				doc.text(12, y, showMonth.toString());
				doc.setFontType("normal");
				doc.setFontSize(8);
				y += LineSpace;
				numPruef = 0;
				numTerm = 0;
			}

			if((y+resultSpace) > totalHeight) {
				y = TableBegin-10.5;
				currentPage++;
				doc.addPage();
				doc.setFontType("normal");
				doc.setFontSize(8);
				//---------------------------------------------------------------
				doc.setFontSize(8);
		    	doc.text(185,287, "SEITE "+currentPage.toString());//+" VON "+TotalPages.toString())
		    	doc.text(10,287, DayName[CurrentDate.getDay()].toString()+", "+formatNumber(CurrentDate.getDate()).toString()+". "+MonthName[CurrentDate.getMonth()].toString()+" "+CurrentDate.getFullYear().toString());
		    	//---------------------------------------------------------------
		    	doc.setDrawColor(0);
		    	doc.setFillColor(73, 73, 73);
		    	doc.rect(10, 10, 190, 5, 'F')
		    	doc.setTextColor(255);
		    	doc.text(12, y , 'Monat');
		    	doc.text(24, y , 'Datum');
		    	doc.text(38, y , 'Startzeit');
		    	doc.text(55, y , 'Endzeit');
		    	doc.text(69, y , 'Dozent');
		    	doc.text(96, y , 'Bezeichnung Klausur');
		    	doc.text(138, y , 'Betreuer 1');
		    	doc.text(161, y , 'Betreuer 2');
		    	doc.text(183, y , 'Prüflinge');
		    	doc.setTextColor(0);
		    	//---------------------------------------------------------------
	    		y += HeaderSpace+0.5;

			}


			doc.text(18, y, (formatCorrect(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getDate())+"."+formatCorrect(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getMonth()+1)+"."+formatCorrect(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getFullYear())).toString());
			doc.text(37, y, formatCorrect(SingleStartTime.getHours())+":"+formatCorrect(SingleStartTime.getMinutes())+":00");
			doc.text(53, y, formatCorrect(SingleEndTime.getHours())+":"+formatCorrect(SingleEndTime.getMinutes())+":00");

			if(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].dozent != null) doc.text(69, y, shortDozent.toString());
			else doc.text(69, y, "");
			if(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].name != null) doc.text(96, y, shortName.toString());
			else doc.text(96, y, "");
			if(SDvalues[DataCount].aufsichtSCL != null) doc.text(138, y, shortBET1.toString());
			else doc.text(138, y, "");
			if(SDvalues[DataCount].aufsichtSCL2 != null) doc.text(161, y, shortBET2.toString());
			else doc.text(161, y, "");
			if(SDvalues[DataCount].anzahlTeilnehmer != 0) doc.text(187, y, (SDvalues[DataCount].anzahlTeilnehmer).toString());
			else doc.text(187, y, "");

			numPruef += parseFloat(SDvalues[DataCount].anzahlTeilnehmer);
			numTerm++;
			totalPruef += parseFloat(SDvalues[DataCount].anzahlTeilnehmer);
			totalTerm++;
			countD++;
		}
	}

	//---------------------------------------------------------------
	y += LineSpace;
	doc.setDrawColor(0);
	doc.setFillColor(220, 220, 220);
	doc.rect(15, y-3.5, 185, 5, 'F')
	doc.text(20, y, numTerm.toString()+" Termine");
	doc.text(187, y, numPruef.toString());
	doc.setLineWidth(0.3);
	doc.line(10, y+5, 200, y+5);
	y += LineSpace+4;
	doc.setDrawColor(0);
	doc.setFillColor(220, 220, 220);
	doc.rect(10, y-3.5, 190, 6, 'F')
	doc.text(20, y, totalTerm.toString()+" Termine");
	doc.text(187, y, totalPruef.toString());
	//---------------------------------------------------------------
	doc.save('SCL_Autoren_'+CurrentDate.getFullYear().toString()+formatNumber(CurrentDate.getMonth()+1).toString()+formatNumber(CurrentDate.getDate()).toString()+'.pdf');
}
