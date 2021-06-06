const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 



const Candidate = require("./models/candidate")
const Scores = require("./models/test_score")





const connectDB = async ()=>{
	try{
       const conn = await mongoose.connect("mongodb://localhost/azeez",{
           useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
       })

       console.log("connected Mongoose",conn.connection.host)
	}catch(err){
     console.error(err.message)
     process.exit(1)
	}
}

connectDB()



app.post("/add",async (req,res)=>{
	 const {name,email,first_round,second_round,third_round}= req.body
	 try{

		if(name==="" && email==="" && first_round ==="" && second_round === "" && third_round===""){
	        return res.json({msg:"fill all inputs"})
		}

		 const candidate = new Candidate({name,email})	     
	     await candidate.save()
	     
		 const score = new Scores({candidate: candidate._id,first_round,second_round,third_round})
		 await score.save()
	     res.json({candidate,score})

	 }catch(err){
	 	console.log(err)
	 }
})


app.get("/",async (req,res)=>{
	 try{
	 const scores = await Scores.find({})
     console.log(scores)
     const datas = {...scores}
     let finalData = [];

     for(let data in datas){
     	let {first_round,second_round,third_round,candidate} = datas[data]
        let avg = Math.round((first_round+second_round+third_round)/3)
        
        const {name,email}  = await Candidate.findById(candidate)

        finalData.push({name,email,first_round,second_round,third_round,avg})
     }

     const max = finalData.reduce((prev, current) => (prev.avg > current.avg) ? prev : current)
     

     res.json({finalData})

	 }catch(err){
	 	console.log(err)
	 }
})



app.get("/high",async (req,res)=>{
	 try{
	 const scores = await Scores.find({})
     console.log(scores)
     const datas = {...scores}
     let finalData = [];

     for(let data in datas){
     	let {first_round,second_round,third_round,candidate} = datas[data]
        let avg = Math.round((first_round+second_round+third_round)/3)
        
        const {name,email}  = await Candidate.findById(candidate)

        finalData.push({name,email,first_round,second_round,third_round,avg})
     }

     const max = finalData.reduce((prev, current) => (prev.avg > current.avg) ? prev : current)
     

     res.json({max})

	 }catch(err){
	 	console.log(err)
	 }
})





app.listen(9000,()=>{
	console.log("localhost 9000 connected")
})