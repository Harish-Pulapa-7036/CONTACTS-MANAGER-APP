const router = require("express").Router()
const bodyParser = require("body-parser");
const contactsModel = require("./Models/contacts_schema");


router.use(bodyParser.json());





//posting 
router.post('api/v1/import',async(req,res)=>{
    try{
        const data=await contactsModel.find({userId:req.user})


 
    const usercontact= await contactsModel.insertMany({
        contacts:req.body,
        userId:req.user
    })

    

    res.send("ok")

    }
    catch(e){
        res.json({
            err:e.message
        })
        
    }
})



//delete contacts

router.delete('api/v1/contactdelete',async(req,res)=>{

    const datadelete=contactsModel.delete({_id:req.user})
})



module.exports = router