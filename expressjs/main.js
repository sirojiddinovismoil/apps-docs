import exspress from "express"

const app =exspress();
const port =8080;

app.get('/',(req,res)=>{
    res.send('server is runing')
});

const data=[];

app.post('student',(req,res)=>{
    const temp={...req.body, id: new Date().getTime} 

    data.push(temp)

    res.writeHead(201,{"content-type":"text/plain"})
    res.end('acsepted')
})

app.get('students',(req,res)=>{
    res.send(data)
})

app.get('student/:id',(req, res)=>{
   const result= data.filter((el)=>el.id=req.params.id)
   res.send(result.length?result:"not found")
})


app.listen(port, () => {
console.log(`our node project at http://localhost:${port}`);
});
