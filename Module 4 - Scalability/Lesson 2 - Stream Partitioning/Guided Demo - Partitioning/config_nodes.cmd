@echo off
cls
:start
echo.
echo. This script starts a Pentaho Cluster.
echo.
echo. 1. Master Server - p 11000
echo.    wait until Master node is in listening mode
echo.
echo. 2. Slave Node 1  - p 11100
echo.    configured via xml file
echo.
echo. 3. Slave Node 2  - p 11110
echo.
echo.
echo.
set /p x= Select an Option:
IF '%x%' == '%x%' GOTO Item_%x%

:Item_1
CD \Pentaho\design-tools\data-integration\
start  carte localhost 11000
GOTO Start

:Item_2
CD \Pentaho\design-tools\data-integration\
start carte carte-config-11100.xml
GOTO Start

:Item_3
CD \Pentaho\design-tools\data-integration\
start carte localhost 11110
GOTO Start

:Item_4
exit
