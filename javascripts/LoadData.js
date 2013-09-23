// LOAD DATA

function loadData () {

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
		
		arrDates.push(d.Date);
		arrFail.push(parseInt(d.Tot_Failures));
		arrVol.push(parseInt(d.Tot_Records));
		arrNew.push(parseInt(d.Tot_Inserts));
		arrUpd.push(parseInt(d.Tot_Updates));
		arrDurHrs.push(d3.round(Number(d.Tot_Duration_Hrs),2));
		arrUpd.push(parseInt(d.Tot_Updates));
		arrEmails.push(parseInt(d.tot_emails));
		arrUniqueEmails.push(parseInt(d.tot_unique_emails));
		arrEmailStr.push(d.EmailStr);
		
		if (d.EmailStr != "" && typeof(d.EmailStr) != "undefined" ) {
			var strFilString = d.EmailStr;
			var strFile = "";
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
					if (strFile.indexOf(fileLayout[0]) == -1)  strFile = strFile + fileLayout[0] + "|";
					
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
						"File_Layouts" : fileLayout[0],
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
		} // if (d.EmailStr != "" && typeof(d.EmailStr) != "undefined" ) 
		else 
		{
			var FileCnt = 0;
			var ErrCnt = 0;
		}// Else - if (d.EmailStr != "" && typeof(d.EmailStr) != "undefined" ) 
		
		arrFileT.push(parseInt(FileCnt));
		arrFileLayout.push(strFile);
		arrErrMsgs.push(FileErr);
		arrErrT.push(parseInt(ErrCnt));
		
		var datarow = {
						"Date" : d.Date,
						"Tot_Records" :  parseInt(d.Tot_Records),
						"Tot_Inserts" : parseInt(d.Tot_Inserts),
						"Tot_Updates" : parseInt(d.Tot_Updates),
						"Tot_Failures" : parseInt(d.Tot_Failures),
						"Tot_Duration_Secs" : d3.round(Number(d.Tot_Duration_Secs),2),
						"Tot_Duration_Hrs" : d3.round(Number(d.Tot_Duration_Hrs),2),
						
						"File_Layouts" : strFile, // Contains all unique File Layout string delimited by "|" 
						//"Error_Msgs" : FileErr, // Concatenated string of All error messages along with Count for each Day - may be contain non unique error types
						"Error_Msgs" : strFileErr, // Concatenated string of All unique error messages for each Day
						"File_Cnt" : parseInt(FileCnt), // Count of Unique File Layouts in one day
						"Err_Cnt" : parseInt(ErrCnt), // Count of Unique Error Types on All File Layouts in one day
						//"tot_emails" : parseInt(d.tot_emails), // total emails - THIS WAS VALID WHEN THE FOLDER WITH EMAILS HAD DUPLICATE EMAILS
						"tot_unique_emails" : parseInt(d.tot_unique_emails),
						"emails" : EmailTree // Structure of each email
						};
		BIGDATA.push(datarow);
		}// only when date is not null (dataOriginal loop)
		})//strCurrFile.forEach (function(d)
console.log("BIGDATA");
console.log(BIGDATA);


drawCalender(select_1, "0");
buildSummaryData ();
buildFileBarChart();

var d = new Date();
selectedDate = buildDataview (d, "");
var selectedDateD = buildDisplayDate (selectedDate);
selectedDateLast = selectedDate;
document.getElementById(selectedDate).focus();

buildSelectData(selectedDate, "", "");
buildFileBarSelectedDataChart();
}
