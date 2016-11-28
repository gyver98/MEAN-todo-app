// set up =====================================
var express = require('express');
var app = express();                             // create our app w/ express
var mongoose = require('mongoose');              // mongoose for mongodb
var morgan = require('morgan');                  // log requests to the console (express4)
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration ==============================

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');
//mongoose.connect('mongodb://mongo:mongo123@ds153637.mlab.com:53637/myappmongodb');
//mongoose.connect('mongodb://mongo:mongo123@ds153637.mlab.com:53637/myappmongodb');
mongoose.connect('mongodb://localhost/test');



app.use(express.static(__dirname + '/public'));      // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                              // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                          // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());


// define model =================
var Todo = mongoose.model('Todo', {
    text : String
});

// routes ======================================================================
// api -----------------------------------------------
// get all todos

app.get('/api/todos', function(req, res) {
    // use mongoose to get all todos in the database
    console.log("get : todos in node");
    Todo.find(function(err, todos) {
        // if there is an error retrieving, send the error
        if(err) {
            res.send(err);
        }
        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if(err) {
            res.send(err);
        }
        
        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if(err) {
                res.send(err);
            }
            res.json(todos);
        });
        
    });
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function() {
        if(err) {
            res.send(err);    
        }
        // get and return all the todos after you delete another
        Todo.find(function(err, todos) {
            if(err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

// application ------------------------------------------------

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});



// listen (start app with node server.js)======================

app.listen(8080);
console.log("App listening on port 8080");