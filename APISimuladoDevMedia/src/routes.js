import { Router } from "express"
import NoticiasController, { createTableNoticias } from "./controllers/NoticiasController"
import CategoriasController, { createTableCategorias } from "./controllers/CategoriasController"
createTableCategorias()
createTableNoticias()
const routes = new Router()

routes.get('/noticias',NoticiasController.index)
routes.get('/categorias',CategoriasController.index)

routes.post('/noticias',NoticiasController.create)
routes.post('/categorias',CategoriasController.create)

routes.delete('/noticias/:id',NoticiasController.destroy)
routes.delete('/categorias/:id',CategoriasController.destroy)

export default routes