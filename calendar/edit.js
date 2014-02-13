function formatNumber(num) {
	if(num < 10) num = "0"+num;
	return [num];
}
//Modify Input Arrays
var numberOfSingleDates = SDValues.length;
//var numberOfSingleDates = 0;

for(var zeroCnt = 0; zeroCnt < numberOfSingleDates; zeroCnt++){
	SDValues[zeroCnt].startTime = new Date(SDValues[zeroCnt].startTime*1000);
	SDValues[zeroCnt].endTime = new Date(SDValues[zeroCnt].endTime*1000);
}

BlockArray.startTime = new Date(BlockArray.startTime*1000);
BlockArray.endTime = new Date(BlockArray.endTime*1000);
BlockArray.fb = fbArray[BlockArray.fb-1];
if(BlockArray.timeNotes == null) BlockArray.timeNotes = "";

for(var ProbNumbs = 0; ProbNumbs < ProbVal.length; ProbNumbs++){
	ProbVal[ProbNumbs].Zeitpunkt = new Date(ProbVal[ProbNumbs].Zeitpunkt*1000);
}

if(AutID != null) {
	for(var AutIDlen = 0; AutIDlen < AutID.length; AutIDlen++){
		if(AutFB[AutIDlen] == "11") sclTeam[AutIDlen] = AutLastName[AutIDlen]+", "+AutSurName[AutIDlen];
		Autoren[AutIDlen] = AutLastName[AutIDlen]+", "+AutSurName[AutIDlen] ;
	}
} //else { Autoren[0] = "Datenbank ist leer";}

var nextID			= idArray[idArray.indexOf(BlockArray.id)+1];
var prevID			= idArray[idArray.indexOf(BlockArray.id)-1];

monthDate 			= [	"Januar",
						"Februar", 
						"März", 
						"April",
						"Mai", 
						"Juni",
						"Juli",
						"August",
						"September",
						"Oktober",
						"November",
						"Dezember" ];


var IDsNumArray = new Array();
for(var IDsLength = (SDValues.length-1); IDsLength >= 0; IDsLength--) {
	IDsNumArray[IDsLength] = BlockArray.id+(formatNumber(IDsLength+1));
}
//---------------------------------------------------------------------------
//Einzeltermin Tab - Positionsvariable
var etPosition = 1;
//---------------------------------------------------------------------------
var TerminText = [	"Abstimmung der rechtlichen Voraussetzungen:", 
              		"Bereitstellung Termincheckliste_FG:",
              		"Namen der Aufsichtspersonen liegen vor:",
              		"HIS-Liste e-klausur@uni-kassel.de liegt vor:",
              		"Gruppeneinteilung liegt vor:",
              		"Passworte und Serienbrief erstellt:",
              		"Übermittlung von TN-Listen an Perception:",
              		"Autorenzugriff erstellt:",
              		"Prüfungskonfiguration beschrieben:",
              		"Prüfungsimage angepasst oder erstellt:",
              		"Fachgebiet hat Funktionstest durchgeführt:",
              		"Klausur liegt für Qualitätskontrolle vor:",
              		"Qualitätskontrolle durchgeführt:",
              		"Endabnahme E-Klausur im E-Klausurcenter:",
              		"Checkliste für Klausuradmin liegt vor:",
              		"Klausur starten:",
              		"Problemfälle sind bearbeitet:",
              		"Mitteilung an SCL - Klausureinsicht beendet:",
              		"Abschließende Archivierung (und Signierung):",
              		"Löschen der Gruppen (TN sind schon gelöscht):" ];
//---------------------------------------------------------------------------
//Qualitätsmanagement

var CPQStext = 		["Kassel-Template anwenden",
                	"Save as you go auf 5 Min",
                	"Info-Block SCL",
                	"Name und Vorname in Ansicht",
                	"Klausurarchive aktivieren",
                	"Feedbackhinweis Rückkehr zur Startseite"];

var CheckedCPQS = new Array();
CheckedCPQS[0] = QMChecks[0];
CheckedCPQS[1] = QMChecks[1];
CheckedCPQS[2] = QMChecks[2];
CheckedCPQS[3] = QMChecks[3];
CheckedCPQS[4] = QMChecks[4];
CheckedCPQS[5] = QMChecks[5];
	//---------------------------------------------------------------------------
var CPKTtext = 		["Klausurrechner hochgefahren",
               		"Beschilderung angebracht",
               		"Etiketten vorhanden",
               		"2 Admin Rechner in DHCP",
               		"Checklisten Klausuradmin bereit",
               		"Letzter Testlauf vor Klausurstart",
               		"Terminpläne eingerichtet"];
	
var CheckedCPKT = new Array();
CheckedCPKT[0] = QMChecks[6];
CheckedCPKT[1] = QMChecks[7];
CheckedCPKT[2] = QMChecks[8];
CheckedCPKT[3] = QMChecks[9];
CheckedCPKT[4] = QMChecks[10];
CheckedCPKT[5] = QMChecks[11];
CheckedCPKT[6] = QMChecks[12];
	//---------------------------------------------------------------------------
var CPNKtext = 			["Archive vorhanden",
           			"Dozent/in der/den Gruppe/n zugeordnet",
           			"Teilnehmerreports erstellt und versandt",
           			"Excel-Exports erstellt und versandt",
           			"Teilnehmer - nicht Gruppen - löschen"];	
	
var CheckedCPNK = new Array();
CheckedCPNK[0] = QMChecks[13];
CheckedCPNK[1] = QMChecks[14];
CheckedCPNK[2] = QMChecks[15];
CheckedCPNK[3] = QMChecks[16];
CheckedCPNK[4] = QMChecks[17];
//---------------------------------------------------------------------------
//Problembereiche Array STATISCH
var ProbBereichArray = [ "Perception/Anwendung", "Netzwerk", "Client", "Server", 
							"Organisation", "Klausur", "Sonstiges"];
var numberOfProbs = ProbVal.length; 
var probPosition = 1;
//---------------------------------------------------------------------------
//save Event Function
function submitForm(invokeParamVal) { 
	if(invokeParamVal == 'ctrl_delete') {
		var formEl = "<form id='sendForm' method='post' action='edit.php?id="+BlockArray.id+"'>";
		formEl += "<input type='hidden' name='"+invokeParamVal+"' value='true' />";
		formEl += "</form>";

		var parentBlock = document.body;
	    var div = document.createElement("div");
	    div.id = "formDiv";
	    div.innerHTML = formEl;
	    parentBlock.appendChild(div);  

		if(confirm('Diesen Termin wirklich löschen?')){
			var element = document.getElementById("submitParam"); 
			element.name = invokeParamVal;

			var form = document.getElementById("sendForm");
			// submit the form.
			form.submit();
		} 
	} else {
		var formEl = "<form id='sendForm' method='post' action='edit.php?id="+BlockArray.id+"&SD="+numberOfSingleDates+"&PV="+numberOfProbs+"&vCL="+vCL+"'>";
		formEl += "<input type='hidden' name='"+invokeParamVal+"' value='true' />";
		//Left Block
		formEl += "<input type='hidden' name='Date' value='"+document.getElementById('Date').value+"'/>";
		formEl += "<input type='hidden' name='klausur_name' value='"+document.getElementById('klausur_name').value+"'/>";
		formEl += "<input type='hidden' name='hourMenu_strt' value='"+document.getElementById('hourMenu_strt').value+"'/>";
		formEl += "<input type='hidden' name='minuteMenu_strt' value='"+document.getElementById('minuteMenu_strt').value+"'/>";
		formEl += "<input type='hidden' name='hourMenu_stop' value='"+document.getElementById('hourMenu_stop').value+"'/>";
		formEl += "<input type='hidden' name='minuteMenu_stop' value='"+document.getElementById('minuteMenu_stop').value+"'/>";
		formEl += "<input type='hidden' name='fachbereich' value='"+document.getElementById('fachbereich').value+"'/>";
		formEl += "<input type='hidden' name='scl_betreuer' value='"+document.getElementById('scl_betreuer').value+"'/>";
		formEl += "<input type='hidden' name='dozent' value='"+document.getElementById('dozent').value+"'/>";
		formEl += "<input type='hidden' name='ansprch_fb' value='"+document.getElementById('ansprch_fb').value+"'/>";
		formEl += "<input type='hidden' name='teilnehmer' value='"+document.getElementById('teilnehmer').value+"'/>";
		formEl += "<input type='hidden' name='EditorTextField' value='"+BlockArray.notes+"'/>";
		//RightBlock
		//TerminChecklist 
		for(var CheckPointNum = 0; CheckPointNum < 19; CheckPointNum++) {
			formEl += "<input type='hidden' name='check"+CheckPointNum+"' value='"+pickerDate[CheckPointNum].check+"' />";
			formEl += "<input type='hidden' name='picker"+CheckPointNum+"' value='"+pickerDate[CheckPointNum].date+"' />";
		}
		//Qualitätsmanagment
		for(var cpqsNUM = 0; cpqsNUM < 6; cpqsNUM++) {
			formEl += "<input type='hidden' name='checkCPQS"+cpqsNUM+"' value='"+CheckedCPQS[cpqsNUM]+"' />";
		}
		for(var cpktNUM = 0; cpktNUM < 7; cpktNUM++) {
			formEl += "<input type='hidden' name='checkCPKT"+cpktNUM+"' value='"+CheckedCPKT[cpktNUM]+"' />";
		}
		for(var cpnkNUM = 0; cpnkNUM < 5; cpnkNUM++) {
			formEl += "<input type='hidden' name='checkCPNK"+cpnkNUM+"' value='"+CheckedCPNK[cpnkNUM]+"' />";
		}
		//Einzeltermine
		for(var anzahlT = numberOfSingleDates; anzahlT > 0; anzahlT--) {
			formEl += "<input type='hidden' name='sdID"+anzahlT+"' 				value='"+SDValues[anzahlT-1].termin_id+"' />";
			formEl += "<input type='hidden' name='sdStartTime"+anzahlT+"' 		value='"+formatNumber(SDValues[anzahlT-1].startTime.getDate())+"."+formatNumber(SDValues[anzahlT-1].startTime.getMonth()+1)+"."+SDValues[anzahlT-1].startTime.getFullYear()+"' />";
			formEl += "<input type='hidden' name='sdStartHour"+anzahlT+"' 		value='"+formatNumber(SDValues[anzahlT-1].startTime.getHours())+"' />";
			formEl += "<input type='hidden' name='sdStartMin"+anzahlT+"' 		value='"+formatNumber(SDValues[anzahlT-1].startTime.getMinutes())+"' />";
			formEl += "<input type='hidden' name='sdEndTime"+anzahlT+"' 		value='"+formatNumber(SDValues[anzahlT-1].endTime.getDate())+"."+formatNumber(SDValues[anzahlT-1].endTime.getMonth()+1)+"."+SDValues[anzahlT-1].endTime.getFullYear()+"' />";
			formEl += "<input type='hidden' name='sdEndHour"+anzahlT+"' 		value='"+formatNumber(SDValues[anzahlT-1].endTime.getHours())+"' />";
			formEl += "<input type='hidden' name='sdEndMin"+anzahlT+"' 			value='"+formatNumber(SDValues[anzahlT-1].endTime.getMinutes())+"' />";
			formEl += "<input type='hidden' name='sdBetreuerSCL"+anzahlT+"' 	value='"+SDValues[anzahlT-1].betreuerSCL+"' />";
			formEl += "<input type='hidden' name='sdsdBetreuerSCL2"+anzahlT+"' 	value='"+SDValues[anzahlT-1].betreuerSCL2+"' />";
			formEl += "<input type='hidden' name='sdAufsicht"+anzahlT+"' 		value='"+SDValues[anzahlT-1].aufsicht+"' />";
			formEl += "<input type='hidden' name='sdAufsicht2"+anzahlT+"' 		value='"+SDValues[anzahlT-1].aufsicht2+"' />";
			formEl += "<input type='hidden' name='sdTeilnehmer"+anzahlT+"' 		value='"+SDValues[anzahlT-1].teilnehmer+"' />";
		}
		//Probleme
		var PVnum = new Array();
		for(var ind = 0; ind < numberOfProbs; ind++){
			if(ProbVal[ind].Problembeschreibung != null) {
				if(ProbVal[ind].einzeltermin_id != null && ProbVal[ind].einzeltermin_id != false) {
					var pSid = ProbVal[ind].einzeltermin_id.split(" ");
					pSid = pSid[3].replace(")", "");
				} else { pSid = null; }
				formEl += "<input type='hidden' name='pBool"+ind+"' 		value='true' />";
				formEl += "<input type='hidden' name='pID"+ind+"' 			value='"+BlockArray.id+formatNumber(ind+1)+"' />";
				formEl += "<input type='hidden' name='pKlausurID"+ind+"' 	value='"+BlockArray.id+"' />";
				formEl += "<input type='hidden' name='pSingleDate"+ind+"' 	value='"+pSid+"' />";
				formEl += "<input type='hidden' name='pSection"+ind+"' 		value='"+ProbVal[ind].Problembereich+"' />";
				formEl += "<input type='hidden' name='pDate"+ind+"' 		value='"+formatNumber(ProbVal[ind].Zeitpunkt.getDate())+"."+formatNumber(ProbVal[ind].Zeitpunkt.getMonth()+1)+"."+ProbVal[ind].Zeitpunkt.getFullYear()+"' />";
				formEl += "<input type='hidden' name='pHour"+ind+"' 		value='"+formatNumber(ProbVal[ind].Zeitpunkt.getHours())+"' />";
				formEl += "<input type='hidden' name='pMin"+ind+"' 			value='"+formatNumber(ProbVal[ind].Zeitpunkt.getMinutes())+"' />";
				formEl += "<input type='hidden' name='pDes"+ind+"' 			value='"+ProbVal[ind].Problembeschreibung+"' />";
				formEl += "<input type='hidden' name='pStat"+ind+"' 		value='"+ProbVal[ind].StatQuo+"' />";
				formEl += "<input type='hidden' name='pCheck"+ind+"' 		value='"+ProbVal[ind].erledigt+"' />";

				PVnum.push(ind+1);
			}
		}
		//alert(PVnum);
		formEl += "<input type='hidden' name='PVnum' value='"+PVnum+"' />";
		formEl += "</form>";

		var parentBlock = document.body;
	    var div = document.createElement("div");
	    div.id = "formDiv";
	    div.innerHTML = formEl;
	    parentBlock.appendChild(div);  
		// set the hidden input's name to the value you want.
		var element = document.getElementById("submitParam"); 
		element.name = invokeParamVal;
		
		var form = document.getElementById("sendForm");
		// submit the form.
		form.submit();
	}

}
/*function submitForm(invokeParamVal) {
	if(invokeParamVal == 'ctrl_delete') {
		if(confirm('Diesen Termin wirklich löschen?')){
			var element = document.getElementById("submitParam"); 
			element.name = invokeParamVal;

			var form = document.getElementById("Form");
			// submit the form.
			form.submit();
		} 
	} else {
		// set the hidden input's name to the value you want.
		var element = document.getElementById("submitParam"); 
		element.name = invokeParamVal;
		
		var form = document.getElementById("Form");
		// submit the form.
		form.submit();
	}

}*/
// Create DropDown Function
Array.prototype.createDropDown = function(id, placeholderText, selectedVal, width, maxLength, clearAllowed) {
	var array = new Array();
    $.each(this, function(key, value) {
        array[key] = new Array();
		array[key]["id"] = value; 
		if(value < 10 ) array[key]["text"] = "0"+value;
		else array[key]["text"] = value;
    });
	$(document).ready(function () {
    	$("#"+id).select2({
    		dropdownCssClass: "dropDown_"+id,
    		width: width,
    		allowClear: clearAllowed,
    		maximumInputLength: maxLength,
        	placeholder: placeholderText,
        	formatNoMatches: function(term){
				return "ungültige Eingabe";
        	},
        	createSearchChoice:function(term, data) { 
        		if ($(data).filter(function() { 
        			return this.text.localeCompare(term)===0; 
        		}).length===0) {return {id:term, text:term};} },
            data: array,
            initSelection : function (element, callback) {
                var data = {id: selectedVal, text: selectedVal};
                callback(data);
            }
        }).select2('val', selectedVal+":"+selectedVal);
    });
}
Array.prototype.createDropDown_NE = function(id, placeholderText, selectedVal, width, maxLength, clearAllowed) {
	var array = new Array();
    $.each(this, function(key, value) {
        array[key] = new Array();
		array[key]["id"] = value; 
		if(value < 10 ) array[key]["text"] = "0"+value;
		else array[key]["text"] = value;
    });
	$(document).ready(function () {
    	$("#"+id).select2({
    		dropdownCssClass: "dropDown_"+id,
    		width: width,
    		allowClear: clearAllowed,
    		maximumInputLength: maxLength,
        	placeholder: placeholderText,
        	formatNoMatches: function(term){
				return "ungültige Eingabe";
        	},
            data: array,
            initSelection : function (element, callback) {
                var data = {id: selectedVal, text: selectedVal};
                callback(data);
            }
        }).select2('val', selectedVal+":"+selectedVal);
    });
}
//DatePicker
function createDatePicker(id, numb){
	$(document).ready(function () {
    	$("#"+id).datepicker({ 
        	firstDay: 1,
        	showWeek: true,
        	changeYear: true,
        	changeMonth: true,
        	monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", 
        					"August", "September", "Oktober", "November", "Dezember" ],
        	monthNamesShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", 
        						"Sep", "Okt", "Nov", "Dez" ],
        	dayNames: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", 
        				"Freitag", "Samstag" ],
        	dayNamesMin: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
        	dayNamesShort: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
        	dateFormat: "dd.mm.yy",
        	weekHeader: "KW",
        	onSelect: function(dateText, inst) {
        		var element = document.getElementById(id);
        		if(numb != null) {
        			var value_split = dateText.split(".");
					var currentDate = new Date(value_split[2],(value_split[1]-1),value_split[0]);
	        		if(numb < 15) pickerDate[numb].date = (currentDate.getTime())/1000;
	        		if(numb > 15) pickerDate[numb-1].date = (currentDate.getTime())/1000;
        			if(numb != 15) crDeadline(element); 
        		}
        	}
        });
    });
}
//DatePicker
function createDatePickerDate(id){
	$(document).ready(function () {
    	$("#"+id).datepicker({ 
        	firstDay: 1,
        	showWeek: true,
        	changeYear: true,
        	changeMonth: true,
        	monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", 
        					"August", "September", "Oktober", "November", "Dezember" ],
        	monthNamesShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", 
        						"Sep", "Okt", "Nov", "Dez" ],
        	dayNames: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", 
        				"Freitag", "Samstag" ],
        	dayNamesMin: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
        	dayNamesShort: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
        	dateFormat: "dd.mm.yy",
        	weekHeader: "KW",
        	onSelect: function(dateText, inst) {
        		var element = document.getElementById(id);
    			var value_split = dateText.split(".");
        		for(var inNum = 0; inNum < numberOfSingleDates; inNum++) {
        			SDValues[inNum].startTime.setDate(value_split[0]);
        			SDValues[inNum].startTime.setMonth(value_split[1]-1);
        			SDValues[inNum].startTime.setFullYear(value_split[2]);
        			SDValues[inNum].endTime.setDate(value_split[0]);
        			SDValues[inNum].endTime.setMonth(value_split[1]-1);
        			SDValues[inNum].endTime.setFullYear(value_split[2]);
        		}
        	}
        });
    });
}
// daysOfMonth Func
function getDaysOfMonth(date) {
	date = new Date(date);
	var month = date.getMonth();
	var year = date.getFullYear();
	var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	var monthLength = cal_days_in_month[month];
	
	if (month == 1) { // nur Ferburar!
	  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
		monthLength = 29;
	  }
	}	
	return[monthLength];
}
// DatePick ColorChange
function crDeadline(object) {
	var value = object.value;
	var value_split = value.split(".");
	var currentDate = new Date(value_split[2],(value_split[1]-1),value_split[0]);
	var date = new Date();
	//date.setHours(0,0,0,0);
	var dif = Math.round((currentDate - date)/86400000);
	//alert(object.id);
	if(dif >= 30) { object.style.backgroundColor = "#7CEB2D"; }
	if(dif < 30 && dif >= 14){ object.style.backgroundColor = "#CBFF3B"; }
	if(dif < 14 && dif >= 7) { object.style.backgroundColor = "#FFFF3B"; }
	if(dif < 7 && dif >= 3) { object.style.backgroundColor = "#FFCB3A"; }
	if(dif < 3) { object.style.backgroundColor = "#F01D1D"; }

} 
//Checkbox Function
function checkboxAction(num) {
	var box = document.getElementById("check"+num);
	var datebox = document.getElementById("picker"+num);
	if(box.checked == 1) {
		if(num > 15) {
			pickerDate[num-1].check = "true";
		}else pickerDate[num].check = "true";
		datebox.style.backgroundColor = "#CCCCCC";
		datebox.disabled = true;
		return (true);
	} else {
		if(num > 15) {
			pickerDate[num-1].check = "false";
		}else pickerDate[num].check = "false";
		datebox.disabled = false;
		crDeadline(datebox);
		createDatePicker("picker"+num, num);
		return(false);
	}
}
//Save Checked-Status while Tab changes
function checkboxActionQM(block, num) {
	if(block == 1) var box = document.getElementById("checkCPQS"+num);
	if(block == 2) var box = document.getElementById("checkCPKT"+num);
	if(block == 3) var box = document.getElementById("checkCPNK"+num);
	
	if(box.checked == 1) {
		if(block == 1) CheckedCPQS[num] = "true";
		if(block == 2) CheckedCPKT[num] = "true";
		if(block == 3) CheckedCPNK[num] = "true";
		return (true);
	} else {
		if(block == 1) CheckedCPQS[num] = "false";
		if(block == 2) CheckedCPKT[num] = "false";
		if(block == 3) CheckedCPNK[num] = "false";
		return(false);
	}
}
// Create DropDown Array
function createDropDownArray(startVal, stopVal, intervall) {
	if(intervall == null) intervall = 1;
	var array = new Array();
	array[0] = new Array();
	var index = 0;
	for (var value = startVal; value <= stopVal; value+=intervall) {			
		array[index] = value.toString();
		index++;
	}
	return (array);
}

function changeSingleTeil(value,currentID) {
	SDValues[currentID].teilnehmer = value;
}

function openEditor() {
	var tabContent = BlockArray.notes;
	if(document.getElementById('EditorTextField') == null) {
    	var parentBlock = document.getElementById('mainBlock');
        var div = document.createElement("textarea");
        div.id = "EditorTextField";
        div.name = "EditorTextField";
        div.form = "Form";
        div.innerHTML = tabContent;
        parentBlock.appendChild(div);
	} else {
        $('#EditorIconPos').click(function(e) {
        	 $('#EditorTextField').fadeIn(150);
	    });
	}
	$('#EditorTextField').bind('input', function() { 
	    BlockArray.notes = $(this).val();
	});
	$('#EditorTextField').click(function(e) {
        e.stopPropagation();
    });
	$('#EditorIconPos').click(function(e) {
        e.stopPropagation();
    });

	$(document).click(function() {
		if(document.getElementById('EditorTextField').value != "") {
			document.getElementById('EditorIcon').style.backgroundImage = "url(../images/icons/edit-note-4.png)";
			BlockArray.notes = document.getElementById('EditorTextField').value;
		}
		else document.getElementById('EditorIcon').style.backgroundImage = "url(../images/icons/edit-4.png)";
	    $('#EditorTextField').fadeOut(300);
	});

}


// Create HTML Document if id exists
if(BlockArray.id != null) {
	var currentYear 	= BlockArray.startTime.getFullYear();
	var dayDate 		= createDropDownArray(1, getDaysOfMonth(BlockArray.startTime));
	var yearDate 		= createDropDownArray(currentYear-10,currentYear+10);
	var hourMenu		= createDropDownArray(6,22);
	var minuteMenu		= createDropDownArray(0,55,5);

	if(nextID != null) var nextIDLink = "./edit.php?id="+nextID+"&vCL="+vCL;
	else var nextIDLink = "javascript:void[0]";
	if(prevID != null) var prevIDLink = "./edit.php?id="+prevID+"&vCL="+vCL;
	else var prevIDLink = "javascript:void[0]";

	createDatePickerDate("Date");
	/*dayDate.createDropDown_NE("dayDate",			"DD", formatNumber(startTime.getDate()), "off", "2", false); 
	monthDate.createDropDown_NE("monthDate",		"MM", monthDate[startTime.getMonth()], "100px", "9", false); 
	yearDate.createDropDown_NE("yearDate",			"YYYY", startTime.getFullYear(), "75px", "4", false); */
	hourMenu.createDropDown_NE("hourMenu_strt",		"hh", formatNumber(BlockArray.startTime.getHours()), "off", "2", false); 
	minuteMenu.createDropDown_NE("minuteMenu_strt",	"mm", formatNumber(BlockArray.startTime.getMinutes()), "off", "2", false); 
	hourMenu.createDropDown_NE("hourMenu_stop",		"hh", formatNumber(BlockArray.endTime.getHours()), "off", "2", false); 
	minuteMenu.createDropDown_NE("minuteMenu_stop",	"mm", formatNumber(BlockArray.endTime.getMinutes()), "off", "2", false); 
	knameArray.createDropDown("klausur_name",		"keine Auswahl/Eingabe", BlockArray.name, "99%", null, false); ;
	fbArray.createDropDown_NE("fachbereich",		"keine Auswahl/Eingabe", BlockArray.fb , "99%", null ,false); 
	Autoren.createDropDown("dozent",				"keine Auswahl/Eingabe", BlockArray.dozent, "150px", null ,true); 
	Autoren.createDropDown("ansprch_fb",			"keine Auswahl/Eingabe", BlockArray.partner, "150px", null,true); 
	sclTeam.createDropDown("scl_betreuer",			"keine Auswahl/Eingabe", BlockArray.betreuer, "150px", null ,true); 
	idArray.createDropDown_NE("searchID",			"keine Auswahl/Eingabe", formatNumber(BlockArray.id), "4.7em", null ,false); 
/*
	$(document).ready(function () {
    	$("#yearDate").on("change", function() {
	    	
	    	startTime.setFullYear(
    	});
	});
	
	if(document.getElementById("info_box") != null) {
		
		
	}*/
	if(document.getElementById("info_box") == null) {
		if(sourceLoc == 'calendar') {
			var backLink = "calendar.php?tms="+Math.round(BlockArray.startTime/1000)+"&view="+vCL+"&lS="+listStartTime+"&lE="+listStopTime+"&lSN="+listSpecialName;
		} else if(sourceLoc == 'autoren') {
			var backLink = "../authors/edit.php?id="+sourceID;
		}
		document.write("<div align='center' style='height: 100%;' ><div id='container'>");
		document.write("<div id='info_box'>");
		document.write(		"<div id='toolBox'>");
		document.write(			"<div id='backArrowPos'><a href='"+backLink+"' title='Zurück'><div id='backArrow'>&nbsp;</div></a></div>");
		document.write(			"<div id='saveIconPos'><a name='ctrl_save' href='javascript:void[0]' onClick='submitForm(\"ctrl_save\")' title='Änderungen Speichern'><div id='saveIcon'>&nbsp;</div></a></div>");
		document.write(			"<div id='deleteIconPos'><a name='ctrl_delete' href='javascript:void[0]' onClick='submitForm(\"ctrl_delete\")' title='Termin löschen'><div id='deleteIcon'>&nbsp;</div></a></div>");
		document.write(			"<div id='horLine1'></div>");
		document.write(			"<div id='EditorIconPos'><a href='javascript:void[0]' onClick=\"openEditor()\" title='Editor öffnen'><div id='EditorIcon'>&nbsp;</div></a></div>");
		document.write(			"<div id='prevIDPos'><a href='"+prevIDLink+"'  title='Zum vorherigen Termin'><div id='prevID'>&nbsp;</div></a></div>");
		document.write( 		"<div id='searchIDPos'><input type='hidden'id='searchID'/></div>");
		document.write(			"<div id='nextIDPos'><a href='"+nextIDLink+"'  title='Zum nächsten Termin'><div id='nextID'>&nbsp;</div></a></div>");
		document.write(		"</div>"); // toolBox
		document.write(		"<div id='mainBlock'>");
		document.write( 		"<div id='leftBox'>");
		document.write( 				"<ul class='caps'>");
		document.write(						"<li class='list_elmnts'><div id='idText'>ID: </div>");
		document.write(								"<div id='id'>"+BlockArray.id+"</div>");
		document.write( 					"</li>");
		document.write(               	    "<li class='list_elmnts'>Datum:");
		document.write( 						"<span id='spanSpace'><input type='text' name='Date' class='date' value='"+formatNumber(BlockArray.startTime.getDate())+"."+formatNumber(Math.round(BlockArray.startTime.getMonth()+1))+"."+BlockArray.startTime.getFullYear()+"' id='Date'/></span>");
		/*document.write( 						"<span id='spanSpace'><input type='hidden'id='dayDate' name='dayDate'/></span>");
		document.write( 						"<span id='spanSpace'><input type='hidden'id='monthDate' name='monthDate'/></span>");
		document.write( 						"<span id='spanSpace'><input type='hidden'id='yearDate' name='yearDate'/></span>");*/
		document.write( 					"</li>");
		document.write(						"<hr noshade width='99%' size='1' align='left'>");
		document.write(                     "<li class='list_elmnts'>Bezeichnung Klausur:");
		document.write( 						"<span><input type='hidden'id='klausur_name' name='klausur_name'/></span>");
		document.write( 					"</li>");
		document.write(                  	"<li class='list_elmnts'>Fachbereich:");
		document.write( 						"<span><input type='hidden'id='fachbereich' name='fachbereich'/></span>");
		document.write( 					"</li>");
		document.write(                	    "<li class='list_elmnts'>Dozent/in:");
		document.write( 						"<span style='float:right; margin: -0.55em 0.2em;'><input type='hidden'id='dozent' name='dozent'/></span>");
		document.write( 					"</li>");
		document.write(                     "<li class='list_elmnts'>Ansprechpartner Fachgebiet:");
		document.write( 						"<span style='float:right; margin: -0.55em 0.2em;'><input type='hidden'id='ansprch_fb' name='ansprch_fb'/></span>");
		document.write( 					"</li>");
		document.write( 					"<li class='list_elmnts'>Name SCL Betreuer/in:");
		document.write( 						"<span style='float:right; margin: -0.55em 0.2em;'><input type='hidden'id='scl_betreuer' name='scl_betreuer'/></span>");
		document.write( 					"</li>");
		document.write(						"<li class='list_elmnts'>Erwartete Anzahl Prüflinge:");
		document.write(								"<input type='number' name='teilnehmer' style='width: 3.5em;' value='"+BlockArray.teilnehmer+"' id='teilnehmer'/>");
		document.write( 					"</li>");
		document.write(						"<hr noshade width='99%' size='1' align='left'>");
		document.write(						"<li class='list_elmnts'>");
		document.write(								"Belegungszeitraum:");
		document.write( 					"</li>");
		document.write(                		"<li class='list_elmnts'>Von:");
		document.write( 						"<span style='padding-left: 2em;'><input type='hidden'id='hourMenu_strt' name='hourMenu_strt'/></span>");
		document.write( 						"<span id='spanSpace'><input type='hidden'id='minuteMenu_strt' name='minuteMenu_strt'/></span>");
		document.write( 						"<span id='spanSpace'>Uhr</span>");
		document.write( 					"</li>");
		document.write(                	    "<li class='list_elmnts'>Bis:");
		document.write( 						"<span style='padding-left: 2.2em;'><input type='hidden'id='hourMenu_stop' name='hourMenu_stop'/></span>");
		document.write( 						"<span id='spanSpace'><input type='hidden'id='minuteMenu_stop' name='minuteMenu_stop'/></span>");
		document.write( 						"<span id='spanSpace'>Uhr</span>");
		document.write( 					"</li>");
		/*document.write(						"<li class='list_elmnts' id='anlagen'>Anlagen:</li>");
		document.write(						"<ul class='sub_caps'>");
		document.write(							"<li class='list_elmnts2'>Teilnehmerlisten:");
		document.write(								"<input type='file' name='teilnehmer_liste' accept='application/pdf,application/msword'/>");
		document.write(							"</li>");
		document.write(							"<li class='list_elmnts2'>Teilnehmeretiketten:");
		document.write(								"<input type='file' name='teilnehmer_etiketten'	accept='application/pdf,application/msword'/>");
		document.write(							"</li>");
		document.write(							"<li class='list_elmnts2'>Ergebnisse:");
		document.write(								"<input type='file' name='ergebnisse'	accept='application/pdf,application/msword'/>");
		document.write(							"</li>");
		document.write(					    "</ul>"); // sub_caps*/
		document.write(						"<p><hr noshade width='99%' size='1' align='left'></p>");
		document.write(					"</ul>"); //caps
		document.write( 		"</div>");	//leftBox	
		document.write( 	"</div>");	//mainBlock
		document.write(		"<input type='hidden' name='ctrl_NotSave' id='submitParam' value='true'>");
		document.write("</div>"); //info_box
		document.write("</br>"); //space
		document.write("</div></div>");
	}
	if(BlockArray.notes != "" && BlockArray.notes != null) document.getElementById('EditorIcon').style.backgroundImage = "url(../images/icons/edit-note-4.png)";
	
	if(nextID == null) {
		var buttonEl = document.getElementById("nextID");
		buttonEl.style.backgroundImage = "url(../images/icons/arrow-right-double-gray-2.png)";
	}
	if(prevID == null) {
		var buttonEl = document.getElementById("prevID");
		buttonEl.style.backgroundImage = "url(../images/icons/arrow-left-double-gray-2.png)";
	}
	
    $("#searchID").on("change", function() {
    	var id = $(this).select2("val");
    	window.location.href = "./edit.php?id="+id;
    });
}
//-------------------------------------------------------------------------//
	function closeSingleTab(elementName) {
		if(elementName == 'EinTer') {
			numberOfSingleDates--;
			if(numberOfSingleDates < etPosition) etPosition--;
			SDValues.splice(numberOfSingleDates,1);
			IDsNumArray.splice(numberOfSingleDates,1);
		}
		if(elementName == 'Probs') {
			numberOfProbs--;
			if(numberOfProbs  < probPosition ) probPosition--;
			ProbVal.splice(numberOfProbs,1);
		}			
		/*
			Send to MySQL DB
			Code....
		*/
		var elementTab = document.getElementById(elementName+"Tab");
		if(elementTab != null) { 
			elementTab.parentNode.removeChild(elementTab); 
			changeTab(elementName);
		}
		//empty Values
			
	}
	function createSingleTab(elementName) {
		if(elementName == 'EinTer') {
			numberOfSingleDates++;
			var currentID = numberOfSingleDates-1;
			etPosition = numberOfSingleDates;		
       		if((SDValues.length-1) < currentID) {
       			SDValues[currentID] = {	
		    					termin_id: BlockArray.id+(formatNumber(currentID+1)), 
		    					startTime: new Date(BlockArray.startTime),
		    					endTime: new Date(BlockArray.startTime),
		    					betreuerSCL: null, 
		    					betreuerSCL2: null, 
		    					aufsicht: null,
		    					aufsicht2: null,
		    					teilnehmer: 0 };
       			SDValues[currentID].startTime.setHours(SDValues[currentID].startTime.getHours());
       			SDValues[currentID].startTime.setMinutes(0);
       			SDValues[currentID].endTime.setHours(SDValues[currentID].endTime.getHours()+1);
       			SDValues[currentID].endTime.setMinutes(0);
       		}
		}
		if(elementName == 'Probs') {
			numberOfProbs++;
			var currentID = numberOfProbs-1;
			
			probPosition = numberOfProbs;		
			ProbVal[currentID] = {	
							//einzeltermin_id: "",
							//Problembereich: null,
							Zeitpunkt: new Date(BlockArray.startTime),
							//Problembeschreibung: null,
							StatQuo: null,
							erledigt: "false" };
		}
		var elementTab = document.getElementById(elementName+"Tab");
		if(elementTab != null) {
			elementTab.parentNode.removeChild(elementTab);	
			changeTab(elementName);
		}

		document.getElementById('Form').action = "edit.php?id="+BlockArray.id+"&SD="+numberOfSingleDates+"&PV="+numberOfProbs;
	}
	
    function changeSingleTab(elementName, Length, TabName) {
        var IDs = new Array();
        
        var tabWidth = (80/(Length+1));
        if(tabWidth > 35) tabWidth = 35;
        if(tabWidth < 9.4) tabWidth = 9.4;
       
        for(var totalLength = 0; totalLength <= Length; totalLength++) {
            IDs[totalLength] = "SingleTab"+TabName+(totalLength+1);
            if(TabName == 'EinTer') IDsNumArray[totalLength] = BlockArray.id+(formatNumber(totalLength+1));
        }
        var currentID = IDs.indexOf(elementName);
        
        for(var i = Length; i >= 0; i--) {
			if(i != currentID) {
				var elementTab = document.getElementById(IDs[i]+"Tab");
				if(elementTab != null) elementTab.parentNode.removeChild(elementTab);
				
				var element = document.getElementById(IDs[i]);
				if(element != null) {
					element.style.backgroundColor = "#4B4B4B";
               	 	element.style.width = tabWidth+"%";
               	 	element.style.height = "90%";
				}

				var closeIcon = document.getElementById("closeTab"+TabName+(i+1));
				if(closeIcon != null) closeIcon.className = "closeTabNotActive";
				
                var textEl = document.getElementById(IDs[i]+"Text");
                if(textEl != null) textEl.className = "SingleTabsNotActive";

			} else {
				if(TabName == 'EinTer') etPosition = (i+1);
				if(TabName == 'Probs') probPosition = (i+1);
				
				var elementTab = document.getElementById(IDs[i]+"Tab");
				if(elementTab != null) elementTab.parentNode.removeChild(elementTab);
				
				var element = document.getElementById(IDs[i]);
				if(element != null) {
					element.style.backgroundColor = "#FFFFFF";
                	element.style.width = tabWidth+"%";
                	element.style.height = "91%";
				}
				var closeIcon = document.getElementById("closeTab"+TabName+(i+1));
				if(closeIcon != null) closeIcon.className = "closeTabActive";

                var textEl = document.getElementById(IDs[i]+"Text");
                if(textEl != null) textEl.className = "SingleTabsActive";
			}
		}
        createTabContent(elementName, TabName, currentID);
    }

function createTabContent(elementName, TabName, currentID) {
	if(TabName == 'Probs') {
		/*if((SDValues.length-1) < currentID) {
			ProbVal[currentID] = {	
					problem_id: BlockArray.id+(formatNumber(currentID+1)),
					klausur_id: BlockArray.id,
					Problembereich: "",
					Zeitpunkt: new Date(BlockArray.startTime),
					Problembeschreibung: "",
					StatQuo: "",
					erledigt: "false"};
   		}*/
   		if(ProbVal[currentID].Problembeschreibung != null){  
   			var BeschreibungComm = ProbVal[currentID].Problembeschreibung;
   		} else var BeschreibungComm = "";

   		if(ProbVal[currentID].StatQuo != null){  
   			var StatComm = ProbVal[currentID].StatQuo;
   		} else var StatComm = "";
   		
		if(ProbVal[currentID].erledigt == "true") var Erledigt = "checked";
		else var Erledit = "";
		//----------------------------------------------------------------------------------			
		
        tabContent  = "<div id='SingleContent"+currentID+"' class='SingelTabContent'><br>"; 
		tabContent += 	"<table id='ProbsTable' class='SingleTable'>";
		tabContent += 		"<tr class='SingleTableTR'>";
		tabContent +=			"<td class='SingleTableName'>Einzeltermin:</td>";
		tabContent +=			"<td class='SingleTableData'>";
		tabContent +=				"<input type='hidden' id='ProbsID' />";
		tabContent +=			"</td>";
		tabContent += 		"</tr>";
		tabContent += 		"<tr class='SingleTableTR'>";
		tabContent += 			"<td class='SingleTableName'>Problembereich:</td>";
		tabContent +=			"<td class='SingleTableData'>";
		tabContent +=				"<input type='hidden' id='ProbsBereich' />";
		tabContent +=			"</td>";
		tabContent += 		"</tr>";
		tabContent += 		"<tr class='SingleTableTR'>";
		tabContent += 			"<td class='SingleTableName'>Zeitpunkt des Fehlers:</td>";
		tabContent +=			"<td class='SingleTableData'>";
		tabContent +=				"<input type='hidden' id='ProbsHour' />:";
		tabContent +=				"<input type='hidden' id='ProbsMin' /> Uhr";
		tabContent +=			"</td>";
		tabContent += 		"</tr>";
		tabContent += 		"<tr class='SingleTableTR'>";
		tabContent += 			"<td class='SingleTableName'>Problembeschreibung:</td>";
		tabContent +=			"<td class='SingleTableData'>";
		tabContent +=				"<textarea id='ProbsBeschreibung' class='ProbsComment' placeholder='Problembeschreibung...'>"+BeschreibungComm+"</textarea>";
		tabContent +=			"</td>";
		tabContent += 		"</tr>";
		tabContent += 		"<tr class='SingleTableTR'>";
		tabContent += 			"<td class='SingleTableName'>Status Quo:</td>";
		tabContent +=			"<td class='SingleTableData'>";
		tabContent +=				"<textarea id='ProbsStatQuo' class='ProbsComment' placeholder='Status Quo...'>"+StatComm+"</textarea>";
		tabContent +=			"</td>";
		tabContent += 		"</tr>";
		tabContent += 		"<tr class='SingleTableTR'>";
		tabContent += 			"<td class='SingleTableName'>Erledigt:</td>";
		tabContent +=			"<td class='SingleTableData'>";
		tabContent +=				"<input type='Checkbox' id='ProbsErledigt' "+Erledigt+"/>";
		tabContent +=			"</td>";
		tabContent += 		"</tr>";
		tabContent += 	"</table>";
		tabContent += "</div>";

		var parentBlock = document.getElementById('ProbsTab');
        if(parentBlock != null) {
            var div = document.createElement("div");
            div.id = elementName+"Tab";
            div.className = "SingleTabBottom";
            div.innerHTML = tabContent;
            parentBlock.appendChild(div);           
			var IDsNumBlockArr = new Array();
			for(var bnmLength = 0; bnmLength < IDsNumArray.length; bnmLength++){
				IDsNumBlockArr[bnmLength] = formatNumber(SDValues[bnmLength].startTime.getHours())+":"+formatNumber(SDValues[bnmLength].startTime.getMinutes())+" Uhr (id: "+IDsNumArray[bnmLength]+")";
			}
		
            hourMenu.createDropDown_NE("ProbsHour", "hh", formatNumber(ProbVal[currentID].Zeitpunkt.getHours()), "off", "2", false); 
            minuteMenu.createDropDown_NE("ProbsMin",	"mm", formatNumber(ProbVal[currentID].Zeitpunkt.getMinutes()), "off", "2", false); 
            IDsNumBlockArr.createDropDown_NE("ProbsID",	"keine Auswahl/Eingabe", ProbVal[currentID].einzeltermin_id, "22em", null ,true); 
            ProbBereichArray.createDropDown_NE("ProbsBereich",	"keine Auswahl/Eingabe", ProbVal[currentID].Problembereich, "22em", null ,false); 

            $("#ProbsID").on("change", function() {
            	ProbVal[currentID].einzeltermin_id = $(this).select2("val");
            });
            $("#ProbsBereich").on("change", function() {
            	ProbVal[currentID].Problembereich = $(this).select2("val");
            });
            $("#ProbsHour").on("change", function() {
                var min = $("#ProbsMin").select2("val");
            	var hour = $(this).select2("val");
            	ProbVal[currentID].Zeitpunkt.setHours(hour);
            	ProbVal[currentID].Zeitpunkt.setMinutes(min);
            });
            $("#ProbsMin").on("change", function() {
                var min = $(this).select2("val");
            	var hour = $("#ProbsHour").select2("val");
            	ProbVal[currentID].Zeitpunkt.setHours(hour);
            	ProbVal[currentID].Zeitpunkt.setMinutes(min);
            });
            $("#ProbsBeschreibung").on("change", function() {
            	var MyString = $(this).val();
            	if(!MyString.match(/\S/)) {
            		ProbVal[currentID].Problembeschreibung = null;
            	} else {
            		ProbVal[currentID].Problembeschreibung =  MyString;
            	}
            });
            $("#ProbsStatQuo").on("change", function() {
            	var MyString = $(this).val();
            	if(!MyString.match(/\S/)) {
            		ProbVal[currentID].StatQuo =  null;
            	} else {
            		ProbVal[currentID].StatQuo =  MyString;
            	}            
            });
            
            $("#ProbsErledigt").on("change", function() {
            	if(ProbVal[currentID].erledigt == "true") ProbVal[currentID].erledigt = "false";
            	else ProbVal[currentID].erledigt = "true";
            });

    	}
	}
	//--------------------------------------------------------------------------//
	if(TabName == 'EinTer') {
    	if((SDValues.length-1) < currentID) {
   			SDValues[currentID] = {	
	    					termin_id: BlockArray.id+(formatNumber(currentID+1)), 
	    					klausur_name: BlockArray.name, 
	    					startTime: new Date(BlockArray.startTime),
	    					endTime: new Date(BlockArray.startTime.getFullYear(),BlockArray.startTime.getMonth(),BlockArray.startTime.getDate(),BlockArray.startTime.getHours()+1),
	    					betreuerSCL: null, 
	    					betreuerSCL2:null, 
	    					aufsicht:null,
	    					aufsicht2:null,
	    					teilnehmer:0 };
   			SDValues[currentID].startTime.setHours(SDValues[currentID].startTime.getHours());
   			SDValues[currentID].startTime.setMinutes(0);
   			SDValues[currentID].endTime.setHours(SDValues[currentID].endTime.getHours()+1);
   			SDValues[currentID].endTime.setMinutes(0);
   		}
		
		//----------------------------------------------------------------------------------			
		
        tabContent = "<div id='SingleContent"+currentID+"' class='SingelTabContent'><br>";  

        
        tabContent += "<table id='SingleTable"+currentID+"' class='SingleTable'>";
        /*tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Klausur ID:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<div class='SingleID'> "+SDValues[currentID].klausur_id+"</div>";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";*/
        tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Einzeltermin ID:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<div class='SingleID'> "+BlockArray.id+(formatNumber(currentID+1))+"</div>";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";
        /*tabContent += 	"<tr>";
        tabContent +=		"<td class='SingleTableName'>Dozent/in:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<input type='hidden'id='SingleDozent' name='SingleDozent"+currentID+"'/>";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";*/
        /*tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Datum:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<input type='text' name='SingleDate"+currentID+"' value='"	+formatNumber(SDValues[currentID].StartZeit.getDate())+"."
        																					+formatNumber(SDValues[currentID].StartZeit.getMonth()+1)+"."
        																					+formatNumber(SDValues[currentID].StartZeit.getFullYear())+"' id='SingleDate'/>";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";*/
        tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Startzeit:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<input type='hidden' name='StartTimeHour"+currentID+"' id='StartTimeHour' />:";
        tabContent +=			"<input type='hidden' name='StartTimeMin"+currentID+"' id='StartTimeMin' /> Uhr";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";
        tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Endzeit:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<input type='hidden' name='EndTimeHour"+currentID+"' id='EndTimeHour' />:";
        tabContent +=			"<input type='hidden' name='EndTimeMin"+currentID+"' id='EndTimeMin' /> Uhr";
        tabContent +=			"<span class='SingleError' id='SingleError' ></span>";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";
        tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Betreuer SCL:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<input type='hidden' name='SCLBetreuer"+currentID+"' id='SCLBetreuer' />";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";
        tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Betreuer SCL 2:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<input type='hidden' name='SCLBetreuer2"+currentID+"' id='SCLBetreuer2' />";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";
        tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Klausuraufsicht:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<input type='hidden' name='Klausuraufsicht"+currentID+"' id='Klausuraufsicht' />";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";
        tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Klausuraufsicht 2:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<input type='hidden' name='Klausuraufsicht2"+currentID+"' id='Klausuraufsicht2' />";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";
        tabContent += 	"<tr class='SingleTableTR'>";
        tabContent +=		"<td class='SingleTableName'>Anzahl Prüflinge:</td>";
        tabContent +=		"<td class='SingleTableData'>";
        tabContent +=			"<input type='number' onchange=\"changeSingleTeil(this.value, "+currentID+")\" name='AnzahlSingleTeil"+currentID+"' value='"+SDValues[currentID].teilnehmer+"' id='AnzahlSingleTeil' class='SingleNumbField' />";
        tabContent +=		"</td>";
        tabContent += 	"</tr>";
        
        tabContent += "</table>";                
        tabContent += "</div>"; 
        //------------------------------------------------------------------------------------ 
         
        var parentBlock = document.getElementById('EinTerTab');
        if(parentBlock != null) {
            var div = document.createElement("div");
            div.id = elementName+"Tab";
            div.className = "SingleTabBottom";
            div.innerHTML = tabContent;
            parentBlock.appendChild(div);
      

       		/*if(SDValues[currentID].endTime <=  SDValues[currentID].startTime) {
       			SDValues[currentID].endTime.setHours(SDValues[currentID].startTime.getHours()+1);
       			
			 	var span = document.getElementById("Error"+currentID);
				if(span != null) span.parentNode.removeChild(span);
               	var parentDiv = document.getElementById('SingleError');
               	var span = document.createElement("div");
               	span.id = "Error"+currentID;
               	span.innerHTML = "Die Zeiteinstellungen sind inkorrekt!";
               	parentDiv.appendChild(span);
            } else {
				var span = document.getElementById("Error"+currentID);
				if(span != null) span.parentNode.removeChild(span);
            }*/
       		
            createDatePicker("SingleDate");
            hourMenu.createDropDown_NE("StartTimeHour", "hh", formatNumber(SDValues[currentID].startTime.getHours()), "off", "2", false); 
            minuteMenu.createDropDown_NE("StartTimeMin",	"mm", formatNumber(SDValues[currentID].startTime.getMinutes()), "off", "2", false); 
            hourMenu.createDropDown_NE("EndTimeHour", "hh", formatNumber(SDValues[currentID].endTime.getHours()), "off", "2", false); 
            minuteMenu.createDropDown_NE("EndTimeMin",	"mm", formatNumber(SDValues[currentID].endTime.getMinutes()), "off", "2", false); 
            sclTeam.createDropDown("SCLBetreuer",	"keine Auswahl/Eingabe", SDValues[currentID].betreuerSCL, "22em", null ,true); 
            sclTeam.createDropDown("SCLBetreuer2",	"keine Auswahl/Eingabe", SDValues[currentID].betreuerSCL2, "22em", null ,true); 
            Autoren.createDropDown("Klausuraufsicht", "keine Auswahl/Eingabe", SDValues[currentID].aufsicht, "22em", null ,true);
            Autoren.createDropDown("Klausuraufsicht2", "keine Auswahl/Eingabe", SDValues[currentID].aufsicht2, "22em", null ,true);

            $("#StartTimeHour").on("change", function() {
                var min = $("#StartTimeMin").select2("val");
            	var hour = $(this).select2("val");
                SDValues[currentID].startTime.setHours(hour);
                SDValues[currentID].startTime.setMinutes(min);
               // alert(SDValues[currentID].startTime+" <= "+BlockArray.startTime);
           		if(SDValues[currentID].endTime <=  SDValues[currentID].startTime) {
           			SDValues[currentID].endTime.setHours(SDValues[currentID].startTime.getHours()+1);
           			var span = document.getElementById("s2id_EndTimeHour")
           			span.parentNode.removeChild(span);
           			hourMenu.createDropDown_NE("EndTimeHour", "hh", formatNumber(SDValues[currentID].endTime.getHours()), "off", "2", false); 
           			var span = document.getElementById("Error"+currentID);
					if(span != null) span.parentNode.removeChild(span);
                } 
                
            });

            /* FUNKTION CHECK_TIME erzeugen und bei änderung der Zeit die Funktion ausführen*/
            $("#StartTimeMin").on("change", function() {
                var hour = $("#StartTimeHour").select2("val");
            	var min = $(this).select2("val");
                SDValues[currentID].startTime.setHours(hour);
                SDValues[currentID].startTime.setMinutes(min);
                
           		if(SDValues[currentID].endTime <=  SDValues[currentID].startTime || SDValues[currentID].startTime <= BlockArray.startTime || SDValues[currentID].endTime >= BlockArray.endTime) {
					var span = document.getElementById("Error"+currentID);
					if(span != null) span.parentNode.removeChild(span);
                   	var parentDiv = document.getElementById('SingleError');
                   	var span = document.createElement("div");
                   	span.id = "Error"+currentID;
                   	span.innerHTML = "Ungültige Eingabe!";
                   	parentDiv.appendChild(span);
                } else {
					var span = document.getElementById("Error"+currentID);
					if(span != null) span.parentNode.removeChild(span);
                }  
                
            });
            $("#EndTimeHour").on("change", function() {
                var min = $("#EndTimeMin").select2("val");
            	var hour = $(this).select2("val");
                SDValues[currentID].endTime.setHours(hour);
                SDValues[currentID].endTime.setMinutes(min);
                //Check Correct Time
           		if(SDValues[currentID].endTime <=  SDValues[currentID].startTime || SDValues[currentID].startTime <= BlockArray.startTime || SDValues[currentID].endTime >= BlockArray.endTime) {
					var span = document.getElementById("Error"+currentID);
					if(span != null) span.parentNode.removeChild(span);
                   	var parentDiv = document.getElementById('SingleError');
                   	var span = document.createElement("div");
                   	span.id = "Error"+currentID;
                   	span.innerHTML = "Ungültige Eingabe!";
                   	parentDiv.appendChild(span);
                } else {
					var span = document.getElementById("Error"+currentID);
					if(span != null) span.parentNode.removeChild(span);
                }  
            });
            $("#EndTimeMin").on("change", function() {
                var hour = $("#EndTimeHour").select2("val");
            	var min = $(this).select2("val");
                SDValues[currentID].endTime.setHours(hour);
                SDValues[currentID].endTime.setMinutes(min);
                //Check Correct Time
           		if(SDValues[currentID].endTime <=  SDValues[currentID].startTime || SDValues[currentID].startTime <= BlockArray.startTime || SDValues[currentID].endTime >= BlockArray.endTime) {
 				 	var span = document.getElementById("Error"+currentID);
					if(span != null) span.parentNode.removeChild(span);
                   	var parentDiv = document.getElementById('SingleError');
                   	var span = document.createElement("div");
                   	span.id = "Error"+currentID;
                   	span.innerHTML = "Ungültige Eingabe!";
                   	parentDiv.appendChild(span);
                } else {
					var span = document.getElementById("Error"+currentID);
					if(span != null) span.parentNode.removeChild(span);
                }
            });
            $("#SCLBetreuer").on("change", function() {
                SDValues[currentID].betreuerSCL = $(this).select2("val");
            });
            $("#SCLBetreuer2").on("change", function() {
                SDValues[currentID].betreuerSCL2 = $(this).select2("val");
            });
            $("#Klausuraufsicht").on("change", function() {
                SDValues[currentID].aufsicht = $(this).select2("val");
            });
            $("#Klausuraufsicht2").on("change", function() {
                SDValues[currentID].aufsicht2 = $(this).select2("val");
            });
		}
	}
}
    
function changeTab(elementName) {
	var IDs = ["TCList", "QMan", "EinTer", "Probs"];
	var currentID = IDs.indexOf(elementName);
	
	for(var i = IDs.length-1; i >= 0; i--) {
		if(i != currentID) {
			var elementTab = document.getElementById(IDs[i]+"Tab");
			if(elementTab != null) elementTab.parentNode.removeChild(elementTab);
			
			var element = document.getElementById(IDs[i]);
			element.style.backgroundColor = "#CCCCCC";
			element.style.height = "2.3em";
			
		}else {
			var elementTab = document.getElementById(IDs[i]+"Tab");
			if(elementTab != null) elementTab.parentNode.removeChild(elementTab);
			
			var element = document.getElementById(IDs[i]);
			element.style.backgroundColor = "#FFFFFF";
			element.style.height = "2.4em";
		}
	}
	// HTML CODE
	if(currentID == 0) {			
		tabContent  = "<div id='terminMain'>";
		tabContent += 	"<table class='terminTable'>";
		for(var numberOfElements = 0; numberOfElements <= pickerDate.length; numberOfElements++){
			if(numberOfElements < 15) { 
				if(pickerDate[numberOfElements].check == "true" || pickerDate[numberOfElements].check == "on") var checkedString = "checked";
				else var checkedString = "";
				var datePickerConv = new Date(pickerDate[numberOfElements].date*1000);
				tabContent +=	"<tr class='terminTable_tr'>";
				tabContent += 		"<td class='tbl_name'>"+TerminText[numberOfElements]+"</td>";
				tabContent +=		"<td class='tbl_date'><input type='text' class='picker' name='picker"+numberOfElements+"' value='"+formatNumber(datePickerConv.getDate())+"."+formatNumber(datePickerConv.getMonth()+1)+"."+datePickerConv.getFullYear()+"' id='picker"+numberOfElements+"'/></td>";
				tabContent +=		"<td><input type='Checkbox' name='check"+numberOfElements+"' id='check"+numberOfElements+"' onclick=\"checkboxAction("+numberOfElements+")\" "+checkedString+"/></td>";
				tabContent +=	"</tr>";
			}
			else if(numberOfElements == 15) { //Klausur Termin
				var datePickerConv = BlockArray.startTime;
				tabContent +=	"<tr class='terminTable_tr'>";
				tabContent += 		"<td class='tbl_name'>"+TerminText[numberOfElements]+"</td>";
				tabContent +=		"<td class='tbl_date'><input type='text' class='picker' name='picker"+numberOfElements+"' value='"+formatNumber(datePickerConv.getDate())+"."+formatNumber(datePickerConv.getMonth()+1)+"."+datePickerConv.getFullYear()+"' id='picker"+numberOfElements+"'/></td>";
				tabContent +=	"</tr>";
			} else if(numberOfElements > 15) {
				if(pickerDate[numberOfElements-1].check == "true" || pickerDate[numberOfElements-1].check == "on") var checkedString = "checked";
				else var checkedString = "";
				var datePickerConv = new Date(pickerDate[numberOfElements-1].date*1000);
				tabContent +=	"<tr class='terminTable_tr'>";
				tabContent += 		"<td class='tbl_name'>"+TerminText[numberOfElements]+"</td>";
				tabContent +=		"<td class='tbl_date'><input type='text' class='picker' name='picker"+numberOfElements+"' value='"+formatNumber(datePickerConv.getDate())+"."+formatNumber(datePickerConv.getMonth()+1)+"."+datePickerConv.getFullYear()+"' id='picker"+numberOfElements+"'/></td>";
				tabContent +=		"<td><input type='Checkbox' name='check"+numberOfElements+"' id='check"+numberOfElements+"' onclick=\"checkboxAction("+numberOfElements+")\" "+checkedString+"/></td>";
				tabContent +=	"</tr>";
			}
		}
		tabContent += 	"</table>";
		tabContent += "</div>";
	}
	if(currentID == 1) {
		tabContent  = "<div id='QualitätMain'>";
		tabContent += "<div id='CPQS_head'>Checkpunkte bei der Qualitätssicherung</div>";
		tabContent += 	"<table class='qTable'>";
		for(var numberOfElementsCPQS = 0; numberOfElementsCPQS < CPQStext.length; numberOfElementsCPQS++){
			if(CheckedCPQS[numberOfElementsCPQS] == "true") var checkedStringCPQS = "checked";
			else var checkedStringCPQS = "";
			tabContent += 		"<tr>";
			tabContent += 			"<td><input type='Checkbox' name='checkCPQS"+numberOfElementsCPQS+"' id='checkCPQS"+numberOfElementsCPQS+"' onclick=\"checkboxActionQM(1, "+numberOfElementsCPQS+")\" "+checkedStringCPQS+" /></td>";
			tabContent += 			"<td>"+CPQStext[numberOfElementsCPQS]+"</td>";
			tabContent +=		"</tr>";
		}
		tabContent += 	"</table>";
		tabContent += "<div id='CPQS_head'>Checkpunkte am Klausurtag</div>";
		tabContent += 	"<table class='qTable'>";
		for(var numberOfElementsCPKT = 0; numberOfElementsCPKT < CPKTtext.length; numberOfElementsCPKT++){
			if(CheckedCPKT[numberOfElementsCPKT] == "true") var checkedStringCPKT = "checked";
			else var checkedStringCPKT = "";
			tabContent += 		"<tr>";
			tabContent += 			"<td><input type='Checkbox' name='checkCPKT"+numberOfElementsCPKT+"' id='checkCPKT"+numberOfElementsCPKT+"' onclick=\"checkboxActionQM(2, "+numberOfElementsCPKT+")\" "+checkedStringCPKT+" /></td>";
			tabContent += 			"<td>"+CPKTtext[numberOfElementsCPKT]+"</td>";	
			tabContent +=		"</tr>";
		}
		tabContent += 	"</table>";
		tabContent += "<div id='CPQS_head'>Checkpunkte direkt nach der Klausur</div>";
		tabContent += 	"<table class='qTable'>";
		for(var numberOfElementsCPNK = 0; numberOfElementsCPNK < CPNKtext.length; numberOfElementsCPNK++){
			if(CheckedCPNK[numberOfElementsCPNK] == "true") var checkedStringCPNK = "checked";
			else var checkedStringCPNK = "";
			tabContent += 		"<tr>";
			tabContent += 			"<td><input type='Checkbox' name='checkCPNK"+numberOfElementsCPNK+"' id='checkCPNK"+numberOfElementsCPNK+"' onclick=\"checkboxActionQM(3, "+numberOfElementsCPNK+")\" "+checkedStringCPNK+" /></td>";
			tabContent += 			"<td>"+CPNKtext[numberOfElementsCPNK]+"</td>";	
			tabContent +=		"</tr>";
		}
		tabContent += 	"</table>";
		//tabContent += 	"</br><hr noshade width='99%' size='1' align='left'>";
		//tabContent += 	"<textarea name='comment_QS' id='comment_QS' placeholder='Kommentar zum Qualitätsmanagement...'></textarea>";
		tabContent += "</div>";
	}
             /*----------------------------------------------------------------------------*/
           
	if(currentID == 2) {        
        tabContent  = "<div id='SingleTabsBox'>";                        
        for(var numberOfSingleTabs = 1; numberOfSingleTabs <= (numberOfSingleDates+1); numberOfSingleTabs++){
        	if(numberOfSingleTabs == (numberOfSingleDates+1) && numberOfSingleDates < 9){
            	tabContent +=   "<a href='javascript:void[0]'><div onclick=\"createSingleTab('EinTer')\" id='SingleTabEinTer"+numberOfSingleTabs+"' class='SingleTabPlus' >";
                tabContent +=       "<span style='font-size: 12px; position:relative; top: 0.3em; left: 0.7em;'><strong>+</strong></span>";                    
                tabContent +=   "</div></a>";
            } else  {
            	if(numberOfSingleTabs != (numberOfSingleDates+1)) {
	            	var tabWidth = (80/numberOfSingleDates);
	                if(numberOfSingleDates<= 4) var tabText = "Termin "+ numberOfSingleTabs;
	                else var tabText = "T"+ numberOfSingleTabs;
	                                
	                if(tabWidth > 35) tabWidth = 35;
	                if(tabWidth < 9.4) tabWidth = 9.4;
									
	                tabContent +=   "<a href='javascript:void[0]'><div onclick=\"changeSingleTab('SingleTabEinTer"+numberOfSingleTabs+"',"+(numberOfSingleDates-1)+", 'EinTer')\" id='SingleTabEinTer"+numberOfSingleTabs+"' class='SingleTabs' style='width: "+tabWidth+"%;'>"; 
					tabContent += 		"<div id='SingleTabContEinTer"+numberOfSingleTabs+"' style='font-size: 12px; position: relative; top: 0.5em; left: 0.5em; margin-right: 1em;'>&nbsp;";
	                tabContent +=       	"<div id='SingleTabEinTer"+numberOfSingleTabs+"Text' class='SingleTabsActive' ><strong>"+tabText+"</strong></div>";
	                if(numberOfSingleTabs > 1 && numberOfSingleTabs == numberOfSingleDates) 
	                	tabContent += 		"<a href='javascript:void[0]'><div id='closeTabEinTer"+numberOfSingleTabs+"' class='closeTabNotActive' >&nbsp;</div></a>"; 
	                tabContent += 		"</div>";
	                tabContent +=   "</div></a>";
                }
           	}
       	}
        tabContent += "</div>";
	}
            /*----------------------------------------------------------------------------*/
	if(currentID == 3) {
        tabContent  = "<div id='SingleTabsBox'>";                        
        for(var numberOfSingleTabs = 1; numberOfSingleTabs <= (numberOfProbs+1); numberOfSingleTabs++){
        	if(numberOfSingleTabs == (numberOfProbs+1) && numberOfProbs < 9){
            	tabContent +=   "<a href='javascript:void[0]'><div onclick=\"createSingleTab('Probs')\" id='SingleTabProbs"+numberOfSingleTabs+"' class='SingleTabPlus' >";
                tabContent +=       "<span style='font-size: 12px; position:relative; top: 0.3em; left: 0.7em;'><strong>+</strong></span>";                    
                tabContent +=   "</div></a>";
            } else  {
            	if(numberOfSingleTabs != (numberOfProbs+1)) {
	            	var tabWidth = (80/numberOfProbs);
	                if(numberOfProbs<= 4) var tabText = "Problem "+ numberOfSingleTabs;
	                else var tabText = "P"+ numberOfSingleTabs;
	                                
	                if(tabWidth > 35) tabWidth = 35;
	                if(tabWidth < 9.4) tabWidth = 9.4;

	                tabContent +=   "<a href='javascript:void[0]'><div onclick=\"changeSingleTab('SingleTabProbs"+numberOfSingleTabs+"',"+(numberOfProbs-1)+", 'Probs')\" id='SingleTabProbs"+numberOfSingleTabs+"' class='SingleTabs' style='width:"+tabWidth+"%;'>"; 
					tabContent += 		"<div id='SingleTabContProbs"+numberOfSingleTabs+"' style='font-size: 12px; position: relative; top: 0.5em; left: 0.5em; margin-right: 1em;'>&nbsp;";
	                tabContent +=       	"<div id='SingleTabProbs"+numberOfSingleTabs+"Text' class='SingleTabsActive' ><strong>"+tabText+"</strong></div>";
	                if(numberOfSingleTabs > 1 && numberOfSingleTabs == numberOfProbs) 
	                	tabContent += 		"<a href='javascript:void[0]'><div id='closeTabProbs"+numberOfSingleTabs+"' class='closeTabNotActive' >&nbsp;</div></a>"; 
	                tabContent += 		"</div>";
	                tabContent +=   "</div></a>";
                }
           	}
       	}
        tabContent += "</div>";
	}
	
	var parentBlock = document.getElementById('mainWin');
	var div = document.createElement("div")
	div.id = elementName+"Tab";
	div.innerHTML = tabContent;
	parentBlock.appendChild(div);
	
	if(currentID == 0) {
		for(var numb = 0; numb <= pickerDate.length; numb++){
			if(numb != 15) {
				if(!checkboxAction(numb)) { 
					var objectRef = document.getElementById("picker"+numb);
					var checkRef = document.getElementById("check"+numb);
					crDeadline(objectRef);
					createDatePicker("picker"+numb,numb);
				}
			} else {
				var objectRef = document.getElementById("picker"+numb);
				objectRef.style.backgroundColor = "#f5f5f5";
				objectRef.style.color = "#000000";
				objectRef.disabled = "true";
			}
		}
		//document.getElementById("picker15").setAttribute("style","background-color: #ffffff");
	}
	if(currentID == 1) {

	}
	if(currentID == 2) {
		changeSingleTab('SingleTabEinTer'+etPosition,numberOfSingleDates-1, 'EinTer');
		for(var TabCount = numberOfSingleDates; TabCount > 0; TabCount--) {
			if($("#closeTabEinTer"+TabCount)) {
				$("#closeTabEinTer"+TabCount).click(function(ev) {
					closeSingleTab('EinTer');
        	    	ev.stopPropagation();
        		});
			}
		}
	}
	if(currentID == 3) {
		changeSingleTab('SingleTabProbs'+probPosition,numberOfProbs-1, 'Probs');
		for(var TabCount = numberOfProbs; TabCount > 0; TabCount--) {
			if($("#closeTabProbs"+TabCount)){
				$("#closeTabProbs"+TabCount).click(function(ev) {
					closeSingleTab('Probs');
        	    	ev.stopPropagation();
        		});
			}
		}
	}
}

var info_box = "";
info_box +=			"<div id='tabs'>";
info_box +=				"<a href='javascript:void[0]'><div id='TCList' 	onclick=\"changeTab('TCList')\"><div class='TCList_text'>Termincheckliste</div></div></a>";
info_box +=				"<a href='javascript:void[0]'><div id='QMan' 	onclick=\"changeTab('QMan')\"><div class='QMan_text'>Qualitätsmanagement</div></div></a>";
info_box +=				"<a href='javascript:void[0]'><div id='EinTer' 	onclick=\"changeTab('EinTer')\"><div class='EinTer_text'>Einzeltermin</div></div></a>";
info_box +=				"<a href='javascript:void[0]'><div id='Probs' 	onclick=\"changeTab('Probs')\"><div class='Probs_text'>Probleme</div></div></a>";
info_box +=				"<div id='space'>&nbsp;</div>";
info_box +=			"</div>";
info_box +=			"<div id='mainWin'>";
info_box +=			"</div>";
var existBlock = document.getElementById('mainBlock');
var div = document.createElement("div");
div.id = "rightBox";
div.innerHTML = info_box;
existBlock.appendChild(div);
changeTab('TCList');
//--------------------------------------------------------------