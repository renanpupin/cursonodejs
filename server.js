let express = require('express');
let app = express();

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


let mongoose = require('mongoose');
mongoose.connect(
    "mongodb://admin:node123@ds123173.mlab.com:23173/cursonode",
    { useNewUrlParser: true }
);

let ToDo = require("./models/todo");

app.get('/', function (req, res) {
    res.send('Hello World Travis!');	//envia texto
});

//get with callback
app.get('/todo', function (req, res) {
    ToDo
        .find()
        .exec((err, todos) => {
            if(!err){
                res.json({
                    success: true,
                    message: "ToDos buscados com sucesso.",
                    todos
                });	//responde com um objeto json
            }else{
                res.json({success: false, message: err.message, todos: [] });
            }
        })
});

//post com async/await e try/catch
app.post('/todo', async(req, res) => {
    try{
        let title = req.body.title;

        let newTodo = new ToDo({
            title: title
        });

        let savedTodo = await newTodo.save();

        res.json({ success: true, message: "Successo!!!", todo: savedTodo });
    }catch(err){
        res.json({ success: false, message: err.message });
    }
});

//put
app.put('/todo/:id', async(req, res) => {
    try{
        let id = req.params.id;
        let is_complete = req.body.is_complete;

        let todo = await ToDo.findOne({_id: id});
        console.log(todo);

        if(is_complete !== undefined){
            todo.is_complete = is_complete;
            todo.completed_at = new Date();
        }

        let updatedTodo = await todo.save();
        console.log("updatedTodo", updatedTodo);

        res.json({ success: true, message: "Successo!!!", todo: updatedTodo });
    }catch(err){
        res.json({ success: false, message: err.message });
    }
});

//delete
app.delete('/todo/:id', async(req, res) => {
    try{
        let id = req.params.id;

        let todo = await ToDo.findOne({_id: id});
        console.log(todo);

        await todo.remove();

        res.json({ success: true, message: "Successo!!!" });
    }catch(err){
        res.json({ success: false, message: err.message });
    }
});

//SERVER listening
let port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Example app listening on port '+port);
});

//add exports to app at server.js
module.exports = app;



