const{Schema, default: mongoose}=require("mongoose")

const ClienteModel = new Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: true ,unique:true}, 
    idade: {type: Number, required: true}
})

module.exports = mongoose.model("ClienteModel", ClienteModel)