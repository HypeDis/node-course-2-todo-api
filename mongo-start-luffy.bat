#!/bin/batch
echo on
title Run MongoDB
cd /
c:
cd program files\mongodb\server\3.6\bin\
mongod.exe --dbpath D:\dropbox\mongo-data
pause
