var mainTable = d3.select("body")
		.attr("onload", "loadData()")
		.append("table")
		.attr("class" , "main")
		.attr("id" , "main")
		.attr("border", borderT)
		.attr("cellpadding", cellpadding)
		.attr("width", "100%")
		.attr("height", "100%");
		
mainTable.append("tr")
	.attr("class" , "H1")
	.append("td")
	.attr("align", "center")
	.attr("colspan", 3)
	.text( function(d) {return "JIVA DATA LOAD REPORT ANALYTICS" });

mainTable.append("tr")
	.attr("class", "details")
	.append("td")
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
	
mainTable.append("tr")
	.attr("class", "control_1");
	
mainTable.append("tr")
	.append("td")
	.attr("align", "center")
	.attr("valign", "top");
	
mainTable.append("tr")
	.append("td")
	.attr("align", "center")
	.append("table")
	.attr("border", borderT)
	.append("tr")
	.attr("class", "detailsR");

d3.select(".detailsR").append("td")
	.attr("class","sub_titleL")
	.attr("id","sub_titleL")
	.attr("align", "right")
	.attr("valign", "bottom")
	.text("CALENDAR HEAT MAP FOR");
	
d3.select(".detailsR").append("td")
	.attr("class","sub_title")
	.attr("id","sub_title")
	.attr("align", "left")
	.attr("valign", "bottom")
	.text(strSelectID);
	
mainTable.append("tr")
	.append("td")
	.attr("class", "legendCR")
	.attr("valign", "bottom");

mainTable.append("tr")
	.attr("class", "details")
	.append("td")
	.attr("align", "center")
	.append("table")
	.attr("border", borderT)
	.attr("class","detailsT")
	.attr("width", "100%");
//// _________drawing the DETAILS SECTION__________________________//

/*d3.select(".detailsT")
	.append("tr")
	.attr("class" , "radioOptions")
	.append("td")
	.text("detail")
	.append("input")
	.attr("type" , "radio")
	.attr("name" , "detail")
	.attr("value" , "detail1")
	;
	
d3.select(".radioOptions")
	.append("td")
	.text("chart")
	.append("input")
	.attr("type" , "radio")
	.attr("name" , "chart")
	.attr("value" , "chart1");

d3.select(".radioOptions")
	.append("td")
	.text("line")
	.append("input")
	.attr("type" , "radio")
	.attr("name" , "trend")
	.attr("value" , "chart2");*/
	
d3.select(".detailsT")
	.append("tr")
	.attr("class", "detailsRow");
	
d3.select(".detailsRow")	
	.append("td")
	.attr("valign", "top")
	.attr("class" , "theatre");
	
d3.select(".theatre")
  .append("div")
  .attr("class" ,"stage")
  .append("table")
  .attr("class" ,"stageT")
  .attr("border" , borderT)
  .attr("cellpadding" , cellpaddingD);
  
 d3.select(".stageT")
	.append("tr")
  .attr("class" , "dataFile_err");
  
d3.select(".dataFile_err")
  .append("td")
  .attr("width" , (widthBarChart * .5))
  .attr("class", "fileList")
  .attr("valign", "top")
  .attr("align", "right")
  .append("div")
.attr("class" , "fileListDiv");;

 d3.select(".dataFile_err")
	.append("td")
	.attr("width" , (widthBarChart))
    .attr("class", "fileData")
	.attr("valign", "top")
	.attr("align", "left")
	.append("div")
	.attr("class" , "fileDataDiv");
	
 d3.select(".dataFile_err")
	.append("td")
	.attr("align", "right")
	.attr("valign", "top")
	.attr("width" ,widthLine)
	.append("div")
	.attr("id", "DivlineChart1");
	
d3.select(".dataFile_err")
	.append("td")
	.attr("width" , (widthBarChart))
    .attr("class", "errData")
	.attr("valign", "top")
	.attr("align", "right")
	.append("div")
	.attr("class" , "errDataDiv");;

//// _________drawing the DETAILS SECTION__________________________//
mainTable.append("tr")
	.attr("class", "control_2");

//--Summary Section row 1 --//
	
d3.select(".control_1").append("td")
	.attr("width", "100%")
	.attr("align", "center")
	.append("table")
	.attr("class", "summary")
	.attr("width", "100%")
	.attr("border", 0)
	.attr("cellpadding", cellpadding)
	.append("tr")
	.attr("class","summ_row1")
	.attr("id","summ_row1")
	.attr("align","center");
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
	.text("UPDATED RECORDS")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); return;});
d3.select(".summ_row1").append("td")
	.attr("align", "right")
	.attr("class", "label1")
	.attr("id", "new")
	.text("INSERTED RECORDS")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); mouseOver (this.id);return;});
	
d3.select(".summ_row1").append("td")
	.attr("align", "right")
	.attr("class", "label1")
	.attr("id", "tot")
	.text("TOTAL LOADED RECORDS")
	.on("mouseover", function(d) { d3.select(this).classed("active", true); mouseOver (this.id); return;})
	.on("mouseout", function(d) { d3.select(this).classed("active", false); return;});
	  
d3.select(".summ_row1").append("td")
	.attr("align", "left")
	.attr("class", "label1")
	.attr("id", "err")
	.text("FAILED RECORDS")
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
	.text("EMAILS")
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
d3.select(".summary").append("tr")
	.attr("class","summ_row3_1")
	.attr("id","summ_row3_1")
	.attr("align","center");
	
d3.select(".summary").append("tr")
	.attr("class","summ_row2")
	.attr("id","summ_row2")
	.attr("align","center");

	
d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label1");
	
d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label1");
	
d3.select("#summ_row2").append("td")
	.attr("align", "right")
	.attr("id","dupd")
	.attr("class", "label2")
	.attr("style", "color:white;")
	.text("00,000,000");
	
d3.select("#summ_row2").append("td")
	.attr("align", "right")
	.attr("class", "label2")
	.attr("id","dnew")
	.attr("style", "color:white;")
	.text("00,000,000");
	
d3.select("#summ_row2").append("td")
	.attr("align", "right	")
	.attr("class", "label2")
	.attr("id","dtot")
	.attr("style", "color:white;")
	.text("00,000,000");
d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","derr")
	.attr("style", "color:white;")
	.text("00,000,000");

d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","ddurH")
	.attr("style", "color:white;")
	.text("00.00");

d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","dfile")
	.attr("style", "color:white;")
	.text("00");
	
d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","demail")
	.attr("style", "color:white;")
	.text("00");
	
d3.select("#summ_row2").append("td")
	.attr("align", "left")
	.attr("class", "label2")
	.attr("id","derrM")
	.attr("style", "color:white;")
	.text("00");

d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.text("total");
	
d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.attr("id","SdDAYS")
	.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.attr("id","Sdupd")
	.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.attr("id","Sdnew")
	.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "right")
	.attr("class", "Summ1")
	.attr("id","Sdtot")
	.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("id","Sderr")
	.attr("class", "Summ1")
	.attr("style", "color:rgba(165,0,38,.4);")
	.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("class", "Summ1")
	.attr("id","SddurH")
	.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("class", "Summ1")
	.attr("id","Sdfile")
	.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("class", "Summ1")
	.attr("id","Sdemail")
	.text("NA");
d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("class", "Summ1")
	.attr("style", "color:rgba(165,0,38,.4);")
	.attr("id","SderrM")
	.text("NA");

d3.select(".summ_row3_1").append("td")
	.attr("align", "left")
	.attr("id","SderrDAYS")
	.attr("class", "Summ1")
	.attr("style", "color:rgba(165,0,38,.4);")
	.text("NA");
//--Summary Section row 2 --//

	
//--Summary Section END --//	
	
d3.select(".row2")
	.append("td")
	.attr("width", 500)
	.attr("id", "year")
	.attr("align", "left")
	.append("div")
	.attr("id", "slider-range")
	.attr("style", "display:none;")
	.on( "click", function(d) { 
		//console.log(this.value)
		});
	
// ++++++++ Calendar section
d3.select(".legendCR")
	.append("table")
	.attr("cellpadding", cellpaddingD)
	.attr("border", borderT2)
	.append("tr")
	.attr("class", "C3");
	
d3.select(".C3")	
	.append("td")
	.attr("class", "legendC")
	.attr("align", "center")
	.attr("valign", "bottom");
	
d3.select(".C3")
	.append("td")
	.attr("align" , "left")
	.attr("valign" , "bottom")
	.attr("class", "C4")
	.attr("width", widthC4)
	.attr("height", heightC4);
	

// ++++++++ Calendar section END

/*$(function() {
    $( "#slider-range" ).slider({
    range: true,
    min: 0,
	max: 1000,
	values: [2012,2013],
    slide: function( event, ui ) {
    var maxv = d3.min([ui.values[1], 10]);
    var minv = d3.max([ui.values[0], 0]);
    }});
    });
*/
	
