var express = require('express')

var router = express.Router()

router.post('/',  async function(req, res, next){
    if(!(req.body.email && req.body.password && req.body.type)){
        return res.status(400).json({status: 400., message: "Invalid creds"})
    }
    var email = req.body.email,
    password = req.body.password,
    type = req.body.type;

   if(email == "Admin" && password == "Admin" && type == "Admin"){
    return res.status(200).json({status: 200, data: {"token" : "admin123456789"}, message: "Success"})
   }
   else if(email == "Executive" && password == "Executive" && type == "Executive"){
    return res.status(200).json({status: 200, data: {"token" : "executive123456789"}, message: "Success"})
    }
    else if(email == "Staff" && password == "Staff" && type == "Staff"){
        return res.status(200).json({status: 200, data: {"token" : "staff123456789"}, message: "Success"})
    }
    else {
        return res.status(401).json({status: 401., message: "Unautharised user"})
    }
})

module.exports = router;
