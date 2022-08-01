const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const auth = require("../auth/auth");
const router = require("./adminRoute");

// route for admin registration
router.post("/admin/register", function(req,res){
    const username = req.body.username;
    Admin.findOne({username : username}).then(function(adminData){
        // if the username is in the database
        if(adminData!=null){
            res.json({message : "Username already exists!"})
            return;
        }
        // now it means we are ready for registration
        const password = req.body.password;
        bcryptjs.hash(password, 10, function(e, hashed_pw){
            const username = req.body.username;
            const adata = new Admin({
                username : username,
                password : hashed_pw
            })
            adata.save()
            .then(function(){
                res.json({message : "Registered Success!"})
            })
            .catch(function(e){
                res.json(e)
            })
        })

    })
})

// login route - for customer
router.post("/admin/login", function(req,res){
    const username = req.body.username;
    Admin.findOne({username : username})
    .then(function(adminData){

        if (adminData===null){
            return res.json({message : "invalid"})
        }
        
        const password = req.body.password;
        bcryptjs.compare(password, adminData.password, function(e,result){
           
            if(result===false){
                return res.json({message : "Invalid"})
            }
            // ticket generate - jsonwebtoken
            const token = jwt.sign({cusId : adminData._id}, "anysecretkey");
            res.json({token : token, message : "success"});
        })

    })
})
