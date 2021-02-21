Set WshShell = WScript.CreateObject("WScript.shell")
Return = WshShell.Run( "cmd.exe /C forever start server.js bin/www", 0, true )