//Middleware de error 404
const myStatus = function(req, res, next) {
    res.status(404).json({error : "Not Found"})
}

export default myStatus;