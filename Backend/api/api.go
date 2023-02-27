package api

import (
	"encoding/json"
	"fmt"
	"time"
	"net/http"
)

	var client *http.Client

	func GetJSON(url string, dst interface{}) bool {
		client = &http.Client{Timeout: 10 * time.Second}

		response, err := client.Get(url)
		if err != nil {
			return false
		}
		
		defer response.Body.Close()

		// Reads the JSON
		err = json.NewDecoder(response.Body).Decode(dst)

		if err != nil {
			fmt.Println("error")
			return false
		}

		return true
	}

	func GetNutritionInfo() {
		url := "https://api.nal.usda.gov/fdc/v1/food/746762?format=abridged&nutrients=203&nutrients=204&nutrients=205&api_key=DEMO_KEY"

		var nutrition foodNutrients

		err := GetJSON(url, &nutrition)
		if err == false {
			fmt.Println("Error when calling GetJSON()")
			return
		} else {
			fmt.Println(nutrition.Description)
		}
	}

	type foodNutrients struct {
		Description string
		// Energy string
		// Carbohydrates string
		// Fat string
		// Protein string
	}
