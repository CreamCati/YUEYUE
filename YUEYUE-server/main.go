package main

import (
	"YUEYUE/mysql"
	"YUEYUE/router"
)

func init() {
	mysql.ConnectDB()
}
func main() {
	router := router.SetRouter()
	router.Run(":88")
}
