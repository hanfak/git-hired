gitHired.factory('userDataFactory', function() {

  var User = function(login, avatar, repos, followers) {
    this.login = login;
    this.avatar = avatar;
    this.repos = repos;
    this.followers = followers;
  };

  return User;

});
