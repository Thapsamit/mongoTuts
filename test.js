const mongoose = require('mongoose');
// connect mongo to localhost at deafult port
const connect = ()=>{
    return mongoose.connect('mongodb://localhost:27017/studentDetails')
}
// instruction for schema creation not create
const student = new mongoose.Schema({
    // validation in firstName
   firstName:{
       type:String,
       required:true
   },
   lastName:String,
   age:Number,
   hobbies:[{type:String}] //array of hobbies
},{timestamps:true})
//creating models and returns a model with collection name == Student
const Student = mongoose.model('student',student)
// connect returns a promise and creating a student
connect()
.then( async connection =>{
   const student =   await Student.create({firstName:"Amit",lastName:"Thapliyal",age:22})
  const found = await Student.find({firstName:'Amit'})
   const foundId = await Student.findById('asd')
   const foundUpdate = await Student.findByIdAndUpdate('dwd',{new:true})
   console.log(student) //mongo document
})
.catch((err)=>{
    console.log(err)
})

