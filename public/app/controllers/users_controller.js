FoorumApp.controller('UsersController', function($scope, $location, Api){
  // Toteuta kontrolleri tähän
  $scope.errorMessage = null;
  $scope.userToLogin = {username: "", password: ""};
  var obj = {
    username: $scope.userToLogin.username,
    password: $scope.userToLogin.password
  };
  $scope.login = function () {Api.login(obj)
    .success(function(user){
      console.log('Kirjautuminen onnistui!');
      $scope.errorMessage = null;
      $location.path('/');
    })
    .error(function(){
      $scope.errorMessage = 'Väärä käyttäjätunnus tai salasana!';
    });
  };

  $scope.register = function () {
    if ($scope.newUser.password === $scope.newUser.passwordCheck) {
      Api.register({
        username: $scope.newUser.username,
        password: $scope.newUser.password})
        .success(function(user){
          console.log('Rekisteröinti onnistui!');
          $scope.errorMessage = null;
          $location.path('/');
        })
        .error(function(message){
          $scope.errorMessage = message;
        });
    } else {
      $scope.errorMessage = "Salasanat eivät täsmää!";
      // käyttäisin validaattoria mutten saanut sitä toimimaan :/
    }
  };
});
