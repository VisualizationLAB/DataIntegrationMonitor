var width = screen.availWidth * 0.8,
	height = screen.availHeight * .2,
   cellSize = width * 0.013; // cell size

var widthLine = screen.availWidth * .5 ,
heightLine = height,
//widthbar = screen.availWidth * 0.001953;
widthbar = screen.availWidth * 0.001954;

var heightC4 = cellSize * 14,
widthC4 = cellSize * 60;

var widthCalendar = cellSize * 58;
var heightCalendar = cellSize * 10;
//var verticalCalendarOffset = heightCalendar * .1;
if (screen.availWidth > 1280) { 
console.log("here");
	var verticalCalendarOffset = 20;
}
else 
{
	console.log("here2");
	var verticalCalendarOffset = 70;
}
console.log(screen.availWidth);
console.log(screen.availHeight);

var horizontalCalendarOffset = widthCalendar * .1;
var calendarStart = 2013;
var calendarEnd = 2014;

var cellpadding = 2;
var cellpaddingD = 0;

var borderT = 0;
var borderT2 = 0;

var widthBarChart = cellSize * 10;

var dataOriginal;
var arrayRange = 12;
var domainMax = 20000000;
var domainMin = 0;
//Controls
var select_1 = "err";
var strSelectID = "FAILED RECORDS";
var select_Class = "";
var BIGDATA = [];
var dataBIG = [];
var DateArr = [];
var DateArrCumm = [];
var lineData = [];
var BarChartData = [];
var selectedDate = ""
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
