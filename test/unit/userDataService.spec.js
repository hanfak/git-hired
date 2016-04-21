describe('UserDataService', function() {
  beforeEach(module('gitHired'));

  var UserDataService, UserDataFactory, httpBackend;

  var userData = {"login": "Name", "public_repos": 25, "followers": 5, "avatar_url": 'url'};

  beforeEach(inject(function(_UserDataService_, _UserDataFactory_, $httpBackend) {
    UserDataService = _UserDataService_;
    UserDataFactory = _UserDataFactory_;
    httpBackend = $httpBackend;
  }));

  it('fetches users from github', function(){
    httpBackend.expectGET("https://api.github.com/users/Name").respond(userData);

    var fakePerson = new UserDataFactory("Name", 25, 5, 'url');

    UserDataService.getUser("Name").then(function(user) {
      expect(user).toEqual(fakePerson);
    });

    httpBackend.flush();
  })
})