var express = require("express");
var router = express.Router();
const jwt= require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const Model = require("../model/model");
const { response } = require("../app");
const model = new Model();

const verifyToken= require("../middelware/verifyToken");
router.get("/",verifyToken,function(req,res){
    res.send("verify Token OK");
})

router.post("/", async function (req, res) {
    
    console.log(req.body);
    var checkEmail = await model.findUser({ username: req.body.email })
    if(checkEmail) return res.status(422).send("Email is exist");

    const salt= await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);

    var result= await model.insertUser({
        email:req.body.email,
        password: hashPassword
    })

    if(result)
    {
        res.send({
            email:req.body.email,
            password:hashPassword
        })
    }
    else {
        res.status(400).send("insert err");
    }

    // console.log(model);
    // var result = await model.findUser({ username: 'congdat' })
    // console.log("result",result);
    // res.render('index', { title: 'Express' });
})

router.post("/login",async function(req,res)
{
    var checkmail= await model.findUser({email:req.body.email});
    if (!checkmail) return res.status(422).send("email not exist");

    const checkPassword = await bcrypt.compare(req.body.password,checkmail.password);

    if(!checkPassword) return res.status(422).send("password not correct");

    const token= jwt.sign({_id:checkmail._id},"congdat",{expiresIn:60*60*24});
    res.header("auth-token",token).send(token);
})

module.exports = router;
