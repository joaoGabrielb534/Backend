const Falhas = require("../errors/Falhas")
const clienteModel = require("../models/clienteModel")
const funcionariosModel = require("../models/funcionariosModel")
const{sign} = require("jsonwebtoken")

async function authControllerFuncionario(req, res){
    const cpf = req.body.cpf
    const senha = req.body.senha

    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    if(!senha){
        throw new Falhas("Senha não enviada")
    }

    const funcionarioExiste = await funcionariosModel.findOne({cpf})
    

    if(!funcionarioExiste){
        throw new Falhas("Funcionario não encontrado", 401)
    }
    if(funcionarioExiste.senha !== senha){
        throw new Falhas("Funcionario não encontrado", 401)
 
    } 
    const segredo = "joao123"
        const token = sign(
            {
              cpf: cpf,
              senha: senha,
            },
            segredo,
            {
              expiresIn: '7d',
            },
        )
    return res.json({token})
}

async function authControllerCliente(req, res){
    const cpf = req.body.cpf
    const nome = req.body.nome

    if(!cpf){
        throw new Falhas("CPF não enviado")
    }
    if(!nome){
        throw new Falhas("Nome não enviada")
    }

    const clienteExiste = await clienteModel.findOne({nome})

    if(!clienteExiste){
        throw new Falhas("Cliente não encontrado")
    }
    if(!(clienteExiste.cpf === cpf)){
        throw new Falhas("cliente não encontrado")
        
    } 
    const segredo = "joao123"
    const token = sign(
            {
              cpf: cpf,
              nome: nome,
            },
            segredo,
            {
              expiresIn: '7d',
            },
    )
    return res.status(200).json(token)
}

module.exports = {
    authControllerFuncionario, authControllerCliente
}

