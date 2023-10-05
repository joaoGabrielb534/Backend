const { Router } = require("express")
const { cadastrarProduto, pegarProduto, atualizarProduto, deletarProduto, listarProdutos } = require("../controllers/produtosController")
const { isAuthenticate } = require("../mddlewares/isAuthenticate")
const produtosRouter = Router()

produtosRouter.get("/api/produtos/all",isAuthenticate, listarProdutos)
produtosRouter.post("/api/produtos",isAuthenticate,cadastrarProduto)
produtosRouter.get("/api/produtos/:codigo",isAuthenticate, pegarProduto)
produtosRouter.put("/api/produtos/:codigo",isAuthenticate, atualizarProduto)
produtosRouter.delete("/api/produtos/:codigo",isAuthenticate, deletarProduto)
module.exports = produtosRouter