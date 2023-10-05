const Falhas = require("../errors/Falhas")
const CarrinhoModel = require("../models/carrinhoModel")

async function adicionarAoCarrinho(req, res){
    const produto = req.body.produto
    const cliente = req.body.cliente

    if(!produto){
        throw new Falhas("Produto não foi enviado")
    }
    if(!cliente){
        throw new Falhas("Cliente não enviado")
    }

    const carrinho = await CarrinhoModel.create({produto, cliente})

    return res.status(201).json(carrinho)

}

async function pegarCompra(req, res){
    const id = req.params.id
    if(!id){
        throw new Falhas("Id não enviado")
    }
    const compraExiste = await CarrinhoModel.findOne({_id: id})
    if (!compraExiste){
        throw new Falhas("Compra não emcontrada")
       
    }
    return res.status(200).json(compraExiste)

}

async function atualizarCompra(req, res){
    const id = req.params.id
    if(!id){
        throw new Falhas("ID não enviado")
    }
    const compraExiste = await CarrinhoModel.findOne({_id: id})
    if (!compraExiste){
        throw new Falhas("Compra não emcontrada")
       
    }
    const produto = req.body.produto
    const cliente = req.body.cliente
     
    await CarrinhoModel.updateOne({_id: id},{produto, cliente})
    return res.status(200).json({mensagem: "Carrinho atualizado com exito"})

}

async function deletarCompra(req, res){
    const id = req.params.id
    if(!id){
        throw new Falhas("Compra não enviado")
    }
    const compraExiste = await CarrinhoModel.findOne({_id: id})
    if (!compraExiste){
        throw new Falhas("Compra não emcontrado")
       
    }
  
    await CarrinhoModel.deleteOne({_id: id})
    
    return res.status(200).json({mensagem:"Compra deletado com exito"})

}




module.exports = {
    adicionarAoCarrinho, pegarCompra, atualizarCompra, deletarCompra
}