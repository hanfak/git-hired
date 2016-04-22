var mock = require('protractor-http-mock');

mock([{
          request: {
            path: 'https://api.github.com/search/users',
            method: 'GET'
          },
          response: {
            data: { items: [{"login": "tobenna"},{"login": "hanfak"}] }
          } 
        },
      {
        request: {
          path: 'https://api.github.com/users/tobenna',
          method: 'GET'
        },
        response: {
          data: {"login": "tobenna", "public_repos": 25, "followers": 5, "avatar_url": 'url'}
        }
      }
]);

describe('gitHubDataController',function () {
  var user;

  it('has users', function () {
    browser.get('/');
    $('#searchUser').sendKeys('Fakey');
    $('#submitSearch').click();
    var users = $$('#users .user');
    expect(users.first().getText()).toMatch('tobenna');
  });

  it('has user avatars', function () {
    var user = $$('#users .user').first();
    var mypic = user.element(by.css("img[src*='url']"));
    expect((mypic).isPresent()).toBe(true);
  });

  describe('user details',function () {

    beforeEach(function () {
      browser.get('/');
      user = $$('#users .user').first();
    });

    it('displays the number of followers',function () {
      var followers = user.element(by.css(".followers"));
      expect(followers.getText()).toMatch('5');
    });

    it('displays the number of repositories',function () {
      var followers = user.element(by.css(".repos"));
      expect(followers.getText()).toMatch('25');
    });
  });


  afterEach(function(){
    mock.teardown();
  });
});
