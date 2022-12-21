const mongoose=require("mongoose")
const express=require("express")
var cors = require('cors') 
const contactDetailsRoute=require("./router/contactDetailsRoute");
const loginRoute = require("./router/loginRoute");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const app=express();
app.use(cors());

app.use('/api/v1/contacts', (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decoded = jwt.verify(token, 'secret');
            req.user = decoded.data;
            next();
        }
        else {
            res.status(401).json({
                status: "failed",
                message: "token are missing"
            })
        }

    } catch (e) {
        res.status(401).json({
            status: "failed",
            message: e.message
        })
    }

})



app.use("/",contactDetailsRoute);
app.use("/",loginRoute);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("connected to db")
})
app.listen(8000, () => console.log("App listening on port 8000"))