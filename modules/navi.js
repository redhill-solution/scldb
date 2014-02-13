function navi(Node, Position, Int){
	if(Int != 1) {
		var ServerRoot = "/scldb";
		var CalendarRoot = ServerRoot+"/calendar/calendar.php";
	} else {
		var ServerRoot = "/scldb/interface";
		var CalendarRoot = ServerRoot+"/calendar.php";
	}
	var AuthRoot =  ServerRoot+"/authors/list.php";
	var LicenceRoot = ServerRoot+"/licence/list.php";
	var RequestRoot = ServerRoot+"/request/list.php";
	var LogOut = ServerRoot+"/login/logout.php?logout=true";

	nextNode = document.getElementById(Node);
	var parentDiv = nextNode.parentNode;

	if(Position == 0) var homeColor = "#d7d8e6"; else var homeColor = "#F5F5F5";
	if(Position == 1) var calColor = "#d7d8e6"; else var calColor = "#F5F5F5";
	if(Position == 2) var authColor = "#d7d8e6"; else var authColor = "#F5F5F5";
	if(Position == 3) var licenceColor = "#d7d8e6"; else var licenceColor = "#F5F5F5";
	if(Position == 4) var requestColor = "#d7d8e6"; else var requestColor = "#F5F5F5";
	
	var content = "<div id='navi'>";
	content += "<a href='"+ServerRoot+"' >";
	content +=		"<div id='homePos' style='background: "+homeColor+"; border: 2px solid "+homeColor+"' >";
	content += 			"<div id='homeIcon'>&nbsp;</div>";
	content += 			"Startseite";
	content +=		"</div>";
	content += "</a>";
	content += "<a href='"+CalendarRoot+"' >";
	content +=		"<div id='calPos' style='background: "+calColor+"; border: 2px solid "+calColor+"' >";
	content += 			"<div id='calIcon'>&nbsp;</div>";
	content += 			"Belegunsplan";
	content +=		"</div>";
	content += "</a>";
	if(Int != 1) {
		content += "<a href='"+AuthRoot+"' >";
		content +=		"<div id='authPos' style='background: "+authColor+"; border: 2px solid "+authColor+"' >";
		content += 			"<div id='authIcon'>&nbsp;</div>";
		content += 			"Autoren";
		content +=		"</div>";
		content += "</a>";
		content += "<a href='"+LicenceRoot+"' >";
		content +=		"<div id='licencePos' style='background: "+licenceColor+"; border: 2px solid "+licenceColor+"' >";
		content += 			"<div id='licenceIcon'>&nbsp;</div>";
		content += 			"Lizenzen";
		content +=		"</div>";
		content += "</a>";
		content += "<a href='"+RequestRoot+"' >";
		content +=		"<div id='requestPos' style='background: "+requestColor+"; border: 2px solid "+requestColor+"' >";
		content += 			"<div id='requestIcon'>&nbsp;</div>";
		content += 			"Termin Anträge";
		content +=		"</div>";
		content += "</a>";
	}
	content += "<a href='"+LogOut+"' >";
	content +=		"<div id='userPos' style='background: #f5f5f5; border: 2px solid #f5f5f5'>";
	content += 			"<div id='userIcon'>&nbsp;</div>";
	content += 			"Abmelden";
	content +=		"</div>";
	content += "</a>";

	/*
	content += "<a href='"+LogOut+"' ><div id='userIcon'>&nbsp;</div>";
	content += "<span id='textUser'>Abmelden</span></a>";	*/
	content += "</div>";

	var div = document.createElement("div");
    div.id = "naviMain";
    div.innerHTML = content;
    parentDiv.insertBefore(div, nextNode);
}