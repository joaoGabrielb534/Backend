const Falhas = require("../errors/Falhas")
const FuncionarioModel = require("../models/funcionariosModel")

async function criarFuncionario(req, res){
    const nome = req.body.nome
    const cpf = req.body.cpf
    const senha = req.body.senha
    const idade = req.body.idade
    const email = req.body.email

    if(!nome){
        throw new Falhas("Nome não foi enviado")
    }
    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    if(!idade){
        throw new Falhas("Idade não enviada")
    }
    if(!senha){
        throw new Falhas("Senha Invalida")
    }
    if(!email){
        throw new Falhas("Email invalido")
    }

    const funcionarioPorCpf = await FuncionarioModel.findOne({cpf})
    const funcionarioPorEmail = await FuncionarioModel.findOne({email})
    
    if(funcionarioPorCpf){
        throw new Falhas("Funcionario ja existe",409)
    }
    
    if(funcionarioPorEmail){
        throw new Falhas("Funcionario ja existe",409)
    }
    
    const funcionario = await FuncionarioModel.create({nome, cpf, senha, idade, email})

    return res.status(201).json(funcionario)

}

async function pegarFuncionario(req, res){
    const cpf = req.cpf
    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    const funcionarioExiste = await FuncionarioModel.findOne({cpf})
    if (!funcionarioExiste){
        throw new Falhas("Funcionario não emcontrado", 401)
       
    }
    return res.status(200).json(funcionarioExiste)

}

async function atualizarFuncionario(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    const funcionarioExiste = await FuncionarioModel.findOne({cpf})
    if (!funcionarioExiste){
        throw new Falhas("funcionario não emcontrado", 401)
       
    }
    const nome = req.body.nome
    const novoCpf = req.body.cpf
    const senha = req.body.senha
    const idade = req.body.idade

    const cpfExiste = await FuncionarioModel.findOne({cpf:novoCpf})
    if (cpfExiste){
        throw new Falhas("CPF ja existe")
    }
     
    await FuncionarioModel.updateOne({cpf},{nome, cpf:novoCpf, senha, idade})
    return res.status(200).json({mensagem: "Funcionario atualizado com exito"})

}

async function deletarFuncionario(req, res){
    const cpf = req.params.cpf
    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    const funcionarioExiste = await FuncionarioModel.findOne({cpf})
    if (!funcionarioExiste){
        throw new Falhas("Funcionario não emcontrado")
       
    }
  
    await FuncionarioModel.deleteOne({cpf})
    
    return res.status(200).json({mensagem:"Funcionario deletado com exito"})

}




module.exports = {
    criarFuncionario, pegarFuncionario, atualizarFuncionario, deletarFuncionario
}