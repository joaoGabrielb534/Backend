const Falhas = require("../errors/Falhas")
const ProdutosModel = require("../models/produtosModel")

async function cadastrarProduto(req, res) {
    const { nome, tipoProduto, codigo, validade, preco } = req.body

    if (!nome) {
        throw new Falhas("Nome não foi enviado", 422)
    }
    if (!codigo) {
        throw new Falhas("Código não enviado", 422)
    }
    if (!validade) {
        throw new Falhas("Validade não enviada", 422)
    }
    if (!tipoProduto) {
        throw new Falhas("Tipo não enviado", 422)
    }
    if (!preco) {
        throw new Falhas("Preço invalido", 422)
    }
 

    const produtoExiste = await ProdutosModel.findOne({ codigo })

    if (produtoExiste) {
        throw new Falhas("Produto já existe", 409)
    }

    const produto = await ProdutosModel.create({ nome, codigo, validade, tipoProduto, preco })

    return res.status(201).json(produto)
}

async function pegarProduto(req, res) {
    const { codigo } = req.params
    
    if (!codigo) {
        throw new Falhas("Código não enviado")
    }

    const produtoExiste = await ProdutosModel.findOne({ codigo })

    if (!produtoExiste) {
        throw new Falhas("Produto não encontrado")
    }

    return res.status(200).json(produtoExiste)
}

async function listarProdutos(req, res) {
    const produtos = await ProdutosModel.find()

    return res.status(200).json(produtos)
}

async function atualizarProduto(req, res) {
    const { codigo } = req.params
    const { precoPromocao } = req.body

    if (!codigo) {
        throw new Falhas("Código não enviado")
    }

    const produtoExiste = await ProdutosModel.findOne({ codigo })

    if (!produtoExiste) {
        throw new Falhas("Produto não encontrado")
    }

    await ProdutosModel.updateOne({ codigo }, { precoPromocao })

    const updateProduto = await ProdutosModel.findOne({ codigo })

    return res.status(200).json(updateProduto);
}

async function deletarProduto(req, res) {
    const { codigo } = req.params

    if (!codigo) {
        throw new Falhas("Código não enviado")
    }

    const produtoExiste = await ProdutosModel.findOne({ codigo })

    if (!produtoExiste) {
        throw new Falhas("Produto não encontrado")
    }

    await ProdutosModel.deleteOne({ codigo })

    return res.status(200).json({ mensagem: "Produto deletado com êxito" })
}

module.exports = {
    cadastrarProduto,
    pegarProduto,
    atualizarProduto,
    deletarProduto,
    listarProdutos
}