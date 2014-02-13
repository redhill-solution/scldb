//save Event Function
function submitForm(invokeParamVal) { 
	if(invokeParamVal == 'ctrl_delete') {
		if(confirm('Diesen Autor wirklich löschen?')){
			var element = document.getElementById("submitParam"); 
			element.name = invokeParamVal;

			var form = document.getElementById("save");
			form.submit();
		} 
	} else if(confirm('Daten speichern?')){
		var element = document.getElementById("submitParam"); 
		element.name = invokeParamVal;

		var form = document.getElementById("save");
		form.submit();
	}

}

// Create DropDown Function
Array.prototype.createDropDown = function(id, placeholderText, selectedVal, width, maxLength, clearAllowed) {

	var array = new Array();
	if(this.length > 0) {
	    $.each(this, function(key, value) {
	        array[key] = new Array();
			array[key]["id"] = value; 
			if(value < 10 ) array[key]["text"] = "0"+value;
			else array[key]["text"] = value;
	    });
	} else {
		array = "teset";
	}
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
	if(this.length > 0) {
	    $.each(this, function(key, value) {
	        array[key] = new Array();
			array[key]["id"] = value; 
			if(value < 10 ) array[key]["text"] = "0"+value;
			else array[key]["text"] = value;
	    });
	} else {
		array = "teset";
	}
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

        	}
        });
    });
}
function bool2check(bool) {
	if(bool == 'true') {
		var checked = "checked";
	} else {
		var checked = "";
	}
	return checked;
}
function sendLogin() {
	var text = "Sehr geehrt"+(autor.anrede == "Herr" ? "er Herr " : "e Frau ")+autor.nachname+",\n\n";
	text += "wir senden Ihnen hiermit Ihre Zugangsdaten zum Educampus Autorensystem.\n\n";
	text += "\tBenutzername: PLATZHALTER\n";
	text += "\tPasswort: PLATZHALTER\n";
	var link = "mailto:"+autor.email+"?"
	            // + "?cc=myCCaddress@example.com"
	             + "&subject=" + encodeURIComponent("Zugangsdaten zum Educampus AutorenSystem")
	             //+ "&body=" + escape(document.getElementById('myText').value)
	             + "&body=" + encodeURIComponent(text)
	    ;

	    window.open(link, '_blank');
}

function createDateOverview() {
	div = document.getElementById('testFormWindow');
	gray = document.getElementById('grayOut');

	if(klausuren == "null" || klausuren == null) {
		alert("Keine anstehenden klausuren des Autors gefunden!");
	} else if(div == null && gray == null) {
		var form =      "<div id='WinBorder'>";
		form +=          "<span id='WinHeadText'>Anstehende Klausuren des Autors</span>";
		form +=      "</div>";
		form += "<table id='testTable'>"; 
		form += "<tr>";
		form += 	"<td id='testDatum'>Datum</td>";
		form += 	"<td id='testStart'>Startzeit</td>";
		form += 	"<td id='testEnde'>Endzeit</td>";
		form += 	"<td id='testName'>Bezeichnung Klausur</td>";
		form += "</tr>";
		for(var i = 0; i < klausuren.length; i++) {
			var datum = new Date(klausuren[i].startTime * 1000);
			var endDatum = new Date(klausuren[i].endTime * 1000);
			var startTime = (datum.getHours() > 9 ? datum.getHours() : "0"+datum.getHours())+":"+(datum.getMinutes() > 9 ? datum.getMinutes() : "0"+datum.getMinutes());
			var endTime = (endDatum.getHours() > 9 ? endDatum.getHours() : "0"+endDatum.getHours())+":"+(endDatum.getMinutes() > 9 ? endDatum.getMinutes() : "0"+endDatum.getMinutes());
			datum = (datum.getDate() > 9 ? datum.getDate() : "0"+datum.getDate())+"."+(datum.getMonth()+1 > 9 ? datum.getMonth()+1 : "0"+(datum.getMonth()+1))+"."+datum.getFullYear();
			form += "<tr class='"+(i % 2 ? "trLight2" : "trDark2")+"' id='"+i+"'>";
			form += 	"<td>"+datum+"</td>";
			form += 	"<td>"+startTime+"</td>";
			form += 	"<td>"+endTime+"</td>";
			form += 	"<td>"+klausuren[i].name+"</td>";
			form += "</tr>";
		}
		form += "<tr class='trLast'>";
		form += 	"<td>&nbsp;</td>";
		form += 	"<td></td>";
		form += "</tr>";
		form += "</table>";
		form += "<div id='exitForm'><input type='button' value='Schließen' onclick='closeWindow()'/></div>";

		var parentBlock = document.getElementById('mainBlock');
	    if(parentBlock != null) {
	    	var gray = document.createElement("div");
	    	gray.id = "grayOut";
	    	//alert($(document).height());
	    	gray.style.cssText = "height: "+$(document).height()+"px;";
	    	document.body.appendChild(gray);
	        var div = document.createElement("div");
	        div.id = "testFormWindow";
	        div.innerHTML = form;
	        parentBlock.appendChild(div); 

	        $("#grayOut").click(function() {
	        	closeWindow();
	        });

            $(".trDark2").click(function() {
        		window.location.href = "../calendar/edit.php?id="+klausuren[parseFloat(this.id)].id+"&location=autoren&authID="+autor.id;
        	});
        	$(".trLight2").click(function() {
        		window.location.href = "../calendar/edit.php?id="+klausuren[parseFloat(this.id)].id+"&location=autoren&authID="+autor.id;
        	});
	    }
	}
}
function closeWindow() {
	div = document.getElementById('testFormWindow');
	gray = document.getElementById('grayOut');
	div.parentNode.removeChild(div);
	gray.parentNode.removeChild(gray);
}

if(document.getElementById("info_box") == null) {
	var anrede = new Array();
	var titel = new Array();
	anrede = ["Herr", "Frau"];
	titel = ["Dr.", "Priv.Doz.", "Prof."];

	anrede.createDropDown("anrede", "keine Auswahl/Eingabe", autor.anrede, "299px", null ,true); 
	//autorenNachname.createDropDown("nachname", "keine Auswahl/Eingabe", autor.nachname, "150px", null ,true); 
	//autorenVorname.createDropDown("vorname", "keine Auswahl/Eingabe", autor.vorname, "150px", null ,true); 
	fachbereiche.createDropDown_NE("fb", "keine Auswahl/Eingabe", autor.fb, "299px", null ,false); 
	//lizenzen.createDropDown("lizenz", "keine Auswahl/Eingabe", autor.lizenz, "150px", null, true);
	titel.createDropDown("titel", "keine Auswahl/Eingabe", autor.titel, "299px", null, true);
	lizenzArray.createDropDown_NE("lizenz", "keine Auswahl/Eingabe", autor.lizenz, "299px", null, true);
	createDatePickerDate("winAuthSince");

	document.write("<div align='center' style='height: 100%;' ><div id='container'>");
	document.write("<div id='info_box'>");
	document.write(		"<div id='toolBox'>");
	//document.write(			"<div id='backArrowPos'><a href='javascript:void[0]' onclick='window.history.back()' title='Zurück'><div id='backArrow'>&nbsp;</div></a></div>");
	document.write(			"<div id='backArrowPos'><a href='./list.php' title='Zurück'><div id='backArrow'>&nbsp;</div></a></div>");
	document.write(			"<div id='saveIconPos'><a name='ctrl_save' href='javascript:void[0]' onClick='submitForm(\"ctrl_save\")' title='Änderungen Speichern'><div id='saveIcon'>&nbsp;</div></a></div>");
	document.write(			"<div id='deleteIconPos'><a name='ctrl_delete' href='javascript:void[0]' onClick='submitForm(\"ctrl_delete\")' title='Termin löschen'><div id='deleteIcon'>&nbsp;</div></a></div>");
	document.write(			"<div id='horLine1'></div>");
	if(numOfKlausur != null) document.write("<a href='javascript:void[0]' onClick='createDateOverview()' title='Klausuren des Autors'><div id='klausurenPos'><div id='klausSpan'>Klausuren des Autors</div></div></a><div id='numKlaus'>"+numOfKlausur+"</div>");
	document.write(		"</div>"); // toolBox
	document.write(		"<div id='mainBlock' align='center'>");
	document.write(		"<form id='save' method='post' action='' >");
	document.write(			"<table id='authForm' >");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>ID:</td>");
	document.write(					"<td>"+autor.id+"<input type='hidden' name='id' value='"+autor.id+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>Anrede:</td>");
	document.write(					"<td><input type='hidden' id='anrede' name='anrede' /></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>Nachname:</td>");
	document.write(					"<td><input type='text' id='nachname' class='textInput' name='nachname' value='"+(autor.nachname == null ? "" : autor.nachname)+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>Vorname:</td>");
	document.write(					"<td><input type='text' id='vorname' class='textInput' name='vorname' value='"+(autor.vorname == null ? "" : autor.vorname)+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>Titel:</td>");
	document.write(					"<td><input type='hidden' id='titel' name='titel'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>E-Mail:</td>");
	document.write(					"<td><input type='email' id='email' class='textInput' name='email' value='"+(autor.email == null ? "" : autor.email)+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>Telefon:</td>");
	document.write(					"<td><input type='tel' id='telefon' class='textInput' name='telefon' value='"+(autor.telefon == null ? "" : autor.telefon)+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>Interessent:</td>");
	document.write(					"<td><input type='checkbox' name='interessent' "+bool2check(autor.interessent)+"></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>Nutzt E-Klausuren:</td>");
	document.write(					"<td><input type='checkbox' name='klausur' "+bool2check(autor.klausur)+"></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>Nutzt moodle-Assessment:</td>");
	document.write(					"<td><input type='checkbox' name='moodleTest' "+bool2check(autor.moodleTest)+"></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>An Einführung teilgenommen:</td>");
	document.write(					"<td><input type='checkbox' name='einfuehrung' "+bool2check(autor.einfuehrung)+"></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>Fachbereich:</td>");
	document.write(					"<td><input type='hidden' id='fb' name='fb' /></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>Institut:</td>");
	document.write(					"<td><input type='text' id='institut' class='textInput' name='institut' value='"+(autor.institut == null ? "" : autor.institut)+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>Fachgebiet:</td>");
	document.write(					"<td><input type='text' id='fachgebiet' class='textInput' name='fachgebiet' value='"+(autor.fachgebiet == null ? "" : autor.fachgebiet)+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>Win-Autor aktiv:</td>");
	document.write(					"<td><input type='checkbox' name='winAuth' "+bool2check(autor.winAuth)+"></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>Win-Autor seit:</td>");
	document.write(					"<td><input type='text' id='winAuthSince' name='winAuthDate' class='textInput' value='"+autor.winAuthSince+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>Perception Autorenname:</td>");
	document.write(					"<td><input type='text' id='perceptionName' class='textInput' name='perceptionName' value='"+(autor.perceptionName == null ? "" : autor.perceptionName)+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>Perception Ordnername:</td>");
	document.write(					"<td><input type='text' id='perceptionFolder' class='textInput' name='perceptionFolder' value='"+(autor.perceptionFolder == null ? "" : autor.perceptionFolder)+"'/></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlockComment'>Kommentar:</td>");
	document.write(					"<td><textarea id='comment' placeholder='Kommentar...'>"+(autor.kommentar == null ? "" : autor.kommentar)+"</textarea>");
	document.write(					"<input type='hidden' name='kommentar' id='kommentar' value='"+(autor.kommentar == "" ? null : autor.kommentar)+"' /></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLight'>");
	document.write(					"<td class='leftBlock'>Educampus-Autorenlizenz:</td>");
	document.write(					"<td><input type='hidden' id='lizenz' name='lizenz' /></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trDark'>");
	document.write(					"<td class='leftBlock'>Zugangsdaten erhalten:</td>");
	document.write(					"<td><input type='checkbox' name='login' "+bool2check(autor.login)+"></td>");
	document.write(				"</tr>");
	document.write(				"<tr class='trLast'>");
	document.write(					"<td>&nbsp;</td>");
	document.write(					"<td>&nbsp;</td>");
	document.write(				"</tr>");
	document.write(			"</table>");
	document.write(		"<input type='hidden' name='ctrl_NotSave' id='submitParam' value='true'>");
	document.write(		"<input type='hidden' name='origLiz' value='"+autor.lizenz+"'>");
	document.write(		"</form>");
	document.write(		"<div id='sendButtons'>");
	document.write(			"<input type='button' id='sendLogin' value='Sende Zugangsdaten' onclick='sendLogin()'>");
	document.write(		"</div>");
	document.write( 	"</div>");	//mainBlock
	document.write("</div>"); //info_box
	document.write("</br>"); //space
	document.write("</div></div>");

	$('#comment').bind('input', function() { 
	    autor.kommentar = $(this).val();
	    document.getElementById("kommentar").value = autor.kommentar;
	});
}