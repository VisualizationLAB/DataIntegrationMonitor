// Build Selected Day on calendar Data

function buildSelectData (strDt, StrClass, dtNm) {
	SelectedData = [];
	
	var displayDt = buildDisplayDate(strDt);

	d3.select("#currDate").text(displayDt);

	selectedDate = strDt;
	try { document.getElementById(strDt).focus();
	}
	catch(err)
	{}

	var strFile = "";
	var strFileErr = "";
	
	var strFileErrCnt = "";

	var errMsgs = [];
	var errMsgsCnt = []
	var fileLayout = [];
	var fileLayout2 = [];
	var ErrArr = [];
	
	BIGDATA.forEach(function (d) {
		
		if (strDt == d.Date) 
		{
			console.log("original Selected Data");
			console.log(d);
			
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
									if (err_unique.indexOf(d.Error_Msgs) == -1) err_unique = err_unique + d.Error_Msgs + "|";
										err_msg.push(d);
								});
							}
						}
					}); // email loop

				// for each file layout if there are multiple emails, below code rolls up the error messages into distinct error types
				// THIS WILL NOT GIVE ACCURATE RESULTS FOR CASES WHEN "MemberNotFound" and "InsuredMemberNotFound" BOTH ARE PRESENT IN THE ERRORS
					if(err_msg.length > 0) {
						var arrErr = err_unique.split("|");
						arrErr.forEach(function(d) {
							if (d != "") {
								var currErr = d;
								var currVal = 0;
								err_msg.forEach ( function(d) {
									//console.log(d);
									if(d.Error_Msgs == currErr) {
										currVal = currVal + parseInt(d.Tot_Failures);
									}
								})
					
								var datarow = {"Error_Msgs" : currErr,
								"Tot_Failures" : parseInt(currVal)
									};
								err_msg_roll_up.push(datarow);
							}
						});
					
					}
					
					var datarow = {
				
						"Tot_Records" :  parseInt(count_tot),
						"Tot_Inserts" : parseInt(count_new),
						"Tot_Updates" : parseInt(count_upd),
						"Tot_Failures" : parseInt(count_err),
						"Tot_Duration_Hrs" : Number(dur_H),
						"File_Layouts" : currFileLayout,
						"tot_emails" : parseInt(count_emails),
						"Error_Msgs" : err_msg_roll_up,
						"Errors_cnt" : parseInt(err_msg_roll_up.length),
						"Error_Msgs2" : err_msg,
						"Errors_cnt2" : parseInt(err_msg.length)
					};
					fileLayout2.push(datarow);
				}

				});
			}//if (typeof(d.File_Layouts) == "string") 
			
			
		if (typeof(d.Error_Msgs) == "string" && d.Error_Msgs != "") 
		{ 
			var strErrString = d.Error_Msgs;
			//console.log("d.Error_Msgs");
			//console.log(d.Error_Msgs);
			strCurrErr = strErrString.split("|");
			var strUniqueErr = "";
			for (var i=0;i<strCurrErr.length;i++)
			{
				if (i%2 == 0 && strUniqueErr.indexOf(strCurrErr[i]) == -1) strUniqueErr = strUniqueErr + strCurrErr[i] +"|";
			}
			var UniqueArr = strUniqueErr.split("|");

			var strErrString = d.Error_Msgs;
			strCurrErr = strErrString.split("|");
			
			for (var i=0;i<strCurrErr.length;i++)
				{
				if (strFileErr.indexOf(strCurrErr[i]) == -1 && (i%2 == 0) ) 
					{
						strFileErr = strFileErr + strCurrErr[i] + "|";
						
					}
				if ((i%2 == 0) && strCurrErr[i] != "")  strFileErrCnt = strFileErrCnt + strCurrErr[i] + "-" + strCurrErr[i+1] + "|";
				}
			//}
			
			if (typeof(strFileErr) == "string") {
				var arrErr = strFileErr.split("|");
				arrErr.forEach( function(d) {
				if (d != "") errMsgs.push(d);
					})
				}
				
			if (typeof(strFileErrCnt) == "string") {
				var arrErrCnt = strFileErrCnt.split("|");
				arrErrCnt.forEach( function(d) {
				if (d != "") errMsgsCnt.push(d);
					})
				}
				
			for (var i=0;i<UniqueArr.length;i++)
			{
				
				var CurrErrCnt = 0;
				var tot_freq = 0;
				
				if (i%2 == 0 && UniqueArr[i] !="") { 
					//console.log("UniqueArr["+i+"]");
					//console.log(UniqueArr[i]);
					Emails.forEach (function (d) {
						if( d.Err_Cnt >0 ) {
						 d.Error_Msgs.forEach (function (x) {
							if(UniqueArr[i] == x.Error_Msgs) {
								CurrErrCnt = CurrErrCnt + parseInt(x.Tot_Failures);
								tot_freq = tot_freq +1;
							}//if(strCurrErr[i] == x.Error_Msgs)
						 }); //  end of d.Error_Msgs.forEach 
						}//if( d.Err_Cnt >0 )
					});//Emails.forEach
				
					var datarow = {"Error_Msgs": strCurrErr[i],
								"Tot_Failures" : parseInt(CurrErrCnt),
								"tot_emails" : tot_freq
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
						
						"File_Layouts" : parseInt(d.File_Cnt),
						"Files2" : fileLayout2,
						"emails": d.emails,
						"tot_emails" : parseInt(d.tot_emails),
						"tot_unique_emails" : parseInt(d.tot_unique_emails),
						
						"Errors" : errMsgs,
						"Errors_cnt" : errMsgsCnt,
						"Error_Msgs" : errMsgs.length,
						"Error_Arr": ErrArr
						
						
					}
					
			SelectedData.push(datarow);
			
			
		}
	})
	console.log("SelectedData");
	console.log(SelectedData);
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
