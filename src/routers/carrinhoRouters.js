const{Router} = require("express")
const { adicionarAoCarrinho, pegarCompra, atualizarCompra, deletarCompra } = require("../controllers/carrinhoController")
const { isAuthenticate } = require("../mddlewares/isAuthenticate")
const carrinhoRouter = Router()

carrinhoRouter.post("/api/carrinho", isAuthenticate, adicionarAoCarrinho)
carrinhoRouter.get("/api/carrinho/:id", isAuthenticate, pegarCompra)
carrinhoRouter.put("/api/carrinho/:id", isAuthenticate, atualizarCompra)
carrinhoRouter.delete("/api/carrinho/:id", isAuthenticate, deletarCompra)
module.exports = carrinhoRouter