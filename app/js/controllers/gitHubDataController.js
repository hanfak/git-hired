gitHired.controller('gitHubDataController',['GitHubDataService', 'UserDataService', function (GitHubDataService, UserDataService) {
  var self = this;

  self.users = [];

  self.searchUser = function(searchUserText) {
    var username = searchUserText;
    self.getUsernames(username);
  };


  self.getUser = function(username){
    UserDataService.getUser(username).then(function(user){
      self.users.push(user);
    });
  };

  self.getUsernames = function(username){
    GitHubDataService.getAll(username).then(function(usernames){
      var usernamesArray = usernames;
      self.users = [];
      usernamesArray.map(function(username){
        return self.getUser(username);
      });
    });
  };
}]);
