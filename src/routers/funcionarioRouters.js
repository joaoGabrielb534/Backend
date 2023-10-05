const{Router} = require("express")
const { criarFuncionario, pegarFuncionario, atualizarFuncionario, deletarFuncionario } = require("../controllers/funcionariosController")
const { isAuthenticate } = require("../mddlewares/isAuthenticate")
const funcionarioRouter = Router()

funcionarioRouter.post("/api/funcionarios",criarFuncionario)
funcionarioRouter.get("/api/funcionarios", isAuthenticate, isAuthenticate, pegarFuncionario)
funcionarioRouter.put("/api/funcionarios/:cpf", isAuthenticate, atualizarFuncionario)
funcionarioRouter.delete("/api/funcionarios/:cpf", isAuthenticate, deletarFuncionario)
module.exports = funcionarioRouter