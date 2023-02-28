package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
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

/* Test tries to register a user using the info in the json variable
	Returns code 200 when passes
*/
func TestRouterPOSTRegister(t *testing.T) {
	router := setupRouter()

	RouterPOSTRegister(router)

	responseRecorder := httptest.NewRecorder()

	json := []byte(`{
		"firstName": "testing",
		"lastName": "testing",
		"email": "paul@gmail.com",
		"password": "paul1234"}`)

	request, _ := http.NewRequest("POST", "/register", bytes.NewBuffer(json))

	router.ServeHTTP(responseRecorder, request)

	assert.Equal(t, 200, responseRecorder.Code, "Error Message: %s", responseRecorder.Body.String())
	
}