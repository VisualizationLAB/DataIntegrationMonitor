
////////////////////////////////////////////////

//function buildMainLayout() {
var mainTable = d3.select("body")
		.attr("onload", "loadData()")
		.append("table")
		.attr("class" , "main")
		.attr("id" , "main")
		.attr("border", borderT)
		.attr("cellpadding", cellpadding)
		.attr("width", mainTableWidth )
		//.attr("height", "100%");

mainTable
	.append("tr")
	.append("td")
	.attr("align","center")
	.append("table")
	.attr("class", "HeaderTable")
	.attr("border", borderT)
	.attr("width", mainTableWidth);
	//.append("tr")
	//.append("td")
	//.append("align", "center")
	//.text("I M HERE")
	
////////////////////////////////////////////////////////////////////
mainTable.append("tr")
	.attr("class", "headerRow");

//d3.select(".headerRow")	

d3.select(".headerRow")
	.append("tr")
	.append("td")
		.attr("class", "control_1")
		.attr("width", mainTableWidth)
		.attr("align","left")
		.attr("valign", "top");
		
d3.select(".control_1").append("td")
	.attr("width", mainTableWidth)
	.attr("align", "left")
	//.attr("valign", "top")
	.append("table")
	.attr("class", "summary")
	.attr("width", mainTableWidth)
	//.attr("height", 250)
	.attr("height", CenterSectionHt)
	//.attr("width", CenterSectionWidth)
	.attr("border", borderT)
	.attr("cellpadding", cellpadding);
	
//////////////////////////////////////////////////////////////////////////////////////	
//d3.select(".summary") 
d3.select(".HeaderTable")
	.append("tr")
	.attr("class" , "H1")
	.attr("height", "5%");
	
d3.select(".H1").append("td")
	.attr("align", "center")
	.attr("colspan", 12)
	//.attr("width", widthC4)
	.attr("style", "color:lightgrey")
	.append("a")
	.attr("href", "Data.html")
	.on("click","return popitup('Data.html')")
	.attr("title", "Click to View Data Loads")
	.text("JIVA DATA LOAD REPORT ANALYTICS" );
	
//d3.select(".summary")
d3.select(".HeaderTable")
	.append("tr")
	.attr("class", "details")
	.attr("height", "5%")
	.append("td")
	.attr("colspan",12)
	.attr("id", "currDate")
	.attr("align", "center")
	.attr("valign", "top")
	.text( function(d) {
		var d2 = new Date();
		newStrdate = buildDataview (d2,"");
		selectedDate = newStrdate;
		newStrdateX = buildDisplayDate(selectedDate);
		return newStrdateX;
		});
//////////////////////////////////////////////////////////////////////////////////////
//d3.select(".summary")
d3.select(".HeaderTable")
	.append("tr")
	.attr("class","summ_row1")
	.attr("id","summ_row1")
	.attr("height", "5%")
	.attr("align","left")
	.attr("valign", "top");
//------
d3.select(".summ_row1").append("td")
	.attr("align", "left")
	.attr("class", "label1");

d3.select(".summ_row1").append("td")
	.attr("align", "right")
	.attr("class", "label1")
	.text("DAYS");

d3.select(".summ_row1").append("td")
	.attr("align", "right")
	.attr("class", "label1")
	.attr("id", "upd")
	.text("UPDATES")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); return;});
d3.select(".summ_row1").append("td")
	.attr("align", "right")
	.attr("class", "label1")
	.attr("id", "new")
	.text("INSERTS")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); mouseOver (this.id);return;});
	
d3.select(".summ_row1").append("td")
	.attr("align", "right")
	.attr("class", "label1")
	.attr("id", "tot")
	.text("TOTAL RECORDS")
	.attr("width", "160px")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); return;});
	  
d3.select(".summ_row1").append("td")
	.attr("align", "left")
	.attr("class", "label1")
	.attr("id", "err")
	.text("FAILURES")
	.attr("style", "color:rgba(165,0,38,.4);")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); return;});
	  
d3.select(".summ_row1").append("td")
	.attr("align", "left")
	.attr("id", "durH")
	.attr("class", "label1")
	.text("LOAD TIME (Hrs)")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); return;});
d3.select(".summ_row1").append("td")
	.attr("align", "left")
	.attr("class", "label1")
	.attr("id", "fileT")
	.text("FILE TYPES")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); return;});

d3.select(".summ_row1").append("td")
	.attr("align", "left")
	.attr("class", "label1")
	.attr("id", "email")
	.text("DATA LOADS")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); return;});
	
d3.select(".summ_row1").append("td")
	.attr("align", "left")
	.attr("class", "label1")
	.attr("style", "color:rgba(165,0,38,.4);")
	.attr("id", "errT")
	.text("ERROR TYPES")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); return;});
	
d3.select(".summ_row1").append("td")
	.attr("align", "left")
	.attr("class", "label1")
	.attr("style", "color:rgba(165,0,38,.4);")
	.text("ERROR DAYS");
	
//--Summary Section row 2 --//

d3.select(".HeaderTable")
//d3.select(".summary")
	.append("tr")
	.attr("class","summ_row3_1")
	.attr("id","summ_row3_1")
	.attr("align","center")
	.attr("height", "8%");

d3.select(".HeaderTable")	
//d3.select(".summary")
	.append("tr")
	.attr("class","summ_row2")
	.attr("id","summ_row2")
	.attr("align","center")
	.attr("height", "12%");
	
/////////////////////////////////////////////
d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.text("total YTD");

	
d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.attr("id","SdDAYS")
	//.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.attr("id","Sdupd")
	//.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.attr("id","Sdnew")
	//.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.attr("id","Sdtot")
	//.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("id","Sderr")
	.attr("class", "Summ1")
	.attr("style", "color:rgba(165,0,38,.4);")
	//.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("class", "Summ1")
	.attr("id","SddurH")
	//.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("class", "Summ1")
	.attr("id","Sdfile")
	//.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("class", "Summ1")
	.attr("id","Sdemail")
	//.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("class", "Summ1")
	.attr("style", "color:rgba(165,0,38,.4);")
	.attr("id","SderrM")
	//.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("id","SderrDAYS")
	.attr("class", "Summ1")
	.attr("style", "color:rgba(165,0,38,.4);")
	//.text("NA");
///////////////////////////
	
d3.select("#summ_row2").append("td")
	.attr("align", "right")
	//.attr("id","dupd")
	//.attr("class", "label2")
	.attr("style", "color:white;")
	
d3.select("#summ_row2").append("td")
	.attr("align", "right")
	//.attr("id","dupd")
	//.attr("class", "label2")
	.attr("style", "color:white;")
	
d3.select("#summ_row2").append("td")
	.attr("align", "right")
	.attr("id","dupd")
	.attr("class", "label2")
	.attr("style", "color:white;")
	//.text("00,000,000");
	
d3.select("#summ_row2").append("td")
	.attr("align", "right")
	.attr("class", "label2")
	.attr("id","dnew")
	.attr("style", "color:white;")
	//.text("00,000,000");
	
d3.select("#summ_row2").append("td")
	.attr("align", "right	")
	.attr("class", "label2")
	.attr("id","dtot")
	.attr("style", "color:white;")
	//.text("00,000,000");
d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","derr")
	.attr("style", "color:white;")
	//.text("00,000,000");

d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","ddurH")
	.attr("style", "color:white;")
	//.text("00.00");

d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","dfile")
	.attr("style", "color:white;")
	//.text("00");
	
d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","demail")
	//.attr("rowspan",3)
	.attr("style", "color:white;")
	.text("00");
	
d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","derrM")
	.attr("style", "color:white;")
	//.text("00");
	
d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	//.attr("id","derrM")
	.attr("style", "color:white;")
	//.text("00");

//////////////

d3.select(".summary").append("tr")
	.attr("id","CalenderHeader1")
//d3.select("#summ_row2")
	.append("td")
	.attr("align", "right")
	.attr("valign", "top")
	.attr("rowspan", 3)
	.attr("class", "legendC")
	.attr("align", "right")
	.attr("width", widthBarChart)
	.attr("valign", "top");
	
//d3.select(".summary")
d3.select("#CalenderHeader1")
	.append("td")
	.attr("class", "ExportSection")
	.attr("colspan", 3) 
	.attr("width",widthC4)
	//.attr("id","CalenderHeader")
	.attr("align","center")
	.attr("height", "10%");

//////// BarSec//////END
d3.select(".summary").append("tr")
	.attr("id","CalenderHeader");
	
d3.select("#CalenderHeader").append("td")
//d3.select(".detailsR").append("td")
	.attr("class","sub_titleL")
	.attr("id","sub_titleL")
	.attr("align", "right")
	.attr("width", "100px")
	//.attr("colspan", 2)
	.attr("valign", "bottom")
	//.html(function() {
							//return "<span style='color:lightgrey;font-size:12px;'>CALENDAR HEAT MAP FOR &nbsp;&nbsp; </span><span style='color:steelblue;font-size:12px;'>" + document.getElementById(select_1).textContent + "</span>";
					//}
	.text("Calendar Heat Map for |");
	
//d3.select(".detailsR").append("td")
d3.select("#CalenderHeader").append("td")
	.attr("class","sub_title")
	.attr("id","sub_title")
	.attr("align", "center")
	.attr("width", "10%")
	.attr("valign", "bottom")
	//.attr("colspan", 5)
	.text(strSelectID);
	
d3.select("#CalenderHeader").append("td")
	.attr("class","sub_titleFilter")
	.attr("id","sub_titleFilter")
	.attr("align", "left")
	.attr("width", "100px")
	.attr("valign", "bottom")
	//.attr("colspan", 3)
	.text(strFilter);

d3.select("#CalenderHeader1").append("td")
	//.attr("class","sub_title")
	//.attr("colspan", 2)
	.attr("rowspan", 4)
	.attr("valign", "top")
	.attr("align", "right")
	.attr("style", "overflow: auto;")
	.append("table")
	.attr("border", borderT)
	.attr("width", widthBarChart)
	.append("div")
	.attr("class","dataTableSumm")
	

///////////////////////////////////////////// CALENDAR SECTION
//d3.select(".legendCR")
d3.select(".summary").append("tr")
	.append("td")
	.attr("colspan", 9)
	.attr("align", "center")
	//.attr("class", "C3");
	.attr("class", "C4")
	.attr("width", widthC4)
	.attr("height", heightC4);
////////////////////////////////////////////
//mainTable.append("tr")
d3.select(".summary").append("tr")
	.attr("class", "details")
	.append("td")
		.attr("width", mainTableWidth)
		.attr("align", "left")
		.attr("valign", "top")
		.attr("colspan", 4)
		.append("table")
			.attr("border", borderT)
			.attr("class","detailsT")
			//.attr("width", "100%");
			//.attr("width", CenterSectionWidth)

d3.select(".detailsT")
	.append("tr")
  .attr("class" , "dataFile_err");
  
	
 d3.selectAll(".dataFile_err")
	.append("td")
	//.attr("width" , (widthBarChart))
    .attr("class", "SummDataFileTD")
	.attr("valign", "top")
	.attr("align", "right")
		.append("table")
		.attr("class", "SummDataFileT")
		.attr("border", borderT)
			.append("tr")
				.append("td")
					//.text("TOTAL")
					.attr("class", "SummDataFile")
					.attr("valign", "top")
					.attr("align", "left");
					
 d3.select(".dataFile_err")
	.append("td")
	//.attr("colspan",2)
	.attr("align", "right")
	.attr("valign", "top")
	//.attr("width" ,widthLine)
	.append("table")
		.attr("class", "detailMiddle")
		.attr("border", borderT);
	
d3.select(".detailMiddle")
			.append("tr")
				.append("td")
					.attr("colspan", 2)
					.append("div")
						.attr("id", "DivlineChart1");

d3.select(".detailMiddle")
	.append("tr")
		.attr("class", "summaryDetail")
		.append("td")
			.attr("class", "SummData")
			.attr("valign", "top")
			.attr("align", "left")
			.append("table")
			.attr("class", "SummDataDivT")
			.attr("border", borderT)
				.append("tr")
					.append("td")
						//.append("svg")
							//.append("text", "TOTAL")
							//.text("TOTALS")
							.attr("class", "SummDataDiv")
							.attr("valign", "top")
							.attr("align", "left");

d3.select(".summaryDetail")
  .append("td")
			.attr("class", "DailyData")
			.attr("valign", "top")
			.attr("align", "left")
			.append("table")
			.attr("class", "DailyDataDivT")
			.attr("border", borderT)
				.append("tr")
					.append("td")
						//.text("TODAY")
						.attr("class", "DailyDataDiv")
						.attr("valign", "top")
						.attr("align", "left");
 d3.selectAll(".dataFile_err")
	.append("td")
	//.attr("width" , (widthBarChart))
    .attr("class", "DailyDataFileTD")
	.attr("valign", "top")
	.attr("align", "right")
		.append("table")
		.attr("class", "DailyDataFileT")
		.attr("border", borderT)
			.append("tr")
				.append("td")
					.attr("class", "DailyDataFile")
					.attr("valign", "top")
					.attr("align", "left");
					
//--Summary Section END --//	
	
/*d3.select(".row2")
	.append("td")
	.attr("width", 500)
	.attr("id", "year")
	.attr("align", "left")
	.append("div")
	.attr("id", "slider-range")
	.attr("style", "display:none;")
	.on( "click", function(d) { 
		//console.log(this.value)
		});*/
	
d3.select(".summary").append("tr")
	.append("td")
	.attr("align", "center")
	.attr("colspan", 11)
	.text("Note: Compatible with Google Chrome Browser Only")
		.attr("style" , "color:grey;");
		
//}// END OF BUILDMAINLAYOUT Function


// BUILD CALENDER AND LEGEND
// The drawCalender() function has the buildLegend() function and the monthPath() functions inside it.

function drawCalender(ind, caller) {

	//console.log("caller");
	//console.log(caller);
	d3.selectAll(".svgContainer").remove();
	d3.selectAll(".legend").remove();
	//d3.selectAll("RdYlGn").remove();
	//d3.selectAll(".RdYlGn").remove();
	allDays = [];
	var d = new Date();
	var dataVal;

	dataBIG = d3.nest()
			.key(function(d) { return d.Date; })
			.rollup(function(d) { 
									if(caller == 0 || caller == 1) {
										dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),parseInt(d[0].File_Cnt),parseInt(d[0].Err_Cnt),parseInt(d[0].tot_unique_emails));
										return dataVal;}
									else {
										switch(filterVar) {
											case ".SummDataFile":
												if(d[0].File_Layouts.indexOf(caller) != -1) {
													dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),parseInt(d[0].File_Cnt),parseInt(d[0].Err_Cnt),parseInt(d[0].tot_unique_emails));
													return dataVal;
												}
												break;
											case ".SummDataDiv":
												//console.log("caller: " + caller);
												//console.log(d[0].File_Layouts);
												//console.log(d[0].File_Layouts.indexOf(caller) != -1);
												if(d[0].File_Cat.indexOf(caller) != -1) {
													dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),parseInt(d[0].File_Cnt),parseInt(d[0].Err_Cnt),parseInt(d[0].tot_unique_emails));
													return dataVal;
												}
												break;
											case ".errDataDiv":
												if(d[0].Error_Msgs.indexOf(caller) != -1) {
													dataVal = getData(select_1,parseInt(d[0].Tot_Records),parseInt(d[0].Tot_Failures),parseInt(d[0].Tot_Inserts),parseInt(d[0].Tot_Updates),Number(d[0].Tot_Duration_Hrs),parseInt(d[0].File_Cnt),parseInt(d[0].Err_Cnt),parseInt(d[0].tot_unique_emails));
													return dataVal;
												}
												break;
										}//switch(caller) {
										//else return 0;
									}//if(caller == 0 || caller == 1)
								})
			.map(BIGDATA);
			
	console.log("dataBIG");
	console.log(dataBIG);
	
	//console.log(d3.max(d3.values(dataBIG)));
	//getDomainMax(select_1,"domainMax");
	domainMax = d3.max(d3.values(dataBIG));
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
	var formatYr = d3.time.format("%Y");
	var svg = d3.select(".C4").selectAll("svg")
				.data(d3.range(calendarStart, calendarEnd))
				.enter()
					.append("tr")
					.attr("class" , "svgContainer")
					.append("td")
					.attr("width", "100%")
					.attr("colspan", 11)
					//.attr("class" , "svgContainer")
					//.attr("height", heightCalendar)
					.append("svg")
					.attr("width", widthCalendar)
					.attr("height", heightCalendar)
					.attr("class", "RdYlGn")
					.attr("id", function(d) {return d;})
					.append("g")
						//.attr("transform", "translate(" + ((width - cellSize * 60) / 2) + "," + (height - cellSize * 8 - 1) + ")");
						//.attr("transform", "translate(180,40)");
						.attr("transform", "translate(" + CalendarTransformX + "," + CalendarTransformY + ")");
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
			//.attr("x", function(d) { return week(d) * cellSize+25-horizontalCalendarOffset; })
			.attr("x", function(d) { return (week(d) * cellSize+15)-horizontalCalendarOffset; })
			.attr("y", -4-verticalCalendarOffset)
			.attr("transform", "translate(0,0)")
			.attr("style", "text-anchor:left;")
			.text(month_name);
	
	svg.selectAll("text.weekDay")
			.data(["Su","Mo","Tu","We","Th","Fr", "Sa"])
			.enter().append("text")
			.attr("class", "weekDayTxt")
			//.attr("x", function(d) { return week(d) * cellSize+25-horizontalCalendarOffset; })
			.attr("x", (cellSize * 42) + 4)
			.attr("y", function(d,i) {
					switch(screen.availWidth)
					{
						case 1366: // Laptop
							return ((i-1) * cellSize) +2;//imp
							break;
						case 1280: // Monitor
							return ((i-1) * cellSize) - 50;//imp
							break;
						//case 1280: // Projector
							//var mainTableWidth = (4 * widthBarChart) + widthCalendar ;//imp
							//break;
					}					
					})
			.attr("transform", "translate(0,0)")
			.attr("style", "text-anchor:left;font-size:9px;fill:grey;")
			.text(function(d) {return d;});
	
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
								//objBarChart_g_children[i].style.fill = "rgba(0,0,255,0.9)";
								objBarChart_g_children[i].style.fill = "steelblue";
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
		d3.selectAll(".legendT").remove();
		var legend = d3.select(".legendC")
				.append("table")
				//.attr("width", "100%")
				.attr("border" ,borderT)
				.attr("class" ,"legendT")
				.append("tr")
				//.attr("width", "100%")
				.append("td")
				.attr("align", "right")
				//.attr("width", "100%")
				.append("svg")
				.attr("class", "legend")
				.attr("width", widthBarChart)
				.attr("height", (cellSize * arrayRange) + 4 * cellSize )
				.selectAll("g")
				.data(ScaleArr)
				.enter().append("g")
						//.attr("transform", function(d, i) { return "translate(120," + parseInt((i * 13) +3) +")"; });
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
//if(select_1 == "err" || select_1 == "email" || select_1 == "fileT" || select_1 == "errT") {

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

if(select_1 == "err" || select_1 == "email" || select_1 == "fileT" || select_1 == "errT") barErrSelectedData ();
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
	
//var objCalendar = d3.select(".RdYlGn").selectAll(".rect")[0].parentNode;
//var objCalendar_g = objCalendar.children;
//var objCalendar_g_children = objCalendar_g[0].children;

var getRightCal = document.getElementById(selectedYr);
var objCalendar_g_children = getRightCal.children[0].children;
	
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

