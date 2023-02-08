package main

import (
	"net/http"
	"strings"
	"time"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() { 
	// Data Source Name (DSN) user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local
	dsn := "root:@tcp(127.0.0.1:3306)/websitedatabase?charset=utf8mb4&parseTime=True&loc=Local"

	r := gin.Default()

	config := cors.DefaultConfig()

	config.AllowHeaders = []string {"Authorization", "content-type"}
	config.AllowOrigins = []string {"http://localhost:4200"}

	r.Use(cors.New(config))

	r.GET("/ping", func(c *gin.Context) {
		// Status Code 200
		c.JSON(http.StatusOK, gin.H{
			"message" : "pong",
		})
	})

	r.POST("/register", func(c *gin.Context) {
		var registerData Register

		// Bind JSON data to object
		err := c.BindJSON(&registerData)
		if (err != nil) {
			c.JSON(http.StatusInternalServerError, "")
		}

		// Hash the password
		hashPass, err := HashPassword(registerData.Password)
		if (err != nil) {
			c.JSON(http.StatusInternalServerError, "")
		}

		var user User

		// Make a database connection
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

		// Make a new user when a user registers
		user = User{FirstName: registerData.FirstName, LastName: registerData.LastName, Email: registerData.Email, Password: hashPass}
		db.Create(&user)

		// Create a JSON Web Token (JWT) to login
		
	})
	

	// Runs server
	r.Run()
}

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

var jwtKey = []byte("secret_key")

// Register endpoint
type Register struct {
	FirstName string `json: firstName`
	LastName string `json: lastName`
	Email string `json: email`
	Password string `json: password`
}

// Login endpoint
type Login struct {
	Email string `json: email`
	Password string `json: password`
}

// User endpoint
type User struct {
	ID int64
	FirstName string `gorm:"column:firstName"`
	LastName string `gorm:"column:lastName"`
	Email string
	Password string
}

type Tabler interface {
	TableName() string
}

// Overrides the table name used by User to `profiles`
func (User) TableName() string {
	return "user"
}

// Used to hash the password the user inputs when making an account
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// Used to check if the password the user inputted when logging in matches the hashed password
func CheckPasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.Request.Header.Get("Authorization")
		substrings := strings.Split(authHeader, " ")
		tokenFromHeader := substrings[1]

		claims := jwt.MapClaims{}
		_, err := jwt.ParseWithClaims(tokenFromHeader, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtKey), nil
		})

		if (err != nil) {
			// Runs this if there is an error
			c.JSON(http.StatusInternalServerError, "")
		} else {
			c.Next()
		}
	}
}