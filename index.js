const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.get('/endpoint2/:id',(request,response)=>{
    const str = request.params.id
    const strInv = (str)=>{
        return str.split("").reverse().join("")
    }
    const resp = {
        valor:str,
        tamaño:str.length,
        valorInvertido:strInv(str)
    }
    response.json(resp)
})

app.post('/endpoint1',(request,response)=>{
    const body = request.body

    Object.filter = (MainObject,filterFunction)=>{
    return Object.keys(MainObject)
        .filter((ObjectKey)=>filterFunction(MainObject[ObjectKey]))
        .reduce((result,ObjectKey)=>(result[ObjectKey]=MainObject[ObjectKey],result),{});     
    }
    var filtredObject = Object.filter(body,(key)=>{
        if(Array.isArray(key)){
           return false
        }
        return key 
    })
    response.json(filtredObject)
})


const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})