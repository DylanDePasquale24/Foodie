package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorrila/mux"
)

type App struct {
	Router *mux.Router
	DB     *sql.DB
}

func (a *App) Initialize(usern, pass, loginInfo string) {}

func (a *App) Run(addr string) {}
