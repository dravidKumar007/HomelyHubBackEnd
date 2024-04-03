const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const items = require('./item');
mongoose.connect("mongodb+srv://MongoDB:Admin%40123@webstack.fdanksq.mongodb.net/Homelyhubs?retryWrites=true&w=majority&appName=webstack")
const app = express();
app.use(cors());
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
app.listen(1000, () => {
    console.log('Server is running on port 1000');
});