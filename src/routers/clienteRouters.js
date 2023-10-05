const{Router} = require("express")
const { criarCliente, pegarCliente, atualizarCliente, deletarCliente } = require("../controllers/clienteController")
const { isAuthenticate } = require("../mddlewares/isAuthenticate")
const clienteRouter = Router()

clienteRouter.post("/api/clientes",criarCliente)
clienteRouter.get("/api/clientes/:cpf", isAuthenticate, pegarCliente)
clienteRouter.put("/api/clientes/:cpf", isAuthenticate, atualizarCliente)
clienteRouter.delete("/api/clientes/:cpf", isAuthenticate, deletarCliente)
module.exports = clienteRouter