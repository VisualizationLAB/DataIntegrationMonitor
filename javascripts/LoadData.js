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
								if (strFileErr.indexOf(strCurrErr[i]) == -1) strFileErr = strFileErr + strCurrErr[i] + "|";
								var datarow = {
								"Error_Msgs" : strCurrErr[i],
								"Tot_Failures" :  parseInt(strCurrErr[i+1])
								};
								ErrTree.push(datarow);
							
							}
							
							
						}
					}
					
				var newArr = strFileErr.split("|");
				var ErrCnt = parseInt(newArr.length-1);
				
				var datarow  = {
						"File_Layouts" : fileLayout[0],
						"Tot_Records" :  parseInt(EmailContent[2]),
						"Tot_Inserts" : parseInt(EmailContent[1]),
						"Tot_Updates" : parseInt(EmailContent[0]),
						"Tot_Failures" : parseInt(EmailContent[3]),
						"Tot_Duration_Hrs" : d3.round(Number(EmailContent[4]),2),
						"Error_Msgs" : ErrTree,
						//"File_Cnt" : parseInt(FileCnt),
						"Err_Cnt" : parseInt(ErrTree.length),
						//"tot_emails" : parseInt(d.tot_emails),
						};
						
				EmailTree.push(datarow);
				
				} // file layout name valid
				} //catch (err) {}
				});
			var newArr = strFile.split("|");
			var FileCnt = parseInt(newArr.length-1);
			
			var newArr = strFileErr.split("|");
			var ErrCnt = parseInt(newArr.length-1);
		}
		else 
		{
			var FileCnt = 0;
			var ErrCnt = 0;
		}
		
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
						//"File_Layouts" : d.File_Layouts,
						"File_Layouts" : strFile,
						//"Error_Msgs" : d.Error_Msgs,
						"Error_Msgs" : FileErr,
						"File_Cnt" : parseInt(FileCnt),
						"Err_Cnt" : parseInt(ErrCnt),
						"tot_emails" : parseInt(d.tot_emails),
						"tot_unique_emails" : parseInt(d.tot_unique_emails),
						"emails" : EmailTree
						};
		BIGDATA.push(datarow);
		}// only when date is not null (dataOriginal loop)
		})
console.log("BIGDATA");
console.log(BIGDATA);


drawCalender(select_1, "0");
buildSummaryData ();

var d = new Date();
selectedDate = buildDataview (d, "");
var selectedDateD = buildDisplayDate (selectedDate);
selectedDateLast = selectedDate;
document.getElementById(selectedDate).focus();

buildSelectData(selectedDate, "", "");
}
