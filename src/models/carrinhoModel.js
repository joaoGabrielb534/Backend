const{Schema, default: mongoose}=require("mongoose")

const CarrinhoModel = new Schema({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProdutosModel',
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClienteModel',
    },
})

module.exports = mongoose.model("CarrinhoModel", CarrinhoModel)


