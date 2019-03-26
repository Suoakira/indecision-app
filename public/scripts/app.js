"use strict";

console.log("Hello World");
var appRoot = document.querySelector("#root");

var app = {
    title: "Indecision App",
    subTitle: "",
    options: ["BAE", "WIN"]
};

var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    var option = event.target.elements.option.value;
    if (option) {
        app.options.push(option);
        event.target.elements.option.value = "";
        renderApp();
    }
};

var mapOptions = function mapOptions() {
    return app.options.map(function (option, key) {
        return React.createElement(
            "li",
            { id: key },
            option
        );
    });
};

var removeOptions = function removeOptions() {
    app.options = [];
    renderApp();
};

var onMakeDecision = function onMakeDecision() {
    var randomNum = Math.floor(Math.random() * app.options.length);
    console.log(randomNum);
    var option = app.options[randomNum];
    alert(option);
};

var renderApp = function renderApp() {
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
            "button",
            { disabled: app.options.length === 0, onClick: function onClick() {
                    return onMakeDecision();
                } },
            "What Should I do?"
        ),
        React.createElement(
            "button",
            { onClick: function onClick() {
                    return removeOptions();
                } },
            "Remove all Options"
        ),
        React.createElement(
            "ol",
            null,
            app.options.length > 0 && mapOptions()
        ),
        React.createElement(
            "form",
            { onSubmit: function onSubmit(event) {
                    return handleSubmit(event);
                } },
            React.createElement("input", { type: "text", name: "option" }),
            React.createElement(
                "button",
                null,
                "Add Option"
            )
        )
    );
    ReactDOM.render(template, appRoot);
};

renderApp();
