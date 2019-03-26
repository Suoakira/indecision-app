"use strict";

console.log("Hello World");

var app = {
    title: "Indecision App",
    subTitle: "",
    options: ["One", "Two"]
};

var template = React.createElement(
    "div",
    null,
    React.createElement(
        "p",
        null,
        app.title
    ),
    app.subTitle && React.createElement(
        "p",
        null,
        app.subTitle
    ),
    app.options.length > 0 ? React.createElement(
        "p",
        null,
        "Here are your options"
    ) : "No Options",
    React.createElement(
        "ol",
        null,
        React.createElement("li", null),
        React.createElement("li", null)
    )
);

var count = 0;

var increment = function increment() {
    count += 1;
    renderCounterApp();
    console.log("addOne", count);
};

var decrement = function decrement() {
    count -= 1;
    renderCounterApp();
    console.log("subtractOne", count);
};

var reset = function reset() {
    count = 0;
    renderCounterApp();
    console.log("reset", count);
};

var appRoot = document.querySelector("#root");

var renderCounterApp = function renderCounterApp() {
    var templateTwo = React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "Count: ",
            count
        ),
        React.createElement(
            "button",
            { onClick: function onClick() {
                    return increment();
                } },
            "+1"
        ),
        React.createElement(
            "button",
            { onClick: function onClick() {
                    return decrement();
                } },
            "-1"
        ),
        React.createElement(
            "button",
            { onClick: function onClick() {
                    return reset();
                } },
            "Reset"
        )
    );
    ReactDOM.render(templateTwo, appRoot);
};
renderCounterApp();
