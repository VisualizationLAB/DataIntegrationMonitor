// Build Data Table

function buildDataTable(){
	d3.selectAll(".fileListDiv").remove();
	d3.selectAll(".fileDataDiv").remove();
	d3.selectAll(".errDataDiv").remove();
	d3.select(".fileList")
		.append("div")
			.attr("class", "fileListDiv")
			.attr("valign", "top")
			.attr("align", "right");

	d3.select(".fileData")
		.append("div")
			.attr("class", "fileDataDiv")
			.attr("valign", "top")
			.attr("align", "left");
	
	d3.select(".errData")
		.append("div")
			.attr("class", "errDataDiv")
			.attr("valign", "top")
			.attr("align", "left");

	var columns = ["Error", "Count"];
	var columnsFile = ["Layouts"];
	var columnsFileLayout = ["Category"];
	var dataTB = [];
	var dataFile = [];
	var File = [];
	var fileList = "";
	if (SelectedData.length > 0 ) 
	{
		SelectedData.forEach (function (d) {
									console.log(d.Errors_cnt);
									d.Errors_cnt.forEach ( function(d) {
																var arrStr = d.split("-");
																if(arrStr[0] != "") 
																{	
																	var datarow = { "Error" : arrStr[0] , "Count" : parseInt(arrStr[1]) }
																	dataTB.push(datarow);}
															});//d.Errors_cnt.forEach ( function(d)
									d.Files.forEach ( function(d) {
															var fileClass = "";
															var val = d.substring(0,3);
															switch (val)
															{
																case "eli":
																	fileClass = "Eligibility"
																	break;
																case "pro":
																	fileClass = "Provider"
																	break;
																case "ceg":
																	fileClass = "CEG"
																	break;
																case "lab":
																	fileClass = "LAB"
																	break;
																case "PHA":
																	fileClass = "Pharmacy Claims"
																	break;
																case "CLA":
																	fileClass = "Medical Claims"
																	break;
															}		
															var datarow = { "Layouts" : d , "Fclass" : fileClass } 
															dataFile.push(datarow);
															if (fileList.indexOf(fileClass) == -1) {
																	var datarow = { "Category" : fileClass } 
																	fileList = fileList + fileClass + "|";
																	File.push(datarow);
															}
		
														});//d.Files.forEach ( function(d)
			})//SelectedData.forEach (function (d)
	}//if (SelectedData.length > 0 ) 

	if(dataTB.length > 0)
	{
		d3.select(".errDataDiv")
			.append("table")
				.attr("border", borderT)
				.attr("cellpadding" , cellpaddingD)
				.attr("class", "dataTable")
				.append("thead")
					.append("tr")
						.selectAll("th")
							.data(columns)
								.enter()
									.append("th")
										.text(function(column) { return column; })
										.attr("align", "left");
 
		var tbody  = d3.select(".dataTable")
							.append("tbody");
  
		var rows = tbody.selectAll("tr")
							.data(dataTB)
								.enter()
									.append("tr");
	
		var cells = rows.selectAll("td")
        .data(function(row) {
					//console.log(row.error);
					return columns.map(function(column) {
											var dataRow = {column: column, value: addCommas(row[column])};
											return dataRow;
										});//columns.map(function(column)
				})//data(function(row)
		.enter()
        .append("td")
            .text(function(d) { return d.value; })
			.attr("align", "left");
	}//if(dataTB.length > 0)
	
	if(dataFile.length > 0)
	{
		d3.select(".fileDataDiv")
				.append("table")
					.attr("border", borderT)
					.attr("cellpadding" , cellpaddingD)
					.attr("class", "fileTable")
					.append("thead")
						.append("tr")
							.selectAll("th")
							.data(columnsFile)
								.enter()
									.append("th")
										.text(function(column) { return column; })
										.attr("align", "right");
 
		var tbody  = d3.select(".fileTable")
							.append("tbody");
  
		var rows = tbody.selectAll("tr")
							.data(dataFile)
								.enter()
									.append("tr");
	
		var cells = rows.selectAll("td")
							.data(function(row) {
										return columnsFile.map(function(column) {
																	var fileClass = "";
																	var val = row[column].substring(0,3);
																	//console.log("val: " + val);
																	switch (val)
																	{
																		case "eli":
																			fileClass = "Eligibility"
																			break;
																		case "pro":
																			fileClass = "Provider"
																			break;
																		case "ceg":
																			fileClass = "CEG"
																			break;
																		case "lab":
																			fileClass = "LAB"
																			break;
																		case "PHA":
																			fileClass = "Pharmacy Claims"
																			break;
																		case "CLA":
																			fileClass = "Medical Claims"
																			break;
																	}
																	var dataRow = {column: column, value: row[column], Fclass: fileClass};
																	return dataRow;
																});//columnsFile.map(function(column)
								})//.data(function(row)
							.enter()
								.append("td")
									.attr("align", "right")
									.text(function(d) { return d.value; });

		d3.select(".fileListDiv")
				.append("table")
					.attr("border", borderT)
					.attr("cellpadding" , cellpaddingD)
					.attr("class", "fileLTable")
					.append("thead")
						.append("tr")
							.selectAll("th")
								.data(columnsFileLayout)
									.enter()
										.append("th")
											.text(function(column) { return column; })
											.attr("align", "left");
 
		var tbody  = d3.select(".fileLTable")
							.append("tbody");
  
		var rows = tbody.selectAll("tr")
							.data(File)
								.enter()
									.append("tr");
	
		var cells = rows.selectAll("td")
							.data(function(row) {
										return columnsFileLayout.map(function(column) {
																			var dataRow = {column: column, value: row[column]};;
																			return dataRow;
																		});//columnsFileLayout.map(function(column)
									})//data(function(row) {
							.enter()
								.append("td")
									.text(function(d) { return d.value; })
									.attr("align", "right");
	}//if(dataFile.length > 0)

 
}//function buildDataTable(){
