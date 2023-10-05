const{Router} = require("express")
const {authControllerFuncionario, authControllerCliente} = require("../controllers/authControllers")
const authRouters = Router()

authRouters.post("/api/auth/funcionario",authControllerFuncionario)
authRouters.post("/api/auth/cliente",authControllerCliente)

module.exports = authRouters