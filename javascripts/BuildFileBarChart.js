//Building the File Layout and Category wise bar charts

function buildFileBarChart() {

//console.log("BarChartData");
//console.log("Replacing BarChartData");
//console.log(BarChartData);
Bar_filterCat = d3.nest() // didnt FIND this declared in global variables
			.key(function(d) { return d.File_Layouts; })
			.rollup(function(d) { 
									var dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),1,parseInt(d[0].Error_Msgs),parseInt(d[0].tot_emails));
									return dataVal;
								})
			.map(BarChartData);
Bar_filterCatGroup = d3.nest() // didnt FIND this declared in global variables
			.key(function(d) { return d.Category; })
			.rollup(function(d) { 
									var dataValS = 0;
									d.forEach (function(x) {
										var dataVal = getData(select_1,parseInt(x.Tot_Records),parseInt(x.Tot_Failures),parseInt(x.Tot_Inserts),parseInt(x.Tot_Updates),Number(x.Tot_Duration_Hrs),1,parseInt(x.Error_Msgs),parseInt(x.tot_emails));
										dataValS = dataValS + dataVal;
									})
									
									return dataValS;
								})
			.map(BarChartData);
			
//console.log(d3.sortValues(SummaryData[0].Errors));
var Bar_Error = d3.nest()
			.key(function(d) { return d.Error_Msgs; })
			.rollup(function(d) { 
									//console.log(d[0].Tot_Failures);
									//var dataValS = parseInt(d[0].Tot_Failures);
									var dataValS = getErrData(select_1,parseInt(d[0].Tot_Failures),parseInt(d[0].File_Cnt),parseInt(d[0].tot_emails))
									return dataValS;
								})//.sortValues(d3.descending)
			.map(SummaryData[0].Errors);
			
BarErrChartData = Bar_Error;

d3.selectAll(".SummDataDivT").remove();
d3.selectAll(".SummDataDiv").remove();
d3.selectAll(".SummDataDivC").remove();

d3.select(".SummData")
//d3.select(".summ_row4")
		.append("table")
		.attr("border", borderT)
		.attr("class", "SummDataDivT")
			.append("tr")
				.append("td")
					//.selectAll("svg")
					.html(function() {
						return "<span style='color:grey;font-size:11px;'>Total </span>" + "<strong style = 'color:steelblue;font-weight:bold;font-size:11px;'>"+document.getElementById(select_1).textContent+"</strong> <span style='color:red;font-size:11px;'>" + selectedYr + "</span>";
						})
					//.text("TOTAL")
					//.append("svg")
					//.append("text", "TOTALS")
					//.attr("style", "color:steelblue;font-weight:bold;font-size:12px;")
					.attr("valign", "bottom")
					.attr("align", "center");
					
d3.select(".SummDataDivT")
	.append("tr")
	.append("td")
		.attr("class", "SummDataDiv")
					.attr("valign", "top")
					.attr("align", "center");
			
var data = d3.entries(Bar_filterCatGroup);
modularBarCharts (data,".SummDataDiv");


d3.selectAll(".SummDataFileT").remove();
//d3.selectAll(".SummDataFileTD").remove();
d3.selectAll(".SummDataFile").remove();
d3.selectAll(".SummDataFileC").remove();

d3.select(".SummDataFileTD")
		.append("table")
		.attr("class", "SummDataFileT")
		.attr("border", borderT)
			.append("tr")
				.append("td")
					.html(function() {
						return "<span style='color:grey;font-size:11px;'>Total </span>" + "<strong style = 'color:steelblue;font-weight:bold;font-size:11px;'>"+document.getElementById(select_1).textContent+"</strong> <span style='color:red;font-size:11px;'>" + selectedYr + "</span>";
						})
					//.attr("style", "color:steelblue;font-weight:bold;font-size:12px;")
					.attr("valign", "bottom")
					.attr("align", "center");
					
d3.select(".SummDataFileT")
	.append("tr")
	.append("td")
		.attr("class", "SummDataFile")
					.attr("valign", "top")
					.attr("align", "center");
					
var data = d3.entries(Bar_filterCat);
//console.log("data")
//console.log(data)
modularBarCharts (data, ".SummDataFile" );
/////////////////////////////////// ERROR BARS

d3.select(".errDataDivT").remove();
d3.select(".errDataDivTD").remove();
d3.select(".errDataDiv").remove();
d3.selectAll(".errDataDivC").remove();
d3.select(".errDataDailyROW").remove();
d3.select(".errDataDaily").remove();
d3.selectAll("svg")
			.select(".errDataDailyC").remove();
			
if(select_1 == "err" || select_1 == "email" || select_1 == "fileT") {

//d3.selectAll(".dataFile_err")
d3.selectAll(".dataTableSumm")
//d3.selectAll(".CalSumm")
	.append("td")
    .attr("class", "errDataDivTD")
	.attr("valign", "top")
	.attr("align", "left");
	
d3.select(".errDataDivTD")
	.attr("valign", "top")
	.attr("align", "left")
		.append("table")
		.attr("class", "errDataDivT")
		.attr("border", borderT)
			.append("tr")
				.append("td")
					//.text("TOTAL ERRORS")
					.html(function() {
						return "<span style='color:grey;font-size:11px;'>Errors </span><strong style = 'color:steelblue;font-weight:bold;font-size:11px;'>" +document.getElementById(select_1).textContent+ " </strong><span style='color:red;font-size:11px;'>" + selectedYr + "</span>";
					})
					//.attr("style", "color:steelblue;font-weight:bold;font-size:12px;")
					.attr("valign", "bottom")
					.attr("align", "center");
		
d3.select(".errDataDivT")
	.append("tr")
		.append("td")
			.attr("class", "errDataDiv")
			.attr("valign", "top")
			.attr("align", "right");
					
var data = d3.entries(Bar_Error);
modularBarCharts (data, ".errDataDiv" );
	} //if(select_1 == "err" || select_1 == "email" || select_1 == "fileT") {

}
////////////////////////////////////	FOR SELECTED DATA /////

function buildFileBarSelectedDataChart() {
//console.log("SelectedData");
//console.log(SelectedData);

var strFile ="";
var BarChartDataSelectTEMP = [];
if(SelectedData != "") BarChartDataSelectTEMP = SelectedData[0].Files;
BarChartDataSelect = [];
d3.entries(Bar_filterCat).forEach(function(d) {
	//console.log(d.key)
	var tot_rec = 0;
		var tot_upd = 0;
		var tot_new = 0;
		var tot_err = 0;
		var durH = 0.00;
		var email = 0;
		var Err_Cnt = 0;
	BarChartDataSelectTEMP.forEach (function(x) {
		if(d.key == x.File_Layouts){
			tot_rec = parseInt(x.Tot_Records);
			tot_err = parseInt(x.Tot_Failures);
			tot_upd = parseInt(x.Tot_Updates);
			tot_new = parseInt(x.Tot_Inserts);
			durH = d3.round(Number(x.Tot_Duration_Hrs),2);
			email = parseInt(x.tot_emails);
			Err_Cnt = parseInt(x.Errors_cnt);
		}
	})//BarChartDataSelectTEMP.forEach
	
	var datarow = { 	"File_Layouts" : d.key,
						"Category" : d.key.substring(0,3),
						"Tot_Records" :  tot_rec,
						"Tot_Inserts" : tot_new,
						"Tot_Updates" : tot_upd,
						"Tot_Failures" : tot_err,
						"Tot_Duration_Hrs" : durH,
						"tot_emails" : email,
						"failPct" : parseFloat(tot_err/tot_rec),
						"Error_Msgs" : Err_Cnt
						
					 }
	BarChartDataSelect.push(datarow);

})

//console.log("BarChartDataSelect");
//console.log(BarChartDataSelect);

BarDaily_filterCat = d3.nest()
			.key(function(d) { return d.File_Layouts; })
			.rollup(function(d) { 
									if(d[0].tot_emails > 0) var dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),1,parseInt(d[0].Error_Msgs),parseInt(d[0].tot_emails));
									else var dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),0,parseInt(d[0].Error_Msgs),parseInt(d[0].tot_emails));
									return dataVal;
								})
			.map(BarChartDataSelect);
	
BarDaily_filterCatGroup = d3.nest()
			.key(function(d) { return d.Category; })
			.rollup(function(d) { 
									var dataValS = 0;
									d.forEach (function(x) {
										if(x.tot_emails > 0) var dataVal = getData(select_1,parseInt(x.Tot_Records),parseInt(x.Tot_Failures),parseInt(x.Tot_Inserts),parseInt(x.Tot_Updates),Number(x.Tot_Duration_Hrs),1,parseInt(x.Error_Msgs),parseInt(x.tot_emails));
										else var dataVal = getData(select_1,parseInt(x.Tot_Records),parseInt(x.Tot_Failures),parseInt(x.Tot_Inserts),parseInt(x.Tot_Updates),Number(x.Tot_Duration_Hrs),0,parseInt(x.Error_Msgs),parseInt(x.tot_emails));
										dataValS = dataValS + dataVal;
									})
									
									return dataValS;
								})
			.map(BarChartDataSelect);

d3.selectAll(".DailyDataFileT").remove();
d3.selectAll(".DailyDataFile").remove();
d3.selectAll(".DailyDataFileTDC").remove();

d3.select(".DailyDataFileTD")
		.append("table")
		.attr("class", "DailyDataFileT")
		.attr("border", borderT)
			.append("tr")
				.append("td")
					//.text(document.getElementById("currDate").textContent + ": File Layouts")
					.html(function() {
							return "<span style='color:grey;font-size:10px;'>File Layouts </span><span style='color:steelblue;font-size:11px;font-weight:bold;'>" + document.getElementById("currDate").textContent + "</span>";
					})
					//.attr("style", "color:orangered;font-size:10px;")
					.attr("valign", "bottom")
					.attr("align", "center");
					
d3.select(".DailyDataFileT")					
			.append("tr")
				.append("td")		
					.attr("class", "DailyDataFile")
					.attr("valign", "top")
					.attr("align", "left");
					
var data = d3.entries(BarDaily_filterCat);
modularBarCharts (data, ".DailyDataFile" );

// build Daily Summary data
d3.selectAll(".DailyDataDivT").remove();
d3.selectAll(".DailyDataDiv").remove();
d3.selectAll(".DailyDataDivC").remove();

d3.select(".DailyData")
		.append("table")
		.attr("class", "DailyDataDivT")
		.attr("border", borderT)
			.append("tr")
				.append("td")
					.html(function() {
							return "<span style='color:grey;font-size:10px;'>File Category </span><span style='color:steelblue;font-size:11px;font-weight:bold;'>" + document.getElementById("currDate").textContent + "</span>";
					})
					//.text(document.getElementById("currDate").textContent + ": File Category")
					.attr("style", "color:orangered;font-size:10px;")
					.attr("valign", "bottom")
					.attr("align", "center");
					
d3.select(".DailyDataDivT")					
			.append("tr")
				.append("td")						
					.attr("class", "DailyDataDiv")
					.attr("valign", "top")
					.attr("align", "left");
					
var data = d3.entries(BarDaily_filterCatGroup);
modularBarCharts (data, ".DailyDataDiv" );

if(select_1 == "err" || select_1 == "email" || select_1 == "fileT") barErrSelectedData ();
else showDataTable();

//DailyDataFileTD
}
////////// SHOW DATA TABLE /////////////////////////////
function showDataTable(){

d3.select(".errDataDivT").remove();
d3.select(".errDataDivTD").remove();
d3.select(".errDataDiv").remove();
d3.selectAll(".errDataDivC").remove();
d3.select(".errDataDailyROW").remove();
d3.select(".errDataDaily").remove();
d3.selectAll("svg")
			.select(".errDataDailyC").remove();
			
var data = [];
var dataTemp = [];
if(SelectedData != "") 
{
 //if(parseInt(SelectedData[0].File_Layouts) != parseInt(SelectedData[0].emails.length)) {
 SelectedData[0].emails.forEach(function(d,i) {
								/*var datarow = {"SlNo.":i+1,
												"File": d.TimeStamp.substring(0,2) + ":" + d.TimeStamp.substring(2,4) + ":" + d.TimeStamp.substring(4,6) + " "  + d.File_Layouts ,
												"Total": parseInt(d.Tot_Records),
												"Inserts": parseInt(d.Tot_Inserts),
												"Updates": parseInt(d.Tot_Updates),
												"Failures": parseInt(d.Tot_Failures),
												"Duration(Hrs)": Number(d.Tot_Duration_Hrs),
												"Errors": parseInt(d.Err_Cnt)
								};*/
								var dataVal = getData(select_1,parseInt(d.Tot_Records),parseInt(d.Tot_Failures),parseInt(d.Tot_Inserts),parseInt(d.Tot_Updates),Number(d.Tot_Duration_Hrs),1,parseInt(d.Error_Msgs),parseInt(d.tot_emails));
								var datarow = {"Sl.":i+1,
												"Time": d.TimeStamp.substring(0,2) + ":" + d.TimeStamp.substring(2,4) + ":" + d.TimeStamp.substring(4,6),
												"File": d.File_Layouts,
												"Value": dataVal};
								dataTemp.push(datarow);
	
});

dataTemp.sort(function(a, b){ return d3.ascending(a.Time, b.Time); });
dataTemp.forEach (function(d,i) {
	var datarow = {"Sl.":i+1,
					"Time": d.Time,
					"File": d.File,
					"Value": d.Value};
	data.push(datarow);
});

//var columns = ["SlNo.", "File", "Total", "Inserts", "Updates", "Failures", "Duration(Hrs)","Errors"];
///// DRAW DATA TABLE SECTION /////// START

d3.selectAll(".dataTableSumm")
	.append("td")
    .attr("class", "errDataDivTD")
	.attr("valign", "bottom")
	.attr("style", "overflow:auto;")
	.attr("align", "left");

	var tblName = 	"dataTable";	
d3.selectAll(".downloadBtn").remove();				
d3.select(".errDataDivTD")
	.attr("valign", "bottom")
	.attr("align", "left")
		.append("table")
		//.attr("id", "DATATABLE")
		.attr("id", tblName)
		.attr("class", "errDataDivT")
		.attr("height" ,"auto")
		.attr("border", borderT)
			.append("tr")
				.append("td")
				.attr("valign", "bottom")
				.text("DATA LOAD TIME SEQUENCE")
					.attr("style", "color:grey;font-size:10px;font-weight:bold;")
					.attr("valign", "bottom")
					.attr("align", "center");	

					
d3.select(".errDataDivT")
	.append("tr")
		.append("td")			
		.text(document.getElementById("currDate").textContent +" : "+document.getElementById(select_1).textContent)
					.attr("style", "color:steelblue;font-size:9px;font-weight:none;")
					.attr("valign", "bottom")
					.attr("align", "center");

//var tblName = 	"dataTable";				
d3.selectAll(".errDataDivT")
	.append("tr")
	.attr("class", "downloadBtn")
		.append("td")
		.attr("cellpadding", 4)
				.append("input")
					.attr("type", "button")
					.attr("class", "button")
					.attr("value", "Export")
					//.on("click", function (){ tableToExcel("DATATABLE")}) 
					.on("click", function (){ tableToExcel(tblName)})
					
d3.select(".errDataDivT")
	.append("tr")
		.append("td")
			.attr("height" ,50)
			.attr("class", "errDataDiv")
			.attr("valign", "top")
			.attr("align", "right");
					
var columns = ["Sl.", "Time", "File", "Value"];
var columnStyles = ["font-size:9px;color:gray;", "font-size:9px;color:steelblue;", "font-size:9px;color:gray;", "font-size:9px;color:steelblue;"];
var columnFormat = ["", "", "", "1"];
modularDataTable(columns, data, columnStyles, ".errDataDiv", tblName, columnFormat);
///// DRAW DATA TABLE SECTION /////// END
			
//}//if(parseInt(SelectedData[0].File_Layouts) != parseInt(SelectedData[0].emails.length)) {
}//if(SelectedData != "") 
}

///////// BUILD DATA FOR SELECTED DAY ERROR INFO ///////
function barErrSelectedData (){
var Bar_Error = [];
	if(SelectedData != "") {
		if(SelectedData[0].Error_Msgs >0) 
		{
			Bar_Error = d3.nest()
			.key(function(d) { return d.Error_Msgs; })
			.rollup(function(d) { 
									var dataValS = getErrData(select_1,parseInt(d[0].Tot_Failures),parseInt(d[0].File_Cnt),parseInt(d[0].tot_emails))
									return dataValS;
								})//.sortValues(d3.descending)
			.map(SelectedData[0].Errors);
			
			BarErrChartData = Bar_Error;
		}
	};
	
	d3.select(".errDataDaily").remove();
	d3.select(".errDataDailyC").remove();
	d3.select(".errDataDailyROW").remove();
	d3.select(".errDataDailyROW2").remove();
	d3.select(".errDataDailyText").remove();
	
if(Bar_Error != "" ) {	
	d3.select(".errDataDivT")
		.append("tr")
				.attr("class", "errDataDailyROW")
				.append("td")
					.attr("class", "errDataDailyText")
					.text(document.getElementById("currDate").textContent + ": ERRORS")
					.attr("style", "color:orangered;font-size:10px;")
					.attr("valign", "bottom")
					.attr("align", "center");
					
	d3.select(".errDataDivT")
		.append("tr")
			.attr("class", "errDataDailyROW2")
			.append("td")
				.attr("class", "errDataDaily")
				.attr("valign", "top")
				.attr("align", "right");
					
	var data = d3.entries(Bar_Error);
	modularBarCharts (data, ".errDataDaily" );
	}//if(Bar_Error.length > 0 ) {	
}
/////////////

