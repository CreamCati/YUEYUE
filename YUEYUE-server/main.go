package main

import (
	"YUEYUE/router"
	"fmt"
)

func main() {
	fmt.Print("123")
	router := router.SetRouter()
	router.Run()
}
