const cache = require('../config/redisClient')

const checkCachePost = async (req,res,next) =>{

    try {
        const {id} = req.params
        const cacheKey = `post:${id}`
        
        const postEnCache = await cache.get(cacheKey)
        if(postEnCache){
            console.log("Envio la respuesta desde redis")
            return res.status(200).json(JSON.parse(postEnCache))
        }
        next()
    } catch (error) {
        console.error(error)
        next()
    }

    
}

module.exports = checkCachePost