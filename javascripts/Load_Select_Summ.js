// LOAD DATA

function loadData () {

if(document.URL.indexOf("Data.html") >0) ProgressBar();
//Presets();
queue()
	.defer(d3.csv, "Calendar.csv")
	.await(ready);
}

var arrDates = [];
var arrFail = [];
var arrVol = [];
var arrNew = [];
var arrUpd = [];
var arrDurHrs = [];
var arrFileLayout = [];
var arrFileT = [];
var arrErrMsgs = [];
var arrErrT = [];

var arrEmailStr = [];

var arrUniqueEmails = [];
var arrEmails = [];

var objData = [];


function ready(error, dataCsv) {
console.log("dataCsv");
console.log(dataCsv);	
dataOriginal = dataCsv;

dataOriginal.forEach(function(d){ 
		if (!(d.Date == "")) { 
		
		//arrDates.push(d.Date);
		arrFail.push(parseInt(d.Tot_Failures)); // drives legend
		arrVol.push(parseInt(d.Tot_Records));// drives legend
		arrNew.push(parseInt(d.Tot_Inserts));// drives legend
		arrUpd.push(parseInt(d.Tot_Updates));// drives legend
		arrDurHrs.push(d3.round(Number(d.Tot_Duration_Hrs),2));
		
		//arrUpd.push(parseInt(d.Tot_Updates));
		//arrEmails.push(parseInt(d.tot_emails));
		arrUniqueEmails.push(parseInt(d.tot_unique_emails));// drives legend
		//arrEmailStr.push(d.EmailStr);
		var currDate = d.Date;
		
		if (d.EmailStr != "" && typeof(d.EmailStr) != "undefined" ) {
			var strFilString = d.EmailStr;
			var strFile = "";
			var strFileTIME = "";
			
			var strFileCat = "";
			strCurrFile = strFilString.split(":");
			var strFileErr = "";
			var FileErr = "";
			
			var EmailTree = [];
			strCurrFile.forEach (function(d) {
				
				if(d != "undefined" && !(d == ""))  {
				var fileLayout = d.split("-");
				//console.log(fileLayout[0]);
				
				if (fileLayout[0] !="") 
				{
					var strFileTime = fileLayout[0];
					//console.log(strFileTime);
					//console.log(strFileTime.length);
					//console.log(strFileTime.substring(0, strFileTime.length - 6));
					if (strFileTIME.indexOf(currDate +"-"+ strFileTime) == -1)  strFileTIME = strFileTIME + currDate +"-"+ strFileTime + "|";
					if (strFile.indexOf(strFileTime.substring(0, strFileTime.length - 6)) == -1)  strFile = strFile + strFileTime.substring(0, strFileTime.length - 6) + "|";
										
					var currFilCat = strFileTime.substring(0, strFileTime.length - 6);
					currFilCat = getCatDesc(currFilCat.substring(0,3));
					if (strFileCat.indexOf(currFilCat) == -1)  strFileCat = strFileCat + currFilCat + "|";
				var EmailContent = fileLayout[1].split("~");
				var ErrMsgStr = EmailContent[EmailContent.length-1];
				var ErrTree = [];
				if (!(ErrMsgStr == "")) {
						FileErr = FileErr + ErrMsgStr;
						var strCurrErr = ErrMsgStr.split("|");
						for (var i=0;i<strCurrErr.length-1;i++)
						{
							if (i%2 == 0 ) 
							{
								if ( strCurrErr[i] == "InsuredMemberNotFound" && strFileErr.indexOf(strCurrErr[i]) == -1) 
								{
									strFileErr = strFileErr + strCurrErr[i] + "|";
								}
								else
								{
									if (strFileErr.indexOf(strCurrErr[i]) == -1) {
										strFileErr = strFileErr + strCurrErr[i] + "|";
									}
								}
								
								var datarow = {
								"Error_Msgs" : strCurrErr[i],
								"Tot_Failures" :  parseInt(strCurrErr[i+1])
								};
								ErrTree.push(datarow);
							
							} //if (i%2 == 0 ) 
							
							
						}//for (var i=0;i<strCurrErr.length-1;i++)
					}//if (!(ErrMsgStr == "")) {
					
				var newArr = strFileErr.split("|");
				var ErrCnt = parseInt(newArr.length-1);
				
				var datarow  = {
						//"File_Layouts" : fileLayout[0],
						"File_Layouts" : strFileTime.substring(0, strFileTime.length - 6), 
						"File_Cat" : currFilCat,
						"TimeStamp" : strFileTime.substring(strFileTime.length - 6, strFileTime.length),
						"Tot_Records" :  parseInt(EmailContent[2]),
						"Tot_Inserts" : parseInt(EmailContent[1]),
						"Tot_Updates" : parseInt(EmailContent[0]),
						"Tot_Failures" : parseInt(EmailContent[3]),
						"Tot_Duration_Hrs" : d3.round(Number(EmailContent[4]),2),
						"Error_Msgs" : ErrTree, // All errors in one email
						"Err_Cnt" : parseInt(ErrTree.length) // Count of errors Types in one email

						};
						
				EmailTree.push(datarow);
				
				} // file layout name valid - if (fileLayout[0] !="") 
				} //if(d != "undefined" && !(d == ""))
				}); //if (!(ErrMsgStr == "")) {
				
			var newArr = strFile.split("|");
			var FileCnt = parseInt(newArr.length-1); // keeps track of unique File Layouts in all emails in one day
			
			var newArr = strFileErr.split("|");
			var ErrCnt = parseInt(newArr.length-1); // keeps track of unique Error Types on All File Layouts in all emails in one day
			
			var newArr = strFileCat.split("|");
			var FileCatCnt = parseInt(newArr.length-1); // keeps track of unique Error Types on All File Layouts in all emails in one day
			
			var newArr = strFileTIME.split("|");
			var UniqueLoads = parseInt(newArr.length-1); // keeps track of unique Data Loads on All File Layouts in all emails in one day
			
		} // if (d.EmailStr != "" && typeof(d.EmailStr) != "undefined" ) 
		else 
		{
			var FileCnt = 0;
			var ErrCnt = 0;
		}// Else - if (d.EmailStr != "" && typeof(d.EmailStr) != "undefined" ) 
		
		arrFileT.push(parseInt(FileCnt)); // drives legend
		//arrFileLayout.push(strFile);
		//arrErrMsgs.push(FileErr);
		arrErrT.push(parseInt(ErrCnt));// drives legend
		
		var errMsgs = "";
		
		if(FileCnt != parseInt(UniqueLoads)) errMsgs = "MultipleLoadsPerFileLayout";
		var errMsgsDups = "";
		if(FileCnt == parseInt(UniqueLoads) && FileCnt != EmailTree.length ) errMsgsDups = "DuplicateEmailsPerFileLayout";
		
		
		var datarow = {
						"Date" : d.Date,
						"Year" : d.Date.substring(0,4),
						"Tot_Records" :  parseInt(d.Tot_Records),
						"Tot_Inserts" : parseInt(d.Tot_Inserts),
						"Tot_Updates" : parseInt(d.Tot_Updates),
						"Tot_Failures" : parseInt(d.Tot_Failures),
						"Tot_Duration_Secs" : d3.round(Number(d.Tot_Duration_Secs),2),
						"Tot_Duration_Hrs" : d3.round(Number(d.Tot_Duration_Hrs),2),
						
						"File_Layouts" : strFile, // Contains all unique File Layout string delimited by "|" 
						"File_Cat" : strFileCat,
						"File_CatCnt" : FileCatCnt,
						//"Error_Msgs" : FileErr, // Concatenated string of All error messages along with Count for each Day - may be contain non unique error types
						"Error_Msgs" : strFileErr, // Concatenated string of All unique error messages for each Day
						"File_Cnt" : parseInt(FileCnt), // Count of Unique File Layouts in one day
						"Err_Cnt" : parseInt(ErrCnt), // Count of Unique Error Types on All File Layouts in one day
						//"tot_emails" : parseInt(d.tot_emails), // total emails - THIS WAS VALID WHEN THE FOLDER WITH EMAILS HAD DUPLICATE EMAILS
						//"tot_unique_emails" : parseInt(d.tot_unique_emails),
						"tot_unique_emails" : parseInt(UniqueLoads),
						"emails" : EmailTree, // Structure of each email,
						"qualityErrors" : errMsgs + " " + errMsgsDups
						};
		BIGDATA.push(datarow);
		}// only when date is not null (dataOriginal loop)
		})//strCurrFile.forEach (function(d)
console.log("BIGDATA");
console.log(BIGDATA);
//Presets();
//alert(document.URL.indexOf("Calendar.html") >0);
if(document.URL.indexOf("Calendar.html") >0){
//Presets();


drawCalender(select_1, "0");
buildSummaryData ();
//buildMainLayout();
buildFileBarChart();
var dataKey = d3.entries(dataBIG)
dataKey.sort(function(a, b){ return d3.ascending(a.key, b.key); });
var d = new Date(dataKey[dataKey.length-1].key);
d.setDate(d.getDate() +1); // adding one day- fix issue

var scrollDate = new Date(dataKey[dataKey.length-1].key);
scrollDate.setDate(scrollDate.getDate() - 365);
//console.log("scrollDate");
//console.log(scrollDate);
scrollDate = buildDataview (scrollDate); // adding one day- fix issue


selectedDate = buildDataview (d, "");
var selectedDateD = buildDisplayDate (selectedDate);
selectedDateLast = selectedDate;
document.getElementById(selectedDate).className.baseVal = document.getElementById(selectedDate).className.baseVal + " active";
document.getElementById(selectedDate).focus();

//window.scroll(0,findPos(document.getElementById(selectedDate))); DIDNOT WORK
location.href = "#";
location.href = "#"+scrollDate;

buildSelectData(selectedDate, "", "");
buildFileBarSelectedDataChart();
}//if(document.URL.indexOf("Calendar.html") >0)

if(document.URL.indexOf("Data.html") >0){
exportAllDataload ();
}//if(document.URL.indexOf("Data.html") >0)
}
//////////////////////////////
// Build Selected Day on calendar Data

function buildSelectData (strDt, StrClass, dtNm) {
	SelectedData = [];
	
	var displayDt = buildDisplayDate(strDt);

	d3.select("#currDate").text(displayDt);

	selectedDate = strDt;
	var previousYr = selectedYr;
	selectedYr = selectedDate.substring(0,4);
	
	//console.log("selectedDate : " + selectedDate);
	//console.log("selectedYr : " + selectedYr);
	if(previousYr != selectedYr) 
	{
		buildSummaryData ();
		LineChartData();
		buildFileBarChart();
	}
	
	try { document.getElementById(strDt).focus();
	}
	catch(err)
	{}

	var strFile = "";
	var strFileErr = "";
	
	var strFileErrCnt = "";

	var errMsgs = [];
	//var errMsgsCnt = []
	var fileLayout = [];
	//var fileLayout2 = [];
	var ErrArr = [];
	
	BIGDATA.forEach(function (d) {
		
		if (strDt == d.Date) 
		{
			//console.log("original Selected Data");
			//console.log(d);
			
			if (typeof(d.File_Layouts) == "string") 
			{ 
			
			var strFilString = d.File_Layouts;
			var Emails = d.emails;
			
			strCurrFile = strFilString.split("|");
			strCurrFile.forEach (function(d) {
			
				if (d != "") {
					var currFileLayout = d ;
				
					var count_tot = 0;
					var count_upd = 0;
					var count_new = 0;
					var count_err = 0;
					var dur_H = 0.00;
				
					var err_msg = [];
					var err_msg_roll_up = [];
					var err_unique = "";
					var count_emails = 0;
				
					//console.log(d.emails);
					Emails.forEach (function (d) {
						if( d.File_Layouts == currFileLayout ) {
							count_tot = count_tot + parseInt(d.Tot_Records);
							count_upd = count_upd + parseInt(d.Tot_Updates);
							count_new = count_new + parseInt(d.Tot_Inserts);
							count_err = count_err + parseInt(d.Tot_Failures);
							dur_H = dur_H + Number(d.Tot_Duration_Hrs);
							count_emails = count_emails +1;
					
							if (parseInt(d.Err_Cnt) > 0) {
								d.Error_Msgs.forEach(function(d) {				
									if ( d.Error_Msgs == "InsuredMemberNotFound") 
									{
										if(err_unique.indexOf(d.Error_Msgs) == -1) 
										{
											err_unique = err_unique + d.Error_Msgs + "|";
											err_msg.push(d);
										}
									}
									else 
									{
										if(err_unique.indexOf(d.Error_Msgs) == -1)
										{ 
											err_unique = err_unique + d.Error_Msgs + "|";
											err_msg.push(d);
										}
									}
										
								});
							}
						}
					}); // email loop

				// for each file layout if there are multiple emails, below code rolls up the error messages into distinct error types
					if(err_msg.length > 0) {
						var arrErr = err_unique.split("|");
						arrErr.forEach(function(x) {
							if (x != "") {
								var currErr = x;
								var currVal = 0;
								var currCnt = 0;
								err_msg.forEach ( function(y) {
									//console.log(d);
									if(y.Error_Msgs == currErr) {
										currVal = currVal + parseInt(y.Tot_Failures);
										currCnt = currCnt +1;
									}
								})//err_msg.forEach
					
								var datarow = {"Error_Msgs" : currErr,
												"Tot_Failures" : parseInt(currVal),
												"tot_emails": currCnt};
								err_msg_roll_up.push(datarow);
							}//if (x != "")
						});//arrErr.forEach(function(x)
					
					} //if(err_msg.length > 0)
					
					var datarow = {
				
						"Tot_Records" :  parseInt(count_tot),
						"Tot_Inserts" : parseInt(count_new),
						"Tot_Updates" : parseInt(count_upd),
						"Tot_Failures" : parseInt(count_err),
						"Tot_Duration_Hrs" : Number(dur_H),
						"File_Layouts" : currFileLayout,
						"tot_emails" : parseInt(count_emails),
						"Error_Msgs" : err_msg_roll_up,
						"Errors_cnt" : parseInt(err_msg_roll_up.length)
					};
					fileLayout.push(datarow);
				}

				});
			}//if (typeof(d.File_Layouts) == "string") 
				
		if (typeof(d.Error_Msgs) == "string" && d.Error_Msgs != "") 
		{ 
			var strErrString = d.Error_Msgs;
			strCurrErr = strErrString.split("|");
			for (var i=0;i<strCurrErr.length;i++)
			{
				
				var CurrErrCnt = 0;
				var tot_freq = 0;
				var tot_emails = 0;
				var fileCats = "";
				var fileCatCnt = 0;
				var fileLayouts = "";
				var fileLayoutCnt = 0;
				
				if (strCurrErr[i] !="") { 
					//console.log("UniqueArr["+i+"]");
					//console.log(UniqueArr[i]);
					fileLayout.forEach (function (y) {
						//if( y.Err_Cnt >0 ) {
						if( y.Errors_cnt >0 ) {
						 y.Error_Msgs.forEach (function (x) {
							if(strCurrErr[i] == x.Error_Msgs) {
								CurrErrCnt = CurrErrCnt + parseInt(x.Tot_Failures);
								tot_freq = tot_freq +1;
								tot_emails = tot_emails + parseInt(x.tot_emails);
								if(fileLayouts.indexOf(y.File_Layouts) ==  -1) fileLayouts =  fileLayouts +y.File_Layouts +"|";
								var strCat = y.File_Layouts;
								var strCatAbbr = strCat.substring(0,3);
								var strCatX = getCatDesc(strCatAbbr);
								if(fileCats.indexOf(strCatX) == -1) fileCats = fileCats +strCatX+ "|";
							}//if(strCurrErr[i] == x.Error_Msgs)
						 }); //  end of y.Error_Msgs.forEach 
						}//if( y.Err_Cnt >0 )
					});//fileLayout.forEach
					
					var arr = fileLayouts.split("|");
					var FileCnt = arr.length;
					
					var arr = fileCats.split("|");
					var FileCatCnt = arr.length;
					
					var datarow = {
									"Error_Msgs" : strCurrErr[i],
									"Tot_Failures" : parseInt(CurrErrCnt),
									"tot_emails" : parseInt(tot_emails),
									"tot_freq" : tot_freq,
									"File_Cnt" : parseInt(FileCnt)-1,
									"FileLayouts": fileLayouts,
									"FileCat_Cnt" : parseInt(FileCatCnt)-1,
									"FileCats" : fileCats
							};
					//console.log(datarow);
					ErrArr.push(datarow);
				}//(i%2 == 0 && strCurrErr[i] !="") 
			}// for (var i=0;i<strCurrErr.length;i++)
		} // if (typeof(d.Error_Msgs) == "string") 

			
			var datarow = {
						"Date" : d.Date,
						"Tot_Records" :  parseInt(d.Tot_Records),
						"Tot_Inserts" : parseInt(d.Tot_Inserts),
						"Tot_Updates" : parseInt(d.Tot_Updates),
						"Tot_Failures" : parseInt(d.Tot_Failures),
						"Tot_Duration_Secs" : Number(d.Tot_Duration_Secs),
						"Tot_Duration_Hrs" : Number(d.Tot_Duration_Hrs),
						
						"File_Layouts" : parseInt(d.File_Cnt), // count of File Layouts //Used to drive Header
						"Files" : fileLayout, // contains the summary of all File Data // NOT USED -YET
						"emails": d.emails,//contains data for each email // DRIVES BAR CHARTS
						//"tot_emails" : parseInt(d.tot_emails), //NOT USED
						"tot_unique_emails" : parseInt(d.tot_unique_emails), //Used to drive Header
						
						"Errors" : ErrArr, // List of Error msgs on selected day
						//"Errors_cnt" : errMsgsCnt,
						"Error_Msgs" : ErrArr.length //Used to drive Header
						//"Error_Arr": ErrArr
						
						
					}
					
			SelectedData.push(datarow);
			
			
		}//if (strDt == d.Date)
	})//BIGDATA.forEach(function (d) {
	
	
	//console.log("SelectedData");
	//console.log(SelectedData);
	if (SelectedData.length > 0 ) 
	{
		SelectedData.forEach (function (d) {
				d3.select("#dtot").text(function (x) { return addCommas(d.Tot_Records);});
				d3.select("#derr").text(function (x) { return addCommas(d.Tot_Failures);});
				d3.select("#dupd").text(function (x) { return addCommas(d.Tot_Updates);});
				d3.select("#dnew").text(function (x) { return addCommas(d.Tot_Inserts);});
				d3.select("#ddurH").text(function (x) { return addCommas(d.Tot_Duration_Hrs);});
				d3.select("#dfile").text(function (x) { return addCommas(d.File_Layouts);});
				d3.select("#derrM").text(function (x) { return addCommas(d.Error_Msgs);});
				d3.select("#demail").text(function (x) { return addCommas(d.tot_unique_emails);});
				if(d.Tot_Failures > 0 || d.Error_Msgs > 0) { 
					d3.selectAll(".label2").style("color" , "rgba(165,0,38,.7)");
				}
				else d3.selectAll(".label2").style("color" , "rgba(0,104,55,1)");
			});
		
	}
	else
	{
		//d3.selectAll(".label2").style("color" , "color:#fff;rgba(179,179,179,1)");
		d3.selectAll(".label2").style("color" , "#fff");
		d3.select("#dtot").text("00,000,000");
		d3.select("#derr").text("00,000");
		d3.select("#dupd").text("00,000,000");
		d3.select("#dnew").text("00,000,000");
		d3.select("#ddurH").text("00.00");
		d3.select("#dfile").text("000");
		d3.select("#derrM").text("000");
		d3.select("#demail").text("000");
		
	}
	//buildDataTable();
	buildFileBarSelectedDataChart();
}
///////////////////////////
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
	var strQualityError = "";
	
	SummaryData = [];
	var errMsgs = [];
	//var errMsgsALL_nonunique= [];
	//var errMsgTree = [];
	
	var fileLayout = [];
	BarChartData = [];
	
	//console.log(BIGDATA);
	BIGDATA.forEach(function (d) {
	if(selectedYr == d.Year) {
		if (! isNaN(d.Tot_Records)) Summ_Recs = Summ_Recs + parseInt(d.Tot_Records);
		if (! isNaN(d.Tot_Failures)) Summ_Err = Summ_Err + parseInt(d.Tot_Failures);
		if (! isNaN(d.Tot_Updates)) Summ_Upd = Summ_Upd + parseInt(d.Tot_Updates);
		if (! isNaN(d.Tot_Inserts)) Summ_New = Summ_New + parseInt(d.Tot_Inserts);
		if (! isNaN(d.Tot_Duration_Hrs)) Summ_Load_hr = Summ_Load_hr + d3.round(Number(d.Tot_Duration_Hrs),2);
		if (! isNaN(d.Tot_Duration_Secs)) Summ_Load_sec = Summ_Load_sec + d3.round(Number(d.Tot_Duration_Secs),2);
		if (! isNaN(d.tot_unique_emails)) Summ_Email = Summ_Email + parseInt(d.tot_unique_emails);
		
		strQualityError = strQualityError + d.qualityErrors +"|";
		
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

		}//FOR CURRENT YEAR
		//else { console.log( d.Date +"|"+ d.Year)}
		//original_error = d.Error_Msgs;
	})//BIGDATA.forEach(function (d)
	
	// FILE LAYOUT PROCESSING
	//console.log ("strFile")
	//console.log (strFile)
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

						if(selectedYr == x.Year) {
						
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
						}//if(selectedYr == x.Year) {
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
									"Year" : selectedYr,
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
	
	//console.log("selectedYr2: " + selectedYr);
	//console.log("BarChartData");
	//console.log(BarChartData);
	
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
						if(selectedYr == x.Year) {
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
						 }//if(selectedYr == x.Year) {
					})//BIGDATA.forEach(function (x)
					
					var arr = strDays.split("|");
					var dayCnt = arr.length;
					
					var arr = fileLayouts.split("|");
					var FileCnt = arr.length;
					
					var arr = FileCats.split("|");
					var FileCatCnt = arr.length;
					 
					 var datarow = { "Error_Msgs" : d,
									 "Year" : selectedYr,
									"Tot_Failures" : parseInt(tot_recs),
									"Date" : strDays,
									"tot_Days" : parseInt(dayCnt)-1,
									//"tot_Days" : parseInt(dayCnt),
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
	
	//console.log("strQualityError");
	//console.log(strQualityError);
	var arr = strQualityError.split("|"); 
	//console.log(arr);
	var daysMultiLoadsPerFile = 0;
	var daysDuplicateLoadEmails = 0;
	arr.forEach (function (x) { 
								var arrN = x.split(" ");
								//if (x.indexOf("MultipleLoadsPerFileLayout") > 0) daysMultiLoadsPerFile = daysMultiLoadsPerFile +1;
								if (arrN[0] == "MultipleLoadsPerFileLayout") daysMultiLoadsPerFile = daysMultiLoadsPerFile +1;	
								if (arrN[1] == "DuplicateEmailsPerFileLayout") daysDuplicateLoadEmails = daysDuplicateLoadEmails +1;	
							})
	
	
	var datarow = {
						"Tot_Records" :  Summ_Recs,
						"Year" : selectedYr,
						"Tot_Inserts" : Summ_New,
						"Tot_Updates" : Summ_Upd,
						"Tot_Failures" : Summ_Err,
						"Tot_Duration_Secs" : d3.round(Summ_Load_sec,2),
						"Tot_Duration_Hrs" : d3.round(Summ_Load_hr,2),
						//"Tot_days" : Summ_days-1, // count of total days
						"Tot_days" : Summ_days, // count of total days
						//"Tot_Err_days" :Summ_days_err-1, // count of days when errors were found
						"Tot_Err_days" :Summ_days_err, // count of days when errors were found
						"Files" : fileLayout, // LIST OF ALL UNIQUE FILE LAYOUTS
						"File_Layouts" : fileLayout.length, // COUNT OF ALL UNIQUE FILE LAYOUTS
						"Errors" : errMsgs, // TREE OF ALL UNIQUE ERROR TYPES
						"ErrorsList" : strFileErr, // LIST OF ALL UNIQUE ERROR TYPES
						"Error_Msgs" : errMsgs.length, // COUNT OF ALL UNIQUE ERROR TYPES
						"tot_unique_emails" :  Summ_Email, // count of unique emails
						"MultipleLoadsPerFileLayout" : "Days with Multiple Loads Per FileLayout: " + daysMultiLoadsPerFile,
						"DuplicateEmailsPerFileLayout" : "Days with Duplicate Data Load Emails: " + daysDuplicateLoadEmails
					}
					
	SummaryData.push(datarow);
	
	// END OF CREATION OF SUMMARY DATA
	
	// START OF DISPLAY OF SUMMARY DATA
	//console.log("daysMultiLoadsPerFile");
	//console.log(daysMultiLoadsPerFile);
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
				d3.select(".MultipleLoadsPerFileLayout").text(function (x) { return addCommas(d.MultipleLoadsPerFileLayout);});
				d3.select(".DuplicateEmailsPerFileLayout").text(function (x) { return addCommas(d.DuplicateEmailsPerFileLayout);});
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
	
	//console.log("SummaryData");
	//console.log(SummaryData);
	LineChartData();
	
}
///////////////////
//function Presets() {
var width = screen.availWidth * 0.8,
	height = screen.availHeight * .2,
   //cellSize = width * 0.013; // cell size
   cellSize = 12; // cell size

var widthLine = screen.availWidth * .5 ,
heightLine = height,
//widthbar = screen.availWidth * 0.001953;
widthbar = screen.availWidth * 0.001954;
var widthBarChart = cellSize * 11;
var widthCalendar = cellSize * 58;
var heightCalendar = cellSize * 10;

console.log("widthBarChart : " + widthBarChart)

var heightC4 = cellSize * 10; // imp
var widthC4 = cellSize * 60; //imp

switch(screen.availWidth)
{
	case 1366: // Laptop
		var mainTableWidth = (3 * widthBarChart) + widthCalendar ;//imp
		break;
	case 1280: // Monitor
		var mainTableWidth = (3 * widthBarChart) + widthCalendar ;//imp
		break;
	//case 1280: // Projector
		//var mainTableWidth = (4 * widthBarChart) + widthCalendar ;//imp
		//break;
}	


console.log("mainTableWidth : " + mainTableWidth)


//var verticalCalendarOffset = heightCalendar * .1;
if (screen.availWidth > 1280) { 
//console.log("here");
	var verticalCalendarOffset = 20;
}
else 
{
	//console.log("here2");
	var verticalCalendarOffset = 70;
}
console.log(screen.availWidth);
console.log(screen.availHeight);

//var horizontalCalendarOffset = widthCalendar * .1;
var horizontalCalendarOffset = 150;

var calendarStart = 2012;
var calendarEnd = 2015;

var cellpadding = 0;
var cellpaddingD = 0;

var borderT = 0;
var borderT2 = 0;



var CenterSectionHt = 340;
var CenterSectionWidth = 900;
var CalendarTransformX = 180;
switch(screen.availWidth)
{
	case 1366: // Laptop
		var CalendarTransformY = 40;
		break;
	case 1280: // Monitor
		var CalendarTransformY = 90;
		break;
	case 1280: // Projector
		var CalendarTransformY = 90;
		break;
}	

var dataOriginal;
var arrayRange = 12;
var domainMax = 20000000;
var domainMin = 0;
//Controls
var select_1 = "err";
var filterVar = "";
var strFilter = "";
var strSelectID = "FAILURES";
var select_Class = "";
var BIGDATA = [];
var dataBIG = [];
var DateArr = [];
var DateArrCumm = [];
var lineData = [];

var BarChartData = [];// Total data File Layouts
var BarChartData_filterCat = []; // Total data File Layouts Category

var BarChartDataSelect = []; // daily data File Layouts
var BarChartSelect_filterCat = []; // daily data File Layouts Category

var BarErrChartData = [];// Total data Error Types
var BarErrChartDataSelect = [];// Daily data Error Types

var selectedDate = ""
var selectedYr = calendarStart;
var selectedDateLast = ""
var lastClicked;
var lastSelectedLabel;

var allDays = [];

var SummaryData = [];
var SelectedData = [];



var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    percent = d3.format(".1%"),
    format = d3.time.format("%Y-%m-%d");
	
//return;
//} // END OF PRESENTS FUNCTION
