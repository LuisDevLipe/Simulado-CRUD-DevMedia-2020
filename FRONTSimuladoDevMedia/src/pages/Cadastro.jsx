import React, { useState } from "react"
import "./Cadastro.css"
import { createData } from "../services/api"

const Cadastro = (props) => {
  const [success, setSuccess] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)

    const data = {
      title: e.target.elements.title.value,
      category: e.target.elements.category.value,
      content: e.target.elements.content.value,
    }
    if (!data.title) return alert("digite um titulo valido")
    if (!data.category) return alert("digite uma categoria valida")
    if (!data.content) return alert("digite um conteudo valido")
    const response = await createData(data)
    setSuccess({ status: response.status })
    if (success === 201) {
      e.target.elements.title.value = ""
      e.target.elements.category.value = ""
      e.target.elements.content.value = ""
    }
    props.onCreate()
  }
  return (
    <div className="mainCadastro">
      <h1>Cadastro de noticias</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titulo">Titulo da noticia</label>
          <input type="text" placeholder="Assunto" name="title" />
        </div>
        <div className="field">
          <label htmlFor="categoria">Categoria</label>
          <input maxLength={30} type="text" placeholder="categoria" name="category" />
        </div>
        <div className="field">
          <label htmlFor="categoria">Conteudo</label>
          <textarea type="text" placeholder="Conteudo da noticia" name="content" />
        </div>
        <div className="actions">
          <button type="submit">Criar</button>
          {success.status === 201 && (
            <p style={{ color: "green", fontSize: "0.8rem" }}>Noticia Criada com sucesso</p>
          )}
          {success.status === (500 || 404 || 422) && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>Erro ao processar o envio da noticia</p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Cadastro
