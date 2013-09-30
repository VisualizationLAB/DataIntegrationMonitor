var mainTable = d3.select("body")
		.attr("onload", "loadData()")
		.append("table")
		.attr("class" , "main")
		.attr("id" , "main")
		.attr("border", borderT)
		.attr("cellpadding", cellpadding)
		.attr("width", "1000px")
		//.attr("width", mainTableWidth )
		//.attr("height", "100%");

mainTable
	.append("tr")
	.append("td")
	.attr("align","center")
	.append("table")
	.attr("class", "HeaderTable")
	.attr("border", borderT)

//////////////////////////////////////////////////////////////////////////////////////	
//d3.select(".summary") 
d3.select(".HeaderTable")
	.append("tr")
	.attr("class" , "H1")
	.attr("height", "5%");
	
d3.select(".H1").append("td")
	.attr("align", "center")
	//.attr("colspan", 12)
	.attr("style", "color:lightgrey")
	.append("a")
	.attr("href", "Calendar.html")
	.on("click","return popitup('Calendar.html')")
	.attr("title", "Click to return")
	.text("JIVA DATA LOAD REPORT ANALYTICS" );
	
d3.select(".HeaderTable")
	.append("tr")
	.attr("class", "details")
	.attr("height", "5%")
	.append("td")
	//.attr("colspan",12)
	.attr("class", "ExportSection")
	//.attr("id", "currDate")
	.attr("align", "center")
	.attr("valign", "top");
	

////////////////////////// EXPORT ALL DATALOAD DATA //////////////////////
function exportAllDataload () {
console.log("exportAllDataload");
console.log("BIGDATA");
console.log(BIGDATA);
var data = [];
var dataTemp = [];
BIGDATA.forEach(function (x) {
 //console.log(x);
 x.emails.forEach(function(d,i) {
								var strError = "";
								d.Error_Msgs.forEach(function(d) {
								strError = strError + "," + d.Error_Msgs + ": " + d.Tot_Failures;
								});
								var datarow = {"SlNo.":i+1,
												"Date":x.Date,
												"Year":x.Year,
												"Time": d.TimeStamp.substring(0,2) + ":" + d.TimeStamp.substring(2,4) + ":" + d.TimeStamp.substring(4,6),
												"File": d.File_Layouts,
												"FileCat": d.File_Cat,
												"Total": parseInt(d.Tot_Records),
												"Inserts": parseInt(d.Tot_Inserts),
												"Updates": parseInt(d.Tot_Updates),
												"Failures": parseInt(d.Tot_Failures),
												"Duration_Hrs": Number(d.Tot_Duration_Hrs),
												"Errors": parseInt(d.Err_Cnt),
												"Error_Msgs": strError
												
												};
								dataTemp.push(datarow);
					});
})//BIGDATA.forEach

dataTemp.sort(function(a, b){ return d3.ascending(a.Year + a.Date + a.Time, b.Year + b.Date + b.Time); });
//dataTemp.sort(function(a, b){ return d3.descending(a.Date, b.Date); });
//dataTemp.sort(function(a, b){ return d3.descending(a.Time, b.Time); });
dataTemp.forEach (function(d,i) {
	var datarow = {	"SlNo.":i+1,
					"Date":d.Date,
					"Year":d.Year,
					"Time": d.Time,
					"File": d.File,
					"FileCat": d.FileCat,
					"Total": parseInt(d.Total),
					"Inserts": parseInt(d.Inserts),
					"Updates": parseInt(d.Updates),
					"Failures": parseInt(d.Failures),
					"Duration_Hrs": Number(d.Duration_Hrs),
					"Errors": parseInt(d.Errors),
					"Error_Msgs" : d.Error_Msgs
					};
	data.push(datarow);
});
data.sort(function(a, b){ return d3.descending(a.Year + a.Date + a.Time, b.Year + b.Date + b.Time); });		

var columns = ["SlNo.", "Date", "Year", "Time", "File", "FileCat", "Total", "Inserts","Updates", "Failures", "Duration_Hrs", "Errors", "Error_Msgs"];
						var columnStyles = ["font-size:9px;color:gray;", "font-size:9px;color:steelblue;", "font-size:9px;color:gray;", "font-size:9px;color:steelblue;","font-size:9px;color:gray;", "font-size:9px;color:gray;", "font-size:9px;color:steelblue;font-weight:bold;", "font-size:9px;color:gray;","font-size:9px;color:gray;", "font-size:9px;color:red;", "font-size:9px;color:gray;", "font-size:9px;color:red;", "font-size:9px;color:red;"];
						var columnFormat = ["", "", "", "","", "", "1", "1","1", "1", "", "", ""];
						//console.log(data);
						var tblName = "exportDataLoad";
						d3.selectAll(".exportDiv").remove();
						d3.selectAll(".ExportSection")
							.append("div")
							//.attr("style", "display:none;")
							//.attr("id", "exportDataLoad")
							//.append("tr")
							//.append("td")
							.attr("class", "exportDiv")
							//.attr("style", "overflow:auto")
							.attr("width", "500px")
							//.attr("height", "100px")
							//.attr("style", "display:none;");
						modularDataTable(columns, data, columnStyles, ".exportDiv", tblName,columnFormat);
						
/*d3.selectAll(".ExportSection")
				.append("input")
					.attr("type", "button")
					.attr("class", "button")
					.attr("value", "Export All Data Load Reports")
					//.on("click", function (){ tableToExcel("DATATABLE")}) 
					.on("click", function (){ 
							
						tableToExcel("exportDataLoad");
						});*/
					
}//function exportAllDataload () {

//exportAllDataload ();
