const{Schema, default: mongoose}=require("mongoose")

const FuncionariosModel = new Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: true ,unique:true},
    senha: {type: String, required: true}, 
    email: {type: String, required: true}, 
    idade: {type: Number, required: true}
})

module.exports = mongoose.model("FuncionariosModel", FuncionariosModel)