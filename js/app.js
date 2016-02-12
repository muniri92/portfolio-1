(function(module) {
  'use strict';
  Portfolio.all = [];
  var portfolios = {};

  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  },this);

  Portfolio.all = [];

  Portfolio.prototype.toHtml = function(){
    var template = Handlebars.compile($('#port-template').text());
    this.daysAgo = parseInt((new Date() - new Date(this.createdOn))/60/60/24/1000);
    return template(this);
  };

  portfolios.initIndexPage = function() {
    Portfolio.all.forEach(function(a){
      $('#portfolio').append(a.toHtml());
    });
  };

  Portfolio.loadAll = function(portData) {
    portData.sort(function(a,b) {
      return (new Date(b.createdOn)) - (new Date(a.createdOn));
    });
    Portfolio.all = portData.map(function(ele) {
      return new Portfolio(ele);
    });
  };

  Portfolio.fetchAll = function(  ) {
    if (localStorage.portData) {
      Portfolio.loadAll(JSON.parse(localStorage.portData));
      portfolios.initIndexPage();
    } else {
      $.getJSON('data/portfolio.json')
      .done(function(data) {
        localStorage.setItem('portData', JSON.stringify(data));
        Portfolio.loadAll(JSON.parse(localStorage.portData));
        portfolios.initIndexPage();
      });
    }
  };

  function displayAboutMe(ele){
    var $aboutMe = $('#about-me');
    $aboutMe.find('h3').text(ele.fullName);
    $aboutMe.find('p').append(ele.bio);
  };
  displayAboutMe(aboutMe);

  module.Portfolio = Portfolio;
}(window));
