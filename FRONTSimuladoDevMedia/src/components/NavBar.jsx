import React, { useState } from "react"
import { Link } from "react-router-dom"
import { loadData } from "../services/api"
import { useNavigate } from "react-router-dom"

const NavBar = (props) => {
  const [query, setQuery] = useState("")

  const Navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    props.onSearch(e, query)
    Navigate('/')
  }

  return (
    <div className="main-nav" style={style.mainNav}>
      <h1>Logo</h1>
      <Link style={style.link} to="/">
        Notícias
      </Link>
      <Link style={style.link} to="/cadastro">
        Cadastrar Notícias
      </Link>
      <div className="search">
        <form onSubmit={(e) => handleSearch(e)}>
          <label style={{ display: "block" }} htmlFor="search">
            Pesquisar no site
          </label>
          <input
            style={style.input}
            type="text"
            placeholder="Sua pesquisa"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button style={style.button} type="submit">
            Pesquisar
          </button>
        </form>
      </div>
    </div>
  )
}
const style = {
  mainNav: {
    height: "5rem",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    flexWrap: "wrap",
    borderBottom: "1px solid black",
    padding: "1rem 0",
  },
  link: {
    padding: "3px 5px",
    textDecoration: "none",
    color: "var(--primary-text-color)",
  },
  input: {
    height: "1.25rem",
    border: "1px solid grey",
    borderRadius: "0.25rem",
    background: "lightgrey",
    padding: "0.25rem 0.5rem",
    marginRight: "0.25rem",
  },
  button: {
    border: "1px solid grey",
    background: "lightgrey",
    height: "1.25rem",
    borderRadius: "0.25rem",
    padding: "0 0.5rem",
    textAlign: "center",
    cursor: "pointer",
  },
}
export default NavBar
