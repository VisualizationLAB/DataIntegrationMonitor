//Building the File Layout and Category wise bar charts

function buildFileBarChart() {

//console.log("BarChartData");
//console.log(BarChartData);
Bar_filterCat = d3.nest()
			.key(function(d) { return d.File_Layouts; })
			.rollup(function(d) { 
									var dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),0,0,parseInt(d[0].tot_emails));
									return dataVal;
								})
			.map(BarChartData);
			
//console.log("Bar_filterCat");
//console.log(Bar_filterCat);
	
Bar_filterCatGroup = d3.nest()
			.key(function(d) { return d.Category; })
			.rollup(function(d) { 
									var dataValS = 0;
									d.forEach (function(x) {
										var dataVal = getData(select_1,parseInt(x.Tot_Records),parseInt(x.Tot_Failures),parseInt(x.Tot_Inserts),parseInt(x.Tot_Updates),Number(x.Tot_Duration_Hrs),0,0,parseInt(x.tot_emails));
										dataValS = dataValS + dataVal;
									})
									
									return dataValS;
								})
			.map(BarChartData);
//console.log("Bar_filterCatGroup");
//console.log(Bar_filterCatGroup);
//console.log(Bar_filterCatGroup.length);
//console.log(typeof(Bar_filterCatGroup));
//console.log(d3.keys(Bar_filterCatGroup));
//console.log(d3.values(Bar_filterCatGroup));
//console.log(d3.entries(Bar_filterCatGroup));


d3.selectAll(".SummDataDivT").remove();
d3.selectAll(".SummDataDiv").remove();

d3.select(".SummData")
		.append("table")
		.attr("border", borderT)
		.attr("class", "SummDataDivT")
			.append("tr")
				.append("td")
					.text("TOTAL")
					.attr("style", "color:steelblue;font-weight:bold;font-size:12px;")
					.attr("valign", "bottom")
					.attr("align", "center");
					
d3.select(".SummDataDivT")
	.append("tr")
	.append("td")
		.attr("class", "SummDataDiv")
		//.attr("fill", "steelblue;")
					.attr("valign", "top")
					.attr("align", "center");
			
var data = d3.entries(Bar_filterCatGroup);
//var chart = d3.selectAll(".SummDataDiv");
modularBarCharts (data,".SummDataDiv");


d3.selectAll(".SummDataFileT").remove();
d3.selectAll(".SummDataFile").remove();

d3.select(".SummDataFileTD")
		.append("table")
		.attr("class", "SummDataFileT")
		.attr("border", borderT)
			.append("tr")
				.append("td")
					.text("TOTAL: File Layouts")
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
}
////////////////////////////////////	FOR SELECTED DATA /////

function buildFileBarSelectedDataChart() {

console.log("buildFileBarSelectedDataChart");
console.log(d3.entries(Bar_filterCat));
console.log(Bar_filterCat);
var strFile ="";
var BarChartDataSelectTEMP = [];
BarChartDataSelect = [];
SelectedData.forEach(function(d){
	//console.log(d.emails);
	d.emails.forEach(function(x){
		if (strFile.indexOf(x.File_Layouts) == -1 && (x.File_Layouts !="") ) strFile = strFile + x.File_Layouts + "|";
	});//d.emails.forEach(function(x){
	
	if (typeof(strFile) == "string") {
		var arrFileLayout = strFile.split("|");
		arrFileLayout.forEach( function(x) {
				if (x != "") 
				{
					var tot_rec = 0;
					var tot_upd = 0;
					var tot_new = 0;
					var tot_err = 0;
					var durH = 0.00;
					var email = 0;
					d.emails.forEach ( function(y) {
						if (y.File_Layouts == x) {
							tot_rec = tot_rec + parseInt(y.Tot_Records);
							tot_err = tot_err + parseInt(y.Tot_Failures);
							tot_upd = tot_upd + parseInt(y.Tot_Updates);
							tot_new = tot_new + parseInt(y.Tot_Inserts);
							durH = durH + d3.round(Number(y.Tot_Duration_Hrs),2);
							email = email +1;
							}
						})		
					var datarow = { "File_Layouts" : x,
									"Category" : x.substring(0,3),
									"Tot_Records" :  tot_rec,
									"Tot_Inserts" : tot_new,
									"Tot_Updates" : tot_upd,
									"Tot_Failures" : tot_err,
									"Tot_Duration_Hrs" : durH,
									"tot_emails" : email,
									"failPct" : parseFloat(tot_err/tot_rec)
									}
					BarChartDataSelectTEMP.push(datarow);
				}
			})
		}
	
});//SelectedData.forEach

//BarChartDataSelect
//BarChartDataSelectTEMP
d3.entries(Bar_filterCat).forEach(function(d) {
	console.log(d.key)
	var tot_rec = 0;
		var tot_upd = 0;
		var tot_new = 0;
		var tot_err = 0;
		var durH = 0.00;
		var email = 0;
	BarChartDataSelectTEMP.forEach (function(x) {
		if(d.key == x.File_Layouts){
			tot_rec = parseInt(x.Tot_Records);
			tot_err = parseInt(x.Tot_Failures);
			tot_upd = parseInt(x.Tot_Updates);
			tot_new = parseInt(x.Tot_Inserts);
			durH = d3.round(Number(x.Tot_Duration_Hrs),2);
			email = parseInt(x.tot_emails);
		}
	})//BarChartDataSelectTEMP.forEach
	
	var datarow = { "File_Layouts" : d.key,
						"Category" : d.key.substring(0,3),
						"Tot_Records" :  tot_rec,
						"Tot_Inserts" : tot_new,
						"Tot_Updates" : tot_upd,
						"Tot_Failures" : tot_err,
						"Tot_Duration_Hrs" : durH,
						"tot_emails" : email,
						"failPct" : parseFloat(tot_err/tot_rec)
					 }
	BarChartDataSelect.push(datarow);

})

	
BarDaily_filterCat = d3.nest()
			.key(function(d) { return d.File_Layouts; })
			.rollup(function(d) { 
									var dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),0,0,parseInt(d[0].tot_emails));
									return dataVal;
								})
			.map(BarChartDataSelect);
			
console.log("BarDaily_filterCat");
console.log(BarDaily_filterCat);
	
BarDaily_filterCatGroup = d3.nest()
			.key(function(d) { return d.Category; })
			.rollup(function(d) { 
									var dataValS = 0;
									d.forEach (function(x) {
										var dataVal = getData(select_1,parseInt(x.Tot_Records),parseInt(x.Tot_Failures),parseInt(x.Tot_Inserts),parseInt(x.Tot_Updates),Number(x.Tot_Duration_Hrs),0,0,parseInt(x.tot_emails));
										dataValS = dataValS + dataVal;
									})
									
									return dataValS;
								})
			.map(BarChartDataSelect);
			
console.log("BarDaily_filterCatGroup");
console.log(BarDaily_filterCatGroup);

d3.selectAll(".DailyDataFileT").remove();
d3.selectAll(".DailyDataFile").remove();
d3.selectAll(".DailyDataFileTDC").remove();

d3.select(".DailyDataFileTD")
		.append("table")
		.attr("class", "DailyDataFileT")
		.attr("border", borderT)
			.append("tr")
				.append("td")
					.text("TODAY: File Layouts")
					.attr("style", "color:orangered;font-weight:bold;font-size:12px;")
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
					.text("TODAY")
					.attr("style", "color:orangered;font-weight:bold;font-size:12px;")
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


//DailyDataFileTD
}
///////////////	
function modularBarCharts (data, strC) {


var valueLabelWidth = 40; // space reserved for value labels (right)

var margin = {top: 5, right: 10, bottom: 5, left: 5},
    width = (widthBarChart - margin.left - margin.right + valueLabelWidth) *3 + 200,
    height = (10 * d3.entries(Bar_filterCatGroup).length) - margin.top - margin.bottom;

//console.log("SummDataDiv");
//console.log(SummDataDiv);
//console.log("d3.max(Bar_filterCatGroup)");
//console.log(d3.max(d3.values(Bar_filterCatGroup)));

// DRAWING BAR CHART STARTS - CATEGORY WISE


//var valueLabelWidth = 40; // space reserved for value labels (right)
var barHeight = 10; // height of one bar

// space reserved for bar labels
if (strC == ".SummDataFile" || strC == ".DailyDataFile" ) var barLabelWidth = 110; 
else var barLabelWidth = 60; 

var barLabelPadding = 5; // padding between bar and bar labels (left)
var gridLabelHeight = 0; // space reserved for gridline labels
var gridChartOffset = 3; // space between start of grid and first bar
var maxBarWidth = height  +30; // width of the bar with the max value
var bottomPadding = 5; // padding at bottom of chart
var gapBars = 2; // padding at bottom of chart

// accessor functions 
var barLabel = function(d) { return d.key; };
var barValue = function(d) { return parseFloat(d.value); };
 
// scales
var yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);
var y = function(d, i) { return yScale(i); };
var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
var x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, maxBarWidth]);

// custom scal down
var scaleDown = .8;
// svg container element
//var chart = d3.select('#chart').append("svg")
//var chart = d3.selectAll(".SummDataDiv").append("svg")

//console.log("strC");
//console.log(strC);
var chart = d3.selectAll(strC).append("svg")
  .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
  .attr('height', bottomPadding + gridLabelHeight + gridChartOffset + data.length * barHeight)
  .attr("class" , strC.replace(".", "") + "C");

  //console.log(chart)
  
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
  .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')')
  //.append("table")
  //.attr("border" , borderT)
  //.append("tr")
 // .append("td"); 
  
labelsContainer.selectAll('text').data(data).enter().append('text')
  .attr('y', yText)
  .attr('stroke', 'none')
  .attr('id', function (d) { var Label = "";
						if (strC == ".SummDataFile" || strC == ".DailyDataFile" ) 
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
  .attr('fill', function(d) {
			if (d.value > 0) {
				if (strC == ".DailyDataFile" || strC == ".DailyDataDiv") { 
					//console.log("class :" + this.id); 
					//document.getElementById(this.id).style.fill = 'orangered'; 
					return 'orangered' } 
				else { return 'steelblue'} 
			}
			else return 'grey';
			})
  .attr('font-weight', function(d) {if (d.value > 0) { return 'bold' } else {return '';}} )
  .attr("dy", ".35em") // vertical-align: middle
  .attr('text-anchor', 'end')
  .text(function (d) { var Label = "";
						if (strC == ".SummDataFile" || strC == ".DailyDataFile" ) 
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
  
// bars
var barsContainer = chart.append('g')
  .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
  
var rect = barsContainer.selectAll("rect").data(data).enter().append("rect")
  .attr('y', y)
  .attr('height', yScale.rangeBand())
  .attr('width', function(d) { return x(barValue(d)) * scaleDown; })
  .attr('stroke', 'white')
  .attr('fill', function () { if(strC == ".DailyDataFile" || strC == ".DailyDataDiv") {return 'steelblue'} else {return 'grey'};})
  .on('mouseover', function(){ this.style.fill = 'red'; return;} )
 .on('mouseout', function(){if(strC == ".DailyDataFile" || strC == ".DailyDataDiv") {this.style.fill = 'steelblue'} else {this.style.fill = 'grey'};});
 
// bar value labels
barsContainer.selectAll("text").data(data).enter().append("text")
  .attr("x", function(d) { return x(barValue(d)) * scaleDown; })
  .attr("y", yText)
  .attr("dx", 3) // padding-left
  .attr("dy", ".35em") // vertical-align: middle
  .attr("text-anchor", "start") // text-align: right
  .attr("fill", 'steelblue')
  .attr("stroke", "none")
  .attr("font-size", "9px")
  .text(function(d) { if (barValue(d) > 0 ) return addCommas(d3.round(barValue(d), 2)); });
// start line
barsContainer.append("line")
  .attr("y1", -gridChartOffset)
  .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
  .style("stroke", "#000");

if (strC == ".SummDataFile" || strC == ".DailyDataFile" ) 
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
