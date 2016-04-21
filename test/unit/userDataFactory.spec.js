describe('userDataFactory', function() {

  beforeEach(module('gitHired'));

  var user;

  beforeEach(inject(function(userDataFactory) {
    user = new userDataFactory('newUser', 'http://avatar.url', 10, 40);
  }));

  it('has a username', function() {
    expect(user.name).toBeString;
  });

  it('has an avatar url', function() {
    expect(user.avatar).toBeString;
  });

  it('has a number of repos', function() {
    expect(user.repos).toBeNumber;
  });

  it('has a number of followers', function() {
    expect(user.followers).toBeNumber;
  });

});
