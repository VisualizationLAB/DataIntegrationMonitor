// Summary ANNUAl TREND CHART
function LineChartData(){

//console.log("allDays");
lineData = [];

DateArr = d3.nest()
			//.key(function(d) { if( d.Day ! = "undefined") {var strDate = d.Day; console.log(strDate); if(strDate.indexOf(selectedYr) != -1) return d.day; }})
			//.key(function(d) { if(d.day.substring(0,4) == selectedYr) return d.day; })
			.key(function(d) { return d.day; })
			.rollup(function(d) {return 0;})
			.map(allDays);
//console.log("DateArr");
//console.log(DateArr);
DateArrCumm = d3.nest()
			.key(function(d) { return d.day; })
			.rollup(function(d) { return 0;})
			.map(allDays);



//////////////////////////////////////
var finalCnt = 0;


for(var y in DateArr) {
	for (var z in dataBIG) {
			if (y == z) 
			{
				DateArr[y] = dataBIG[z];
				finalCnt = finalCnt + dataBIG[z];
			}
		}
	DateArrCumm[y] = finalCnt;
	var format = d3.time.format("%Y-%m-%d");
	var formatYr = d3.time.format("%Y");
	var strVal = document.getElementById(select_1).textContent;
	var strDate = "";
	strDate = format.parse(y);
	
	var datarow = { "date" : format.parse(y)
					,"Cnt" : DateArr[y]
					,"year" : strDate.getFullYear()
		}
	//console.log(strDate.getFullYear() +"|" + selectedYr)
	//console.log(strDate.getFullYear() == selectedYr)
	if(strDate.getFullYear() == selectedYr) lineData.push(datarow);
	}
//console.log(DateArr);
//console.log(DateArrCumm);
//console.log("lineData");
//console.log(lineData);

d3.selectAll(".lineChart").remove();
d3.selectAll(".TrendChart").remove();
var scaleDown = 0.5;
var margin = {top: 20, right: 60, bottom: 20, left: 30},
	width = (widthLine - margin.left - margin.right) * scaleDown,
    height = (heightLine - margin.top - margin.bottom) * scaleDown;

var parseDate = d3.time.format("%Y%m%d").parse;



var formatPercent = d3.format(".0%");

var x = d3.time.scale()
	.domain([new Date(lineData[0].date), d3.time.day.offset(new Date(lineData[lineData.length - 1].date), 1)])
    .range([0, width/300]);

var y = d3.scale.linear()
	.domain([0, d3.max(lineData, function(d) { return d.Cnt; })])
    .range([height, 0]);

var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.tickFormat(d3.time.format('%b'));
	
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Records:</strong> <span style='color:red'>" + d.Cnt + "</span>";
  })	
  

d3.select("#DivlineChart1")
	.append("table")
	.attr("border" , borderT)
	.attr("class" , "TrendChart")
	.append("tr")
	.append("td")
	.attr("align", "center")
	.html(function() {
    return "<span style='color:grey;font-size:11px;'>Annual Trend Bar Chart for </span>" + "<strong style = 'color:steelblue;font-weight:bold;font-size:11px;'>"+document.getElementById(select_1).textContent+"</strong> <span style='color:red;font-size:11px;'>" + selectedYr + "  </span><span style='color:steelblue;font-size:10px;'>  "+strFilter+"</span>";
		})
	//.text("ANNUAL TREND BAR CHART FOR " + document.getElementById(select_1).textContent + ":" + selectedYr)
	//.attr("style", "color:steelblue;font-size:12px;align:center;font-weight:bold;")
	
var svg = d3.select(".TrendChart")
	.append("tr")
	.append("td")
	.attr("align", "center")
	.append("svg")
	.attr("class" , "lineChart")
    //.attr("width", (width + margin.left + margin.right) * 1.05)
	.attr("width", width + margin.left + margin.right)
    //.attr("height", height + margin.top + margin.bottom)
	.attr("height", height+ margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
x.domain(lineData.map(function(d) { return d.date; }));
y.domain([0, d3.max(lineData, function(d) { return d.Cnt; })]);
	
svg.call(tip);

svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

/*svg.append("text")
        .attr("x", (width / 2))             
		.attr("y", 0 - (height/30))
        .attr("text-anchor", "middle") 
        .text("ANNUAL TREND BAR CHART FOR " + document.getElementById(select_1).textContent);*/
	
var objCalendar = d3.select(".RdYlGn").selectAll(".rect")[0].parentNode;
var objCalendar_g = objCalendar.children;
var objCalendar_g_children = objCalendar_g[0].children;
		
 var rect = svg.selectAll(".bar")
      .data(lineData)
    .enter().append("rect")
      .attr("class", "bar")
	  .attr("id", function(d) { return buildDataview (d.date, "");})
      .attr("x", function(d) { //console.log(x(d.date)); 
		return parseInt(x(d.date)); })
	  .attr("width", widthbar)
      .attr("y", function(d) { return y(d.Cnt); })
      .attr("height", function(d) { return height - y(d.Cnt); })
	  .on('mouseover', function(d) {
	  
		this.style.fill = "red";
		for(var i =0; i < objCalendar_g_children.length; i++ ) {
				objCalendar_g_children[i].style.outline = "";
				objCalendar_g_children[i].style.outlineColor  = "";
				objCalendar_g_children[i].style.outlineWidth = "";
			}
		var ClassNameSelected;
		
		for(var i =0; i < objCalendar_g_children.length; i++ ) {
			if (objCalendar_g_children[i].id == buildDataview(d.date, "")) {
				objCalendar_g_children[i].style.outline = "solid";
				objCalendar_g_children[i].style.outlineColor  = "red";
				objCalendar_g_children[i].style.outlineWidth = "1px";
				ClassNameSelected = objCalendar_g_children[i].className.baseVal;
				ClassNameSelected = ClassNameSelected.replace("day ", "");
			 }
			}
		var objLegend = d3.select(".legend").selectAll(".rect")[0].parentNode;
		var objLegend_g = objLegend.children;
		for(var i =0; i < objLegend_g.length; i++ ) {
			if(objLegend_g[i].children[0].id == ClassNameSelected) {
			//console.log(objLegend_g[i].children[0].id)
			objLegend_g[i].children[0].style.outline = "solid";
			objLegend_g[i].children[0].style.outlineColor  = "red";
			objLegend_g[i].children[0].style.outlineWidth = "1px";
			}
		}
			
		buildSelectData(buildDataview (d.date, ""),"","");})
   .on('mouseout', function(d){
	  
		//this.style.fill = "rgba(0,0,255,0.9)";
		this.style.fill = "steelblue";
		for(var i =0; i < objCalendar_g_children.length; i++ ) {
			if (objCalendar_g_children[i].id == buildDataview(d.date, "")) {
				objCalendar_g_children[i].style.outline = "";
				objCalendar_g_children[i].style.outlineColor  = "";
				objCalendar_g_children[i].style.outlineWidth = "";
			 }
			}

		var objLegend = d3.select(".legend").selectAll(".rect")[0].parentNode;
		var objLegend_g = objLegend.children;

		for(var i =0; i < objLegend_g.length; i++ ) {
			objLegend_g[i].children[0].style.outline = "";
			objLegend_g[i].children[0].style.outlineColor  = "";
			objLegend_g[i].children[0].style.outlineWidth = "";
			//}
		}
		
		})
		
rect.append("title")
	.text(function(d) {return document.getElementById(select_1).textContent + " - " + buildDataview (d.date, "") + ": " + addCommas(d.Cnt);});
	

}
