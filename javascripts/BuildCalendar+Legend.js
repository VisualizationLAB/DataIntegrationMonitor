// BUILD CALENDER AND LEGEND
// The drawCalender() function has the buildLegend() function and the monthPath() functions inside it.

function drawCalender(ind, caller) {

	d3.selectAll("svgContainer").remove();
	allDays = [];
	var d = new Date();

	dataBIG = d3.nest()
			.key(function(d) { return d.Date; })
			.rollup(function(d) { 
									var dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),parseInt(d[0].File_Cnt),parseInt(d[0].Err_Cnt),parseInt(d[0].tot_unique_emails));
									return dataVal;
								})
			.map(BIGDATA);
	getDomainMax(select_1,"domainMax");
	var color = d3.scale.quantize()
					.domain([domainMin,domainMax])
					.range(d3.range(arrayRange-1).map(function(d) { 
							var strVal = "";
							if (select_1 == "err" || select_1 == "durH" ||  select_1 == "errT" ) 
							{ 
								strVal = "qE" + d + "-11";
							}
							else 
							{
								strVal = "q" + d + "-11";
							}
							return strVal; 
							}
							
							));
	var svg = d3.select(".C4").selectAll("svg")
				.data(d3.range(calendarStart, calendarEnd))
				.enter().append("tr")
					.attr("class" , "svgContainer")
					.append("td")
					.append("svg")
					.attr("width", widthCalendar)
					.attr("height", heightCalendar)
					.attr("class", "RdYlGn")
					.append("g")
						.attr("transform", "translate(" + ((width - cellSize * 60) / 2) + "," + (height - cellSize * 8 - 1) + ")");

	var yYearLabel = cellSize * 3.5 - verticalCalendarOffset;
	var xYearLabel = -6-horizontalCalendarOffset;

	svg.append("text")
		.attr("transform", "translate(" + xYearLabel + "," + yYearLabel + ")rotate(-90)")
		.style("text-anchor", "middle")
		.text(function(d) { return d; });
	

	var rect = svg.selectAll(".day")
					.data(function(d) { 
							return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); 
						})
					.enter()
					.append("rect")
					.attr("class", "day")
					.attr("width", cellSize)
					.attr("height", cellSize)
					.on("mouseover", function(d) { 
							selectedDateLast = d;
							d3.selectAll("rect").classed("active", false)
							d3.select(this).classed("active", true)
							var ClassNameSelected = this.className.baseVal;
							if (ClassNameSelected == "day" || ClassNameSelected == "day active") ClassNameSelected = ClassNameSelected.replace(" active", "");
							var objLegend = d3.select(".legend").selectAll(".rect")[0].parentNode;
							var objLegend_g = objLegend.children;
							for(var i =0; i < objLegend_g.length; i++ ) {
									if(objLegend_g[i].children[0].id == ClassNameSelected) {
										objLegend_g[i].children[0].style.outline = "solid";
										objLegend_g[i].children[0].style.outlineColor  = "red";
										objLegend_g[i].children[0].style.outlineWidth = "1px";
									}
							}
							buildSelectData(d, "day", this.name);
					})
					.attr("x", function(d) { return week(d) * cellSize-horizontalCalendarOffset; })
					.attr("y", function(d) { return (day(d) * cellSize)-verticalCalendarOffset; })
					.on("mouseout", function(d) {
										var objLegend = d3.select(".legend").selectAll(".rect")[0].parentNode;
										var objLegend_g = objLegend.children;
										for(var i =0; i < objLegend_g.length; i++ ) {
												objLegend_g[i].children[0].style.outline = "";
												objLegend_g[i].children[0].style.outlineColor  = "";
												objLegend_g[i].children[0].style.outlineWidth = "";
										}
	
						})
					.attr("id", function(d) { var strDate = buildDataview(d, ""); 
							var datarow = {day: strDate}
							allDays.push(datarow);
	
							return strDate;})
					.datum(format);
	
	rect.append("title")
		.text(function(d) { return d; });

	svg.selectAll(".month")
			.data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
			.enter().append("path")
					.attr("class", "month")
					.attr("d", monthPath);

	var month_name = d3.time.format("%B")

	svg.selectAll("text.month")
			.data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
			.enter().append("text")
			.attr("class", "monthTxt")
			.attr("x", function(d) { return week(d) * cellSize+25-horizontalCalendarOffset; })
			.attr("y", -4-verticalCalendarOffset)
			.attr("transform", "translate(0,0)")
			.attr("style", "text-anchor:left;")
			.text(month_name);
	
	var ScaleArr = ["NA", "0" ];
	var LScaleArr = ["NA","0"];
	var DataArr = [];
	
	rect.filter(function(d) { return d in dataBIG; })
		.attr("class", function(d) { 
					DataArr.push(dataBIG[d]);
					if (dataBIG[d] == 0) 
					{
						//console.log("day N" + color(dataBIG[d]));
						return "day N" + color(dataBIG[d]);
					}
					else 
					{	
						//console.log("day " + color(dataBIG[d]));
						return "day " + color(dataBIG[d]);
					}	
				})
		.on("mouseover", function(d) { 
					selectedDateLast = d;
					
					d3.selectAll("rect").classed("active", false)
					d3.select(this).classed("active", true)
					if (dataBIG[d] == 0) 
					{
						//console.log("day N" + color(dataBIG[d]));
						var strClass =  "day N" + color(dataBIG[d]);
					}
					else 
					{	
						//console.log("day " + color(dataBIG[d]));
						var strClass = "day " + color(dataBIG[d]);
					}	
					
					var objBarChart = d3.select(".lineChart").selectAll(".rect")[0].parentNode;
					var objBarChart_g = objBarChart.children;
					var objBarChart_g_children = objBarChart_g[0].children;

					for(var i =0; i < objBarChart_g_children.length; i++ ) {
							if (objBarChart_g_children[i].id == d) {
									objBarChart_g_children[i].style.fill = "red";
								}
					}
					var ClassNameSelected = this.className.baseVal;
					if (ClassNameSelected == "day" || ClassNameSelected == "day active") ClassNameSelected = ClassNameSelected.replace(" active", "");
					else {
							ClassNameSelected = ClassNameSelected.replace("day ", "");
							ClassNameSelected = ClassNameSelected.replace(" active", ""); }
					var objLegend = d3.select(".legend").selectAll(".rect")[0].parentNode;
					var objLegend_g = objLegend.children;

					for(var i =0; i < objLegend_g.length; i++ ) {
							if(objLegend_g[i].children[0].id == ClassNameSelected) {
								objLegend_g[i].children[0].style.outline = "solid";
								objLegend_g[i].children[0].style.outlineColor  = "red";
								objLegend_g[i].children[0].style.outlineWidth = "1px";
							}
					}
					buildSelectData (d,strClass, this.name);
			})
		.on("mouseout", function(d) {
				var objBarChart = d3.select(".lineChart").selectAll(".rect")[0].parentNode;
				var objBarChart_g = objBarChart.children;
				var objBarChart_g_children = objBarChart_g[0].children;
				for(var i =0; i < objBarChart_g_children.length; i++ ) {
							if (objBarChart_g_children[i].id == d) {
								objBarChart_g_children[i].style.fill = "rgba(0,0,255,0.9)";
							}
				}
				var objLegend = d3.select(".legend").selectAll(".rect")[0].parentNode;
				var objLegend_g = objLegend.children;
				for(var i =0; i < objLegend_g.length; i++ ) {
						objLegend_g[i].children[0].style.outline = "";
						objLegend_g[i].children[0].style.outlineColor  = "";
						objLegend_g[i].children[0].style.outlineWidth = "";
				}
		
			})
		.attr("id", function(d) { return d;})
		.select("title")
			.text(function(d) { 
					return d + ": " + addCommas(dataBIG[d]); });	
					
				
	var increment  = (d3.max(DataArr) - d3.min(DataArr))/arrayRange;
	var Lbound = d3.min(DataArr);
	for (var i=1; i<(arrayRange+1); i++)
	{
		ScaleArr.push(parseInt(Lbound + i* increment));
		LScaleArr.push(parseInt(Lbound + (i-1)* increment));
	}
	ScaleArr[ScaleArr.length-1] = d3.max(DataArr);
	buildLegend();				
	LineChartData();
////++++++++++++++++++++++++++++++++++++++++
	function monthPath(t0) {
		var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
		d0 = +day(t0), w0 = +week(t0),
		d1 = +day(t1), w1 = +week(t1);
	  
		var val1 = d0 * cellSize - verticalCalendarOffset;
		var val2 = 7 * cellSize - verticalCalendarOffset;
		var val3 = (d1 + 1) * cellSize - verticalCalendarOffset;
		var val4 = 0 - verticalCalendarOffset;
	  
		var xval1 = (w0 + 1) * cellSize - horizontalCalendarOffset;
		var xval2 = w0 * cellSize - horizontalCalendarOffset;
		var xval3 = w1 * cellSize  - horizontalCalendarOffset;
		var xval4 = (w1 + 1) * cellSize - horizontalCalendarOffset;
		var xval5 = (w0 + 1) * cellSize - horizontalCalendarOffset;
	  
		return "M" + xval1 + "," + val1
			+ "H" + xval2 + "V" + val2
			+ "H" + xval3 + "V" + val3
			+ "H" + xval4 + "V" + val4
			+ "H" + xval5 + "Z";
	}

	function buildLegend () {
		var legend = d3.select(".legendC")
				.append("svg")
				.attr("class", "legend")
				.attr("width", widthBarChart)
				.attr("height", (cellSize * arrayRange) + 2 * cellSize )
				.selectAll("g")
				.data(ScaleArr)
				.enter().append("g")
						.attr("transform", function(d, i) { return "translate(120," + parseInt((i * 13) +3) +")"; });
						
		legend.append("rect")
				.attr("width", cellSize *.8 )
				.attr("height", cellSize *.8 )
				.attr("class" , function(d, i){ 
							var strClass = ""
							//console.log("color(d) : " + color(d) + " | d: " + d + " | i: " + i); 
							if (i>1) 
								strClass = color(d)
							else 
								if ( i ==1 ) strClass = "N" + color(d)
								else strClass = "day"
							return strClass ;})
				.attr("id" , function(d, i){ 
							var strClass = ""
							//console.log("color(d) : " + color(d) + " | d: " + d + " | i: " + i); 
							if (i>1) 
								strClass = color(d)
							else 
								if ( i ==1 ) strClass = "N" + color(d)
								else strClass = "day"
							return strClass ;});
		legend.append("text")
				.attr("x", 24-30)
				.attr("y", 9)
				.attr("dy", ".35em")
				.attr("text-anchor", "end")
				.attr("style" , "font-size: 9px;")
				.text(function(d,i) { 
					var strLbl = ""
					if (i>0) 
						{ 
							if (i < (arrayRange+2)) 
							{ 
								strLbl =  addCommas(LScaleArr[i]) + " - "+ addCommas(d);
							}
							else 
							{
								strLbl =  addCommas(LScaleArr[i]) + " - "+ addCommas(domainMax);
							}
						}
					else 
						strLbl = "Data not available";
					return strLbl;
					}
					)
	}
// -- calendar building ends --//

}
