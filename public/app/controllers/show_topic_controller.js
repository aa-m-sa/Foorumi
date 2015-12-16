FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api){
  // Toteuta kontrolleri tähän
  Api.getTopic($routeParams.id).success( function(topic) {
    $scope.topic = topic;
  });

  $scope.addMessage = function () {
    var obj = {
      title: $scope.newMessage.title,
      content: $scope.newMessage.content
    };
    Api.addMessage(obj, $routeParams.id).success(function (message, status, headers, config) {
      $location.path('/messages/' + message.id);
    });
  };
});
