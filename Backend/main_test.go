package main

import (
	"testing"

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