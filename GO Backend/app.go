package main

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type App struct {
	Router *mux.Router
	DB     *sql.DB
}

// Creates database connection and wires up the routes
func (a *App) Initialize(usern, pass, loginInfo string) {}

// Starts the application
func (a *App) Run(addr string) {}
