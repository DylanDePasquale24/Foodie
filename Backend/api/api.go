package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

	var client *http.Client

	func GetJSON(url string, dst interface{}) error {
		client = &http.Client{Timeout: 10 * time.Second}

		// Gets the JSON
		response, error := client.Get(url)

		/* 
			An error is only thrown if it cannot connect to the API URL,
			if the API key is invalid or probably if you hit the API limit,
			the error won't be caught
		*/
		if error != nil {
			return error
		}
		
		defer response.Body.Close()

		// Reads the JSON and puts the data into specified structs
		error = json.NewDecoder(response.Body).Decode(dst)

		return error
	}

	func GetNutritionInfo() error {
		url := "https://api.nal.usda.gov/fdc/v1/food/1750342?format=abridged&nutrients=208&nutrients=203&nutrients=205&nutrients=204&nutrients=269&nutrients=307&api_key=Y9rvUVTZ5oXuqaj4D5tfekVK0uH2b9WuInZxe4xj"

		var foodInfo foodInfo

		error := GetJSON(url, &foodInfo)

		if error != nil {
			return error
		} else {
			fmt.Println(foodInfo.Description)
			fmt.Println(foodInfo.FoodNutrients)
		}
		
		return error
	}

	/* 	
		Not all foods will display all the info
		208: Energy
		203 : Protein
		205: Carbohydrate, by difference
		204 : Total lipid (fat)
		269: Total sugars
		307: Sodium
	*/

	type foodInfo struct {
		Description string `json:"description"`
		FoodNutrients []foodNutrients
	}

	type foodNutrients struct {
		Number string `json:"number"`
		Name string `json:"name"`
		Amount float32 `json:"amount"`
		UnitName string `json:"unitName"`
	}
