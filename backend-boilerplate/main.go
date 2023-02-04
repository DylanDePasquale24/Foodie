package main

func main() {
	a := App{}
	a.Initialize("user", "pass", "loginInfo")
	a.Run(":8010")
}
