const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const items = require('./item');
const User = require('./user');
const { userInfo } = require('os');
mongoose.connect("mongodb+srv://MongoDB:Admin%40123@webstack.fdanksq.mongodb.net/Homelyhubs?retryWrites=true&w=majority&appName=webstack")
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", async (req, res) => {
    var son =await items.find({},{maximumGuest:1,maximumNight:1,propertyName:1, address: 1, price: 1, images: { $slice: 1 }})
    console.log(son)
    res.json(son);
});
app.get("/:propname", async (req, res) => {
    var name=req.params.propname;
    var son =await items.find({propertyName:name.toString()})
    console.log(req.params.propname)
    console.log(son)
    res.json(son);
});

app.post("/user", async (req, res) => {
    try{
    const { username, email, password, phoneNo, image } = req.body;
     var check=await User.findOne({ email })
    if(!check){
        const newUser = new User({
            username,
            email,
            password,
            phoneNo,
            image
        });
        await newUser.save();
        console.log(newUser)
        res.json({message:"User Created"})
    }else{
        res.status(401).json({message:"Email id already in use"})

    }
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const passwordMatch = (password === user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.json(user);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(1000, () => {
    console.log('Server is running on port 1000');
});
