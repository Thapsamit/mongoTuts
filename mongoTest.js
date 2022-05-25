const mongoose = require("mongoose")
// returns a promise
const connect = ()=>{
	return mongoose.connect('mongodb://localhost:27017/studentDetails')
}
connect()
.then(()=>{
      console.log("Connected with Local mongoDb")
})
.catch((err)=>{
	console.log(err)
})


// schema creation
const studentDetails = new mongoose.Schema({
	name:{
	type:String,
      required:true, //validation
      uppercase:true ,//validation
      minLength:[3,"Minimum length not reached!!"] // second argument is error
	},
	age:{
		type:Number,
		validate(value){
			if(value<=0){
				throw new Error("Age can't be less than 0")
			}
		}
	},
	degree:String,
	active:Boolean,
	hobbies:String
},{timeStamp:true})
// modelling the data with collection name as student
const Student = new mongoose.model('Students',studentDetails)
const createDocs = async ()=>{
	try{
		const s1 = new Student({
			name:"Akash",
			age:-21,
			degree:"Btech",
			active:true,
			hobbies:"dev"
		})
		const res = await Student.insertMany([s1])
            console.log("inserted  = ",res)
	}
	catch(err)
	{
           console.log(err.properties)
	}
}
createDocs()
//creating documents
/*
async function createDocs()
{
	const s1 = new Student({
	name:"Amit",
	age:22,
	degree:"MCA",
	active:true,
	hobbies:"Coding"
})
const s2 = new Student({
	name:"Ankit",
	age:25,
	degree:"MCA",
	active:true,
	hobbies:"Testing"
    })

const res = await Student.insertMany([s1,s2])
}

createDocs()
*/
/*
const getAllDocs = async ()=>{
	// gett all names in doc
	const resNames = await Student.find({},{name:1})
     // using select
     const resBySelect = await Student.find({name:"Amit"}).select({name:1})
     // comparison operators greater
     const ageGreaterTwenty = await Student.find({age:{$gt:20}})
     //  greaterEqual
     const ageGreaterEqualTwentyFive = await Student.find({age:{$gte:25}})
     // in operator
     const getHobbies = await Student.find({hobbies:{$in:["Testing"]}}).select({_id:0,name:1})

	//console.log(resNames)
	//console.log(resBySelect)
	//console.log(ageGreaterTwenty)
	//console.log(ageGreaterEqualTwentyFive)
	console.log(getHobbies)
}

getAllDocs()
*/

// logical operators
/*
const getDocsLogically = async ()=>{
	const resOr = await Student.find({$or:[{name:"Amit"},{age:22}]})
	const resNot= await Student.find({age:{$not:{$eq:24}}})
	//console.log(res)
	console.log(resNot)
}
getDocsLogically()
*/
/*
const sortCount = async ()=>{
	//count docs
     const totalDocs = await Student.find().countDocuments()
     // will show the docs as it  is we have inserted
     const sortDocs = await Student.find().sort()
     // -1 for descending 1 for ascending
     const sortByNames = await Student.find({},{name:1}).sort({age:-1})
     //console.log(totalDocs)
     console.log(sortByNames)
}
sortCount()
*/
/*
const updateDocs = async (id)=>{
	// updateOne
     // const res  = await Student.updateOne({_id:id},{$set:{name:"Amit Thapliyal"}});
      //const findUpdated = await Student.find({_id:id},{name:1})
      //console.log(res,findUpdated)
      // update by findbyid
      const resById = await Student.findByIdAndUpdate({_id:id},{
      	$set:{
      		name:"Amit Thapliyal"
      	}
      },{new:true})
      console.log(resById)
}
updateDocs("628d13d2d05e6c2c923e7cb6")
*/
/*
const deletedDocs = async (id)=>{
     const res = await Student.findByIdAndDelete({_id:id})

     console.log(res)
}
deletedDocs("628d13d2d05e6c2c923e7cb6")

*/

