import axios from "axios"
export const fetchData = axios.create({
  baseURL: "http://localhost:3000",
})

export const loadData = async (query = "") => {
  if (query !== "") return await fetchData.get(`/noticias?q=${query}`)
  return await fetchData.get("/noticias")
}

export const createData = async (data) => await fetchData.post("/noticias", { ...data })

export const deleteData = async (id) => await fetchData.delete(`/noticias/${id}`)
