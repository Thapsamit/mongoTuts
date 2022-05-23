const mongoose = require("mongoose")
// returns a promise
const connect = ()=>{
	return mongoose.connect('mongodb://localhost:27017/studentDetails')
}

// schema creation
const studentDetails = new mongoose.Schema({
	name:{
		fName:String,
		lName:String
	},
	age:Number,
	degree:String,
	active:Boolean,
	hobbies:[{type:String}]
},{timeStamp:true})
// modelling the data with collection name as student
const student = new mongoose.model('student',studentDetails)


connect()
.then(()=>{
      console.log("Connected with Local mongoDb")
})
.catch((err)=>{
	console.log(err)
})


