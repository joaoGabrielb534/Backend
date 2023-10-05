const{Schema, default: mongoose}=require("mongoose")

const ProdutosModel = new Schema({
    nome: {type: String, required: true},
    tipoProduto:{type: String, required: true},
    codigo: {type: String, required: true ,unique:true}, 
    validade: {type: Date, required: true},
    preco: {type: Number, required: true},
    precoPromocao: {type: Number, required: false}

})

module.exports = mongoose.model("ProdutosModel", ProdutosModel)