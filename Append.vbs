'***********************************************************************************
'This Program copyies emails of one day and append to master file "SummaryAll.txt"
'And also makes a backup of "SummaryAll.txt" before appending new emails to it
'***********************************************************************************
strFileNm = "C:\SummaryAll_" & Month(Date) & Day(Date) & Year(Date) & ".txt"
WScript.Echo strFileNm

Set objFileToRead = CreateObject("Scripting.FileSystemObject").OpenTextFile(strFileNm,1)

Dim strLine
'Dim strNewLine
Dim strAllLine
'Dim strDate
do while not objFileToRead.AtEndOfStream
     strLine = objFileToRead.ReadLine()
     'Do something with the line
	 If (strLine <> "") Then
		strAllLine = strAllLine & strLine & vbCrLf
		'WScript.Echo strNewLine
	 End If
loop
objFileToRead.Close
Set objFileToRead = Nothing

Dim FSO
Set FSO = CreateObject("Scripting.FileSystemObject")
FSO.CopyFile "C:\SummaryAll.txt", "C:\BackUp_SummaryAll_" & Month(Date) & Day(Date) & Year(Date) & " .txt"
Set FSO = nothing

Const ForAppending = 8

Set objSummFileWrite = CreateObject("Scripting.FileSystemObject").OpenTextFile("C:\SummaryAll.txt", ForAppending, True)
objSummFileWrite.WriteLine (strAllLine)
objSummFileWrite.Close
Set objSummFileWrite = Nothing
