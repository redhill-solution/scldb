function formatNumber(num) {
    if(num < 10) num = "0"+num;
    return [num];
}
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
function createDatePicker(id, inDate){
    $(document).ready(function () {
        $("#"+id).datepicker({ 
            firstDay: 1,
            showWeek: true,
            changeYear: true,
            changeMonth: true,
            monthNames: [ "Januar", "Februar", "März", "April", "weekOverview", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
            monthNamesShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ],
            dayNames: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag" ],
            dayNamesMin: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
            dayNamesShort: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
            dateFormat: "dd.mm.yy",
            weekHeader: "KW"/*,
            onSelect: function(dateText, inst) {
                var splitDate = dateText.split(".");
                var nuDate = new Date(splitDate[2],splitDate[1],splitDate[0],inDate.getHours(),inDate.getMinutes());
                date = nuDate;
            }*/
        });
    });
}
function submitForm(invokeParamVal) { 
    var splitDate = (document.getElementById('cdDate').value).split(".");
    dateStart = new Date(splitDate[2],splitDate[1]-1,splitDate[0],document.getElementById('cdHourStart').value,document.getElementById('cdMinStart').value);
    dateEnd = new Date(splitDate[2],splitDate[1]-1,splitDate[0],document.getElementById('cdHourStop').value,document.getElementById('cdMinStop').value);

    if(dateStart > dateEnd) {
        alert("Die angegebene Uhrzeit ist ungültig!");
        return(false);
    }
    var slotFree = true;
    for(var i = 0; i < Block.length; i++){
        if((dateStart <= Block[i].startTime || dateStart <= Block[i].endTime) 
            && (dateEnd >= Block[i].startTime || dateEnd >= Block[i].endTime)) slotFree = false;
    }
    if(slotFree) {
        // set the hidden input's name to the value you want.
        var element = document.getElementById("submitParam"); 
        element.name = invokeParamVal;
        // submit the form.
        var form = document.getElementById("writeDate");
        form.submit();
    } else { 
        alert("Der Termin ist bereits belegt!");
    }
}

function createForm(date_in) {
    var empty = new Array();
    var cdDate = new Date(date_in);
    var hourMenu = ["6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"];
    var minMenu = ["0","5","10","15","20","25","30","35","40","45","50","55"];

    var div = document.createElement("div");
    div.id = "grayBack";
    document.body.appendChild(div);  

	var content = "<div id='createDateCont'>";
    content +=      "<div id='WinBorder'>";
    content +=          "<span id='WinHeadText'>Neuen Termin erstellen</span>";
    content +=      "</div>";
    content +=      "<div id='cdText'>";
    content +=          "<span >Datum: </span>";
    content +=          "<span class='textStart'>Beginn: </span>";
    content +=          "<span class='textEnd'>Ende: </span>";
    content +=          "<span class='textName'>Klausur: </span>";
    content +=          "<span class='textFB'>Fachbereich: </span>";
    content +=          "<span class='textDozent'>Dozent: </span>";
    content +=          "<span class='textTeil'>Teilnehmer: </span>";
    content +=      "</div>";
    content +=      "<form id='writeDate' method='post' action='' >";
	content += 		"<div id='cdDrops'>";
    content +=          "<span class='cdRowDate'><input type='text' name='cdDate' id='cdDate' value='"+formatNumber(cdDate.getDate())+"."+formatNumber(cdDate.getMonth()+1)+"."+cdDate.getFullYear()+"' /></span>";
    content +=          "<span class='cdRowStartTime'><input type='hidden' name='cdHourStart' id='cdHourStart' />";
    content +=          " : <input type='hidden' name='cdMinStart' id='cdMinStart' /> Uhr</span>";
    content +=          "<span class='cdRowStopTime'><input type='hidden' name='cdHourStop' id='cdHourStop' />";
    content +=          " : <input type='hidden' name='cdMinStop' id='cdMinStop' /> Uhr</span>";
    content +=			"<span class='cdRowName'><input type='hidden' name='cdName' id='dateName' /></span>";
    content +=          "<span class='cdRowFB'><input type='hidden' name='cdFB' id='cdFB' /></span>";
    content +=          "<span class='cdRowDozent'><input type='hidden' name='cdDozent' id='cdDozent' /></span>";
    content +=          "<span class='cdRowTeil'><input type='number' name='cdTeil' id='cdTeil' value='0'/></span>";
    content += 		"</div>";
    content +=          "<textarea id='BelegungsComment' name='cdComment' placeholder='Zusätzliches zum Termin...'></textarea>";
	content += 		"<div id='cbuttons' align='center'>";
	content += 			"<input type='button' value='Termin erstellen' onclick='submitForm(\"ctrl_save\")' />&nbsp;",
	content += 		  	"<input type='button' value='Abbrechen' onclick='killForm()'/>";
	content += 		  "</div>";
    content +=      "<input type='hidden' name='ctrl_NotSave' id='submitParam' value='true' />";
    content +=      "</form>";
	content += "</div>";

    var div = document.createElement("div");
    div.id = "createDate";
    div.align = "center";
    div.innerHTML = content;
    document.body.appendChild(div);

    if(AutorenID != null) {
        for(var AutIDlen = 0; AutIDlen < AutorenID.length; AutIDlen++){
            if(AutorenFB[AutIDlen] == "1") Autoren[AutIDlen] = AutorenLastName[AutIDlen]+", "+AutorenSurName[AutIDlen] ;
        }
    }

    createDatePicker("cdDate", cdDate);
    knameArray.createDropDown("dateName", "Klausurbezeichnung", "", "240px", null, false); 
    fbArray.createDropDown_NE("cdFB", "Fachbereich", "FB01 - Humanwissenschaften", "240px", null, false); 
    Autoren.createDropDown("cdDozent", "Dozent", "", "240px", null, true);
    hourMenu.createDropDown_NE("cdHourStart", "hh", formatNumber(cdDate.getHours()), "off", "2", false); 
    minMenu.createDropDown_NE("cdMinStart", "mm", formatNumber(cdDate.getMinutes()), "off", "2", false); 
    hourMenu.createDropDown_NE("cdHourStop", "hh", formatNumber(cdDate.getHours()+1), "off", "2", false); 
    minMenu.createDropDown_NE("cdMinStop", "mm", formatNumber(cdDate.getMinutes()), "off", "2", false); 

    $("#cdFB").on("change", function() {
        Autoren = [];
        if(AutorenID != null) {
            for(var AutIDlen = 0; AutIDlen < AutorenID.length; AutIDlen++){
                if(AutorenFB[AutIDlen] == fbArray.indexOf(document.getElementById('cdFB').value)+1) Autoren[AutIDlen] = AutorenLastName[AutIDlen]+", "+AutorenSurName[AutIDlen] ;
            }
        }
        Autoren.createDropDown("cdDozent", "Dozent", "", "240px", null, true);
    });
}
function killForm() {
    Autoren = [];
	element = document.getElementById("grayBack");
	element.parentNode.removeChild(element);	
	element2 = document.getElementById("createDate");
	element2.parentNode.removeChild(element2);	
}