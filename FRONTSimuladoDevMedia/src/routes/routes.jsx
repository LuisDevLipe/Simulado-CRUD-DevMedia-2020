import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Main from "../pages/Main"
import Cadastro from "../pages/Cadastro"
import Teste from "../pages/Teste"
import { deleteData, loadData } from "../services/api"
import { useState, useEffect } from "react"

const AppRoutes = (props) => {
  const [busca, setBusca] = useState("")
  const [refresh, setRefresh] = useState("false")
  const [noticias, setNoticias] = useState({})
  
  const handlRefresh = () => setRefresh((current) => !current)

  const handleSearch = async (e, query) => {
    e.preventDefault()
    setBusca(query)
    setRefresh(current => !current)
  }

  const handleDelete = async (id) => {
    await deleteData(id)
    setRefresh(current => !current)
  }

  useEffect(() => {
    (async () => {
      const response = await loadData(busca)
      setNoticias(response.data)
      setBusca('')
    })()
  }, [refresh])
  return (
    <Router>
      <NavBar onSearch={(e, query) => handleSearch(e, query)} />
      <Routes>
        <Route exact path="/" element={<Main noticias={noticias} onDelete={handleDelete} />} />
        <Route exact path="/cadastro" element={<Cadastro onCreate={handlRefresh} />} />
        <Route exact path="/teste" element={<Teste />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default AppRoutes
