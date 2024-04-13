const express = require('express');
const { StartUp } = require('../DB/db');
const router = express.Router();



router.post( '/', async( req, res ) => {
    let post ={ 
        data:req.body.data,
        caption:req.body.caption,
        Image:req.body.image,
        hashtage:req.body.hashtag,
        likes:0,
        Comments:[{Count:0,list:[]}]
}
    
        try {
            // Find the startup by its email
             await StartUp.updateOne({email:req.body.email},{$push:{posts:post}});
            
    
           
    
            console.log('New post added successfully:', post);
        } catch (error) {
            console.error('Error adding new post:', error.message);
        }
    
    res.send({
        message: 'post created'
    });
})


router.get('/all',(req,res)=>{
    let email=req.body.email;
    StartUp.find({email:email}).then((data)=>{
        if(data)
            res.send(data[0].posts);
         else    
            res.status(401).send("No user found");
    })
})

module.exports = router;
