const express= require('express')
const cors= require('cors')

const app= express()
const fs=require('fs')
const port=(process.env.PORT || '5000');

let obj={
    todo:[],
    done:[]
}

app.use(cors())
app.get('/api/tasks',(req,res)=>{
    res.json(obj)
})

app.post('/api/tasks/:type',express.urlencoded({extended: true}),(req,res)=>{ // post a task data
    const taskType=req.params.type;
    const {id,title,desc}=req.body;
    // validation
    if(!title) return res.status(400).send('Error: Task name required')

    obj[taskType].push({id:id, title:title, desc:desc })
    res.json(obj)
})

app.put('/api/tasks/:type/:id',express.urlencoded({extended: true}),(req,res)=>{ // Update a task data
    const taskType=req.params.type;
    const taskId=req.params.id;
    // console.log(req.body)

    let index= obj[taskType].findIndex(t => t.id==taskId);
    if(index==-1) return res.status(404).send('Error: Task not found') 

    // console.log('Before update',obj[taskType][index])

    obj[taskType][index].title=req.body.title;
    obj[taskType][index].desc=req.body.desc;
    res.json(obj)
})

app.delete('/api/tasks/:type/:id',express.urlencoded({extended: true}),(req,res)=>{ // Update a task data
    const taskType=req.params.type;
    const taskId=req.params.id;
    // console.log(req.body)
    const {taskTitle,taskDesc}=req.body;
    // validation
    let index= obj[taskType].findIndex(t => t.id==taskId);
    if(index==-1) return res.status(404).send('Error: Task not found') 

    // console.log(obj[taskType][index])
    obj[taskType].splice(index,1);
    res.json(obj)
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})





/*
 SERVICE by server
  .get('/tasks') - get all task data
  .post('/tasks/type/id') - add data while pressing Submit button
  .put('/tasks/type/id')- update the task data (Edit button)
  .delete('/task/type/id')- delete data [ while pressing X button]

 */ 