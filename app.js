const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const connect = require('./config');
const path = require("path");
const db = pgp(connect);

const port = 5000;

//app.use(express.urlencoded({extended:true}))
//app.use(express.json);
app.use(express.json())
app.use(express.static(__dirname + '/css&js'));


app.get("/", (req,res)=>res.sendFile(__dirname + path.join("/site/index.html")))

app.get("/tasks", async (req, res)=>{
    const data = await db.any('SELECT * FROM tasks');
    res.json(data)
})

app.post("/new-task", async (req, res)=>{
    if(!req.body.title) return res.send('You must supply a title.');
    let result = await db.one(`INSERT INTO tasks (title) VALUES ('${req.body.title}') RETURNING *`)
    res.send(result)
    
})

app.delete('/delete-task/:id', async (req, res)=> {
    var number=req.params.id.slice(7)
    result = await db.none(`
        DELETE FROM tasks 
        WHERE id='${number}'
    `);
    console.log('Deleted Task Number '+number)
})

app.patch('/edit-task/:id/state/:ischecked', async (req,res)=>{
    let result = await db.one(`
        UPDATE tasks 
        SET is_completed = '${req.params.ischecked}' 
        WHERE id='${req.params.id}' RETURNING *
    `);
    res.send(result);
})

app.patch('/edit-task/:id/title', )

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})