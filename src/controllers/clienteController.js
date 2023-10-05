const Falhas = require("../errors/Falhas")
const ClienteModel = require("../models/clienteModel")

async function criarCliente(req, res){
    const nome = req.body.nome
    const cpf = req.body.cpf
    const idade = req.body.idade

    if(!nome){
        throw new Falhas("Nome não foi enviado")
    }
    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    if(!idade){
        throw new Falhas("Idade não enviada")
    }

    const clienteExiste = await ClienteModel.findOne({cpf})

    if(clienteExiste){
        throw new Falhas("Cliente ja existe")
    }

    const cliente = await ClienteModel.create({nome, cpf, idade})

    return res.status(201).json(cliente)

}

async function pegarCliente(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    const clienteExiste = await ClienteModel.findOne({cpf})
    if (!clienteExiste){
        throw new Falhas("Cliente não emcontrado")
       
    }
    return res.status(200).json(clienteExiste)

}

async function atualizarCliente(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    const clienteExiste = await ClienteModel.findOne({cpf})
    if (!clienteExiste){
        throw new Falhas("Cliente não emcontrado")
       
    }
    const nome = req.body.nome
    const novoCpf = req.body.cpf
    const idade = req.body.idade

    const cpfExiste = await ClienteModel.findOne({cpf:novoCpf})
    if (cpfExiste){
        throw new Falhas("CPF ja existe")
    }
     
    await ClienteModel.updateOne({cpf},{nome, novoCpf, idade})
    return res.status(200).json({mensagem: "Cliente atualizado com exito"})

}

async function deletarCliente(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    const clienteExiste = await ClienteModel.findOne({cpf})
    if (!clienteExiste){
        throw new Falhas("Cliente não emcontrado")
       
    }
  
    await ClienteModel.deleteOne({cpf})
    
    return res.status(200).json({mensagem:"Cliente deletado com exito"})

}




module.exports = {
    criarCliente, pegarCliente, atualizarCliente, deletarCliente
}