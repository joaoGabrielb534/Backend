const mongoose = require("mongoose")
require("express-async-errors")
mongoose.connect("mongodb+srv://Gabriel:joao123@gabriel.lr30gow.mongodb.net/Mercado?retryWrites=true&w=majority")

const express = require("express")
const tratandoErro = require("./errors/tratandoErro")
const clienteRouter = require("./routers/clienteRouters")
const produtosRouter = require("./routers/produtosRouters")
const funcionarioRouter = require("./routers/funcionarioRouters")
const carrinhoRouter = require("./routers/carrinhoRouters")
const authRouters = require("./routers/authRouters")
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(cors())

app.use(carrinhoRouter)
app.use(clienteRouter)
app.use(produtosRouter)
app.use(funcionarioRouter)
app.use(authRouters)

app.use(tratandoErro)

app.listen(3333,()=>{
    console.log("Servidor iniciado")
})

