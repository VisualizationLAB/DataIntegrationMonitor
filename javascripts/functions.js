// Contains the following functionc:
//1. getDomainMax()
//2. getData()
//3. mouseOver()
//4. buildDisplayDate()
//5. buildDataview()
//6. addCommas()
//7. type()
//8. getCatDesc()
//9. getErrData()
//10. tableToExcel()
//11.modularDataTable()
//12.modularBarCharts()
//13.popitup()
//14.findPos

function type(d) {
  d.Cnt = +d.Cnt;
  return d;
}
// End of Line Chart Build
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}



function getDomainMax(val) {
switch (val)
{
case "tot":
  domainMax = d3.max(arrVol)
  break;
case "err":
  domainMax = d3.max(arrFail)
  break;
case "new":
  domainMax = d3.max(arrNew)
  break;
case "upd":
  domainMax = d3.max(arrUpd)
  break;
case "durH":
  domainMax = d3.max(arrDurHrs)
  break;
case "fileT":
  domainMax = d3.max(arrFileT)
  break;
 case "errT":
  domainMax = d3.max(arrErrT)
  break;
case "email":
  domainMax = d3.max(arrUniqueEmails)
  break;
}
//return domainMax;
}


function getData(val,opt1,opt2,opt3,opt4,opt5,opt6,opt7, opt8) {
switch (val)
{
case "tot":
  vData = opt1
  break;
case "err":
  vData = opt2
  break;
case "new":
  vData = opt3
  break;
case "upd":
  vData = opt4
  break;
case "durH":
  vData = opt5
  break;
 case "fileT":
  vData = opt6
  break;
 case "errT":
  vData = opt7
  break;
 case "email":
  vData = opt8
  break;
}
return vData;
}

function getErrData(val,failures,file_cnt,emails) {
switch (val)
{
case "tot":
  vData = failures
  break;
case "err":
  vData = failures
  break;
case "new":
  vData = failures
  break;
case "upd":
  vData = failures
  break;
case "durH":
  vData = failures
  break;
 case "fileT":
  vData = file_cnt
  break;
 case "errT":
  vData = failures
  break;
 case "email":
  vData = emails
  break;
}
return vData;
}

function mouseOver(Ind) {
			select_1 = Ind;
			var newSelecteddate = selectedDate;
			var textVal = document.getElementById(select_1).textContent;
			strSelectID  = textVal;
			d3.select("#sub_title").text(textVal);
			document.getElementById(selectedDateLast).focus();
			d3.selectAll("svg").remove();
			d3.selectAll(".svgContainer").remove();
			drawCalender(select_1, "1");
			//redrawFileBarChart();
			buildFileBarChart();
			buildSelectData(selectedDate, "", "");
			buildFileBarSelectedDataChart();
			document.getElementById(selectedDate).focus();
}



function buildDisplayDate (strDate) {

var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

var weekNames = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

var dayStr = d3.time.format("%a, %b %d %Y");
var newD = new Date(strDate);

//console.log("dayStr(strDate)");
//console.log(dayStr(strDate));
//console.log("strDate.getDay()");
//console.log(newD.getDay());
var currWeekDay = weekNames[newD.getDay()];
//console.log(currWeekDay);
var arrDate = strDate.split("-");

if (arrDate[1].substring(0,1) != "0") 
{	
	//console.log("typeof(arrDate[1]): 2");
	//console.log(typeof(arrDate[1]));
	//console.log(arrDate[1].substring(0,1) );
	var currmonth = monthNames[Number(arrDate[1])-1];
}
else 
{
	//console.log("typeof(arrDate[1]) : 1");
	//console.log(typeof(arrDate[1]));
	//console.log(arrDate[1].substring(0,1) );
	var currmonth = monthNames[Number(arrDate[1].substring(1,2))-1];
}
strDateX  = currWeekDay + ", " + currmonth + " " + arrDate[2] + " " + arrDate[0];

return strDateX;
}

function buildDataview (strDate, Ind) {

//console.log("buildDataview");
//console.log(Ind);
//try{
var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	
var d = strDate;

if (d.getDate().toString().length == 1)  {
	var curr_date = "0"+d.getDate();
}//if (d.getDate().toString().length == 1)
else var curr_date = d.getDate();

//var getDayStr = d.getDay();

var DCurrMonth = "";
var DCurrMonthInt = d.getMonth()+1;
//try{
if (Ind == "Display") { 
	DCurrMonth = monthNames[d.getMonth()];
}
else
{
	
	if (DCurrMonthInt.toString().length == 1) 
	{
		//console.log("HERER??");
		//console.log(d.getMonth());
		//console.log(d);
		//console.log(strDate);
		var curr_month = "0"+parseInt(d.getMonth()+1);
	}	
	else 
	{
		var curr_month = d.getMonth()+1; //Months are zero based
	}
}


var curr_year = d.getFullYear();
var strDateX = "";
selectedDate = curr_year + "-" + curr_month + "-" + curr_date;
//console.log(selectedDate);
if (Ind == "Display") { 
		strDateX  = DCurrMonth + " " + d.getDate() + " " + curr_year;
	}
else strDateX =  curr_year + "-" + curr_month + "-" + curr_date;
//console.log("strDate")
//console.log(strDateX)
//}
//catch(err) {}
return strDateX;
}

// get full decription of category

function getCatDesc (val) 
{
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
			fileClass = "Rx Claims"
			break;
		case "CLA":
			fileClass = "Claims"
			break;
		case "sys":
			fileClass = "Sysuser"
			break;															
	}
	return fileClass;
}
////////////////
var tableToExcel = (function() {
var uri = 'data:application/vnd.ms-excel;base64,'
, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
, base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
, format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
return function(table, name) {
if (!table.nodeType) table = document.getElementById(table)
var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
window.location.href = uri + base64(format(template, ctx))
}
})()
/////////////////
//////////////////////  MODULAR DATA TABLE ///////////////////////////
function modularDataTable (columns, data, columnStyles, strClass, tblName,columnFormat ) {
var Dtable = d3.select(strClass)
			.append("table")
				.attr("border", borderT)
				.attr("cellpadding" , cellpaddingD)
				.attr("class", tblName)
				.attr("id", tblName);
				
			Dtable.append("thead")
					.append("tr")
						.selectAll("th")
							.data(columns)
								.enter()
									.append("th")
										.text(function(column) { return column; })
										.attr("style", "color:steelblue;font-size:9px;font-weight:bold;")
										.attr("align", "left");
 
		var tbody  = //d3.select(".dataTable")
					Dtable.append("tbody");
  
		var rows = tbody.selectAll("tr")
							.data(data)
								.enter()
									.append("tr");
	
		var cells = rows.selectAll("td")
        .data(function(row) {
					//console.log(row.error);
					return columns.map(function(column, i) {
											//var dataRow = {column: column, value: addCommas(row[column]), count : i};
											var dataRow = {column: column, value: row[column], count : i};
											return dataRow;
										});//columns.map(function(column)
				})//data(function(row)
		.enter()
        .append("td")
            .text(function(d) { if(d.value == 0 ) return "";  
								else {
										if (columnFormat[d.count] == "1") return addCommas(d.value);
										else return d.value;
								}
					})
			.attr("align", "left")
			.attr("cellpadding", 0)
			//.attr("style", function (d,i) { console.log(d); console.log(i); if(d.column == "File" || d.column == "Sl." ) return "font-size:9px;color:gray;"; else return "font-size:9px;color:steelblue;";} );
			.attr("style", function (d) { return columnStyles[d.count];});

} //function modularDataTable (columns, data, columnStyle, strClass, tblName) {

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
{	if(strC == ".errDataDiv" || strC == ".errDataDaily") var barLabelWidth = 130; 
	else var barLabelWidth = 60;
}

var barLabelPadding = 5; // padding between bar and bar labels (left)
var gridLabelHeight = 0; // space reserved for gridline labels
var gridChartOffset = 3; // space between start of grid and first bar

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
  .attr('stroke', 'none')
  .attr('class', function (d) { var Label = "";
						if (strC == ".SummDataFile" || strC == ".DailyDataFile" || strC == ".errDataDiv" || strC == ".errDataDaily") 
							{
								Label = d.key; }
							else 
							{ 
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
								Label =  getCatDesc(d.key) }
						//console.log(Label);
						return Label;
					})
  .attr('style', function(d) {
			if (d.value > 0) {
				if (strC == ".DailyDataFile" || strC == ".DailyDataDiv" || strC == ".errDataDaily") { 
					return 'fill:orangered';
					
					} //if (strC == ".DailyDataFile" || strC == ".DailyDataDiv" || strC == ".errDataDaily")
				else { return 'fill:steelblue'} 
			}
			else return 'fill:grey';
			})
  .attr('font-size', "9px" )
  .attr("dy", ".35em") // vertical-align: middle
  .attr('text-anchor', 'end')
  .text(function (d) { var Label = "";
						if (strC == ".SummDataFile" || strC == ".DailyDataFile" || strC == ".errDataDiv" || strC == ".errDataDaily") 
							{
								Label = d.key; }
							else 
							{ 
								Label =  getCatDesc(d.key) }
						//console.log(Label);
						return Label;
					})//drawCalender(ind, caller)
		.on("mouseover", function(d) {
										if(strC == ".SummDataFile" || strC == ".errDataDiv") {
											this.style.fill = "red";
											filterVar = strC;
											strFilter = d.key;
											d3.select("#sub_titleFilter").text("| " + strFilter);
											drawCalender(select_1, d.key); 
										}
										else {
												if(strC == ".SummDataDiv") {
													this.style.fill = "red";
													filterVar = strC;
													strFilter = getCatDesc(d.key);
													d3.select("#sub_titleFilter").text("| " + strFilter);
													drawCalender(select_1, getCatDesc(d.key)); 
												}
										}
									})
		.on("mouseout", function(d) {
										if(strC == ".SummDataFile" || strC == ".SummDataDiv" || strC == ".errDataDiv") {
											filterVar = "";
											strFilter = "";
											d3.select("#sub_titleFilter").text(strFilter);
											drawCalender(select_1, "1");
											if (d.value > 0) this.style.fill = "steelblue";
											else this.style.fill = "grey"
											} 
			}); 
 // } // if (strC != ".SummDataFile")
// bars
var barsContainer = chart.append('g')
 .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
 
var rect = barsContainer.selectAll("rect").data(data).enter().append("rect")
  
  //.attr('y', y)
  .attr('y', function(d) { return yScale(d.key); })
  .attr('height', yScale.rangeBand())
  
  .attr('width', function(d) { return x(barValue(d))* scaleDown; })
  
  .attr('stroke', 'white')
  //Chartreuse
  .attr('fill', function () { if(strC == ".DailyDataFile" || strC == ".DailyDataDiv" || strC == ".errDataDaily") {return 'steelblue'} else {return 'steelblue'};})
  .on('mouseover', function(){ this.style.fill = 'red'; return;} )
 .on('mouseout', function(){if(strC == ".DailyDataFile" || strC == ".DailyDataDiv" || strC == ".errDataDaily") {this.style.fill = 'steelblue'} else {this.style.fill = 'steelblue'};});
 
// bar value labels
barsContainer.selectAll("text").data(data).enter().append("text")
  .attr("x", function(d) { return  x(barValue(d)) * scaleDown; })
  .attr("y", yText)
  .attr("dx", 3) // padding-left

  .attr("dy", ".35em") // vertical-align: middle
  
  .attr("text-anchor", "start") // text-align: right
  .attr("fill", 'steelblue')
  .attr("stroke", "none")
  .attr("font-size", "9px")
  .attr("align", "left")
  .text(function(d) { if (barValue(d) > 0 ) return addCommas(d3.round(barValue(d), 2)); });
  
  
// start line
barsContainer.append("line")
  .attr("y1", -gridChartOffset)
  .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
  //.style("stroke", "#000");
  .style("stroke", "grey");

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

function popitup(url) {
	//newwindow=window.open(url,'name','height=200,width=150');
	//if (window.focus) {newwindow.focus()}
	//return false;
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; 
	newwindow=window.open(url,'name','height=450,width=450,screenX=350,screenY=100,scrollbars=yes'); 
	if (is_chrome) {newwindow.parent.blur();} 
	newwindow.focus(); 
}
///// PROgress Data
function ProgressBar (){
var width = 960,
    height = 500,
    twoPi = 2 * Math.PI,
    progress = 0,
    total = 1308573, // must be hard-coded if server doesn't report Content-Length
    formatPercent = d3.format(".0%");

var arc = d3.svg.arc()
    .startAngle(0)
    //.innerRadius(180)
    //.outerRadius(240);
	.innerRadius(30)
    .outerRadius(40);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var meter = svg.append("g")
    .attr("class", "progress-meter");

meter.append("path")
    .attr("class", "background")
    .attr("d", arc.endAngle(twoPi));

var foreground = meter.append("path")
    .attr("class", "foreground");

var text = meter.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".35em");

d3.json("https://api.github.com/repos/mbostock/d3/git/blobs/2e0e3b6305fa10c1a89d1dfd6478b1fe7bc19c1e?" + Math.random())
    .on("progress", function() {
      var i = d3.interpolate(progress, d3.event.loaded / total);
      d3.transition().tween("progress", function() {
        return function(t) {
          progress = i(t);
          foreground.attr("d", arc.endAngle(twoPi * progress));
          text.text(formatPercent(progress));
        };
      });
    })
    .get(function(error, data) {
      //meter.transition().delay(250).attr("transform", "scale(0)");
	  meter.transition().delay(50).attr("transform", "scale(0)");
    });
	}//function ProgressBar (){
	
//Finds y value of given object
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}
