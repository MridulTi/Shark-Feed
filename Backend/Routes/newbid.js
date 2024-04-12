const express = require('express');
const { StartUp,Invester } = require('../DB/db');
const router = express.Router();

router.post('/',async(req,res)=>{
    let bidForInvester={
        companyName: req.body.companyName,
        Equity:req.body.Equity,
        price:req.body.price,
        accepted:false
    }

    let bidForStratup={
        investerName: req.body.investerName,
        Equity:req.body.Equity,
        price:req.body.price,
        accepted:false
    }

    
    try {
        // Find the startup by its email
         await Invester.updateOne({email:req.body.Investeremail},{$push:{bid:bidForInvester}});
         await StartUp.updateOne({email:req.body.StartUpemail},{$push:{bid:bidForStratup}});
        

       

        console.log('New bid added successfully:', bidForInvester);
    } catch (error) {
        console.error('Error adding new bid:', error.message);
    }

    res.send("hi")
})

module.exports = router;