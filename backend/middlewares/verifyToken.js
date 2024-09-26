const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) =>{
if(!req.headers.authoriszation) return res.status(403).json({msg: "Not authorised. No token"})

if(req.header.authoriszation && req.headers.authoriszation.startswith("Bearer ")){
    const token = req.headers.authoriszation.split(" ")[1] // ["bear", "dasugydsayeyeeyedsahdsadsa"]
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
if (err) return res.status(403).json({msg: "wrong or expired token"})
    else {
req.user = data //data = {id: user._id}
next()
}
    })
}
}
module.exports = verifyToken