angular.module('todoController', [])
    .controller('mainController', function($scope, $http, Todos) {
        $scope.formData = {};
    
    // when landing on the page, get all todos and show them
    Todos.get()
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(err) {
            console.log('Error : ' + err);
        });
    
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if(!$.isEmptyObject($scope.formData)) {
            Todos.create($scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(err) {
                console.log('Error : ' + err);
            });
        }
            
    };
    
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        Todos.delete(id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(err) {
                console.log('Error : '+ err);
            });
    };
});