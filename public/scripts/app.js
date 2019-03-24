"use strict";

console.log("Hello World");

var template = React.createElement(
  "p",
  null,
  "changed?"
);
var appRoot = document.querySelector("#root");

ReactDOM.render(template, appRoot);
