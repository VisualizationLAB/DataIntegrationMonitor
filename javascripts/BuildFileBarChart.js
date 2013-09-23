//Building the File Layout and Category wise bar charts

function buildFileBarChart() {

//console.log("BarChartData");

console.log(BarChartData);
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

d3.select(".SummData")
		.append("table")
		.attr("border", borderT)
		.attr("class", "SummDataDivT")
			.append("tr")
				.append("td")
					//.selectAll("svg")
					.text("TOTAL")
					//.append("svg")
					//.append("text", "TOTALS")
					.attr("style", "color:steelblue;font-weight:bold;font-size:12px;")
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
d3.selectAll(".SummDataFile").remove();

d3.select(".SummDataFileTD")
		.append("table")
		.attr("class", "SummDataFileT")
		.attr("border", borderT)
			.append("tr")
				.append("td")
					.text("TOTAL")
					.attr("style", "color:steelblue;font-weight:bold;font-size:12px;")
					.attr("valign", "bottom")
					.attr("align", "center");
					
d3.select(".SummDataFileT")
	.append("tr")
	.append("td")
		.attr("class", "SummDataFile")
					.attr("valign", "top")
					.attr("align", "center");
					
var data = d3.entries(Bar_filterCat);
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

d3.selectAll(".dataFile_err")
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
					.text("TOTAL ERRORS")
					.attr("style", "color:steelblue;font-weight:bold;font-size:12px;")
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
					.text(document.getElementById("currDate").textContent + ": File Layouts")
					.attr("style", "color:orangered;font-size:10px;")
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
					.text(document.getElementById("currDate").textContent + ": File Category")
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

//DailyDataFileTD
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
///////////////	BUILD MODULAR BAR CHARTS
function modularBarCharts (data, strC) {


var valueLabelWidth = 40; // space reserved for value labels (right)

var margin = {top: 5, right: 0, bottom: 5, left: 0},
    width = (widthBarChart - margin.left - margin.right + valueLabelWidth) *3 + 200,
    height = (10 * d3.entries(Bar_filterCatGroup).length) - margin.top - margin.bottom;

// DRAWING BAR CHART STARTS - CATEGORY WISE

//var valueLabelWidth = 40; // space reserved for value labels (right)
var barHeight = 10; // height of one bar

// space reserved for bar labels
if (strC == ".SummDataFile" || strC == ".DailyDataFile") var barLabelWidth = 110; 
else 
{	if(strC == ".errDataDiv" || strC == ".errDataDaily") var barLabelWidth = 150; 
	else var barLabelWidth = 60;
}

var barLabelPadding = 5; // padding between bar and bar labels (left)
var gridLabelHeight = 0; // space reserved for gridline labels
var gridChartOffset = 3; // space between start of grid and first bar

/*if(strC == ".SummDataFile" || strC == ".SummDataDiv") var maxBarWidth = height +25 ; // width of the bar with the max value
else var maxBarWidth = height +30 ; // width of the bar with the max value*/

var maxBarWidth = height +30 ; // width of the bar with the max value

//var maxBarWidth1 = maxBarWidth * -1
var bottomPadding = 5; // padding at bottom of chart
var gapBars = 2; // padding at bottom of chart

// accessor functions 
var barLabel = function(d) { return d.key; };
var barValue = function(d) { return parseFloat(d.value); };
 
// scales
var yScale = d3.scale.ordinal().domain(data.map(function(d) { return d.key; })).rangeRoundBands([0, data.length * barHeight], .2);
var y = function(d, i) { return yScale(i); };
var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
var x = d3.scale.linear().domain(d3.extent(data, function(d) { return d.value; })).range([0, maxBarWidth]);


// custom scal down
var scaleDown = .8;
var chart = d3.selectAll(strC).append("svg")
  .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
  .attr('height', bottomPadding + gridLabelHeight + gridChartOffset + data.length * barHeight)
  .attr("class" , strC.replace(".", "") + "C");
  
  // grid line labels
/*var gridContainer = chart.append('g')
  .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')'); 
gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
  .attr("x", x)
  .attr("dy", -3)
  .attr("text-anchor", "middle")
  .text(String);*/
  
// vertical grid lines
/*gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
  .attr("x1", x)
  .attr("x2", x)
  .attr("y1", 0)
  .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
  .style("stroke", "#ccc");*/

// bar labels
var labelsContainer = chart.append('g')
  .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')');  
labelsContainer.selectAll('text').data(data).enter().append('text')
  .attr('y', yText)
  //.attr('x', barLabelWidth)
  .attr('stroke', 'none')
  .attr('class', function (d) { var Label = "";
						if (strC == ".SummDataFile" || strC == ".DailyDataFile" || strC == ".errDataDiv" || strC == ".errDataDaily") 
							{
								Label = d.key; }
							else 
							{ 
								//console.log("getCatDesc(d.key)");
								//console.log(getCatDesc(d.key));
								Label =  getCatDesc(d.key) }
						//console.log(Label);
						return Label;
					})
	.attr('id', function (d) { var Label = "";
						if (strC == ".SummDataFile" || strC == ".DailyDataFile" || strC == ".errDataDiv" || strC == ".errDataDaily") 
							{
								Label = d.key; }
							else 
							{ 
								//console.log("getCatDesc(d.key)");
								//console.log(getCatDesc(d.key));
								Label =  getCatDesc(d.key) }
						//console.log(Label);
						return Label;
					})
  //.attr('fill', 'steelblue')
  .attr('style', function(d) {
			if (d.value > 0) {
				if (strC == ".DailyDataFile" || strC == ".DailyDataDiv" || strC == ".errDataDaily") { 
					//console.log(document.getElementById(this.id).className.baseVal); 
					//console.log(document.getElementById(this.ClassName));
					/*if(strC != ".SummDataFileC") {
					var strClass = document.getElementById(this.id).className.baseVal;
					//var others = d3.selectAll(strClass);
					var objSummLabels = d3.select(".SummDataFileC").selectAll("g")[0];
					var objSummLabels_g = objSummLabels[0].childNodes;
					//console.log(objSummLabels_g.length);
					for(var i =0; i < objSummLabels_g.length; i++ ) {
						if(objSummLabels_g[i].className.baseVal == strClass ) {
							//console.log("x.className.baseVal");
							console.log(objSummLabels_g[i].style.fill);
							objSummLabels_g[i].style.fill == 'orangered';
						}
					};
					//var objCalendar_g_children = objCalendar_g[0].children;
					}//if(strC != ".SummDataFileC")
					//document.getElementById(this.id).style.fill = 'orangered'; */
					return 'fill:orangered';
					
					} //if (strC == ".DailyDataFile" || strC == ".DailyDataDiv" || strC == ".errDataDaily")
				else { return 'fill:steelblue'} 
			}
			else return 'fill:grey';
			})
  .attr('font-weight', function(d) {if (d.value > 0) { return 'bold' } else {return '';}} )
  .attr("dy", ".35em") // vertical-align: middle
  //.attr('text-anchor', 'middle')
  .attr('text-anchor', 'end')
  .text(function (d) { var Label = "";
						if (strC == ".SummDataFile" || strC == ".DailyDataFile" || strC == ".errDataDiv" || strC == ".errDataDaily") 
							{
								Label = d.key; }
							else 
							{ 
								//console.log("getCatDesc(d.key)");
								//console.log(getCatDesc(d.key));
								Label =  getCatDesc(d.key) }
						//console.log(Label);
						return Label;
					}); 
 // } // if (strC != ".SummDataFile")
// bars
var barsContainer = chart.append('g')
 .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
 //.attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + '), rotate(-180)');
 //.attr('transform', 'translate(' + barLabelWidth + ', 180), rotate(-180)'); 
  
var rect = barsContainer.selectAll("rect").data(data).enter().append("rect")
  
  //.attr('y', y)
  .attr('y', function(d) { return yScale(d.key); })
 /* .attr("x", function(d) { 
		if (strC == ".SummDataFile" || strC == ".SummDataDiv") return x(Math.min(0, -d.value)) * scaleDown +10; 
		else return (x(Math.min(0, d.value)) * scaleDown)+10;  
		
		})*/
  .attr('height', yScale.rangeBand())
  
  .attr('width', function(d) { return x(barValue(d))* scaleDown; })
  //.attr("width", function(d) { if (strC == ".SummDataFile" || strC == ".SummDataDiv") return Math.abs(x(-d.value) - x(0)) * scaleDown; else return Math.abs(x(d.value) - x(0))* scaleDown;})
  
  .attr('stroke', 'white')
  //Chartreuse
  .attr('fill', function () { if(strC == ".DailyDataFile" || strC == ".DailyDataDiv" || strC == ".errDataDaily") {return 'Chartreuse'} else {return 'steelblue'};})
  .on('mouseover', function(){ this.style.fill = 'red'; return;} )
 .on('mouseout', function(){if(strC == ".DailyDataFile" || strC == ".DailyDataDiv" || strC == ".errDataDaily") {this.style.fill = 'Chartreuse'} else {this.style.fill = 'steelblue'};});
 
// bar value labels
barsContainer.selectAll("text").data(data).enter().append("text")
  .attr("x", function(d) { return  x(barValue(d)) * scaleDown; })
  /*.attr("x", function(d) { 
		if (strC == ".SummDataFile" || strC == ".SummDataDiv") return -1 * x(barValue(d)) * scaleDown+10; 
		else return  x(barValue(d)) * scaleDown +10; 
		})*/
  //.attr("x", function(d) { if (strC == ".SummDataFile") return x(Math.min(0, -d.value)) * scaleDown; else return x(Math.min(0, d.value)) * scaleDown;  })
  
  .attr("y", yText)
  .attr("dx", 3) // padding-left
  /*.attr("dx", function(d) { 
	if (strC == ".SummDataFile" || strC == ".SummDataDiv") return -3 ; 
	
	else return 3;} ) // padding-left*/
  
  .attr("dy", ".35em") // vertical-align: middle
  
  .attr("text-anchor", "start") // text-align: right
  //.attr("text-anchor", function(d) { if (strC == ".SummDataFile" || strC == ".SummDataDiv") return "end" ; else return "start";} )
  .attr("fill", 'steelblue')
  .attr("stroke", "none")
  .attr("font-size", "9px")
  .attr("align", "left")
  .text(function(d) { if (barValue(d) > 0 ) return addCommas(d3.round(barValue(d), 2)); });
  
  
// start lin
barsContainer.append("line")
  .attr("y1", -gridChartOffset)
  .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
  /*.attr("x1", function(d) { 
		if (strC == ".SummDataFile" || strC == ".SummDataDiv") return 10; 
		else return  10; 
		})
  .attr("x2", function(d) { 
		if (strC == ".SummDataFile" || strC == ".SummDataDiv") return 10; 
		else return  10; 
		})*/
  .style("stroke", "#000");

if (strC == ".SummDataFile" || strC == ".DailyDataFile"  || strC == ".SummDataDiv" || strC == ".errDataDaily") 
	{
		rect.append('title')
			.text(function(d) {return d.key + ": " + addCommas(d.value);});
	}
else
	{
		rect.append('title')
			.text(function(d) {return document.getElementById(select_1).textContent + " - " + getCatDesc(d.key) + ": " + addCommas(d.value);});
	}
	 
return;
	 
// DRAWING BAR CHART STARTS - CATEGORY WISE
}
/////////
