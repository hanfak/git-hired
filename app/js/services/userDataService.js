gitHired.service('UserDataService', ['$http', 'UserDataFactory', function($http, UserDataFactory) {
  var self = this;

  self.getUser = function(username) {
    return $http.get("https://api.github.com/users/" + username)
      .then(_handleResponseFromAPI, _errorCallback);
  };

  function _handleResponseFromAPI (response) {
    userData = response.data
    return new UserDataFactory(userData.login, userData.public_repos, userData.followers, userData.avatar_url);
  };

  function _errorCallback(error) {
    return error
  }
}]);