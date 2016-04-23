var mock = require('protractor-http-mock');

mock([{
          request: {
            path: 'https://api.github.com/search/users',
            method: 'GET'
          },
          response: {
            data: { items: [{"login": "fakey"}] }
          }
        },
      {
        request: {
          path: 'https://api.github.com/users/fakey',
          method: 'GET'
        },
        response: {
          data: {"login": "fakey", "public_repos": 25, "followers": 5, "avatar_url": 'url'}
        }
      }
]);

describe('gitHubDataController',function () {
  var user;
  beforeAll(function () {
    browser.get('/');
    $('#searchUser').sendKeys('fakey');
    $('#submitSearch').click();
  });

  it('has users', function () {
    var users = $$('#users .user');
    expect(users.first().getText()).toMatch('fakey');
  });

  it('has user avatars', function () {
    var user = $$('#users .user').first();
    var mypic = user.element(by.css("img[src*='url']"));
    expect((mypic).isPresent()).toBe(true);
  });

  describe('user details',function () {
    beforeEach(function () {
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


  afterAll(function(){
    mock.teardown();
  });
});
