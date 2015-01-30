' ************ HMR DATA LOAD REPORT ANALYTICS AUTOMATION ***********************************'
'This program reads all Data load Report emails and outputs the summary to a .txt file'
'Author: Ayindri Banerjee
'Date: 16th August 2013'
'********************************************************************************************
WScript.Echo "HMR DATA LOAD REPORT ANALYTICS AUTOMATION"

Dim StrSummary
Dim objSummFileWrite
Dim Failures
Dim strDays
Dim StrTot
Dim StrUpdates
Dim StrInserts
Dim StrDuration
Dim StrFileLayout
Dim txtFileStrAll
Dim TotalEmails

Dim strSubjectCont
strSubjectCont = "" 

'txtFileStrAll = "DATE_TIME|FILE_LAYOUT|DATE|IDENT|DURATION-SEC|DURATION-HRS|TOTAL|INSERTS|UPDATES|FAILURES|FILE_NM|MSG" & vbCrLf



'Set myOutlook = Outlook.Application
Set myOutlook = CreateObject("Outlook.application")
'On Error Goto err_handler
 	'Set myOutlook = CreateObject("Outlook.application")
'err_handler:
 	 ' MsgBox "The code failed at line " & Erl, vbCritical
Set myNameSpace = myOutlook.GetNamespace("MAPI")
Set myFolders = myNameSpace.Folders
Set myFoldersI = myFolders("Personal Folders").Folders

Set objFolder = myFoldersI("HMR").Folders("Data Load")
Set myFoldersI2 = myFoldersI("HMR").Folders
Set objDESTFolder = myFoldersI2("Data Load").Folders("PROCESSED2")
Set objDESTFolder2 = myFoldersI2("Data Load").Folders("NON_DUPS")
Set objDESTFolder3 = myFoldersI2("Data Load").Folders("DUPS")

'Set objFolder = myFoldersI2("Data Load").Folders("PROCESSED3")
Set objFolder = myFoldersI("HMR").Folders("Data Load")
'WScript.Echo TypeName(objFolder)
'WScript.Echo objFolder


	  
Call ProcessFolder(objFolder)

'*********************** SUB ROUTINE ********************************************************

Sub ProcessFolder(strFolder)

On Error Resume Next

WScript.Echo strFolder
WScript.Echo TypeName(strFolder)
Set colItems = strFolder.Items
Wscript.Echo "No. of items in Inbox: " & colItems.Count


Dim objItem
Dim iCount
Dim ALLCount
Dim txtFileStr
Dim objFileWrite

txtFileStr = "DATE_TIME|FILE_LAYOUT|DATE|IDENT|DURATION-SEC|DURATION-HRS|TOTAL|INSERTS|UPDATES|FAILURES|FILE_NM|MSG" & vbCrLf
strSender = "bcbsma_prod@bcbsma.com"
strSubject = "SUMMARY: Environment: PROD - DATALOAD REPORT FOR:" 

For Each objItem In strFolder.Items
	'WScript.Echo "GOOD"
	'WScript.Echo "objItem"
	'WScript.Echo objItem
	'WScript.Echo objItem.Sender
	'WScript.Echo ((objItem.Sender = strSender) = -1)
	'WScript.Echo "objItem.Subject"
	'WScript.Echo objItem.Subject
	'WScript.Echo InStr(objItem.Subject, strSubject)
	'WScript.Echo (objItem.Sender = strSender and InStr(objItem.Subject, strSubject) <> 0)
	' Check for Email sender "bcbsma_prod@bcbsma.com" and Email Subject contains "SUMMARY: Environment: PROD - DATALOAD REPORT FOR:"
	If objItem.Sender = strSender and InStr(objItem.Subject, strSubject) <> 0 Then
		'WScript.Echo "GOOD" & iCount
		'WScript.Echo objItem.Sender
		'WScript.Echo objItem.Subject
		'WScript.Echo "GOOOOOOOD"
		'WScript.Echo objItem.Subject
		'and InStr(strSubjectCont, objItem.Subject) =0
		
		' Parsing EMAIL BODY - START
		strBody = objItem.Body
		strBodyT = Replace(strBody, vbCrLf, "|")
		strBodyT = Replace(strBodyT, "-Duration: ", "")
		strBodyT = Replace(strBodyT, "seconds (", "|")
		strBodyT = Replace(strBodyT, "hours)", "|")
    
		strBodyT = Replace(strBodyT, ", inserts=", "|")
		strBodyT = Replace(strBodyT, ", updates=", "|")
		strBodyT = Replace(strBodyT, ", failures=", "|")
		strBodyT = Replace(strBodyT, "File: ", "")
		strBodyT = Replace(strBodyT, "Record Counts: total", "")
		strBodyT = Replace(strBodyT, " : ", "|")
    
		strBodyT = Replace(strBodyT, "=", "")
		strBodyT = Replace(strBodyT, "||", "|")
		'WScript.Echo strBodyT
		' Parsing EMAIL BODY - END
		' "DATE_TIME|FILE_LAYOUT|DATE|IDENT|DURATION-SEC|DURATION-HRS|TOTAL|INSERTS|UPDATES|FAILURES|FILE_NM|MSG"
		strBodyT2 = Split(strBodyT, "|")
		lineStr = ""   
		
		For i = LBound(strBodyT2) To UBound(strBodyT2)
			'WScript.Echo "EXCELLENT"
			' strBodyT2(0) = DATE_TIME 
			' 1> Below code is parsing the strBodyT2(0) which has date, time and weekday name and creating the following - YYYY-MM-DD|time|
			' 2> Also adding the parsed Date|Time| string to the 'lineStr' which the string build for each email.
			' 3> Creating list of UNIQUE days
			Dim StrDate
			StrDate = Replace(strBodyT2(0), " ", "|")
			StrDateArr = Split(StrDate, "|")
			strDate = StrDateArr(3) & "-" & StrDateArr(2) & "-" & StrDateArr(1)
			strDayTime = "|" & Replace(StrDateArr(0), ",","") & "|" & StrDateArr(4) & "|"
			'Below code is Creating list of unique dates
			If (InStr(strDays, strDate) = 0) Then 
				strDays = strDays & strDate & "|"
			End If
			
			' FOR NON CLAIM EMAILS:
			If InStr(objItem.Subject, "Claims") = 0 Then
				'WScript.Echo "NON CLAIM"
				' 1> For NON CLAIMS emails ignore the first 2 elements - which is the 'date-time' and the 'subject' of the email
				'    Adding the parsed Date|Time| string to the 'lineStr' which the string build for each email.
				If i <> 0 and i <> 1 Then
					If strBodyT2(i) <> "" Then
						lineStr = lineStr & Trim(strBodyT2(i)) & "|"
					End If
				' 1> For NON CLAIMS emails for the first 2 elements - which is the 'date-time' and the 'subject' of the email
				'    identify the 'subject' element and extract the 'file layout name' from it.
				' 	 Adding the parsed FileLayout| string to the 'lineStr' which the string build for each email.
				' 2> And create a UNIQUE list of 'file layouts'
				Else
					strData = Replace(Trim(strBodyT2(i)), "SUMMARY - Environment: PROD - DATALOAD REPORT FOR: jiva-bcbsma-", "")
					strData = Replace(strData, ".txt", "")
					strData = Replace(strData, "_", "|")
					
					lineStr = lineStr & strData & "|"
					
					'Below code is Creating list of unique file layouts
					strFile = Split(strData, "|" )
					If (InStr(StrFileLayout, strFile(0)) = 0) Then 
						StrFileLayout = StrFileLayout & strFile(0) & "|"
					End If
				End If
			' FOR CLAIM EMAILS:
			Else
				'WScript.Echo "CLAIMS"
				Dim StrFile
				' 1> For CLAIMS emails ignore the 2nd and 8th elements - which is the 'subject' and the 'Number of records in where mbr_idn is null is: 0' of the email.
				' Also adding the parsed the email body string to the 'lineStr' which the string build for each email.
				If i <> 1 and i <> 7 Then
					If strBodyT2(i) <> "" Then
						lineStr = lineStr & Trim(strBodyT2(i)) & "|"
					End If
				Else
					' for the Subject and Last element in email make uniform "|" delimited format.
					strData = Replace(Trim(strBodyT2(i)), ":", "|")
					strData = Replace(strData, ",", "|")
				
					' 1> For Subject extract the 'File layout' and add to 'lineStr'
					' 2> Add to unique list of file layouts.
					if i = 1 Then 
						strDataArr = Split(strData, "|")
						strCnt  = UBound(strDataArr)
						' get last element "SUMMARY - Environment: PROD - DATALOAD REPORT FOR: Claims, BATCH_TYPE: CLAIM_LINE"
						StrFile = Trim(strDataArr(strCnt))
						If (InStr(StrFileLayout, StrFile) = 0) Then 
							StrFileLayout = StrFileLayout & StrFile & "|"
						End If
						'lineStr = lineStr & Trim(strDataArr(2)) & "|||" 
						'lineStr = lineStr & Trim(strDataArr(4)) & "|||" 
						lineStr = lineStr & StrFile & "|||" 
					End If
					' 1> For last element find if there are any errors 'Number of records in where mbr_idn is null is: 0'. 
					' If found or not found add to 'lineStr' appropriately
					If i = 7 Then 
						strData = Replace(strData," ", "|")
						strDataArr = Split(strData, "|")
						lineStr = lineStr & Trim(strDataArr(0)) & "|" & StrFile & "|"
						strCnt  = UBound(strDataArr)
						If CInt(strDataArr(strCnt)) > 0 Then
							lineStr = lineStr & "Errors:|Claims_NullMBRIDN|" & Trim(strDataArr(strCnt)) & "|"
						Else
							lineStr = lineStr & "No Errors Found.|"
						End If
					End If
				End If
			End If
		Next
		lineStr = strDate & strDayTime & lineStr

		'WScript.Echo strDate & strDayTime & "|" & objItem.Subject '--->Uncomment Later
	
		
	
		If InStr(objItem.Subject, "Claims") = 0 Then 
			StrMatchSub = objItem.Subject
		Else 
			StrMatchSub = objItem.Subject & strDate & strDayTime
		End If
		
		lineArr = split(lineStr, "|")
		'WScript.Echo "Len(strSubjectCont)"
		'WScript.Echo Len(strSubjectCont)
		if InStr(strSubjectCont, StrMatchSub) =0 Then 
				txtFileStr = txtFileStr & lineStr & vbCrLf
				txtFileStrAll = txtFileStrAll & lineStr & vbCrLf
				iCount = iCount + 1
				Failures = Failures + CLng(lineArr(12))
				StrTot = StrTot + CLng(lineArr(9))
				StrUpdates = StrUpdates + CLng(lineArr(11))
				StrInserts = StrInserts + CLng(lineArr(10))
				StrDuration = StrDuration + CDbl(lineArr(8))
				
				' Script for moving the read emails to the 'PROCESSED FOLDER'
				WScript.Echo objItem
				'objItem.copy objDESTFolder2
		else
			WScript.Echo "SKIPPED"
			WScript.Echo ALLCount
			WScript.Echo objItem
			
			'objItem.copy objDESTFolder3
		End If

		If InStr(objItem.Subject, "Claims") = 0 Then 
			strSubjectCont = strSubjectCont & objItem.Subject & "|" 
		Else 
			strSubjectCont = strSubjectCont & objItem.Subject & strDate & strDayTime & "|"
		End If
		
		
		
	End If
	
	
	ALLCount = ALLCount +1
	
Next
'WScript.Echo txtFileStr


Set colItems = strFolder.Items
Set objItem = colItems.Find("[SenderName] = 'bcbsma_prod@bcbsma.com'")

Do While TypeName(objItem) <> "Nothing"
    objItem.Move objDESTFolder
	WScript.Echo "MOVING"
	WScript.Echo objItem
    Set objItem = colItems.FindNext
Loop

WScript.Echo strFolder
WScript.Echo TypeName(strFolder)
Set colItems = strFolder.Items
Wscript.Echo "No. of items in" & strFolder & ": " & colItems.Count

Set colItems = objDESTFolder2.Items
Wscript.Echo "No. of items in NON_DUPS: " & colItems.Count

Set colItems = objDESTFolder3.Items
Wscript.Echo "No. of items in DUPS: " & colItems.Count


StrSummary = StrSummary & "Total emails for Folder " & strFolder & " : " & iCount & vbCrLf
TotalEmails = TotalEmails + iCount
strFolderNm = strFolder & "_" & Month(Date) & Day(Date) & Year(Date) 
Set objFileToWrite = CreateObject("Scripting.FileSystemObject").OpenTextFile("C:\Mail" & strFolderNm & ".txt", 2, True)
objFileToWrite.WriteLine (txtFileStr)
objFileToWrite.Close
Set objFileToWrite = Nothing


End Sub
'********************** END OF SUB ROUTINE *********************************************************************************

WScript.Echo StrSummary
WScript.Echo "Total Records : " & StrTot
WScript.Echo "Total EMAILS READ: " & ALLCount
WScript.Echo "Total UNIQUE EMAILS READ: " & TotalEmails
WScript.Echo "Inserted Records : " & StrInserts & " ( " & Round(StrInserts/StrTot *100) & "% )"
WScript.Echo "Updated Records : " & StrUpdates & " ( " & Round(StrUpdates/StrTot *100) & "% )"
WScript.Echo "Failed Records : " & Failures & " ( " & Round(Failures/StrTot *100) & "% )"
WScript.Echo "Total Load Time : " & StrDuration & " Hrs"

FileLayout = UBound(Split(StrFileLayout, "|"))
WScript.Echo "Total File Layouts : " & FileLayout
CntDays = UBound(Split(strDays, "|"))
WScript.Echo "Total Days : " & CntDays

strFolderNm = strFolder & "_" & Month(Date) & Day(Date) & Year(Date) 
Set objSummFileWrite = CreateObject("Scripting.FileSystemObject").OpenTextFile("C:\Summary_" & strFolderNm & ".txt", 2, True)
objSummFileWrite.WriteLine (StrSummary)
objSummFileWrite.Close
Set objSummFileWrite = Nothing

Set objSummFileWrite = CreateObject("Scripting.FileSystemObject").OpenTextFile("C:\SummaryAll_" & Month(Date) & Day(Date) & Year(Date)  & ".txt", 2, True)
objSummFileWrite.WriteLine (txtFileStrAll)
objSummFileWrite.Close
Set objSummFileWrite = Nothing

'myOutlook.Quit
Set myOutlook = Nothing

'Set objShell = CreateObject("WScript.Shell")
'objShell.run("cscript GenerateVisualizationData.vbs")


'*********************** END OF FILE ***************************************************************************************
