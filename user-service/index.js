const express = require("express")
const app = express()
const PORT = 8081

// before its comes to route meke the rquest data in json format right 
app.use(express.json()) 

app.get("/",(req,res)=>{   
    
    console.log("hello upeka")

})


app.listen(PORT,()=>{
    console.log("application is up and running!")
})

























