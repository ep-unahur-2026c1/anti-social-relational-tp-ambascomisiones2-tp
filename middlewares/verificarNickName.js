const { where } = require("sequelize")
const db = require('../models')

const verificarNickName = (req,res,next) =>{

try {
    const {nickName} = req.body
    
    const yaEstaRegistrado = await db.user.count({ //Uso count pq es mas rapido que findByPk y me devuelve un 1 o un 0 directamente
        where:{nickName:nickName}
    })
    
    if(yaEstaRegistrado){
        res.status(400).json({message:`El nickname: ${nickName}ya esta en uso`})
    }
    next()
    
} catch (error) {
    console.error(error)
    res.status(500).json({message:'Error interno del servidor'})

}


}

module.exports = verificarNickName