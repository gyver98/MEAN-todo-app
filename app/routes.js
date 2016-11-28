var Todo = require('./models/todo');


module.exports = function (app) {
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        console.log("get : todos in node");
        Todo.find(function (err, todos) {
            // if there is an error retrieving, send the error
            if (err) {
                res.send(err);
            }
            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err) {
                res.send(err);
            }

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err) {
                    res.send(err);
                }
                res.json(todos);
            });

        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err) {
                res.send(err);
            }
            // get and return all the todos after you delete another
            Todo.find(function (err, todos) {
                if (err) {
                    res.send(err);
                }
                res.json(todos);
            });
        });
    });
};