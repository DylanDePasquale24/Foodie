package main

import (
	"bytes"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	encodingJSON "encoding/json"
	"github.com/stretchr/testify/assert"
	"golang.org/x/crypto/bcrypt"
)


func TestHashPassword(t *testing.T) {
	password1 := "SAODIjoJo1@jddqdqw"

	got, error := HashPassword(password1)

	if error != nil {
		t.Errorf("HashPassword() returned an error: %d", error)
	}

	error = bcrypt.CompareHashAndPassword([]byte(got), []byte(password1))

	if error != nil {
		t.Errorf("Error in Hashing, Error Message: %d", error)
	}
}

// Used to start the router
var router = setupRouter()

/* 
	Test tries to register a user using the info in the json variable,
	returns code 200 when it passes
*/
func TestRouterPOSTRegister(t *testing.T) {

	RouterPOSTRegister(router)

	responseRecorder := httptest.NewRecorder()

	json := []byte(`{
		"firstName": "testing",
		"lastName": "testing",
		"email": "gmail@gmail.com",
		"password": "password1234"}`)

	request, _ := http.NewRequest("POST", "/register", bytes.NewBuffer(json))

	router.ServeHTTP(responseRecorder, request)

	assert.Equal(t, 200, responseRecorder.Code, "Error Message: %s", responseRecorder.Body.String())
}

/*
	Test tries to login a user using the info in the json variable,
	returns code 200 when it passes
*/
func TestRouterPOSTLogin(t *testing.T) {
	
	RouterPOSTLogin(router)

	responseRecorder := httptest.NewRecorder()

	json := []byte(`{
		"email": "gmail@gmail.com",
		"password": "password1234"
	  }`)

	request, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(json))

	router.ServeHTTP(responseRecorder, request)

	assert.Equal(t, 200, responseRecorder.Code, "Error Message: %s", responseRecorder.Body.String())
}

/*
	Test tries to create a recipe entry in the database using the info in the json variable,
	returns code 200 when it passes
*/
func TestRouterPOSTRecipeCreate(t *testing.T) {
	
	RouterPOSTRecipeCreate(router)

	responseRecorder := httptest.NewRecorder()

	json := []byte(`{
		"UserID": "10",
		"RecipeName": "Test Recipe Name 2",
		"Description": "Test description",
		"Ingredients": ["Turkey | 1|||Spaghetti | 1"],
		"Instructions": "Test instructions"
	  }`)

	request, _ := http.NewRequest("POST", "/recipeCreate", bytes.NewBuffer(json))

	router.ServeHTTP(responseRecorder, request)

	assert.Equal(t, 200, responseRecorder.Code, "Error Message: %s", responseRecorder.Body.String())
}

func TestRouterGetRecipe(t *testing.T) {

	RouterGETRecipe(router)

	responseRecorder := httptest.NewRecorder()
	json := []byte(`{}`)
	request, _ := http.NewRequest("GET", "/recipeGet/1", bytes.NewBuffer(json))

	router.ServeHTTP(responseRecorder, request)

	var jsonTest bytes.Buffer
	error := encodingJSON.Indent(&jsonTest, responseRecorder.Body.Bytes(), "", "\t")

	if error != nil {
		fmt.Println(error)
	}

	// fmt.Println(string(jsonTest.Bytes()))

	assert.Equal(t, 200, responseRecorder.Code, "Error Message: %s", responseRecorder.Body.String())
}

func TestRouterDELETERecipe(t *testing.T) {

	RouterDELETERecipe(router)

	responseRecorder := httptest.NewRecorder()
	json := []byte(`{}`)
	request, _ := http.NewRequest("DELETE", "/recipeDelete/82", bytes.NewBuffer(json))

	router.ServeHTTP(responseRecorder, request)

	assert.Equal(t, 200, responseRecorder.Code, "Error Message: %s", responseRecorder.Body.String())
}

func TestRouterGetMacros(t *testing.T) {
	
	RouterGETMacros(router)

	responseRecorder := httptest.NewRecorder()
	json := []byte(`{}`)
	request, _ := http.NewRequest("GET", "/macros/73", bytes.NewBuffer(json))

	router.ServeHTTP(responseRecorder, request)

	var jsonTest bytes.Buffer
	error := encodingJSON.Indent(&jsonTest, responseRecorder.Body.Bytes(), "", "\t")

	if error != nil {
		fmt.Println(error)
	}

	fmt.Println(string(jsonTest.Bytes()))

	assert.Equal(t, 200, responseRecorder.Code, "Error Message: %s", responseRecorder.Body.String())
}