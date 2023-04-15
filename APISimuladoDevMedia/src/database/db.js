import sqlite3 from 'sqlite3'
import { open } from "sqlite"

export async function Database(){
    return open({
        filename:"./database.db",
        driver:sqlite3.Database
    })
}