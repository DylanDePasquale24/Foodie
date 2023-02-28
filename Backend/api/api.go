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

		// Gets the JSON
		response, err := client.Get(url)

		if err != nil {
			return false
		}
		
		defer response.Body.Close()

		// Reads the JSON and puts the data into specified structs
		err = json.NewDecoder(response.Body).Decode(dst)

		if err != nil {
			fmt.Println("error")
			return false
		}

		return true
	}

	func GetNutritionInfo() {
		url := "https://api.nal.usda.gov/fdc/v1/food/1750342?format=abridged&nutrients=208&nutrients=203&nutrients=205&nutrients=204&nutrients=269&nutrients=307&api_key=Y9rvUVTZ5oXuqaj4D5tfekVK0uH2b9WuInZxe4xj"

		var foodInfo foodInfo

		err := GetJSON(url, &foodInfo)

		if err == false {
			fmt.Println("Error when calling GetJSON()")
			return
		} else {
			fmt.Println(foodInfo.Description)
			fmt.Println(foodInfo.FoodNutrients)
		}
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
