@echo Off
cscript.exe "C:\Documents and Settings\abaner02\My Documents\Ayindri_Documents\Projects\2013\Automation\Automation8_NonUnique.vbs" %*
cscript.exe "C:\Documents and Settings\abaner02\My Documents\Ayindri_Documents\Projects\2013\Automation\Append.vbs" %*
cscript.exe "C:\Documents and Settings\abaner02\My Documents\Ayindri_Documents\Projects\2013\Automation\GenerateVisualizationData4.vbs" %*
set pathname="C:\Documents and Settings\abaner02\My Documents\Ayindri_Documents\Projects\2013\Automation\Visualize\Development\DataIntegrationMonitor-gh-pages_v4\DataIntegrationMonitor-gh-pages"
pushd %Pathname%

REM start chrome.exe "http://localhost:8888/Calendar.html"
start firefox.exe "http://localhost:8888/Calendar.html"
c:\python27\python.exe -m SimpleHTTPServer 8888 &
pause
