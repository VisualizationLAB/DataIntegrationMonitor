// BUILD SUMMARY DATA
function buildSummaryData () {
	
	var Summ_Recs = 0;
	var Summ_Err = 0;
	var Summ_Upd = 0;
	var Summ_New = 0;
	
	var Summ_Email = 0;
	
	var Summ_Load_sec = 0.00;
	var Summ_Load_hr = 0.00;
	var Summ_days = 0;
	var Summ_days_err = 0;
	
	var strFile = "";
	var strFileErr = "";
	var strFileErrALL = "";
	SummaryData = [];
	var errMsgs = [];
	//var errMsgsALL_nonunique= [];
	//var errMsgTree = [];
	
	var fileLayout = [];
	
	//console.log(BIGDATA);
	BIGDATA.forEach(function (d) {
		if (! isNaN(d.Tot_Records)) Summ_Recs = Summ_Recs + parseInt(d.Tot_Records);
		if (! isNaN(d.Tot_Failures)) Summ_Err = Summ_Err + parseInt(d.Tot_Failures);
		if (! isNaN(d.Tot_Updates)) Summ_Upd = Summ_Upd + parseInt(d.Tot_Updates);
		if (! isNaN(d.Tot_Inserts)) Summ_New = Summ_New + parseInt(d.Tot_Inserts);
		if (! isNaN(d.Tot_Duration_Hrs)) Summ_Load_hr = Summ_Load_hr + d3.round(Number(d.Tot_Duration_Hrs),2);
		if (! isNaN(d.Tot_Duration_Secs)) Summ_Load_sec = Summ_Load_sec + d3.round(Number(d.Tot_Duration_Secs),2);
		if (! isNaN(d.tot_unique_emails)) Summ_Email = Summ_Email + parseInt(d.tot_unique_emails);
		
		Summ_days  = Summ_days +1;
		if (d.Tot_Failures > 0) Summ_days_err = Summ_days_err +1;
		
		if (typeof(d.File_Layouts) == "string") 
		{ 
			var strFilString = d.File_Layouts;
			strCurrFile = strFilString.split("|");
			strCurrFile.forEach (function(d) {
				if (strFile.indexOf(d) == -1 && (d !="") ) strFile = strFile + d + "|";
			});
		}//if (typeof(d.File_Layouts) == "string") 
		
		if (typeof(d.Error_Msgs) == "string" &&  d.Error_Msgs != "") 
		{ 
			var strErrString = d.Error_Msgs;
			//console.log(d.Date + ":" + d.Error_Msgs);
			strCurrErr = strErrString.split("|");
			strCurrErr.forEach ( function (x) {
				if ( x == "InsuredMemberNotFound")
				{
					if (strFileErr.indexOf(x) == -1)  strFileErr = strFileErr + x + "|";
				}
				else
				{
					if (strFileErr.indexOf(x) == -1)  strFileErr = strFileErr + x + "|";
				}
				/*var datarow = { "Error_Msgs" : x,
									"Date" : d.Date};
				errMsgsALL_nonunique.push(datarow);*/
			}); //strCurrErr.forEach ( function (x)
		} //if (typeof(d.Error_Msgs) == "string" &&  d.Error_Msgs != "")

		
		//original_error = d.Error_Msgs;
	})//BIGDATA.forEach(function (d)
	
	// FILE LAYOUT PROCESSING
	
	var CatStr = "";
	if (typeof(strFile) == "string") {
		var arrFileLayout = strFile.split("|");
		arrFileLayout.forEach( function(d) {
				if (d != "") 
				{
					fileLayout.push(d);
					
					// BUILDING BarChartData - which drives the summary Bar Charts for File Layouts 
					var tot_rec = 0;
					var tot_upd = 0;
					var tot_new = 0;
					var tot_err = 0;
					var durH = 0.00;
					var errTypStr = "";
					var errCnt = 0;
					var email = 0;
					BIGDATA.forEach(function (x) {
						x.emails.forEach ( function(y) {
							if ( y.File_Layouts == d) {
								tot_rec = tot_rec + parseInt(y.Tot_Records);
								tot_err = tot_err + parseInt(y.Tot_Failures);
								tot_upd = tot_upd + parseInt(y.Tot_Updates);
								tot_new = tot_new + parseInt(y.Tot_Inserts);
								durH = durH + d3.round(Number(y.Tot_Duration_Hrs),2);
								//var strErr = y.Error_Msgs;
								//console.log(y);
								//console.log(y.Error_Msgs);
								if(y.Err_Cnt > 0) { 
									y.Error_Msgs.forEach(function(f) { 
										errTypStr = errTypStr + f.Error_Msgs +"|";
										});//y.Error_Msgs.forEach(function(f) { 
								}//if(y.Err_Cnt > 0) { 
								email = email +1;
							}
						})//x.emails.forEach ( function(y) 
						
					});//BIGDATA.forEach(function (x)
					//var strE = eval (d);
					
					var arr = errTypStr.split("|");
					//console.log("arr");
					//console.log(arr);
					var uniqErrTyp = "";
					arr.forEach(function(z) {
						if(z != "") {
						 var strZ = z;
						 if (uniqErrTyp.indexOf(strZ) == -1) uniqErrTyp = uniqErrTyp + strZ +"|";
						}
					});
					var uniqArr= uniqErrTyp.split("|");
					errCnt = uniqArr.length-1;
					var datarow = { "File_Layouts" : d,
									"Category" : d.substring(0,3),
									"Tot_Records" :  tot_rec,
									"Tot_Inserts" : tot_new,
									"Tot_Updates" : tot_upd,
									"Tot_Failures" : tot_err,
									"Tot_Duration_Hrs" : durH,
									"tot_emails" : email,
									"failPct" : Number(tot_err/tot_rec),
									"Error_Msgs" : errCnt,
									"ErrStr" : uniqErrTyp
									}
					BarChartData.push(datarow);
				}//if (d != "") 
			})//arrFileLayout.forEach( function(d) {
	}//if (typeof(strFile) == "string") {
	
	// END OF FILE LAYOUT PROCESSING
	
	// START OF ERROR TYPE PROCESSING
	if (typeof(strFileErr) == "string") {
		var arrErr = strFileErr.split("|");
		arrErr.forEach( function(d) {
				if (d != "") 
				{
					var tot_recs = 0;
					var tot_days = 0;
					var strDays = ""
					var tot_emails = 0;
					var tot_filelayouts = 0;
					var fileLayouts = ""
					var totFileCats = 0;
					var FileCats = "";
					
					BIGDATA.forEach(function (x) {
						x.emails.forEach ( function(y) {
						 if(y.Err_Cnt >0) {
							y.Error_Msgs.forEach ( function(z) {
								if(z.Error_Msgs == d ) {
								 tot_recs = tot_recs + parseInt(z.Tot_Failures);
								 tot_emails = tot_emails +1;
								 if (strDays.indexOf(x.Date) ==  -1)  strDays = strDays + x.Date + "|";
								 if (fileLayouts.indexOf(y.File_Layouts) ==  -1)  fileLayouts = fileLayouts + y.File_Layouts+ "|";
								 //console.log("y.File_Layouts");
								 //console.log(y.File_Layouts);
								 var strCat = y.File_Layouts;
								 var strCatAbbr = strCat.substring(0,3);
								 var strCatX = getCatDesc(strCatAbbr);
								 //console.log(typeof(strCat)+"|"+strCatAbbr + "|" + strCat +"|"+strCatX);
								 if (FileCats.indexOf(strCatX) ==  -1)  FileCats = FileCats + getCatDesc(strCatX) + "|";
								}//if(z.Error_Msgs == d )
							})//y.Error_Msgs.forEach ( function(z) {
						  }//if(y.Err_Cnt >0)
						 })//x.emails.forEach (
					})//BIGDATA.forEach(function (x)
					
					var arr = strDays.split("|");
					var dayCnt = arr.length;
					
					var arr = fileLayouts.split("|");
					var FileCnt = arr.length;
					
					var arr = FileCats.split("|");
					var FileCatCnt = arr.length;
					 
					 var datarow = { "Error_Msgs" : d,
									"Tot_Failures" : parseInt(tot_recs),
									"Date" : strDays,
									"tot_Days" : parseInt(dayCnt)-1,
									"tot_emails" : parseInt(tot_emails),
									"File_Cnt" : parseInt(FileCnt)-1,
									"FileLayouts": fileLayouts,
									"FileCat_Cnt" : parseInt(FileCatCnt)-1,
									"FileCats" : FileCats
						};
					
					errMsgs.push(datarow);
				}//if (d != "") 
			});//arrErr.forEach( function(d) {
		}//if (typeof(strFileErr) == "string") {
	// END OF ERROR TYPE PROCESSING
	
	var datarow = {
						"Tot_Records" :  Summ_Recs,
						"Tot_Inserts" : Summ_New,
						"Tot_Updates" : Summ_Upd,
						"Tot_Failures" : Summ_Err,
						"Tot_Duration_Secs" : d3.round(Summ_Load_sec,2),
						"Tot_Duration_Hrs" : d3.round(Summ_Load_hr,2),
						"Tot_days" : Summ_days-1, // count of total days
						"Tot_Err_days" :Summ_days_err-1, // count of days when errors were found
						"Files" : fileLayout, // LIST OF ALL UNIQUE FILE LAYOUTS
						"File_Layouts" : fileLayout.length, // COUNT OF ALL UNIQUE FILE LAYOUTS
						"Errors" : errMsgs, // TREE OF ALL UNIQUE ERROR TYPES
						"ErrorsList" : strFileErr, // LIST OF ALL UNIQUE ERROR TYPES
						"Error_Msgs" : errMsgs.length, // COUNT OF ALL UNIQUE ERROR TYPES
						"tot_unique_emails" :  Summ_Email // count of unique emails
					}
					
	SummaryData.push(datarow);
	
	// END OF CREATION OF SUMMARY DATA
	
	// START OF DISPLAY OF SUMMARY DATA
	if (SummaryData.length > 0 ) 
	{
		SummaryData.forEach (function (d) {
				d3.select("#Sdtot").text(function (x) { return addCommas(d.Tot_Records);});
				d3.select("#Sderr").text(function (x) { return addCommas(d.Tot_Failures);});
				d3.select("#Sdupd").text(function (x) { return addCommas(d.Tot_Updates);});
				d3.select("#Sdnew").text(function (x) { return addCommas(d.Tot_Inserts);});
				d3.select("#SddurH").text(function (x) { return addCommas(d.Tot_Duration_Hrs);});
				d3.select("#Sdfile").text(function (x) { return addCommas(d.File_Layouts);});
				d3.select("#SderrM").text(function (x) { return addCommas(d.Error_Msgs);});
				d3.select("#SderrDAYS").text(function (x) { return addCommas(d.Tot_Err_days);});
				d3.select("#SdDAYS").text(function (x) { return addCommas(d.Tot_days);});
				d3.select("#Sdemail").text(function (x) { return addCommas(d.tot_unique_emails);});
			});
	}
	else
	{
		d3.select("#Sdtot").text("");
		d3.select("#Sderr").text("");
		d3.select("#Sdupd").text("");
		d3.select("#Sdnew").text("");
		d3.select("#SddurH").text("");
		d3.select("#Sdfile").text("");
		d3.select("#SderrM").text("");
		d3.select("#SderrDAYS").text("");
		d3.select("#SdDAYS").text("");
		d3.select("#Sdemail").text("");
		
	}
	// END OF DISPLAY OF SUMMARY DATA
	
	//console.log("BarChartData");
	//console.log(BarChartData);
	
	console.log("SummaryData");
	console.log(SummaryData);
	LineChartData();
	
}
