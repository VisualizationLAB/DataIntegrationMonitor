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
		
