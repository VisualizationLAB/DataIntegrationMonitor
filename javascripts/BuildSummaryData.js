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
	SummaryData = [];
	var errMsgs = [];
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
		}
		if (typeof(d.Error_Msgs) == "string") 
		{ 
			var strErrString = d.Error_Msgs;
			strCurrErr = strErrString.split("|");
			
			for (var i=0;i<strCurrErr.length;i++)
			{
				if (strFileErr.indexOf(strCurrErr[i]) == -1 && (i%2 == 0) ) 
					{
						strFileErr = strFileErr + strCurrErr[i] + "|";
					}
			}
		}
		
		original_error = d.Error_Msgs;
	})
	if (typeof(strFileErr) == "string") {

		var arrErr = strFileErr.split("|");
		arrErr.forEach( function(d) {
				if (d != "") errMsgs.push(d);
			})
	}	
	if (typeof(strFile) == "string") {
		var arrFileLayout = strFile.split("|");
		arrFileLayout.forEach( function(d) {
				if (d != "") 
				{
					fileLayout.push(d);
					var datarow = { "File_Layouts" : d,
									"Cnt" : 0 };
					BarChartData.push(datarow);
				}
			})
	}

	var datarow = {
						"Tot_Records" :  Summ_Recs,
						"Tot_Inserts" : Summ_New,
						"Tot_Updates" : Summ_Upd,
						"Tot_Failures" : Summ_Err,
						"Tot_Duration_Secs" : d3.round(Summ_Load_sec,2),
						"Tot_Duration_Hrs" : d3.round(Summ_Load_hr,2),
						"File_Layouts" : fileLayout.length,
						"Error_Msgs" : errMsgs.length,
						"Tot_days" : Summ_days-1,
						"Tot_Err_days" :Summ_days_err-1,
						"Files" : fileLayout,
						"Errors" : errMsgs,
						"tot_unique_emails" :  Summ_Email
						
					}
	SummaryData.push(datarow);
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
	LineChartData();
	
}
