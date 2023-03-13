const express =require('express')
const routerParking = express.Router()
const fs = require("fs")
const { stringify } = require('querystring')
const parkings = JSON.parse(fs.readFileSync("./public/parkings.json",'utf-8'))


routerParking.get("/parkings", (req,res) =>{    
    res.status(200).render("parkings",{parkings})
})

routerParking.post("/parkings",(req, res)=>{
    let id = req.body.id === "" ? parkings.length + 1 : req.body.id
    let name = req.body.name
    let type = req.body.type
    let city = req.body.city
    let enregistrement = {"id" : id , "name" : name, "type" : type, "city" : city }
    if (id === (parkings.length + 1) ){
        parkings.push(enregistrement)
        //console.log(parkings)
        fs.writeFile("./public/parkings.json", JSON.stringify(parkings),'utf-8', (err)=>{
            if(err){
                console.log(err)
                res.status(404).render("erreur", {err})
            }else{
                res.status(200).render("parkings",{parkings})
            }})

    }else{
        for (var i = 0; i < parkings.length; i++){
            if (parkings[i]["id"] === id){
                parkings[i]["name"] = name
                parkings[i]["type"] = type
                parkings[i]["city"] = city
                res.status(200).render("parkings",JSON.stringify(parkings))
            /*fs.writeFile("./public/parkings.json", JSON.stringify(parkings),'utf-8', (err)=>{
                if(err){
                    console.log(err)
                    res.status(404).render("erreur", {err})
                }else{
                    res.status(200).render("parkings",{parkings})
                }})*/
            }
        }
       // console.log("vide2")
    }
})
module.exports = routerParking;