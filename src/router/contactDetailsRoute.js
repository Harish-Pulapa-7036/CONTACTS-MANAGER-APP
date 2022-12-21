const router = require("express").Router()
const bodyParser = require("body-parser");
const contactsModel = require("../Models/contacts_schema");
router.use(bodyParser.json());





//posting 

router.post('/api/v1/contacts',async(req,res)=>{
    try{
        const arr = req.body;

         for(let i=0; i<arr.length; i++){
            
            await contactsModel.create({
                Name:arr[i].Name,
                Designation: arr[i].Designation,
                Company:arr[i].Company,
                Industry: arr[i].Industry,
                Email: arr[i].Email,
                PhoneNumber:arr[i].PhoneNumber,
                Country:arr[i].Country,
                userId:req.user
            });
         }

    res.status(200).json({
        status:"success",
        user:arr
    })
    }
    catch(e){
        res.json({
            err:e.message
        })
        
    }
});

router.get("/api/v1/contacts",async(req,res)=>{
    try{
        const users = await contactsModel.find();
        if(users.length){
            res.status(200).json({
                status:"success",
                users
            })
        }
        else{
            res.status(404).json({
                status:"failed",
                message:e.message
            })
        }
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
});

router.get("/api/v1/contacts/:email",async(req,res)=>{
    try{

        const user = await contactsModel.findOne({Email:req.params.email});
        if(user.Email){
            res.status(200).json({
                status:"success",
                user
            })
        }
        else{
            res.status(404).json({
                status:"failed",
                message:"user does not exists"
            })
        }
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})




//delete contacts

router.delete('api/v1/contactdelete',async(req,res)=>{

    const datadelete=contactsModel.delete({_id:req.user})
})

module.exports = router