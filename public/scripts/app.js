"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            options: props.options
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem("options");
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (error) {
                // do nothing
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            // fires every time components updates
            // this.state this.props
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem("options", json);
                console.log("savingdata");
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            // unmounts any running components at the end of our app
        }
    }, {
        key: "handleDeleteOptions",
        value: function handleDeleteOptions() {
            return this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: "handleDeleteOption",
        value: function handleDeleteOption(opt) {
            var copyOptions = [].concat(_toConsumableArray(this.state.options));
            this.setState(function () {
                return { options: copyOptions.filter(function (option) {
                        return option !== opt;
                    }) };
            });
        }
    }, {
        key: "handlePick",
        value: function handlePick() {
            var length = this.state.options.length;
            if (length > 0) {
                var randNum = Math.floor(Math.random() * length);
                alert(this.state.options[randNum]);
            } else {
                alert("Sory no options to pick from");
            }
        }
    }, {
        key: "handleAddOption",
        value: function handleAddOption(option) {
            var shallowOptions = [].concat(_toConsumableArray(this.state.options), [option]);
            this.setState(function () {
                return { options: shallowOptions };
            });
        }
    }, {
        key: "render",
        value: function render() {
            var title = "Indecision";
            var subtitle = "Put your life in the hands of a computer";
            var options = this.state.options;

            return React.createElement(
                "div",
                null,
                React.createElement(Header, { title: title, subtitle: subtitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: options,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOption, {
                    options: options,
                    handleAddOption: this.handleAddOption
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
    options: ["one"]
};

var Header = function Header(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            props.title
        ),
        React.createElement(
            "h2",
            null,
            props.subtitle
        )
    );
};

var Action = function Action(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            {
                disabled: !props.hasOptions,
                onClick: function onClick() {
                    return props.handlePick();
                } },
            "What Should I Do"
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        "div",
        null,
        props.options.length == 0 && React.createElement(
            "p",
            null,
            "Please add an option to get started"
        ),
        props.options.map(function (option) {
            return React.createElement(Option, {
                key: option,
                option: option,
                handleDeleteOption: props.handleDeleteOption
            });
        }),
        React.createElement(
            "button",
            {
                onClick: function onClick() {
                    return props.handleDeleteOptions();
                }
            },
            "Remove All"
        )
    );
};

var Option = function Option(props) {
    return React.createElement(
        "div",
        null,
        props.option,
        React.createElement(
            "button",
            {
                onClick: function onClick(event) {
                    return props.handleDeleteOption(props.option);
                }
            },
            "X"
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleChange = _this2.handleChange.bind(_this2);
        _this2.state = {
            option: "",
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.setState(_defineProperty({}, event.target.name, event.target.value));
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            event.preventDefault();
            this.setState(function () {
                return { option: "" };
            });
            this.setState({ error: undefined });
            if (this.state.option !== "" && this.props.options.indexOf(this.state.option) == -1) {
                this.props.handleAddOption(this.state.option);
            } else if (this.props.options.indexOf(this.state.option) !== -1) {
                this.setState({ error: "This options already exists" });
            } else {
                this.setState({ error: "Please enter some text" });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                null,
                this.state.error && React.createElement(
                    "p",
                    null,
                    this.state.error
                ),
                React.createElement(
                    "form",
                    { onSubmit: function onSubmit(event) {
                            return _this3.handleSubmit(event);
                        } },
                    React.createElement("input", { type: "text", onChange: function onChange(event) {
                            return _this3.handleChange(event);
                        }, name: "option", value: this.state.option }),
                    React.createElement("input", { type: "submit", value: "submit" })
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById("root"));
