var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("Campfinder", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 20 seconds to have time to load the pages

  this.timeout(20000);
  it("should send user to the campground page", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("https://limitless-thicket-94799.herokuapp.com/")
      // Click the catalog link
      .click("a[href='/campgrounds']")
      // Evaluate the title
      .evaluate(function() {
        return document.title;
      })
      // Asset the title is as expected
      .then(function(title) {
        expect(title).to.equal("Campground Finder");
        done();
      });
  });

  // it("should present a link to register to the site", function(done) {
  //   new Nightmare({ show: true })
  //     .goto("https://limitless-thicket-94799.herokuapp.com/register")
  //     // Enter username.
  //     .type("#user_login", "ResilD")
  //     // Enter password.
  //     .type("#login__user_password", "dummy*password")
  //     // Click the login button
  //     .click("#user_submit")
  //     // Evaluate the following selector
  //     .evaluate(function() {
  //       // Assert the "learn" link can be found
  //       return document.querySelector("a[href='/learn']");
  //     })
  //     .then(function(link) {
  //       expect(link).to.not.equal(undefined);
  //       done();
  //     });
  // });
});
