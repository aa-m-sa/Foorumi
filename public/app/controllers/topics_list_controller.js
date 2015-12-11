FoorumApp.controller('TopicsListController', function($scope, $location, Api){
  // Toteuta kontrolleri tähän
  Api.getTopics().success(function(topicdata, status, headers, config) {
    console.log('successfully got topics');
    $scope.topics = topicdata;
  }).error(function(data, status, headers, config) {
    console.log('error getting topics, status: ' + status);
  });

  $scope.addTopic = function () {
    var tobj = {
      name: $scope.newTopic.name,
      description: $scope.newTopic.description
    };
    Api.addTopic(tobj).success(function (data, status, headers, config) {
      console.log('Successfully added topic.');
      console.log('Redirect to /topics/' + data.id);
      $location.path('/topics/' + data.id);
    });
  };
});
