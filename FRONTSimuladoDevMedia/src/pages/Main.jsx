import "./Main.css"

const Main = (props) => {
  const handleDelete = (id) => {
    props.onDelete(id)
  }
  return (
    <div className="mainPage">
      <h1>Notícias</h1>
      {props.noticias.length ? (
        <div className="wrapper">
          {props.noticias.map((item) => (
            <div className="card" key={item.id}>
              <h2>{item.title}</h2>
              <h4>{item.name}</h4>
              <p>{item.content}</p>
              <button type="button" onClick={(id) => handleDelete(item.id)}>
                x
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading">Carregando...</div>
      )}
    </div>
  )
}

export default Main
