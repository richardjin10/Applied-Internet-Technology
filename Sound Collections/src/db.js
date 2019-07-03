const mongoose = require('mongoose');



const soundSchema = new mongoose.Schema({
  what:String,
  where:String,
  date:String,
  hour:Number,
  desc:String,
})

mongoose.model("Sound", soundSchema)


mongoose.connect('mongodb://localhost/hw05');
