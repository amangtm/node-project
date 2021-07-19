# Node Project
- persisting data using Node.js server
- Used express framework for routing serverside
- Use `npx nodemon` for starting server nodemon server

## Process
1. Do `npm init` and then ` npm i express --save`
2. Install `body-parser` for post request
3. `npm install cors --save` [For handling CORS error]

## Rest API service using Node server
- Get Request for all tasks: [link](http://127.0.0.1:5000/api/tasks)
- Post request: [link](http://127.0.0.1:5000/api/tasks/TASK_TYPE/ID) {Here TASK_TYPE can be `todo` or `done` and _ID= unique id of a task card}
- Put request form updating task card data : [link](http://127.0.0.1:5000/api/tasks/TASK_TYPE/ID)
- Delete request for deleting a task card data: [link](http://127.0.0.1:5000/api/tasks/TASK_TYPE/ID)
