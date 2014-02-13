function showWaitForm() {
	var loadingForm = "<div id='grayBack'>";
	loadingForm += "	<div class='loading'>";
	loadingForm += "		<div class='spinner'>";
	loadingForm += "			<div class='mask'>";
	loadingForm += "				<div class='maskedCircle'></div>";
	loadingForm += "			</div>";
	loadingForm += "		</div>";
	loadingForm += "	</div>";
	loadingForm += "</div>";
	loadingForm += "<div id='loadText' align='center'>lädt...</div>";

    var loadingElement = document.createElement("div");
    loadingElement.innerHTML = loadingForm;
    document.body.appendChild(loadingElement);
}