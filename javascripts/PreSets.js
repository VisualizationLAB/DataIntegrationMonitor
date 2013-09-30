var width = screen.availWidth * 0.8,
	height = screen.availHeight * .2,
   //cellSize = width * 0.013; // cell size
   cellSize = 13.5; // cell size

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

var cellpadding = 2;
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
