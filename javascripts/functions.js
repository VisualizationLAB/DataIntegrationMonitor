// Contains the following functionc:
//1. getDomainMax()
//2. getData()
//3. mouseOver()
//4. buildDisplayDate()
//5. buildDataview()
//6. addCommas()
//7. type()
//8. getCatDesc()
//9. getErrData()


function type(d) {
  d.Cnt = +d.Cnt;
  return d;
}
// End of Line Chart Build
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}



function getDomainMax(val) {
switch (val)
{
case "tot":
  domainMax = d3.max(arrVol)
  break;
case "err":
  domainMax = d3.max(arrFail)
  break;
case "new":
  domainMax = d3.max(arrNew)
  break;
case "upd":
  domainMax = d3.max(arrUpd)
  break;
case "durH":
  domainMax = d3.max(arrDurHrs)
  break;
case "fileT":
  domainMax = d3.max(arrFileT)
  break;
 case "errT":
  domainMax = d3.max(arrErrT)
  break;
case "email":
  domainMax = d3.max(arrUniqueEmails)
  break;
}
//return domainMax;
}


function getData(val,opt1,opt2,opt3,opt4,opt5,opt6,opt7, opt8) {
switch (val)
{
case "tot":
  vData = opt1
  break;
case "err":
  vData = opt2
  break;
case "new":
  vData = opt3
  break;
case "upd":
  vData = opt4
  break;
case "durH":
  vData = opt5
  break;
 case "fileT":
  vData = opt6
  break;
 case "errT":
  vData = opt7
  break;
 case "email":
  vData = opt8
  break;
}
return vData;
}

function getErrData(val,failures,file_cnt,emails) {
switch (val)
{
case "tot":
  vData = failures
  break;
case "err":
  vData = failures
  break;
case "new":
  vData = failures
  break;
case "upd":
  vData = failures
  break;
case "durH":
  vData = failures
  break;
 case "fileT":
  vData = file_cnt
  break;
 case "errT":
  vData = failures
  break;
 case "email":
  vData = emails
  break;
}
return vData;
}

function mouseOver(Ind) {
			select_1 = Ind;
			var newSelecteddate = selectedDate;
			var textVal = document.getElementById(select_1).textContent;
			strSelectID  = textVal;
			d3.select("#sub_title").text(textVal);
			document.getElementById(selectedDateLast).focus();
			d3.selectAll("svg").remove();
			d3.selectAll(".svgContainer").remove();
			drawCalender(select_1, "1");
			//redrawFileBarChart();
			buildFileBarChart();
			buildSelectData(selectedDate, "", "");
			buildFileBarSelectedDataChart();
			document.getElementById(selectedDate).focus();
}



function buildDisplayDate (strDate) {

var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

var weekNames = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

var dayStr = d3.time.format("%a, %b %d %Y");
var newD = new Date(strDate);

//console.log("dayStr(strDate)");
//console.log(dayStr(strDate));
//console.log("strDate.getDay()");
//console.log(newD.getDay());
var currWeekDay = weekNames[newD.getDay()];
//console.log(currWeekDay);
var arrDate = strDate.split("-");

if (arrDate[1].substring(0,1) != "0") 
{	
	//console.log("typeof(arrDate[1]): 2");
	//console.log(typeof(arrDate[1]));
	//console.log(arrDate[1].substring(0,1) );
	var currmonth = monthNames[Number(arrDate[1])-1];
}
else 
{
	//console.log("typeof(arrDate[1]) : 1");
	//console.log(typeof(arrDate[1]));
	//console.log(arrDate[1].substring(0,1) );
	var currmonth = monthNames[Number(arrDate[1].substring(1,2))-1];
}
strDateX  = currWeekDay + ", " + currmonth + " " + arrDate[2] + " " + arrDate[0];

return strDateX;
}

function buildDataview (strDate, Ind) {

//console.log("buildDataview");
//console.log(Ind);
var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	
var d = strDate;
if (d.getDate().toString().length == 1)  {
	
	var curr_date = "0"+d.getDate();
	}
else var curr_date = d.getDate();

//var getDayStr = d.getDay();

var DCurrMonth = "";
var DCurrMonthInt = d.getMonth()+1;
if (Ind == "Display") { 
	DCurrMonth = monthNames[d.getMonth()];
}
else
{
	
	if (DCurrMonthInt.toString().length == 1) 
	{
		//console.log("HERER??");
		//console.log(d.getMonth());
		//console.log(d);
		//console.log(strDate);
		var curr_month = "0"+parseInt(d.getMonth()+1);
	}	
	else 
	{
		var curr_month = d.getMonth()+1; //Months are zero based
	}
}


var curr_year = d.getFullYear();
var strDateX = "";
selectedDate = curr_year + "-" + curr_month + "-" + curr_date;
//console.log(selectedDate);
if (Ind == "Display") { 
		strDateX  = DCurrMonth + " " + d.getDate() + " " + curr_year;
	}
else strDateX =  curr_year + "-" + curr_month + "-" + curr_date;
//console.log("strDate")
//console.log(strDateX)
return strDateX;
}

// get full decription of category

function getCatDesc (val) 
{
	switch (val)
	{															
		case "eli":
			fileClass = "Eligibility"
			break;
		case "pro":
			fileClass = "Provider"
			break;
		case "ceg":
			fileClass = "CEG"
			break;
		case "lab":
			fileClass = "LAB"
			break;
		case "PHA":
			fileClass = "Rx Claims"
			break;
		case "CLA":
			fileClass = "Claims"
			break;
		case "sys":
			fileClass = "Sysuser"
			break;															
	}
	return fileClass;
}
