// Builds the contact email link at runtime so the address is not a plain mailto: link in the HTML.
(function () {
  // The username is stored as decimal character codes, the same numeric
  // encoding HTML uses for &#NNN; entities, and decoded here at runtime.
  // (HTML entities themselves are not decoded inside JavaScript strings,
  // so the codes are converted with String.fromCharCode instead.)
  var userCodes = [104, 101, 108, 108, 111];
  var user = String.fromCharCode.apply(null, userCodes);
  var domain = ["kalanaw", "com"].join(".");

  var link = document.getElementById("email-link");
  if (link) {
    link.href = "mailto:" + encodeURIComponent(user) + "@" + encodeURIComponent(domain);
  }
})();
