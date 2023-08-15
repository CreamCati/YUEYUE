#!/bin/bash

cd "YUEYUE-server"
nohup go run main.go &

sleep 5

cd ".."
cd "YUEYUE-web"
npm run dev
