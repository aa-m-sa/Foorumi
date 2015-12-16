FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api){
  // Toteuta kontrolleri tähän
  Api.getMessage($routeParams.id).success( function(message) {
    $scope.message = message;
  });

  $scope.addReply = function () {
    var obj = {
      content: $scope.newReply.content
    };
    Api.addReply(obj, $routeParams.id).success(function (message, status, headers, config) {
      $scope.message.Replies.push(obj);
      $scope.newReply = {content: ''};
    });
  };
});
