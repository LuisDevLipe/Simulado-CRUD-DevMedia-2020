import { Database } from "../database/db";
import CategoriasController from "./CategoriasController";
export async function createTableNoticias() {
  await Database().then((db) =>
    db.exec(
      "CREATE TABLE IF NOT EXISTS Noticias (id INTEGER PRIMARY KEY,title TEXT,categoria INTEGER, content TEXT)"
    )
  );
}
class NoticiasController {
  async index(req, res) {
    const { q: query = "" } = req.query;
    if (query === "") {
      try {
        await Database()
          .then((db) =>
            db.all(
              "SELECT n.id,n.title,n.categoria,n.content,c.id AS cat_id,c.name FROM Noticias AS n INNER JOIN Categorias AS c ON n.categoria = c.id GROUP BY n.id ORDER BY n.id DESC LIMIT 100"
            )
          )
          .then((response) => {
            res.status(200).json(response);
          });
      } catch (err) {
        console.error(err);
        return res.status(404).json({ error: "Not Found" });
      }
    }
    if (query !== "") {
      try {
        await Database()
          .then((db) =>
            db.all(
              `SELECT n.id,n.title,n.categoria,n.content,c.id AS cat_id,c.name FROM Noticias AS n INNER JOIN Categorias AS c ON n.categoria = c.id WHERE "title" LIKE "%${query}%" GROUP BY n.id ORDER BY n.id DESC LIMIT 100`
            ))
          .then((response) => {
            res.status(200).json(response);
          });
      } catch (err) {
        console.error(err);
        return res.status(404).json({ error: "Not Found" });
      }
    }
  }
  async create(req, res) {
    const { title, category, content } = req.body;
    try {
      const categoriaExists = await Database().then((db) =>
        db.get("SELECT * FROM Categorias WHERE name=?", [category])
      );
      if (categoriaExists) {
        const { id: categoryId } = categoriaExists;
        try {
          await Database()
            .then((db) =>
              db.run(
                "INSERT INTO Noticias (title,categoria,content)VALUES(?,?,?)",
                [title, categoryId, content]
              )
            )
            .then((response) =>
              res
                .status(201)
                .json({ message: "Sucess", nOfChanges: response.changes })
            );
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        try {
          await Database()
            .then((db) =>
              db.run("INSERT INTO Categorias (name) VALUES (?)", [category])
            )
            .then((response) => {
              Database()
                .then((db) =>
                  db.run(
                    "INSERT INTO Noticias(title,categoria,content) VALUES (?,?,?)",
                    [title, response.lastID, content]
                  )
                )
                .then((response) =>
                  res
                    .status(201)
                    .json({ message: "Success", nOfChanges: response.changes })
                );
            });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "internal server error" });
    }
  }
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Database()
        .then((db) => db.run("DELETE FROM Noticias WHERE id=?", [id]))
        .then((response) => {
          if (!response.changes) throw {erro:"Not Found"};
          res.status(200)
            .json({ message: "sucess", nOfChanges: response.changes });
        });
    } catch (err) {
      console.error(err);
      return res.status(404).json({ error: "Not Found" });
    }
  }
}
export default new NoticiasController();
