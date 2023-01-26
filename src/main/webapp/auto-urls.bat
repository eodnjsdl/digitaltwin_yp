@echo off

cd js/map
set targetname="dtmap-urls.10.20.30.81.js"
set ogname="dtmap-urls.js"
Xcopy %targetname% %ogname% /y
echo ===message===: %targetname% is copied to %ogname% :)
cd ..
pause