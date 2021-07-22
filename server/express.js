const express= require('express')
const cors= require('cors')

const app= express()
const fs=require('fs');
const { throws } = require('assert');
const port=(process.env.PORT || '5000');
app.use(cors())


app.get('/api/tasks',(req,res)=>{
    let fileData;
    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
            throw new Error(err);
         }
        if(data!==""){
            data= JSON.parse(data);
        }
        res.json(data);
        //  console.log(data,'File read successfully')
    })
})

app.post('/api/tasks/:type',express.urlencoded({extended: true}),(req,res)=>{ // post a task data
    const taskType=req.params.type;
    const {id,title,desc}=req.body;
    // validation
    if(!title) return res.status(400).send('Error: Task name required')

    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
            throw new Error(err);
         }

         if(data==undefined) return ;
        console.log('Before json parsing ',data)
         let fileData=JSON.parse(data);
        fileData[taskType].push({id:id, title:title, desc:desc })
        //  console.log(fileData)
        //  res.end();
        fs.writeFile('data.json',JSON.stringify(fileData,null,2),{flag: 'r+'},err =>{ // File creation 
            if(err){
                throw new Error(err);
             }
            console.log('File written successfully after Post request')
            res.json(fileData);
        })
    })  
})


app.put('/api/tasks/:type/:id',express.urlencoded({extended: true}),(req,res)=>{ // Update a task data
    const taskType=req.params.type;
    const taskId=req.params.id;
   
    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
            throw new Error(err);
        }

         if(data==undefined) return ;
        //  console.log(data);
         let fileData=JSON.parse(data);

         let index= fileData[taskType].findIndex(t => t.id==taskId);
         if(index==-1) return res.status(404).send('Error: Task not found') 

        fileData[taskType][index].title=req.body.title;
        fileData[taskType][index].desc=req.body.desc;
        //  res.end();
        fs.writeFile('data.json',JSON.stringify(fileData,null,2),{flag: 'r+'},err =>{ // File creation 
            if(err){
                throw new Error(err);
             }
            console.log('File written successfully after PUT request')
            res.json(fileData);
        })
    })
}) 
 



app.delete('/api/tasks/:type/:id',(req,res)=>{ // Update a task data
    const taskType=req.params.type;
    const taskId=req.params.id;
   
    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
            throw new Error(err);
         }

         if(data==undefined) return ;
         let fileData=data;
        //  console.log(fileData);
         fileData=JSON.parse(fileData);
         let index= fileData[taskType].findIndex(t => t.id==taskId);
         if(index==-1) return res.status(404).send('Error: Task not found')         
         fileData[taskType].splice(index,1);

        fs.writeFile('data.json',JSON.stringify(fileData,null,2),{flag: 'w'},err =>{ // File creation 
            if(err){
                throw new Error(err);
            }
            console.log('File written successfully after DELETE request')
            res.json(fileData);
        })
    })

    
}) 

app.listen(port,()=>{
    console.log(`Server is running and see get request at http://localhost:${port}/api/tasks `);
})





/*
 SERVICE by server
  .get('/tasks') - get all task data
  .post('/tasks/type/id') - add data while pressing Submit button
  .put('/tasks/type/id')- update the task data (Edit button)
  .delete('/task/type/id')- delete data [ while pressing X button]

 */ 
