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
			var SingleStartTime  = Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime;
			if(DataCount > 0) var SinglelVGL = Block[Block.indexOfObject(SDvalues[DataCount-1].klausur_nr)].startTime;
			else var SinglelVGL = Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime;
			var SingleEndTime	 = Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].endTime;
			showMonth = returnMonthName(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getMonth()+1)+" "+Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getFullYear();
			colID[DataCount] = Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].id;	

			if(countD == 0 ||  SingleStartTime.getMonth() != SinglelVGL.getMonth()) {
				if(countD != 0 ) { htmlCode += "<tr class='sumTR' ><td class='sumTerm' colspan='1'>"+numTerm+" Termine</td><td></td><td></td><td></td></tr>";}
				htmlCode += "<tr class='MonthTR'>";
				htmlCode += "<td class='MonthTD' colspan='3'>"+showMonth+"</td>";
				htmlCode += "</tr>";
				numPruef = 0;
				numTerm = 0;
				numOfMonth++;
			}
			if((countD % 2) != 0) var TRColor = "TableTRLight";
			else var TRColor = "TableTRDark";
			htmlCode += 			"<tr class='"+TRColor+"' id='"+DataCount+"' style='cursor: default;'>";
			htmlCode += 				"<td class='dataTD'></td>";
			htmlCode += 				"<td class='dataTD'>"+formatCorrect(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getDate())+"."+formatCorrect(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getMonth()+1)+"."+formatCorrect(Block[Block.indexOfObject(SDvalues[DataCount].klausur_nr)].startTime.getFullYear())+"</td>";
			htmlCode += 				"<td class='dataTD'>"+formatCorrect(SingleStartTime.getHours())+":"+formatCorrect(SingleStartTime.getMinutes())+" Uhr </td>";
			htmlCode += 				"<td class='dataTD'>"+formatCorrect(SingleEndTime.getHours())+":"+formatCorrect(SingleEndTime.getMinutes())+" Uhr </td>";
			htmlCode += 			"</tr>";
			numTerm++;
			totalTerm++;
			countD++;
		}
	}

	htmlCode += "<tr class='sumTR' ><td class='sumTerm' colspan='1'>"+numTerm+" Termine</td><td></td><td></td><td></td></tr>";
	htmlCode += 			"<tr class='TableTRAdd'>";
	if(totalTerm > 1) htmlCode += 				"<td colspan='1' class='totTerm'>"+totalTerm+" Termine</td>";
	else htmlCode += 				"<td colspan='1' class='totTerm'>"+totalTerm+" Termin</td>";
	htmlCode += 			"</tr>";
	htmlCode += 			"<tr class='TableTR'>";
	htmlCode += 				"<td colspant='4'>&nbsp;</td>";
	htmlCode += 			"</tr>";
	
	var parentBlock = document.getElementById('list');
    if(parentBlock != null) {
        var table = document.createElement("table");
        table.id = "Table";
        table.innerHTML = htmlCode;
        parentBlock.appendChild(table); 
    }

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
	writeDoc +=			"<div id='addEntryPos'><a href='javascript:void[0]' onclick='createForm(\""+(dummyDate / 1000)+"\")' title='neuen Termin beantragen'><div id='addEntry'>&nbsp;</div></a></div>";
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

}
