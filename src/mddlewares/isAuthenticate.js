const{verify} = require("jsonwebtoken")
function isAuthenticate (req, res, next){
    try {
        const auth = req.headers.authorization
        if(!auth){
            return res.status(401).end()
        }
        const[,token] = auth.split(" ")
        const segredo = "joao123"
        
        const {cpf} = verify(token, segredo)
    
        req.cpf = cpf
        return next()
    } catch (error) {
        return res.status(401).end()
    }
}

module.exports = {
    isAuthenticate
}