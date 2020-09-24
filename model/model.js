var MongoClinet=require('mongodb').MongoClient;
var dotenv= require("dotenv");
dotenv.config();
var url= process.env.DB_CONNECT;
var dbo;

class Model {
    constructor()
    {
        MongoClinet.connect(url,{ useUnifiedTopology: true ,useNewUrlParser: true},function(err, db){
            if (err) throw err;
            console.log("connect DB");
            dbo=db.db("TestJWT");
          })
    }

    async findUser(query)
    {
        var result= await dbo.collection("user").findOne(query);
        return result;
    }

    async insertUser(query)
    {
        var result= await dbo.collection("user").insertOne(query);
        return result;
    }
}

module.exports = Model;