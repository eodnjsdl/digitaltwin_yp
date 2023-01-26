@echo off

cd js/map
set targetname="dtmap-urls.10.20.30.81.js"
set ogname="dtmap-urls.js"
Xcopy %targetname% %ogname% /y
echo ===message===: %targetname% 를 %ogname% 에 덮어쓰기 완료!
cd ..
pause