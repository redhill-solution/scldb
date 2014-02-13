	function submitForm(invokeParamVal, id) { 
		if(invokeParamVal == 'ctrl_delete') {
			if(confirm('Diesen Termin wirklich ablehnen?')){
				var element = document.getElementById("submitParam"); 
				element.name = invokeParamVal;

				parentBlock = document.getElementById("save");
	            var input = document.createElement("input");
	            input.name = "id";
	            input.type = "hidden";
	            input.value = dates[id].id;
	            parentBlock.appendChild(input); 

				var form = document.getElementById("save");
				form.submit();
			} 
		} else if(confirm('Termin genehmigen?')){
			var element = document.getElementById("submitParam"); 
			element.name = invokeParamVal;

			parentBlock = document.getElementById("save");
			var input = document.createElement("input");
			input.name = "id";
			input.type = "hidden";
			input.value = dates[id].id;
			parentBlock.appendChild(input); 

			var form = document.getElementById("save");
			form.submit();
		}

	}
	function formatNumber(num) {
		if(num < 10) num = "0"+num;
		return [num];
	}
	/*function compareDate_UP(a,b) {
		if (a.startTime < b.startTime)
			return -1;
		if (a.startTime > b.startTime)
			return 1;
		return 0;
	}
	function compareDate_DOWN(a,b) {
		if (a.startTime > b.startTime)
			return -1;
		if (a.startTime < b.startTime)
			return 1;
		return 0;
	}
	function compareEndDate_UP(a,b) {
		if (a.endTime < b.endTime)
			return -1;
		if (a.endTime > b.endTime)
			return 1;
		return 0;
	}
	function compareEndDate_DOWN(a,b) {
		if (a.endTime > b.endTime)
			return -1;
		if (a.endTime < b.endTime)
			return 1;
		return 0;
	}
	function compareName_UP(a,b) {
		if (a.name.toLowerCase() < b.name.toLowerCase())
			return -1;
		if (a.name.toLowerCase() > b.name.toLowerCase())
			return 1;
		return 0;
	}
	function compareName_DOWN(a,b) {
		if (a.name.toLowerCase() > b.name.toLowerCase())
			return -1;
		if (a.name.toLowerCase() < b.name.toLowerCase())
			return 1;
		return 0;
	}
	function compareDozent_UP(a,b) {
		if (a.dozent.toLowerCase() < b.dozent.toLowerCase())
			return -1;
		if (a.dozent.toLowerCase() > b.dozent.toLowerCase())
			return 1;
		return 0;
	}
	function compareDozent_DOWN(a,b) {
		if (a.dozent.toLowerCase() > b.dozent.toLowerCase())
			return -1;
		if (a.dozent.toLowerCase() < b.dozent.toLowerCase())
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
	function sortFor(option) {
		var element = document.getElementById("Table");
		if(element != null) element.parentNode.removeChild(element);
		if(!SortUp) {
			if(option == "compareDate") dates.sort(compareDate_UP);
			if(option == "compareEndDate") dates.sort(compareEndDate_UP);
			if(option == "compareName") dates.sort(compareName_UP);
			if(option == "compareDozent") dates.sort(compareDozent_UP);
			if(option == "compareFB") dates.sort(compareFB_UP);
			SortUp = true;
		} else {
			if(option == "compareDate") dates.sort(compareDate_DOWN);		
			if(option == "compareEndDate") dates.sort(compareEndDate_DOWN);		
			if(option == "compareName") dates.sort(compareName_DOWN);		
			if(option == "compareDozent") dates.sort(compareDozent_DOWN);		
			if(option == "compareFB") dates.sort(compareFB_DOWN);
			SortUp = false;
		}

		createTable();
	}*/
	function compateCreate_UP(a,b) {
		if (a.erstellt < b.erstellt)
			return -1;
		if (a.erstellt > b.erstellt)
			return 1;
		return 0;
	}
	function compateCreate_DOWN(a,b) {
		if (a.erstellt > b.erstellt)
			return -1;
		if (a.erstellt < b.erstellt)
			return 1;
		return 0;
	}
	function createTable() {
		/*var htmlCode = 				"<tr class='TableHeadings'>";
		htmlCode += 					"<td class='Datum'><a href='javascript:void[0]' onclick='sortFor(\"compareDate\")'>Datum</a></td>";
		htmlCode += 					"<td class='Startzeit'><a href='javascript:void[0]' onclick='sortFor(\"compareDate\")'>Startzeit</a></td>";
		htmlCode += 					"<td class='Endzeit'><a href='javascript:void[0]' onclick='sortFor(\"compareEndDate\")'>Endzeit</a></td>";
		htmlCode += 					"<td class='Klausurbezeichnung'><a href='javascript:void[0]' onclick='sortFor(\"compareName\")'>Klausurbezeichnung</a></td>";
		htmlCode += 					"<td class='Dozent'><a href='javascript:void[0]' onclick='sortFor(\"compareDozent\")'>Dozent</a></td>";
		htmlCode += 					"<td class='Fachbereich'><a href='javascript:void[0]' onclick='sortFor(\"compareFB\")'>Fachbereich</a></td>";
		htmlCode += 					"<td class='Aktion'><a href='javascript:void[0]' style='cursor: default; background-color: transparent; color: #000;'>Aktion</a></td>";
		htmlCode += 				"</tr>";*/
		var htmlCode = 				"<tr class='TableHeadings'>";
		htmlCode += 					"<td class='Datum'>Datum</td>";
		htmlCode += 					"<td class='Startzeit'>Startzeit</td>";
		htmlCode += 					"<td class='Endzeit'>Endzeit</td>";
		htmlCode += 					"<td class='Klausurbezeichnung'>Klausurbezeichnung</td>";
		htmlCode += 					"<td class='Dozent'>Dozent</td>";
		htmlCode += 					"<td class='Fachbereich'>Fachbereich</td>";
		htmlCode += 					"<td class='Aktion'>Aktion</td>";
		htmlCode += 				"</tr>";
		for(var DataCount = 0; DataCount < dates.length; DataCount++){
			var startTime = new Date(dates[DataCount].startTime * 1000);
			var endTime = new Date(dates[DataCount].endTime * 1000);
			if((DataCount % 2) != 0) var TRColor = "TableTRLight";
			else var TRColor = "TableTRDark";
			htmlCode += 			"<tr class='"+TRColor+"' id='"+DataCount+"'>";
			htmlCode += 				"<td class='TableIDData'>"+formatNumber(startTime.getDate())+"."+formatNumber(startTime.getMonth()+1)+"."+startTime.getFullYear()+"</td>";
			htmlCode += 				"<td class='TableLNData'>"+formatNumber(startTime.getHours())+":"+formatNumber(startTime.getMinutes())+" Uhr"+"</td>";
			htmlCode += 				"<td class='TableSNData'>"+formatNumber(endTime.getHours())+":"+formatNumber(endTime.getMinutes())+" Uhr"+"</td>";
			htmlCode += 				"<td class='TableTitelData'>"+dates[DataCount].name+"</td>";
			htmlCode += 				"<td class='TableFBData'>"+dates[DataCount].dozent+"</td>";
			htmlCode += 				"<td class='TableLicData'>"+dates[DataCount].fb+"</td>";
			htmlCode += 				"<td class='TableLicData'><input type='button' value='Genehmigen' onClick='submitForm(\"ctrl_save\", "+DataCount+")'><input type='button' value='Ablehnen' onClick='submitForm(\"ctrl_delete\")'></td>";
			htmlCode += 			"</tr>";
		}
		htmlCode += 			"<tr class='TableTRAdd'>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		htmlCode += 				"<td>&nbsp;</td>";
		if( dates.length > 1) htmlCode += 	"<td colspan='2'><span class='TableAddition'>"+dates.length+" Ungenehmigte Klausuren im System</span></td>";
		if( dates.length <= 1) htmlCode += 	"<td colspan='2'><span class='TableAddition'>"+dates.length+" Ungenehmigte Klausur im System</span></td>";
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
            /*
        $(".TableTRDark").click(function() {
    		window.location.href = "edit.php?id="+Autoren[parseFloat(this.id)].id;
    	});
    	$(".TableTRLight").click(function() {
    		window.location.href = "edit.php?id="+Autoren[parseFloat(this.id)].id;
    	});*/
	}
	var SortUp = true;
	dates.sort(compateCreate_UP);
	createTable();