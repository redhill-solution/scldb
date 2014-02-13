// JavaScript Document
	//Date Controlls
	function weekBack(inDate, inSqlStartDate, inSqlEndDate, specialName, jsStart, jsEnd) {
		var date = new Date(inDate);
		server_date = date;
		var sqlStartDate = new Date(inSqlStartDate);
		var sqlEndDate = new Date(inSqlEndDate);
		var newSqlStartDate = new Date(inSqlStartDate);
		newSqlStartDate.setFullYear(newSqlStartDate.getFullYear()-1);
		var semStartFormat = formatCorrect(newSqlStartDate.getDate())+"."+formatCorrect((newSqlStartDate.getMonth()+1))+"."+newSqlStartDate.getFullYear();
		var semEndFormat = formatCorrect(sqlEndDate.getDate())+"."+formatCorrect((sqlEndDate.getMonth()+1))+"."+sqlEndDate.getFullYear();
		
		if(date.getFullYear() < sqlStartDate.getFullYear()) {
			date.setDate(date.getDate()-7);
			var dateTMS = date/1000;
			showWaitForm();
			window.location = "calendar.php?sem="+semStartFormat+"."+semEndFormat+"&tms="+dateTMS+"&view=week&sn="+specialName+"&jsSE="+jsStart+"."+jsEnd;
			return -1;
		} else if(date.getFullYear() == sqlStartDate.getFullYear()) {
			if(date.getWeek() <= (sqlStartDate.getWeek()+1) && (Math.abs(date-sqlStartDate) /86400000 < 20)){
				date.setDate(date.getDate()-7);
				var dateTMS = date/1000;
				showWaitForm();
				window.location = "calendar.php?sem="+semStartFormat+"."+semEndFormat+"&tms="+dateTMS+"&view=week&sn="+specialName+"&jsSE="+jsStart+"."+jsEnd;
				return -1;
			}
		}

		var element = document.getElementById("info_box");
		if(element != null) element.parentNode.removeChild(element);
		date.setDate(date.getDate()-7);
		$( "#MonthChoose" ).datepicker( "setDate", date.getFullYear()+","+(date.getMonth()+1)+","+date.getDate() );
		date.createCalenedar(inSqlStartDate, inSqlEndDate, specialName, jsStart, jsEnd);
		date.createDate(Block);
		return false;
	}
	function weekForward(inDate, inSqlStartDate, inSqlEndDate, specialName, jsStart, jsEnd) {
		var date = new Date(inDate);
		server_date = date;
		var sqlStartDate = new Date(inSqlStartDate);
		var sqlEndDate = new Date(inSqlEndDate);
		var newSqlEndDate = new Date(inSqlEndDate);
		newSqlEndDate.setFullYear(newSqlEndDate.getFullYear()+1);
		var semStartFormat = formatCorrect(sqlStartDate.getDate())+"."+formatCorrect((sqlStartDate.getMonth()+1))+"."+sqlStartDate.getFullYear();
		var semEndFormat = formatCorrect(newSqlEndDate.getDate())+"."+formatCorrect((newSqlEndDate.getMonth()+1))+"."+newSqlEndDate.getFullYear();

		if(date.getFullYear() > sqlEndDate.getFullYear()) {
			date.setDate(date.getDate()+7);
			var dateTMS = date/1000;
			showWaitForm();
			window.location = "calendar.php?sem="+semStartFormat+"."+semEndFormat+"&tms="+dateTMS+"&view=week&sn="+specialName+"&jsSE="+jsStart+"."+jsEnd;
			return -1;
		} else if (date.getFullYear() == sqlEndDate.getFullYear()) {
			if(date.getWeek() >= (sqlEndDate.getWeek()-1) && (Math.abs(date-sqlStartDate) /86400000 < 20)){
				date.setDate(date.getDate()+7);
				var dateTMS = date/1000;
				showWaitForm();
				window.location = "calendar.php?sem="+semStartFormat+"."+semEndFormat+"&tms="+dateTMS+"&view=week&sn="+specialName+"&jsSE="+jsStart+"."+jsEnd;
				return -1;
			}
		}
		var element = document.getElementById("info_box");
		if(element != null) element.parentNode.removeChild(element);
		date.setDate(date.getDate()+7);
		$( "#MonthChoose" ).datepicker( "setDate", date.getFullYear()+","+(date.getMonth()+1)+","+date.getDate() );
		date.createCalenedar(inSqlStartDate, inSqlEndDate, specialName, jsStart, jsEnd);
		date.createDate(Block);
		return false;
	}
	function moveToDate(inDate, inSqlStartDate, inSqlEndDate, specialName, jsStart, jsEnd) {
		date = new Date(inDate);
		server_date = date;
		var vglDateStart = new Date(inDate);
		var vglDateEnd = new Date(inDate);
		var sqlStartDate = new Date(inSqlStartDate);
		var sqlEndDate = new Date(inSqlEndDate);
		var newSqlEndDate = new Date(inDate);
		var newSqlStartDate = new Date(inDate);

		newSqlEndDate.setFullYear(newSqlEndDate.getFullYear()+1);
		newSqlStartDate.setFullYear(newSqlStartDate.getFullYear()-1);

		vglDateEnd.setDate(vglDateEnd.getDay() != 0 ? (vglDateEnd.getDate() + 7 - vglDateEnd.getDay() + 1) : (vglDateEnd.getDate() + 1));
		vglDateStart.setDate(vglDateStart.getDay() != 0 ? (vglDateStart.getDate() - 7 + (7- vglDateStart.getDay()) ) : (vglDateStart.getDate() - 7));

		if(vglDateStart >= sqlStartDate && vglDateEnd <= sqlEndDate) {
			var element = document.getElementById("info_box");
			if(element != null) element.parentNode.removeChild(element);
			date.createCalenedar(inSqlStartDate, inSqlEndDate, specialName, jsStart, jsEnd);
			date.createDate(Block);
			
			return false;	
		} else {
			if(date >= sqlStartDate) {
				var semStartFormat = formatCorrect(sqlStartDate.getDate())+"."+formatCorrect((sqlStartDate.getMonth()+1))+"."+sqlStartDate.getFullYear();
				var semEndFormat = formatCorrect(newSqlEndDate.getDate())+"."+formatCorrect((newSqlEndDate.getMonth()+1))+"."+newSqlEndDate.getFullYear();
				date.setDate(date.getDate()-7);
				var dateTMS = date/1000;
				showWaitForm();
				window.location = "calendar.php?sem="+semStartFormat+"."+semEndFormat+"&tms="+dateTMS+"&view=week&sn="+specialName+"&jsSE="+jsStart+"."+jsEnd;
				return -1;
			} else if(date <= sqlEndDate){
				var semStartFormat = formatCorrect(newSqlStartDate.getDate())+"."+formatCorrect((newSqlStartDate.getMonth()+1))+"."+newSqlStartDate.getFullYear();
				var semEndFormat = formatCorrect(sqlEndDate.getDate())+"."+formatCorrect((sqlEndDate.getMonth()+1))+"."+sqlEndDate.getFullYear();
				date.setDate(date.getDate()+7);
				var dateTMS = date/1000;
				showWaitForm();
				window.location = "calendar.php?sem="+semStartFormat+"."+semEndFormat+"&tms="+dateTMS+"&view=week&sn="+specialName+"&jsSE="+jsStart+"."+jsEnd;
				return -1;
			}
		}


	}
	//-------------------------------------------------------------------------
	function formatCorrect(value){
		if(value < 10) value = "0"+value;
		return [ value ];
	}
	//-------------------------------------------------------------------------
	// Erstelle Termin-Blöcke aus MYSQL Abfrage
	Date.prototype.createDate = function(Block) {
		var ret_val = getDayArray(this,this.getWeek());
		var weekDate = ret_val[2][0]+","+ret_val[1][0]+","+ret_val[0][0];
		var weekStart = new Date(weekDate);
		var weekDateEnd = ret_val[2][6]+","+ret_val[1][6]+","+ret_val[0][6];
		var weekEnd = new Date(weekDateEnd);
		weekEnd.setHours(23);
		weekEnd.setMinutes(59);
		weekEnd.setSeconds(59);

		for(var i = 0; i < Block.length; i++) {
			//Lösche alle existierenden Blöcke
			var element = document.getElementById(i);
			if(element != null) {
				element.parentNode.removeChild(element);
			}
			//Prüfe ob Date in der Woche vorkommt und erstelle Block
			//alert(startDate[i]+" "+weekStart+" "+endDate[i]);
			if(Block[i].startTime > weekStart && Block[i].endTime < weekEnd) {
				// create array with available hours: 6-22 Uhr
				var hour = new Array();
				var left; var top; var height;
				if(Block[i].name.length >= 11) {
					var name = Block[i].name;
					var KlausurName = name.slice(0, -(name.length-11));
					KlausurName += "...";
				}
				else var KlausurName = Block[i].name;
				
				for(var x = 0; x <= 16; x++) {
					hour[x] = 6+x;
				}
				// horizontal: 157px || 9.8125em
				for (var p = 0; p <= 6; p++) {
					if(Block[i].startTime.getDate() == ret_val[0][p]) {
						 left = (108*p);
						 left +='px';
					}
				}
				// vertikal: 27px || 1.6875em
				for (var m = 0; m <= 16; m++) {
					if(Block[i].startTime.getHours() == hour[m]) top = Math.round((0.01+(3*m))*1000)/1000;
				}
				top += Math.round((Block[i].startTime.getMinutes() * 0.04917)*1000)/1000;
				top += 'em';
				// height: 86px || 5.375em
				height 		 = (((Block[i].endTime.getHours()	-	Block[i].startTime.getHours()) 	* 32)+((Block[i].endTime.getHours()	-	Block[i].startTime.getHours())*1))-1;
				height 		+= (Block[i].endTime.getMinutes()	-	Block[i].startTime.getMinutes())	* 0.53;
		
				if(height <= 22) var info_text = "&nbsp;";
				else if(height <= 32 && height > 22) 	 var info_text = "<strong>"+KlausurName+"</strong>"+(Block[i].blockColor == 1 ? "<div class='DateColorRed'></div>" : Block[i].blockColor == 2 ? "<div class='DateColorOrange'></div>" : Block[i].blockColor == 3 ? "<div class='DateColorYellow'></div>" : Block[i].blockColor == 4 ? "<div class='DateColorGreenLight'></div>" : Block[i].blockColor == 5 ? "<div class='DateColorGreen'></div>" : Block[i].blockColor == 6 ? "<div class='DateColorGray'></div>" : "" ); 
					else if(height <= 67 && height > 32) var info_text = 	"<strong>"+KlausurName+"</strong>"+(Block[i].blockColor == 1 ? "<div class='DateColorRed'></div>" : Block[i].blockColor == 2 ? "<div class='DateColorOrange'></div>" : Block[i].blockColor == 3 ? "<div class='DateColorYellow'></div>" : Block[i].blockColor == 4 ? "<div class='DateColorGreenLight'></div>" : Block[i].blockColor == 5 ? "<div class='DateColorGreen'></div>" : Block[i].blockColor == 6 ? "<div class='DateColorGray'></div>" : "" )+
																			"<br>Datum: "+formatCorrect(Block[i].startTime.getDate())+"."+formatCorrect(Block[i].startTime.getMonth()+1)+"."+Block[i].startTime.getFullYear();
						else var info_text = 	"<strong>"+KlausurName+"</strong>"+(Block[i].blockColor == 1 ? "<div class='DateColorRed'></div>" : Block[i].blockColor == 2 ? "<div class='DateColorOrange'></div>" : Block[i].blockColor == 3 ? "<div class='DateColorYellow'></div>" : Block[i].blockColor == 4 ? "<div class='DateColorGreenLight'></div>" : Block[i].blockColor == 5 ? "<div class='DateColorGreen'></div>" : Block[i].blockColor == 6 ? "<div class='DateColorGray'></div>" : "" )+
												"<br>Datum: "+formatCorrect(Block[i].startTime.getDate())+"."+formatCorrect(Block[i].startTime.getMonth()+1)+"."+Block[i].startTime.getFullYear()+
												"<br>Von: "+formatCorrect(Block[i].startTime.getHours())+":"+formatCorrect(Block[i].startTime.getMinutes())+
												" Uhr<br>Bis: "+formatCorrect(Block[i].endTime.getHours())+":"+formatCorrect(Block[i].endTime.getMinutes())+" Uhr";
	            var parentBlock = document.getElementById('datafields');
	            if(parentBlock != null) {
		            var div = document.createElement("div");
		            div.id = "Termin"+i;
		            div.className = "termine";
		            div.style.height = height+"px";
		            div.style.left = left;
		            div.style.top = top;
		            div.innerHTML = "<a href ='edit.php?id="+Block[i].id+"&vCL=week&lSN=\""+listSpecialName+"\"' title='Details' ><div class='dateText' style='height:"+(height-6)+"px;'>"+info_text+"</div></a>";
		            parentBlock.appendChild(div);
	            }
			
			} 
		}
	}
	//-------------------------------------------------------------------------
	// Gebrauche Funktion: var date = new Date(); date.getWeek();
	Date.prototype.getWeek = function () {  
		// Create a copy of this date object  
		var target  = new Date(this.valueOf());  
	  
		// ISO week date weeks start on monday  
		// so correct the day number  
		var dayNr   = (this.getDay() + 6) % 7;  
	  
		// ISO 8601 states that week 1 is the week  
		// with the first thursday of that year.  
		// Set the target date to the thursday in the target week  
		target.setDate(target.getDate() - dayNr + 3);  
	  
		// Store the millisecond value of the target date  
		var firstThursday = target.valueOf();  
	  
		// Set the target to the first thursday of the year  
		// First set the target to january first  
		target.setMonth(0, 1);  
		// Not a thursday? Correct the date to the next thursday  
		if (target.getDay() != 4) {  
			target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);  
		}  
	  
		// The weeknumber is the number of weeks between the   
		// first thursday of the year and the thursday in the target week  
		return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000  
	}  
	//-------------------------------------------------------------------------
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
	//-------------------------------------------------------------------------
	function getDayArray(d,CurrentWeek) {
		d = new Date(d);
		var AssignedDateArray = new Array();
		AssignedDateArray["Day"] = new Array();
		AssignedDateArray["Month"] = new Array();
		AssignedDateArray["Year"] = new Array();
		AssignedDateArray["Week"] = new Array();
		var day_cnt = 0;

		var daysOfMonth = getDaysOfMonth(d);
		var prevDate = new Date(d);
		prevDate.setDate(0);
		
		var nextDate = new Date(d);
		nextDate.setDate(32);

		for (var i = 1; i <= daysOfMonth; i++) {
			var nuDate = new Date(d.getFullYear(),d.getMonth(),i);
			//Berechne Tage des Letzten Monats in der ersten Woche
			if(i == 1) {
				var s = nuDate.getDay()-1;
				if(s == -1) s = 6;
				for(var b = s; b > 0; b--) {
					var x = getDaysOfMonth(prevDate)-b; x++; 
					AssignedDateArray["Day"][day_cnt] 		= x;
					AssignedDateArray["Month"][day_cnt] 	= (prevDate.getMonth()+1);
					AssignedDateArray["Year"][day_cnt]  	= prevDate.getFullYear(); 
					AssignedDateArray["Week"][day_cnt]  	= prevDate.getWeek();
					day_cnt++;
				}
			}
			//Berechne Tage dieses Monats
			if(i >= 1 && i <= daysOfMonth) {
				AssignedDateArray["Day"][day_cnt] 		= i;
				AssignedDateArray["Month"][day_cnt] 	= (nuDate.getMonth())+1;
				AssignedDateArray["Year"][day_cnt]  	= nuDate.getFullYear();
				AssignedDateArray["Week"][day_cnt]  	= nuDate.getWeek();
				day_cnt++;
			}
			//Berechne Tage des nächsten Monats in der letzten Woche
			if( i == daysOfMonth) {
				var s = nuDate.getDay()-1;
				if(s == -1) s = 6;
				var next_sum = (6-s);
				for(var c = 1; c <= next_sum; c++) {
					AssignedDateArray["Day"][day_cnt] 		= c;
					AssignedDateArray["Month"][day_cnt] 	= (nextDate.getMonth())+1;
					AssignedDateArray["Year"][day_cnt]  	= nextDate.getFullYear();
					AssignedDateArray["Week"][day_cnt]  	= nextDate.getWeek();
					if(c < next_sum) day_cnt++;
				}
			}
		} 
		for(var index = 0; index < AssignedDateArray["Week"].length; index++) {
			 if(AssignedDateArray["Week"][index] == Math.round(CurrentWeek)) {
			   var day = new Array();
			   var month = new Array();
			   var year = new Array();
			   for (var weekLength = 0; weekLength < 7; weekLength++) {
				   day[weekLength] 		= AssignedDateArray["Day"][index+weekLength];
				   month[weekLength] 	= AssignedDateArray["Month"][index+weekLength];
				   year[weekLength] 	= AssignedDateArray["Year"][index+weekLength];
			   }
			   break;
		   }
		}
		return[day, month, year];
	}
	//-------------------------------------------------------------------------
	function returnMonthName(monthNumber) {
		var monthNames = new Array(	"Januar", 
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
							"Dezember"
						  );
		return [ monthNames[(monthNumber)-1] ];	
	}
	//-------------------------------------------------------------------------
	//-------------------------------------------------------------------------
	Date.prototype.createCalenedar = function(startDate, endDate, specialName, jsStart, jsEnd) {
		var CurrentDate = new Date();
		var date_info;
		var ret_val = getDayArray(this,this.getWeek())
		if(ret_val[2][0] != ret_val[2][6]) {
			date_info = ret_val[0][0] + '. ' 
				+ returnMonthName(ret_val[1][0]) + ' ' + ret_val[2][0] + ' - ' + ret_val[0][6] + '. ' 
				+ returnMonthName(ret_val[1][6]) + ' ' + ret_val[2][6];
		} else {
			date_info = ret_val[0][0] + '. ' 
				+ returnMonthName(ret_val[1][0]) + ' - ' + ret_val[0][6] + '. ' + returnMonthName(ret_val[1][6]) 
				+ ' ' + ret_val[2][6];
		}
		//-------------------------------------------------------------------------
		var writeDate = "<table class='dates_tbl'>";
		writeDate += "<tr>";
		var DayName = new Array("Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag");
		for(var dayIndex = 0; dayIndex <= 6; dayIndex++) {
			if(	CurrentDate.getDate()		== ret_val[0][dayIndex] && 
				CurrentDate.getMonth()+1 	== ret_val[1][dayIndex] && 
				CurrentDate.getFullYear()	== ret_val[2][dayIndex]
			   )
				writeDate += "<td class='days' style='background-color:#63A1D4;'>" + DayName[dayIndex] + "</td>";
			else {
				/*if(	date.getDate() 			==	ret_val[0][dayIndex] && 
					date.getMonth()+1 		== ret_val[1][dayIndex] && 
					date.getFullYear()		== ret_val[2][dayIndex]
				)
					 writeDate += "<td class='days' style='background-color:#BDD6E7; color: #000000;'>" + DayName[dayIndex] + "</td>";
				else */writeDate += "<td class='days'>" + DayName[dayIndex] + "</td>";
			}
		}
		writeDate += "</tr>";
		writeDate += "<tr>";
		for(var dayIndex = 0; dayIndex <= 6; dayIndex++) {
			if(	CurrentDate.getDate()	== ret_val[0][dayIndex] && 
				CurrentDate.getMonth()+1 	== ret_val[1][dayIndex] && 
				CurrentDate.getFullYear()	== ret_val[2][dayIndex]
			   ) 
			{
				if(ret_val[0][dayIndex] < 10) ret_val[0][dayIndex] = "0"+ ret_val[0][dayIndex];
				writeDate += "<td class='date' id='current_day'>" + ret_val[0][dayIndex] + "</td>";
			}
			else 
			{
				if(ret_val[0][dayIndex] < 10) ret_val[0][dayIndex] = "0"+ ret_val[0][dayIndex];
				writeDate += "<td class='date'>" + ret_val[0][dayIndex] + "</font></td>";
			}
		}
		writeDate += "</tr>";
		writeDate += "</table>";
		//-------------------------------------------------------------------------
		var writeHour = function(startHour, stopHour) {
			var ret_val = "<table class='hour_tbl'>";
			var Hour;
			for(var HourIndex = startHour; HourIndex <= stopHour; HourIndex++) {
				if(HourIndex < 10) Hour = "0"+HourIndex;
				else Hour = HourIndex;
				ret_val += "<tr>";
				ret_val += "<td class='hour_td'>" + Hour + "</td>";
				ret_val += "</tr>";
			}
			ret_val += "</table>";
			return [ ret_val ];
		}
		var thisWeek = this.getWeek();
		if(thisWeek < 10) thisWeek = "0" + thisWeek;
		//-------------------------------------------------------------------------
		var Datafield = "";
		
		for(var row_hour = 0; row_hour <= 13; row_hour++) {
			var top = (row_hour*32+row_hour);
			for(var row_day = 0; row_day <= 6; row_day++) {
				var weekDate = new Date(this);
				var phpDate;
				var selectedDate = weekDate.getDay()-1;
				if(selectedDate < 0) selectedDate = 6;
				weekDate.setDate(this.getDate()-(selectedDate-row_day));
				weekDate.setHours((row_hour+6),0,0,0);

				if(weekDate.getMonth() % 2 == 0) var className = 'datefieldColor_1';
				else var className = 'datefieldColor_2';
				
				var left = (row_day*107+row_day);
				//var offset = this.getTimezoneOffset();
				//phpDate = (weekDate / 1000)-((offset-(-120)-60)*60);
				phpDate = new Date(weekDate);
				var dummyDate = new Date();
				//Datafield += "<a class='tblLink' href='edit.php?createDate="+(phpDate)+"' title='neuer Termin'><div class='"+className+"'style='left:"+left+"px; top:"+top+"px;'>&nbsp;</div></a>";
				if(row_hour == 0 || row_hour > 11) Datafield += "<div class='"+className+"'style='background-color: #ccc; left:"+left+"px; top:"+top+"px;'>&nbsp;</div>";
				else Datafield += "<a class='tblLink' href ='javascript:void[0]' onclick='createForm(\""+phpDate+"\")'  title='neuer Termin'><div class='"+className+"'style='left:"+left+"px; top:"+top+"px;'>&nbsp;</div></a>";
			}
		}
		//-------------------------------------------------------------------------
		var phpTMS = (this /1000);
		//-------------------------------------------------------------------------
		var pickerDefaultDate = formatCorrect(this.getFullYear())+","+formatCorrect(this.getMonth()+1)+","+formatCorrect(this.getDate());

		$(document).ready(function () {
	    	$("#MonthChoose").datepicker({ 
	        	firstDay: 1,
	        	showWeek: true,
	        	changeYear: true,
	        	changeMonth: true,
	        	monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
	        	monthNamesShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ],
	        	dayNames: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag" ],
	        	dayNamesMin: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
	        	dayNamesShort: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
	        	dateFormat: "yy,mm,dd",
	        	weekHeader: "KW",
	        	defaultDate: pickerDefaultDate,
	        	onSelect: function(dateText, inst) {
	        		var inDate = new Date(dateText);
	        		moveToDate(inDate, startDate, endDate, specialName, jsStart, jsEnd);
	        	}
	        });
	    });
	    var div = document.createElement("div");
	    div.id = "CalOver";
	    div.align = "center";
	    div.innerHTML = "<input type='text' id='MonthChoose'  />";
	    document.body.appendChild(div);


		if(document.getElementById("calendar") != null) {
			elementTab = document.getElementById('mainBlock');
			if(elementTab != null) {
				elementTab.parentNode.removeChild(elementTab); 
			}
		}
		if(document.getElementById("calendar") == null) {
			var writeDoc = 	"<div id='toolBox'>";
			writeDoc +=			"<div id='refreshArrowPos'><a id='refresh' href='calendar.php?tms="+phpTMS+"&view=week&sn="+specialName+"&jsSE="+jsStart+"."+jsEnd+"' title='Aktualisieren'><div id='refreshArrow'>&nbsp;</div></a></div>";
			writeDoc +=			"<div id='listViewPos'><a id='changelistView' href='javascript:void[0]' onclick='listMain(\""+specialName+"\", \""+startDate+"\", \""+endDate+"\", \""+jsStart+"\", \""+jsEnd+"\")' title='Listen Ansicht'><div id='listView'>&nbsp;</div></a></div>";
			writeDoc +=			"<div id='month_nav'>";"<div id='toPDFPos'><a href='javascript:void[0]' title='Liste als PDF herunterladen'><div id='toPDF'>&nbsp;</div></a></div>";
			writeDoc +=				"<div id='weekBackArrowPos'><a href='javascript:void[0]' onclick='weekBack(\""+this+"\", \""+startDate+"\", \""+endDate+"\", \""+specialName+"\", \""+jsStart+"\", \""+jsEnd+"\")' title='vorherige Woche'><div id='weekBackArrow'>&nbsp;</div></a></div>";
			writeDoc +=				"<div id='weekForwardArrowPos'><a href='javascript:void[0]' onclick='weekForward(\""+this+"\", \""+startDate+"\", \""+endDate+"\", \""+specialName+"\", \""+jsStart+"\", \""+jsEnd+"\")' title='nächste Woche'><div id='weekForwardArrow'>&nbsp;</div></a></div>";
			writeDoc +=				"<div id='calendar_week'>";
			writeDoc +=					"<span id='WeekNumber'><strong style='color:#ffffff;' > KW:" + thisWeek + " </strong></span>";
			writeDoc +=				"</div>";
			writeDoc +=				"<div id='calendar_month'>";
			writeDoc +=					"<span id='CalendarMonth'><a class='datehover' href ='javascript:void[0]' ><strong>"+date_info+"</strong></a></span>";
			writeDoc +=				"</div>";
			writeDoc +=			"</div>";
			writeDoc +=		"</div>";
			writeDoc +=		"<div id='calendar'>";
			writeDoc +=			"<div id='dates'>";
			writeDoc +=				writeDate;
			writeDoc +=			"</div>";
			writeDoc +=     	"<div id='hours'>";
			writeDoc +=				writeHour(6,19);
			writeDoc +=			"</div>";
			writeDoc +=     	"<div id='datafields'>";
			writeDoc +=				Datafield;
			writeDoc +=			"</div>";
			writeDoc +=		"</div>";

			var parentBlock = document.getElementById('container');
			if(parentBlock != null) {
			    var div = document.createElement("div");
			    div.id = "info_box";
			    div.innerHTML = writeDoc;
			    parentBlock.appendChild(div);
			}
		}
		$("#CalendarMonth").click(function() {
		    $("#MonthChoose").datepicker('show');
		});
	}
	//-------------------------------------------------------------------------
	//Main 
	function CalendarMain(startDate, endDate, specialName, jsStart, jsEnd) {
		elementTab = document.getElementById('info_box');
		if(elementTab != null) {
			elementTab.parentNode.removeChild(elementTab); 
		}
		var date = new Date(server_date);
		date.createCalenedar(startDate, endDate, specialName, jsStart, jsEnd);
		date.createDate(Block);
		//showWaitForm();

	}

	//-------------------------------------------------------------------------