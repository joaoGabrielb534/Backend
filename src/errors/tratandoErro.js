const Falhas = require("./Falhas")

function tratandoErro(error, req, res, next) {
    if(error instanceof Falhas){
        return res.status(error.status).json({
            mensagem: error.mensagem
        })
    }
    return res.status(500).json({
        mensagem: "Erro no servidor"
    })
}

module.exports = tratandoErro