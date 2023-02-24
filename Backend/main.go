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

	config.AllowHeaders = []string{"Authorization", "content-type"}
	config.AllowOrigins = []string{"http://localhost:4200"}

	r.Use(cors.New(config))

	r.POST("/register", func(c *gin.Context) {
		var registerData Register

		// Bind JSON data to object
		// This gets the JSON data from the request body
		err := c.BindJSON(&registerData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")
		}

		// Hash the password
		hashPass, err := HashPassword(registerData.Password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")
		}

		// Make a database connection
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
		sql, _ := db.DB()
		if err != nil || sql.Ping() != nil {
			c.JSON(http.StatusOK, gin.H{
				"isSuccess": false,
				"message": "Error connecting to database",
			})
		}

		// Make a new user when a user registers
		var user = Users{FirstName: registerData.firstName, LastName: registerData.LastName, Email: registerData.Email, Password: hashPass}

		copy := db.FirstOrCreate(&user, Users{Email: registerData.Email})
		if copy.Error != nil {
			c.JSON(http.StatusOK, gin.H{
				"isSuccess": false,
				"message": "Error in database",
			})
		}
		if copy.RowsAffected == 1 {
			expirationTime := time.Now().Add(30000 * time.Minute)
			// Create the JWT claims, that includes the username and expiry time
			var claims = Claims{Email: registerData.Email, RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(expirationTime),
			},
			}

			token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

			// Creates the JWT string
			tokenString, err := token.SignedString(jwtKey)
			if err != nil {
				c.JSON(http.StatusInternalServerError, "")
			}

			c.JSON(http.StatusOK, gin.H{
				"isSuccess": true,
				"id":        user.ID,
				"jwt":       tokenString,
				"message":   "Successfully registered User",
			})
		} 
		if copy.RowsAffected == 0{
			c.JSON(http.StatusOK, gin.H{
				"isSuccess": false,
				"message":   "Email already in use",
			})
		}

		// Create a JSON Web Token (JWT) to login
		// Expiration time is in milliseconds
	})

	// This checks that the inputted username and password match the ones
	// in the database, and if so, it returns a JWT and logs in the user
	r.POST("/login", func(c *gin.Context) {
		var loginData Login
		var user Users

		// Bind JSON data to object
		// This gets the JSON data from the request body
		err := c.BindJSON(&loginData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "")
		}

		// Make a database connection
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
		sql, _ := db.DB()
		if err != nil || sql.Ping() != nil {
			c.JSON(http.StatusOK, gin.H{
				"isSuccess": false,
				"message": "Error connecting to database",
			})
		}
		db.First(&user, "email = ?", loginData.Email)

		checkPasswordHash := CheckPasswordHash(loginData.Password, user.Password)
		// If password is correct enter the if statement, otherwise cause an error
		if checkPasswordHash {
			// Expiration time is in milliseconds
			expirationTime := time.Now().Add(5 * time.Minute)

			// Create the JWT claims, that includes the username and expiry time
			var claims = Claims{Email: loginData.Email, RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(expirationTime),
			},
			}

			token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

			// Creates the JWT string
			tokenString, err := token.SignedString(jwtKey)
			if err != nil {
				c.JSON(http.StatusOK, "")
			}

			c.JSON(http.StatusOK, gin.H{
				"isSuccess": true,
				"jwt":       tokenString,
				"message":   "Successfully logged in",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"isSuccess": false,
				"message":   "Inccorect password",
			})
		}
	})

	// When the inputted username and password matches the ones stored,
	// the auth() method verifies the token that is found in the authorization header
	r.GET("/user-session", auth(), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"isSuccess": true,
			"message": "Success",
		})
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
	LastName  string `json: lastName`
	Email     string `json: email`
	Password  string `json: password`
}

// Login endpoint
type Login struct {
	Email    string `json: email`
	Password string `json: password`
}

// User endpoint
type Users struct {
	ID        int64
	FirstName string `gorm:"column:firstName"`
	LastName  string `gorm:"column:lastName"`
	Email     string
	Password  string
}

type Tabler interface {
	TableName() string
}

// Overrides the table name used by User to `profiles`
func (Users) TableName() string {
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
	if err == nil {
		return true
	} else {
		return false
	}
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

		if err != nil {
			// Runs this if there is an error
			c.JSON(http.StatusInternalServerError, "")
		} else {
			c.Next()
		}
	}
}
