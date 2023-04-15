import { Database } from "../database/db";

export async function createTableCategorias() {
  await Database().then((db) =>
    db.exec(
      "CREATE TABLE IF NOT EXISTS Categorias (id INTEGER PRIMARY KEY, name TEXT UNIQUE)"
    )
  );
}
class CategoriasController {
  async index(_, res) {
    try {
      await Database()
        .then((db) => db.all("SELECT * FROM Categorias"))
        .then((response) => res.status(200).json(response));
    } catch (err) {
      console.error(err);
      return res.status(404).json({ error: "Not Found" });
    }
  }
  async create(req, res) {
    try {
      const { name } = req.body;
      await Database()
        .then((db) =>
          db.run("INSERT INTO Categorias (name) VALUES (?)", [name])
        )
        .then((response) => res.status(201).json({ message: "success",changes:response.changes}));
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async destroy(req,res){
    try {
      const { id } = req.params
      await Database().then(db=>db.run("DELETE FROM Categorias WHERE id=?",[id]))
      .then(response => res.status(200).json({message:"succes",nOfChanges:response.changes}))
    } catch (error) {
      console.log(error)
      res.status(500).json({error:"Internal server error"})
    }
  
  }
}
export default new CategoriasController()
