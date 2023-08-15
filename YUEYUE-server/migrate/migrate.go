package main

import (
	"YUEYUE/controller/user"
	"YUEYUE/mysql"
)

func init() {
	mysql.ConnectDB()
}
func main() {
	mysql.DB.AutoMigrate(user.User{}) //同步User表表结构
}
