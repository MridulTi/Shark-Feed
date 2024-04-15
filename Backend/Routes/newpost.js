const express = require('express');
const { StartUp, Posts } = require('../DB/db');
const router = express.Router();



router.post( '/', async( req, res ) => {
    console.log(req.body.Image)
    let post ={ 
        // data:req.body.data,
        caption:req.body.caption,
        Image:req.body.Image,
        hashtage:req.body.hashtag,
        likes:0,
        Comments:[{Count:0,list:[]}]
}
    
        try {
            // Find the startup by its email
             await StartUp.updateOne({email:req.body.email},{$push:{posts:{$each:[post],$position:0},username:req.body.username}});
            
             await Posts.create({post:post});
            
            console.log('New post added successfully:');
            
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
        if(data){
            res.send(data[0].posts);
        }
         else    
            res.status(401).send("No user found");
    })
})

router.get('/feed',(req,res)=>{
    Posts.find().then((data)=>res.send(data));
})
router.delete("/del", async (req, res) => {
    try {
        const deletedData = await Posts.deleteMany({});
        res.send(deletedData);
    } catch (error) {
        console.error('Error deleting documents:', error.message);
        res.status(500).json({ error: 'Error deleting documents' });
    }
});

module.exports = router;
