package main

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Data Source Name (DSN) user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local
var dsn = "foodieuser:foodiepass@tcp(db4free.net:3306)/websitedatabase?charset=utf8mb4&parseTime=True&loc=Local"

// Make a database connection
var db, _ = gorm.Open(mysql.Open(dsn), &gorm.Config{})

// var sql, _ = db.DB()
// if err != nil || sql.Ping() != nil {
// 	ginContext.JSON(http.StatusInternalServerError, "Could not connect to database.")
// }

func main() {

	// Starts the router
	router := setupRouter()

	// POST /register
	RouterPOSTRegister(router)

	// POST /login
	RouterPOSTLogin(router)

	// GET /user-session
	RouterGETUserSession(router)

	// POST /recipeCreate
	RouterPOSTRecipeCreate(router)

	// GET /recipeGet
	RouterGETRecipe(router)

	// Runs server
	router.Run()
}

// Starts the router
func setupRouter() *gin.Engine {
	router := gin.Default()
	config := cors.DefaultConfig()

	config.AllowHeaders = []string{"Authorization", "content-type"}
	config.AllowOrigins = []string{"http://localhost:4200"}

	router.Use(cors.New(config))

	return router
}

func RouterPOSTRegister(router *gin.Engine) {
	router.POST("/register", func(ginContext *gin.Context) {
		var registerData Register

		// Bind JSON data to object
		// This gets the JSON data from the request body
		err := ginContext.BindJSON(&registerData)
		if err != nil {
			ginContext.JSON(http.StatusInternalServerError, "Could not parse user data.")
		}

		// Hash the password
		hashPass, err := HashPassword(registerData.Password)
		if err != nil {
			ginContext.JSON(http.StatusInternalServerError, "Could not securely hash password.")
		}

		// Make a new user when a user registers
		var user = Users{FirstName: registerData.FirstName, LastName: registerData.LastName, Email: registerData.Email, Password: hashPass}

		copy := db.FirstOrCreate(&user, Users{Email: registerData.Email})
		if copy.Error != nil {
			ginContext.JSON(http.StatusInternalServerError, "Could not create user.")
		} else if copy.RowsAffected == 1 {
			expirationTime := time.Now().Add(30000 * time.Minute)
			// Create the JWT claims, that includes the username and expiry time
			var claims = Claims{Email: registerData.Email, RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(expirationTime),
			},
			}

			// Create a JSON Web Token (JWT)
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

			// Creates the JWT string
			tokenString, err := token.SignedString(jwtKey)
			if err != nil {
				ginContext.JSON(http.StatusInternalServerError, "Couldn't create jwt.")
			}

			ginContext.JSON(http.StatusOK, gin.H{
				"id":         user.ID,
				"usersFName": user.FirstName,
				"usersLName": user.LastName,
				"jwt":        tokenString,
			})
		} else {
			ginContext.JSON(http.StatusInternalServerError, "Email already in use.")
		}
	})

}

func RouterPOSTLogin(router *gin.Engine) {
	// This checks that the inputted username and password match the ones
	// in the database, and if so, it returns a JWT and logs in the user
	router.POST("/login", func(ginContext *gin.Context) {
		var loginData Login
		var user Users

		// Bind JSON data to object
		// This gets the JSON data from the request body
		err := ginContext.BindJSON(&loginData)
		if err != nil {
			ginContext.JSON(http.StatusInternalServerError, "Could not parse user data.")
		}

		//check for email in database and check if password matches if email exists.
		if err := db.Find(&user, "email = ?", loginData.Email).Error; err != nil {
			ginContext.JSON(http.StatusInternalServerError, "Email doesn't exist.")
		} else {
			db.First(&user, "email = ?", loginData.Email)
			checkPasswordHash := CheckPasswordHash(loginData.Password, user.Password)
			// If password is correct enter the if statement, otherwise cause an error
			if checkPasswordHash {
				expirationTime := time.Now().Add(5 * time.Minute)

				// Create the JWT claims, that includes the username and expiry time
				var claims = Claims{Email: loginData.Email, RegisteredClaims: jwt.RegisteredClaims{
					// Expiration time is in milliseconds
					ExpiresAt: jwt.NewNumericDate(expirationTime),
				},
				}

				// Create a JSON Web Token (JWT)
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

				// Creates the JWT string
				tokenString, err := token.SignedString(jwtKey)
				if err != nil {
					ginContext.JSON(http.StatusInternalServerError, "Could not create jwt.")
				}

				ginContext.JSON(http.StatusOK, gin.H{
					"id":         user.ID,
					"usersFName": user.FirstName,
					"usersLName": user.LastName,
					"jwt":        tokenString,
				})
			} else {
				ginContext.JSON(http.StatusInternalServerError, "Incorrect password.")
			}
		}
	})
}

func RouterGETUserSession(router *gin.Engine) {
	// When the inputted username and password matches the ones stored,
	// the auth() method verifies the token that is found in the authorization header
	router.GET("/user-session", auth(), func(ginContext *gin.Context) {
		ginContext.JSON(http.StatusOK, "Success")
	})
}

func RouterPOSTRecipeCreate(router *gin.Engine) {
	// If there are no errors, this should make a recipe entry in the database

	//TODO: Auth isn't working properly (add it)
	//when unauthorized jwt, it says unauthorized, but still continues to next function and posts.
	router.POST("/recipeCreate", func(ginContext *gin.Context) {
		var recipeCreate RecipeInData

		// Bind JSON data to object
		// This gets the JSON data from the request body
		err := ginContext.BindJSON(&recipeCreate)
		if err != nil {
			ginContext.JSON(http.StatusInternalServerError, "Could not parse recipe data.")
		}

		ins := fmt.Sprint(recipeCreate.Ingredients)
		IngredientStr := strings.Split(ins, ",")
		Ingreds := strings.Join(IngredientStr, " ")

		// Make a new recipe when created
		var recipe = Recipes{UserID: recipeCreate.UserID, RecipeName: recipeCreate.RecipeName, Description: recipeCreate.Description, Ingredients: Ingreds, Instructions: recipeCreate.Instructions}

		copy := db.FirstOrCreate(&recipe, Recipes{UserID: recipeCreate.UserID, RecipeName: recipeCreate.RecipeName})
		if copy.Error != nil {

			ginContext.JSON(http.StatusInternalServerError, "Could not create recipe.")
		} else if copy.RowsAffected == 1 {
			ginContext.JSON(http.StatusOK, gin.H{
				"id": recipe.RecipeID,
			})
		} else {
			ginContext.JSON(http.StatusOK, gin.H{
				"id": recipe.RecipeID,
			})
			ginContext.JSON(http.StatusInternalServerError, "Recipe already in use.")
		}
	})
}

func RouterGETRecipe(router *gin.Engine) {

	//TODO: add auth back! wasnt working properly
	router.GET("/recipeGet/:userid", func(c *gin.Context) {

		userID := c.Param("userid")

		userIDint, _ := strconv.Atoi(userID)

		var recipeInfo []Recipes

		/* Queries the database to find all the recipes that were made by the specified userID
		   and stores them in recipeInfo
		*/
		result := db.Table("recipes").Where(&Recipes{UserID: int64(userIDint)}).Find(&recipeInfo)

		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, result.Error)
		} else if result.RowsAffected == 0 {
			c.JSON(http.StatusInternalServerError, "No recipes linked to that userID were found")
		} else {
			c.JSON(http.StatusOK, recipeInfo)
		}

	})
}

// func RouterGETMacros(router *gin.Engine) {
// 	router.GET(":recipeID/macros", func(c *gin.Context) {

// 		recipeID := c.Param("recipeID")

// 		recIDint, _ := strconv.Atoi(recipeID)

// 		// Make a database connection
// 		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
// 		sql, _ := db.DB()
// 		if err != nil || sql.Ping() != nil {
// 			c.JSON(http.StatusInternalServerError, "Couldn't connect to database.")
// 		}

// 		var recipeInfo []Recipes

// 		/* Queries the database to find all the recipes that were made by the specified userID
// 		   and stores them in recipeInfo
// 		*/
// 		recipes := db.Table("recipes").Where(&Recipes{RecipeID: int64(recIDint)}).Find(&recipeInfo)

// 		var macroInfo []Macros

// 		for i := 0; i < recipes.Ingredients.size(); i++ {

// 			macroInfo.add(db.Table("nutrition").Where(&Macros{Name: recipes.Ingredients[i]}).Find(&recipeInfo))
// 		}

// 		if result.Error != nil {
// 			c.JSON(http.StatusInternalServerError, result.Error)
// 		} else if result.RowsAffected == 0 {
// 			c.JSON(http.StatusInternalServerError, "No recipes linked to that userID were found")
// 		} else {
// 			c.JSON(http.StatusOK, recipeInfo)
// 		}

// 	})
// }

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

type RecipeData struct {
	UserID      int64  `gorm:"column:userID"`
	RecipeID    int64  `gorm:"column:recipeID"`
	RecipeName  string `gorm:"column:recipeName"`
	Description string `gorm:"column:description"`
	Ingredients string `gorm:"column:ingredients"`
	//Macros       []Macros `gorm:"column:macros"`
	Instructions string `gorm:"column:instructions"`
}

type RecipeInData struct {
	UserID       int64    `json:",string"` // Need to put this to convert json string to int
	RecipeName   string   `json: recipeName`
	Description  string   `json: description`
	Ingredients  []string `json: ingredients`
	Instructions string   `json: instructions`
}

type Recipes struct {
	UserID       int64  `gorm:"column:userID"`
	RecipeID     int64  `gorm:"column:recipeID"`
	RecipeName   string `gorm:"column:recipeName"`
	Description  string `gorm:"column:description"`
	Ingredients  string `gorm:"column:ingredients"`
	Instructions string `gorm:"column:instructions"`
}

type Macros struct {
	Calories int64 `gorm:"column:calories"`
	Carbs    int64 `gorm:"column:carbs"`
	Protein  int64 `gorm:"column:protein"`
	Fat      int64 `gorm:"column:fat"`
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
			c.JSON(http.StatusInternalServerError, "jwt not authorized")
		} else {
			c.Next() //otherwise, it is authorized and the jwt is matched
		}
	}
}
