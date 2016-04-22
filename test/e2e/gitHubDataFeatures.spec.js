describe('gitHubDataController',function () {
  var user;
  var mockSearch = require('protractor-http-mock');
  var mockGet = require('protractor-http-mock');

  beforeEach(function () {
    mockSearch([{
    request: {
      path: 'https://api.github.com/search/users?q=Fakey',
      method: 'GET'
    },
    response: {
        data: { items: [{"login": "tobenna"},{"login": "hanfak"}] }
      }
    }]);
    
    mockGet([{
      request: {
        path: 'https://api.github.com/users/Fakey?access_token=92a1dbb7644d40d15398a160b6002835ca85ef31',
        method: 'GET'
      },
      response: {
        data: {"login": "tobenna", "public_repos": 25, "followers": 5, "avatar_url": 'url'}
        }
      }]);
  });

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
    mockSearch.teardown();
    mockGet.teardown();
  });
});
