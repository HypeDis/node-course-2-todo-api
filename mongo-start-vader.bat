#!/bin/batch
echo on
title Run MongoDB
cd /
cd program files\mongodb\server\3.6\bin\
mongod.exe --dbpath c:\dropbox\mongo-data
pause