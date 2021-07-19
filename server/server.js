const http= require('http')
const fs= require('fs')

const hostName='127.0.0.1'
const port='5000'

// CRUD using 'fs' module

let obj={
    todo:[
        {title:'Task1', desc: 'This is about Task1'}
    ],
    done:[
        {title:'Task11', desc: 'This is completed task' }
    ]
};

obj.done.push({title:'Task2', desc: 'This is completed Task2'})
let fileData;
fs.writeFile('data.json',JSON.stringify(obj,null,2),{flag: 'w+'},err =>{ // File creation 
    if(err){
        console.log(err)
        return ;
    }
    fs.readFile('data.json','utf-8',(data,err)=>{
        if(data){
            fileData=data;
        }
        else{
            fileData=err;
         }
    })
})


const server= http.createServer((req,res)=>{
    const url= req.ulr;
    const method=req.method; 
    if(url==='/tasks' && method==='get'){
        res.sendDate(fileData);
    }
    res.end();
})

server.listen(port,hostName,()=>[
    console.log(`Server is running at link http://${hostName}:${port}`)
])


// Export the data object
export let fileData;