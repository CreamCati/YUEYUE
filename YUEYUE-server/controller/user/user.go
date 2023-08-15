package user

import (
	"YUEYUE/mysql"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func Login(context *gin.Context) {
	var body User
	err := context.Bind(&body)
	if err != nil {
		return
	}
	var user User
	// "name=? AND id=?"
	err = mysql.DB.Where("username = ? AND password = ?", body.Username, body.Password).First(&user).Error
	if err != nil {
		// 处理错误
		context.JSON(http.StatusOK, gin.H{
			"code": "204",
			"msg":  "用户或密码错误",
		})
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"code":   "200",
		"token":  GetToken(body.Username),
		"userId": user.ID,
	})
}

// 密钥，用于签名令牌
var secretKey = []byte("zml")

func GetToken(Key string) string {
	// 创建一个 JWT Token
	token := jwt.New(jwt.SigningMethodHS256)

	// 设置令牌的声明
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = Key
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // 令牌过期时间

	// 签名令牌
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		fmt.Println("Error generating token:", err)
		return ""
	}
	return tokenString
}

func checkToken(tokenString string) string {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil {
		return err.Error()
	}

	claims := token.Claims.(jwt.MapClaims)
	userName := claims["sub"].(string)

	return userName
}
func Reg(context *gin.Context) {
	var body User
	err := context.Bind(&body)
	if err != nil {
		return
	}
	err = mysql.DB.Create(&body).Error
	if err != nil {
		context.JSON(http.StatusOK, gin.H{
			"code": "204",
			"msg":  "注册失败，可能用户已存在，当然不排除代码有问题",
		})
		return
	}
	context.JSON(http.StatusOK, gin.H{
		"code": "200",
		"msg":  "注册成功",
	})
}
