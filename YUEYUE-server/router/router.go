package router

import (
	"YUEYUE/controller/user"
	"github.com/gin-gonic/gin"
	"net/http"
	"sync"
	"time"
)

func SetRouter() *gin.Engine {

	router := gin.Default()
	router.Use(IPRateLimitMiddleware())
	//跨域
	router.Use(Cors())
	//router.LoadHTMLGlob("templates/**/*") //加载模板   实装上线不需要

	// 登录相关api
	router.POST("/login", user.Login)
	router.POST("/reg", user.Reg)
	return router
}

func Cors() gin.HandlerFunc {
	return func(context *gin.Context) {
		method := context.Request.Method
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
		context.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		context.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
		context.Header("Access-Control-Allow-Credentials", "true")
		if method == "OPTIONS" {
			context.AbortWithStatus(http.StatusNoContent)
		}
		context.Next()
	}
}

var (
	ipRequestsMap = make(map[string][]time.Time)
	mu            sync.Mutex
)

func IPRateLimitMiddleware() gin.HandlerFunc { // 10秒内允许访问10次
	return func(c *gin.Context) {
		ip := c.ClientIP()

		mu.Lock()
		defer mu.Unlock()

		now := time.Now()
		if len(ipRequestsMap[ip]) >= 10 {
			// 删除时间窗口之前的记录
			for len(ipRequestsMap[ip]) > 0 && now.Sub(ipRequestsMap[ip][0]).Seconds() > 10 {
				ipRequestsMap[ip] = ipRequestsMap[ip][1:]
			}

			if len(ipRequestsMap[ip]) >= 10 {
				c.JSON(http.StatusTooManyRequests, gin.H{"message": "Too many requests from this IP"})
				c.Abort()
				return
			}
		}

		ipRequestsMap[ip] = append(ipRequestsMap[ip], now)

		c.Next()
	}
}
