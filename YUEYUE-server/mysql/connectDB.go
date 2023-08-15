package init

import (
	"github.com/joho/godotenv"
	"gorm.io/gorm"
	"log"
)
import "gorm.io/driver/mysql"

var DB *gorm.DB

func ConnectDB() {
	//  数据库连接
	_ = godotenv.Load()

	// 账号：密码@tcp(ip:端口)/数据库?连接配置信息
	dsn := "user:root@tcp(8.130.67.219:3306)/yueyue?charset=utf8"

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("请确认数据库配置信息，当前连接为:", dsn, "\nerror信息：", err)
	}
}
