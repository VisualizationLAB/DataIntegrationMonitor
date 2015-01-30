' ************ HMR DATA LOAD REPORT ANALYTICS AUTOMATION - VISUALIZATION DATA ***********************************'
'This program takes data feed summary information and organizes it into date based data structure'
'Author: Ayindri Banerjee
'Date: 16th August 2013'
'********************************************************************************************
WScript.Echo "GENERATING VISUALIZATION DATA...."

Set objFileToRead = CreateObject("Scripting.FileSystemObject").OpenTextFile("C:\SummaryAll.txt",1)
Dim strLine
Dim strNewLine
Dim strAllLine
Dim strDate
do while not objFileToRead.AtEndOfStream
     strLine = objFileToRead.ReadLine()
     'Do something with the line
	 If (strLine <> "") Then
		'WScript.Echo strLine
		If InStr (strLine, "|Errors:|" ) <> 0 Then strLineErr  = Split(strLine, "|Errors:|") End If
		strLineArr = Split(strLine, "|")
		If InStr (strLine, "|Errors:|" ) <> 0 Then
			'WScript.Echo strLineArr(2)
			'strNewLine = strLineArr(0) & "," & strLineArr(2) & "," strLineArr(4) & "," & strLineArr(7) & "," & strLineArr(8) & "," & strLineArr(9) & "," & strLineArr(10) & "," & strLineArr(11) & "," & strLineArr(12) & "," & strLineArr(13) & "," & strLineErr(1) & ",Error" 
			strNewLine = strLineArr(0) & "," & strLineArr(2) & "," & strLineArr(4) & "," & strLineArr(7) & "," & strLineArr(8) & "," & strLineArr(9) & "," & strLineArr(10) & "," & strLineArr(11) & "," & strLineArr(12) & "," & strLineArr(13) & "," & strLineErr(1) & ",Error" 
		Else
			strNewLine = strLineArr(0) & "," & strLineArr(2) & "," & strLineArr(4) & "," & strLineArr(7) & "," & strLineArr(8) & "," & strLineArr(9) & "," & strLineArr(10) & "," & strLineArr(11) & "," & strLineArr(12) & "," & strLineArr(13)
		End If
		if InStr(strDate, strLineArr(0)) =0 Then  strDate = strDate & strLineArr(0) & vbCrLf End If
		strAllLine = strAllLine & strNewLine & vbCrLf
		'WScript.Echo strNewLine
	 End If
loop
objFileToRead.Close
Set objFileToRead = Nothing

arrDate = Split(strDate, vbCrLf)
arrLine = Split(strAllLine, vbCrLf)
'NewDtLine = "Date,StrDate,Tot_Records,Tot_Inserts,Tot_Updates,Tot_Failures,Tot_Duration_Secs,Tot_Duration_Hrs,File_Layouts,tot_emails,tot_unique_emails,Error_Msgs,Err_Ind,EmailStr" & vbCrLf
NewDtLine = "Date,StrDate,Tot_Records,Tot_Inserts,Tot_Updates,Tot_Failures,Tot_Duration_Secs,Tot_Duration_Hrs,tot_emails,tot_unique_emails,Err_Ind,EmailStr" & vbCrLf

'Dim arrDate(0)
For each Dt in arrDate
	if Dt <> "" Then 
	'WScript.Echo Dt
	'WScript.Echo IsDate(Dt)
	'WScript.Echo Month(Dt)
	'WScript.Echo Len(Month(Dt))
	'WScript.Echo Year(Dt)
	'WScript.Echo Day(Dt)
	'WScript.Echo Len(Day(Dt))
	If Len(Day(Dt)) = 1 Then 
		formattedDay = "0" & Day(Dt)
	Else 
		formattedDay = Day(Dt)
	End If
	
	If Len(Month(Dt)) = 1 Then 
		formattedDt = Year(Dt) & "-0" & Month(Dt) & "-" & formattedDay
	Else 
		formattedDt = Year(Dt) & "-" & Month(Dt) & "-" & formattedDay
	End If
	Tot_Records = 0
	Tot_Inserts = 0
	Tot_Updates = 0
	Tot_Errors = 0
	tot_Dur_Secs = 0
	tot_Dur_Hrs = 0
	tot_emails = 0
	tot_unique_emails = 0
	FileLayoutComplete = ""
	StrEliminateDups = ""
	
	strEmail = ""
	'FileLayouts = ""
	'Errors_Msgs = ""
	ErrInd = "" 
	For i= LBound(arrLine) to UBound(arrLine)
		if InStr(arrLine(i), Dt) <> 0 Then
			'WScript.Echo Dt
			'WScript.Echo arrLine(i)
			strLine =Split(arrLine(i), ",")
			'FileLayouts = FileLayouts & strLine(1) & "|"
			
			
			'tot_Dur_Secs = tot_Dur_Secs + CDBL(strLine(2))
			'tot_Dur_Hrs = tot_Dur_Hrs + CDBL(strLine(3))
			'Tot_Records = Tot_Records + CDBL(strLine(4))
			'Tot_Inserts = Tot_Inserts + CDBL(strLine(5))
			'Tot_Updates = Tot_Updates + CDBL(strLine(6))
			'Tot_Errors = Tot_Errors + CDBL(strLine(7))
			
			tot_Dur_Secs = tot_Dur_Secs + CDBL(strLine(3))
			tot_Dur_Hrs = tot_Dur_Hrs + CDBL(strLine(4))
			Tot_Records = Tot_Records + CDBL(strLine(5))
			Tot_Inserts = Tot_Inserts + CDBL(strLine(6))
			Tot_Updates = Tot_Updates + CDBL(strLine(7))
			Tot_Errors = Tot_Errors + CDBL(strLine(8))
			
			'StrFileLayoutComplete = strLine(1) & "-" & CDBL(strLine(6)) & "~" & CDBL(strLine(5)) & "~" & CDBL(strLine(4)) & "~" & CDBL(strLine(7)) & "~" & CDBL(strLine(3))
			strFileID = strLine(2) & Replace(strLine(1),":","")
			if (Dt = "2013-Jun-25") Then WScript.Echo Dt & "|" & strFileID End If
			if InStr(StrEliminateDups, strFileID) = 0 Then
				StrFileLayoutComplete = strLine(2) & Replace(strLine(1),":","") & "-" & CDBL(strLine(7)) & "~" & CDBL(strLine(6)) & "~" & CDBL(strLine(5)) & "~" & CDBL(strLine(8)) & "~" & CDBL(strLine(4))
			
			if InStr(arrLine(i), ",Error") <>0 Then 
				'Errors_Msgs = Errors_Msgs & strLine(9)
				'FileLayoutComplete = FileLayoutComplete & StrFileLayoutComplete & "~" & strLine(9) & ":"
				FileLayoutComplete = FileLayoutComplete & StrFileLayoutComplete & "~" & strLine(10) & ":"
				ErrInd = "Error"
			Else
				FileLayoutComplete = FileLayoutComplete & StrFileLayoutComplete &"~:"
			End If
			
			tot_emails = tot_emails +1
			
			'if InStr(strEmail, strLine(8)) = 0 Then
			if InStr(strEmail, strLine(9)) = 0 Then
				'strEmail = strEmail & strLine(8) & "|"
				strEmail = strEmail & strLine(9) & "|"
				tot_unique_emails = tot_unique_emails +1
			End If 'if InStr(strEmail, strLine(9)) = 0 Then
			End If ' if InStr(StrEliminateDups, strFileID) == 0 Then
		End If
	Next
	
	'DtLine = formattedDt & "," & Dt & "," & Tot_Records & "," & Tot_Inserts  & "," &  Tot_Updates & "," & Tot_Errors & "," & tot_Dur_Secs & "," & tot_Dur_Hrs & "," & FileLayouts & "," & tot_emails & "," & tot_unique_emails & "," & Errors_Msgs & "," & ErrInd & "," & FileLayoutComplete
	
	DtLine = formattedDt & "," & Dt & "," & Tot_Records & "," & Tot_Inserts  & "," &  Tot_Updates & "," & Tot_Errors & "," & tot_Dur_Secs & "," & tot_Dur_Hrs & "," & tot_emails & "," & tot_unique_emails & "," & ErrInd & "," & FileLayoutComplete
	
	
	'WScript.Echo DtLine
	NewDtLine = NewDtLine & DtLine & vbCrLf
	End if
Next
'WScript.Echo UBound(arrDate)
'WScript.Echo NewDtLine

'Set objFileToWrite = CreateObject("Scripting.FileSystemObject").OpenTextFile("C:\Documents and Settings\abaner02\My Documents\Ayindri_Documents\Projects\2013\Automation\Visualize\Calendar2.csv", 2, True)
Set objFileToWrite = CreateObject("Scripting.FileSystemObject").OpenTextFile("C:\Documents and Settings\abaner02\My Documents\Ayindri_Documents\Projects\2013\Automation\Visualize\Development\DataIntegrationMonitor-gh-pages_v4\DataIntegrationMonitor-gh-pages\Calendar.csv", 2, True)
objFileToWrite.WriteLine (NewDtLine)
objFileToWrite.Close
Set objFileToWrite = Nothing

'*********************** END OF FILE ***************************************************************************************
